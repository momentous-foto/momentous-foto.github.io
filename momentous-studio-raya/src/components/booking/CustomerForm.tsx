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
          required
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
          required
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
          required
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
            <p className="font-semibold">By proceeding with a booking, the client agrees to the following terms and conditions set by Momentous Studio:</p>
            
            <div>
              <h4 className="font-bold mb-2">BOOKING & TIME</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Time slots are on a FIRST-COME, FIRST-SERVE basis.</li>
                <li>A RM50 (not refundable) booking fee is required to secure your preferred date and time.</li>
                <li>Your booking is considered CONFIRMED only after payment is made.</li>
                <li>You may reschedule ONCE only with a minimum of 7 DAYS notice, subject to availability.</li>
                <li>Full payment must be settled at least 1 DAY before the session.</li>
                <li>Each session is allocated 15 MINUTES only. Please arrive at the location 10 MINUTES before your scheduled time.</li>
                <li>Please note that late arrivals will not be given extra time. Your session will still end at the scheduled time.</li>
                <li>If you miss your allocated time slot due to late arrival and wish to book a new slot, it will be treated as a new booking and will require full payment. Previous payments are strictly non-transferable.</li>
                <li>NO REFUND for no-shows and cancellation. Please make a new booking for another session.</li>
                <li>NO WALK-INS allowed. All sessions are strictly by appointment only.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">DELIVERABLES</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>All digital soft copies will be provided on the 1-2 working days.</li>
                <li>Customer will select 10 edited photos. Requests for ADDITIONAL edited photos are RM5/photo.</li>
                <li>Edited photos will be delivered within 7 working days after the customer has confirmed their selected images.</li>
                <li>The Google Drive link is only valid for 7 DAYS.</li>
                <li>Momentous Foto Studio may request your consent to use the photos for marketing purposes, including uploading them to social media. No photos will be used without your explicit approval.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">SPACE & SETUP</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The photoshoot will be conducted at an outdoor public park.</li>
                <li>In the event of rain or severe weather conditions that prevent the session from proceeding, customers may choose to:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Receive a FULL REFUND, OR</li>
                    <li>Reschedule to another available date based on Momentous Studio's availability.</li>
                  </ul>
                </li>
                <li>Set design, props, and layout prepared by Momentous Studio are FIXED.</li>
                <li>Customers are NOT ALLOWED to move, rearrange, or remove any props, furniture, or equipment without permission from the studio team.</li>
                <li>Any damage to studio equipment caused by misuse or negligence will be charged accordingly.</li>
                <li>Outside props or decorations are NOT ALLOWED unless prior approval is obtained from Momentous Studio.</li>
                <li>Customers are responsible for their own personal belongings during the session.</li>
                <li>Please respect the public space and maintain cleanliness at all times.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-bold mb-2">IMAGE USAGE CONSENT AND AUTHORISATION</h4>
              <p className="mb-2">I hereby authorise Momentous Studio to use, reproduce, publish, and display any photographs and/or videos captured during my photography session for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Marketing, advertising, and promotional materials (including but not limited to the official website, social media platforms, and printed media)</li>
                <li>Inclusion in the professional portfolio of Momentous Studio</li>
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
              required
            />
            <label
              htmlFor="imageConsent"
              className="text-sm font-medium leading-relaxed cursor-pointer"
            >
              I hereby grant full and unrestricted permission to Momentous Foto to use my images and/or videos for the purposes stated above, and I agree to all terms and conditions. *
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