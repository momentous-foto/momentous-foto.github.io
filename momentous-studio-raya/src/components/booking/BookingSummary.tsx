import { format } from "date-fns";
import { Calendar, Clock, Package, User, Mail, Phone, FileText, Users } from "lucide-react";
import { BookingDetails } from "@/types/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateTotalPrice } from "@/utils/notifications";

interface BookingSummaryProps {
  booking: BookingDetails;
}

const BookingSummary = ({ booking }: BookingSummaryProps) => {
  const totalPrice = calculateTotalPrice(booking);
  const basePax = 4;
  const extraPax = Math.max(0, booking.pax - basePax);
  const extraCost = extraPax * 10;

  return (
    <Card className="max-w-xl mx-auto animate-fade-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl">Booking Summary</CardTitle>
        <p className="text-muted-foreground">Please review your booking details</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Package Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accent font-medium">
            <Package className="h-4 w-4" />
            <span>Package</span>
          </div>
          <div className="pl-6">
            <p className="font-semibold">{booking.package?.name}</p>
            <p className="text-sm text-muted-foreground">
              {booking.package?.duration}
              {booking.package?.photos > 0 && ` • ${booking.package.photos} edited photos`}
            </p>
          </div>
        </div>

        <Separator />

        {/* Pax Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accent font-medium">
            <Users className="h-4 w-4" />
            <span>Number of People</span>
          </div>
          <div className="pl-6">
            <p className="font-medium">{booking.pax} pax</p>
            {extraPax > 0 && (
              <p className="text-sm text-muted-foreground">
                +{extraPax} extra pax @ RM10 each = +RM{extraCost}
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Date & Time */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accent font-medium">
            <Calendar className="h-4 w-4" />
            <span>Date & Time</span>
          </div>
          <div className="pl-6 flex items-center gap-4">
            <p className="font-medium">
              {booking.date ? format(booking.date, "EEEE, MMMM d, yyyy") : "—"}
            </p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{booking.time || "—"}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accent font-medium">
            <User className="h-4 w-4" />
            <span>Your Details</span>
          </div>
          <div className="pl-6 space-y-2">
            <p className="font-medium">{booking.customerName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{booking.customerEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{booking.customerPhone}</span>
            </div>
          </div>
        </div>

        {booking.notes && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-accent font-medium">
                <FileText className="h-4 w-4" />
                <span>Special Requests</span>
              </div>
              <p className="pl-6 text-sm text-muted-foreground">{booking.notes}</p>
            </div>
          </>
        )}

        <Separator />

        {/* Terms & Conditions Agreement */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <span className="text-lg">✓</span>
            <p className="text-sm font-medium">
              I agree to the Terms & Conditions and grant permission for image usage
            </p>
          </div>
        </div>

        <Separator />

        {/* Total Price */}
        <div className="bg-accent/10 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-3xl font-bold text-accent">RM{totalPrice}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;