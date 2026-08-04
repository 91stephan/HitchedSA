import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from './Icon'

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold">
      <Icon name="star" size={14} filled style={{ color: 'var(--color-accent)' }} />
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
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent-light))' }}
          >
            <Icon name="building" size={40} style={{ color: 'var(--color-text-muted)' }} />
          </div>
        )}
        {/* Rating badge overlay */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold shadow-md"
          style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--color-text)' }}
        >
          <Icon name="star" size={14} filled style={{ color: 'var(--color-accent)' }} />
          {venue.rating.toFixed(1)}
        </div>
        {isShortlisted && (
          <div
            className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            <Icon name="heart" size={14} filled />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-base mb-1 leading-tight" style={{ color: 'var(--color-text)' }}>
          {venue.name}
        </h3>
        <p className="text-xs mb-2 inline-flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
          <Icon name="map" size={13} /> {venue.location}
        </p>
        <p className="text-xs mb-3 leading-relaxed flex-1" style={{ color: 'var(--color-text-muted)' }}>
          {venue.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {venue.capacity > 0 && <span className="tag inline-flex items-center gap-1.5"><Icon name="users" size={13} /> {venue.capacity} guests</span>}
          <span className="tag" style={{ background: 'var(--color-primary-light)', color: 'var(--color-text)' }}>
            {venue.priceRange}
          </span>
          {venue.catering && <span className="tag inline-flex items-center gap-1.5"><Icon name="utensils" size={13} /> Catering</span>}
          {venue.accommodation && <span className="tag inline-flex items-center gap-1.5"><Icon name="bed" size={13} /> Stay</span>}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs px-4 py-2 inline-flex items-center gap-1.5"
          >
            <Icon name="map" size={14} /> Maps
          </a>
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs px-3 py-2 inline-flex items-center gap-1.5"
            >
              <Icon name="globe" size={14} /> Website
            </a>
          )}
          {venue.contact && (
            <a
              href={`tel:${venue.contact}`}
              className="btn-ghost text-xs px-3 py-2 inline-flex items-center gap-1.5"
              title={venue.contact}
            >
              <Icon name="phone" size={14} /> {venue.contact}
            </a>
          )}
          {showCompare && (
            <button
              onClick={() => onCompareToggle(venue)}
              className="text-xs px-3 py-2 rounded-lg border-2 transition-all font-semibold inline-flex items-center gap-1.5"
              title="Select 2–3 venues to compare side by side"
              style={{
                borderColor: 'var(--color-accent)',
                background: compareSelected ? 'var(--color-accent)' : 'transparent',
                color: compareSelected ? '#fff' : 'var(--color-accent)',
              }}
            >
              {compareSelected ? <Icon name="check" size={14} /> : <Icon name="compare" size={14} />} Compare
            </button>
          )}
          <button
            onClick={() => onAddShortlist(venue)}
            className="text-xs px-4 py-2 rounded-lg border-2 transition-all font-semibold ml-auto inline-flex items-center gap-1.5"
            style={{
              borderColor: 'var(--color-primary)',
              background: isShortlisted
                ? 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, var(--color-accent)))'
                : 'transparent',
              color: isShortlisted ? 'var(--color-button-text)' : 'var(--color-primary)',
            }}
          >
            <Icon name="heart" size={14} filled={isShortlisted} /> {isShortlisted ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
