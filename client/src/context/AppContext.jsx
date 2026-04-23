import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const AppContext = createContext(null)

// ─── Supabase sync helpers ──────────────────────────────────────────────────

async function syncTable(table, userId, rows) {
  await supabase.from(table).delete().eq('user_id', userId)
  if (rows.length > 0) await supabase.from(table).insert(rows)
}

// ─── Row mappers ────────────────────────────────────────────────────────────

const guestToDb = (g, userId) => ({
  id:         g.id,
  user_id:    userId,
  name:       g.name       || '',
  email:      g.email      || '',
  phone:      g.phone      || '',
  rsvp:       g.rsvp       || 'pending',
  dietary:    g.dietary    || '',
  table_id:   g.tableId    || '',
  plus_one:   g.plusOne    || false,
  created_at: g.createdAt  || new Date().toISOString(),
})

const guestFromDb = (r) => ({
  id:        r.id,
  name:      r.name,
  email:     r.email,
  phone:     r.phone,
  rsvp:      r.rsvp,
  dietary:   r.dietary,
  tableId:   r.table_id,
  plusOne:   r.plus_one,
  createdAt: r.created_at,
})

const budgetToDb = (b, userId) => ({
  id:           b.id,
  user_id:      userId,
  category:     b.category,
  allocated:    b.allocated    || 0,
  spent:        b.spent        || 0,
  deposit_paid: b.depositPaid  || false,
})

const budgetFromDb = (r) => ({
  id:          r.id,
  category:    r.category,
  allocated:   r.allocated,
  spent:       r.spent,
  depositPaid: r.deposit_paid,
})

const checklistToDb = (c, userId, idx) => ({
  id:         c.id,
  user_id:    userId,
  phase:      c.phase      || '',
  label:      c.label      || '',
  done:       c.done       || false,
  notes:      c.notes      || '',
  due_date:   c.dueDate    || '',
  sort_order: idx,
})

const checklistFromDb = (r) => ({
  id:      r.id,
  phase:   r.phase,
  label:   r.label,
  done:    r.done,
  notes:   r.notes,
  dueDate: r.due_date,
})

const ideaToDb = (i, userId) => ({
  id:          i.id,
  user_id:     userId,
  title:       i.title       || '',
  description: i.description || '',
  category:    i.category    || 'General',
  colour:      i.colour      || '',
  image_url:   i.imageUrl    || '',
  thumb_url:   i.thumbUrl    || '',
  source:      i.source      || '',
  note:        i.note        || '',
  created_at:  i.createdAt   || new Date().toISOString(),
})

const ideaFromDb = (r) => ({
  id:          r.id,
  title:       r.title,
  description: r.description,
  category:    r.category,
  colour:      r.colour,
  imageUrl:    r.image_url,
  thumbUrl:    r.thumb_url,
  source:      r.source,
  note:        r.note,
  createdAt:   r.created_at,
})

// ─── Provider ────────────────────────────────────────────────────────────────

