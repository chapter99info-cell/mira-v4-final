import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ChevronRight } from 'lucide-react';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-earth/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                <Sparkles size={40} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 leading-tight">
                Enhance Your <br />
                <span className="italic text-secondary">Experience</span>
              </h3>
              <p className="text-earth/60 text-sm md:text-base mb-8 leading-relaxed">
                Would you like to upgrade to our premium <span className="font-bold text-primary">Organic Coconut Oil</span> for only <span className="font-bold text-secondary">$5.00</span> extra?
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={onConfirm}
                  className="w-full bg-secondary text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-2 group"
                >
                  Yes, Upgrade Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onConfirm}
                  className="w-full bg-section text-earth/40 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-earth/5 transition-all"
                >
                  No thanks, just book
                </button>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-earth/20 hover:text-earth transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
