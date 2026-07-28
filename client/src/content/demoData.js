// Sample wedding used by the public, read-only product demo (/demo) and the
// framed homepage previews. Nothing here is persisted or tied to a user; the
// demo panels render this data statically so visitors can see the real planner
// UI before creating an account. Keep the date fixed (not computed from "now")
// so prerendered HTML and the hydrated client always match.

export const DEMO_PARTNERS = { partner1: 'Thandi', partner2: 'Sipho' }
export const DEMO_WEDDING_DATE = '2027-03-13' // fixed so the countdown is deterministic
export const DEMO_VENUE_LOCATION = 'Stellenbosch, Western Cape'
export const DEMO_BUDGET_TOTAL = 250000

export const DEMO_GUESTS = [
  { id: 'd1',  name: 'Nomsa Dlamini',    rsvp: 'confirmed', dietary: 'Vegetarian', tableId: 't1', ageGroup: 'adult', plusOne: true },
  { id: 'd2',  name: 'James Botha',      rsvp: 'confirmed', dietary: '',           tableId: 't1', ageGroup: 'adult', plusOne: false },
  { id: 'd3',  name: 'Aisha Patel',      rsvp: 'confirmed', dietary: 'Halaal',     tableId: 't2', ageGroup: 'adult', plusOne: true },
  { id: 'd4',  name: 'Pieter van Wyk',   rsvp: 'pending',   dietary: '',           tableId: '',   ageGroup: 'adult', plusOne: false },
  { id: 'd5',  name: 'Lerato Mokoena',   rsvp: 'confirmed', dietary: '',           tableId: 't2', ageGroup: 'adult', plusOne: false },
  { id: 'd6',  name: 'Sarah Nkosi',      rsvp: 'declined',  dietary: '',           tableId: '',   ageGroup: 'adult', plusOne: false },
  { id: 'd7',  name: 'David Adams',      rsvp: 'confirmed', dietary: 'No shellfish', tableId: 't3', ageGroup: 'adult', plusOne: true },
  { id: 'd8',  name: 'Zanele Khumalo',   rsvp: 'pending',   dietary: '',           tableId: '',   ageGroup: 'adult', plusOne: false },
  { id: 'd9',  name: 'Michael Fourie',   rsvp: 'confirmed', dietary: '',           tableId: 't3', ageGroup: 'adult', plusOne: false },
  { id: 'd10', name: 'Fatima Cassim',    rsvp: 'confirmed', dietary: 'Halaal',     tableId: 't1', ageGroup: 'adult', plusOne: false },
  { id: 'd11', name: 'Little Amahle',    rsvp: 'confirmed', dietary: '',           tableId: 't2', ageGroup: 'child', plusOne: false },
  { id: 'd12', name: 'Grace Sithole',    rsvp: 'pending',   dietary: 'Vegan',      tableId: '',   ageGroup: 'adult', plusOne: false },
]

export const DEMO_BUDGET = [
  { id: 'b1',  category: 'Venue',           allocated: 80000, spent: 40000, depositPaid: true },
  { id: 'b2',  category: 'Catering',        allocated: 60000, spent: 15000, depositPaid: true },
  { id: 'b3',  category: 'Photography',     allocated: 25000, spent: 25000, depositPaid: true },
  { id: 'b4',  category: 'Décor & Flowers', allocated: 20000, spent: 8000,  depositPaid: true },
  { id: 'b5',  category: 'Attire',          allocated: 18000, spent: 12000, depositPaid: false },
  { id: 'b6',  category: 'Music & DJ',      allocated: 12000, spent: 6000,  depositPaid: true },
  { id: 'b7',  category: 'Cake',            allocated: 6000,  spent: 0,     depositPaid: false },
  { id: 'b8',  category: 'Stationery',      allocated: 5000,  spent: 2500,  depositPaid: false },
  { id: 'b9',  category: 'Transport',       allocated: 8000,  spent: 0,     depositPaid: false },
  { id: 'b10', category: 'Rings',           allocated: 16000, spent: 3000,  depositPaid: false },
]

export const DEMO_CHECKLIST = [
  { phase: '12+ Months Out', items: [
    { id: 'c1', label: 'Set your budget', done: true },
    { id: 'c2', label: 'Draft your guest list', done: true },
    { id: 'c3', label: 'Book your venue', done: true },
    { id: 'c4', label: 'Book your photographer', done: true },
  ] },
  { phase: '6 Months Out', items: [
    { id: 'c5', label: 'Choose your caterer and menu', done: true },
    { id: 'c6', label: 'Order wedding attire', done: true },
    { id: 'c7', label: 'Book your DJ or band', done: false },
    { id: 'c8', label: 'Send save-the-dates', done: false },
  ] },
  { phase: '3 Months Out', items: [
    { id: 'c9',  label: 'Finalise the seating plan', done: false },
    { id: 'c10', label: 'Order the cake', done: false },
    { id: 'c11', label: 'Confirm transport', done: false },
  ] },
  { phase: 'Wedding Week', items: [
    { id: 'c12', label: 'Confirm final headcount with caterer', done: false },
    { id: 'c13', label: 'Pack for the honeymoon', done: false },
  ] },
]

export const DEMO_TABLES = [
  { id: 't1', name: 'Top Table',   capacity: 8 },
  { id: 't2', name: 'Family',      capacity: 8 },
  { id: 't3', name: 'University Friends', capacity: 10 },
]

export const DEMO_IDEAS = [
  { id: 'i1', title: 'Winelands ceremony arch', category: 'Ceremony',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=70' },
  { id: 'i2', title: 'Protea & greenery bouquet', category: 'Flowers',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=70' },
  { id: 'i3', title: 'Long table reception', category: 'Reception',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=70' },
  { id: 'i4', title: 'String lights under the stars', category: 'Décor',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=600&q=70' },
  { id: 'i5', title: 'Naked drip cake', category: 'Cake',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=70' },
  { id: 'i6', title: 'First dance golden hour', category: 'Moments',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=70' },
]

// ── Derived helpers (kept here so panels and the homepage share one source) ──
const num = (n) => `R${n.toLocaleString('en-ZA')}`
export const demoMoney = num

export const DEMO_STATS = (() => {
  const confirmed = DEMO_GUESTS.filter((g) => g.rsvp === 'confirmed').length
  const pending = DEMO_GUESTS.filter((g) => g.rsvp === 'pending').length
  const declined = DEMO_GUESTS.filter((g) => g.rsvp === 'declined').length
  const totalSpent = DEMO_BUDGET.reduce((s, c) => s + c.spent, 0)
  const allItems = DEMO_CHECKLIST.flatMap((p) => p.items)
  const checklistDone = allItems.filter((i) => i.done).length
  const checklistTotal = allItems.length
  return {
    guestCount: DEMO_GUESTS.length,
    confirmed,
    pending,
    declined,
    totalSpent,
    budgetTotal: DEMO_BUDGET_TOTAL,
    budgetProgress: Math.round((totalSpent / DEMO_BUDGET_TOTAL) * 100),
    checklistDone,
    checklistTotal,
    checklistProgress: Math.round((checklistDone / checklistTotal) * 100),
  }
})()
