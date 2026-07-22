import React, { useState, useEffect } from 'react';
import { brandConfig } from '../brandConfig';
import { motion } from 'motion/react';
import { Clock, DollarSign, ChevronRight, MapPin, Phone, Instagram, Facebook, Sparkles, Mail, ShieldCheck, Calendar, Gift } from 'lucide-react';
import { Service } from '../types';
import { CustomerReviews } from './CustomerReviews';
import { ThaiShopBanner } from './ThaiShopBanner';
import { UpsellModal } from './UpsellModal';
import { V4Dashboard } from './V4Dashboard';
import { StaffEntryForm } from './StaffEntryForm';
import { HERO_IMAGE_URL, MIND_BODY_VIDEO_URL, SERVICE_CARD_IMAGE_URL } from '../lib/mediaUrls';

interface LandingPageProps {
  onBookNow: (service?: Service, withCoconut?: boolean, duration?: number) => void;
}

function serviceImageSrc(url: string | undefined): string {
  const trimmed = url?.trim();
  if (!trimmed || trimmed.startsWith('gs://')) return SERVICE_CARD_IMAGE_URL;
  return trimmed;
}

function ServiceCardMedia({
  service,
  className,
}: {
  service: Service;
  className: string;
}) {
  if (service.video) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={serviceImageSrc(service.image)}
        className={className}
        aria-label={service.name}
      >
        <source src={service.video} type="video/mp4" />
      </video>
    );
  }
  return (
    <img
      src={serviceImageSrc(service.image)}
      alt={service.name}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = SERVICE_CARD_IMAGE_URL;
      }}
    />
  );
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBookNow }) => {
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Standard' | 'Remedial'>('All');
  const [showLogin, setShowLogin] = useState(false);
  const [auth, setAuth] = useState<null | {role: string, name: string, pin: string}>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    window.open(brandConfig.bookingUrl, '_blank');
  };

  const confirmBooking = () => {
    window.open(brandConfig.bookingUrl, '_blank');
    setIsUpsellOpen(false);
  };

  const categories = ['All', 'Standard', 'Remedial'];
  const myPicks = brandConfig.services.filter(s => s.is_my_pick);
  const filteredServices = activeCategory === 'All' 
    ? brandConfig.services 
    : brandConfig.services.filter(s => s.category === activeCategory);

  return (
    <div className="bg-white text-earth selection:bg-primary/20 font-sans min-h-screen pb-24">
      {/* Sticky Premium Header Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-lg border-b border-beige/10' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer border-0 bg-transparent p-0"
            aria-label="Mira Thai Massage home"
          >
            <img
              src={brandConfig.logo}
              alt="Mira Thai Massage logo / โลโก้มิรา"
              width={56}
              height={56}
              className="overflow-hidden rounded-full object-cover"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                overflow: 'hidden',
              }}
            />
          </button>
          
          <div className="flex items-center gap-3">
            <a 
              href={brandConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                isScrolled 
                  ? 'bg-primary text-white hover:bg-sage shadow-md' 
                  : 'bg-white text-primary hover:bg-white/90 shadow'
              }`}
            >
              <Calendar size={13} className="text-[#C5A059]" />
              <span>Book Now / จองคิว</span>
            </a>
            <a 
              href={brandConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-white hover:bg-opacity-95 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-md"
            >
              <Gift size={13} />
              <span>Buy Gift Voucher / บัตรของขวัญ</span>
            </a>
          </div>
        </div>
      </header>

      {/* Header (The Hero) */}
      <section className="relative h-[70vh] md:h-[85vh] flex flex-col items-center justify-start overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900">
          <img
            src={brandConfig.heroImage || HERO_IMAGE_URL}
            alt="Mira Thai Massage — hero"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
            aria-hidden
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative z-10 -mt-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] shadow-xl shadow-primary/5 border border-primary/5"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8 tracking-tight leading-tight">
            {brandConfig.name}
          </h1>
          <p className="text-earth/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            {brandConfig.description}
          </p>
          <div className="mt-10 max-w-md mx-auto space-y-5">
            {/* BOOK NOW Button */}
            <motion.a 
              href={brandConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#4A5D23] text-white py-4 px-6 rounded-full shadow-xl shadow-primary/20 hover:bg-[#8A9A5B] transition-all flex items-center gap-5 border-2 border-transparent"
              style={{ minHeight: '84px' }}
            >
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-secondary flex-shrink-0">
                <Calendar size={22} className="text-[#C5A059]" />
              </div>
              <div className="text-left flex-grow">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.15em] text-white">BOOK NOW</p>
                <p className="text-xs text-white/80 font-normal">Reserve your session</p>
              </div>
              <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
            </motion.a>

            {/* BUY GIFT VOUCHER Button */}
            <motion.a 
              href={brandConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-[#4A5D23] border-2 border-[#4A5D23]/30 py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:border-[#4A5D23]/60 transition-all flex items-center gap-5"
              style={{ minHeight: '84px' }}
            >
              <div className="w-12 h-12 rounded-full border border-[#4A5D23]/10 bg-[#4A5D23]/5 flex items-center justify-center text-[#4A5D23] flex-shrink-0">
                <Gift size={22} className="text-[#4A5D23]" />
              </div>
              <div className="text-left flex-grow">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.15em]">BUY GIFT VOUCHER</p>
                <p className="text-xs text-[#2D2A26]/75 font-normal">The perfect gift of relaxation</p>
              </div>
              <ChevronRight size={18} className="text-[#4A5D23]/40 flex-shrink-0" />
            </motion.a>

            {/* Sub-text / Quick address info matching mockup */}
            <div className="pt-6 border-t border-beige/20 text-center space-y-1.5">
              <div className="flex justify-center mb-1">
                <div className="w-7 h-7 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                  <MapPin size={15} />
                </div>
              </div>
              <p className="text-sm font-semibold text-[#4A5D23] leading-snug">
                Level 1 /76 Pier St. Altona
              </p>
              <p className="text-xs text-[#2D2A26]/50 font-medium">
                VIC 3018, Australia
              </p>
            </div>

            <div className="pt-2">
              <a href="#services" className="text-[#4A5D23] font-bold uppercase tracking-widest text-[11px] hover:underline underline-offset-8 inline-block py-2">
                Explore Services / ดูเมนูบริการทั้งหมด
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Atmosphere Section (Stacked for Simplicity) */}
      <section className="py-24 bg-section overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] block">The Atmosphere</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
              A Sanctuary for <br />
              <span className="italic text-sage">Mind & Body</span>
            </h2>
            <p className="text-earth/60 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
              Step into a world where time slows down. Our sanctuary is designed to transport you to a state of deep tranquility, combining the natural warmth of Thai hospitality with a serene, modern aesthetic.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-beige/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={brandConfig.heroImage || HERO_IMAGE_URL}
                className="h-full w-full object-cover"
                aria-label="Mira Thai Massage oil treatment atmosphere video"
              >
                <source
                  src={(brandConfig as { mindBodyVideo?: string }).mindBodyVideo || MIND_BODY_VIDEO_URL}
                  type="video/mp4"
                />
              </video>
            </div>
            
            {/* Simple Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl border border-beige/10 flex items-center gap-4 whitespace-nowrap">
              <Clock size={20} className="text-sage" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Open Daily: 10am — 8pm</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section (Stacked & Normal) */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8">Healing Services</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-12" />
            
            {/* Category Tabs (Centered & Simple) */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                      : 'bg-section text-earth/40 hover:bg-earth/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* My Picks (Simple Grid) */}
          {myPicks.length > 0 && activeCategory === 'All' && (
            <div className="mb-24 space-y-12">
              <div className="flex items-center justify-center gap-3">
                <Sparkles size={20} className="text-secondary" />
                <h3 className="text-xl font-serif font-bold text-primary">My Picks / เมนูแนะนำ</h3>
                <Sparkles size={20} className="text-secondary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {myPicks.map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5 }}
                    onClick={handleBookNow}
                    className="bg-section rounded-[2.5rem] p-6 border border-primary/5 cursor-pointer group flex gap-6 items-center"
                  >
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <ServiceCardMedia
                        service={service}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-serif font-bold text-primary leading-tight">{service.name}</h4>
                      <p className="text-xs text-earth/50 font-medium uppercase tracking-widest">${service.fullPrice} • {service.duration}M</p>
                      <button className="text-[10px] font-bold text-sage uppercase tracking-widest border-b border-sage/30 pb-1">Book Your Session / จองที่นี่</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Main Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[3rem] shadow-xl shadow-earth/5 border border-beige/10 cursor-pointer transition-all hover:border-primary/20 overflow-hidden"
                onClick={handleBookNow}
              >
                <div className="relative w-full aspect-[4/3] bg-section overflow-hidden rounded-t-[3rem]">
                  <ServiceCardMedia
                    service={service}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1 leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-white/80 text-xs font-medium tracking-wide">
                      ${Math.min(...(Object.values(service.rates) as number[]))} — {service.duration}M
                    </p>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <p className="text-earth/60 text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.keyBenefits.slice(0, 2).map((benefit, i) => (
                        <span key={i} className="text-[10px] text-sage font-bold uppercase tracking-widest bg-sage/5 px-3 py-1 rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(service.rates).slice(0, 4).map(duration => (
                      <button 
                        key={duration} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow();
                        }}
                        className="flex items-center justify-between px-4 py-3 bg-section rounded-2xl text-[10px] font-bold text-primary uppercase tracking-widest border border-beige/10 hover:bg-primary hover:text-white transition-all"
                      >
                        <span>{duration}M</span>
                        <span>${service.rates[duration]}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow();
                      }}
                      className="w-full bg-[#4A5D23] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-[#8A9A5B] transition-all"
                    >
                      Book Your Session / จองที่นี่
                    </button>
                    <a 
                      href={brandConfig.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full border-2 border-primary/20 hover:border-primary/60 text-primary py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 bg-transparent"
                    >
                      <Gift size={14} className="text-[#C5A059]" />
                      <span>Buy as Gift Voucher / ซื้อเป็นบัตรของขวัญ</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Mira Wellness & Thai Shop promo */}
      <ThaiShopBanner />

      {/* Find Us Section (Strictly Stacked) */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Visit Us</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">Find Us</h2>
          </div>

          <div className="space-y-16">
            {/* Contact Info (Vertical Stack) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center text-center space-y-4 p-10 bg-section rounded-[3rem] border border-beige/10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm mb-2">
                  <MapPin size={32} />
                </div>
                <p className="text-xs font-bold text-sage uppercase tracking-[0.4em]">Our Location</p>
                <p className="text-2xl md:text-3xl font-serif font-bold text-primary max-w-xl">
                  {brandConfig.location}
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 p-10 bg-section rounded-[3rem] border border-beige/10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm mb-2">
                  <Clock size={32} />
                </div>
                <p className="text-xs font-bold text-sage uppercase tracking-[0.4em]">Opening Hours</p>
                <p className="text-2xl md:text-3xl font-serif font-bold text-primary">
                  7 Days: 10:00 AM - 8:00 PM
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 p-12 bg-primary text-white rounded-[3rem] shadow-2xl shadow-primary/20">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shadow-sm mb-2">
                  <Phone size={32} />
                </div>
                <p className="text-xs font-bold text-secondary uppercase tracking-[0.4em]">Contact Us / โทรจองคิว</p>
                <a 
                  href={`tel:${brandConfig.phone.replace(/\s+/g, '')}`}
                  className="text-4xl md:text-6xl font-serif font-bold hover:text-secondary transition-colors tracking-tight"
                >
                  {brandConfig.phone}
                </a>
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest pt-2">Click to call instantly</p>
              </div>
            </motion.div>

            {/* Map Section (Full Width) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-section"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.976543210!2d144.831!3d-37.868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6615866666667%3A0x5045675218ce6e0!2sLevel%201%2F76%20Pier%20St%2C%20Altona%20VIC%203018%2C%20Australia!5e0!3m2!1sen!2sau!4v1711415491000!5m2!1sen!2sau"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mira Thai Massage Altona Location"
              />
            </motion.div>

            {/* Directions Button */}
            <div className="flex justify-center pt-4">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(brandConfig.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-secondary text-white px-16 py-8 rounded-3xl text-lg font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl shadow-secondary/40 hover:scale-[1.02] active:scale-95 justify-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <MapPin size={24} className="relative z-10" />
                <span className="relative z-10">Get Directions / นำทาง</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Bar */}
      <div className="bg-secondary overflow-hidden h-12 flex items-center border-y border-white/10">
        <div 
          className="flex whitespace-nowrap animate-scroll"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">
                HICAPS ACCEPTED
              </span>
              <span className="text-white/90 text-xs italic font-light tracking-widest">
                Instant Private Health Rebates
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Brand & Trust */}
          <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="font-serif text-3xl font-bold tracking-tight">{brandConfig.name}</h4>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin size={18} className="text-secondary" />
                    <p className="text-sm font-medium">Level 1/76 Pier Street, Altona 3018</p>
                  </div>
                </div>
            
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <ShieldCheck className="text-secondary" size={20} />
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                HICAPS & Health Rebates Available
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Quick Links</h5>
            <ul className="space-y-4">
              <li>
                <a href="#services" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Prices
                </a>
              </li>
              <li>
                <a 
                  href={brandConfig.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight size={14} className="text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Google Reviews / รีวิว
                </a>
              </li>
              <li>
                <button onClick={handleBookNow} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Book Now
                </button>
              </li>
              <li>
                <a 
                  href={brandConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight size={14} className="text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Buy Gift Voucher / บัตรของขวัญ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="space-y-8">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Contact Us</h5>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-secondary">
                  <Phone size={28} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Call for Booking</p>
                  <a href={`tel:${brandConfig.phone.replace(/\s+/g, '')}`} className="text-3xl font-serif font-bold text-secondary hover:text-white transition-colors tracking-tight">
                    {brandConfig.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <a 
                  href={brandConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-secondary text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center text-xs"
                >
                  Book Your Session / จองที่นี่
                </a>
                <a 
                  href={brandConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center text-xs gap-2"
                >
                  <Gift size={16} className="text-secondary" />
                  <span>Buy Gift Voucher / บัตรของขวัญ</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
              © 2026 {brandConfig.name}. All Rights Reserved.
            </p>
            <span 
              onClick={() => setShowLogin(true)} 
              style={{ cursor: 'pointer', opacity: 0.2 }}
            >
              🔒
            </span>
          </div>
        </div>
      </footer>

      <UpsellModal 
        isOpen={isUpsellOpen} 
        onClose={() => setIsUpsellOpen(false)} 
        onConfirm={confirmBooking} 
      />

      {/* Secret Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-6 text-center">Staff Login</h3>
            <input 
              type="password" 
              maxLength={4}
              placeholder="Enter PIN"
              className="w-full text-center text-3xl p-4 mb-6 border rounded-2xl"
              onChange={(e) => {
                const pin = e.target.value;
                if (pin.length === 4) {
                  if (pin === '3501') {
                    setAuth({ role: 'SuperAdmin', name: 'P\'Saen', pin });
                    setShowLogin(false);
                  } else {
                    setAuth({ role: 'Staff', name: 'Staff', pin });
                    setShowLogin(false);
                  }
                  e.target.value = '';
                }
              }}
            />
            <button onClick={() => setShowLogin(false)} className="w-full text-sm text-gray-500">Cancel</button>
          </div>
        </div>
      )}

      {/* Navigation based on Auth */}
      {auth?.role === 'SuperAdmin' && (
        <div className="fixed inset-0 z-50 bg-white">
          <button className="p-4" onClick={() => setAuth(null)}>Close</button>
          <V4Dashboard mode="owner-dashboard" />
        </div>
      )}
      {auth?.role === 'Staff' && (
        <div className="fixed inset-0 z-50 bg-white p-4">
          <button className="p-4 mb-4" onClick={() => setAuth(null)}>Close</button>
          <StaffEntryForm staffName={auth.name} providerNumber="000" onReceiptIssued={() => setAuth(null)} pin={auth.pin} />
        </div>
      )}
    </div>
  );
};
