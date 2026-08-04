import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Icon from '../components/Icon'
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
import PageBackdrop from '../components/PageBackdrop'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80'

const OWM_KEY = import.meta.env.VITE_OPENWEATHER_KEY

// Shown as a preview before a couple has booked their venue, so the weather
// card is never empty. The moment a venue is booked, its location takes over.
const DEFAULT_CITY = 'Cape Town'

// Map an OpenWeather condition id to an on-brand SVG icon, a soft sky gradient
// for the header, and an accent colour, so we never fall back to OWM's raster
// PNGs. Ranges follow the OWM condition-code groups.
function skyFor(id) {
  if (id >= 200 && id < 300)    return { icon: 'storm',    gradient: 'linear-gradient(135deg,#E7ECF3,#D5DFEA)', color: '#5B6B99' }
  if (id >= 300 && id < 600)    return { icon: 'rain',     gradient: 'linear-gradient(135deg,#EAF1F7,#D9E6F0)', color: '#5B7C99' }
  if (id >= 600 && id < 700)    return { icon: 'snow',     gradient: 'linear-gradient(135deg,#F1F7FB,#E5F0F7)', color: '#7FA6C4' }
  if (id >= 700 && id < 800)    return { icon: 'fog',      gradient: 'linear-gradient(135deg,#F0F2F5,#E3E8ED)', color: '#8A93A0' }
  if (id === 800)               return { icon: 'sun',      gradient: 'linear-gradient(135deg,#FFF7E9,#FBEDCF)', color: '#E0A93B' }
  if (id === 801 || id === 802) return { icon: 'cloudSun', gradient: 'linear-gradient(135deg,#FBF6EC,#F1F1F1)', color: '#C99A4C' }
  return { icon: 'cloud', gradient: 'linear-gradient(135deg,#F1F3F6,#E6ECF1)', color: '#7C8B9B' }
}

// Turn a day's forecast into one line of plain planning advice.
function weddingVerdict(d) {
  if (!d) return null
  const rain = d.pop != null ? Math.round(d.pop * 100) : 0
  const stormy = d.conditionId >= 200 && d.conditionId < 600
  if (stormy || rain >= 60) return 'Rain looks likely. Line up a wet-weather backup so the day runs smoothly.'
  if (rain >= 30) return `About a ${rain}% chance of rain. Worth keeping a plan B ready, just in case.`
  if (d.hi != null && d.hi >= 30) return 'A warm one is on the cards. Plan for shade and plenty of water for your guests.'
  if (d.lo != null && d.lo <= 10) return 'Cooler conditions expected. Heaters or blankets will keep the evening comfortable.'
  if (d.conditionId === 800 && d.temp >= 16 && d.temp <= 28) return 'Beautiful conditions for an outdoor celebration.'
  return 'Mild, settled conditions look set for your day.'
}

function WeatherStat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 py-3 px-2 text-center">
      <Icon name={icon} size={16} style={{ color: 'var(--color-primary)' }} />
      <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</div>
      <div className="text-[11px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
    </div>
  )
}

// One compact cell in the this-week outlook strip.
function ForecastDay({ day, label, highlight }) {
  const sky = skyFor(day.conditionId)
  const rain = Math.round((day.pop || 0) * 100)
  return (
    <div className="flex flex-col items-center gap-1 py-2 rounded-lg" style={highlight ? { background: 'var(--color-primary-light)' } : undefined}>
      <div className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: highlight ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{label}</div>
      <Icon name={sky.icon} size={22} strokeWidth={1.6} style={{ color: sky.color }} />
      <div className="text-xs font-bold leading-none" style={{ color: 'var(--color-text)' }}>{day.hi}°</div>
      <div className="text-[10px] leading-none" style={{ color: 'var(--color-text-muted)' }}>{day.lo}°</div>
      <div className="text-[10px] leading-none" style={{ color: rain >= 10 ? '#5B7C99' : 'transparent' }}>{rain >= 10 ? `${rain}%` : '0%'}</div>
    </div>
  )
}

