# Email Setup Guide for Contact Form

The contact form is now configured to send emails to **momentousfotostudio@gmail.com** using Gmail SMTP.

## 🔧 Setup Steps

### 1. Enable 2-Step Verification on Gmail

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Find "2-Step Verification" section
3. Click "Get Started" and follow the steps to enable it

### 2. Generate Gmail App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. In the "Select app" dropdown, choose **Mail**
3. In the "Select device" dropdown, choose **Other (Custom name)**
4. Type: "Momentous Foto Website"
5. Click **Generate**
6. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### 3. Update Environment Variables

1. Open the file `frontend/.env.local`
2. Replace `your_gmail_app_password_here` with the app password you copied
3. **Remove all spaces** from the password (so `abcd efgh ijkl mnop` becomes `abcdefghijklmnop`)
4. Save the file

Example:
```env
EMAIL_USER=momentousfotostudio@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

### 4. Restart Development Server

```bash
cd frontend
npm run dev
```

## ✅ Features

### Real-time Form Validation
- ⚠️ Name: Must be at least 2 characters
- ⚠️ Email: Must be valid email format
- ⚠️ Phone: Must be at least 10 digits
- ⚠️ Service: Must select a service
- ⚠️ Venue: Must be at least 3 characters

### Email Notifications
When a customer submits the form, you'll receive an email with:
- Customer name, email, and phone number
- Service requested
- Venue/location
- Any special remarks
- Timestamp (Malaysia time zone)

### User Experience
- Immediate validation feedback
- Clear error messages
- Success confirmation
- Professional email template

## 🧪 Testing

1. Go to http://localhost:3000/contact
2. Fill out the form with test data
3. Try entering invalid data to see validation errors:
   - Short name (less than 2 chars)
   - Invalid email format
   - Short phone number
   - Missing fields
4. Submit with valid data
5. Check your Gmail inbox for the notification email

## 🔒 Security

- Honeypot field to prevent spam bots
- Server-side validation
- Environment variables for credentials
- Gmail App Password (not your main password)

## 📧 Email Template

The email notification is beautifully formatted with:
- Professional header with Momentous Foto branding
- All customer details in organized sections
- Clickable email and phone links
- Malaysia timezone timestamp
- Reply-to set to customer's email (easy to respond)

## 🚨 Troubleshooting

### "Failed to send" error
- Check that 2-Step Verification is enabled
- Verify the App Password is correct (no spaces)
- Make sure `.env.local` file exists in `frontend/` folder
- Restart the dev server after changing `.env.local`

### Not receiving emails
- Check spam/junk folder
- Verify EMAIL_USER is set to `momentousfotostudio@gmail.com`
- Test by submitting the form yourself

### Validation errors
- Validation happens in real-time as you type
- Check console for detailed error messages
- Make sure all required fields are filled

## 📝 Notes

- The form will NOT work without proper email configuration
- In production, make sure to set environment variables in your hosting platform
- Keep your App Password secret and never commit it to git
- `.env.local` is already in `.gitignore` for security
