import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CustomerFormProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  imageConsent: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onImageConsentChange: (value: boolean) => void;
  errors?: {
    name?: string;
    email?: string;
    phone?: string;
    consent?: string;
  };
}

const CustomerForm = ({
  customerName,
  customerEmail,
  customerPhone,
  notes,
  imageConsent,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onNotesChange,
  onImageConsentChange,
  errors = {},
}: CustomerFormProps) => {
  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={customerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+60 10-XXX XXXX"
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Special Requests (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any special requests or notes for your session..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={4}
        />
      </div>

      {/* Terms & Conditions */}
      <div className="space-y-4 mt-8 pt-8 border-t border-border">
        <h3 className="text-lg font-bold text-foreground">Terms & Conditions</h3>
        <ScrollArea className="h-[300px] w-full rounded-md border border-border p-4 bg-secondary/30">
          <div className="space-y-4 text-sm">
            <p className="font-semibold">By proceeding with a booking, the client agrees to the following terms and conditions set by Momentous Foto:</p>
            
            <div>
              <h4 className="font-bold mb-2">1. Booking & Reservation</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>A non-refundable booking fee of RM50 is required to secure the photography session date.</li>
                <li>The booking fee will be deducted from the total package price.</li>
                <li>No booking will be confirmed until the booking fee has been received.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">2. Payment</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full payment must be made 2 days before the photography session begins.</li>
                <li>Momentous Foto reserves the right to withhold services or deliverables if full payment is not received in accordance with the agreed payment terms.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">3. Cancellation Policy</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The RM50 booking fee is strictly non-refundable under all circumstances.</li>
                <li>The client may cancel the event by providing written notice at least 7 days before the scheduled event date.</li>
                <li>If full payment has already been made, all payments excluding the RM50 booking fee will be refunded.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">4. Rescheduling & Changes</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any change of date, time, or location must be informed at least 7 days prior to the event date.</li>
                <li>Changes requested less than 7 days before the event are subject to availability and may incur additional charges.</li>
                <li>Momentous Foto reserves the right to decline last-minute changes.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">5. Location & Transportation Fees</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Events held outside of Kuala Lumpur (KL) will incur additional transportation charges, including fuel, toll (Touch 'n Go), and other related travel expenses, calculated based on the distance to the event location.</li>
                <li>For outstation events that require overnight stay, accommodation costs (hotel or equivalent lodging) will be borne by the client.</li>
                <li>All transportation, toll, and accommodation charges will be communicated and agreed upon prior to the event date.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">6. Event Delays & Client Responsibility</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Momentous Foto is not responsible for missed shots or reduced coverage due to delays caused by the client, guests, or unforeseen circumstances during the event.</li>
                <li>The client is responsible for ensuring access, permissions, and cooperation at the event location.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">7. Force Majeure</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Momentous Foto shall not be held liable for failure to perform services due to circumstances beyond reasonable control, including but not limited to natural disasters, accidents, illness, or government restrictions.</li>
                <li>In such cases, rescheduling will be discussed subject to availability.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">8. Punctuality & Shooting Time</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The client is required to arrive on time at the agreed location.</li>
                <li>The photography session will commence and conclude based on the booked time, regardless of the client's arrival time.</li>
                <li>Any delay caused by the client will not extend the session duration, and the session will still end at the originally scheduled time.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">9. Overtime Charges</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>If the client wishes to extend the photography session beyond the agreed time, this will be subject to photographer availability.</li>
                <li>Overtime charges are RM200 per hour, calculated on an hourly basis.</li>
                <li>Overtime payment must be made immediately or as agreed before the additional time begins.</li>
                <li>Momentous Foto reserves the right to decline overtime requests if prior commitments exist.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">10. Photographer Unavailability (Illness/Emergency)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>If the photographer is unable to perform due to illness or emergency, Momentous Foto will notify the client as soon as possible, at least 48 hours before the scheduled shoot in cases of illness.</li>
                <li>Momentous Foto may offer a rescheduled session or a replacement photographer (subject to availability and client approval).</li>
                <li>If neither is possible, all payments made (including the non-refundable RM50 booking fee) will be refunded.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">11. Photo Selection, Editing & Delivery Timeline</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The client is required to select and confirm the photos for editing before the editing process begins.</li>
                <li>The editing timeline will only commence after the final photo selection is received by Momentous Foto.</li>
                <li>Estimated editing and delivery time for events with a duration of 2–3 hours is 2 to 3 weeks after photo selection confirmation.</li>
                <li>For larger-scale events such as weddings, the estimated editing and delivery time is between 1 to 6 months.</li>
                <li>Delivery timelines may vary during peak seasons or due to unforeseen circumstances, clients will be informed accordingly.</li>
                <li>Clients who require faster editing turnaround may opt for an Express Editing Add-On at an additional charge of RM300, subject to availability.</li>
                <li>Express editing timelines will be discussed and agreed upon prior to commencement.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-bold mb-2">IMAGE USAGE CONSENT AND AUTHORISATION</h4>
              <p className="mb-2">I hereby authorise Momentous Foto to use, reproduce, publish, and display any photographs and/or videos captured during my photography session for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Marketing, advertising, and promotional materials (including but not limited to the official website, social media platforms, and printed media)</li>
                <li>Inclusion in the professional portfolio of Momentous Foto</li>
              </ul>
              <p>I acknowledge and agree that the images and/or videos may be used without further notification or compensation, and that all usage will be conducted in a professional, respectful, and ethical manner.</p>
            </div>
          </div>
        </ScrollArea>

        {/* Consent Checkbox */}
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-border bg-background">
            <Checkbox 
              id="imageConsent" 
              checked={imageConsent}
              onCheckedChange={onImageConsentChange}
              className="mt-1"
            />
            <label
              htmlFor="imageConsent"
              className="text-sm font-medium leading-relaxed cursor-pointer"
            >
              I hereby grant full and unrestricted permission to Momentous Foto to use my images and/or videos for the purposes stated above, and I agree to all terms and conditions.
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive font-medium">{errors.consent}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;