import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingDetails, Package } from "@/types/booking";
import { getTimeSlotsForDate, bookedSlots, pendingSlots } from "@/data/packages";
import { usePackages } from "@/hooks/usePackages";
import { format } from "date-fns";
import { fetchBookingsFromSheet, getBookingStatus } from "@/utils/sheets";

export const useBooking = () => {
  const [searchParams] = useSearchParams();
  const packages = usePackages();
  const preselectedPackageId = searchParams.get("package");
  const preselectedPackage = packages.find((p) => p.id === preselectedPackageId) || null;
  
  // Auto-select if only one package exists
  const autoSelectedPackage = packages.length === 1 ? packages[0] : preselectedPackage;
  const shouldSkipPackageSelection = packages.length === 1 || preselectedPackage !== null;

  const [currentStep, setCurrentStep] = useState(shouldSkipPackageSelection ? 1 : 1);
  const [sheetBookings, setSheetBookings] = useState<any[]>([]);
  const [booking, setBooking] = useState<BookingDetails>({
    package: autoSelectedPackage,
    date: null,
    time: null,
    timeSlots: [],
    pax: 1,
    adultAddOns: 0,
    kidAddOns: 0,
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

  const steps = packages.length === 1 
    ? [
        { number: 1, title: "Date & Time" },
        { number: 2, title: "Your Details" },
        { number: 3, title: "Confirm" },
      ]
    : [
        { number: 1, title: "Package" },
        { number: 2, title: "Date & Time" },
        { number: 3, title: "Your Details" },
        { number: 4, title: "Confirm" },
      ];

  useEffect(() => {
    fetchBookingsFromSheet().then(setSheetBookings);
  }, []);

  useEffect(() => {
    if (!booking.package) return;

    const updatedPackage = packages.find((pkg) => pkg.id === booking.package?.id);
    if (updatedPackage && updatedPackage.price !== booking.package.price) {
      setBooking((prev) => ({ ...prev, package: updatedPackage }));
    }
  }, [packages, booking.package]);

  const selectPackage = useCallback((pkg: Package) => {
    setBooking((prev) => ({ ...prev, package: pkg }));
    setCurrentStep(2);
  }, []);

  const selectDate = useCallback((date: Date | undefined) => {
    setBooking((prev) => ({ ...prev, date: date || null, time: null, timeSlots: [] }));
  }, []);

  const selectTimeSlots = useCallback((timeSlots: string[]) => {
    setBooking((prev) => ({ 
      ...prev, 
      timeSlots,
      time: timeSlots.length > 0 ? timeSlots[0] : null // Keep first slot for backward compatibility
    }));
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

  const updateAdultAddOns = useCallback((adultAddOns: number) => {
    setBooking((prev) => ({ ...prev, adultAddOns }));
  }, []);

  const updateKidAddOns = useCallback((kidAddOns: number) => {
    setBooking((prev) => ({ ...prev, kidAddOns }));
  }, []);

  const updateImageConsent = useCallback((consent: boolean) => {
    setBooking((prev) => ({ ...prev, imageConsent: consent }));
  }, []);

  // Get available time slots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!booking.date) return getTimeSlotsForDate(new Date());

    const dateStr = format(booking.date, "yyyy-MM-dd");
    console.log("🗓️ Selected date:", dateStr);
    console.log("📋 Sheet bookings:", sheetBookings);
    
    // Get the correct time slots for this date (includes extended hours if applicable)
    const timeSlotsForDate = getTimeSlotsForDate(booking.date);
    
    return timeSlotsForDate.map(slot => {
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
    // Determine if we're on the customer details step
    // When only 1 package: step 2 is customer details
    // When multiple packages: step 3 is customer details
    const isCustomerDetailsStep = packages.length === 1 ? currentStep === 2 : currentStep === 3;
    
    if (isCustomerDetailsStep && !validateStep3()) {
      return;
    }
    
    const maxStep = packages.length === 1 ? 3 : 4;
    setCurrentStep((prev) => Math.min(prev + 1, maxStep));
  }, [currentStep, validateStep3, packages.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const canProceed = useCallback(() => {
    // Adjust step checking based on whether package selection was skipped
    const hasOnlyOnePackage = packages.length === 1;
    
    if (hasOnlyOnePackage) {
      // Steps: 1=Date&Time, 2=Details, 3=Confirm
      switch (currentStep) {
        case 1:
          return booking.date !== null && booking.timeSlots.length > 0;
        case 2:
          return (
            booking.customerName.trim() !== "" &&
            booking.customerEmail.trim() !== "" &&
            booking.customerPhone.trim() !== "" &&
            booking.imageConsent
          );
        default:
          return true;
      }
    } else {
      // Steps: 1=Package, 2=Date&Time, 3=Details, 4=Confirm
      switch (currentStep) {
        case 1:
          return booking.package !== null;
        case 2:
          return booking.date !== null && booking.timeSlots.length > 0;
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
    }
  }, [currentStep, booking, packages.length]);

  return {
    currentStep,
    steps,
    booking,
    errors,
    timeSlots: availableTimeSlots,
    packages,
    selectPackage,
    selectDate,
    selectTimeSlots,
    updateCustomerName,
    updateCustomerEmail,
    updateCustomerPhone,
    updateNotes,
    updatePax,
    updateAdultAddOns,
    updateKidAddOns,
    updateImageConsent,
    nextStep,
    prevStep,
    canProceed,
  };
};