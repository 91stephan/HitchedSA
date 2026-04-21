import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CountdownClock from '../components/CountdownClock'
import FloralDivider from '../components/FloralDivider'
import WeddingRingsIllustration from '../components/illustrations/WeddingRingsIllustration'
import VenueIllustration from '../components/illustrations/VenueIllustration'
import SupplierIllustration from '../components/illustrations/SupplierIllustration'
import IdeasIllustration from '../components/illustrations/IdeasIllustration'
import GuestIllustration from '../components/illustrations/GuestIllustration'
import BudgetIllustration from '../components/illustrations/BudgetIllustration'
import ChecklistIllustration from '../components/illustrations/ChecklistIllustration'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80'

function QuickStatCard({ illustration, label, value, sub, to }) {
  const content = (
    <div className="stat-card group cursor-pointer">
      <div className="mb-1">{illustration}</div>
      <div className="font-display text-3xl font-bold" style={{ color: 'var(--color-heading)' }}>{value}</div>
      <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-heading)', opacity: 0.75 }}>{label}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{sub}</div>}
    </div>
  )
  return to ? <Link to={to} className="block">{content}</Link> : content
}

function QuickLink({ illustration, label, description, to }) {
  return (
    <Link
      to={to}
      className="card flex items-center gap-4 hover:shadow-lg cursor-pointer group"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent-light))' }}
      >
        {illustration}
      </div>
      <div>
        <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{label}</div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{description}</div>
      </div>
      <div
        className="ml-auto w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:translate-x-1"
        style={{ background: 'var(--color-surface)', color: 'var(--color-primary)' }}
      >
        →
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const {
    partners, weddingDate,
    guestCount, confirmedCount,
    totalSpent, budgetTotal, budgetProgress,
    checklistProgress, checklistDone, checklistTotal,
  } = useApp()
  const navigate = useNavigate()

  const formattedDate = weddingDate
    ? new Date(weddingDate).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const partnerTitle = partners.partner1 && partners.partner2
    ? `${partners.partner1} & ${partners.partner2}`
    : 'Your Wedding'

  const budgetUsedFormatted = `R${totalSpent.toLocaleString('en-ZA')}`
  const budgetTotalFormatted = `R${budgetTotal.toLocaleString('en-ZA')}`

  return (
    <div>
      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: weddingDate ? 420 : 320 }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16">
          <p className="font-vibes text-5xl md:text-6xl mb-2 text-white drop-shadow-lg" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            {partnerTitle}
          </p>

          {weddingDate ? (
            <>
              <p className="text-white/80 text-sm mb-8 font-medium tracking-wide uppercase">
                {formattedDate}
              </p>
              <CountdownClock targetDate={weddingDate} />
            </>
          ) : (
            <div className="mt-4">
              <p className="text-white/85 text-lg font-display italic mb-6">
                Still planning the perfect day ✨
              </p>
              <button
                onClick={() => navigate('/venues')}
                className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  border: '2px solid rgba(255,255,255,0.7)',
                  color: '#fff',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Find Your Venue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <QuickStatCard illustration={<GuestIllustration size={36} />} label="Guests" value={guestCount} sub={`${confirmedCount} confirmed`} to="/guests" />
          <QuickStatCard illustration={<BudgetIllustration size={36} />} label="Budget Used" value={budgetUsedFormatted} sub={`of ${budgetTotalFormatted}`} to="/budget" />
          <QuickStatCard illustration={<ChecklistIllustration size={36} />} label="Checklist" value={`${checklistProgress}%`} sub={`${checklistDone} of ${checklistTotal} done`} to="/checklist" />
          <QuickStatCard illustration={<VenueIllustration size={36} />} label="Venue" value={weddingDate ? '✓' : '—'} sub={weddingDate ? 'Booked' : 'Not set'} to="/venues" />
        </div>

        <FloralDivider />

        {/* Budget progress */}
        <div className="card mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--color-accent)' }}>Budget Overview</h2>
            <Link to="/budget" className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>View Details →</Link>
          </div>
          <div className="progress-bar-track mb-3">
            <div className="progress-bar-fill" style={{ width: `${budgetProgress}%` }} />
          </div>
          <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>{budgetUsedFormatted} spent</span>
            <span>{budgetTotalFormatted} total budget</span>
          </div>
        </div>

        {/* Quick Links */}
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--color-heading)' }}>
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <QuickLink illustration={<VenueIllustration size={56} />} label="Venue Search" description="Find and shortlist South African venues" to="/venues" />
          <QuickLink illustration={<SupplierIllustration size={56} />} label="Suppliers" description="Photographers, florists, DJs & more" to="/suppliers" />
          <QuickLink illustration={<IdeasIllustration size={56} />} label="Ideas Board" description="Save inspiration and mood boards" to="/ideas" />
          <QuickLink illustration={<GuestIllustration size={56} />} label="Guest List" description="Manage RSVPs and dietary requirements" to="/guests" />
          <QuickLink illustration={<BudgetIllustration size={56} />} label="Budget Tracker" description="Allocate and track your wedding spend" to="/budget" />
          <QuickLink illustration={<ChecklistIllustration size={56} />} label="Checklist" description="Never miss an important task" to="/checklist" />
        </div>

        <FloralDivider />

        {/* Weather Widget Placeholder */}
        <div
          className="card p-8 text-center"
          style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}
        >
          <div className="text-4xl mb-3 opacity-50">☁</div>
          <p className="font-display text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
            Wedding Day Weather
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {/* WEATHER WIDGET - wire up later */}
            Forecast for your wedding day will appear here once your date and venue are confirmed.
          </p>
        </div>
      </div>
    </div>
  )
}
