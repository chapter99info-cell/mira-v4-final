import React, { useState, useEffect } from 'react';
import { Service, Staff } from '../types';
import { apiService } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, User, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingModalProps {
  service: Service | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ service, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState<string>(Object.keys(service.rates)[0]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      apiService.getStaff().then(setStaff);
      setSelectedDuration(Object.keys(service.rates)[0]);
    }
  }, [service]);

  if (!service) return null;

  const handleBooking = async () => {
    if (!selectedStaff || !selectedTime) return;
    setLoading(true);
    try {
      await apiService.createBooking({
        serviceId: service.id,
        therapistId: selectedStaff.id,
        therapistName: selectedStaff.name,
        date: selectedDate,
        startTime: selectedTime,
        endTime: calculateEndTime(selectedTime, parseInt(selectedDuration)),
        clientId: 'guest-user',
        clientName: 'Guest User',
        serviceName: service.name,
        duration: parseInt(selectedDuration),
        price: service.rates[selectedDuration],
        paymentStatus: 'deposit-paid',
        isWalkIn: false,
        createdAt: new Date().toISOString(),
        depositPaid: true,
        intakeFormCompleted: false
      });
      setStep(3);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEndTime = (start: string, duration: number) => {
    const [h, m] = start.split(':').map(Number);
    const totalMinutes = h * 60 + m + duration;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
  };

  const times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-beige/30">
          <div className="flex items-center gap-2">
            {step > 1 && step < 3 && (
              <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-beige/30 rounded-full transition-colors">
                <ChevronLeft size={20} />
              </button>
            )}
            <h3 className="font-serif font-bold text-earth text-xl">
              {step === 1 ? 'Massage booking' : step === 2 ? 'Select Time & Staff' : 'Booking Confirmed'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-beige/30 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Service Summary */}
              <div className="bg-beige/20 rounded-3xl p-4 flex gap-4">
                <img src={service.image} alt={service.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">{service.type}</span>
                  <h4 className="font-serif font-bold text-earth text-lg mb-1">{service.name}</h4>
                  <p className="text-primary font-bold text-xl">${service.rates[selectedDuration].toFixed(2)}</p>
                </div>
              </div>

              {/* Duration Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-earth/60 uppercase tracking-wider flex items-center gap-2">
                  <Clock size={16} /> Select Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(service.rates).map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                        selectedDuration === duration 
                          ? 'border-primary bg-primary text-white shadow-md' 
                          : 'border-beige/30 bg-white text-earth hover:border-beige/60'
                      }`}
                    >
                      {duration}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-earth/60 uppercase tracking-wider flex items-center gap-2">
                  <CalendarIcon size={16} /> Select Date
                </label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-beige/10 border border-beige/30 rounded-2xl p-4 text-earth focus:ring-primary focus:border-primary"
                />
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-earth text-white py-4 rounded-full font-bold text-lg hover:bg-earth/90 transition-all shadow-lg shadow-earth/20"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              {/* Staff Selection */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-earth/60 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} /> Select Therapist
                </label>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {staff.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStaff(s)}
                      className={`flex-shrink-0 w-24 p-3 rounded-3xl border-2 transition-all ${
                        selectedStaff?.id === s.id 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'border-beige/30 bg-white hover:border-beige/60'
                      }`}
                    >
                      <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full mx-auto mb-2 object-cover" />
                      <p className="text-[10px] font-bold text-earth leading-tight">{s.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-earth/60 uppercase tracking-wider flex items-center gap-2">
                  <Clock size={16} /> Select Time
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                        selectedTime === time 
                          ? 'border-primary bg-primary text-white shadow-md' 
                          : 'border-beige/30 bg-white text-earth hover:border-beige/60'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!selectedStaff || !selectedTime || loading}
                onClick={handleBooking}
                className="w-full bg-earth text-white py-4 rounded-full font-bold text-lg hover:bg-earth/90 transition-all shadow-lg shadow-earth/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-2xl font-serif font-bold text-earth mb-2">Thank you!</h4>
              <p className="text-earth/60">Your session has been booked successfully.</p>
              <div className="mt-8 p-4 bg-beige/20 rounded-3xl w-full text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-earth/50 font-bold uppercase">Service</span>
                  <span className="text-sm font-bold text-earth">{service.name} ({selectedDuration}m)</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-earth/50 font-bold uppercase">Therapist</span>
                  <span className="text-sm font-bold text-earth">{selectedStaff?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-earth/50 font-bold uppercase">Time</span>
                  <span className="text-sm font-bold text-earth">{selectedDate} at {selectedTime}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
