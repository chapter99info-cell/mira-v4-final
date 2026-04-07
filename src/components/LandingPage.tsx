import React from 'react';
import { brandConfig } from '../brandConfig';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Instagram, Facebook, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { CustomerReviews } from './CustomerReviews';

interface LandingPageProps {
  onBookNow: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBookNow }) => {
  const handleBookNow = () => {
    window.location.href = `tel:${brandConfig.phone.replace(/\s+/g, '')}`;
  };

  return (
    <div className="bg-white text-earth font-sans min-h-screen pb-24">
      {/* 1. Header & Hero */}
      <section className="relative h-[70vh] md:h-[85vh] flex flex-col items-center justify-start overflow-hidden">
        <div className="absolute inset-0">
          <img src={brandConfig.heroImage} alt="MIRA Hero" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white" />
        </div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mt-12">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
            <img src={brandConfig.logo} alt="MIRA Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* 2. Intro Section */}
      <section className="relative z-10 -mt-20 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] shadow-xl border border-primary/5">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8">{brandConfig.name}</h1>
          <p className="text-earth/70 text-lg mb-10 font-light">{brandConfig.description}</p>
          <button onClick={handleBookNow} className="bg-primary text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
            Book Your Session / โทรจองคิวทันที
          </button>
        </div>
      </section>

      {/* 3. Full Service Menu (เมนูที่หายไปเอากลับมาแล้ว) */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Healing Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandConfig.services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-[2rem] shadow-lg border border-beige/10 text-center hover:border-primary/30 transition-all cursor-pointer" onClick={handleBookNow}>
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">{service.name}</h3>
              <p className="text-earth/50 text-xs mb-4">{service.description}</p>
              <p className="text-primary font-bold text-lg">Starting ${Math.min(...(Object.values(service.rates) as number[]))}</p>
            </div>
          ))}
        </div>
      </section>

      <CustomerReviews />

      {/* 4. Map & Find Us (แผนที่เอากลับมาแล้ว) */}
      <section id="location" className="py-24 bg-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-primary">Find Us</h2>
            <div className="flex gap-4"><MapPin className="text-secondary" /><p>{brandConfig.location}</p></div>
            <div className="flex gap-4"><Phone className="text-secondary" /><p>{brandConfig.phone}</p></div>
            <button onClick={handleBookNow} className="w-full bg-secondary text-white py-4 rounded-xl font-bold uppercase shadow-lg hover:bg-primary transition-all">Call Now / โทรจอง</button>
          </div>
          <div className="h-[400px] rounded-[2rem] overflow-hidden border-8 border-white shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.882142278437!2d144.828458!3d-37.863013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad661605e5d169b%3A0x60f9464f1d4f9b8c!2sMira%20Remedial%20Thai%20Massage!5e0!3m2!1sen!2sau!4v1712480000000!5m2!1sen!2sau"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 5. Full Footer (Footer เดิมเอากลับมาแล้ว) */}
      <footer className="bg-primary text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-10">
          <div>
            <h4 className="font-serif text-2xl font-bold mb-4">{brandConfig.name}</h4>
            <p className="text-white/60 text-sm">{brandConfig.location}</p>
          </div>
          <div>
            <h5 className="font-bold text-secondary mb-4 uppercase tracking-widest text-xs">Quick Links</h5>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#services">Services</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-secondary mb-4 uppercase tracking-widest text-xs">Follow Us</h5>
            <div className="flex gap-4"><Instagram /><Facebook /></div>
          </div>
        </div>
        <p className="text-center text-white/30 text-[10px] uppercase tracking-widest">© 2026 {brandConfig.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
