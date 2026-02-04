# Quora Clone API (Backend Skill Checkpoint)

โปรเจกต์นี้เป็น RESTful API สำหรับระบบถาม-ตอบ (Q&A Platform) ที่จำลองการทำงานคล้ายกับเว็บไซต์ Quora พัฒนาโดยใช้ **Node.js**, **Express**, และฐานข้อมูล **PostgreSQL**

## Tech Stack (เทคโนโลยีที่ใช้)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Library:** pg (node-postgres), cors, dotenv

##  Features (ความสามารถของระบบ)
- สร้าง, อ่าน, แก้ไข, และลบคำถาม (CRUD Questions)
- ค้นหาคำถามจากหัวข้อ (Title) หรือหมวดหมู่ (Category)
- สร้างและอ่านคำตอบของแต่ละคำถาม (Answers)
- ระบบจัดการความสัมพันธ์ (เมื่อลบคำถาม คำตอบจะถูกลบไปด้วย)

##  Installation & Setup (วิธีติดตั้งและรัน)

1. **Clone โปรเจกต์**
   ```bash
   git clone <your-repo-url>
   cd backend-skill-checkpoint

2.ติดตั้ง Dependencies
npm install

3.ตั้งค่า Database
ตรวจสอบไฟล์ utils/db.mjs
แก้ไข connectionString ให้ตรงกับ PostgreSQL ของเครื่องคุณ
รันคำสั่ง SQL Script (เพื่อสร้างตาราง questions และ answers)

4.รัน Server
npm start
Server จะทำงานที่ http://localhost:4000

GET    /questions         ดูรายการคำถามทั้งหมด (รองรับ ?keywords=...)
GET    /questions/:id    ดูรายละเอียดคำถามตาม ID
POST  /questions         สร้างคำถามใหม่
PUT    /questions/:id    แก้ไขหัวข้อหรือรายละเอียดคำถาม
DELETE /questions/:id  ลบคำถาม (คำตอบที่เกี่ยวข้องจะหายไป)

ตัวอย่าง Body สำหรับ POST /questions:
{
  "title": "Topic Name",
  "description": "Question detail...",
  "category": "Software"
}

Answers (จัดการคำตอบ)
GET/questions/:id/answersดูคำตอบทั้งหมดของคำถามนั้น
POST/questions/:id/answersเพิ่มคำตอบให้คำถามนั้น

ตัวอย่าง Body สำหรับ POST Answers
{
  "content": "This is an answer (max 300 chars)."
}



