# 📋 Simple Booking Management Guide

## How It Works

Your booking system is **super simple** - no database, no admin panel needed!

### Flow:
1. **Customer books** → Selects date/time → Sends WhatsApp to you
2. **You add to PENDING** → Wait for payment
3. **Customer pays** → Move to BOOKED (sold out)
4. **If no payment** → Remove from pending

---

## Two Status Types

### 🟠 PENDING (Orange)
- Customer booked but **hasn't paid yet**
- Shows as **orange/yellow** with "PENDING" label
- Customers can see it's reserved
- You can still override if someone else pays first

### ⚫ SOLD OUT (Grey)
- Customer **already paid**
- Shows as **grey** with "SOLD OUT" label
- Cannot be selected
- Fully confirmed booking

---

## How to Manage Bookings

### Step 1: Open the file
Go to: `src/data/packages.ts`

### Step 2: When customer books (NOT PAID YET)
Add to `pendingSlots` array:

```typescript
export const pendingSlots = [
  "2026-03-14|11:00AM - 11:20AM|Ahmad (paying tonight)",
  "2026-03-08|9:00AM - 9:20AM|Siti (deadline: 25 Jan)",
];
```

**Format:** `"YYYY-MM-DD|TIME|CustomerName (note)"`

### Step 3: When payment is confirmed
**Move** from `pendingSlots` to `bookedSlots`:

```typescript
export const pendingSlots = [
  // Remove the paid booking from here
];

export const bookedSlots = [
  "2026-03-14|11:00AM - 11:20AM|Ahmad (paid)",
];
```

### Step 4: If payment not received
Just **delete** the line from `pendingSlots`

---

## Real-Life Scenario: Your Problem Solved! 💡

**Situation:**
- Ahmad books 2026-03-14 at 11:00AM (paying tonight)
- You forget and Siti wants same slot (already paid)

**Solution:**

1. **When Ahmad books (not paid):**
```typescript
export const pendingSlots = [
  "2026-03-14|11:00AM - 11:20AM|Ahmad (paying tonight)",
];
```
→ Slot shows as **ORANGE/PENDING**

2. **When Siti wants to book:**
- You see it's PENDING (not fully booked!)
- You check: "Oh Ahmad hasn't paid yet"
- Decision time:
  - Wait for Ahmad's payment
  - OR give priority to Siti (who's ready to pay now)

3. **If you give to Siti:**
```typescript
export const pendingSlots = [
  // Remove Ahmad's pending
];

export const bookedSlots = [
  "2026-03-14|11:00AM - 11:20AM|Siti (paid)",
];
```
→ Slot now shows as **GREY/SOLD OUT**

---

## Quick Reference

### Example: Multiple bookings at different stages

```typescript
export const pendingSlots = [
  "2026-03-14|11:00AM - 11:20AM|Ahmad (deadline: today 8pm)",
  "2026-03-15|9:00AM - 9:20AM|Fatimah (waiting bank transfer)",
  "2026-02-21|12:00PM - 12:20PM|Amir (paying tomorrow)",
];

export const bookedSlots = [
  "2026-03-08|11:00AM - 11:20AM|Siti (paid)",
  "2026-03-08|9:00AM - 9:20AM|Nurul (paid)",
  "2026-03-15|12:00PM - 12:20PM|Hassan (paid)",
];
```

### Visual on Booking Page:
- **Green/White** = Available for booking
- **🟠 Orange + "PENDING"** = Booked but not paid (you can still override)
- **⚫ Grey + "SOLD OUT"** = Fully booked and paid (locked)

---

## Tips

✅ **Do:**
- Add customer name and notes (e.g., "paying tonight", "deadline: 25 Jan")
- Set payment deadlines for pending bookings
- Check `pendingSlots` regularly
- Remove expired pending bookings

❌ **Don't:**
- Leave pending bookings forever
- Forget to move paid bookings from pending to booked
- Accept double bookings without checking pending first

---

## Payment Deadline Workflow

**⚠️ IMPORTANT: Nothing is automatic! YOU must manually update!**

**Recommended workflow:** Give customers 24-48 hours for payment, but YOU need to check and update manually.

```typescript
// Day 1: Customer books (YOU add to pending)
export const pendingSlots = [
  "2026-03-14|11:00AM - 11:20AM|Ahmad (deadline: 25 Jan 8pm)",
];

// Day 2 (after deadline):
// - If Ahmad paid → YOU manually move to bookedSlots
// - If Ahmad didn't pay → YOU manually delete from pendingSlots
```

**No automatic deletion!** You have to:
1. Check your notes/reminders yourself
2. Follow up with customer on WhatsApp
3. Manually update the file based on payment status

---

That's it! Now you can handle booking conflicts properly! 🎉
