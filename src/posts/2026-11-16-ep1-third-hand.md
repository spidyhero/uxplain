---
title: "แชตกับ AI ไม่เคยมีแค่ 2 คน — “มือที่สาม” ชื่อ System Prompt"
date: 2026-11-16
type: video
episode: 1
pillar: ai
excerpt: "มีข้อความลับที่พูดกับ AI ก่อนคุณเสมอ งานวิจัยรางวัลยอดเยี่ยมจาก CHI 2026 ถามผู้ใช้ 109 คนว่าอยากเห็นและอยากควบคุมมันแค่ไหน"
youtube: ""
vertical: true
question: "คุณอยากได้ “ปุ่มตั้งค่า” หรือ “แก้เองทั้งหมด”? คอมเมนต์บอกหน่อย 👇"
source:
  cite: "Neumann, A., Pi, Y., & Singh, J. (2026). Who Controls the Conversation? User Perspectives on Generative AI (LLM) System Prompts. CHI '26, Barcelona. ACM. (Best Paper)"
  url: "https://doi.org/10.1145/3772318.3791726"
tags: [UXplain, SystemPrompt, HCI, AIรอบตัว]
---

<div class="ux-tldr">
<p><b>สรุปใน 30 วินาที</b> ทุกครั้งที่เราแชตกับ AI จะมี <b>System Prompt</b> หรือคำสั่งที่บริษัทเขียนไว้ล่วงหน้า กำหนดบทบาท น้ำเสียง กฎ และค่านิยมของ AI และส่วนใหญ่ถูกซ่อนไว้ งานนี้วิเคราะห์ System Prompt จริง 1,309 ชุด และสำรวจผู้ใช้ 109 คน พบว่า <b>89%</b> อยากให้โปร่งใส <b>79%</b> อยากควบคุมได้บ้าง แต่มีเพียง <b>8%</b> ที่อยากแก้ได้แบบไม่จำกัด</p>
</div>

<nav class="ux-toc" aria-label="ในบทความนี้"><a href="#easy">เข้าใจง่าย</a><a href="#numbers">ตัวเลขสำคัญ</a><a href="#designers">สำหรับนักออกแบบ</a><a href="#researchers">สำหรับนักวิจัย</a></nav>

<h2 id="easy">เรื่องนี้คืออะไร เล่าแบบเข้าใจง่าย</h2>

เราคิดว่าการคุยกับ AI มีแค่สองฝ่าย คือเรากับ AI แต่จริง ๆ มี **ฝ่ายที่สาม** พูดไปก่อนแล้วเสมอ นั่นคือบริษัทหรือนักพัฒนา ซึ่งเขียน System Prompt ไว้ตั้งแต่ก่อนเราพิมพ์คำแรก งานวิจัยนิยามว่าเป็น “คำสั่งที่ผู้พัฒนาหรือผู้ให้บริการตั้งไว้ล่วงหน้าเพื่อกำกับพฤติกรรมของ LLM” และมีผลตลอดทั้งบทสนทนา

<div class="ux-cols3">
<div class="ux-box"><b>คุณ</b><span>พิมพ์คำถาม เช่น “แนะนำร้านกาแฟหน่อย”</span></div>
<div class="ux-box"><b style="color:var(--indigo)">AI</b><span>ตอบกลับ โดยทำตามทั้งคำถามของคุณและคำสั่งที่ตั้งไว้ก่อน</span></div>
<div class="ux-box ux-third"><b style="color:var(--red)">มือที่สาม: System Prompt</b><span>บอก AI ว่าต้องเป็นใคร พูดสไตล์ไหน ห้ามพูดอะไร และให้ความสำคัญกับอะไร</span></div>
</div>

ปัญหาคือแพลตฟอร์มส่วนใหญ่สั่งให้ AI **ซ่อน** คำสั่งเหล่านี้ ผู้ใช้จึงไม่รู้ว่าคำตอบที่ได้ถูกกำหนดกรอบไว้อย่างไร

### นักวิจัยทำอะไร

<div class="ux-pipe">
<div class="ux-box"><small>ขั้นที่ 1 · อ่านคำสั่งจริง</small><span class="ux-big" style="color:var(--indigo)">1,309</span><span>System Prompt จากแหล่งทางการและชุมชน (เช่น Anthropic, xAI, Azure และคลังบน GitHub) จัดกลุ่มเนื้อหาเป็น 7 หัวข้อ</span></div>
<div class="ux-arrow" aria-hidden="true">→</div>
<div class="ux-box"><small>ขั้นที่ 2 · ถามผู้ใช้</small><span class="ux-big" style="color:var(--red)">109</span><span>ผู้ใช้ AI ตอบแบบสำรวจออนไลน์ เรื่องการรับรู้ ประโยชน์ ความเสี่ยง ความโปร่งใส และการควบคุม พร้อมดูหน้าจอแชตจำลอง</span></div>
</div>

