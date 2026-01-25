# 🔐 Secure Google Sheets Setup (Privacy Considerations)

## ⚠️ IMPORTANT: Privacy & Security

The Google Sheets CSV method makes data **PUBLIC** (read-only). Anyone with the URL can see customer names and details.

---

## Options Based on Your Privacy Needs

### Option 1: Keep Data Minimal (Recommended for Simple Setup)

**Don't put sensitive info in the sheet!**

Instead of:
| Date | Time | Status | Customer Name | Notes |
|------|------|--------|---------------|-------|
| 2026-03-08 | 11:00AM - 11:20AM | booked | Ahmad bin Abdullah | paid RM99, phone: 0123456789 |

Use initials only:
| Date | Time | Status | Initials | Notes |
|------|------|--------|----------|-------|
| 2026-03-08 | 11:00AM - 11:20AM | booked | A.B. | ✓ |
| 2026-03-14 | 10:00AM - 10:20AM | pending | S.N. | - |

**Pros:**
- Simple to set up
- No sensitive data exposed
- You remember who "A.B." is from your WhatsApp chats

**Cons:**
- Less detailed tracking
- Have to check WhatsApp for full details

---

### Option 2: Use Environment Variable (RECOMMENDED)

**Problem with GitHub Pages:**
- `.env` files are ignored in git (good for security)
- BUT GitHub Pages is static - can't read `.env` at runtime
- The URL will be visible in built JavaScript anyway

**Solution - Vite Environment Variables:**

1. Create `.env` file (add to `.gitignore`):
```
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/e/2PACX-...
```

2. Update `src/utils/bookingData.ts`:
```typescript
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || "";
```

3. For local development:
   - Works automatically (reads from .env)

4. For GitHub Pages deployment:
   - Set GitHub Actions secret
   - OR add to build command

**BUT REMEMBER:** The URL is still visible in the built JavaScript (Network tab in browser). This just keeps it out of your source code.

---

### Option 3: Keep Using Manual Code Updates (MOST SECURE)

**Go back to the simple manual system:**
- Edit `src/data/packages.ts` directly
- No external data source
- No public URLs
- Customer data never leaves your code
- More work but 100% secure

To keep using manual mode:
1. Don't set up Google Sheets
2. Just use `pendingSlots` and `bookedSlots` arrays
3. Update and deploy after each booking

---

### Option 4: Google Apps Script Proxy (More Complex)

Create a password-protected API using Google Apps Script.

**Setup:**
1. Create Google Apps Script
2. Add password authentication
3. Only your site with correct password can fetch data

This is more complex but more secure. Let me know if you want me to set this up.

---

## My Recommendation

**For a small Raya business:**

Use **Option 1 + Option 2 combined**:
1. ✅ Use Google Sheets (easier to manage)
2. ✅ Only put minimal data (initials, status)
3. ✅ Use .env for the URL (keeps it out of GitHub)
4. ✅ Keep detailed customer info in private WhatsApp chats or separate private sheet

**Google Sheet example:**
```
Date        | Time            | Status  | Init | Pkg
2026-03-08  | 11:00AM-11:20AM | booked  | A.B. | Slay
2026-03-14  | 10:00AM-10:20AM | pending | S.N. | Basic
```

Keep customer full details (name, phone, email) in:
- Your WhatsApp chats
- A SEPARATE private Google Sheet (not published)
- Your phone notes

---

## Reality Check 🤔

**Important:** Even with .env, determined people can find the URL because:
- It's in the browser network requests
- JavaScript is client-side (not server-side)
- Anyone can inspect your site's code

**For TRUE security, you need a backend server** (Firebase, Supabase, etc.)

But for a small seasonal Raya business? **Minimal data in public sheet is fine.** Most people won't bother trying to find it.

---

## What Do You Want?

1. **Simple & Quick** → Use Google Sheets with minimal data (initials only)
2. **More Secure** → Stick with manual code updates
3. **Professional** → I can set up proper backend (Firebase/Supabase)

Which approach fits your needs?
