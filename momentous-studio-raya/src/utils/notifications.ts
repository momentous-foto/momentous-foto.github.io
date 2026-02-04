import { format } from "date-fns";
import { BookingDetails } from "@/types/booking";

const STUDIO_EMAIL = "momentousfotostudio@gmail.com";
const STUDIO_WHATSAPP = "60104471403";

export const calculateTotalPrice = (booking: BookingDetails): number => {
  if (!booking.package) return 0;
  const adultAddOnsCost = booking.adultAddOns * 10; // RM10 per adult add-on
  return booking.package.price + adultAddOnsCost;
};

export const generateBookingMessage = (booking: BookingDetails): string => {
  const totalPrice = calculateTotalPrice(booking);
  const totalPeople = booking.pax + booking.adultAddOns + booking.kidAddOns;
  const adultAddOnsCost = booking.adultAddOns * 10;
  
  let message = `*NEW BOOKING REQUEST*\n`;
  message += `_Momentous Studio Raya_\n\n`;
  message += `*Package:* ${booking.package?.name}\n`;
  message += `*Date:* ${booking.date ? format(booking.date, "EEEE, d MMMM yyyy") : "Not selected"}\n`;
  message += `*Time:* ${booking.time || "Not selected"}\n\n`;
  
  // Pax breakdown
  message += `*PAX DETAILS:*\n`;
  message += `• Base package: ${booking.pax} pax\n`;
  if (booking.adultAddOns > 0) {
    message += `• Adult add-ons: +${booking.adultAddOns} pax (+RM${adultAddOnsCost})\n`;
  }
  if (booking.kidAddOns > 0) {
    message += `• Kids (0-6 years): +${booking.kidAddOns} kids (FREE)\n`;
  }
  message += `• *Total: ${totalPeople} people*\n`;
  
  message += `\n*Total Price:* RM${totalPrice}\n`;
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
  const totalPeople = booking.pax + booking.adultAddOns + booking.kidAddOns;
  const adultAddOnsCost = booking.adultAddOns * 10;
  
  const subject = encodeURIComponent(
    `New Booking: ${booking.customerName} - ${booking.date ? format(booking.date, "d MMM yyyy") : ""}`
  );
  
  let body = `NEW BOOKING REQUEST\n\n`;
  body += `Package: ${booking.package?.name}\n`;
  body += `Date: ${booking.date ? format(booking.date, "EEEE, d MMMM yyyy") : "Not selected"}\n`;
  body += `Time: ${booking.time || "Not selected"}\n\n`;
  
  // Pax breakdown
  body += `PAX DETAILS:\n`;
  body += `• Base package: ${booking.pax} pax\n`;
  if (booking.adultAddOns > 0) {
    body += `• Adult add-ons: +${booking.adultAddOns} pax (+RM${adultAddOnsCost})\n`;
  }
  if (booking.kidAddOns > 0) {
    body += `• Kids (0-6 years): +${booking.kidAddOns} kids (FREE)\n`;
  }
  body += `• Total: ${totalPeople} people\n`;
  
  body += `\nTotal Price: RM${totalPrice}\n\n`;
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
