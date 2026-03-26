import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { V4Dashboard } from './components/V4Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isAuthorized, setIsAuthorized] = useState(false); // เช็คว่าใส่รหัสผ่านหรือยัง

  const handleBook = () => {
    window.open('https://mira.book.receptionerapp.com/', '_blank');
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
          {/* ปุ่ม Admin ที่คุณต้องการรหัส 9999 */}
          <button 
            onClick={handleAdminClick}
            className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md text-earth/20 p-2 rounded-full text-[8px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all z-[100]"
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