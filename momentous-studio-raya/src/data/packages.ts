import { Package } from "@/types/booking";

const SLAY_PRICE_CUTOFF = new Date(2026, 1, 7, 0, 0, 0);
const CLEARANCE_SALE_START = new Date(2026, 1, 15, 0, 0, 0); // Feb 15, 2026 - Clearance Sale Starts! 🎉
const CLEARANCE_SALE_END = new Date(2026, 1, 27, 23, 59, 59); // Feb 27, 2026 - Last Day!

const getSlayPackagePrice = (now: Date = new Date()): number => {
  // Clearance Sale: RM129 from Feb 15 - Feb 27, 2026
  if (now >= CLEARANCE_SALE_START && now <= CLEARANCE_SALE_END) {
    return 129;
  }
  return now >= SLAY_PRICE_CUTOFF ? 149 : 99;
}

export const isClearanceSale = (now: Date = new Date()): boolean => {
  return now >= CLEARANCE_SALE_START && now <= CLEARANCE_SALE_END;
}

export const getClearanceSaleEnd = (): Date => CLEARANCE_SALE_END;

export const getNextSlayPriceChange = (now: Date = new Date()): Date | null => {
  // If currently in clearance sale, next change is when sale ends (price goes back to RM149)
  if (isClearanceSale(now)) {
    return CLEARANCE_SALE_END;
  }
  // Otherwise, no scheduled price changes
  return null;
}

export const getPackages = (now: Date = new Date()): Package[] => [
  {
    id: "slay",
    name: "Slay Package",
    description: isClearanceSale(now) 
      ? "🔥 CLEARANCE SALE! Classic outdoor photoshoot at Bukit Lagong, Batu Caves with natural nature setting and Malay classic style. Limited time offer until 27 Feb!" 
      : "Classic outdoor photoshoot at Bukit Lagong, Batu Caves with natural nature setting and Malay classic style.",
    duration: "15 minutes",
    photos: 10,
    price: getSlayPackagePrice(now),
    originalPrice: isClearanceSale(now) ? 149 : undefined,
    features: [
      "Maximum 1-4 persons (Additional RM10 per person)",
      "Children below 6 years old: Free",
      "Session duration 15 minutes",
      "Unlimited shots",
      "Outdoor photoshoot",
      "Raw photos delivered within 1-2 working days",
      "10 edited photos (selected by the customer)",
      "Photos uploaded to Google Drive (valid for 7 days)",
      "Additional edited photos: RM5 per photo",
    ],
  },
];

// Available date slots for Raya season
export const availableDates = [
  // February 2026
  new Date(2026, 1, 21), // 21/2/2026
  new Date(2026, 1, 22), // 22/2/2026
  new Date(2026, 1, 27), // 27/2/2026 - NEW SLOT OPENED!
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

// Extended time slots - Medium hours (until 03:40PM - 03:55PM)
export const mediumExtendedTimeSlots = [
  { time: "02:20PM - 02:35PM", available: true },
  { time: "02:40PM - 02:55PM", available: true },

  { time: "03:00PM - 03:15PM", available: true },
  { time: "03:20PM - 03:35PM", available: true },
  { time: "03:40PM - 03:55PM", available: true },
];

// Extended time slots - Full hours (until 04:40PM - 04:55PM)
export const fullExtendedTimeSlots = [
  { time: "02:20PM - 02:35PM", available: true },
  { time: "02:40PM - 02:55PM", available: true },

  { time: "03:00PM - 03:15PM", available: true },
  { time: "03:20PM - 03:35PM", available: true },
  { time: "03:40PM - 03:55PM", available: true },

  { time: "04:00PM - 04:15PM", available: true },
  { time: "04:20PM - 04:35PM", available: true },
  { time: "04:40PM - 04:55PM", available: true },
];

// Dates with medium extended hours (until 03:40PM - 03:55PM)
export const mediumExtendedHourDates = [
  new Date(2026, 1, 21).toDateString(), // 21/2/2026
  new Date(2026, 1, 22).toDateString(), // 22/2/2026
  new Date(2026, 1, 27).toDateString(), // 27/2/2026
  new Date(2026, 1, 28).toDateString(), // 28/2/2026
  new Date(2026, 2, 1).toDateString(),  // 1/3/2026
  new Date(2026, 2, 7).toDateString(),  // 7/3/2026
  new Date(2026, 2, 28).toDateString(), // 28/3/2026
  new Date(2026, 2, 29).toDateString(), // 29/3/2026
];

// Dates with full extended hours (until 04:40PM - 04:55PM)
export const fullExtendedHourDates = [
  new Date(2026, 2, 8).toDateString(),  // 8/3/2026
  new Date(2026, 2, 14).toDateString(), // 14/3/2026
  new Date(2026, 2, 15).toDateString(), // 15/3/2026
];

// Helper function to get time slots for a specific date
export const getTimeSlotsForDate = (date: Date): typeof timeSlots => {
  const dateString = date.toDateString();
  
  // Check if date has full extended hours (until 04:40PM)
  if (fullExtendedHourDates.includes(dateString)) {
    return [...timeSlots, ...fullExtendedTimeSlots];
  }
  
  // Check if date has medium extended hours (until 03:40PM)
  if (mediumExtendedHourDates.includes(dateString)) {
    return [...timeSlots, ...mediumExtendedTimeSlots];
  }
  
  // Default time slots only (until 02:00PM)
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