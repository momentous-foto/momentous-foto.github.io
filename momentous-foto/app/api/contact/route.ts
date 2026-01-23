import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, venue, remarks, honeypot } = body;

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // Validate required fields
    if (!name || !email || !phone || !service || !venue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Create email transporter
    // Using Gmail SMTP - you'll need to set up App Password in Gmail settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'momentousfotostudio@gmail.com',
        pass: process.env.EMAIL_PASSWORD, // Gmail App Password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'momentousfotostudio@gmail.com',
      to: 'momentousfotostudio@gmail.com',
      replyTo: email,
      subject: `New Booking Inquiry - ${service} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1A1A1A; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1A1A1A; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #6B6B6B; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📷 New Booking Inquiry</h1>
              <p>Momentous Foto Studio</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">📱 Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>

              <div class="field">
                <div class="label">📸 Service:</div>
                <div class="value">${service}</div>
              </div>

              <div class="field">
                <div class="label">📍 Venue / Location:</div>
                <div class="value">${venue}</div>
              </div>

              ${remarks ? `
              <div class="field">
                <div class="label">💬 Remarks:</div>
                <div class="value">${remarks}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">🕐 Received:</div>
                <div class="value">${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}</div>
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was submitted through the Momentous Foto website contact form.</p>
              <p>Reply directly to this email to respond to the customer.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log for record keeping
    console.log('Contact form submission sent to email:', {
      name,
      email,
      phone,
      service,
      venue,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been sent successfully!',
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({
      error: 'Failed to send inquiry. Please try again or contact us directly.',
    }, { status: 500 });
  }
}
