import React, { useState } from 'react';

interface StaffEntryFormProps {
  staffName: string;
  providerNumber: string;
  onReceiptIssued: () => void;
}

export const StaffEntryForm: React.FC<StaffEntryFormProps> = ({ staffName, providerNumber, onReceiptIssued }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [service, setService] = useState('Remedial Massage');

  const services = ['Remedial Massage', 'Relaxation', 'Deep Tissue', 'Thai Massage'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate receipt generation
    console.log('Issuing receipt for:', { customerName, customerEmail, amount, service, staffName, providerNumber });
    alert('PDF Receipt Issued Successfully!');
    setCustomerName('');
    setCustomerEmail('');
    setAmount('');
    onReceiptIssued();
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
          className="w-full py-6 mt-4 bg-[#4A5D23] text-white text-xl font-bold rounded-2xl hover:bg-[#3d4d1d] transition-colors"
        >
          Issue PDF Receipt
        </button>
      </form>
    </div>
  );
};
