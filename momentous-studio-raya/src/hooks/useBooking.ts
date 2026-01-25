import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingDetails, Package } from "@/types/booking";
import { packages, timeSlots, bookedSlots, pendingSlots } from "@/data/packages";
import { format } from "date-fns";
import { fetchBookingsFromSheet, getBookingStatus } from "@/utils/sheets";

export const useBooking = () => {
  const [searchParams] = useSearchParams();
  const preselectedPackageId = searchParams.get("package");
  const preselectedPackage = packages.find((p) => p.id === preselectedPackageId) || null;

  const [currentStep, setCurrentStep] = useState(preselectedPackage ? 2 : 1);
  const [sheetBookings, setSheetBookings] = useState<any[]>([]);
  const [booking, setBooking] = useState<BookingDetails>({
    package: preselectedPackage,
    date: null,
    time: null,
    pax: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
    imageConsent: false,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    consent?: string;
  }>({});

  const steps = [
    { number: 1, title: "Package" },
    { number: 2, title: "Date & Time" },
    { number: 3, title: "Your Details" },
    { number: 4, title: "Confirm" },
  ];

  useEffect(() => {
    fetchBookingsFromSheet().then(setSheetBookings);
  }, []);

  const selectPackage = useCallback((pkg: Package) => {
    setBooking((prev) => ({ ...prev, package: pkg }));
    setCurrentStep(2);
  }, []);

  const selectDate = useCallback((date: Date | undefined) => {
    setBooking((prev) => ({ ...prev, date: date || null, time: null }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setBooking((prev) => ({ ...prev, time }));
  }, []);

  const updateCustomerName = useCallback((name: string) => {
    setBooking((prev) => ({ ...prev, customerName: name }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  }, [errors.name]);

  const updateCustomerEmail = useCallback((email: string) => {
    setBooking((prev) => ({ ...prev, customerEmail: email }));
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  }, [errors.email]);

  const updateCustomerPhone = useCallback((phone: string) => {
    setBooking((prev) => ({ ...prev, customerPhone: phone }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  }, [errors.phone]);

  const updateNotes = useCallback((notes: string) => {
    setBooking((prev) => ({ ...prev, notes }));
  }, []);

  const updatePax = useCallback((pax: number) => {
    setBooking((prev) => ({ ...prev, pax }));
  }, []);

  const updateImageConsent = useCallback((consent: boolean) => {
    setBooking((prev) => ({ ...prev, imageConsent: consent }));
  }, []);

  // Get available time slots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!booking.date) return timeSlots;

    const dateStr = format(booking.date, "yyyy-MM-dd");
    console.log("🗓️ Selected date:", dateStr);
    console.log("📋 Sheet bookings:", sheetBookings);
    
    return timeSlots.map(slot => {
      // Check Google Sheets first
      const sheetStatus = getBookingStatus(sheetBookings, booking.date!, slot.time);
      console.log(`Slot ${slot.time}: sheetStatus = ${sheetStatus}`);
      
      if (sheetStatus !== "available") {
        console.log(`  ✓ Marking as ${sheetStatus}`);
        return { ...slot, available: false, status: sheetStatus };
      }
      
      // Fallback to code arrays
      const isBooked = bookedSlots.some(s => s.startsWith(`${dateStr}|${slot.time}`));
      const isPending = pendingSlots.some(s => s.startsWith(`${dateStr}|${slot.time}`));
      
      return {
        ...slot,
        available: !isBooked && !isPending,
        status: isBooked ? "booked" : isPending ? "pending" : "available"
      };
    });
  }, [booking.date, sheetBookings]);

  const validateStep3 = useCallback(() => {
    const newErrors: typeof errors = {};
    
    if (!booking.customerName.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!booking.customerEmail.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.customerEmail)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!booking.customerPhone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!booking.imageConsent) {
      newErrors.consent = "You must agree to the image usage terms to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [booking.customerName, booking.customerEmail, booking.customerPhone, booking.imageConsent]);

  const nextStep = useCallback(() => {
    if (currentStep === 3 && !validateStep3()) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }, [currentStep, validateStep3]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return booking.package !== null;
      case 2:
        return booking.date !== null && booking.time !== null;
      case 3:
        return (
          booking.customerName.trim() !== "" &&
          booking.customerEmail.trim() !== "" &&
          booking.customerPhone.trim() !== "" &&
          booking.imageConsent
        );
      default:
        return true;
    }
  }, [currentStep, booking]);

  return {
    currentStep,
    steps,
    booking,
    errors,
    timeSlots: availableTimeSlots,
    packages,
    selectPackage,
    selectDate,
    selectTime,
    updateCustomerName,
    updateCustomerEmail,
    updateCustomerPhone,
    updateNotes,
    updatePax,
    updateImageConsent,
    nextStep,
    prevStep,
    canProceed,
  };
};