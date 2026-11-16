-- =====================================================================
-- UXplain: ให้กำลังใจ ❤️ / โหวต 👍 / คอมเมนต์ (ไม่ต้องล็อกอิน) + ระบบอนุมัติ
-- วิธีใช้: Supabase → SQL Editor → New query → วางทั้งไฟล์ → Run
-- (รันซ้ำได้ ไม่ทำให้ข้อมูลเดิมหาย)
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- ตาราง ----------
create table if not exists public.reactions (
  id          bigint generated always as identity primary key,
  post_slug   text not null check (char_length(post_slug) between 1 and 120),
  kind        text not null check (kind in ('cheer', 'vote')),
  client_id   uuid not null,
  ip_hash     text,
  created_at  timestamptz not null default now(),
  unique (post_slug, kind, client_id)
);
create index if not exists reactions_slug_idx on public.reactions (post_slug, kind);
create index if not exists reactions_ip_idx on public.reactions (ip_hash, created_at);

create table if not exists public.comments (
  id          bigint generated always as identity primary key,
  post_slug   text not null check (char_length(post_slug) between 1 and 120),
  name        text not null check (char_length(name) between 1 and 40),
  body        text not null check (char_length(body) between 2 and 1000),
  client_id   uuid not null,
  ip_hash     text,
  status      text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz not null default now()
);
create index if not exists comments_slug_idx on public.comments (post_slug, status, created_at);
create index if not exists comments_ip_idx on public.comments (ip_hash, created_at);

-- ผู้ดูแล (อีเมลที่ใช้ล็อกอินหน้า /admin/)
create table if not exists public.admins (
  email text primary key
);

-- ตั้งค่า: auto_approve = true คือคอมเมนต์ขึ้นทันทีไม่ต้องรออนุมัติ
create table if not exists public.settings (
  id            int primary key default 1 check (id = 1),
  auto_approve  boolean not null default false
);
insert into public.settings (id) values (1) on conflict do nothing;

-- ปิดการเข้าถึงตารางตรง ๆ ทั้งหมด ให้ใช้ผ่านฟังก์ชันด้านล่างเท่านั้น
alter table public.reactions enable row level security;
alter table public.comments  enable row level security;
alter table public.admins    enable row level security;
alter table public.settings  enable row level security;
revoke all on public.reactions, public.comments, public.admins, public.settings from anon, authenticated;

-- ---------- ฟังก์ชันช่วย ----------
-- แฮช IP ของผู้ใช้ (ไม่เก็บ IP จริง) เพื่อใช้จำกัดการกดรัว ๆ
create or replace function public._ip_hash() returns text
language plpgsql stable as $$
declare h json; ip text;
begin
  begin
    h := current_setting('request.headers', true)::json;
    ip := split_part(coalesce(h->>'x-forwarded-for', h->>'x-real-ip', ''), ',', 1);
  exception when others then ip := '';
  end;
  return encode(digest(coalesce(nullif(trim(ip), ''), 'unknown') || ':uxplain', 'sha256'), 'hex');
end $$;

create or replace function public._is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins a
                 where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- ---------- สาธารณะ: ยอดกด ----------
create or replace function public.get_counts(p_slugs text[], p_client uuid default null)
returns table (post_slug text, cheers int, votes int, my_cheer boolean, my_vote boolean, comments int)
language sql stable security definer set search_path = public as $$
  select s.slug,
    (select count(*)::int from reactions r where r.post_slug = s.slug and r.kind = 'cheer'),
    (select count(*)::int from reactions r where r.post_slug = s.slug and r.kind = 'vote'),
    coalesce((select true from reactions r where r.post_slug = s.slug and r.kind = 'cheer' and r.client_id = p_client), false),
    coalesce((select true from reactions r where r.post_slug = s.slug and r.kind = 'vote'  and r.client_id = p_client), false),
    (select count(*)::int from comments c where c.post_slug = s.slug and c.status = 'approved')
  from unnest(p_slugs[1:200]) as s(slug);
$$;

-- กด/ยกเลิก (toggle) แล้วคืนยอดล่าสุด
create or replace function public.toggle_reaction(p_slug text, p_kind text, p_client uuid)
returns table (cheers int, votes int, active boolean)
language plpgsql security definer set search_path = public as $$
declare v_ip text := public._ip_hash(); v_active boolean;
begin
  if p_kind not in ('cheer', 'vote') or p_client is null or p_slug !~ '^[a-z0-9-]{1,120}$' then
    raise exception 'invalid input';
  end if;
  -- กันกดรัว: 1 เครือข่ายกดได้ไม่เกิน 120 ครั้ง/ชั่วโมง
  if (select count(*) from reactions where ip_hash = v_ip and created_at > now() - interval '1 hour') >= 120 then
    raise exception 'rate_limited';
  end if;
  delete from reactions where post_slug = p_slug and kind = p_kind and client_id = p_client;
  if found then
    v_active := false;
  else
    insert into reactions (post_slug, kind, client_id, ip_hash) values (p_slug, p_kind, p_client, v_ip);
    v_active := true;
  end if;
  return query select
    (select count(*)::int from reactions r where r.post_slug = p_slug and r.kind = 'cheer'),
    (select count(*)::int from reactions r where r.post_slug = p_slug and r.kind = 'vote'),
    v_active;
