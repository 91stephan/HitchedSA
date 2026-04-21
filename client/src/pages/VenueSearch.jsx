import { useState } from 'react'
import { useApp } from '../context/AppContext'
import VenueCard from '../components/VenueCard'
import VenueIllustration from '../components/illustrations/VenueIllustration'
import AdBanner from '../components/AdBanner'
import Modal from '../components/Modal'
import Celebration from '../components/Celebration'
import { SAMPLE_VENUES, PROVINCES } from '../hooks/useSampleData'

const STAR_RATINGS = [
  { value: '', label: 'Any Rating' },
  { value: '4', label: '4+ Stars' },
  { value: '4.5', label: '4.5+ Stars' },
  { value: '4.8', label: '4.8+ Stars' },
]

export default function VenueSearch() {
  const { venueShortlist, setVenueShortlist, setWeddingDate, weddingDate, setVenueLocation } = useApp()
  const [tab, setTab] = useState('search') // 'search' | 'shortlist'
  const [searchQuery, setSearchQuery] = useState('')
  const [province, setProvince] = useState('')
  const [minCapacity, setMinCapacity] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [catering, setCatering] = useState(false)
  const [accommodation, setAccommodation] = useState(false)
  const [minRating, setMinRating] = useState('')
  const [compareList, setCompareList] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [bookingVenue, setBookingVenue] = useState(null)
  const [bookingDate, setBookingDate] = useState(weddingDate || '')
  const [showCelebration, setShowCelebration] = useState(false)
  const [shortlistNotes, setShortlistNotes] = useState({})
  const [shortlistRatings, setShortlistRatings] = useState({})

  // Filters
  const filtered = SAMPLE_VENUES.filter((v) => {
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.location.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (province && v.province !== province) return false
    if (minCapacity && v.capacity < Number(minCapacity)) return false
    if (maxPrice && v.priceMax > Number(maxPrice)) return false
    if (catering && !v.catering) return false
    if (accommodation && !v.accommodation) return false
    if (minRating && v.rating < Number(minRating)) return false
    return true
  })

  const addToShortlist = (venue) => {
    setVenueShortlist((prev) => {
      if (prev.some((v) => v.id === venue.id)) return prev.filter((v) => v.id !== venue.id)
      return [...prev, { ...venue, personalNotes: '', personalRating: 0, availableDates: '' }]
    })
  }

  const toggleCompare = (venue) => {
    setCompareList((prev) => {
      if (prev.some((v) => v.id === venue.id)) return prev.filter((v) => v.id !== venue.id)
      if (prev.length >= 3) return prev
      return [...prev, venue]
    })
  }

  const handleBookThis = (venue) => {
    setBookingVenue(venue)
    setBookingDate(weddingDate || '')
  }

  const confirmBooking = () => {
    if (!bookingDate) return
    setWeddingDate(bookingDate)
    setVenueLocation(bookingVenue?.location || '')
    setBookingVenue(null)
    setShowCelebration(true)
  }

  const removeShortlist = (id) => {
    setVenueShortlist((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <Celebration show={showCelebration} onDone={() => setShowCelebration(false)} />

      <h1 className="section-title">Venue Search</h1>
      <p className="section-subtitle">Find the perfect South African wedding venue</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button className={`tab-btn ${tab === 'search' ? 'active' : ''}`} onClick={() => setTab('search')}>
          🔍 Search Venues
        </button>
        <button className={`tab-btn ${tab === 'shortlist' ? 'active' : ''}`} onClick={() => setTab('shortlist')}>
          ♥ My Shortlist ({venueShortlist.length})
        </button>
      </div>

      {tab === 'search' && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="card sticky top-20">
              <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                Filter Venues
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Search</label>
                  <input
                    className="input-field"
                    placeholder="Venue name or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Province</label>
                  <select className="input-field" value={province} onChange={(e) => setProvince(e.target.value)}>
                    {PROVINCES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Min Guest Capacity</label>
                  <input type="number" className="input-field" placeholder="e.g. 100" value={minCapacity} onChange={(e) => setMinCapacity(e.target.value)} />
                </div>
                <div>
                  <label className="label">Max Budget (R)</label>
                  <input type="number" className="input-field" placeholder="e.g. 100000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <div>
                  <label className="label">Min Rating</label>
                  <select className="input-field" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                    {STAR_RATINGS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: 'var(--color-text)' }}>
                  <input type="checkbox" checked={catering} onChange={(e) => setCatering(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
                  Catering Included
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: 'var(--color-text)' }}>
                  <input type="checkbox" checked={accommodation} onChange={(e) => setAccommodation(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
                  Accommodation Available
                </label>
                <button
                  className="btn-outline w-full text-sm"
                  onClick={() => { setSearchQuery(''); setProvince(''); setMinCapacity(''); setMaxPrice(''); setCatering(false); setAccommodation(false); setMinRating('') }}
                >
                  Clear Filters
                </button>
              </div>

              {/* Compare button */}
              {compareList.length >= 2 && (
                <button className="btn-accent w-full mt-4 text-sm" onClick={() => setShowCompare(true)}>
                  ⚖️ Compare ({compareList.length}) Venues
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {filtered.length} venue{filtered.length !== 1 ? 's' : ''} found
              </p>
              {compareList.length > 0 && (
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {compareList.length}/3 selected for comparison
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((venue, idx) => (
                <>
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onAddShortlist={addToShortlist}
                    onCompareToggle={toggleCompare}
                    compareSelected={compareList.some((v) => v.id === venue.id)}
                    showCompare
                  />
                  {/* AD SLOT - ADSENSE */}
                  {idx === 2 && (
                    <div key="ad-slot" className="md:col-span-2 xl:col-span-3">
                      <AdBanner slot="venue-results-mid" size="leaderboard" />
                    </div>
                  )}
                </>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4"><VenueIllustration size={160} /></div>
                <p className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>No venues match your filters</p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'shortlist' && (
        <div>
          {venueShortlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">♡</div>
              <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>Your shortlist is empty</p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Browse venues and click "Shortlist" to save your favourites here.</p>
              <button className="btn-primary" onClick={() => setTab('search')}>Browse Venues</button>
            </div>
          ) : (
            <>
              {compareList.length >= 2 && (
                <button className="btn-accent mb-6 text-sm" onClick={() => setShowCompare(true)}>
                  ⚖️ Compare ({compareList.length}) Venues
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {venueShortlist.map((venue) => (
                  <div key={venue.id} className="card">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>{venue.name}</h3>
                      <div className="flex gap-2 shrink-0">
                        <button
                          className={`text-xs px-2 py-1 rounded border-2 transition-all ${compareList.some((v) => v.id === venue.id) ? 'text-white' : ''}`}
                          style={{
                            borderColor: 'var(--color-accent)',
                            background: compareList.some((v) => v.id === venue.id) ? 'var(--color-accent)' : 'transparent',
                            color: compareList.some((v) => v.id === venue.id) ? '#fff' : 'var(--color-accent)',
                          }}
                          onClick={() => toggleCompare(venue)}
                        >
                          ⚖️
                        </button>
                        <button
                          onClick={() => removeShortlist(venue.id)}
                          className="text-xs px-2 py-1 rounded border-2"
                          style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>📍 {venue.location} · {venue.priceRange}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {venue.catering && <span className="tag">🍽️ Catering</span>}
                      {venue.accommodation && <span className="tag">🛏️ Accommodation</span>}
                    </div>

                    {/* Personal rating */}
                    <div className="mb-3">
                      <label className="label text-xs">Your Rating</label>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setShortlistRatings((r) => ({ ...r, [venue.id]: star }))}
                            className="text-xl transition-transform hover:scale-110"
                            style={{ color: star <= (shortlistRatings[venue.id] || 0) ? 'var(--color-accent)' : 'var(--color-border)' }}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <label className="label text-xs">Personal Notes</label>
                      <textarea
                        className="input-field text-xs"
                        rows={2}
                        placeholder="Add your notes, available dates, questions..."
                        value={shortlistNotes[venue.id] || ''}
                        onChange={(e) => setShortlistNotes((n) => ({ ...n, [venue.id]: e.target.value }))}
                      />
                    </div>

                    {/* Photo placeholder */}
                    <div
                      className="rounded-lg h-12 flex items-center justify-center text-xs mb-4 border-2 border-dashed"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      📷 Photo uploads — coming soon
                    </div>

                    <button
                      className="btn-primary w-full text-sm"
                      onClick={() => handleBookThis(venue)}
                    >
                      📅 Book This Venue
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Compare Modal */}
      <Modal open={showCompare} onClose={() => setShowCompare(false)} title="Venue Comparison" maxWidth="max-w-4xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 pr-4" style={{ color: 'var(--color-text-muted)' }}>Feature</th>
                {compareList.map((v) => (
                  <th key={v.id} className="text-left py-2 px-2 font-display" style={{ color: 'var(--color-text)' }}>{v.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Location', key: 'location' },
                { label: 'Capacity', key: 'capacity', fmt: (v) => `Up to ${v}` },
                { label: 'Price Range', key: 'priceRange' },
                { label: 'Rating', key: 'rating', fmt: (v) => `★ ${v}` },
                { label: 'Catering', key: 'catering', fmt: (v) => v ? '✅ Yes' : '❌ No' },
                { label: 'Accommodation', key: 'accommodation', fmt: (v) => v ? '✅ Yes' : '❌ No' },
              ].map((row) => (
                <tr key={row.key} style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td className="py-2.5 pr-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>{row.label}</td>
                  {compareList.map((v) => (
                    <td key={v.id} className="py-2.5 px-2" style={{ color: 'var(--color-text)' }}>
                      {row.fmt ? row.fmt(v[row.key]) : v[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Book This Modal */}
      <Modal open={!!bookingVenue} onClose={() => setBookingVenue(null)} title={`Book ${bookingVenue?.name}`}>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Setting your wedding date will update the countdown, checklist and weather widget across the app.
        </p>
        <div className="mb-6">
          <label className="label">Wedding Date</label>
          <input
            type="date"
            className="input-field"
            value={bookingDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="btn-outline flex-1" onClick={() => setBookingVenue(null)}>Cancel</button>
          <button className="btn-primary flex-1" onClick={confirmBooking} disabled={!bookingDate}>
            💍 Confirm Date
          </button>
        </div>
      </Modal>
    </div>
  )
}
