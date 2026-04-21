import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import LogoRingIllustration from './illustrations/LogoRingIllustration'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/guests',    label: 'Guests'    },
  { path: '/seating',   label: 'Seating'   },
  { path: '/venues',    label: 'Venues'    },
  { path: '/suppliers', label: 'Suppliers' },
  { path: '/ideas',     label: 'Ideas'     },
  { path: '/budget',    label: 'Budget'    },
  { path: '/checklist', label: 'Checklist' },
  { path: '/settings',  label: 'Settings'  },
]

// Only these pages have a full-bleed hero image directly under the navbar.
// All other pages use solid navbar immediately (no transparent phase).
const HERO_PATHS = ['/dashboard']

export default function Navbar() {
  const { partners } = useApp()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHeroPage = HERO_PATHS.includes(location.pathname)

  // On hero pages: transparent until scrolled past 40px.
  // On all other pages: always solid — text starts dark immediately.
  const isSolid = !isHeroPage || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Evaluate on mount in case page loaded mid-scroll
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Re-evaluate scroll state instantly on route change
  useEffect(() => {
    setScrolled(window.scrollY > 40)
    setMenuOpen(false)
  }, [location.pathname])

  const partnerLabel =
    partners.partner1 && partners.partner2
      ? `${partners.partner1} & ${partners.partner2}`
      : null

  // ── Style tokens ──────────────────────────────────────────────────
  // Solid state  → white background, dark charcoal text, accent logo
  // Transparent  → no background, white text (readable over dark hero overlay)

  const navStyle = isSolid
    ? {
        background: 'var(--color-card-bg)',          // always white/off-white
        boxShadow: '0 1px 20px rgba(0,0,0,0.08)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }
    : {
        background: 'transparent',
        boxShadow: 'none',
        borderBottom: 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }

  // Link text: solid → dark charcoal; transparent → white
  const linkColor  = isSolid ? '#2d2d2d' : '#ffffff'
  const linkOpacity = isSolid ? 1 : 0.9

  // Logo (Great Vibes): solid → theme accent (gold / rose gold); transparent → white
  const logoColor     = isSolid ? 'var(--color-accent)' : '#ffffff'
  const logoShadow    = isSolid ? 'none' : '0 1px 8px rgba(0,0,0,0.35)'

  // Partner subtext: solid → readable mid-grey; transparent → soft white
  const partnerColor  = isSolid ? '#555555' : 'rgba(255,255,255,0.78)'

  // Hamburger lines
  const burgerColor   = isSolid ? '#2d2d2d' : '#ffffff'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={navStyle}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────── */}
          <NavLink to="/dashboard" className="flex items-center gap-2 shrink-0">
            <LogoRingIllustration size={28} color={logoColor} />
            <div className="leading-none">
              <span
                className="font-vibes text-3xl leading-none"
                style={{ color: logoColor, textShadow: logoShadow }}
              >
                HitchedSA
              </span>
              {partnerLabel && (
                <div
                  className="text-xs leading-none mt-0.5 font-medium"
                  style={{ color: partnerColor }}
                >
                  {partnerLabel}
                </div>
              )}
            </div>
          </NavLink>

          {/* ── Desktop nav links ─────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive ? 'nav-link active shadow-sm' : ''
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        // Active pill: always theme primary bg + white text — clear on any bg
                        background: 'var(--color-primary)',
                        color: '#ffffff',
                      }
                    : {
                        color: linkColor,
                        opacity: linkOpacity,
                      }
                }
              >
                {item.label}
              </NavLink>

            ))}
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────── */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-xl"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 rounded-full transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: burgerColor }}
            />
            <span
              className={`block w-6 h-0.5 rounded-full transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: burgerColor }}
            />
            <span
              className={`block w-6 h-0.5 rounded-full transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: burgerColor }}
            />
          </button>
        </div>

        {/* ── Mobile dropdown menu ──────────────────────────────── */}
        {menuOpen && (
          <div
            className="lg:hidden py-3 border-t animate-fade-in"
            style={{
              // Mobile menu always gets a solid opaque background for readability
              background: 'var(--color-card-bg)',
              borderColor: 'var(--color-border)',
              marginLeft: '-1rem',
              marginRight: '-1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl mx-1 mb-1 text-sm font-medium transition-all ${
                    isActive ? 'nav-link active' : ''
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: 'var(--color-primary)', color: '#ffffff' }
                    : { color: '#2d2d2d' }  // Always dark in mobile menu
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
