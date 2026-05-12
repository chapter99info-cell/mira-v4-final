import React, { useState } from 'react';

interface StaffEntryFormProps {
  staffName: string;
  providerNumber: string;
  onReceiptIssued: () => void;
  pin: string;
}

export const StaffEntryForm: React.FC<StaffEntryFormProps> = ({ staffName, providerNumber, onReceiptIssued, pin }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [service, setService] = useState('Remedial Massage');

  const services = ['Remedial Massage', 'Relaxation', 'Deep Tissue', 'Thai Massage'];

  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setMessage(null);
    
    const payload = { 
      clientName: customerName, 
      clientEmail: customerEmail, 
      service: service,
      amount: amount
    };
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbx7eJ8avfMbq7Mvsuvkw1AgI3OqdAjtD-WDxuuywJur5KF52PLwdu4JSC1tgVFDOLWX/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error('Failed to send receipt.');

      setMessage({ text: 'Receipt Sent Successfully!', type: 'success' });
      setCustomerName('');
      setCustomerEmail('');
      setAmount('');
      setTimeout(() => {
          setMessage(null);
          onReceiptIssued();
      }, 2000);
    } catch (err) {
      setMessage({ text: 'Error: ' + err, type: 'error' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 bg-[#FBF9F6] rounded-3xl max-w-lg mx-auto shadow-sm border border-[#4A5D23]/20">
      <h2 className="text-2xl font-bold mb-6 text-[#4A5D23]">Staff Entry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4A5D23]/70 mb-1">Customer Name</label>
          <input 
            type="text" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#4A5D23]/30 bg-white"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4A5D23]/70 mb-1">Customer Email</label>
          <input 
            type="email" 
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#4A5D23]/30 bg-white"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4A5D23]/70 mb-1">Service</label>
          <select 
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#4A5D23]/30 bg-white"
          >
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4A5D23]/70 mb-1">Amount ($)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#4A5D23]/30 bg-white"
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={isSending}
          className="w-full py-6 mt-4 bg-[#4A5D23] text-white text-xl font-bold rounded-2xl hover:bg-[#3d4d1d] transition-colors disabled:opacity-50"
        >
          {isSending ? 'Generating PDF...' : 'Issue PDF Receipt'}
        </button>
        {message && (
          <div className={`mt-4 p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};
