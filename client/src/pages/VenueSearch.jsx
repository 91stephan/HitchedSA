import { Fragment, useState } from 'react'
import { useApp } from '../context/AppContext'
import VenueCard from '../components/VenueCard'
import VenueIllustration from '../components/illustrations/VenueIllustration'
import AdBanner from '../components/AdBanner'
import Modal from '../components/Modal'
import Celebration from '../components/Celebration'

const PLACES_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

const QUICK_LOCATIONS = [
  'Cape Town', 'Stellenbosch', 'Franschhoek', 'Johannesburg',
  'Pretoria', 'Durban', 'Garden Route', 'Winelands',
]

const STAR_RATINGS = [
  { value: '', label: 'Any Rating' },
  { value: '4', label: '4+ Stars' },
  { value: '4.5', label: '4.5+ Stars' },
]

function mapPlace(place) {
  const photo = place.photos?.[0]?.name
  const priceLevelMap = ['', 'R–RR', 'RR–RRR', 'RRR–RRRR', 'RRRR+']
  return {
    id: place.id,
    name: place.displayName?.text || 'Unknown Venue',
    location: place.formattedAddress || '',
    description: place.editorialSummary?.text || 'Contact for more information about this venue.',
    image: photo ? `https://places.googleapis.com/v1/${photo}/media?maxWidthPx=800&key=${PLACES_KEY}` : null,
    rating: typeof place.rating === 'number' ? place.rating : 0,
    priceRange: priceLevelMap[place.priceLevel] || 'Contact for pricing',
    capacity: 0,
    catering: false,
    accommodation: false,
    mapsQuery: encodeURIComponent(place.formattedAddress || place.displayName?.text || ''),
    contact: place.nationalPhoneNumber || '',
  }
}

async function searchPlaces(keywords, location) {
  const q = `wedding venue${keywords ? ' ' + keywords : ''} ${location} South Africa`
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PLACES_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.photos,places.editorialSummary,places.nationalPhoneNumber,places.priceLevel',
    },
    body: JSON.stringify({ textQuery: q, maxResultCount: 20 }),
  })
  if (!res.ok) throw new Error(`Search failed (${res.status})`)
  const data = await res.json()
  return (data.places || []).map(mapPlace)
}

