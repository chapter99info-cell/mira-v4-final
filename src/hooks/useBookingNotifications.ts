import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const MUTE_STORAGE_KEY = 'mira_booking_notify_muted';
const TOAST_MS = 8000;

/** Shape of a new booking row from Supabase `bookings` INSERT. */
export interface BookingNotificationPayload {
  id: string;
  shop_id?: string;
  customer_name: string;
  booking_time: string;
  service_name: string;
}

export interface BookingToast {
  id: string;
  customerName: string;
  bookingTime: string;
  serviceName: string;
}

export interface UseBookingNotificationsResult {
  /** Current on-screen banner; null when nothing to show. */
  toast: BookingToast | null;
  dismissToast: () => void;
  muted: boolean;
  toggleMute: () => void;
  /**
   * iOS Safari blocks AudioContext / speech until a user gesture.
   * false until staff taps "Enable sound" (or any unlock control).
   */
  audioUnlocked: boolean;
  unlockAudio: () => void;
  /** Whether Supabase env is present and the realtime channel is active. */
  isListening: boolean;
}

type QueueItem = BookingNotificationPayload;

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeMuted(muted: boolean): void {
  try {
    localStorage.setItem(MUTE_STORAGE_KEY, muted ? '1' : '0');
  } catch {
    /* ignore quota / private mode */
  }
}

/** Map common column aliases from different shop schemas. */
function normalizeBookingRow(row: Record<string, unknown>): BookingNotificationPayload | null {
  const id = String(row.id ?? crypto.randomUUID());
  const customerName = String(
    row.customer_name ?? row.client_name ?? row.clientName ?? row.name ?? 'ลูกค้า'
  );
  const bookingTime = String(
    row.booking_time ??
      row.start_time ??
      row.startTime ??
      row.appointment_time ??
      [row.date, row.start_time ?? row.startTime].filter(Boolean).join(' ') ??
      ''
  );
  const serviceName = String(
    row.service_name ?? row.serviceName ?? row.service ?? 'บริการนวด'
  );

  return {
    id,
    shop_id: row.shop_id != null ? String(row.shop_id) : undefined,
    customer_name: customerName,
    booking_time: bookingTime || '—',
    service_name: serviceName,
  };
}

/**
 * Short "ding" via Web Audio API (no external file — works offline in the PWA).
 * Uses a brief sine chirp; requires an unlocked AudioContext (see unlockAudio).
 */
function playDing(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
}

function pickThaiVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith('th')) ??
    voices.find((v) => v.lang.toLowerCase().includes('thai')) ??
    null
  );
}

/**
 * Speak a Thai announcement. Resolves when utterance ends (or immediately if
 * TTS / Thai voice is unavailable — ding still plays separately).
 */
function speakThaiAnnouncement(
  customerName: string,
  bookingTime: string
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }

    const voice = pickThaiVoice();
    if (!voice) {
      // Graceful fallback: skip TTS when the device has no Thai voice.
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(
      `มีการจองคิวใหม่ คุณ ${customerName} เวลา ${bookingTime}`
    );
    utter.voice = voice;
    utter.lang = voice.lang || 'th-TH';
    utter.rate = 1;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

/**
 * Real-time booking alerts for the staff dashboard (iPad PWA).
 * Subscribes to Supabase `bookings` INSERT for the given shop_id.
 */
export function useBookingNotifications(shopId: string | undefined | null): UseBookingNotificationsResult {
  const [toast, setToast] = useState<BookingToast | null>(null);
  const [muted, setMuted] = useState(readMuted);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const queueRef = useRef<QueueItem[]>([]);
  const drainingRef = useRef(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const showToast = useCallback((item: QueueItem) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({
      id: item.id,
      customerName: item.customer_name,
      bookingTime: item.booking_time,
      serviceName: item.service_name,
    });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, TOAST_MS);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = null;
    setToast(null);
  }, []);

  /**
   * Drain the announcement queue serially so rapid INSERTs do not overlap
   * (ding + TTS finish before the next booking is announced).
   */
  const drainQueue = useCallback(async () => {
    if (drainingRef.current) return;
    drainingRef.current = true;

    while (queueRef.current.length > 0) {
      const next = queueRef.current.shift()!;
      showToast(next);

      if (!mutedRef.current && audioCtxRef.current) {
        try {
          if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
          }
          playDing(audioCtxRef.current);
        } catch {
          /* ignore ding errors */
        }
        await speakThaiAnnouncement(next.customer_name, next.booking_time);
        // Brief gap so consecutive announcements are distinct.
        await new Promise((r) => setTimeout(r, 350));
      } else if (!mutedRef.current) {
        // Unlocked path without context yet — still try TTS only.
        await speakThaiAnnouncement(next.customer_name, next.booking_time);
        await new Promise((r) => setTimeout(r, 350));
      }
    }

    drainingRef.current = false;
  }, [showToast]);

  const enqueue = useCallback(
    (item: QueueItem) => {
      queueRef.current.push(item);
      void drainQueue();
    },
    [drainQueue]
  );

  /**
   * iOS / Safari autoplay restriction workaround:
   * AudioContext starts "suspended" until a user gesture. Call this from a
   * button tap ("Enable sound") once per session so later booking ding/TTS
   * can play while the iPad tab stays open unattended.
   */
  const unlockAudio = useCallback(() => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) {
        setAudioUnlocked(true);
        return;
      }
      if (!audioCtxRef.current) {
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      void ctx.resume().then(() => {
        // Play a near-silent blip inside the gesture so iOS marks audio as allowed.
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0.001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.01);
        setAudioUnlocked(true);
      });

      // Prime speechSynthesis during the same gesture (iOS often needs this).
      if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
        const warm = new SpeechSynthesisUtterance(' ');
        warm.volume = 0;
        window.speechSynthesis.speak(warm);
        window.speechSynthesis.cancel();
      }
    } catch {
      setAudioUnlocked(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      writeMuted(next);
      if (next && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  // Keep voices list warm (Chrome loads voices async).
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const warm = () => {
      void window.speechSynthesis.getVoices();
    };
    warm();
    window.speechSynthesis.addEventListener('voiceschanged', warm);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', warm);
  }, []);

  // Supabase realtime: INSERT on bookings filtered by shop_id.
  useEffect(() => {
    if (!shopId || !isSupabaseConfigured || !supabase) {
      setIsListening(false);
      return;
    }

    const channel = supabase
      .channel(`bookings-insert:${shopId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
          filter: `shop_id=eq.${shopId}`,
        },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          const normalized = normalizeBookingRow(row);
          if (normalized) enqueue(normalized);
        }
      )
      .subscribe((status) => {
        setIsListening(status === 'SUBSCRIBED');
      });

    return () => {
      setIsListening(false);
      void supabase.removeChannel(channel);
    };
  }, [shopId, enqueue]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      void audioCtxRef.current?.close();
    };
  }, []);

  return {
    toast,
    dismissToast,
    muted,
    toggleMute,
    audioUnlocked,
    unlockAudio,
    isListening,
  };
}
