import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X } from 'lucide-react';
import type { BookingToast } from '../../hooks/useBookingNotifications';

export interface NotificationToastProps {
  toast: BookingToast | null;
  onDismiss: () => void;
}

/**
 * Fixed banner for a new booking. Auto-dismiss is owned by the hook (8s);
 * this component only renders / animates the current toast.
 */
export const NotificationToast: React.FC<NotificationToastProps> = ({ toast, onDismiss }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="fixed top-4 left-4 right-4 z-[300] mx-auto max-w-lg"
        >
          <div className="flex items-start gap-4 rounded-2xl border border-beige/30 bg-white p-4 shadow-xl shadow-primary/10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Bell size={20} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-sage">
                New booking / จองคิวใหม่
              </p>
              <p className="truncate text-base font-serif font-bold text-primary">
                {toast.customerName}
              </p>
              <p className="mt-0.5 text-sm text-earth/70">
                {toast.bookingTime}
                {toast.serviceName ? ` · ${toast.serviceName}` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-xl p-2 text-earth/40 transition-colors hover:bg-section hover:text-earth"
              aria-label="Dismiss notification"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
