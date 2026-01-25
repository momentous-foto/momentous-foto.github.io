import { format, parse } from "date-fns";

export interface BookingSlot {
  date: string;
  time: string;
  status: "available" | "pending" | "booked";
  customerName?: string;
  notes?: string;
}

// Google Sheets CSV URL
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJtKrZzWtmUVGZFzDTR6AGCQ2HxgGRxzjEV1IRTQpklzF2VTGezoeL1Ptg4K67P9IIH7yOUPKfK-h0/pub?output=csv";

let cachedBookings: BookingSlot[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds cache for testing

// Convert DD-M-YYYY to YYYY-MM-DD
const parseGoogleDate = (dateStr: string): string => {
  try {
    // Parse "21-2-2026" format
    const parsed = parse(dateStr, "d-M-yyyy", new Date());
    const formatted = format(parsed, "yyyy-MM-dd");
    console.log(`Date conversion: ${dateStr} → ${formatted}`);
    return formatted;
  } catch (error) {
    console.error(`Failed to parse date: ${dateStr}`, error);
    return dateStr; // Return as-is if parsing fails
  }
};

export const fetchBookingsFromSheet = async (): Promise<BookingSlot[]> => {
  // Return cached data if still fresh
  const now = Date.now();
  if (cachedBookings.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedBookings;
  }

  // If no URL configured, return empty
  if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "YOUR_GOOGLE_SHEET_CSV_URL") {
    return [];
  }

  try {
    console.log("Fetching from Google Sheets...");
    const response = await fetch(GOOGLE_SHEET_URL);
    if (!response.ok) throw new Error("Failed to fetch");
    
    const csvText = await response.text();
    console.log("Raw CSV data:", csvText.substring(0, 200)); // Log first 200 chars
    
    const lines = csvText.split("\n").filter(line => line.trim());
    console.log(`Total lines: ${lines.length}`);
    
    // Skip header row
    const bookings: BookingSlot[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Split by tab (Google Sheets uses tabs in CSV)
      const parts = line.split("\t");
      const dateRaw = parts[0]?.trim();
      const time = parts[1]?.trim();
      const status = parts[2]?.trim().toLowerCase();
      
      console.log(`Line ${i}: date="${dateRaw}", time="${time}", status="${status}"`);
      
      if (dateRaw && time) {
        // Convert date from DD-M-YYYY to YYYY-MM-DD
        const date = parseGoogleDate(dateRaw);
        
        bookings.push({
          date,
          time,
          status: (status === "pending" || status === "booked") ? status : "available",
        });
      }
    }
    
    cachedBookings = bookings;
    lastFetchTime = now;
    console.log("✅ Loaded bookings from Google Sheets:", bookings);
    return bookings;
  } catch (error) {
    console.error("❌ Error fetching bookings from Google Sheets:", error);
    return cachedBookings; // Return cached data on error
  }
};

export const getBookingStatus = (
  bookings: BookingSlot[],
  date: Date,
  time: string
): "available" | "pending" | "booked" => {
  const dateStr = format(date, "yyyy-MM-dd");
  const booking = bookings.find(b => b.date === dateStr && b.time === time);
  return booking?.status || "available";
};