export default function VenueSearch() {
  const { venueShortlist, setVenueShortlist, setWeddingDate, weddingDate, setVenueLocation } = useApp()
  const [tab, setTab] = useState('search')
  const [location, setLocation] = useState('')
  const [keywords, setKeywords] = useState('')
  const [minRating, setMinRating] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [compareList, setCompareList] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [bookingVenue, setBookingVenue] = useState(null)
  const [bookingDate, setBookingDate] = useState(weddingDate || '')
  const [showCelebration, setShowCelebration] = useState(false)
  const [shortlistNotes, setShortlistNotes] = useState({})
  const [shortlistRatings, setShortlistRatings] = useState({})

  const doSearch = async (overrideLocation) => {
    const loc = (overrideLocation ?? location).trim()
    if (!loc) { setError('Please enter a location to search'); return }
    setLoading(true)
    setError('')
    try {
      const venues = await searchPlaces(keywords, loc)
      setResults(venues)
      setSearched(true)
      if (overrideLocation !== undefined) setLocation(overrideLocation)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const filtered = minRating ? results.filter((v) => v.rating >= Number(minRating)) : results

  const addToShortlist = (venue) => {
    setVenueShortlist((prev) =>
      prev.some((v) => v.id === venue.id)
        ? prev.filter((v) => v.id !== venue.id)
        : [...prev, { ...venue, personalNotes: '', personalRating: 0 }]
    )
  }

  const toggleCompare = (venue) => {
    setCompareList((prev) => {
      if (prev.some((v) => v.id === venue.id)) return prev.filter((v) => v.id !== venue.id)
      if (prev.length >= 3) return prev
      return [...prev, venue]
    })
  }

  const confirmBooking = () => {
    if (!bookingDate) return
    setWeddingDate(bookingDate)
    setVenueLocation(bookingVenue?.location || '')
    setBookingVenue(null)
    setShowCelebration(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <Celebration show={showCelebration} onDone={() => setShowCelebration(false)} />

      <h1 className="section-title">Venue Search</h1>
      <p className="section-subtitle">Find the perfect South African wedding venue</p>

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
          <aside className="lg:w-72 shrink-0">
            <div className="card sticky top-20">
              <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                Search Venues
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Location *</label>
                  <input
                    className="input-field"
                    placeholder="e.g. Cape Town, Stellenbosch..."
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); setError('') }}
                    onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                  />
                </div>
                <div>
                  <label className="label">Venue Style (optional)</label>
                  <input
                    className="input-field"
                    placeholder="e.g. vineyard, beach, garden..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                  />
                </div>
                <div>
                  <label className="label">Min Rating</label>
                  <select className="input-field" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                    {STAR_RATINGS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <div>
                  <p className="label mb-2">Quick Locations</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_LOCATIONS.map((p) => (
                      <button
                        key={p}
                        onClick={() => doSearch(p)}
                        className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                        style={{
                          borderColor: location === p ? 'var(--color-primary)' : 'var(--color-border)',
                          background: location === p ? 'var(--color-primary-light)' : 'transparent',
                          color: location === p ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-xs" style={{ color: 'var(--color-danger)' }}>{error}</p>}

                <button className="btn-primary w-full" onClick={() => doSearch()} disabled={loading}>
                  {loading ? '⟳ Searching...' : '🔍 Search'}
                </button>
                {searched && !loading && (
                  <button
                    className="btn-outline w-full text-sm"
                    onClick={() => { setResults([]); setSearched(false); setKeywords(''); setMinRating(''); setError('') }}
                  >
                    Clear Results
                  </button>
                )}
              </div>

              {compareList.length >= 2 && (
                <button className="btn-accent w-full mt-4 text-sm" onClick={() => setShowCompare(true)}>
                  ⚖️ Compare ({compareList.length}) Venues
                </button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            {loading && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 animate-spin inline-block">⟳</div>
                <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                  Searching venues near {location || 'South Africa'}...
                </p>
              </div>
            )}

            {!loading && searched && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {filtered.length} venue{filtered.length !== 1 ? 's' : ''} found near {location}
                    {minRating ? ` · ★ ${minRating}+ filter active` : ''}
                  </p>
                  {compareList.length > 0 && (
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {compareList.length}/3 selected for comparison
                    </p>
                  )}
                </div>

                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((venue, idx) => (
                      <Fragment key={venue.id}>
                        <VenueCard
                          venue={venue}
                          onAddShortlist={addToShortlist}
                          onCompareToggle={toggleCompare}
                          compareSelected={compareList.some((v) => v.id === venue.id)}
                          showCompare
                        />
                        {idx === 2 && (
                          <div className="md:col-span-2 xl:col-span-3">
                            <AdBanner slot="venue-results-mid" size="leaderboard" />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="flex justify-center mb-4"><VenueIllustration size={160} /></div>
                    <p className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
                      No venues found
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Try a different location or remove the rating filter
                    </p>
                  </div>
                )}
              </>
            )}

            {!loading && !searched && (
              <div className="text-center py-20">
                <div className="flex justify-center mb-6"><VenueIllustration size={180} /></div>
                <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
                  Find your dream venue
                </p>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  Enter a city or area on the left and click Search
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {QUICK_LOCATIONS.slice(0, 4).map((p) => (
                    <button key={p} onClick={() => doSearch(p)} className="btn-outline text-sm">{p}</button>
                  ))}
                </div>
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
              <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
                Your shortlist is empty
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Browse venues and click "Save" to add your favourites here.
              </p>
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
                      <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>
                        {venue.name}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        <button
                          className="text-xs px-2 py-1 rounded border-2 transition-all"
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
                          onClick={() => setVenueShortlist((prev) => prev.filter((v) => v.id !== venue.id))}
                          className="text-xs px-2 py-1 rounded border-2"
                          style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>📍 {venue.location}</p>
                    {venue.priceRange && venue.priceRange !== 'Contact for pricing' && (
                      <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>💰 {venue.priceRange}</p>
                    )}

                    <div className="mb-3">
                      <label className="label text-xs">Your Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
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

                    <button
                      className="btn-primary w-full text-sm"
                      onClick={() => { setBookingVenue(venue); setBookingDate(weddingDate || '') }}
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
                { label: 'Price Range', key: 'priceRange' },
                { label: 'Rating', key: 'rating', fmt: (v) => v > 0 ? `★ ${v.toFixed(1)}` : 'N/A' },
                { label: 'Contact', key: 'contact', fmt: (v) => v || '—' },
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

      {/* Book This Venue Modal */}
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