### 4 สิ่งที่ค้นพบ

<div class="ux-cols2">
<div class="ux-card"><span class="ux-tag">1 · รู้กันไม่ทั่ว</span><p>ผู้ใช้ <b>11.9%</b> ไม่รู้เลยว่ามี System Prompt และอีก <b>45%</b> แค่สงสัยว่าน่าจะมี</p></div>
<div class="ux-card"><span class="ux-tag">2 · อยากเห็น</span><p><b>89%</b> อยากให้เปิดเผยอย่างน้อยบางส่วน แม้หลายคนกังวลเรื่องความปลอดภัยถ้าเปิดทั้งหมด</p></div>
<div class="ux-card"><span class="ux-tag">3 · อยากคุม แต่ไม่ใช่ทั้งหมด</span><p><b>79%</b> อยากควบคุมได้บ้าง แต่มีแค่ <b>8%</b> ที่อยากแก้ได้อิสระทุกอย่าง ส่วนใหญ่เลือกตั้งค่าตามความชอบหรือ Preset</p></div>
<div class="ux-card"><span class="ux-tag">4 · กลัวความลำเอียง</span><p>ความเสี่ยงที่ให้น้ำหนักมากที่สุดคือ System Prompt ถูกใช้ใส่ <b>มุมมองที่ลำเอียง</b> ค่านิยมที่อยากให้ AI ยึดถือที่สุดคือความเป็นส่วนตัวและความไม่ลำเอียง</p></div>
</div>

> “I believe companies may try to manipulate the AI to give answers that would benefit the companies.” — ผู้ร่วมวิจัยคนหนึ่ง (ฉันเชื่อว่าบริษัทอาจพยายามบงการ AI ให้ตอบเพื่อประโยชน์ของบริษัท)

<h2 id="numbers">ตัวเลขสำคัญจากผู้ใช้ 109 คน</h2>

<div class="ux-stats">
<div><span class="n" style="color:var(--indigo)">89%</span><span>อยากให้ System Prompt โปร่งใสอย่างน้อยบางส่วน</span></div>
<div><span class="n" style="color:var(--pink)">79%</span><span>อยากควบคุมได้ในรูปแบบใดรูปแบบหนึ่ง</span></div>
<div><span class="n" style="color:var(--red)">8%</span><span>อยากแก้ไขได้แบบไม่จำกัด (8.3%)</span></div>
<div><span class="n">98%</span><span>เห็นว่ามีประโยชน์ (98.2%) ส่วน 84% เห็นความเสี่ยง</span></div>
</div>

<div class="ux-card">
<p class="ux-ftitle">ผู้ใช้รู้จัก System Prompt แค่ไหน</p>
<div class="ux-split" role="img" aria-label="รู้จัก 43.1%, สงสัยว่าน่าจะมี 45%, ไม่รู้เลย 11.9%"><i style="flex:43.1;background:var(--indigo)"></i><i style="flex:45;background:#8C8CD0"></i><i style="flex:11.9;background:var(--red)"></i></div>
<p class="ux-legend"><span><i style="background:var(--indigo)"></i>รู้จัก 43.1%</span><span><i style="background:#8C8CD0"></i>สงสัยว่าน่าจะมี 45%</span><span><i style="background:var(--red)"></i>ไม่รู้เลย 11.9%</span></p>
</div>

