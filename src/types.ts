export interface User {
  uid: string;
  email: string;
  phoneNumber?: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'client';
  createdAt: string;
  medicalAlerts?: string;
  painPoints?: string[];
  painLevel?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  fullPrice: number;
  depositAmount: number;
  duration: number;
  image: string;
  video?: string;
  rates: { [key: string]: number };
  bestFor: string;
  keyBenefits: string[];
  category?: 'Standard' | 'Remedial';
  is_my_pick?: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  status: 'Working' | 'Off';
  isAccredited?: boolean;
  providerNumber?: string;
}

export interface Holiday {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  message: string;
  type: 'holiday' | 'emergency';
  isActive: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceId: string;
  serviceName: string;
  therapistId: string;
  therapistName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'deposit-paid' | 'fully-paid';
  isWalkIn: boolean;
  createdAt: string;
  needsHealthFundRebate?: boolean;
  useCoconutOil?: boolean;
  useAlmondOil?: boolean;
  depositPaid: boolean;
  intakeFormCompleted: boolean;
  paymentMethod?: 'Cash' | 'Transfer' | 'Card';
  subtotal?: number;
  discount?: number;
  totalAmount?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  timestamp: string;
}
