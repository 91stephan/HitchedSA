import { useApp } from '../context/AppContext'

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm">
      <span style={{ color: 'var(--color-accent)' }}>★</span>
      <span style={{ color: 'var(--color-text)' }}>{rating.toFixed(1)}</span>
    </span>
  )
}

export default function SupplierCard({ supplier, categoryIcon }) {
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
      {/* Avatar placeholder */}
      <div
        className="rounded-xl mb-4 h-28 flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent-light))' }}
      >
        {categoryIcon}
      </div>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-display font-semibold text-base leading-tight" style={{ color: 'var(--color-text)' }}>
          {supplier.name}
        </h3>
        <StarRating rating={supplier.rating} />
      </div>

      <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
        📍 {supplier.location}
      </p>
      {supplier.speciality && (
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
          💼 {supplier.speciality}
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
          className="btn-outline text-xs px-3 py-1.5 inline-flex items-center gap-1"
        >
          🗺️ Maps
        </a>
        <a
          href={`tel:${supplier.contact}`}
          className="btn-ghost text-xs px-3 py-1.5 inline-flex items-center gap-1"
        >
          📞 Contact
        </a>
        <button
          onClick={toggle}
          className="text-xs px-3 py-1.5 rounded-lg border-2 transition-all ml-auto"
          style={{
            borderColor: 'var(--color-primary)',
            background: isShortlisted ? 'var(--color-primary)' : 'transparent',
            color: isShortlisted ? 'var(--color-button-text)' : 'var(--color-primary)',
          }}
        >
          {isShortlisted ? '♥ Saved' : '♡ Shortlist'}
        </button>
      </div>
    </div>
  )
}
