import { useState } from 'react'
import { useApp } from '../context/AppContext'

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold">
      <span style={{ color: 'var(--color-accent)' }}>★</span>
      <span style={{ color: 'var(--color-text)' }}>{rating.toFixed(1)}</span>
    </span>
  )
}

export default function VenueCard({ venue, onAddShortlist, onCompareToggle, compareSelected, showCompare }) {
  const { venueShortlist } = useApp()
  const [imgError, setImgError] = useState(false)
  const isShortlisted = venueShortlist.some((v) => v.id === venue.id)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${venue.mapsQuery}`

  return (
    <div className="card p-0 overflow-hidden animate-fade-in flex flex-col">
      {/* Venue image */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        {venue.image && !imgError ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent-light))' }}
          >
            🏛️
          </div>
        )}
        {/* Rating badge overlay */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md"
          style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--color-text)' }}
        >
          <span style={{ color: 'var(--color-accent)' }}>★</span>
          {venue.rating.toFixed(1)}
        </div>
        {isShortlisted && (
          <div
            className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center shadow-md text-sm"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            ♥
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-base mb-1 leading-tight" style={{ color: 'var(--color-text)' }}>
          {venue.name}
        </h3>
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
          📍 {venue.location}
        </p>
        <p className="text-xs mb-3 leading-relaxed flex-1" style={{ color: 'var(--color-text-muted)' }}>
          {venue.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {venue.capacity > 0 && <span className="tag">👥 {venue.capacity} guests</span>}
          <span className="tag" style={{ background: 'var(--color-primary-light)', color: 'var(--color-text)' }}>
            {venue.priceRange}
          </span>
          {venue.catering && <span className="tag">🍽️ Catering</span>}
          {venue.accommodation && <span className="tag">🛏️ Stay</span>}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs px-4 py-2"
          >
            🗺️ Maps
          </a>
          {venue.contact && (
            <a
              href={`tel:${venue.contact}`}
              className="btn-ghost text-xs px-3 py-2"
            >
              📞 Call
            </a>
          )}
          {showCompare && (
            <button
              onClick={() => onCompareToggle(venue)}
              className="text-xs px-3 py-2 rounded-full border-2 transition-all font-semibold"
              style={{
                borderColor: 'var(--color-accent)',
                background: compareSelected ? 'var(--color-accent)' : 'transparent',
                color: compareSelected ? '#fff' : 'var(--color-accent)',
              }}
            >
              {compareSelected ? '✓ Compare' : '⚖️'}
            </button>
          )}
          <button
            onClick={() => onAddShortlist(venue)}
            className="text-xs px-4 py-2 rounded-full border-2 transition-all font-semibold ml-auto"
            style={{
              borderColor: 'var(--color-primary)',
              background: isShortlisted
                ? 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, var(--color-accent)))'
                : 'transparent',
              color: isShortlisted ? 'var(--color-button-text)' : 'var(--color-primary)',
            }}
          >
            {isShortlisted ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
