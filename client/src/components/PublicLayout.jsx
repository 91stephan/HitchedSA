import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LogoRingIllustration from './illustrations/LogoRingIllustration'
import Icon from './Icon'
import BackToTop from './BackToTop'

const GUIDE_LINKS = [
  { to: '/wedding-guide', label: 'Wedding Planning Guide', desc: 'Timelines, budgets and SA advice' },
  { to: '/wedding-venues-guide', label: 'Venues Guide', desc: 'Regions, price guides and booking tips' },
  { to: '/articles', label: 'Guides & Articles', desc: 'Costs, seasons, traditions and more' },
]

const linkStyle = { color: 'var(--color-text-muted)' }

function PublicNavbar() {
  const { user } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'var(--color-card-bg)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <LogoRingIllustration size={26} color="var(--color-accent)" />
          <span className="font-vibes text-3xl leading-none" style={{ color: 'var(--color-accent)' }}>
            HitchedSA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/wedding-venues" className="text-sm hover:opacity-70 transition-opacity" style={linkStyle}>
            Venues
          </Link>

          {/* Guides dropdown (hover to reveal) */}
          <div className="relative group">
            <button className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity" style={linkStyle}>
              Guides <Icon name="chevronDown" size={14} />
            </button>
            <div className="absolute right-0 top-full pt-3 hidden group-hover:block">
              <div
                className="rounded-xl p-2 w-72"
                style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
              >
                {GUIDE_LINKS.map((g) => (
                  <Link
                    key={g.to}
                    to={g.to}
                    className="block px-3 py-2.5 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <span className="block text-sm font-medium" style={{ color: 'var(--color-heading)' }}>{g.label}</span>
                    <span className="block text-xs" style={{ color: 'var(--color-text-muted)' }}>{g.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/demo" className="text-sm hover:opacity-70 transition-opacity" style={linkStyle}>
            Demo
          </Link>
          <Link to="/about" className="text-sm hover:opacity-70 transition-opacity" style={linkStyle}>
            About
          </Link>
          <Link to="/contact" className="text-sm hover:opacity-70 transition-opacity" style={linkStyle}>
            Contact
          </Link>
          {user ? (
            <Link to="/dashboard" className="btn-primary text-sm">My Planner</Link>
          ) : (
            <Link to="/login" className="btn-primary text-sm">Sign In</Link>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-sm">My Planner</Link>
          ) : (
            <Link to="/login" className="btn-primary text-sm">Sign In</Link>
          )}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-2 rounded-lg"
            style={{ color: 'var(--color-heading)' }}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="md:hidden animate-fade-in"
          style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
            <Link to="/wedding-venues" className="py-2.5 text-sm font-medium" style={{ color: 'var(--color-heading)' }}>
              Venues
            </Link>
            <span className="pt-3 pb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Guides
            </span>
            {GUIDE_LINKS.map((g) => (
              <Link key={g.to} to={g.to} className="py-2 text-sm pl-3" style={{ color: 'var(--color-text-muted)' }}>
                {g.label}
              </Link>
            ))}
            <div className="my-2" style={{ borderTop: '1px solid var(--color-border)' }} />
            <Link to="/demo" className="py-2.5 text-sm font-medium" style={{ color: 'var(--color-heading)' }}>
              Demo
            </Link>
            <Link to="/about" className="py-2.5 text-sm font-medium" style={{ color: 'var(--color-heading)' }}>
              About
            </Link>
            <Link to="/contact" className="py-2.5 text-sm font-medium" style={{ color: 'var(--color-heading)' }}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function PublicFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <LogoRingIllustration size={20} color="var(--color-accent)" />
            <span className="font-vibes text-2xl" style={{ color: 'var(--color-accent)' }}>HitchedSA</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <Link to="/demo" className="hover:underline">Demo</Link>
            <Link to="/wedding-venues" className="hover:underline">Venues by Province</Link>
            <Link to="/articles" className="hover:underline">Guides & Articles</Link>
            <Link to="/wedding-guide" className="hover:underline">Wedding Guide</Link>
            <Link to="/wedding-venues-guide" className="hover:underline">Venues Guide</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} HitchedSA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function PublicLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <BackToTop />
    </div>
  )
}