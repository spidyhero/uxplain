# UXplain 🎮 — UX ยาก? เดี๋ยว x เพลนให้

เว็บไซต์ + คอมมูนิตี้ของ UXplain สร้างด้วย [Eleventy](https://www.11ty.dev/) และขึ้นเว็บฟรีผ่าน GitHub Pages
คอมเมนต์และบอร์ดถาม-ตอบใช้ [giscus](https://giscus.app) (เก็บข้อมูลใน GitHub Discussions)

เว็บจะอยู่ที่ **https://spidyhero.github.io/uxplain/**

---

## 1) ขึ้นเว็บครั้งแรก

1. Push โฟลเดอร์นี้ขึ้น `https://github.com/spidyhero/uxplain` (branch `main`)
   ```bash
   git init
   git add .
   git commit -m "UXplain website"
   git branch -M main
   git remote add origin https://github.com/spidyhero/uxplain.git
   git push -u origin main
   ```
   (repo ต้องเป็น **Public** เพื่อให้ Pages กับ giscus ใช้ได้ฟรี)
2. ไปที่ **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**
3. เปิดแท็บ **Actions** รอให้ “Deploy UXplain to GitHub Pages” ขึ้นเครื่องหมาย ✅ (ประมาณ 1 นาที) แล้วเปิดเว็บได้เลย

## 2) เปิดคอมเมนต์ + บอร์ดคอมมูนิตี้ (giscus)

1. **Settings → General → Features** ติ๊ก **Discussions**
2. ไปที่แท็บ **Discussions → Categories** (ไอคอนดินสอ) แล้วสร้าง/ตรวจหมวด:
   | ชื่อหมวด | รูปแบบ | ใช้ทำอะไร |
   |---|---|---|
   | `Announcements` | **Announcement** (มีให้แล้ว) | คอมเมนต์ใต้โพสต์ (ให้ giscus เป็นคนสร้างเธรด) |
   | `Q&A` | Question / Answer | กระดานรวมในหน้าคอมมูนิตี้ |
   | `Ideas` | Open-ended | เสนอหัวข้อ |
   | `Show and tell` | Open-ended | แชร์งาน |
3. ติดตั้งแอป giscus ให้ repo นี้: https://github.com/apps/giscus
4. เข้า https://giscus.app → ใส่ repo `spidyhero/uxplain` → เลือกหมวด `Announcements` แล้วคัดลอกค่า `data-repo-id` และ `data-category-id`
   จากนั้นเปลี่ยนหมวดเป็น `Q&A` แล้วคัดลอก `data-category-id` อีกครั้ง
5. แก้ไฟล์ `src/_data/site.json`:
   ```json
   "giscus": {
     "repo": "spidyhero/uxplain",
     "repoId": "R_xxxxxxxx",
     "category": "Announcements",
     "categoryId": "DIC_xxxxxxxx",
     "boardCategory": "Q&A",
     "boardCategoryId": "DIC_yyyyyyyy"
   }
   ```
   Commit แล้วเว็บจะ build ใหม่เอง

> ผู้ชมต้องมีบัญชี GitHub (สมัครฟรี) เพื่อคอมเมนต์ ส่วนการอ่านไม่ต้องล็อกอิน

## 3) โพสต์คลิป / บทความใหม่ (ทำบนเว็บ GitHub ได้เลย)

1. เปิดโฟลเดอร์ `src/posts/` → **Add file → Create new file**
2. ตั้งชื่อไฟล์ `ปปปป-ดด-วว-ชื่อสั้นภาษาอังกฤษ.md` เช่น `2026-11-18-ep2-haptic-gloves.md`
   (ชื่อหลังวันที่จะกลายเป็นลิงก์ เช่น `/videos/ep2-haptic-gloves/`)
3. คัดลอกหัวไฟล์จาก `src/posts/_TEMPLATE.md` มาวาง แล้วแก้:
   - `type: video` สำหรับคลิป, `type: article` สำหรับบทความ
   - `pillar:` หมวด — `screen` `ai` `voice` `physical` `xr` `brain` `access`
   - คลิป: วางลิงก์ YouTube/Shorts ใน `youtube:` หรือลิงก์คลิปเพจ FB ใน `facebook:`
4. เขียนเนื้อหาด้วย Markdown ใต้เส้น `---` แล้วกด **Commit changes** → ประมาณ 1 นาทีเว็บจะอัปเดต
5. ใส่รูปประกอบ: อัปโหลดไว้ที่ `src/assets/img/posts/` แล้วเรียกใช้ `![คำอธิบาย](/uxplain/assets/img/posts/ชื่อรูป.png)`

ซ่อนโพสต์ชั่วคราว: ใส่ `draft: true`

## 4) แก้ข้อมูลเว็บ

- ชื่อ สโลแกน ลิงก์ Facebook/YouTube/TikTok → `src/_data/site.json`
- 7 หมวด + สี + มาสคอต → `src/_data/pillars.json`
- สีและหน้าตา → `src/assets/css/style.css`
- รูปปก/โปรไฟล์ → `src/assets/img/`

## 5) ดูตัวอย่างบนเครื่องตัวเอง (ไม่บังคับ)

ต้องมี Node.js 18+
```bash
npm install
npm start        # เปิด http://localhost:8080/uxplain/
```

## โครงสร้าง

```
src/
  _data/site.json, pillars.json   ← ตั้งค่า
  _includes/                      ← layout + ส่วนประกอบ
  posts/                          ← บทความ/คลิป (.md)
  assets/                         ← css, js, รูป, ตัวละคร
  index.njk videos.njk articles.njk topics/ community.njk about.njk
.github/workflows/deploy.yml      ← build + deploy อัตโนมัติ
```

ถ้าเปลี่ยนชื่อ repo ให้แก้ `pathPrefix` ใน `eleventy.config.js` ให้ตรงกับชื่อใหม่ (หรือใช้ `/` ถ้าเป็น repo `spidyhero.github.io`)
