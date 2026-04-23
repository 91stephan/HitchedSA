import { useState } from 'react'
import SupplierCard from '../components/SupplierCard'
import SupplierIllustration from '../components/illustrations/SupplierIllustration'
import AdBanner from '../components/AdBanner'
import FloralDivider from '../components/FloralDivider'

const PLACES_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

const CATEGORIES = [
  { id: 'photographers', label: 'Photographers', icon: '📸', query: 'wedding photographer' },
  { id: 'djs', label: 'DJs', icon: '🎵', query: 'wedding DJ entertainment' },
  { id: 'florists', label: 'Florists', icon: '💐', query: 'wedding florist flowers' },
  { id: 'caterers', label: 'Caterers', icon: '🍽️', query: 'wedding caterer catering' },
  { id: 'makeup', label: 'Makeup Artists', icon: '💄', query: 'wedding makeup artist bridal beauty' },
  { id: 'cakes', label: 'Wedding Cakes', icon: '🎂', query: 'wedding cake bakery' },
  { id: 'cars', label: 'Car Hire', icon: '🚗', query: 'wedding car hire limousine' },
  { id: 'decor', label: 'Décor Hire', icon: '✨', query: 'wedding decor hire styling' },
]

const QUICK_CITIES = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Stellenbosch']

const PRICE_LEVEL_MAP = ['', 'Budget', 'Mid-range', 'Premium', 'Luxury']

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

export default function Suppliers() {
  const [activeCategory, setActiveCategory] = useState('photographers')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

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
      <h1 className="section-title">Suppliers</h1>
      <p className="section-subtitle">Discover South Africa's finest wedding suppliers</p>

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

          <div className="card text-center p-4" style={{ background: 'var(--color-surface)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Are you a wedding supplier?
            </p>
            <button
              className="btn-outline text-xs mt-2 px-3 py-1.5"
              onClick={() => alert('Supplier listings coming soon!')}
            >
              List Your Business
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}