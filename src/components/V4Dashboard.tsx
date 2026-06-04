import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  CheckCircle2,
  Clock,
  TrendingUp,
  LogOut,
} from 'lucide-react';
import { Booking, Service } from '../types';
import { brandConfig } from '../brandConfig';
import { apiService } from '../services/api';
import { ReceiptForm } from './ReceiptForm';

interface V4DashboardProps {
  mode: 'staff-pos' | 'owner-dashboard' | 'admin-config';
}

export const V4Dashboard: React.FC<V4DashboardProps> = ({ mode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services] = useState<Service[]>(brandConfig.services);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [useAlmondOil, setUseAlmondOil] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [hicapsFilter, setHicapsFilter] = useState<'all' | 'hicaps' | 'private'>('all');
  const [activeTab, setActiveTab] = useState<'bookings' | 'config' | 'receipt'>('bookings');

  const filteredBookings = bookings.filter((b) => {
    if (hicapsFilter === 'hicaps') return b.serviceName.toLowerCase().includes('hicaps');
    if (hicapsFilter === 'private') return !b.serviceName.toLowerCase().includes('hicaps');
    return true;
  });

  useEffect(() => {
    const unsubscribe = apiService.subscribeBookings((docs) => {
      setBookings(docs);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleCompleteJob = async () => {
    if (!selectedBooking) return;

    try {
      const almondOilPrice = useAlmondOil ? 10 : 0;
      const finalPrice = selectedBooking.price + almondOilPrice - discount;

      await apiService.updateBooking(selectedBooking.id, {
        status: 'confirmed',
        paymentStatus: 'fully-paid',
        useAlmondOil: !!(useAlmondOil || selectedBooking.useAlmondOil),
        discount,
        totalAmount: finalPrice,
        completedAt: new Date().toISOString(),
      });

      setShowCompleteModal(false);
      setSelectedBooking(null);
      setUseAlmondOil(false);
      setDiscount(0);
      alert('บันทึกจบงานสำเร็จ! ยอดรวม: $' + finalPrice);
    } catch {
      alert('เกิดข้อผิดพลาดในการบันทึก');
    }
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'fully-paid')
    .reduce((acc, b) => acc + (b.totalAmount || b.price), 0);

  const hicapsRevenue = bookings
    .filter((b) => b.paymentStatus === 'fully-paid' && b.serviceName.toLowerCase().includes('hicaps'))
    .reduce((acc, b) => acc + (b.totalAmount || b.price), 0);

  const privateRevenue = totalRevenue - hicapsRevenue;

  const pendingBookings = bookings.filter((b) => b.paymentStatus !== 'fully-paid');

  return (
    <div className="min-h-screen bg-section p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">
              {mode === 'staff-pos' ? 'Staff POS' : mode === 'admin-config' ? 'Admin Config' : 'Owner Dashboard'}
            </h1>
            <p className="text-earth/50 font-medium">Mira Remedial Thai Massage Management</p>
            <p className="text-earth/40 text-xs mt-1">Bookings stored locally in this browser (no Firebase).</p>
          </div>
          <div className="flex items-center gap-4">
            {mode === 'owner-dashboard' && (
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-beige/20">
                <p className="text-[10px] font-bold text-earth/40 uppercase tracking-widest">Today&apos;s Revenue</p>
                <p className="text-xl font-serif font-bold text-primary">${totalRevenue.toFixed(2)}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-beige/20 flex items-center justify-center text-earth/40 hover:text-rose-500 transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {mode === 'owner-dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<DollarSign size={24} />} label="Total Revenue" value={`$${totalRevenue.toFixed(0)}`} color="bg-primary" />
            <StatCard
              icon={<CheckCircle2 size={24} />}
              label="HICAPS / Private"
              value={`$${hicapsRevenue.toFixed(0)} / $${privateRevenue.toFixed(0)}`}
              color="bg-blue-600"
            />
            <StatCard icon={<Clock size={24} />} label="Pending Jobs" value={pendingBookings.length.toString()} color="bg-sage" />
            <StatCard
              icon={<TrendingUp size={24} />}
              label="HICAPS Share"
              value={`${totalRevenue > 0 ? ((hicapsRevenue / totalRevenue) * 100).toFixed(1) : 0}%`}
              color="bg-green-500"
            />
          </div>
        )}

        {(mode === 'admin-config' || mode === 'staff-pos') && (
          <div className="flex gap-4 border-b border-beige/20 pb-4">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-primary text-white' : 'bg-white text-earth/40'}`}
            >
              Bookings
            </button>
            {mode === 'admin-config' && (
              <button
                onClick={() => setActiveTab('config')}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-primary text-white' : 'bg-white text-earth/40'}`}
              >
                System Config
              </button>
            )}
            {mode === 'staff-pos' && (
              <button
                onClick={() => setActiveTab('receipt')}
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'receipt' ? 'bg-primary text-white' : 'bg-white text-earth/40'}`}
              >
                Issue Receipt
              </button>
            )}
          </div>
        )}

        {activeTab === 'receipt' && mode === 'staff-pos' && <ReceiptForm />}

        {activeTab === 'config' && mode === 'admin-config' && (
          <div className="bg-white p-8 rounded-[2rem] border border-beige/20 text-earth/60 text-sm">
            Edit services, staff, and holidays in <code className="text-primary">src/brandConfig.ts</code>. Public bookings use Receptionerapp.
          </div>
        )}

        {(activeTab === 'bookings' || mode === 'owner-dashboard') && (
          <div className="space-y-6">
            {mode !== 'staff-pos' && (
              <div className="flex gap-2">
                {(['all', 'hicaps', 'private'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setHicapsFilter(f)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${hicapsFilter === f ? 'bg-primary text-white' : 'bg-white text-earth/40'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <p className="text-earth/40 text-sm">Loading bookings…</p>
            ) : filteredBookings.length === 0 ? (
              <p className="text-earth/40 text-sm">No bookings in local storage yet.</p>
            ) : (
              <div className="grid gap-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white p-6 rounded-2xl border border-beige/20 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-primary">{booking.clientName}</p>
                      <p className="text-xs text-earth/50">{booking.serviceName}</p>
                      <p className="text-xs text-earth/40">
                        {booking.date} · {booking.paymentStatus}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-lg">${booking.totalAmount ?? booking.price}</span>
                      {booking.paymentStatus !== 'fully-paid' && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowCompleteModal(true);
                          }}
                          className="px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showCompleteModal && selectedBooking && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[2rem] max-w-md w-full space-y-6"
          >
            <h3 className="text-xl font-serif font-bold text-primary">Complete Job</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={useAlmondOil} onChange={(e) => setUseAlmondOil(e.target.checked)} />
              Almond oil (+$10)
            </label>
            <div>
              <label className="text-xs font-bold text-earth/40 uppercase">Discount ($)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full mt-1 border rounded-xl px-4 py-2"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCompleteModal(false)} className="flex-1 py-3 rounded-xl border text-earth/50 text-xs font-bold uppercase">
                Cancel
              </button>
              <button onClick={handleCompleteJob} className="flex-1 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase">
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-beige/20 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-earth/40 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-serif font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}
