import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ChevronRight } from 'lucide-react';
import { brandConfig } from '../brandConfig';

const reviews = [
  {
    id: 1,
    name: "Kanya S.",
    comment: "The best remedial massage in Sydney! Nara really knows how to target deep muscle tension. I felt like a new person after my session.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    service: "Remedial Thai Massage"
  },
  {
    id: 2,
    name: "James Wilson",
    comment: "Incredible atmosphere and professional staff. The aromatherapy oil massage was exactly what I needed to destress. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    service: "Aromatherapy Oil Massage"
  },
  {
    id: 3,
    name: "Pimchanok T.",
    comment: "Authentic Thai techniques combined with modern clinical knowledge. Somchai is a master of stretching. My flexibility has improved so much.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    service: "Traditional Thai Massage"
  },
  {
    id: 4,
    name: "David Chen",
    comment: "Clean, peaceful, and professional. The deep tissue therapy was intense but very effective for my chronic back pain. I'll be back!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    service: "Deep Tissue Therapy"
  }
];

export const CustomerReviews = () => {
  return (
    <section className="py-24 bg-section relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sage text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-secondary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-beige/20 shadow-sm hover:shadow-xl transition-all group relative"
            >
              <div className="absolute top-6 right-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                <Quote size={48} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-earth/70 text-sm leading-relaxed mb-8 italic">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-beige/20 group-hover:border-primary/20 transition-colors">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">{review.name}</h4>
                  <p className="text-[10px] text-sage font-bold uppercase tracking-widest">{review.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Call To Action Block */}
        <div className="mt-20 bg-white p-8 md:p-12 rounded-[3.5rem] border border-beige/30 shadow-md max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full translate-x-12 -translate-y-12 blur-xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-12 translate-y-12 blur-xl" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Stylized Google & Gmail Verified Reviews Badge Container */}
            <div className="md:col-span-5 flex flex-col justify-center items-center relative gap-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-primary/5 to-transparent rounded-[2.5rem] blur-2xl opacity-75" />
              
              {/* Premium Google Notification Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="relative bg-section/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-beige/30 shadow-xl w-full space-y-4"
              >
                {/* Header with Google logo and verify banner */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md border border-neutral-100">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.63-1.05-1.37-1.19-2.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-primary/70">Google Review</p>
                      <p className="text-xs font-bold text-primary">MIRA Massage</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#34A853]/10 text-[#34A853] px-2.5 py-0.5 rounded-full text-[9px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                    <span>Verified / ยืนยันแล้ว</span>
                  </div>
                </div>

                {/* Star rating and glowing description */}
                <div className="bg-white p-4 rounded-2xl border border-beige/10 shadow-sm space-y-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#FABB05] text-[#FABB05]" />
                    ))}
                  </div>
                  <p className="text-[11px] text-earth line-clamp-3 italic leading-relaxed">
                    "Absolutely blissful massage! The therapeutic oils and warm atmosphere are perfection. The friendly therapists made me feel like royalty! Highly recommended!"
                  </p>
                </div>

                {/* Gmail verified signature footer */}
                <div className="flex items-center justify-between border-t border-beige/20 pt-3">
                  <div className="flex items-center gap-2">
                    {/* Minimalist Gmail Logo SVG */}
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shadow-sm border border-neutral-100">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EAEAEA"/>
                        <path d="M22 6v12c0 1.1-.9 2-2 2h-2V8l-6 4-6-4v12H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1c.6 0 1.2.3 1.5.8L12 11l6.5-6.2c.3-.5.9-.8 1.5-.8h1c1.1 0 2 .9 2 2z" fill="#EA4335" />
                      </svg>
                    </div>
                    <div className="text-left leading-none">
                      <p className="text-[11px] font-bold text-primary">Gmail Customer</p>
                      <p className="text-[9px] text-earth/50">Verified review source</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-secondary uppercase tracking-wider">5.0 Star</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: CTA Content */}
            <div className="md:col-span-7 whitespace-normal text-center md:text-left space-y-4 md:pl-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FABB05]/10 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <Star size={12} className="fill-[#FABB05] text-[#FABB05]" />
                <span>Google Business Rating: 4.9/5</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary leading-tight">
                Loved Your Experience at MIRA?
              </h3>
              <p className="text-earth/70 text-sm md:text-base leading-relaxed">
                Please share your experience with us! Your feedback on Google/Gmail helps others discover our blissful sanctuary of total head-to-toe healing and physical recovery in Altona.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <motion.a
                  href={brandConfig.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-sage hover:shadow-[#4A5D23]/30 transition-all shadow-xl shadow-primary/25"
                >
                  <span>Write a Google Review / เขียนรีวิว</span>
                  <ChevronRight size={16} />
                </motion.a>
                
                <a 
                  href={brandConfig.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors underline underline-offset-4"
                >
                  View on Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Floating stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <a
            href={brandConfig.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center group block cursor-pointer"
          >
            <p className="text-3xl font-serif font-bold text-primary group-hover:text-secondary transition-colors">4.9/5</p>
            <p className="text-[10px] font-bold uppercase tracking-widest group-hover:text-secondary transition-colors">Google Rating (Rate Us ⭐)</p>
          </a>
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-primary">2k+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-primary">15+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Master Therapists</p>
          </div>
        </div>
      </div>
    </section>
  );
};
