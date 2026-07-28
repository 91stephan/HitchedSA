// Read-only previews of the real planner tools, built from DEMO_* sample data.
// They reuse the production design-system classes and CSS variables so what a
// visitor sees here matches the actual app. Nothing is interactive: there are
// no handlers and no context, so the panels are inherently read-only.
import { useState, useEffect } from 'react'
import Icon from '../Icon'
import CountdownClock from '../CountdownClock'
import {
  DEMO_PARTNERS, DEMO_WEDDING_DATE, DEMO_VENUE_LOCATION,
  DEMO_GUESTS, DEMO_BUDGET, DEMO_CHECKLIST, DEMO_TABLES, DEMO_IDEAS,
  DEMO_STATS, demoMoney,
} from '../../content/demoData'

const prettyDate = new Date(DEMO_WEDDING_DATE).toLocaleDateString('en-ZA', {
  day: 'numeric', month: 'long', year: 'numeric',
})

function RsvpBadge({ rsvp }) {
  const map = {
    confirmed: { label: 'Confirmed', color: 'var(--color-success)' },
    pending: { label: 'Pending', color: 'var(--color-warning)' },
    declined: { label: 'Declined', color: 'var(--color-danger)' },
  }
  const s = map[rsvp] || map.pending
  return (
    <span
      className="badge text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color }}
    >
      {s.label}
    </span>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  )
}

// Renders the live countdown only after mount. During prerender the clock would
// compute build-time seconds that never match the client, so we hold a fixed
// day count until hydration, then swap in the ticking clock.
function DemoCountdown() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    const days = Math.max(0, Math.round((new Date(DEMO_WEDDING_DATE).getTime() - new Date('2026-07-28').getTime()) / 86400000))
    return (
      <p className="text-center font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>
        {days} days to go
      </p>
    )
  }
  return <CountdownClock targetDate={DEMO_WEDDING_DATE} light={false} />
}

