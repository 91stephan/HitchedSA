import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CountdownClock from '../components/CountdownClock'
import FloralDivider from '../components/FloralDivider'
import AdBanner from '../components/AdBanner'
import WeddingRingsIllustration from '../components/illustrations/WeddingRingsIllustration'
import VenueIllustration from '../components/illustrations/VenueIllustration'
import SupplierIllustration from '../components/illustrations/SupplierIllustration'
import IdeasIllustration from '../components/illustrations/IdeasIllustration'
import GuestIllustration from '../components/illustrations/GuestIllustration'
import BudgetIllustration from '../components/illustrations/BudgetIllustration'
import ChecklistIllustration from '../components/illustrations/ChecklistIllustration'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80'

const OWM_KEY = import.meta.env.VITE_OPENWEATHER_KEY

function WeatherWidget({ venueLocation, weddingDate }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!venueLocation || !OWM_KEY) return
    const city = venueLocation.split(',')[0].trim()
    if (!city) return

    setLoading(true)
    setError(null)

    const daysUntil = weddingDate
      ? Math.ceil((new Date(weddingDate) - new Date()) / 864e5)
      : null

    const useForecast = daysUntil !== null && daysUntil >= 0 && daysUntil <= 5
    const endpoint = useForecast
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${OWM_KEY}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OWM_KEY}&units=metric`

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        const cod = String(data.cod)
        if (cod !== '200') throw new Error(data.message || 'Weather unavailable')

        if (useForecast && data.list) {
          const entry = data.list.find((item) => item.dt_txt?.startsWith(weddingDate)) || data.list[0]
          setWeather({ ...entry, cityName: data.city?.name || city, isForecast: true, daysUntil })
        } else {
          setWeather({
            main: data.main,
            weather: data.weather,
            wind: data.wind,
            cityName: data.name || city,
            isForecast: false,
            daysUntil,
          })
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [venueLocation, weddingDate])

  if (!venueLocation) {
    return (
      <div className="card p-8 text-center" style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
        <div className="text-4xl mb-3 opacity-40">☁</div>
        <p className="font-display text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
          Wedding Day Weather
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Book a venue to see weather forecasts for your wedding location.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card p-8 text-center" style={{ background: 'var(--color-surface)' }}>
        <p className="text-2xl mb-2">☁</p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Loading weather for {venueLocation.split(',')[0]}...
        </p>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="card p-6 text-center" style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
        <div className="text-4xl mb-3 opacity-40">☁</div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Could not load weather for "{venueLocation.split(',')[0]}". Check your location or try again later.
        </p>
      </div>
    )
  }

  const w = weather.weather?.[0]
  const temp = Math.round(weather.main?.temp)
  const feelsLike = Math.round(weather.main?.feels_like)
  const humidity = weather.main?.humidity
  const windSpeed = Math.round((weather.wind?.speed || 0) * 3.6)
  const iconUrl = w?.icon ? `https://openweathermap.org/img/wn/${w.icon}@2x.png` : null

  return (
    <div className="card" style={{ background: 'var(--color-surface)' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-base" style={{ color: 'var(--color-accent)' }}>
            {weather.isForecast ? 'Wedding Day Forecast' : 'Current Weather'}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            📍 {weather.cityName}
            {weather.isForecast && weather.daysUntil !== null && (
              <span> · {weather.daysUntil === 0 ? 'Today!' : weather.daysUntil === 1 ? 'Tomorrow!' : `In ${weather.daysUntil} days`}</span>
            )}
          </p>
        </div>
        {iconUrl && (
          <img src={iconUrl} alt={w?.description} className="w-14 h-14 object-contain -mt-1" />
        )}
      </div>

      <div className="flex items-end gap-6 mb-4">
        <div>
          <div className="font-display text-5xl font-bold leading-none" style={{ color: 'var(--color-primary)' }}>
            {temp}°C
          </div>
          <div className="text-sm capitalize mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
            {w?.description || w?.main}
          </div>
        </div>
        <div className="ml-auto text-right space-y-1 pb-1">
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Feels like {feelsLike}°C</div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>💧 Humidity {humidity}%</div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>💨 Wind {windSpeed} km/h</div>
        </div>
      </div>

      {!weather.isForecast && weddingDate && (
        <div
          className="text-xs p-3 rounded-lg text-center"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-text-muted)' }}
        >
          5-day forecast becomes available within 5 days of your wedding date
        </div>
      )}
    </div>
  )
}

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
    partners, weddingDate, venueLocation,
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

        <AdBanner slot="dashboard-top" size="leaderboard" className="mb-6" />

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

        <AdBanner slot="dashboard-mid" size="leaderboard" className="mb-6" />

        <FloralDivider />

        <WeatherWidget venueLocation={venueLocation} weddingDate={weddingDate} />
      </div>
    </div>
  )
}
