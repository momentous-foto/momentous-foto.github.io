# ✅ Your Google Sheets Booking System - ACTIVE!

## 🎉 Already Set Up!

Your Google Sheet is connected: 
https://docs.google.com/spreadsheets/d/e/2PACX-1vTJtKrZzWtmUVGZFzDTR6AGCQ2HxgGRxzjEV1IRTQpklzF2VTGezoeL1Ptg4K67P9IIH7yOUPKfK-h0/pub?output=csv

---

## How to Use

### Your Google Sheet Format:

| Date | Time | Status |
|------|------|--------|
| 21-2-2026 | 09:00AM - 09:20AM | |
| 21-2-2026 | 09:30AM - 09:50AM | pending |
| 21-2-2026 | 10:00AM - 10:20AM | booked |

**Columns:**
1. **Date**: DD-M-YYYY format (e.g., 21-2-2026, 8-3-2026)
2. **Time**: Exact time slot (e.g., "09:00AM - 09:20AM")
3. **Status**: Leave empty, or type `pending` or `booked`

---

## When to Update

### Customer books but NOT paid yet:
1. Open your Google Sheet
2. Find the date and time row
3. Type `pending` in the Status column
4. Save (auto-saves)

**Result:** Website shows **ORANGE + "PENDING"**

### Customer pays:
1. Find the row
2. Change Status from `pending` to `booked`
3. Save

**Result:** Website shows **GREY + "SOLD OUT"**

### Customer cancels / doesn't pay:
1. Find the row
2. Delete the word in Status column (leave it empty)
3. Save

**Result:** Website shows as **available** again

---

## Examples

### Scenario 1: New booking (not paid)
```
Date        | Time              | Status
8-3-2026    | 11:00AM - 11:20AM | pending
```
→ Shows ORANGE on website

### Scenario 2: Payment received
```
Date        | Time              | Status
8-3-2026    | 11:00AM - 11:20AM | booked
```
→ Shows GREY (SOLD OUT) on website

### Scenario 3: Multiple bookings
```
Date        | Time              | Status
21-2-2026   | 09:00AM - 09:20AM | booked
21-2-2026   | 10:00AM - 10:20AM | pending
21-2-2026   | 11:00AM - 11:20AM | 
8-3-2026    | 11:00AM - 11:20AM | booked
```

---

## Important Notes

✅ **Status words:** Only use `pending` or `booked` (lowercase is fine)
✅ **Date format:** Keep DD-M-YYYY (like 21-2-2026, 8-3-2026)
✅ **Time format:** Use exact format from time slots (09:00AM - 09:20AM)
✅ **Empty = Available:** If Status is empty, slot shows as available
✅ **Auto-refresh:** Changes appear on website within 5 minutes (cache)

---

## Privacy

✅ No customer names in this sheet
✅ No phone numbers
✅ No emails
✅ Just date, time, and status

Keep customer details in:
- Your WhatsApp chats
- A separate PRIVATE Google Sheet (not published)
- Your phone notes

---

## Testing

1. Add `pending` to one slot in your sheet
2. Save and wait 1 minute
3. Go to booking page and select that date
4. You should see ORANGE "PENDING" for that time slot!

---

## Troubleshooting

**If it's not working:**
1. Make sure sheet is published as CSV (File → Share → Publish to web → CSV)
2. Check Status column spelling (pending/booked, no capitals needed)
3. Date format must be DD-M-YYYY
4. Wait 5 minutes for cache to refresh
5. Hard refresh your browser (Ctrl + Shift + R)

---

That's it! Super simple booking management! 🚀