<div class="ux-cols2">
<div class="ux-card"><p class="ux-ftitle">อยากควบคุมแบบไหน</p>
<div class="ux-bars" role="img" aria-label="ตั้งค่าตามความชอบ 20.2%, Preset 14.7%, AI ปรับอัตโนมัติ 13.8%, แก้ไขได้ไม่จำกัด 8.3%">
<div><span>ตั้งค่าตามความชอบ</span><b style="--v:20.2%">20.2%</b></div>
<div><span>เลือกจาก Preset</span><b style="--v:14.7%">14.7%</b></div>
<div><span>AI ปรับตามผู้ใช้อัตโนมัติ</span><b style="--v:13.8%">13.8%</b></div>
<div><span>แก้ไขได้ไม่จำกัด</span><b class="hl" style="--v:8.3%">8.3%</b></div>
</div>
<p class="ux-note">% ของผู้ตอบทั้งหมด</p></div>
<div class="ux-card"><p class="ux-ftitle">อยากตั้งค่าที่ไหนในแอป</p>
<div class="ux-bars" role="img" aria-label="Settings 47%, ใช้ครั้งแรก 38%, รายเซสชัน 36%, ในแชต 35%">
<div><span>หน้า Settings</span><b style="--v:47%">47%</b></div>
<div><span>ตอนเริ่มใช้งานครั้งแรก</span><b style="--v:38%">38%</b></div>
<div><span>แยกตามแต่ละเซสชัน</span><b style="--v:36%">36%</b></div>
<div><span>สั่งในแชต</span><b style="--v:35%">35%</b></div>
</div>
<p class="ux-note">% ของผู้ตอบ (เลือกได้มากกว่า 1 ข้อ)</p></div>
<div class="ux-card"><p class="ux-ftitle">อยากรู้เมื่อไหร่ว่า AI ถูกตั้งคำสั่งอะไร</p>
<div class="ux-bars" role="img" aria-label="ใช้ครั้งแรก 60%, ระบบอัปเดต 55%, หน้า Settings 55%">
<div><span>ตอนใช้งานครั้งแรก</span><b style="--v:60%">60%</b></div>
<div><span>เมื่อระบบอัปเดต</span><b style="--v:55%">55%</b></div>
<div><span>ในหน้า Settings</span><b style="--v:55%">55%</b></div>
</div>
<p class="ux-note">รูปแบบที่ชอบ: แสดงคำสั่งเต็ม 27% · สรุปย่อ 23%</p></div>
<div class="ux-card"><p class="ux-ftitle">ข้อกังวลถ้าเปิดเผยคำสั่งทั้งหมด</p>
<div class="ux-bars" role="img" aria-label="ความปลอดภัย 73%, ถูกนำไปใช้ผิด 57%, ใช้ทางการเมือง 40%">
<div><span>ความปลอดภัยของระบบ</span><b style="--v:73%">73%</b></div>
<div><span>ถูกนำไปใช้ในทางที่ผิด</span><b style="--v:57%">57%</b></div>
<div><span>ใช้เป็นเครื่องมือทางการเมือง</span><b style="--v:40%">40%</b></div>
</div>
<p class="ux-note">แม้มีข้อกังวลเหล่านี้ ผู้ใช้ 89% ยังอยากให้โปร่งใส</p></div>
</div>

<div class="ux-cols2">
<div class="ux-card"><p class="ux-ftitle">ประโยชน์ที่ให้น้ำหนักมากที่สุด</p>
<div class="ux-bars" role="img" aria-label="ความปลอดภัย 16.3, ความแม่นยำ 16.2, ระบบทำงานถูกต้อง 10.8">
<div><span>ความปลอดภัย</span><b style="--v:81.5%">16.3</b></div>
<div><span>ความแม่นยำ/น่าเชื่อถือ</span><b style="--v:81%">16.2</b></div>
<div><span>ระบบทำงานถูกต้อง</span><b style="--v:54%">10.8</b></div>
</div>
<p class="ux-note">คะแนนเฉลี่ยจากการแบ่ง 100 คะแนน (สเกล 0–20)</p></div>
<div class="ux-card"><p class="ux-ftitle">ความเสี่ยงที่กังวลมากที่สุด</p>
<div class="ux-bars" role="img" aria-label="ใส่มุมมองลำเอียง 16.4, มาตรฐานคำตอบไม่พอ 14.3, ระบบผิดพลาด 12.6">
<div><span>ใส่มุมมองที่ลำเอียง</span><b class="hl" style="--v:82%">16.4</b></div>
<div><span>มาตรฐานคำตอบไม่เพียงพอ</span><b style="--v:71.5%">14.3</b></div>
<div><span>ระบบทำงานผิดพลาด</span><b style="--v:63%">12.6</b></div>
</div>
<p class="ux-note">คะแนนเฉลี่ยจากการแบ่ง 100 คะแนน (สเกล 0–20)</p></div>
</div>

<h2 id="designers">สำหรับนักออกแบบ UX/UI: เอาไปใช้อย่างไร</h2>

แนวทางทั้ง 6 ข้อมาจากผลสำรวจและบทอภิปรายของงานวิจัย แต่ละข้อมีหลักฐานกำกับไว้

