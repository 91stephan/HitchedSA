import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'
import Icon from '../components/Icon'
import { fetchAdminUsers } from '../lib/adminApi'

// External destinations. GA links to the generic Analytics home; swap for a
// deep link to the property once you have it. Meta is a placeholder for now.
const GA_URL = 'https://analytics.google.com/'
const META_ADS_URL = 'https://business.facebook.com/adsmanager/'

function fmtDate(iso) {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleDateString('en-ZA', {
      year: 'numeric', month: 'short', day: 'numeric',
    })
  } catch {
    return '-'
  }
}

function fmtDateTime(iso) {
  if (!iso) return 'Never'
  try {
    return new Date(iso).toLocaleString('en-ZA', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return 'Never'
  }
}

function StatCard({ icon, label, value }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-primary)' }}>
        <Icon name={icon} size={18} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </span>
      </div>
      <p className="font-display text-3xl font-bold" style={{ color: 'var(--color-heading)' }}>{value}</p>
    </div>
  )
}

function SignupChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count))
  return (
    <div className="card p-6">
      <h2 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--color-heading)' }}>
        Signups, last 30 days
      </h2>
      <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
        New accounts created per day
      </p>
      <div className="flex items-end gap-1" style={{ height: 120 }}>
        {data.map((d) => (
          <div key={d.date} className="flex-1 flex flex-col justify-end" title={`${d.date}: ${d.count}`}>
            <div
              className="rounded-t"
              style={{
                height: `${(d.count / max) * 100}%`,
                minHeight: d.count > 0 ? 4 : 1,
                background: d.count > 0 ? 'var(--color-primary)' : 'var(--color-border)',
                opacity: d.count > 0 ? 1 : 0.5,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  )
}

export default function Admin() {
  useMeta({ title: 'Admin Dashboard', url: '/admin', noindex: true })

  const [state, setState] = useState({ loading: true, error: null, users: [], overview: null })

  useEffect(() => {
    let active = true
    fetchAdminUsers()
      .then((data) => {
        if (active) setState({ loading: false, error: null, users: data.users || [], overview: data.overview || null })
      })
      .catch((e) => {
        if (active) setState({ loading: false, error: e.message || 'Failed to load.', users: [], overview: null })
      })
    return () => { active = false }
  }, [])

  const { loading, error, users, overview } = state

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)' }}>
            HitchedSA
          </p>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--color-heading)' }}>
            Admin Dashboard
          </h1>
        </div>
        <Link to="/dashboard" className="btn-outline text-sm px-5 inline-flex items-center gap-2">
          <Icon name="arrowRight" size={16} /> Back to Planner
        </Link>
      </div>

      {loading && (
        <div className="card p-10 text-center" style={{ color: 'var(--color-text-muted)' }}>
          Loading admin data…
        </div>
      )}

      {!loading && error && (
        <div className="card p-8 text-center">
          <h2 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
            Could not load the dashboard
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-8">

          {/* Overview */}
          {overview && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon="users" label="Total users" value={overview.totalUsers} />
              <StatCard icon="arrowUp" label="New, 7 days" value={overview.newLast7} />
              <StatCard icon="calendar" label="New, 30 days" value={overview.newLast30} />
              <StatCard icon="checkCircle" label="Active, 30 days" value={overview.activeLast30} />
            </div>
          )}

          {/* Signups chart */}
          {overview?.signupsByDay?.length > 0 && <SignupChart data={overview.signupsByDay} />}

          {/* Traffic + Meta */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-primary)' }}>
                <Icon name="globe" size={20} />
                <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>Traffic</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Site traffic is tracked in Google Analytics 4. Open the full dashboard for realtime
                visitors, top pages, and traffic sources.
              </p>
              <a href={GA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-5 inline-flex items-center gap-2">
                Open Google Analytics <Icon name="arrowRight" size={16} />
              </a>
              <div className="mt-5 pt-4 text-xs" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                Embedded traffic charts (visitors and top pages shown right here) are planned for a
                later phase, once the GA4 Data API is connected.
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-primary)' }}>
                <Icon name="sparkles" size={20} />
                <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>Meta ads</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                This section is reserved for driving traffic through Meta (Facebook and Instagram)
                ads. The Meta Pixel and campaign tools will be wired in here.
              </p>
              <a href={META_ADS_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-5 inline-flex items-center gap-2">
                Open Meta Ads Manager <Icon name="arrowRight" size={16} />
              </a>
              <div className="mt-5 pt-4 text-xs" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                Reserved: Meta Pixel ID and campaign linking will appear here when set up.
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="card p-0 overflow-hidden">
            <div className="p-6 pb-4 flex items-center gap-2">
              <Icon name="user" size={20} style={{ color: 'var(--color-primary)' }} />
              <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>
                Users ({users.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: 'var(--color-surface)' }}>
                    <th className="text-left p-3 px-6 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-heading)' }}>Email</th>
                    <th className="text-left p-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-heading)' }}>Joined</th>
                    <th className="text-left p-3 px-6 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-heading)' }}>Last sign-in</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <td className="p-3 px-6" style={{ color: 'var(--color-heading)' }}>{u.email || '-'}</td>
                      <td className="p-3" style={{ color: 'var(--color-text-muted)' }}>{fmtDate(u.created_at)}</td>
                      <td className="p-3 px-6" style={{ color: 'var(--color-text-muted)' }}>{fmtDateTime(u.last_sign_in_at)}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={3} className="p-6 text-center" style={{ color: 'var(--color-text-muted)' }}>No users yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
