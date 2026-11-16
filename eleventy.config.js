// UXplain — Eleventy config
import fs from "node:fs";
const PILLARS = JSON.parse(fs.readFileSync("src/_data/pillars.json", "utf8"));
export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("year", new Date().getFullYear());
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // ทุกโพสต์ใน src/posts/ (ข้ามไฟล์ที่ขึ้นต้นด้วย _ และโพสต์ draft: true)
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md")
      .filter((p) => !p.data.draft && !p.page.inputPath.split("/").pop().startsWith("_"))
      .sort((a, b) => b.date - a.date)
  );

  const TH_MONTHS = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
  eleventyConfig.addFilter("thaiDate", (d) => {
    const x = new Date(d);
    return `${x.getUTCDate()} ${TH_MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear() + 543}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("byType", (posts, type) => posts.filter((p) => p.data.type === type));
  eleventyConfig.addFilter("byPillar", (posts, pillar) => posts.filter((p) => p.data.pillar === pillar));
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("readMinutes", (content) => {
    const text = String(content || "").replace(/<[^>]+>/g, "");
    return Math.max(1, Math.round(text.length / 900)); // ภาษาไทย ~900 ตัวอักษร/นาที
  });
  // รับลิงก์ YouTube แบบไหนก็ได้ แล้วดึง video id
  eleventyConfig.addFilter("youtubeId", (v) => {
    if (!v) return "";
    const m = String(v).match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    return m ? m[1] : String(v).trim();
  });
  eleventyConfig.addFilter("pillar", (key) => PILLARS.find((p) => p.key === key) || PILLARS[0]);
  eleventyConfig.addFilter("encode", (v) => encodeURIComponent(v || ""));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // ชื่อ repo = uxplain → เว็บอยู่ที่ https://spidyhero.github.io/uxplain/
    pathPrefix: process.env.PATH_PREFIX || "/uxplain/",
  };
}