<div class="ux-cols2">
<div class="ux-card"><h3>1. โปร่งใสอย่างมีความหมาย ไม่ใช่โชว์ทุกบรรทัด</h3><p>แสดงข้อมูลตอนเริ่มใช้ครั้งแรก เมื่อมีการอัปเดต และในหน้า Settings ให้เลือกดูได้ทั้งแบบสรุปและแบบเต็ม</p><p class="ux-ev"><b>หลักฐาน:</b> ช่วงเวลาที่อยากรู้ 60% / 55% / 55% · ผู้เขียนระบุว่า “meaningful transparency does not entail making all information visible”</p></div>
<div class="ux-card"><h3>2. ให้ควบคุมแบบมีโครงสร้าง</h3><p>ใช้ตัวเลือกความชอบ สวิตช์ และ Preset แทนกล่องข้อความเปล่าให้ผู้ใช้เขียน System Prompt เอง</p><div class="ux-dodont"><div class="do"><b>ควรทำ</b>สวิตช์ “อธิบายด้วยภาษาง่าย” และชิป Preset เช่น สั้น / ละเอียด / เป็นกันเอง</div><div class="dont"><b>ควรเลี่ยง</b>กล่อง “เขียน System Prompt ของคุณ” ที่ว่างเปล่า</div></div><p class="ux-ev"><b>หลักฐาน:</b> ความชอบ 20% + Preset 15% เทียบกับแก้อิสระ 8%</p></div>
<div class="ux-card"><h3>3. ระวังการควบคุมแบบหลอกตา</h3><p>ตัวเลือกต้องเปลี่ยนพฤติกรรม AI ได้จริง ถ้าผู้ใช้รู้สึกว่าคุมได้แต่ผลไม่ต่าง จะเกิด <i>superficial agency</i> และตัวเลือกที่มากเกินไปก็ลดความรู้สึกควบคุมได้เช่นกัน</p><p class="ux-ev"><b>หลักฐาน:</b> “excessive control can diminish agency when it overwhelms stakeholders' capacity to make informed decisions”</p></div>
<div class="ux-card"><h3>4. วางตัวควบคุมไว้ที่คนหาเจอ</h3><p>หน้า Settings คือที่ที่คาดหวังมากที่สุด รองลงมาคือ onboarding ส่วนการปรับในแชตหรือรายเซสชันเป็นตัวเสริม</p><p class="ux-ev"><b>หลักฐาน:</b> Settings 47% · ใช้ครั้งแรก 38% · รายเซสชัน 36% · ในแชต 35%</p></div>
<div class="ux-card"><h3>5. บอกเมื่อคำสั่งเปลี่ยน</h3><p>ทำ changelog ของ System Prompt ที่ผู้ใช้อ่านได้ ว่าเปลี่ยนอะไร เมื่อไหร่ ทำไม และใครเปลี่ยน</p><p class="ux-ev"><b>หลักฐาน:</b> ผู้เขียนเสนอให้มอง System Prompt เป็น “versioned, auditable artifacts” และ 55% อยากรู้เมื่อระบบอัปเดต</p></div>
<div class="ux-card"><h3>6. ตอบเรื่องความลำเอียงและความเป็นส่วนตัวก่อน</h3><p>ถ้าจะสื่อสารค่านิยมของ AI ให้เริ่มจากสองเรื่องที่ผู้ใช้ให้ความสำคัญที่สุด และอธิบายว่าคำสั่งจัดการเรื่องเหล่านี้อย่างไร</p><p class="ux-ev"><b>หลักฐาน:</b> ค่านิยม 4 อันดับแรกถูกเลือกเกิน 50%: ความเป็นส่วนตัว ความไม่ลำเอียง ความเป็นอยู่ที่ดีของมนุษย์ และความรับผิดชอบ</p></div>
</div>

<h2 id="researchers">สำหรับนักวิจัย: วิธีวิจัยโดยละเอียด</h2>

### ส่วน A: วิเคราะห์เนื้อหา System Prompt

