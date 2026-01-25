# 📊 Google Sheets Booking System Setup

## ✨ Much Better! Update bookings in Google Sheets instead of code!

---

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: "Momentous Raya Bookings" (or whatever you want)

### Set up the columns:

| Date | Time | Status | Customer Name | Notes |
|------|------|--------|---------------|-------|
| 2026-03-08 | 11:00AM - 11:20AM | pending | Ahmad | paying tonight |
| 2026-03-08 | 9:00AM - 9:20AM | booked | Siti | paid RM99 |
| 2026-03-14 | 12:00PM - 12:20PM | booked | Nurul | paid RM69 |

**Column Details:**
- **Date**: Format `YYYY-MM-DD` (e.g., 2026-03-08)
- **Time**: Exact time slot (e.g., "11:00AM - 11:20AM")
- **Status**: `available`, `pending`, or `booked`
- **Customer Name**: (Optional) Who booked it
- **Notes**: (Optional) Any notes (payment status, deadline, etc.)

---

## Step 2: Publish Your Sheet as CSV

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. Choose:
   - **Link**: Select the specific sheet (Sheet1)
   - **Format**: Choose **Comma-separated values (.csv)**
3. Click **Publish**
4. Copy the URL that appears (looks like: `https://docs.google.com/spreadsheets/d/e/2PACX-...`)

---

## Step 3: Add the URL to Your Code

1. Open: `src/utils/bookingData.ts`
2. Find this line:
```typescript
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_SHEET_CSV_URL";
```
3. Replace with your published CSV URL:
```typescript
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS...";
```
4. Save the file

---

## Step 4: How to Use

### When customer books (not paid):
Add a new row in Google Sheets:

| Date | Time | Status | Customer Name | Notes |
|------|------|--------|---------------|-------|
| 2026-03-15 | 10:00AM - 10:20AM | **pending** | Ahmad | deadline: 25 Jan 8pm |

→ Website will show **ORANGE/PENDING**

### When payment confirmed:
Change the status in that row:

| Date | Time | Status | Customer Name | Notes |
|------|------|--------|---------------|-------|
| 2026-03-15 | 10:00AM - 10:20AM | **booked** | Ahmad | paid RM99 |

→ Website will show **GREY/SOLD OUT**

### If payment not received:
Delete the row or change status to `available`

---

## Step 5: Testing

1. Add a test booking in your sheet
2. Wait a few seconds (the system caches for 5 minutes)
3. Refresh your booking page
4. The slot should show the correct status!

---

## 🎯 Benefits

✅ **No code editing** - Just update Google Sheets
✅ **Easy to manage** - Spreadsheet is familiar
✅ **Track everything** - See all bookings in one place
✅ **Mobile friendly** - Update from phone using Google Sheets app
✅ **No deployment** - Changes reflect automatically (after cache refresh)

---

## ⚙️ Technical Details

- **Cache**: Data is cached for 5 minutes to reduce requests
- **Fallback**: If Google Sheets fails, it uses the old hardcoded arrays
- **Auto-refresh**: Customer's browser fetches latest data when they visit

---

## 💡 Tips

1. **Sort by date** in your sheet to keep organized
2. **Use filters** to see only pending or booked slots
3. **Add more columns** if you want (e.g., Package Type, Payment Method)
4. **Keep the first 5 columns** as specified for the system to work
5. **Backup regularly** - Make a copy of your sheet periodically

---

## 🔄 Switching Between Systems

You can use BOTH methods:
- **Google Sheets**: For automatic updates (recommended)
- **Code arrays**: For manual control (backup)

The system checks Google Sheets first, then falls back to the code arrays.

---

## Example Google Sheet Structure

Here's a template you can copy:

```
Date          | Time              | Status  | Customer Name | Notes
2026-02-21    | 9:00AM - 9:20AM   | booked  | Siti         | paid RM99
2026-02-21    | 10:00AM - 10:20AM | pending | Ahmad        | paying tonight
2026-03-08    | 11:00AM - 11:20AM | booked  | Nurul        | paid RM69
2026-03-08    | 12:00PM - 12:20PM | pending | Fatimah      | deadline: 25 Jan
```

---

That's it! Now you can manage bookings from Google Sheets! 🎉

Need help? Just ask!
