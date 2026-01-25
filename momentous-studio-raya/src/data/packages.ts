import { Package } from "@/types/booking";

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic Package",
    description: "Studio rental only — bring your own device and capture your Raya moments!",
    duration: "15 minutes",
    photos: 0,
    price: 69,
    features: [
      "15 minutes session",
      "Studio rental only",
      "No photographer provided",
      "Bring your own device",
      "Tripods for mobile/camera are provided",
      "Valid for 1-4 pax",
      "Add on pax: RM10/pax (max 2 pax)",
    ],
  },
  {
    id: "slay",
    name: "Slay Package",
    description: "Full photography experience with professional photographer and same-day delivery!",
    duration: "15 minutes",
    photos: 10,
    price: 99,
    features: [
      "15 minutes session",
      "Studio rental",
      "1 photographer provided",
      "Natural lighting and mono-light",
      "All RAW & 10 edited photos",
      "Same day delivery (Google Drive)",
      "Valid for 1-4 pax",
      "Add on pax: RM10/pax (max 2 pax)",
    ],
  },
];

// Available date slots for Raya season
export const availableDates = [
  // February 2026
  new Date(2026, 1, 21), // 21/2/2026
  new Date(2026, 1, 22), // 22/2/2026
  new Date(2026, 1, 28), // 28/2/2026
  // March 2026
  new Date(2026, 2, 1),  // 1/3/2026
  new Date(2026, 2, 7),  // 7/3/2026
  new Date(2026, 2, 8),  // 8/3/2026
  new Date(2026, 2, 14), // 14/3/2026
  new Date(2026, 2, 15), // 15/3/2026
  new Date(2026, 2, 28), // 28/3/2026
  new Date(2026, 2, 29), // 29/3/2026
];

// Time slots with duration ranges
export const timeSlots = [
  { time: "09:00AM - 09:20AM", available: true },
  { time: "09:30AM - 09:50AM", available: true },
  { time: "10:00AM - 10:20AM", available: true },
  { time: "10:30AM - 10:50AM", available: true },
  { time: "11:00AM - 11:20AM", available: true },
  { time: "11:30AM - 11:50AM", available: true },
  { time: "12:00PM - 12:20PM", available: true },
  { time: "12:30PM - 12:50PM", available: true },
];

// ============================================
// BOOKING MANAGEMENT - SUPER SIMPLE!
// ============================================
// Google Sheets is connected!
// Update your sheet to manage bookings.
//
// These arrays are BACKUP only (if Google Sheets fails)
// ============================================

// Backup: Slots with PENDING PAYMENT (not paid yet)
export const pendingSlots: string[] = [
  // Backup only - use Google Sheets instead!
];

// Backup: Slots FULLY BOOKED (payment confirmed)
export const bookedSlots: string[] = [
  // Backup only - use Google Sheets instead!
];