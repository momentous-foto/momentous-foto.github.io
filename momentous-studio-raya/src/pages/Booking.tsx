import { useNavigate } from "react-router-dom";
import Header from "@/components/booking/Header";
import Footer from "@/components/booking/Footer";
import BookingSteps from "@/components/booking/BookingSteps";
import PackageCard from "@/components/booking/PackageCard";
import DateTimePicker from "@/components/booking/DateTimePicker";
import CustomerForm from "@/components/booking/CustomerForm";
import BookingSummary from "@/components/booking/BookingSummary";
import PaxCounter from "@/components/booking/PaxCounter";
import FloatingClouds from "@/components/decorations/FloatingClouds";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/useBooking";
import { useToast } from "@/hooks/use-toast";
import { sendWhatsAppNotification } from "@/utils/notifications";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    currentStep,
    steps,
    booking,
    errors,
    timeSlots,
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
  } = useBooking();

  const handleConfirmBooking = () => {
    // Open WhatsApp immediately
    sendWhatsAppNotification(booking);
    
    // Navigate to confirmation page
    navigate("/confirmation", { state: { booking } });
    
    // Show success toast
    toast({
      title: "WhatsApp Opened! 🎉",
      description: "Please send the message in WhatsApp to complete your booking.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Select Your Package</h2>
              <p className="text-muted-foreground mt-2">
                Choose the package that best fits your needs
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  onClick={() => selectPackage(pkg)}
                  className="cursor-pointer"
                >
                  <PackageCard pkg={pkg} featured={index === 1} />
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Choose Date, Time & Pax</h2>
              <p className="text-muted-foreground mt-2 text-lg">
                Select your preferred date, time slot, and number of people
              </p>
            </div>
            <div className="max-w-5xl mx-auto space-y-8">
              <DateTimePicker
                selectedDate={booking.date || undefined}
                selectedTime={booking.time}
                onDateChange={selectDate}
                onTimeChange={selectTime}
                timeSlots={timeSlots}
              />
              <PaxCounter
                pax={booking.pax}
                onPaxChange={updatePax}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Your Details</h2>
              <p className="text-muted-foreground mt-2">
                Please provide your contact information
              </p>
            </div>
            <CustomerForm
              customerName={booking.customerName}
              customerEmail={booking.customerEmail}
              customerPhone={booking.customerPhone}
              notes={booking.notes}
              imageConsent={booking.imageConsent}
              onNameChange={updateCustomerName}
              onEmailChange={updateCustomerEmail}
              onPhoneChange={updateCustomerPhone}
              onNotesChange={updateNotes}
              onImageConsentChange={updateImageConsent}
              errors={errors}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
              <p className="text-muted-foreground mt-2">
                Review your details before confirming
              </p>
            </div>
            <BookingSummary booking={booking} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingClouds density="light" />
      <Header />
      <main className="flex-1 py-12">
        <div className="booking-container">
          <BookingSteps currentStep={currentStep} steps={steps} />

          <div className="mt-8 animate-fade-in">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between max-w-xl mx-auto">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep} className="gap-2 transition-all duration-300">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="gap-2 transition-all duration-300"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleConfirmBooking} className="gap-2 transition-all duration-300">
                <Check className="h-4 w-4" />
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;