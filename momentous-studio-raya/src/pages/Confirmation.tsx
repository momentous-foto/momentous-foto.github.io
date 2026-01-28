import { useLocation, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { CheckCircle, Calendar, ArrowRight, Home, Users, MessageCircle, AlertCircle } from "lucide-react";
import Header from "@/components/booking/Header";
import Footer from "@/components/booking/Footer";
import FloatingClouds from "@/components/decorations/FloatingClouds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookingDetails } from "@/types/booking";
import { calculateTotalPrice, sendWhatsAppNotification } from "@/utils/notifications";

const Confirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking as BookingDetails | undefined;

  console.log("Confirmation page - booking data:", booking);
  console.log("Location state:", location.state);

  // Redirect if no booking data
  if (!booking || !booking.package) {
    console.log("No booking data, redirecting to home");
    return <Navigate to="/" replace />;
  }

  const generateCalendarLink = () => {
    if (!booking.date || !booking.time) return "#";
    
    try {
      // Parse time - handle format like "09:00AM - 09:20AM"
      const timeStr = booking.time.split(" - ")[0]; // Get start time
      const timeMatch = timeStr.match(/(\d+):(\d+)(AM|PM)/);
      
      if (!timeMatch) return "#";
      
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const period = timeMatch[3];
      
      // Convert to 24-hour format
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      
      const startDate = new Date(booking.date);
      startDate.setHours(hours, minutes, 0, 0);
      
      // Duration is 15 minutes for both packages
      const durationMinutes = 15;
      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
      
      const formatGoogleDate = (date: Date) =>
        date.toISOString().replace(/-|:|\.\d{3}/g, "");
      
      const title = encodeURIComponent(`Raya Photo Session - ${booking.package?.name}`);
      const details = encodeURIComponent(
        `Raya photoshoot session at Momentous Studio Raya\n\nPackage: ${booking.package?.name}\nDuration: ${booking.package?.duration}\n\nLocation: Kuala Lumpur, Malaysia\nContact: +60 10-447 1403`
      );
      
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${details}`;
    } catch (error) {
      console.error("Error generating calendar link:", error);
      return "#";
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingClouds density="medium" />
      <Header />
      <main className="flex-1 py-16">
        <div className="booking-container max-w-2xl mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Almost Done! 🎉
            </h1>
            <p className="text-muted-foreground text-lg">
              Your booking details are ready. Please complete the final step below to confirm your booking.
            </p>
          </div>

          {/* WhatsApp Instruction Alert */}
          <Alert className="mb-6 border-accent/50 bg-accent/5">
            <AlertCircle className="h-5 w-5 text-accent" />
            <AlertDescription className="ml-2">
              <p className="font-semibold text-foreground mb-2">📱 Important: Complete Your Booking</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click the "Send to WhatsApp" button below</li>
                <li>WhatsApp will open with your booking details pre-filled</li>
                <li>Click the <strong>SEND</strong> button in WhatsApp to confirm your booking</li>
                <li>We'll reply to confirm your slot within 24 hours</li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* Send to WhatsApp Button */}
          <div className="mb-8">
            <Button 
              onClick={() => sendWhatsAppNotification(booking)}
              size="lg"
              className="w-full sm:w-auto gap-2 text-lg py-6 px-8 bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5" />
              Send Booking to WhatsApp
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              WhatsApp will open in a new tab. Don't forget to click SEND! 
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">📋 Your Booking Summary</h2>
            <p className="text-sm text-muted-foreground">Review your booking details below</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6 space-y-4 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p className="font-semibold">{booking.package?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Number of People</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {booking.pax} pax
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">
                    {booking.date
                      ? format(booking.date, "EEEE, MMMM d, yyyy")
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold">{booking.time}</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-accent">RM{calculateTotalPrice(booking)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="gap-2 transition-all duration-300">
              <a
                href={generateCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4" />
                Add to Google Calendar
              </a>
            </Button>
            <Button asChild className="gap-2 transition-all duration-300">
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Need to make changes?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contact us at least 24 hours before your session to reschedule or
              cancel.
            </p>
            <Button asChild variant="link" className="text-accent gap-1">
              <a href="https://wa.me/60104471403" target="_blank" rel="noopener noreferrer">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;