end $$;

-- ---------- สาธารณะ: คอมเมนต์ ----------
create or replace function public.get_comments(p_slug text)
returns table (id bigint, name text, body text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, c.body, c.created_at from comments c
  where c.post_slug = p_slug and c.status = 'approved'
  order by c.created_at asc limit 500;
$$;

create or replace function public.add_comment(p_slug text, p_name text, p_body text, p_client uuid)
returns table (id bigint, status text)
language plpgsql security definer set search_path = public as $$
declare v_ip text := public._ip_hash(); v_status text; v_name text := btrim(p_name); v_body text := btrim(p_body);
begin
  if p_client is null or p_slug !~ '^[a-z0-9-]{1,120}$' then raise exception 'invalid input'; end if;
  if char_length(v_name) not between 1 and 40 then raise exception 'invalid_name'; end if;
  if char_length(v_body) not between 2 and 1000 then raise exception 'invalid_body'; end if;
  -- กันสแปม: เครื่องเดียวกันคอมเมนต์ได้ 3 ครั้ง/5 นาที, เครือข่ายเดียวกัน 20 ครั้ง/ชั่วโมง
  if (select count(*) from comments where client_id = p_client and created_at > now() - interval '5 minutes') >= 3
     or (select count(*) from comments where ip_hash = v_ip and created_at > now() - interval '1 hour') >= 20 then
    raise exception 'rate_limited';
  end if;
  -- ลิงก์หลายอันมักเป็นสแปม → รออนุมัติเสมอ
  select case when s.auto_approve and (select count(*) from regexp_matches(v_body, 'https?://', 'g')) <= 1
              then 'approved' else 'pending' end
    into v_status from settings s where s.id = 1;
  return query
    insert into comments (post_slug, name, body, client_id, ip_hash, status)
    values (p_slug, v_name, v_body, p_client, v_ip, v_status)
    returning comments.id, comments.status;
end $$;

-- ---------- สาธารณะ: อันดับยอดนิยม ----------
create or replace function public.top_posts(p_limit int default 10)
returns table (post_slug text, votes int, cheers int)
language sql stable security definer set search_path = public as $$
  select r.post_slug,
    count(*) filter (where r.kind = 'vote')::int,
    count(*) filter (where r.kind = 'cheer')::int
  from reactions r group by r.post_slug
  order by 2 desc, 3 desc limit least(greatest(p_limit, 1), 50);
$$;

-- ---------- ผู้ดูแล ----------
create or replace function public.admin_list_comments(p_status text default 'pending')
returns table (id bigint, post_slug text, name text, body text, status text, created_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public._is_admin() then raise exception 'not_admin'; end if;
  return query select c.id, c.post_slug, c.name, c.body, c.status, c.created_at from comments c
    where p_status = 'all' or c.status = p_status
    order by c.created_at desc limit 300;
end $$;

create or replace function public.admin_set_status(p_id bigint, p_status text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public._is_admin() then raise exception 'not_admin'; end if;
  if p_status = 'delete' then delete from comments where id = p_id;
  elsif p_status in ('pending', 'approved', 'rejected') then update comments set status = p_status where id = p_id;
  else raise exception 'invalid status'; end if;
end $$;

create or replace function public.admin_settings(p_auto_approve boolean default null)
returns table (auto_approve boolean, pending int)
language plpgsql security definer set search_path = public as $$
begin
  if not public._is_admin() then raise exception 'not_admin'; end if;
  if p_auto_approve is not null then update settings set auto_approve = p_auto_approve where id = 1; end if;
  return query select s.auto_approve, (select count(*)::int from comments where status = 'pending') from settings s where s.id = 1;
end $$;

-- ---------- สิทธิ์เรียกใช้ฟังก์ชัน ----------
revoke all on function public._ip_hash(), public._is_admin() from public, anon, authenticated;
grant execute on function public.get_counts(text[], uuid), public.toggle_reaction(text, text, uuid),
  public.get_comments(text), public.add_comment(text, text, text, uuid), public.top_posts(int)
  to anon, authenticated;
grant execute on function public.admin_list_comments(text), public.admin_set_status(bigint, text),
  public.admin_settings(boolean) to authenticated;

-- ---------- ใส่อีเมลผู้ดูแล (แก้ตรงนี้ แล้ว Run) ----------
-- insert into public.admins (email) values ('อีเมลของคุณ@example.com') on conflict do nothing;