export function AppProvider({ children }) {
  const { user } = useAuth()

  const [appLoading, setAppLoading] = useState(true)

  const [partners,         setPartnersState]        = useState({ partner1: '', partner2: '' })
  const [weddingDate,      setWeddingDateState]      = useState(null)
  const [firstLaunchDone,  setFirstLaunchDone]       = useState(false)
  const [guests,           setGuestsState]           = useState([])
  const [budget,           setBudgetState]           = useState(getDefaultBudget())
  const [budgetTotal,      setBudgetTotalState]      = useState(200000)
  const [checklist,        setChecklistState]        = useState(getDefaultChecklist())
  const [ideas,            setIdeasState]            = useState([])
  const [venueShortlist,   setVenueShortlistState]   = useState([])
  const [supplierShortlist,setSupplierShortlistState]= useState([])
  const [venueLocation,    setVenueLocationState]    = useState('')

  // Refs so callbacks always have latest values without being recreated
  const guestsRef           = useRef([])
  const budgetRef           = useRef(getDefaultBudget())
  const checklistRef        = useRef(getDefaultChecklist())
  const ideasRef            = useRef([])
  const venueShortlistRef   = useRef([])
  const supplierShortlistRef= useRef([])

  useEffect(() => { guestsRef.current            = guests           }, [guests])
  useEffect(() => { budgetRef.current             = budget            }, [budget])
  useEffect(() => { checklistRef.current          = checklist         }, [checklist])
  useEffect(() => { ideasRef.current              = ideas             }, [ideas])
  useEffect(() => { venueShortlistRef.current     = venueShortlist    }, [venueShortlist])
  useEffect(() => { supplierShortlistRef.current  = supplierShortlist }, [supplierShortlist])

  // ── Load all data when user changes ──────────────────────────────────────

  useEffect(() => {
    if (!user) { setAppLoading(false); return }
    loadAllData(user.id)
  }, [user])

  async function loadAllData(userId) {
    setAppLoading(true)
    try {
      const [profileRes, guestsRes, budgetRes, checklistRes, ideasRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('guests').select('*').eq('user_id', userId),
        supabase.from('budget_categories').select('*').eq('user_id', userId),
        supabase.from('checklist_items').select('*').eq('user_id', userId).order('sort_order'),
        supabase.from('ideas').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      ])

      if (profileRes.data) {
        const p = profileRes.data
        const p1 = p.partner1 || ''
        const p2 = p.partner2 || ''
        setPartnersState({ partner1: p1, partner2: p2 })
        setWeddingDateState(p.wedding_date || null)
        setBudgetTotalState(Number(p.budget_total) || 200000)
        setVenueLocationState(p.venue_location || '')
        setFirstLaunchDone(!!(p1 && p2))
      }

      if (guestsRes.data?.length) {
        const mapped = guestsRes.data.map(guestFromDb)
        setGuestsState(mapped)
        guestsRef.current = mapped
      }

      if (budgetRes.data?.length) {
        const mapped = budgetRes.data.map(budgetFromDb)
        setBudgetState(mapped)
        budgetRef.current = mapped
      } else {
        const defaults = getDefaultBudget()
        setBudgetState(defaults)
        budgetRef.current = defaults
        await supabase.from('budget_categories').insert(defaults.map(b => budgetToDb(b, userId)))
      }

      if (checklistRes.data?.length) {
        const mapped = checklistRes.data.map(checklistFromDb)
        setChecklistState(mapped)
        checklistRef.current = mapped
      } else {
        const defaults = getDefaultChecklist()
        setChecklistState(defaults)
        checklistRef.current = defaults
        await supabase.from('checklist_items').insert(defaults.map((c, i) => checklistToDb(c, userId, i)))
      }

      if (ideasRes.data?.length) {
        const mapped = ideasRes.data.map(ideaFromDb)
        setIdeasState(mapped)
        ideasRef.current = mapped
      }
    } catch (err) {
      console.error('HitchedSA: failed to load data', err)
    } finally {
      setAppLoading(false)
    }
  }

  // ── Profile setters ───────────────────────────────────────────────────────

  const setPartners = useCallback((val) => {
    setPartnersState(val)
    if (user) supabase.from('profiles').upsert({ id: user.id, partner1: val.partner1, partner2: val.partner2 })
  }, [user])

  const setWeddingDate = useCallback((val) => {
    setWeddingDateState(val)
    if (user) supabase.from('profiles').upsert({ id: user.id, wedding_date: val })
  }, [user])

  const completeFirstLaunch = useCallback((data) => {
    setPartnersState(data.partners)
    if (data.weddingDate) setWeddingDateState(data.weddingDate)
    setFirstLaunchDone(true)
    if (user) {
      supabase.from('profiles').upsert({
        id:           user.id,
        partner1:     data.partners.partner1,
        partner2:     data.partners.partner2,
        wedding_date: data.weddingDate || null,
      })
    }
  }, [user])

  const setVenueLocation = useCallback((val) => {
    setVenueLocationState(val)
    if (user) supabase.from('profiles').upsert({ id: user.id, venue_location: val })
  }, [user])

  // ── Collection setters ────────────────────────────────────────────────────

  const setGuests = useCallback((val) => {
    const next = typeof val === 'function' ? val(guestsRef.current) : val
    setGuestsState(next)
    guestsRef.current = next
    if (user) syncTable('guests', user.id, next.map(g => guestToDb(g, user.id)))
  }, [user])

  const setBudget = useCallback((val) => {
    const next = typeof val === 'function' ? val(budgetRef.current) : val
    setBudgetState(next)
    budgetRef.current = next
    if (user) syncTable('budget_categories', user.id, next.map(b => budgetToDb(b, user.id)))
  }, [user])

  const setBudgetTotal = useCallback((val) => {
    setBudgetTotalState(val)
    if (user) supabase.from('profiles').upsert({ id: user.id, budget_total: val })
  }, [user])

  const setChecklist = useCallback((val) => {
    const next = typeof val === 'function' ? val(checklistRef.current) : val
    setChecklistState(next)
    checklistRef.current = next
    if (user) syncTable('checklist_items', user.id, next.map((c, i) => checklistToDb(c, user.id, i)))
  }, [user])

  const setIdeas = useCallback((val) => {
    const next = typeof val === 'function' ? val(ideasRef.current) : val
    setIdeasState(next)
    ideasRef.current = next
    if (user) syncTable('ideas', user.id, next.map(i => ideaToDb(i, user.id)))
  }, [user])

  const setVenueShortlist = useCallback((val) => {
    const next = typeof val === 'function' ? val(venueShortlistRef.current) : val
    setVenueShortlistState(next)
    venueShortlistRef.current = next
  }, [])

  const setSupplierShortlist = useCallback((val) => {
    const next = typeof val === 'function' ? val(supplierShortlistRef.current) : val
    setSupplierShortlistState(next)
    supplierShortlistRef.current = next
  }, [])

  // ── Clear all data ────────────────────────────────────────────────────────

  const clearAllData = useCallback(async () => {
    if (!user) return
    await Promise.all([
      supabase.from('guests').delete().eq('user_id', user.id),
      supabase.from('budget_categories').delete().eq('user_id', user.id),
      supabase.from('checklist_items').delete().eq('user_id', user.id),
      supabase.from('ideas').delete().eq('user_id', user.id),
      supabase.from('seating_tables').delete().eq('user_id', user.id),
      supabase.from('profiles').update({
        partner1: '', partner2: '', wedding_date: null, budget_total: 200000, venue_location: '',
      }).eq('id', user.id),
    ])
    window.location.reload()
  }, [user])

  // ── Derived stats ─────────────────────────────────────────────────────────

  const guestCount       = guests.length
  const confirmedCount   = guests.filter((g) => g.rsvp === 'confirmed').length
  const pendingCount     = guests.filter((g) => g.rsvp === 'pending').length
  const declinedCount    = guests.filter((g) => g.rsvp === 'declined').length
  const totalSpent       = budget.reduce((sum, cat) => sum + (Number(cat.spent) || 0), 0)
  const budgetProgress   = budgetTotal > 0 ? Math.min((totalSpent / budgetTotal) * 100, 100) : 0
  const checklistDone    = checklist.filter((t) => t.done).length
  const checklistProgress= checklist.length > 0 ? Math.round((checklistDone / checklist.length) * 100) : 0

  return (
    <AppContext.Provider value={{
      appLoading,
      partners,          setPartners,
      weddingDate,       setWeddingDate,
      firstLaunchDone,   completeFirstLaunch,
      guests,            setGuests,
      budget,            setBudget,
      budgetTotal,       setBudgetTotal,
      checklist,         setChecklist,
      ideas,             setIdeas,
      venueShortlist,    setVenueShortlist,
      supplierShortlist, setSupplierShortlist,
      venueLocation,     setVenueLocation,
      clearAllData,
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

// ─── Default data ─────────────────────────────────────────────────────────────

function getDefaultBudget() {
  return [
    { id: 'venue',       category: 'Venue',                allocated: 60000, spent: 0, depositPaid: false },
    { id: 'catering',    category: 'Catering',             allocated: 40000, spent: 0, depositPaid: false },
    { id: 'photography', category: 'Photography & Video',  allocated: 25000, spent: 0, depositPaid: false },
    { id: 'dj',          category: 'DJ & Entertainment',   allocated: 15000, spent: 0, depositPaid: false },
    { id: 'flowers',     category: 'Flowers & Floral',     allocated: 12000, spent: 0, depositPaid: false },
    { id: 'cake',        category: 'Wedding Cake',         allocated:  5000, spent: 0, depositPaid: false },
    { id: 'dress',       category: 'Dress & Attire',       allocated: 20000, spent: 0, depositPaid: false },
    { id: 'decor',       category: 'Décor & Styling',      allocated: 10000, spent: 0, depositPaid: false },
    { id: 'transport',   category: 'Transport',            allocated:  8000, spent: 0, depositPaid: false },
    { id: 'other',       category: 'Other',                allocated:  5000, spent: 0, depositPaid: false },
  ]
}

function getDefaultChecklist() {
  const tasks = [
    { phase: 'early',   label: 'Set your wedding budget' },
    { phase: 'early',   label: 'Decide on a rough guest list size' },
    { phase: 'early',   label: 'Research and shortlist venues' },
    { phase: 'early',   label: 'Book your venue' },
    { phase: 'early',   label: 'Set your wedding date' },
    { phase: 'early',   label: 'Choose your wedding theme and colours' },
    { phase: 'early',   label: 'Start researching photographers' },
    { phase: 'early',   label: 'Start looking at wedding dresses' },
    { phase: 'serious', label: 'Book photographer and videographer' },
    { phase: 'serious', label: 'Book DJ or live band' },
    { phase: 'serious', label: 'Book florist' },
    { phase: 'serious', label: 'Send save-the-dates' },
    { phase: 'serious', label: 'Book makeup artist and hair stylist' },
    { phase: 'serious', label: 'Order wedding cake or dessert table' },
    { phase: 'serious', label: 'Book wedding transport (car hire)' },
    { phase: 'serious', label: 'Plan honeymoon' },
    { phase: 'final',   label: 'Send out formal invitations' },
    { phase: 'final',   label: 'Finalise menu with caterer' },
    { phase: 'final',   label: 'Arrange seating plan' },
    { phase: 'final',   label: 'Confirm all supplier bookings' },
    { phase: 'final',   label: 'Purchase wedding rings' },
    { phase: 'final',   label: 'Final dress fitting' },
    { phase: 'final',   label: 'Collect RSVPs and finalise guest list' },
    { phase: 'week',    label: 'Confirm venue setup details' },
    { phase: 'week',    label: 'Deliver items to venue' },
    { phase: 'week',    label: 'Prepare wedding day schedule' },
    { phase: 'week',    label: 'Delegate tasks to wedding party' },
    { phase: 'week',    label: 'Rehearsal dinner' },
    { phase: 'week',    label: 'Prepare supplier payments / envelopes' },
  ]
  return tasks.map((t, i) => ({ ...t, id: `task_${i}`, done: false, notes: '', dueDate: '' }))
}