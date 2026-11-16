// UXplain — ให้กำลังใจ / โหวต / คอมเมนต์ (Supabase, ไม่ต้องล็อกอิน)
import { enabled, rpc } from "./sb.js";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// รหัสประจำเครื่อง (สุ่ม เก็บในเบราว์เซอร์) ใช้กันกดซ้ำ
function clientId() {
  try {
    let id = localStorage.getItem("uxp_cid");
    if (!id) { id = crypto.randomUUID(); localStorage.setItem("uxp_cid", id); }
    return id;
  } catch { return crypto.randomUUID(); }
}
const CID = clientId();
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const ENABLED = enabled;
const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k" : String(n));
const thDate = (d) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });

function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}
const errText = (e) => /rate_limited/.test(e?.message) ? "ช้าลงนิดนึงนะ ลองใหม่อีกสักครู่ 🙏" : "มีบางอย่างผิดพลาด ลองใหม่อีกครั้ง";

// ---------- แชร์ (ใช้ได้แม้ไม่ได้เชื่อม Supabase) ----------
$$("[data-share]").forEach((b) => b.addEventListener("click", async () => {
  const data = { title: document.title, url: location.href.split("#")[0] };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(data.url); toast("คัดลอกลิงก์แล้ว"); }
  } catch {}
}));

if (!ENABLED) {
  $$("[data-react]").forEach((b) => b.remove());
} else {
  $$("[data-coff]").forEach((n) => n.remove());
  $$("[data-cform]").forEach((n) => (n.hidden = false));
  init().catch((e) => console.warn("UXplain social:", e));
}

async function init() {
  const post = $("[data-post-slug]");
  const cards = $$(".card[data-slug]");
  const slugs = [...new Set([...(post ? [post.dataset.postSlug] : []), ...cards.map((c) => c.dataset.slug)])];

  // ยอดนิยมบนหน้าแรก
  const pop = $("[data-popular]");
  if (pop) {
    try {
      const top = (await rpc("top_posts", { p_limit: 6 })).filter((r) => r.votes + r.cheers > 0);
      const tpl = $("#all-cards");
      const grid = $("[data-popular-grid]");
      for (const r of top.slice(0, 3)) {
        const card = tpl?.content.querySelector(`.card[data-slug="${CSS.escape(r.post_slug)}"]`);
        if (card) { const c = card.cloneNode(true); grid.append(c); cards.push(c); }
      }
      if (grid.children.length) pop.hidden = false;
    } catch (e) { console.warn(e); }
  }

  const all = [...new Set([...slugs, ...cards.map((c) => c.dataset.slug)])];
  if (!all.length) return;
  const rows = await rpc("get_counts", { p_slugs: all, p_client: CID });
  const by = Object.fromEntries(rows.map((r) => [r.post_slug, r]));

  // การ์ด
  for (const c of cards) {
    const r = by[c.dataset.slug]; if (!r) continue;
    const st = $(".stats", c); if (!st) continue;
    for (const k of ["cheers", "votes", "comments"]) $(`[data-n="${k}"]`, st).textContent = fmt(r[k]);
    st.hidden = false;
    Object.assign(c.dataset, { cheers: r.cheers, votes: r.votes });
  }
  setupSort();

  // หน้าโพสต์
  if (post) {
    const slug = post.dataset.postSlug;
    const r = by[slug] || { cheers: 0, votes: 0, comments: 0, my_cheer: false, my_vote: false };
    paintBars(r, { cheer: r.my_cheer, vote: r.my_vote });
    bindReactions(slug);
    await loadComments(slug);
    bindForm(slug);
  }
}

// ---------- ปุ่มกำลังใจ / โหวต ----------
function paintBars(r, mine) {
  for (const bar of $$("[data-reactbar]")) {
    for (const k of ["cheers", "votes", "comments"]) if (r[k] != null) $(`[data-n="${k}"]`, bar).textContent = fmt(r[k]);
    for (const b of $$("[data-react]", bar)) {
      b.disabled = false;
      if (mine && b.dataset.react in mine) b.setAttribute("aria-pressed", String(!!mine[b.dataset.react]));
    }
  }
}
function bindReactions(slug) {
  let busy = false;
  for (const b of $$("[data-react]")) b.addEventListener("click", async () => {
    if (busy) return; busy = true;
    const kind = b.dataset.react;
    const on = b.getAttribute("aria-pressed") !== "true";
    // อัปเดตหน้าจอทันทีก่อนรอเซิร์ฟเวอร์
    $$(`[data-react="${kind}"]`).forEach((x) => { x.setAttribute("aria-pressed", String(on)); if (on) { x.classList.remove("pop"); void x.offsetWidth; x.classList.add("pop"); } });
    try {
      const [res] = await rpc("toggle_reaction", { p_slug: slug, p_kind: kind, p_client: CID });
      paintBars({ cheers: res.cheers, votes: res.votes }, { [kind]: res.active });
      if (res.active) toast(kind === "cheer" ? "ส่งกำลังใจแล้ว ❤️ ขอบคุณ!" : "โหวตแล้ว 👍");
    } catch (e) {
      $$(`[data-react="${kind}"]`).forEach((x) => x.setAttribute("aria-pressed", String(!on)));
      toast(errText(e));
    } finally { busy = false; }
  });
}

