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
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    venue: '',
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change for immediate feedback
    if (name !== 'remarks' && name !== 'honeypot') {
      validateField(name, value);
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
    const whatsappMessage = `*New Inquiry from Momentous Foto Website*

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
      });
      setErrors({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        venue: '',
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
                disabled={status === 'submitting'}
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
