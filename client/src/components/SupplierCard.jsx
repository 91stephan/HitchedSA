import { useApp } from '../context/AppContext'
import Icon from './Icon'

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm">
      <Icon name="star" size={14} filled style={{ color: 'var(--color-accent)' }} />
      <span style={{ color: 'var(--color-text)' }}>{rating.toFixed(1)}</span>
    </span>
  )
}

export default function SupplierCard({ supplier, categoryImage }) {
  const { supplierShortlist, setSupplierShortlist } = useApp()
  const isShortlisted = supplierShortlist.some((s) => s.id === supplier.id)

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${supplier.mapsQuery}`

  const toggle = () => {
    setSupplierShortlist((prev) =>
      isShortlisted ? prev.filter((s) => s.id !== supplier.id) : [...prev, supplier]
    )
  }

  return (
    <div className="card animate-fade-in">
      {/* Category image banner */}
      <div className="rounded-xl mb-4 h-28 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
        {categoryImage && (
          <img
            src={categoryImage}
            alt=""
            width="400"
            height="112"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-display font-semibold text-base leading-tight" style={{ color: 'var(--color-text)' }}>
          {supplier.name}
        </h3>
        <StarRating rating={supplier.rating} />
      </div>

      <p className="text-xs mb-1 flex items-start gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
        <Icon name="map" size={13} className="shrink-0 mt-0.5" />
        <span>{supplier.location}</span>
      </p>
      {supplier.speciality && (
        <p className="text-xs mb-3 flex items-start gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
          <Icon name="clipboard" size={13} className="shrink-0 mt-0.5" />
          <span>{supplier.speciality}</span>
        </p>
      )}

      <div className="mb-4">
        <span className="tag" style={{ background: 'var(--color-primary-light)' }}>{supplier.priceRange}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
        >
          <Icon name="map" size={14} /> Maps
        </a>
        {supplier.contact && (
          <a
            href={`tel:${supplier.contact}`}
            className="btn-ghost text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
            title={supplier.contact}
          >
            <Icon name="phone" size={14} /> {supplier.contact}
          </a>
        )}
        <button
          onClick={toggle}
          className="text-xs px-3 py-1.5 rounded-lg border-2 transition-all ml-auto inline-flex items-center gap-1.5"
          style={{
            borderColor: 'var(--color-primary)',
            background: isShortlisted ? 'var(--color-primary)' : 'transparent',
            color: isShortlisted ? 'var(--color-button-text)' : 'var(--color-primary)',
          }}
        >
          <Icon name="heart" size={14} filled={isShortlisted} />
          {isShortlisted ? 'Saved' : 'Shortlist'}
        </button>
      </div>
    </div>
  )
}
