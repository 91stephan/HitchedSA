import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

const LS_KEYS = {
  PARTNERS: 'hitchedsa_partners',
  WEDDING_DATE: 'hitchedsa_wedding_date',
  FIRST_LAUNCH: 'hitchedsa_first_launch',
  GUESTS: 'hitchedsa_guests',
  BUDGET: 'hitchedsa_budget',
  BUDGET_TOTAL: 'hitchedsa_budget_total',
  CHECKLIST: 'hitchedsa_checklist',
  IDEAS: 'hitchedsa_ideas',
  VENUE_SHORTLIST: 'hitchedsa_venue_shortlist',
  SUPPLIER_SHORTLIST: 'hitchedsa_supplier_shortlist',
  VENUE_LOCATION: 'hitchedsa_venue_location',
}

function loadLS(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val !== null ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

function saveLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function AppProvider({ children }) {
  const [partners, setPartnersState] = useState(() =>
    loadLS(LS_KEYS.PARTNERS, { partner1: '', partner2: '' })
  )
  const [weddingDate, setWeddingDateState] = useState(() =>
    loadLS(LS_KEYS.WEDDING_DATE, null)
  )
  const [firstLaunchDone, setFirstLaunchDone] = useState(() =>
    loadLS(LS_KEYS.FIRST_LAUNCH, false)
  )
  const [guests, setGuestsState] = useState(() =>
    loadLS(LS_KEYS.GUESTS, [])
  )
  const [budget, setBudgetState] = useState(() =>
    loadLS(LS_KEYS.BUDGET, getDefaultBudget())
  )
  const [budgetTotal, setBudgetTotalState] = useState(() =>
    loadLS(LS_KEYS.BUDGET_TOTAL, 200000)
  )
  const [checklist, setChecklistState] = useState(() =>
    loadLS(LS_KEYS.CHECKLIST, getDefaultChecklist())
  )
  const [ideas, setIdeasState] = useState(() =>
    loadLS(LS_KEYS.IDEAS, getDefaultIdeas())
  )
  const [venueShortlist, setVenueShortlistState] = useState(() =>
    loadLS(LS_KEYS.VENUE_SHORTLIST, [])
  )
  const [supplierShortlist, setSupplierShortlistState] = useState(() =>
    loadLS(LS_KEYS.SUPPLIER_SHORTLIST, [])
  )
  const [venueLocation, setVenueLocationState] = useState(() =>
    loadLS(LS_KEYS.VENUE_LOCATION, '')
  )

  const setPartners = useCallback((val) => {
    setPartnersState(val)
    saveLS(LS_KEYS.PARTNERS, val)
  }, [])

  const setWeddingDate = useCallback((val) => {
    setWeddingDateState(val)
    saveLS(LS_KEYS.WEDDING_DATE, val)
  }, [])

  const completeFirstLaunch = useCallback((data) => {
    setPartnersState(data.partners)
    saveLS(LS_KEYS.PARTNERS, data.partners)
    if (data.weddingDate) {
      setWeddingDateState(data.weddingDate)
      saveLS(LS_KEYS.WEDDING_DATE, data.weddingDate)
    }
    setFirstLaunchDone(true)
    saveLS(LS_KEYS.FIRST_LAUNCH, true)
  }, [])

  const setGuests = useCallback((val) => {
    const next = typeof val === 'function' ? val(guests) : val
    setGuestsState(next)
    saveLS(LS_KEYS.GUESTS, next)
  }, [guests])

  const setBudget = useCallback((val) => {
    const next = typeof val === 'function' ? val(budget) : val
    setBudgetState(next)
    saveLS(LS_KEYS.BUDGET, next)
  }, [budget])

  const setBudgetTotal = useCallback((val) => {
    setBudgetTotalState(val)
    saveLS(LS_KEYS.BUDGET_TOTAL, val)
  }, [])

  const setChecklist = useCallback((val) => {
    const next = typeof val === 'function' ? val(checklist) : val
    setChecklistState(next)
    saveLS(LS_KEYS.CHECKLIST, next)
  }, [checklist])

  const setIdeas = useCallback((val) => {
    const next = typeof val === 'function' ? val(ideas) : val
    setIdeasState(next)
    saveLS(LS_KEYS.IDEAS, next)
  }, [ideas])

  const setVenueShortlist = useCallback((val) => {
    const next = typeof val === 'function' ? val(venueShortlist) : val
    setVenueShortlistState(next)
    saveLS(LS_KEYS.VENUE_SHORTLIST, next)
  }, [venueShortlist])

  const setSupplierShortlist = useCallback((val) => {
    const next = typeof val === 'function' ? val(supplierShortlist) : val
    setSupplierShortlistState(next)
    saveLS(LS_KEYS.SUPPLIER_SHORTLIST, next)
  }, [supplierShortlist])

  const setVenueLocation = useCallback((val) => {
    setVenueLocationState(val)
    saveLS(LS_KEYS.VENUE_LOCATION, val)
  }, [])

  const clearAllData = useCallback(() => {
    Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k))
    localStorage.removeItem('hitchedsa_theme')
    window.location.reload()
  }, [])

  // Derived stats
  const guestCount = guests.length
  const confirmedCount = guests.filter((g) => g.rsvp === 'confirmed').length
  const pendingCount = guests.filter((g) => g.rsvp === 'pending').length
  const declinedCount = guests.filter((g) => g.rsvp === 'declined').length

  const totalSpent = budget.reduce((sum, cat) => sum + (Number(cat.spent) || 0), 0)
  const budgetProgress = budgetTotal > 0 ? Math.min((totalSpent / budgetTotal) * 100, 100) : 0

  const checklistDone = checklist.filter((t) => t.done).length
  const checklistProgress = checklist.length > 0 ? Math.round((checklistDone / checklist.length) * 100) : 0

  return (
    <AppContext.Provider value={{
      partners, setPartners,
      weddingDate, setWeddingDate,
      firstLaunchDone, completeFirstLaunch,
      guests, setGuests,
      budget, setBudget,
      budgetTotal, setBudgetTotal,
      checklist, setChecklist,
      ideas, setIdeas,
      venueShortlist, setVenueShortlist,
      supplierShortlist, setSupplierShortlist,
      venueLocation, setVenueLocation,
      clearAllData,
      // Derived
      guestCount, confirmedCount, pendingCount, declinedCount,
      totalSpent, budgetProgress,
      checklistDone, checklistProgress, checklistTotal: checklist.length,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// ─── Default Data ──────────────────────────────────────────────────────────

function getDefaultIdeas() {
  return [
    {
      id: 'idea_sample_1',
      title: 'Romantic Garden Arch',
      description: 'A lush floral arch draped with white roses and trailing greenery — perfect for an outdoor ceremony backdrop.',
      category: 'Decor',
      colour: '#D4829A',
      imageUrl: 'https://images.unsplash.com/photo-1478145046317-8ba85df4bfb0?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'idea_sample_2',
      title: 'Cascading Bridal Bouquet',
      description: 'Elegant cascading bouquet with garden roses, peonies, eucalyptus, and trailing ribbons.',
      category: 'Flowers',
      colour: '#C8B89A',
      imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'idea_sample_3',
      title: 'Elegant Wedding Cake',
      description: 'Three-tier semi-naked cake with fresh flowers, gold leaf accents, and a touch of greenery.',
      category: 'Cake',
      colour: '#C9A84C',
      imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'idea_sample_4',
      title: 'Dreamy Reception Tables',
      description: 'Long banquet tables with candlelight, floral runners, mismatched vintage glassware, and warm fairy lights overhead.',
      category: 'Decor',
      colour: '#6B9E78',
      imageUrl: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'idea_sample_5',
      title: 'Vineyard Ceremony Setting',
      description: 'An intimate outdoor ceremony nestled between the vines with mountain views — pure Western Cape magic.',
      category: 'Venue Inspiration',
      colour: '#7A9E7E',
      imageUrl: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'idea_sample_6',
      title: 'Flowing Boho Dress',
      description: 'A soft chiffon gown with a plunging back, lace bodice, and long flowing train — effortlessly romantic.',
      category: 'Dress',
      colour: '#F2C4D0',
      imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
    },
  ]
}

function getDefaultBudget() {
  return [
    { id: 'venue', category: 'Venue', allocated: 60000, spent: 0, depositPaid: false },
    { id: 'catering', category: 'Catering', allocated: 40000, spent: 0, depositPaid: false },
    { id: 'photography', category: 'Photography & Video', allocated: 25000, spent: 0, depositPaid: false },
    { id: 'dj', category: 'DJ & Entertainment', allocated: 15000, spent: 0, depositPaid: false },
    { id: 'flowers', category: 'Flowers & Floral', allocated: 12000, spent: 0, depositPaid: false },
    { id: 'cake', category: 'Wedding Cake', allocated: 5000, spent: 0, depositPaid: false },
    { id: 'dress', category: 'Dress & Attire', allocated: 20000, spent: 0, depositPaid: false },
    { id: 'decor', category: 'Décor & Styling', allocated: 10000, spent: 0, depositPaid: false },
    { id: 'transport', category: 'Transport', allocated: 8000, spent: 0, depositPaid: false },
    { id: 'other', category: 'Other', allocated: 5000, spent: 0, depositPaid: false },
  ]
}

function getDefaultChecklist() {
  const tasks = [
    // Early Planning
    { phase: 'early', label: 'Set your wedding budget', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Decide on a rough guest list size', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Research and shortlist venues', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Book your venue', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Set your wedding date', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Choose your wedding theme and colours', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Start researching photographers', done: false, notes: '', dueDate: '' },
    { phase: 'early', label: 'Start looking at wedding dresses', done: false, notes: '', dueDate: '' },
    // Getting Serious
    { phase: 'serious', label: 'Book photographer and videographer', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Book DJ or live band', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Book florist', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Send save-the-dates', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Book makeup artist and hair stylist', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Order wedding cake or dessert table', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Book wedding transport (car hire)', done: false, notes: '', dueDate: '' },
    { phase: 'serious', label: 'Plan honeymoon', done: false, notes: '', dueDate: '' },
    // Final Stretch
    { phase: 'final', label: 'Send out formal invitations', done: false, notes: '', dueDate: '' },
    { phase: 'final', label: 'Finalise menu with caterer', done: false, notes: '', dueDate: '' },
    { phase: 'final', label: 'Arrange seating plan', done: false, notes: '', dueDate: '' },
    { phase: 'final', label: 'Confirm all supplier bookings', done: false, notes: '', dueDate: '' },
    { phase: 'final', label: 'Purchase wedding rings', done: false, notes: '', dueDate: '' },
    { phase: 'final', label: 'Final dress fitting', done: false, notes: '', dueDate: '' },
    { phase: 'final', label: 'Collect RSVPs and finalise guest list', done: false, notes: '', dueDate: '' },
    // Wedding Week
    { phase: 'week', label: 'Confirm venue setup details', done: false, notes: '', dueDate: '' },
    { phase: 'week', label: 'Deliver items to venue', done: false, notes: '', dueDate: '' },
    { phase: 'week', label: 'Prepare wedding day schedule', done: false, notes: '', dueDate: '' },
    { phase: 'week', label: 'Delegate tasks to wedding party', done: false, notes: '', dueDate: '' },
    { phase: 'week', label: 'Rehearsal dinner', done: false, notes: '', dueDate: '' },
    { phase: 'week', label: 'Prepare supplier payments / envelopes', done: false, notes: '', dueDate: '' },
  ]
  return tasks.map((t, i) => ({ ...t, id: `task_${i}` }))
}
