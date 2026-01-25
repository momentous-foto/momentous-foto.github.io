import { format } from "date-fns";

export interface BookingSlot {
  date: string;
  time: string;
  status: "available" | "pending" | "booked";
}

// Google Sheets CSV URL
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJtKrZzWtmUVGZFzDTR6AGCQ2HxgGRxzjEV1IRTQpklzF2VTGezoeL1Ptg4K67P9IIH7yOUPKfK-h0/pub?output=csv";

let cachedBookings: BookingSlot[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute cache

export const fetchBookingsFromSheet = async (): Promise<BookingSlot[]> => {
  const now = Date.now();
  
  // Always fetch fresh data for now (debugging)
  // if (cachedBookings.length > 0 && now - lastFetchTime < CACHE_DURATION) {
  //   console.log("Using cached bookings");
  //   return cachedBookings;
  // }

  try {
    console.log("🔄 Fetching bookings from Google Sheets...");
    const response = await fetch(GOOGLE_SHEET_URL);
    if (!response.ok) throw new Error("Failed to fetch");
    
    const csvText = await response.text();
    console.log("📄 Raw CSV (first 300 chars):", csvText.substring(0, 300));
    
    const lines = csvText.split("\n").filter(line => line.trim());
    console.log(`📊 Total lines: ${lines.length}`);
    
    const bookings: BookingSlot[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Split by COMMA (CSV format), not tab
      const parts = line.split(",");
      let date = parts[0]?.trim() || "";
      const time = parts[1]?.trim() || "";
      let status = parts[2]?.trim().toLowerCase() || "";
      
      console.log(`Line ${i}: date="${date}" | time="${time}" | status="${status}"`);
      
      // Convert date format: 21-2-2026 → 2026-02-21
      if (date.includes("-") && date.split("-")[0].length <= 2) {
        const [day, month, year] = date.split("-");
        date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        console.log(`  → Converted to: ${date}`);
      }
      // Also handle: 2/21/2026 → 2026-02-21
      else if (date.includes("/")) {
        const [month, day, year] = date.split("/");
        date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        console.log(`  → Converted to: ${date}`);
      }
      
      if (date && time) {
        bookings.push({
          date,
          time,
          status: (status === "pending" || status === "booked") ? status : "available",
        });
      }
    }
    
    cachedBookings = bookings;
    lastFetchTime = now;
    console.log("✅ Loaded bookings:", bookings);
    return bookings;
  } catch (error) {
    console.error("❌ Error loading bookings:", error);
    return cachedBookings;
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
