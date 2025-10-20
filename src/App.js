import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ใช้ environment variables เพื่อซ่อน API keys
const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://z277970-rr25o5.ps07.zwhhosting.com/omekas/api/media';
const API_PARAMS = {
  key_identity: process.env.REACT_APP_API_KEY_IDENTITY,
  key_credential: process.env.REACT_APP_API_KEY_CREDENTIAL
};

function App() {
  const [pdfData, setPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPdfData();
  }, []);

  const fetchPdfData = async () => {
    try {
      setLoading(true);

      // ตรวจสอบว่ามี API keys หรือไม่
      if (!API_PARAMS.key_identity || !API_PARAMS.key_credential) {
        throw new Error('API keys not found. Please check your .env file.');
      }

      // ลองใช้ proxy service หลายตัว
      const apiUrl = `${API_URL}?key_identity=${API_PARAMS.key_identity}&key_credential=${API_PARAMS.key_credential}`;

      console.log('Fetching from URL:', apiUrl.replace(API_PARAMS.key_identity, '***').replace(API_PARAMS.key_credential, '***'));

      let response;
      let actualData;

      try {
        // ลอง proxy ใหม่: allorigins
        const corsProxy1 = 'https://api.allorigins.win/get?url=';
        const proxyUrl1 = corsProxy1 + encodeURIComponent(apiUrl);
        console.log('Trying allorigins proxy:', proxyUrl1);

        response = await axios.get(proxyUrl1, {
          timeout: 15000,
        });
        actualData = JSON.parse(response.data.contents);
      } catch (err1) {
        console.log('allorigins failed, trying jsonp proxy');

        try {
          // ลอง proxy ที่สอง: jsonp
          const corsProxy2 = 'https://api.codetabs.com/v1/proxy?quest=';
          const proxyUrl2 = corsProxy2 + encodeURIComponent(apiUrl);
          console.log('Trying codetabs proxy:', proxyUrl2);

          response = await axios.get(proxyUrl2, {
            timeout: 15000,
          });
          actualData = response.data;
        } catch (err2) {
          console.log('codetabs failed, trying direct call with no-cors mode');

          // ลองเรียกตรงโดยไม่ใช้ proxy (อาจไม่ได้ผลแต่ลองดู)
          response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'no-cors',
          });

          if (response.ok) {
            actualData = await response.json();
          } else {
            throw new Error('All proxy methods failed');
          }
        }
      }

      console.log('API Response:', actualData);

      // ตรวจสอบว่าข้อมูลเป็น array หรือไม่
      const dataArray = Array.isArray(actualData) ? actualData : [];

      // กรองเฉพาะไฟล์ PDF
      const pdfFiles = dataArray.filter(item =>
        item['o:media_type'] === 'application/pdf'
      );

      console.log('PDF Files found:', pdfFiles.length);

      setPdfData(pdfFiles);
      setError(null);
    } catch (err) {
      console.error('Error fetching PDF data:', err);
      console.error('Error details:', err.response?.data || err.message);

      let errorMessage = 'ไม่สามารถโหลดข้อมูล PDF ได้';

      if (err.message.includes('API keys not found')) {
        errorMessage = 'ไม่พบ API keys กรุณาตรวจสอบไฟล์ .env';
      } else if (err.message.includes('Network Error') || err.message.includes('CORS')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับ API ได้ เนื่องจากปัญหา CORS หรือเครือข่าย';
      } else {
        errorMessage = `เกิดข้อผิดพลาด: ${err.message}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openPdf = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };



  if (loading) {
    return (
      <div className="container">
        <div className="loading">กำลังโหลดข้อมูล PDF...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h3>เกิดข้อผิดพลาด</h3>
          <p>{error}</p>

          {error.includes('CORS') && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              <p><strong>คำแนะนำ:</strong></p>
              <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                <li>ลองรีเฟรชหน้าเว็บ</li>
                <li>ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต</li>
                <li>ติดต่อผู้ดูแลระบบหาก API server มีปัญหา</li>
              </ul>
            </div>
          )}

          {error.includes('API keys') && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              <p><strong>วิธีแก้ไข:</strong></p>
              <p>สร้างไฟล์ .env และใส่ API keys ตามตัวอย่างใน .env.example</p>
            </div>
          )}
        </div>

        <button
          onClick={fetchPdfData}
          className="view-pdf-btn"
          style={{ maxWidth: '200px', margin: '1rem auto', display: 'block' }}
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>ห้องสมุดออนไลน์ ส่วนหัว</h1>
        <p>อ่านหนังสือออนไลน์</p>
      </header>

      {pdfData.length === 0 ? (
        <div className="no-data">
          ไม่พบเอกสาร PDF ในระบบ
        </div>
      ) : (
        <div className="pdf-grid">
          {pdfData.map((pdf) => (
            <div key={pdf['o:id']} className="pdf-card">
              <h3 className="pdf-title">
                {pdf['o:title'] || pdf['dcterms:title']?.[0]?.['@value'] || 'ไม่มีชื่อเอกสาร'}
              </h3>

              <div className="pdf-info">
                <div className="pdf-info-item">
                  <span className="pdf-info-label">ขนาดไฟล์:</span>
                  <span className="pdf-size">
                    {formatFileSize(pdf['o:size'])}
                  </span>
                </div>

                <div className="pdf-info-item">
                  <span className="pdf-info-label">วันที่สร้าง:</span>
                  <span className="pdf-date">
                    {formatDate(pdf['o:created']['@value'])}
                  </span>
                </div>

                <div className="pdf-info-item">
                  <span className="pdf-info-label">ชื่อไฟล์:</span>
                  <span className="pdf-size">
                    {pdf['o:filename']}
                  </span>
                </div>
              </div>

              <button
                className="view-pdf-btn"
                onClick={() => openPdf(pdf['o:original_url'])}
              >
                เปิดอ่าน PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;