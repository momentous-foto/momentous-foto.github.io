export interface Package {
  id: string;
  name: string;
  description: string;
  duration: string;
  photos: number;
  price: number;
  features: string[];
  isCustom?: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  status?: "available" | "pending" | "booked";
}

export interface BookingDetails {
  package: Package | null;
  date: Date | null;
  time: string | null;
  pax: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  imageConsent: boolean;
}

export interface BookingStep {
  number: number;
  title: string;
  description: string;
}