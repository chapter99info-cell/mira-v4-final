import { Service, Staff, Booking } from '../types';
import { brandConfig } from '../brandConfig';
import { readJson, writeJson, newId } from '../lib/localStore';

const BOOKINGS_KEY = 'bookings';

function getBookingsFromStore(): Booking[] {
  return readJson<Booking[]>(BOOKINGS_KEY, []);
}

function saveBookings(bookings: Booking[]): void {
  writeJson(BOOKINGS_KEY, bookings);
  window.dispatchEvent(new CustomEvent('mira-bookings-changed'));
}

export const apiService = {
  getServices: async (): Promise<Service[]> => brandConfig.services,

  getStaff: async (): Promise<Staff[]> => brandConfig.staff,

  getBookings: async (userId?: string): Promise<Booking[]> => {
    const all = getBookingsFromStore().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (!userId) return all;
    return all.filter((b) => b.clientId === userId);
  },

  subscribeBookings: (onChange: (bookings: Booking[]) => void): (() => void) => {
    const emit = () => {
      void apiService.getBookings().then(onChange);
    };
    emit();
    const onCustom = () => emit();
    const onStorage = (e: StorageEvent) => {
      if (e.key === `mira_v4_${BOOKINGS_KEY}`) emit();
    };
    window.addEventListener('mira-bookings-changed', onCustom);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('mira-bookings-changed', onCustom);
      window.removeEventListener('storage', onStorage);
    };
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
    const created: Booking = {
      ...booking,
      id: newId(),
      status: 'confirmed',
      createdAt: booking.createdAt || new Date().toISOString(),
    };
    const next = [created, ...getBookingsFromStore()];
    saveBookings(next);
    return created;
  },

  updateBooking: async (id: string, data: Partial<Booking>): Promise<void> => {
    const next = getBookingsFromStore().map((b) =>
      b.id === id ? { ...b, ...data } : b
    );
    saveBookings(next);
  },

  getStats: async () => {
    const services = await apiService.getServices();
    return services.map((s) => ({
      name: s.name.substring(0, 2),
      amount: Math.floor(Math.random() * 300) + 50,
      customers: Math.floor(Math.random() * 50) + 10,
    }));
  },
};
