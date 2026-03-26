import { Service, Staff, Booking } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { brandConfig } from '../brandConfig';

/**
 * API Service Layer
 * Using Firestore for real data persistence.
 */

export const apiService = {
  getServices: async (): Promise<Service[]> => {
    const path = 'services';
    try {
      const snapshot = await getDocs(collection(db, path));
      if (snapshot.empty) {
        // Seed if empty
        await apiService.seedServices();
        return brandConfig.services;
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  },

  seedServices: async () => {
    const path = 'services';
    try {
      for (const service of brandConfig.services) {
        const { id, ...data } = service;
        await setDoc(doc(db, path, id), data);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  getStaff: async (): Promise<Staff[]> => {
    const path = 'staff';
    try {
      const snapshot = await getDocs(collection(db, path));
      if (snapshot.empty) {
        // Seed if empty
        await apiService.seedStaff();
        return brandConfig.staff;
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Staff));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  },

  seedStaff: async () => {
    const path = 'staff';
    try {
      for (const staffMember of brandConfig.staff) {
        const { id, ...data } = staffMember;
        await setDoc(doc(db, path, id), data);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  getBookings: async (userId?: string): Promise<Booking[]> => {
    const path = 'bookings';
    try {
      let q = query(collection(db, path), orderBy('createdAt', 'desc'));
      if (userId) {
        q = query(collection(db, path), where('clientId', '==', userId), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
    const path = 'bookings';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...booking,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });
      const newDoc = await getDoc(docRef);
      return { id: docRef.id, ...newDoc.data() } as Booking;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      throw error;
    }
  },

  updateBooking: async (id: string, data: Partial<Booking>): Promise<void> => {
    const path = 'bookings';
    try {
      await setDoc(doc(db, path, id), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  },

  getStats: async () => {
    const path = 'bookings';
    try {
      // For demo purposes, we'll still use some randomization but based on real services
      const services = await apiService.getServices();
      return services.map(s => ({
        name: s.name.substring(0, 2),
        amount: Math.floor(Math.random() * 300) + 50,
        customers: Math.floor(Math.random() * 50) + 10
      }));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  }
};
