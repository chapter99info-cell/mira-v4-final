import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { V4Dashboard } from './components/V4Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
// import { AiConcierge } from './components/AiConcierge';
import { brandConfig } from './brandConfig';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck } from 'lucide-react';

type AdminMode = 'staff-pos' | 'owner-dashboard' | 'admin-config';

function AppContent() {
  const [view, setView] = useState<'landing' | 'admin-login' | 'dashboard'>('landing');
  const [adminMode, setAdminMode] = useState<AdminMode>('owner-dashboard');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setView('admin-login');
    } else {
      setView('landing');
    }
  }, []);

  const handleBook = () => {
    window.location.href = `tel:${brandConfig.phone}`;
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1111') {
      setAdminMode('staff-pos');
      setIsAuthorized(true);
      setView('dashboard');
    } else if (pin === '9999') {
      setAdminMode('owner-dashboard');
      setIsAuthorized(true);
      setView('dashboard');
    } else if (pin === '7777') {
      setAdminMode('admin-config');
      setIsAuthorized(true);
      setView('dashboard');
    } else {
      setError('รหัส PIN ไม่ถูกต้อง');
      setPin('');
    }
  };

  return (
    <div className="relative">
      {view === 'landing' && (
        <LandingPage onBookNow={handleBook} />
      )}

      {view === 'admin-login' && (
        <div className="min-h-screen bg-section flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl border border-beige/20 max-w-md w-full text-center space-y-8"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Lock size={40} />
            </div>
            
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Secret Access</h2>
              <p className="text-earth/60">กรุณาใส่รหัส PIN 4 หลักเพื่อเข้าสู่ระบบ</p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div className="space-y-2">
                <input 
                  type="password" 
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-section border-2 border-beige/20 rounded-2xl px-6 py-4 text-center text-4xl font-bold tracking-[0.5em] focus:border-primary outline-none transition-all text-primary placeholder:text-earth/20 placeholder:tracking-normal"
                  autoFocus
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-xs font-bold uppercase tracking-widest"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={20} />
                Verify Identity
              </button>
            </form>

            <button 
              onClick={() => {
                window.history.pushState({}, '', '/');
                setView('landing');
              }}
              className="text-xs font-bold text-earth/40 uppercase tracking-widest hover:text-primary transition-colors"
            >
              Back to Public Site
            </button>
          </motion.div>
        </div>
      )}

      {view === 'dashboard' && isAuthorized && (
        <>
          <V4Dashboard mode={adminMode} />
          <button 
            onClick={() => {
              window.history.pushState({}, '', '/');
              setView('landing');
              setIsAuthorized(false);
              setPin('');
            }}
            className="fixed bottom-6 right-6 bg-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sage transition-all shadow-xl z-[100]"
          >
            Exit Admin
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