// ── Dashboard ───────────────────────────────────────────────────────────────
export function DemoDashboardPanel() {
  const s = DEMO_STATS
  const stats = [
    { icon: 'users', label: 'Guests', value: `${s.confirmed}/${s.guestCount}`, sub: 'confirmed' },
    { icon: 'wallet', label: 'Budget used', value: demoMoney(s.totalSpent), sub: `of ${demoMoney(s.budgetTotal)}` },
    { icon: 'clipboard', label: 'Checklist', value: `${s.checklistDone}/${s.checklistTotal}`, sub: 'tasks done' },
    { icon: 'building', label: 'Venue', value: 'Stellenbosch', sub: 'Western Cape' },
  ]
  return (
    <div className="p-5">
      <div className="text-center mb-5">
        <p className="font-vibes text-4xl mb-1" style={{ color: 'var(--color-primary)' }}>
          {DEMO_PARTNERS.partner1} &amp; {DEMO_PARTNERS.partner2}
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {prettyDate} · {DEMO_VENUE_LOCATION}
        </p>
      </div>
      <div className="mb-6">
        <DemoCountdown />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((st) => (
          <div key={st.label} className="stat-card items-center text-center min-w-0" style={{ padding: '1rem' }}>
            <div className="flex justify-center mb-1"><Icon name={st.icon} size={20} style={{ color: 'var(--color-primary)' }} /></div>
            <p className="w-full font-display font-bold text-base leading-tight truncate" style={{ color: 'var(--color-heading)' }}>{st.value}</p>
            <p className="text-xs leading-tight" style={{ color: 'var(--color-text-muted)' }}>{st.label}</p>
            <p className="text-xs leading-tight truncate w-full" style={{ color: 'var(--color-text-muted)' }}>{st.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-heading)' }}>Budget</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.budgetProgress}%</span>
          </div>
          <ProgressBar value={s.budgetProgress} />
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            {demoMoney(s.totalSpent)} spent of {demoMoney(s.budgetTotal)}
          </p>
        </div>
        <div className="card p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-heading)' }}>Checklist</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.checklistProgress}%</span>
          </div>
          <ProgressBar value={s.checklistProgress} />
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            {s.checklistDone} of {s.checklistTotal} tasks complete
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Guest list ────────────────────────────────────────────────────────────────
export function DemoGuestPanel() {
  const s = DEMO_STATS
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-3 mb-4">
        {[
          { label: 'Confirmed', value: s.confirmed, color: 'var(--color-success)' },
          { label: 'Pending', value: s.pending, color: 'var(--color-warning)' },
          { label: 'Declined', value: s.declined, color: 'var(--color-danger)' },
          { label: 'Total', value: s.guestCount, color: 'var(--color-primary)' },
        ].map((st) => (
          <div key={st.label} className="stat-card flex-1 min-w-[70px] text-center">
            <p className="font-display font-bold text-xl" style={{ color: st.color }}>{st.value}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{st.label}</p>
          </div>
        ))}
      </div>
      <div className="card p-0 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: 320 }}>
          <thead>
            <tr style={{ background: 'var(--color-surface)' }}>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: 'var(--color-text-muted)' }}>Guest</th>
              <th className="text-left px-4 py-2 font-semibold hidden sm:table-cell" style={{ color: 'var(--color-text-muted)' }}>Dietary</th>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: 'var(--color-text-muted)' }}>RSVP</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_GUESTS.slice(0, 8).map((g) => (
              <tr key={g.id} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td className="px-4 py-2.5" style={{ color: 'var(--color-text)' }}>
                  {g.name}
                  {g.plusOne && <span className="tag ml-2 text-xs">+1</span>}
                  {g.ageGroup === 'child' && <span className="tag ml-2 text-xs">Child</span>}
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell" style={{ color: 'var(--color-text-muted)' }}>
                  {g.dietary || 'None'}
                </td>
                <td className="px-4 py-2.5"><RsvpBadge rsvp={g.rsvp} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Budget ────────────────────────────────────────────────────────────────────
export function DemoBudgetPanel() {
  const s = DEMO_STATS
  return (
    <div className="p-5">
      <div className="card p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--color-heading)' }}>Total spent</span>
          <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
            {demoMoney(s.totalSpent)} <span style={{ color: 'var(--color-text-muted)' }}>/ {demoMoney(s.budgetTotal)}</span>
          </span>
        </div>
        <ProgressBar value={s.budgetProgress} />
      </div>
      <div className="space-y-3">
        {DEMO_BUDGET.map((c) => {
          const pct = c.allocated ? Math.round((c.spent / c.allocated) * 100) : 0
          return (
            <div key={c.id} className="card p-3">
              <div className="flex justify-between items-center gap-3 mb-1.5">
                <span className="text-sm font-medium flex items-center gap-2 min-w-0" style={{ color: 'var(--color-heading)' }}>
                  <span className="truncate">{c.category}</span>
                  {c.depositPaid && (
                    <span className="badge text-xs px-1.5 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0"
                      style={{ background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)' }}>
                      <Icon name="check" size={11} /> Deposit
                    </span>
                  )}
                </span>
                <span className="text-xs shrink-0 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                  {demoMoney(c.spent)} / {demoMoney(c.allocated)}
                </span>
              </div>
              <ProgressBar value={pct} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Checklist ─────────────────────────────────────────────────────────────────
export function DemoChecklistPanel() {
  const s = DEMO_STATS
  return (
    <div className="p-5">
      <div className="card p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--color-heading)' }}>Overall progress</span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.checklistDone} of {s.checklistTotal}</span>
        </div>
        <ProgressBar value={s.checklistProgress} />
      </div>
      <div className="space-y-4">
        {DEMO_CHECKLIST.map((phase) => (
          <div key={phase.phase} className="card p-4">
            <h4 className="font-display font-semibold text-sm mb-3" style={{ color: 'var(--color-heading)' }}>{phase.phase}</h4>
            <ul className="space-y-2">
              {phase.items.map((item) => (
                <li key={item.id} className="flex items-center gap-2.5 text-sm">
                  <span
                    className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                    style={item.done
                      ? { background: 'var(--color-success)', color: '#fff' }
                      : { border: '1.5px solid var(--color-border)' }}
                  >
                    {item.done && <Icon name="check" size={11} />}
                  </span>
                  <span style={{ color: item.done ? 'var(--color-text-muted)' : 'var(--color-text)', textDecoration: item.done ? 'line-through' : 'none' }}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Seating ───────────────────────────────────────────────────────────────────
export function DemoSeatingPanel() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DEMO_TABLES.map((t) => {
          const seated = DEMO_GUESTS.filter((g) => g.tableId === t.id)
          return (
            <div key={t.id} className="card p-4">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-display font-semibold text-sm flex items-center gap-2 min-w-0" style={{ color: 'var(--color-heading)' }}>
                  <Icon name="chair" size={16} className="shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span className="truncate">{t.name}</span>
                </span>
                <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>{seated.length}/{t.capacity}</span>
              </div>
              <ul className="space-y-1.5">
                {seated.map((g) => (
                  <li key={g.id} className="text-sm px-2.5 py-1.5 rounded-lg" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
                    {g.name}
                  </li>
                ))}
                {Array.from({ length: Math.max(0, t.capacity - seated.length) }).slice(0, 2).map((_, i) => (
                  <li key={`e${i}`} className="text-xs px-2.5 py-1.5 rounded-lg border border-dashed" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                    Empty seat
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Mood board ────────────────────────────────────────────────────────────────
export function DemoIdeasPanel() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DEMO_IDEAS.map((idea) => (
          <div key={idea.id} className="card p-0 overflow-hidden">
            <img
              src={idea.image}
              alt={idea.title}
              loading="lazy"
              className="w-full object-cover"
              style={{ aspectRatio: '4 / 3' }}
            />
            <div className="p-2.5">
              <span className="tag text-xs">{idea.category}</span>
              <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--color-heading)' }}>{idea.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
