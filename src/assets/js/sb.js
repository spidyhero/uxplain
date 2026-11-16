// เรียก Supabase แบบเบา ๆ ด้วย fetch (ไม่ต้องโหลดไลบรารี)
const CFG = window.UXPLAIN || {};
export const enabled = !!(CFG.sbUrl && CFG.sbKey);
const base = (CFG.sbUrl || "").replace(/\/$/, "");

async function call(path, { method = "POST", body, token } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: { apikey: CFG.sbKey, Authorization: "Bearer " + (token || CFG.sbKey), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const txt = await res.text();
  const data = txt ? JSON.parse(txt) : null;
  if (!res.ok) throw new Error((data && (data.message || data.msg || data.error_description || data.error)) || res.statusText);
  return data;
}
export const rpc = (fn, args = {}, token) => call("/rest/v1/rpc/" + fn, { body: args, token });

// ---------- ล็อกอินผู้ดูแลด้วยลิงก์ทางอีเมล ----------
const KEY = "uxp_admin_session";
export const auth = {
  async sendLink(email, redirectTo) {
    return call("/auth/v1/otp?redirect_to=" + encodeURIComponent(redirectTo), { body: { email, create_user: true } });
  },
  // หลังกดลิงก์ในอีเมล Supabase จะส่งกลับมาพร้อม #access_token=...
  captureFromUrl() {
    const h = new URLSearchParams(location.hash.slice(1));
    if (h.get("access_token")) {
      const s = { access_token: h.get("access_token"), refresh_token: h.get("refresh_token"), expires_at: Date.now() / 1000 + (+h.get("expires_in") || 3600) };
      localStorage.setItem(KEY, JSON.stringify(s));
      history.replaceState(null, "", location.pathname + location.search);
    }
    if (h.get("error_description")) return h.get("error_description");
  },
  async token() {
    let s; try { s = JSON.parse(localStorage.getItem(KEY)); } catch {}
    if (!s) return null;
    if (s.expires_at - 60 < Date.now() / 1000) {
      try {
        const r = await call("/auth/v1/token?grant_type=refresh_token", { body: { refresh_token: s.refresh_token } });
        s = { access_token: r.access_token, refresh_token: r.refresh_token, expires_at: r.expires_at || Date.now() / 1000 + r.expires_in };
        localStorage.setItem(KEY, JSON.stringify(s));
      } catch { localStorage.removeItem(KEY); return null; }
    }
    return s.access_token;
  },
  async user(token) { return call("/auth/v1/user", { method: "GET", token }); },
  async signOut() {
    const t = await this.token();
    localStorage.removeItem(KEY);
    if (t) try { await call("/auth/v1/logout", { token: t }); } catch {}
  },
};
