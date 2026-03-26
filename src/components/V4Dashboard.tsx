import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Package, 
  DollarSign,
  CheckCircle2,
  Info,
  XCircle,
  Calendar,
  User,
  Clock,
  ChevronRight,
  TrendingUp,
  Users,
  BarChart2,
  Lock,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, updateDoc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Booking, Service, Product } from '../types';
import { brandConfig } from '../brandConfig';
import { apiService } from '../services/api';

export const V4Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services] = useState<Service[]>(brandConfig.services);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [useAlmondOil, setUseAlmondOil] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [hicapsFilter, setHicapsFilter] = useState<'all' | 'hicaps' | 'private'>('all');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authorized');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '9999') {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_authorized', 'true');
      setPasscodeError('');
    } else {
      setPasscodeError('รหัสไม่ถูกต้อง กรุณาลองใหม่');
      setPasscode('');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (hicapsFilter === 'hicaps') return b.serviceName.toLowerCase().includes('hicaps');
    if (hicapsFilter === 'private') return !b.serviceName.toLowerCase().includes('hicaps');
    return true;
  });

  useEffect(() => {
    const path = 'bookings';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCompleteJob = async () => {
    if (!selectedBooking) return;

    const path = 'bookings';
    try {
      const almondOilPrice = useAlmondOil ? 10 : 0;
      const finalPrice = selectedBooking.price + almondOilPrice - discount;

      await updateDoc(doc(db, path, selectedBooking.id), {
        status: 'confirmed',
        paymentStatus: 'fully-paid',
        useAlmondOil: useAlmondOil || selectedBooking.useAlmondOil,
        discount: discount,
        totalAmount: finalPrice,
        completedAt: new Date().toISOString()
      });

      setShowCompleteModal(false);
      setSelectedBooking(null);
      setUseAlmondOil(false);
      setDiscount(0);
      alert("บันทึกจบงานสำเร็จ! ยอดรวม: $" + finalPrice);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('admin_authorized');
    setPasscode('');
  };

  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'fully-paid')
    .reduce((acc, b) => acc + (b.totalAmount || b.price), 0);

  const hicapsRevenue = bookings
    .filter(b => b.paymentStatus === 'fully-paid' && b.serviceName.toLowerCase().includes('hicaps'))
    .reduce((acc, b) => acc + (b.totalAmount || b.price), 0);

  const privateRevenue = totalRevenue - hicapsRevenue;

  const pendingBookings = bookings.filter(b => b.paymentStatus !== 'fully-paid');

  if (!isAuthorized) {
    return (
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
            <h2 className="text-3xl font-serif font-bold text-primary mb-2">Admin Access</h2>
            <p className="text-earth/60">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบจัดการ</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode"
                className="w-full bg-section border-2 border-beige/20 rounded-2xl px-6 py-4 text-center text-2xl font-bold tracking-[1em] focus:border-primary outline-none transition-all text-primary placeholder:text-earth/20 placeholder:tracking-normal"
                autoFocus
              />
              {passcodeError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-xs font-bold uppercase tracking-widest"
                >
                  {passcodeError}
                </motion.p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={20} />
              Unlock Dashboard
            </button>
          </form>

          <p className="text-[10px] text-earth/30 uppercase font-bold tracking-widest">
            Mira Remedial Thai Massage • Security System
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">V4 Dashboard</h1>
            <p className="text-earth/50 font-medium">Mira Remedial Thai Massage Management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-beige/20">
              <p className="text-[10px] font-bold text-earth/40 uppercase tracking-widest">Today's Revenue</p>
              <p className="text-xl font-serif font-bold text-primary">${totalRevenue.toFixed(2)}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-beige/20 flex items-center justify-center text-earth/40 hover:text-rose-500 transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<DollarSign size={24} />} label="Total Revenue" value={`$${totalRevenue.toFixed(0)}`} color="bg-primary" />
          <StatCard 
            icon={<CheckCircle2 size={24} />} 
            label="HICAPS / Private" 
            value={`$${hicapsRevenue.toFixed(0)} / $${privateRevenue.toFixed(0)}`} 
            color="bg-blue-600" 
          />
          <StatCard icon={<Clock size={24} />} label="Pending Jobs" value={pendingBookings.length.toString()} color="bg-sage" />
          <StatCard icon={<TrendingUp size={24} />} label="HICAPS Share" value={`${totalRevenue > 0 ? ((hicapsRevenue / totalRevenue) * 100).toFixed(1) : 0}%`} color="bg-green-500" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-primary">Recent Bookings</h2>
              <div className="flex bg-white p-1 rounded-xl border border-beige/20">
                {(['all', 'hicaps', 'private'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setHicapsFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                      hicapsFilter === f ? 'bg-primary text-white shadow-sm' : 'text-earth/40 hover:text-primary'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="bg-white p-12 rounded-[3rem] text-center border border-dashed border-beige/40">
                  <p className="text-earth/40 text-sm">No bookings found for this filter</p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                <motion.div 
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white p-6 rounded-[2.5rem] shadow-sm border transition-all hover:shadow-md cursor-pointer ${
                    booking.paymentStatus === 'fully-paid' ? 'border-green-100 opacity-80' : 'border-beige/20'
                  }`}
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowCompleteModal(true);
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        booking.paymentStatus === 'fully-paid' ? 'bg-green-50 text-green-500' : 'bg-primary/5 text-primary'
                      }`}>
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{booking.clientName}</h4>
                        <p className="text-xs text-earth/50">{booking.serviceName} • {booking.duration}m</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-bold text-primary">${(booking.totalAmount || booking.price).toFixed(2)}</p>
                      <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                        booking.paymentStatus === 'fully-paid' ? 'bg-green-100 text-green-700' : 'bg-beige/30 text-earth/60'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

          {/* Service List Sidebar */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-primary">Service List</h2>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-4 rounded-3xl border border-beige/20 flex items-center gap-4">
                  <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-primary truncate">{service.name}</h5>
                      {service.category === 'Remedial' && (
                        <span className="bg-blue-100 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 size={8} /> HICAPS
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-earth/40 uppercase tracking-widest">{service.category || 'Standard'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-sage">${Math.min(...(Object.values(service.rates) as number[]))}+</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Job Modal */}
      {showCompleteModal && selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-10 shadow-2xl max-w-md w-full space-y-8 border border-beige/20 relative"
          >
            <button 
              onClick={() => setShowCompleteModal(false)}
              className="absolute top-8 right-8 text-earth/30 hover:text-primary transition-colors"
            >
              <XCircle size={24} />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-sage uppercase tracking-[0.3em]">Job Completion</span>
              <h3 className="text-3xl font-serif font-bold text-primary">Finish Session</h3>
            </div>

            <div className="bg-section p-6 rounded-[2rem] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-earth/40 uppercase tracking-widest">Customer</span>
                <span className="text-sm font-bold text-primary">{selectedBooking.clientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-earth/40 uppercase tracking-widest">Therapist</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{selectedBooking.therapistName}</span>
                  {brandConfig.staff.find(s => s.id === selectedBooking.therapistId)?.isAccredited && (
                    <span className="text-yellow-600" title="Accredited">
                      <CheckCircle2 size={14} fill="currentColor" className="text-white" />
                    </span>
                  )}
                </div>
              </div>
              
              {/* Provider Number for HICAPS */}
              {selectedBooking.serviceName.toLowerCase().includes('hicaps') && (
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Provider No.</span>
                  <span className="text-sm font-mono font-bold text-blue-800">
                    {brandConfig.staff.find(s => s.id === selectedBooking.therapistId)?.providerNumber || 'N/A'}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-earth/40 uppercase tracking-widest">Base Price</span>
                <span className="text-sm font-bold text-primary">${selectedBooking.price.toFixed(2)}</span>
              </div>

              {/* Upsell Prompt for Standard Oil */}
              {selectedBooking.serviceName.toLowerCase().includes('oil') && !selectedBooking.serviceName.toLowerCase().includes('hicaps') && (
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-wider mb-1">💡 Upsell Opportunity</p>
                  <p className="text-[10px] text-yellow-700 leading-tight">
                    "Upgrade to Remedial for Insurance Rebate?"
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-beige/20 space-y-4">
                {/* Almond Oil Upgrade Checkbox */}
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      useAlmondOil ? 'bg-primary border-primary' : 'border-beige/40 group-hover:border-primary/40'
                    }`}>
                      {useAlmondOil && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Upgrade to Almond Oil</span>
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={useAlmondOil}
                    onChange={(e) => setUseAlmondOil(e.target.checked)}
                    disabled={selectedBooking.useAlmondOil}
                  />
                  <span className="text-xs font-bold text-sage">+$10.00</span>
                </label>

                {/* Discount Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-earth/40 ml-2">Discount ($)</label>
                  <input 
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-beige/20 flex justify-between items-center">
                <span className="text-sm font-bold text-primary uppercase tracking-widest">Total Gross</span>
                <span className="text-2xl font-serif font-bold text-primary">
                  ${(selectedBooking.price + (useAlmondOil ? 10 : 0) - discount).toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              onClick={handleCompleteJob}
              className="w-full bg-primary text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-sage transition-all shadow-xl shadow-primary/20"
            >
              Confirm & Save
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-beige/20 flex items-center gap-6 hover:shadow-lg transition-all hover:-translate-y-1">
    <div className={`p-5 rounded-3xl ${color} text-white shadow-xl shadow-current/10`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-earth/40 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-3xl font-serif font-bold text-primary leading-tight">{value}</p>
    </div>
  </div>
);
