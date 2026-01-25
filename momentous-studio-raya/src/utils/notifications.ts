import { format } from "date-fns";
import { BookingDetails } from "@/types/booking";

const STUDIO_EMAIL = "momentousfotostudio@gmail.com";
const STUDIO_WHATSAPP = "60104471403";

export const calculateTotalPrice = (booking: BookingDetails): number => {
  if (!booking.package) return 0;
  const basePax = 4;
  const extraPax = Math.max(0, booking.pax - basePax);
  const extraCost = extraPax * 10; // RM10 per extra pax
  return booking.package.price + extraCost;
};

export const generateBookingMessage = (booking: BookingDetails): string => {
  const totalPrice = calculateTotalPrice(booking);
  const basePax = 4;
  const extraPax = Math.max(0, booking.pax - basePax);
  
  let message = `*NEW BOOKING REQUEST*\n`;
  message += `_Momentous Studio Raya_\n\n`;
  message += `*Package:* ${booking.package?.name}\n`;
  message += `*Date:* ${booking.date ? format(booking.date, "EEEE, d MMMM yyyy") : "Not selected"}\n`;
  message += `*Time:* ${booking.time || "Not selected"}\n`;
  message += `*Pax:* ${booking.pax} people`;
  if (extraPax > 0) {
    message += ` (+${extraPax} extra @ RM10 each)`;
  }
  message += `\n*Total:* RM${totalPrice}\n`;
  message += `\n----------------------------\n`;
  message += `*CUSTOMER DETAILS*\n`;
  message += `Name: ${booking.customerName}\n`;
  message += `Email: ${booking.customerEmail}\n`;
  message += `Phone: ${booking.customerPhone}`;
  if (booking.notes) {
    message += `\n\nNotes: ${booking.notes}`;
  }
  message += `\n\n----------------------------\n`;
  message += `✓ Customer has agreed to Terms & Conditions\n`;
  message += `✓ Customer has granted image usage consent`;
  
  return message;
};

export const sendWhatsAppNotification = (booking: BookingDetails): void => {
  const message = generateBookingMessage(booking);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export const sendEmailNotification = (booking: BookingDetails): void => {
  const totalPrice = calculateTotalPrice(booking);
  const basePax = 4;
  const extraPax = Math.max(0, booking.pax - basePax);
  
  const subject = encodeURIComponent(
    `New Booking: ${booking.customerName} - ${booking.date ? format(booking.date, "d MMM yyyy") : ""}`
  );
  
  let body = `NEW BOOKING REQUEST\n\n`;
  body += `Package: ${booking.package?.name}\n`;
  body += `Date: ${booking.date ? format(booking.date, "EEEE, d MMMM yyyy") : "Not selected"}\n`;
  body += `Time: ${booking.time || "Not selected"}\n`;
  body += `Pax: ${booking.pax} people`;
  if (extraPax > 0) {
    body += ` (+${extraPax} extra @ RM10 each)`;
  }
  body += `\nTotal: RM${totalPrice}\n\n`;
  body += `Customer Details:\n`;
  body += `Name: ${booking.customerName}\n`;
  body += `Email: ${booking.customerEmail}\n`;
  body += `Phone: ${booking.customerPhone}\n`;
  if (booking.notes) {
    body += `\nNotes: ${booking.notes}`;
  }
  body += `\n\n----------------------------\n`;
  body += `✓ Customer has agreed to Terms & Conditions\n`;
  body += `✓ Customer has granted image usage consent\n`;
  
  const mailtoUrl = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};
