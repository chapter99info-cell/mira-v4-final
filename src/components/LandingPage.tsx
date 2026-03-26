import React from 'react';
import { brandConfig } from '../brandConfig';
import { motion } from 'motion/react';
import { Clock, DollarSign, ChevronRight, MapPin, Phone, Instagram, Facebook, Sparkles, Mail, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { CustomerReviews } from './CustomerReviews';

interface LandingPageProps {
  onBookNow: (service?: Service, withCoconut?: boolean, duration?: number) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBookNow }) => {
  const handleBookNow = () => {
    window.open('https://mira.book.receptionerapp.com/', '_blank');
  };

  return (
    <div className="bg-white text-earth selection:bg-primary/20 font-sans min-h-screen pb-24">
      {/* Header (The Hero) */}
      <section className="relative h-[70vh] md:h-[85vh] flex flex-col items-center justify-start overflow-hidden">
        {/* Mural Background with Gradient Fade */}
        <div className="absolute inset-0">
          <img 
            src={brandConfig.heroImage} 
            alt="MIRA Hero" 
            className="w-full h-full object-cover object-center transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white" />
        </div>
        
        {/* Circular Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 mt-12"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden">
            <img src={brandConfig.logo} alt="MIRA Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>
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
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleBookNow}
              className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-sage transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95"
            >
              Book Appointment
            </button>
            <a href="#services" className="text-primary font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8 px-6 py-4">
              Explore Services
            </a>
          </div>
        </motion.div>
      </section>

      {/* Atmosphere Video Section */}
      <section className="py-24 bg-section overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] block">The Atmosphere</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                A Sanctuary for <br />
                <span className="italic text-sage">Mind & Body</span>
              </h2>
              <p className="text-earth/60 text-lg leading-relaxed font-light">
                Step into a world where time slows down. Our sanctuary is designed to transport you to a state of deep tranquility, combining the natural warmth of Thai hospitality with a serene, modern aesthetic.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">
                  Trusted by <span className="text-sage">500+</span> monthly guests
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-beige/10">
                {(brandConfig as any).promoVideo ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={(brandConfig as any).promoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={brandConfig.heroImage} 
                    alt="Atmosphere" 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] shadow-xl border border-beige/10 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Open Daily</h4>
                    <p className="text-[10px] text-earth/50">9:00 AM — 8:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Grid (Modern Mix) */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Our Heritage</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Healing Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brandConfig.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 rounded-[3rem] shadow-xl shadow-earth/5 border border-beige/10 cursor-pointer transition-all hover:border-primary/20"
              onClick={handleBookNow}
            >
              <div className="relative w-full aspect-square mb-8 rounded-[2rem] overflow-hidden">
                {service.video ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  >
                    <source src={service.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <button className="w-full bg-white text-primary py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    Book Now
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-serif font-bold text-primary mb-1 group-hover:text-sage transition-colors leading-tight">
                  {service.name}
                </h3>
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-sage uppercase tracking-wider bg-sage/5 px-2 py-0.5 rounded-md">
                    Best for: {service.bestFor}
                  </span>
                </div>

                <div className="text-left space-y-4 mb-6">
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-earth/30 mb-1.5">Service Details</h4>
                    <p className="text-earth/50 text-[11px] leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-earth/30 mb-2">Key Benefits</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.keyBenefits.map((benefit, i) => (
                        <span key={i} className="text-[9px] text-earth/60 bg-section px-2 py-0.5 rounded-full border border-beige/10">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {Object.keys(service.rates).map(duration => (
                    <button 
                      key={duration} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow();
                      }}
                      className="flex flex-col items-center px-3 py-2 bg-section rounded-xl text-[9px] font-bold text-earth/40 uppercase tracking-widest border border-beige/10 hover:border-primary/40 hover:text-primary transition-all hover:bg-white min-w-[54px]"
                    >
                      <span>{duration}M</span>
                      <span className="text-primary mt-1 text-[10px]">${service.rates[duration]}</span>
                    </button>
                  ))}
                </div>

                {/* Coconut Oil Upsell */}
                {service.id !== 'thai-massage-no-oil' && (
                  <div className="space-y-3 mb-6">
                    <div className="p-4 bg-sage/5 rounded-2xl border border-sage/10 relative overflow-hidden group/upsell">
                      <div className="absolute top-0 right-0 bg-sage text-white text-[7px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">
                        Guest Favorite
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sage shadow-sm">
                          <Sparkles size={14} />
                        </div>
                        <div className="text-left">
                          <h5 className="text-[10px] font-bold text-primary uppercase tracking-wider">Upgrade to Coconut Oil</h5>
                          <p className="text-[8px] text-earth/50 font-medium">Nourishing & Organic</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow();
                        }}
                        className="w-full bg-white text-sage border border-sage/30 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-sage hover:text-white transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        Add +$5 <ChevronRight size={12} />
                      </button>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 relative overflow-hidden group/upsell">
                      <div className="absolute top-0 right-0 bg-primary text-white text-[7px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">
                        Premium Choice
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                          <Sparkles size={14} />
                        </div>
                        <div className="text-left">
                          <h5 className="text-[10px] font-bold text-primary uppercase tracking-wider">Upgrade to Almond Oil</h5>
                          <p className="text-[8px] text-earth/50 font-medium">Sweet & Skin-Softening</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow();
                        }}
                        className="w-full bg-white text-primary border border-primary/30 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        Add +$10 <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-beige/10 flex items-center justify-center gap-2 text-primary">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Starting from</span>
                  <span className="text-lg font-serif font-bold">${Math.min(...(Object.values(service.rates) as number[]))}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Find Us Section */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sage text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Visit Us</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Find Us</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-section flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <MapPin size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-sage uppercase tracking-[0.3em]">Our Location</p>
                    <p className="text-xl font-serif font-bold text-primary leading-tight">
                      {brandConfig.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-section flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Clock size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-sage uppercase tracking-[0.3em]">Opening Hours</p>
                    <p className="text-xl font-serif font-bold text-primary leading-tight">
                      Mon-Sun: 10:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-section flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Phone size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-sage uppercase tracking-[0.3em]">Contact Us</p>
                    <a 
                      href={`tel:${brandConfig.phone.replace(/\s+/g, '')}`}
                      className="text-xl font-serif font-bold text-primary leading-tight hover:text-secondary transition-colors"
                    >
                      {brandConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <a 
                  href={`tel:${brandConfig.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 bg-secondary text-white px-10 py-6 rounded-2xl text-base font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl shadow-secondary/40 hover:scale-[1.02] active:scale-95 justify-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Phone size={22} className="relative z-10 animate-pulse" />
                  <span className="relative z-10">Call for Booking / โทรจองคิวทันที</span>
                </a>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(brandConfig.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-primary border-2 border-primary/10 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-section transition-all hover:scale-[1.02] active:scale-95 justify-center"
                >
                  <MapPin size={18} />
                  Get Directions / นำทาง
                </a>
              </div>
            </motion.div>

            {/* Map Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-section"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50383.69634734493!2d144.7915!3d-37.8685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6615866666667%3A0x5045675218ce6e0!2sAltona%20VIC%203018%2C%20Australia!5e0!3m2!1sen!2sus!4v1711415491000!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mira Remedial Thai Massage Location"
              />
            </motion.div>
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
                <p className="text-sm font-medium">Altona, Melbourne, VIC</p>
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
                <button onClick={handleBookNow} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Book Now
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="space-y-8">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Contact Us</h5>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary">
                  <Phone size={22} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Call for Booking</p>
                  <a href={`tel:${brandConfig.phone.replace(/\s+/g, '')}`} className="text-xl font-serif font-bold hover:text-secondary transition-colors">
                    {brandConfig.phone}
                  </a>
                </div>
              </div>
              
              <button 
                onClick={handleBookNow}
                className="w-full bg-secondary text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-xl shadow-secondary/10"
              >
                Book Your Session
              </button>
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
          </div>
        </div>
      </footer>
    </div>
  );
};
