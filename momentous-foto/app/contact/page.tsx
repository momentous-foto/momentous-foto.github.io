'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    venue: '',
    remarks: '',
    honeypot: '',
    imageConsent: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    venue: '',
    consent: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const services = [
    'Second Shooter',
    'Pre / Post Wedding',
    'Maternity',
    'Convocation',
    'Event',
  ];

  // Real-time validation
  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name':
        if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(value)) {
          error = 'Please enter a valid phone number (at least 10 digits)';
        }
        break;
      case 'service':
        if (!value) {
          error = 'Please select a service';
        }
        break;
      case 'date':
        if (!value) {
          error = 'Please select a date';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            error = 'Please select a future date';
          }
        }
        break;
      case 'venue':
        if (value.trim().length < 3) {
          error = 'Venue must be at least 3 characters';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

    // Validate on change for immediate feedback
    if (name !== 'remarks' && name !== 'honeypot') {
      if (name === 'imageConsent') {
        setErrors(prev => ({ ...prev, consent: '' }));
      } else {
        validateField(name, value);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name !== 'remarks' && name !== 'honeypot') {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    // Validate all fields before submit
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isPhoneValid = validateField('phone', formData.phone);
    const isServiceValid = validateField('service', formData.service);
    const isDateValid = validateField('date', formData.date);
    const isVenueValid = validateField('venue', formData.venue);

    // Validate consent
    if (!formData.imageConsent) {
      setErrors(prev => ({ ...prev, consent: 'You must agree to the terms and conditions to proceed' }));
      setStatus('error');
      setMessage('Please fix the errors before submitting');
      return;
    }

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isDateValid || !isVenueValid) {
      setStatus('error');
      setMessage('Please fix the errors before submitting');
      return;
    }

    // Format date to readable format
    const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    // Build WhatsApp message
    const whatsappMessage = `*New Inqui

---
✓ Customer has agreed to Terms & Conditions
✓ Customer has granted image usage consentry from Momentous Foto Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone Number:* ${formData.phone}
*Service:* ${formData.service}
*Event Date:* ${formattedDate}
*Venue/Location:* ${formData.venue}
*Remarks:* ${formData.remarks || 'N/A'}`;

    // WhatsApp number (Malaysian format: remove leading 0, add 60)
    const whatsappNumber = '60104471403';
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear form after sending
    setStatus('success');
    setMessage('Redirecting to WhatsApp... Please send the message to complete your inquiry.');
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        venue: '',
        remarks: '',
        honeypot: '',
        imageConsent: false,
      });
      setErrors({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        venue: '',
        consent: '',
      });
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[25vh] flex items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">Set the date with Momentous Foto now</h1>
          <p className="text-base md:text-lg text-[#6B6B6B]">
            Let&apos;s capture your precious moments together
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          {/* Coming Soon Notice */}
          <div className="mb-8 p-4 bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-lg text-center">
            <p className="text-[#CACACA] text-sm">
              💡 <span className="font-semibold">Online Booking System</span> coming soon! For now, reach us via WhatsApp.
            </p>
          </div>

          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-[#CACACA] font-medium">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">⚠️ {errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-[#CACACA] font-medium">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">⚠️ {errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-[#CACACA] font-medium">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="e.g., 012-345-6789"
                  className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">⚠️ {errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="block text-[#CACACA] font-medium">Service *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full ${errors.service ? 'border-red-500' : ''}`}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-400 text-sm mt-1">⚠️ {errors.service}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block text-[#CACACA] font-medium">Event Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full ${errors.date ? 'border-red-500' : ''}`}
                />
                {errors.date && (
                  <p className="text-red-400 text-sm mt-1">⚠️ {errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="venue" className="block text-[#CACACA] font-medium">Venue / Location *</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="e.g., Pasar Seni, Kuala Lumpur"
                  className={`w-full ${errors.venue ? 'border-red-500' : ''}`}
                />
                {errors.venue && (
                  <p className="text-red-400 text-sm mt-1">⚠️ {errors.venue}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="remarks" className="block text-[#CACACA] font-medium">Remarks (Optional)</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Any special requests or additional information..."
                  className="w-full"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-4 mt-8 pt-8 border-t border-[#3A3A3A]">
                <h3 className="text-lg font-bold text-[#CACACA]">Terms & Conditions</h3>
                <div className="h-[300px] overflow-y-auto rounded-md border border-[#3A3A3A] p-4 bg-[#1A1A1A]">
                  <div className="space-y-4 text-sm text-[#CACACA]">
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

                    <div className="pt-4 border-t border-[#3A3A3A]">
                      <h4 className="font-bold mb-2">IMAGE USAGE CONSENT AND AUTHORISATION</h4>
                      <p className="mb-2">I hereby authorise Momentous Foto to use, reproduce, publish, and display any photographs and/or videos captured during my photography session for the following purposes:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Marketing, advertising, and promotional materials (including but not limited to the official website, social media platforms, and printed media)</li>
                        <li>Inclusion in the professional portfolio of Momentous Foto</li>
                      </ul>
                      <p>I acknowledge and agree that the images and/or videos may be used without further notification or compensation, and that all usage will be conducted in a professional, respectful, and ethical manner.</p>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-[#3A3A3A] bg-[#0F0F0F]">
                    <input 
                      type="checkbox"
                      id="imageConsent" 
                      name="imageConsent"
                      checked={formData.imageConsent}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label
                      htmlFor="imageConsent"
                      className="text-sm font-medium leading-relaxed cursor-pointer text-[#CACACA]"
                    >
                      I hereby grant full and unrestricted permission to Momentous Foto to use my images and/or videos for the purposes stated above, and I agree to all terms and conditions.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-red-400 text-sm font-medium">⚠️ {errors.consent}</p>
                  )}
                </div>
              </div>

              {/* rows={5}
                  placeholder="Any special requests or additional information..."
                  className="w-full"
                />
              </div>

              {/* Honeypot field - hidden from users */}
              <div className="absolute -left-[9999px]">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6B6B6B] hover:bg-[#8B8B8B] text-white font-semibold py-3 px-6 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'submitting' || !formData.imageConsent}
              >
                Send Inquiry via WhatsApp
              </button>

              {status === 'success' && (
                <div className="bg-green-900/30 border border-green-700 text-green-200 px-4 py-3 rounded">
                  ✅ {message}
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded">
                  ❌ {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
