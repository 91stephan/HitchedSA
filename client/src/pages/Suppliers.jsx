import { useState } from 'react'
import SupplierCard from '../components/SupplierCard'
import SupplierIllustration from '../components/illustrations/SupplierIllustration'
import AdBanner from '../components/AdBanner'
import FloralDivider from '../components/FloralDivider'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'

const PLACES_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

const CATEGORIES = [
  { id: 'photographers', label: 'Photographers',  icon: '📸', query: 'wedding photographer' },
  { id: 'djs',           label: 'DJs',            icon: '🎵', query: 'wedding DJ entertainment' },
  { id: 'florists',      label: 'Florists',       icon: '💐', query: 'wedding florist flowers' },
  { id: 'caterers',      label: 'Caterers',       icon: '🍽️', query: 'wedding caterer catering' },
  { id: 'makeup',        label: 'Makeup Artists', icon: '💄', query: 'wedding makeup artist bridal beauty' },
  { id: 'cakes',         label: 'Wedding Cakes',  icon: '🎂', query: 'wedding cake bakery' },
  { id: 'cars',          label: 'Car Hire',       icon: '🚗', query: 'wedding car hire limousine' },
  { id: 'decor',         label: 'Décor Hire',     icon: '✨', query: 'wedding decor hire styling' },
]

const QUICK_CITIES = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Stellenbosch']

const PRICE_LEVEL_MAP = ['', 'Budget', 'Mid-range', 'Premium', 'Luxury']

const LISTING_CATEGORIES = [
  'Photographer', 'Videographer', 'DJ / Live Band', 'Florist', 'Caterer',
  'Makeup Artist', 'Hair Stylist', 'Wedding Cake', 'Car Hire', 'Décor Hire',
  'Officiant', 'Wedding Planner', 'Other',
]

const EMPTY_LISTING = { business: '', category: 'Photographer', contact: '', email: '', phone: '', city: '', website: '', description: '' }

function mapPlaceToSupplier(place) {
  return {
    id: place.id,
    name: place.displayName?.text || 'Unknown',
    location: place.formattedAddress || '',
    rating: typeof place.rating === 'number' ? place.rating : 0,
    priceRange: PRICE_LEVEL_MAP[place.priceLevel] || 'Contact for pricing',
    speciality: place.editorialSummary?.text || null,
    mapsQuery: encodeURIComponent(place.formattedAddress || place.displayName?.text || ''),
    contact: place.nationalPhoneNumber || '',
  }
}

async function searchSuppliers(query, location) {
  const textQuery = `${query} ${location} South Africa`
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PLACES_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.editorialSummary,places.nationalPhoneNumber,places.priceLevel',
    },
    body: JSON.stringify({ textQuery, maxResultCount: 20 }),
  })
  if (!res.ok) throw new Error(`Search failed (${res.status})`)
  const data = await res.json()
  return (data.places || []).map(mapPlaceToSupplier)
}

function ListingModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_LISTING)
  const [submitted, setSubmitted] = useState(false)

  const handleClose = () => { setForm(EMPTY_LISTING); setSubmitted(false); onClose() }

  const handleSubmit = () => {
    if (!form.business.trim() || !form.email.trim()) return
    const body = encodeURIComponent(
      `Business Name: ${form.business}\nCategory: ${form.category}\nContact Person: ${form.contact}\nEmail: ${form.email}\nPhone: ${form.phone}\nCity/Area: ${form.city}\nWebsite: ${form.website}\n\nDescription:\n${form.description}`
    )
    window.open(`mailto:hello@hitchedsa.co.za?subject=Supplier Listing Request – ${encodeURIComponent(form.business)}&body=${body}`)
    setSubmitted(true)
  }

  return (
    <Modal open={open} onClose={handleClose} title="List Your Business on HitchedSA" maxWidth="max-w-lg">
      {submitted ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
            Your email app should have opened!
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Send the pre-filled email to complete your listing request. We'll review and add you within 48 hours.
          </p>
          <button className="btn-primary" onClick={handleClose}>Done</button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Fill in your details and we'll review your listing within 48 hours. Free to list.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Business Name *</label>
              <input className="input-field" placeholder="e.g. Captured Moments Photography" value={form.business}
                onChange={(e) => setForm(f => ({ ...f, business: e.target.value }))} />
            </div>
            <div>
              <label className="label">Category *</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}>
                {LISTING_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">City / Area *</label>
              <input className="input-field" placeholder="e.g. Cape Town" value={form.city}
                onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))} />
            </div>
            <div>
              <label className="label">Contact Person</label>
              <input className="input-field" placeholder="Your name" value={form.contact}
                onChange={(e) => setForm(f => ({ ...f, contact: e.target.value }))} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input-field" placeholder="+27 ..." value={form.phone}
                onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="label">Email *</label>
              <input className="input-field" type="email" placeholder="business@example.com" value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="label">Website (optional)</label>
              <input className="input-field" placeholder="https://..." value={form.website}
                onChange={(e) => setForm(f => ({ ...f, website: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Brief Description</label>
              <textarea className="input-field" rows={2} placeholder="Tell couples what makes your business special..."
                value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button className="btn-outline flex-1" onClick={handleClose}>Cancel</button>
            <button className="btn-primary flex-1" onClick={handleSubmit}
              disabled={!form.business.trim() || !form.email.trim()}>
              Submit Listing Request
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default function Suppliers() {
  const { supplierShortlist, setSupplierShortlist } = useApp()
  const [tab, setTab] = useState('search')
  const [activeCategory, setActiveCategory] = useState('photographers')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [showListingModal, setShowListingModal] = useState(false)

  const category = CATEGORIES.find((c) => c.id === activeCategory)

  const doSearch = async (overrideLocation, overrideCat) => {
    const loc = (overrideLocation ?? location).trim()
    const cat = overrideCat ?? category
    if (!loc) { setError('Please enter a city or area to search'); return }
    setLoading(true)
    setError('')
    try {
      const suppliers = await searchSuppliers(cat.query, loc)
      setResults(suppliers)
      setSearched(true)
      if (overrideLocation !== undefined) setLocation(overrideLocation)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    setResults([])
    setSearched(false)
    setError('')
    if (location.trim()) {
      const cat = CATEGORIES.find((c) => c.id === catId)
      doSearch(location.trim(), cat)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <ListingModal open={showListingModal} onClose={() => setShowListingModal(false)} />

      <h1 className="section-title">Suppliers</h1>
      <p className="section-subtitle">Discover South Africa's finest wedding suppliers</p>

      {/* Main tabs */}
      <div className="flex gap-2 mb-6">
        <button className={`tab-btn ${tab === 'search' ? 'active' : ''}`} onClick={() => setTab('search')}>
          🔍 Search Suppliers
        </button>
        <button className={`tab-btn ${tab === 'shortlist' ? 'active' : ''}`} onClick={() => setTab('shortlist')}>
          ♥ My Shortlist ({supplierShortlist.length})
        </button>
      </div>

      {tab === 'shortlist' && (
        <div>
          {supplierShortlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">♡</div>
              <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
                No saved suppliers yet
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Search for suppliers and click "Shortlist" to save your favourites here.
              </p>
              <button className="btn-primary" onClick={() => setTab('search')}>Browse Suppliers</button>
            </div>
          ) : (
            <>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {supplierShortlist.length} saved supplier{supplierShortlist.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {supplierShortlist.map((supplier) => {
                  const cat = CATEGORIES.find(c => c.query.toLowerCase().includes(supplier.speciality?.split(' ')[0]?.toLowerCase() || ''))
                  return (
                    <SupplierCard
                      key={supplier.id}
                      supplier={supplier}
                      categoryIcon={cat?.icon || '⭐'}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'search' && (
        <>
          {/* Location search bar */}
          <div className="card mb-6">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
              <div className="flex-1">
                <label className="label">Search Location *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Cape Town, Johannesburg, Durban..."
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                />
              </div>
              <button className="btn-primary shrink-0" onClick={() => doSearch()} disabled={loading}>
                {loading ? '⟳ Searching...' : '🔍 Search'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {QUICK_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => doSearch(city)}
                  className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                  style={{
                    borderColor: location === city ? 'var(--color-primary)' : 'var(--color-border)',
                    background: location === city ? 'var(--color-primary-light)' : 'transparent',
                    color: location === city ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
            {error && <p className="text-xs mt-2" style={{ color: 'var(--color-danger)' }}>{error}</p>}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`tab-btn whitespace-nowrap flex items-center gap-1.5 ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {loading && (
                <div className="text-center py-16">
                  <p className="text-4xl mb-4 animate-spin inline-block">⟳</p>
                  <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                    Finding {category?.label?.toLowerCase()} near {location}...
                  </p>
                </div>
              )}

              {!loading && searched && (
                <>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    {results.length} {category?.label?.toLowerCase()} found near {location}
                  </p>
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {results.map((supplier) => (
                        <SupplierCard
                          key={supplier.id}
                          supplier={supplier}
                          categoryIcon={category?.icon}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="flex justify-center mb-4"><SupplierIllustration size={160} /></div>
                      <p className="font-display text-xl" style={{ color: 'var(--color-heading)' }}>
                        No {category?.label?.toLowerCase()} found
                      </p>
                      <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                        Try a different location or category
                      </p>
                    </div>
                  )}
                </>
              )}

              {!loading && !searched && (
                <div className="text-center py-16">
                  <div className="flex justify-center mb-4"><SupplierIllustration size={160} /></div>
                  <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
                    Find {category?.label}
                  </p>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    Enter your city above and click Search, or choose a quick location
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {QUICK_CITIES.map((city) => (
                      <button key={city} onClick={() => doSearch(city)} className="btn-outline text-sm">
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <FloralDivider />
                <AdBanner slot="suppliers-bottom" size="leaderboard" />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0 space-y-4">
              <div className="card">
                <h3 className="font-display font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>
                  Booking Tips
                </h3>
                <ul className="text-xs space-y-2" style={{ color: 'var(--color-text-muted)' }}>
                  <li>• Book photographers 12–18 months in advance</li>
                  <li>• Secure your DJ at least 6 months ahead</li>
                  <li>• Ask for itemised quotes to compare properly</li>
                  <li>• Always confirm with a signed contract</li>
                  <li>• Check payment terms and cancellation policies</li>
                </ul>
              </div>

              <AdBanner slot="suppliers-sidebar" size="sidebar" />

              {/* Business listing CTA */}
              <div
                className="card p-5"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent-light))', border: '1px solid var(--color-border)' }}
              >
                <div className="text-2xl mb-2">🏢</div>
                <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--color-heading)' }}>
                  List Your Business
                </h3>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Reach thousands of engaged couples across South Africa.
                </p>
                <ul className="text-xs space-y-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  <li>✓ Free to list</li>
                  <li>✓ Direct enquiries to your phone/email</li>
                  <li>✓ Verified supplier badge</li>
                </ul>
                <button
                  className="btn-primary w-full text-sm"
                  onClick={() => setShowListingModal(true)}
                >
                  Get Listed →
                </button>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  )
}