function WeatherWidget({ venueLocation, weddingDate }) {
  const [data, setData] = useState(null) // { cityName, days: [...] }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Until a venue is booked we preview a default city; once it is, the real
  // venue location drives the forecast automatically.
  const isSample = !venueLocation
  const city = venueLocation ? venueLocation.split(',')[0].trim() : DEFAULT_CITY

  useEffect(() => {
    if (!OWM_KEY || !city) return

    setLoading(true)
    setError(null)

    // Always pull the free 5-day / 3-hour forecast, then fold the 3-hour slots
    // into one entry per calendar day so we can show a whole week at a glance.
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${OWM_KEY}&units=metric`)
      .then((r) => r.json())
      .then((res) => {
        if (String(res.cod) !== '200' || !res.list) throw new Error(res.message || 'Weather unavailable')

        const byDay = {}
        res.list.forEach((e) => {
          const date = e.dt_txt?.slice(0, 10)
          if (!date) return
          if (!byDay[date]) byDay[date] = []
          byDay[date].push(e)
        })

        const days = Object.entries(byDay).map(([date, entries]) => {
          // Midday slot is the most representative of a day's conditions.
          const midday = entries.reduce((best, e) =>
            Math.abs(Number(e.dt_txt.slice(11, 13)) - 12) < Math.abs(Number(best.dt_txt.slice(11, 13)) - 12) ? e : best
          , entries[0])
          return {
            date,
            temp: Math.round(midday.main?.temp),
            feelsLike: Math.round(midday.main?.feels_like),
            humidity: midday.main?.humidity,
            windSpeed: Math.round((midday.wind?.speed || 0) * 3.6),
            conditionId: midday.weather?.[0]?.id,
            description: midday.weather?.[0]?.description,
            hi: Math.round(Math.max(...entries.map((e) => e.main?.temp_max))),
            lo: Math.round(Math.min(...entries.map((e) => e.main?.temp_min))),
            pop: Math.max(...entries.map((e) => e.pop || 0)),
          }
        }).slice(0, 6)

        setData({ cityName: res.city?.name || city, days })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [city, weddingDate])

  // Only when weather can't be shown at all (no API key) do we fall back to a
  // prompt to add a venue.
  if (!OWM_KEY) {
    return (
      <div className="card p-8 text-center" style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
        <div className="flex justify-center mb-3"><Icon name="cloudSun" size={44} style={{ color: 'var(--color-primary)' }} /></div>
        <p className="font-display text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
          Wedding Day Weather
        </p>
        <p className="text-sm mb-4 max-w-xs mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Add your venue location to see the forecast for your wedding.
        </p>
        <Link to="/venues" className="btn-primary text-sm inline-block">Add venue location</Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card p-8 text-center" style={{ background: 'var(--color-surface)' }}>
        <div className="flex justify-center mb-2 animate-pulse"><Icon name="cloudSun" size={28} style={{ color: 'var(--color-primary)' }} /></div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Checking the skies over {city}...
        </p>
      </div>
    )
  }

  if (error || !data || !data.days.length) {
    return (
      <div className="card p-6 text-center" style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
        <div className="flex justify-center mb-3 opacity-40"><Icon name="cloud" size={40} /></div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Could not load weather for "{city}". Check your location or try again later.
        </p>
      </div>
    )
  }

  const todayStr = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD, local
  const days = data.days
  const weddingDay = (!isSample && weddingDate) ? days.find((d) => d.date === weddingDate) : null
  const headline = weddingDay || days[0]
  const sky = skyFor(headline.conditionId)
  const isWeddingHeadline = !!weddingDay
  const verdict = isWeddingHeadline ? weddingVerdict(headline) : null
  const daysUntil = weddingDate
    ? Math.ceil((new Date(weddingDate + 'T12:00:00') - new Date()) / 864e5)
    : null
  const weddingBeyondRange = !isSample && weddingDate && !weddingDay && daysUntil != null && daysUntil >= 0
  const when = isWeddingHeadline
    ? (daysUntil <= 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`)
    : null

  const labelFor = (dateStr) =>
    dateStr === todayStr ? 'Today' : new Date(dateStr + 'T12:00:00').toLocaleDateString('en-ZA', { weekday: 'short' })

  return (
    <div className="card p-0 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Sky header, tinted to the headline day's conditions */}
      <div className="p-5" style={{ background: sky.gradient }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-base" style={{ color: 'var(--color-heading)' }}>
                {isSample ? 'Weather This Week' : isWeddingHeadline ? 'Wedding Day Forecast' : 'This Week at Your Venue'}
              </h3>
              {isSample && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  Preview
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5 inline-flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              <Icon name="map" size={13} /> {data.cityName}{when ? ` · ${when}` : ''}
            </p>
          </div>
          <Icon name={sky.icon} size={46} strokeWidth={1.6} style={{ color: sky.color }} />
        </div>

        <div className="flex items-end gap-3 mt-3">
          <div className="font-display text-5xl font-bold leading-none" style={{ color: 'var(--color-text)' }}>
            {headline.temp}°
          </div>
          <div className="pb-1">
            <div className="text-sm capitalize" style={{ color: 'var(--color-text)' }}>{headline.description}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              High {headline.hi}° · Low {headline.lo}° · feels {headline.feelsLike}°
            </div>
          </div>
        </div>
      </div>

      {/* Stat row for the headline day */}
      <div className="grid grid-cols-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <WeatherStat icon="rain" label="Chance of rain" value={`${Math.round((headline.pop || 0) * 100)}%`} />
        <div style={{ borderLeft: '1px solid var(--color-border)' }}>
          <WeatherStat icon="droplet" label="Humidity" value={`${headline.humidity}%`} />
        </div>
        <div style={{ borderLeft: '1px solid var(--color-border)' }}>
          <WeatherStat icon="wind" label="Wind" value={`${headline.windSpeed} km/h`} />
        </div>
      </div>

      {/* This-week outlook strip */}
      <div className="px-4 pt-4 pb-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-muted)' }}>
          This week
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
          {days.map((d) => (
            <ForecastDay key={d.date} day={d} label={labelFor(d.date)} highlight={!!weddingDay && d.date === weddingDay.date} />
          ))}
        </div>
      </div>

      {/* Sample prompt, wedding-day advice, or a note that the forecast is still coming */}
      {isSample ? (
        <div className="px-5 py-3 text-xs text-center" style={{ background: 'var(--color-primary-light)', color: 'var(--color-text-muted)' }}>
          Showing {data.cityName} as a preview.{' '}
          <Link to="/venues" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Add your venue</Link>
          {' '}to see your own wedding-day forecast.
        </div>
      ) : verdict ? (
        <div className="px-5 py-3 text-sm flex items-start gap-2" style={{ background: 'var(--color-primary-light)', color: 'var(--color-text)' }}>
          <span className="shrink-0 mt-0.5"><Icon name="heart" size={14} style={{ color: 'var(--color-primary)' }} /></span>
          <span>{verdict}</span>
        </div>
      ) : weddingBeyondRange ? (
        <div className="px-5 py-3 text-xs text-center" style={{ background: 'var(--color-primary-light)', color: 'var(--color-text-muted)' }}>
          Your wedding is {daysUntil} days away. The wedding-day forecast appears here within 5 days of the date.
        </div>
      ) : null}
    </div>
  )
}

function QuickStatCard({ illustration, label, value, sub, to, valueColor }) {
  const content = (
    <div className="stat-card group cursor-pointer h-full">
      <div className="mb-1">{illustration}</div>
      <div className="font-display text-3xl font-bold flex items-center min-h-[2.25rem]" style={{ color: valueColor || 'var(--color-heading)' }}>{value}</div>
      <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-heading)', opacity: 0.75 }}>{label}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{sub}</div>}
    </div>
  )
  return to ? <Link to={to} className="block h-full">{content}</Link> : content
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
  const isOverBudget = totalSpent > budgetTotal
  const overBy = totalSpent - budgetTotal

  return (
    <div>
      <PageBackdrop src="/images/venue-types/garden.jpg" />
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
              <p className="text-white/85 text-lg font-display italic mb-6 inline-flex items-center justify-center gap-1.5">
                Still planning the perfect day <Icon name="sparkles" size={18} />
              </p>
              <button
                onClick={() => navigate('/venues')}
                className="px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
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
          <QuickStatCard illustration={<BudgetIllustration size={36} />} label="Budget Used" value={budgetUsedFormatted} sub={isOverBudget ? `R${overBy.toLocaleString('en-ZA')} over budget` : `of ${budgetTotalFormatted}`} to="/budget" valueColor={isOverBudget ? 'var(--color-danger)' : undefined} />
          <QuickStatCard illustration={<ChecklistIllustration size={36} />} label="Checklist" value={`${checklistProgress}%`} sub={`${checklistDone} of ${checklistTotal} done`} to="/checklist" />
          <QuickStatCard illustration={<VenueIllustration size={36} />} label="Venue" value={weddingDate ? <Icon name="check" size={30} /> : '–'} sub={weddingDate ? 'Booked' : 'Not set'} to="/venues" />
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
            <div
              className="progress-bar-fill"
              style={{ width: `${budgetProgress}%`, ...(isOverBudget ? { background: 'var(--color-danger)' } : {}) }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span style={isOverBudget ? { color: 'var(--color-danger)', fontWeight: 600 } : undefined}>
              {budgetUsedFormatted} spent{isOverBudget ? ' (over budget)' : ''}
            </span>
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
