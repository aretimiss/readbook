# PDF Reader App

เว็บแอปพลิเคชันสำหรับอ่าน PDF ออนไลน์ที่เชื่อมต่อกับ Omeka S API

![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Demo

[Live Demo](https://your-username.github.io/pdf-reader-app) (อัพเดตลิงค์หลังจาก deploy)

## 📋 คุณสมบัติ

- 📄 แสดงรายการ PDF จาก Omeka S API
- 📊 แสดงข้อมูลไฟล์: ชื่อ, ขนาด, วันที่สร้าง
- 🔗 เปิด PDF ในแท็บใหม่
- 🔒 รองรับ CORS proxy หลายตัว
- 🔐 ซ่อน API keys ด้วย environment variables
- 📱 Responsive design

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
## 🛠️
 เทคโนโลยีที่ใช้

- **Frontend:** React 18.2.0
- **HTTP Client:** Axios
- **Styling:** CSS3
- **API:** Omeka S REST API

## 📸 Screenshots

![PDF Reader App](./screenshots/main-page.png)

## 🚀 การ Deploy

### GitHub Pages

1. ติดตั้ง gh-pages
```bash
npm install --save-dev gh-pages
```

2. เพิ่มใน package.json
```json
{
  "homepage": "https://your-username.github.io/pdf-reader-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy
```bash
npm run deploy
```

### Netlify/Vercel

1. เชื่อมต่อ GitHub repository
2. ตั้งค่า environment variables
3. Deploy อัตโนมัติ

## 🤝 การมีส่วนร่วม

1. Fork โปรเจกต์
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📝 License

โปรเจกต์นี้ใช้ MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 👨‍💻 ผู้พัฒนา

- **Your Name** - [GitHub](https://github.com/your-username)

## 🙏 ขอบคุณ

- [Omeka S](https://omeka.org/s/) สำหรับ API
- [React](https://reactjs.org/) สำหรับ framework
- CORS proxy services สำหรับการแก้ปัญหา CORS