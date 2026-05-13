import { Link } from 'react-router-dom'
import LogoRingIllustration from './illustrations/LogoRingIllustration'

function PublicNavbar() {
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
        <div className="flex items-center gap-4">
          <Link to="/wedding-guide" className="text-sm hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
            Wedding Guide
          </Link>
          <Link to="/about" className="text-sm hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
            About
          </Link>
          <Link to="/login" className="btn-primary text-sm">
            Sign In
          </Link>
        </div>
      </div>
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
            <Link to="/wedding-guide" className="hover:underline">Wedding Guide</Link>
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
    </div>
  )
}