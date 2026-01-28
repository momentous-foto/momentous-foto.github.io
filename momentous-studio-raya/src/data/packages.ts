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
// Default time slots (applies to most dates)
export const timeSlots = [
  { time: "09:00AM - 09:15AM", available: true },
  { time: "09:20AM - 09:35AM", available: true },
  { time: "09:40AM - 09:55AM", available: true },

  { time: "10:00AM - 10:15AM", available: true },
  { time: "10:20AM - 10:35AM", available: true },
  { time: "10:40AM - 10:55AM", available: true },

  { time: "11:00AM - 11:15AM", available: true },
  { time: "11:20AM - 11:35AM", available: true },
  { time: "11:40AM - 11:55AM", available: true },

  { time: "12:00PM - 12:15PM", available: true },
  { time: "12:20PM - 12:35PM", available: true },
  { time: "12:40PM - 12:55PM", available: true },

  { time: "01:00PM - 01:15PM", available: true },
  { time: "01:20PM - 01:35PM", available: true },
  { time: "01:40PM - 01:55PM", available: true },

  { time: "02:00PM - 02:15PM", available: true },
];

// Extended time slots (only for 14/3/2026 and 15/3/2026)
export const extendedTimeSlots = [
  { time: "02:20PM - 02:35PM", available: true },
  { time: "02:40PM - 02:55PM", available: true },

  { time: "03:00PM - 03:15PM", available: true },
  { time: "03:20PM - 03:35PM", available: true },
  { time: "03:40PM - 03:55PM", available: true },

  { time: "04:00PM - 04:15PM", available: true },
  { time: "04:20PM - 04:35PM", available: true },
  { time: "04:40PM - 04:55PM", available: true },
];

// Dates with extended hours (14/3/2026 and 15/3/2026)
export const extendedHourDates = [
  new Date(2026, 2, 14).toDateString(), // 14/3/2026
  new Date(2026, 2, 15).toDateString(), // 15/3/2026
];

// Helper function to get time slots for a specific date
export const getTimeSlotsForDate = (date: Date): typeof timeSlots => {
  const dateString = date.toDateString();
  const isExtendedDate = extendedHourDates.includes(dateString);
  
  if (isExtendedDate) {
    return [...timeSlots, ...extendedTimeSlots];
  }
  
  return timeSlots;
};

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