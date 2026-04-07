import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { V4Dashboard } from './components/V4Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

// หมายเหตุ: ผมถอด AiConcierge ออกชั่วคราวเผื่อใน GitHub คุณยังไม่มีไฟล์นี้ เว็บจะได้ไม่พังครับ
// import { AiConcierge } from './components/AiConcierge'; 

function AppContent() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // แก้ไขตรงนี้ให้เป็นการโทรออกแทนลิงก์เว็บ
  const handleBook = () => {
    window.location.href = 'tel:0466992456';
  };

  const handleAdminClick = () => {
    if (isAuthorized) {
      setView('dashboard');
    } else {
      const password = prompt('กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ Admin:');
      if (password === '9999') {
        setIsAuthorized(true);
        setView('dashboard');
      } else {
        alert('รหัสผ่านไม่ถูกต้อง!');
      }
    }
  };

  return (
    <div className="relative">
      {view === 'landing' ? (
        <>
          <LandingPage onBookNow={handleBook} />
          {/* <AiConcierge /> */} {/* เปิดใช้งานบรรทัดนี้หากคุณสร้างไฟล์ AiConcierge แล้ว */}
          
          <button 
            onClick={handleAdminClick}
            className="fixed bottom-6 left-6 bg-white/10 backdrop-blur-md text-earth/20 p-2 rounded-full text-[8px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all z-[100]"
          >
            Admin
          </button>
        </>
      ) : (
        <>
          <V4Dashboard />
          <button 
            onClick={() => setView('landing')}
            className="fixed bottom-6 right-6 bg-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sage transition-all shadow-xl z-[100]"
          >
            Back to Site
          </button>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
