import React, { useState } from 'react';

export const ReceiptForm: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxfKBkbLL-q0ttiXzmptVyAt95AVmXkwoHkzjLvH1LNvWtQ-XgoNYBD2Zkxqr5lYU5S/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          clientName, 
          clientEmail, 
          amount, 
          therapist: 'Staff' 
        }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Receipt submitted successfully!' });
        setClientName('');
        setClientEmail('');
        setAmount('');
      } else {
        setStatus({ type: 'error', message: 'Failed to submit receipt.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-beige/20 max-w-xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Issue Receipt</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-earth/40 uppercase tracking-widest ml-2">Client Name</label>
          <input 
            required
            type="text" 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-section rounded-2xl py-3 px-6 text-primary focus:ring-2 focus:ring-primary/20 border-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-earth/40 uppercase tracking-widest ml-2">Client Email</label>
          <input 
            required
            type="email" 
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full bg-section rounded-2xl py-3 px-6 text-primary focus:ring-2 focus:ring-primary/20 border-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-earth/40 uppercase tracking-widest ml-2">Amount</label>
          <input 
            required
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-section rounded-2xl py-3 px-6 text-primary focus:ring-2 focus:ring-primary/20 border-none"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-5 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-sage transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Receipt'}
        </button>
        {status && (
          <div className={`p-4 rounded-xl text-center text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};
