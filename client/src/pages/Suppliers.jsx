import { useState } from 'react'
import SupplierCard from '../components/SupplierCard'
import SupplierIllustration from '../components/illustrations/SupplierIllustration'
import AdBanner from '../components/AdBanner'
import FloralDivider from '../components/FloralDivider'
import { SAMPLE_SUPPLIERS } from '../hooks/useSampleData'

const CATEGORIES = [
  { id: 'photographers', label: 'Photographers', icon: '📸' },
  { id: 'djs', label: 'DJs', icon: '🎵' },
  { id: 'florists', label: 'Florists', icon: '💐' },
  { id: 'caterers', label: 'Caterers', icon: '🍽️' },
  { id: 'makeup', label: 'Makeup Artists', icon: '💄' },
  { id: 'cakes', label: 'Wedding Cakes', icon: '🎂' },
  { id: 'cars', label: 'Car Hire', icon: '🚗' },
  { id: 'decor', label: 'Décor Hire', icon: '✨' },
]

export default function Suppliers() {
  const [activeCategory, setActiveCategory] = useState('photographers')

  const suppliers = SAMPLE_SUPPLIERS[activeCategory] || []
  const category = CATEGORIES.find((c) => c.id === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="section-title">Suppliers</h1>
      <p className="section-subtitle">Discover South Africa's finest wedding suppliers</p>

      {/* Category Tabs — scrollable on mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`tab-btn whitespace-nowrap flex items-center gap-1.5 ${activeCategory === cat.id ? 'active' : ''}`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Grid */}
        <div className="flex-1">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Showing {suppliers.length} {category?.label?.toLowerCase()} in South Africa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                categoryIcon={category?.icon}
              />
            ))}
          </div>

          {suppliers.length === 0 && (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4"><SupplierIllustration size={160} /></div>
              <p className="font-display text-xl" style={{ color: 'var(--color-heading)' }}>No suppliers listed yet</p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                {/* GOOGLE PLACES API - wire up supplier search later */}
                More suppliers coming soon via Google Places integration.
              </p>
            </div>
          )}

          {/* AD SLOT - ADSENSE */}
          <div className="mt-8">
            <FloralDivider />
            <AdBanner slot="suppliers-bottom" size="leaderboard" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0 space-y-4">
          {/* Info card */}
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

          {/* AD SLOT - ADSENSE */}
          <AdBanner slot="suppliers-sidebar" size="sidebar" />

          <div className="card text-center p-4" style={{ background: 'var(--color-surface)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {/* SUPABASE - wire up supplier submissions later */}
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
