import React from 'react';
import { brandConfig } from '../brandConfig';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, MapPin, Phone, Instagram, Facebook, Sparkles, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { CustomerReviews } from './CustomerReviews';

interface LandingPageProps {
  onBookNow: (service?: Service, withCoconut?: boolean, duration?: number) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBookNow }) => {
  // ฟังก์ชันโทรออกทันทีเมื่อกดปุ่มจอง
  const handleBookNow = () => {
    window.location.href = `tel:${brandConfig.phone.replace(/\s+/g, '')}`;
  };

  return (
    <div className="bg-white text-earth selection:bg-primary/20 font-sans min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative h-[70vh] md:h-[85vh] flex flex-col items-center justify-start overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={brandConfig.heroImage} 
            alt="MIRA Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-12"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
            <img src={brandConfig.logo} alt="MIRA Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="relative z-10 -mt-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] shadow-xl border border-primary/5"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8 tracking-tight">
            {brandConfig.name}
          </h1>
          <p className="text-earth/70 text-lg md:text-xl leading-relaxed mb-10 font-light">
            {brandConfig.description}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleBookNow}
              className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-sage transition-all shadow-2xl flex items-center justify-center"
            >
              Book Your Session / โทรจองคิวทันที
            </button>
          </div>
        </motion.div>
      </section>

      {/* Atmosphere Video Section */}
      <section className="py-24 bg-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] block">The Atmosphere</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                A Sanctuary for <br />
                <span className="italic text-sage">Mind & Body</span>
              </h2>
              <p className="text-earth/60 text-lg font-light leading-relaxed">
                Step into a world where time slows down. Our sanctuary is designed to transport you to a state of deep tranquility.
              </p>
            </div>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              {brandConfig.promoVideo ? (
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={brandConfig.promoVideo} type="video/mp4" />
                </video>
              ) : (
                <img src={brandConfig.heroImage} alt="Atmosphere" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Healing Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brandConfig.services.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-[3rem] shadow-xl border border-beige/10 cursor-pointer transition-all hover:border-primary/20 text-center"
              onClick={handleBookNow}
            >
              <div className="relative w-full aspect-square mb-8 rounded-[2rem] overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-2">{service.name}</h3>
              <p className="text-earth/50 text-[11px] mb-6 line-clamp-3">{service.description}</p>
              <div className="pt-4 border-t border-beige/10 flex items-center justify-center gap-2 text-primary font-bold">
                <span className="text-lg">${Math.min(...(Object.values(service.rates) as number[]))}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CustomerReviews />

      {/* Location Section */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Find Us</h2>
              <div className="flex items-start gap-6">
                <MapPin className="text-secondary" size={28} />
                <p className="text-xl font-serif font-bold text-primary">{brandConfig.location}</p>
              </div>
              <button 
                onClick={handleBookNow}
                className="w-full bg-secondary text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-4 shadow-xl"
              >
                <Phone size={22} />
                Call for Booking / โทรจองคิว
              </button>
            </div>
            <div className="aspect-square rounded-[4rem] overflow-hidden border-8 border-section">
              <iframe 
                src="http://googleusercontent.com/maps.google.com/3"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-6 text-center">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
          © 2026 {brandConfig.name}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};
