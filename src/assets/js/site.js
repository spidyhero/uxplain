// เมนูมือถือ
const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
btn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
// กรองหมวด + ค้นหา บนหน้า คลิป / บทความ
const grid = document.querySelector("[data-filterable]");
if (grid) {
  const cards = [...grid.querySelectorAll(".card")], empty = document.querySelector(".empty");
  const search = document.querySelector(".search");
  let pillar = new URLSearchParams(location.search).get("topic") || "all";
  const apply = () => {
    const q = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const ok = (pillar === "all" || c.dataset.pillar === pillar) && (!q || c.textContent.toLowerCase().includes(q));
      c.hidden = !ok; if (ok) shown++;
    });
    if (empty) empty.hidden = shown > 0;
    document.querySelectorAll(".f").forEach((b) => b.classList.toggle("on", b.dataset.f === pillar));
  };
  document.querySelectorAll(".f").forEach((b) => b.addEventListener("click", () => { pillar = b.dataset.f; apply(); }));
  search?.addEventListener("input", apply);
  apply();
}