// ---------- คอมเมนต์ ----------
function commentEl(c, pending = false) {
  const li = document.createElement("li");
  li.className = "citem" + (pending ? " pending" : "");
  const av = document.createElement("span");
  av.className = "cav"; av.textContent = [...c.name.trim()][0] || "?";
  av.style.background = ["#EC2D87", "#6A3FA0", "#29A9E0", "#2DBE6C", "#F7931E", "#3B3B98", "#12B3A8"][[...c.name].reduce((a, ch) => a + ch.codePointAt(0), 0) % 7];
  const box = document.createElement("div");
  const head = document.createElement("p"); head.className = "chead";
  const nm = document.createElement("b"); nm.textContent = c.name;
  const tm = document.createElement("span"); tm.className = "muted small";
  tm.textContent = pending ? " · รออนุมัติ (เห็นเฉพาะคุณ)" : " · " + thDate(c.created_at);
  head.append(nm, tm);
  const body = document.createElement("p"); body.className = "cbody"; body.textContent = c.body; // textContent = ปลอดภัยจาก XSS
  box.append(head, body); li.append(av, box);
  return li;
}
async function loadComments(slug) {
  const list = $("[data-clist]"); if (!list) return;
  const rows = await rpc("get_comments", { p_slug: slug });
  list.replaceChildren(...rows.map((c) => commentEl(c)));
  // คอมเมนต์ของเราที่ยังรออนุมัติ (เก็บในเครื่อง)
  const ids = new Set(rows.map((r) => r.id));
  const mine = store.get("uxp_pending", []).filter((p) => p.slug === slug && !ids.has(p.id) && Date.now() - p.t < 14 * 864e5);
  mine.forEach((p) => list.append(commentEl(p, true)));
  $("[data-cempty]").hidden = list.children.length > 0;
  const cc = $("[data-comment-count]"); if (cc && rows.length) cc.textContent = `(${rows.length})`;
}
function bindForm(slug) {
  const f = $("[data-cform]"); if (!f) return;
  const msg = $("[data-cmsg]", f), cnt = $("[data-ccount]", f);
  f.name.value = store.get("uxp_name", "");
  f.body.addEventListener("input", () => (cnt.textContent = f.body.value.length));
  f.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (f.website.value) return; // กับดักบอท
    const name = f.name.value.trim(), body = f.body.value.trim();
    if (!name || body.length < 2) { msg.textContent = "ใส่ชื่อเล่นและข้อความก่อนนะ"; return; }
    const btn = $("button[type=submit]", f); btn.disabled = true; msg.textContent = "กำลังส่ง…";
    try {
      const [res] = await rpc("add_comment", { p_slug: slug, p_name: name, p_body: body, p_client: CID });
      store.set("uxp_name", name);
      const item = { id: res.id, slug, name, body, created_at: new Date().toISOString(), t: Date.now() };
      if (res.status === "approved") {
        $("[data-clist]").append(commentEl(item));
        msg.textContent = "ขอบคุณสำหรับความเห็น! 🎉";
      } else {
        store.set("uxp_pending", [...store.get("uxp_pending", []).slice(-30), item]);
        $("[data-clist]").append(commentEl(item, true));
        msg.textContent = "ส่งแล้ว! ความเห็นจะขึ้นหลังทีมงานอนุมัติ 🙌";
      }
      $("[data-cempty]").hidden = true;
      f.body.value = ""; cnt.textContent = "0";
    } catch (e) {
      msg.textContent = /invalid_name|invalid_body/.test(e?.message) ? "ชื่อยาวไม่เกิน 40 ตัว ข้อความ 2–1000 ตัวอักษร" : errText(e);
    } finally { btn.disabled = false; }
  });
}

// ---------- เรียงตามยอดโหวตบนหน้ารายการ ----------
function setupSort() {
  const sel = $("[data-sort]"), grid = $("[data-filterable]");
  if (!sel || !grid) return;
  sel.closest(".sort").hidden = false;
  sel.addEventListener("change", () => {
    const k = sel.value;
    const cs = $$(".card", grid);
    cs.sort((a, b) => k === "new" ? b.dataset.date.localeCompare(a.dataset.date) : (+b.dataset[k] || 0) - (+a.dataset[k] || 0) || b.dataset.date.localeCompare(a.dataset.date));
    grid.append(...cs);
  });
}