- ชุดข้อมูล 1,309 prompts จากแหล่งทางการ (Anthropic, xAI, Azure System Prompt Templates และโค้ดที่เปิดเผยของ Veteran's Administration) และคลังบน GitHub ที่ชุมชนรวบรวม ส่วนใหญ่เป็นคอลเลกชันแบบ CustomGPT (1,107 prompts)
- เข้ารหัสด้วยมือ 41 prompts แล้วใช้เครื่องมือ LLooM สกัดได้ 240 concepts จัดเป็น 7 หัวข้อ

<p class="ux-chips"><span>AI Role &amp; Identity</span><span>Capabilities &amp; Domain Specifics</span><span>Communication Style &amp; Structure</span><span>Compliance, Safety &amp; Security</span><span>Deployment &amp; Operation</span><span>Intrinsic Values &amp; Principles</span><span>Response Quality</span></p>

### ส่วน B: แบบสำรวจผู้ใช้ปลายทาง

- ตอบครบ 110 คน ตัดออก 1 คน (ตอบเป็นภาษาฝรั่งเศสทั้งหมด) เหลือ N = 109 กลุ่มตัวอย่างใช้ภาษาอังกฤษ ผ่านการรับรองจริยธรรมของสถาบันผู้วิจัย
- เครื่องมือ: แบ่ง 100 คะแนนให้ข้อความด้านประโยชน์และความเสี่ยง เลือกค่านิยมได้สูงสุด 5 ข้อต่อหัวข้อ ให้คะแนนความสบายใจต่อตัวอย่าง prompt (Likert 5 ระดับ) และตอบเรื่องความโปร่งใส/การควบคุมผ่านหน้าจอแชตจำลอง
- วิเคราะห์ด้วยสถิติเชิงพรรณนาร่วมกับคำตอบปลายเปิด

<div class="ux-table"><table>
<thead><tr><th>ลักษณะกลุ่มตัวอย่าง</th><th>ค่า</th><th>หมายเหตุ</th></tr></thead>
<tbody>
<tr><td>ใช้ AI ทุกวันขึ้นไป</td><td class="num">44.0%</td><td>หลายครั้งต่อวัน 22.0% · วันละครั้ง 22.0%</td></tr>
<tr><td>ใช้รายสัปดาห์</td><td class="num">46.8%</td><td>หลายครั้งต่อสัปดาห์ 33.9%</td></tr>
<tr><td>ใช้เดือนละครั้งหรือน้อยกว่า</td><td class="num">9.2%</td><td></td></tr>
<tr><td>งานที่ใช้ AI มากที่สุด</td><td class="num">73.4%</td><td>การเรียนรู้และการศึกษา · วิจัย/วิเคราะห์/ตัดสินใจ 56.9% · งานสนับสนุนส่วนตัว/อาชีพ 51.4%</td></tr>
<tr><td>ความรู้ด้าน AI ที่ประเมินตนเอง</td><td class="num">62.2</td><td>จาก 100 (SD 18.6, มัธยฐาน 65)</td></tr>
</tbody></table></div>

### ข้อจำกัดที่ผู้เขียนระบุ

- ชุด prompt อาจไม่ครอบคลุมความหลากหลายของ prompt ที่ใช้จริงทั้งหมด เพราะเข้าถึง prompt ของระบบจริงได้ไม่ครบ
- กลุ่มตัวอย่าง 109 คนที่ใช้ภาษาอังกฤษ อาจสรุปไปยังบริบทนอกโลกตะวันตกได้จำกัด
- วัด “ความต้องการที่ระบุเอง” ไม่ใช่พฤติกรรมจริง และไม่ได้ศึกษากรณีที่ prompt ควบคุมพฤติกรรม AI ไม่ได้ตามที่เขียน
- การเห็นข้อความใน prompt อาจไม่สะท้อนผลจริงของมัน การกำกับดูแลจึงไม่ควรพึ่งการตรวจถ้อยคำอย่างเดียว

### คำถามวิจัยต่อยอด

<p class="muted small">ข้อเสนอของ UXplain จากข้อจำกัดข้างต้น ไม่ใช่ข้อสรุปของผู้เขียน</p>

- ทำซ้ำกับผู้ใช้ชาวไทยหรือเอเชียตะวันออกเฉียงใต้ ว่าความต้องการความโปร่งใสและการควบคุมต่างจากกลุ่มตัวอย่างภาษาอังกฤษหรือไม่
- ทดลองเชิงพฤติกรรม: เมื่อมีสวิตช์หรือ Preset จริง ผู้ใช้ใช้งานบ่อยแค่ไหน และความไว้วางใจเปลี่ยนไปอย่างไร
- เปรียบเทียบรูปแบบการเปิดเผย (สรุป, แบบเต็ม, changelog) ต่อความเข้าใจและความเชื่อมั่น
- วัดว่าการควบคุมแบบหลอกตาส่งผลต่อความไว้วางใจอย่างไรเมื่อผู้ใช้รู้ความจริง

<p class="muted small">แหล่งข้อมูล: ฉบับ arXiv <a href="https://arxiv.org/abs/2603.00089" rel="noopener">arxiv.org/abs/2603.00089</a> · ข่าวรางวัล Best Paper จาก <a href="https://rc-trust.ai/news/news-detail/who-controls-ai-conversations" rel="noopener">Research Center Trust, UA Ruhr</a> (ตัวเปเปอร์ไม่ได้ระบุรางวัล) · ตารางที่ 5 ของเปเปอร์ให้คะแนนความเสี่ยงด้านความลำเอียงไม่ตรงกับเนื้อความ (19.7 กับ 16.4) หน้านี้ใช้ค่าในเนื้อความ</p>
