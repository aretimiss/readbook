# PDF Reader App

เว็บแอปพลิเคชันสำหรับอ่าน PDF ออนไลน์ที่เชื่อมต่อกับ Omeka S API

## การติดตั้ง

1. Clone โปรเจกต์
```bash
git clone <repository-url>
cd pdf-reader-app
```

2. ติดตั้ง dependencies
```bash
npm install
```

3. สร้างไฟล์ `.env` และใส่ API keys
```bash
cp .env.example .env
```

4. แก้ไขไฟล์ `.env` ใส่ค่าจริง:
```
REACT_APP_API_KEY_IDENTITY=your_actual_key_identity
REACT_APP_API_KEY_CREDENTIAL=your_actual_key_credential
REACT_APP_API_BASE_URL=https://your-api-domain.com/api/media
```

5. รันแอปพลิเคชัน
```bash
npm start
```

## ความปลอดภัย

- API keys ถูกเก็บใน environment variables
- ไฟล์ `.env` ถูก ignore ใน git
- ไม่แสดง API keys ใน console logs

## คุณสมบัติ

- แสดงรายการ PDF จาก Omeka S API
- แสดงข้อมูลไฟล์: ชื่อ, ขนาด, วันที่สร้าง
- เปิด PDF ในแท็บใหม่
- รองรับ CORS proxy หลายตัว
- Fallback เป็นข้อมูลจำลองเมื่อ API ไม่พร้อมใช้งาน

## โครงสร้างไฟล์

```
src/
  ├── App.js          # หน้าหลัก
  ├── index.js        # Entry point
  └── index.css       # Styles
public/
  └── index.html      # HTML template
.env                  # Environment variables (ไม่ commit)
.env.example          # ตัวอย่าง environment variables
.gitignore            # Git ignore rules
```