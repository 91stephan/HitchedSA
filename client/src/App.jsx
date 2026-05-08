import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import PublicLayout from './components/PublicLayout'
import Auth from './pages/Auth'
import Welcome from './pages/Welcome'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Dashboard from './pages/Dashboard'
import VenueSearch from './pages/VenueSearch'
import Suppliers from './pages/Suppliers'
import IdeasBoard from './pages/IdeasBoard'
import GuestList from './pages/GuestList'
import SeatingPlanner from './pages/SeatingPlanner'
import Budget from './pages/Budget'
import Checklist from './pages/Checklist'
import Settings from './pages/Settings'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
      <div className="text-center animate-fade-in">
        <div className="font-vibes text-5xl mb-3" style={{ color: 'var(--color-primary)' }}>HitchedSA</div>
        <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading your wedding planner…</div>
      </div>
    </div>
  )
}

// Wraps authenticated app pages — handles auth guard + navbar
function ProtectedRoute({ children, padTop = true }) {
  const { user } = useAuth()
  const { firstLaunchDone } = useApp()
  if (!user) return <Navigate to="/" replace />
  if (!firstLaunchDone) return <Navigate to="/welcome-setup" replace />
  return (
    <>
      <Navbar />
      <div className={padTop ? 'pt-16' : ''}>{children}</div>
    </>
  )
}

function AppRoutes() {
  const { user, loading: authLoading } = useAuth()
  const { firstLaunchDone, appLoading } = useApp()

  if (authLoading || appLoading) return <LoadingScreen />

  return (
    <Routes>
      {/* ── Always-public pages ──────────────────────────────────────────── */}
      <Route path="/about"   element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
      <Route path="/terms"   element={<PublicLayout><TermsOfService /></PublicLayout>} />

      {/* ── Auth ─────────────────────────────────────────────────────────── */}
      <Route
        path="/login"
        element={user && firstLaunchDone ? <Navigate to="/dashboard" replace /> : <Auth />}
      />

      {/* ── Welcome setup ────────────────────────────────────────────────── */}
      <Route
        path="/welcome-setup"
        element={!user ? <Navigate to="/" replace /> : <Welcome />}
      />

      {/* ── Root: Landing for guests, Dashboard for authenticated ────────── */}
      <Route
        path="/"
        element={
          user && firstLaunchDone
            ? <Navigate to="/dashboard" replace />
            : user && !firstLaunchDone
            ? <Navigate to="/welcome-setup" replace />
            : <PublicLayout><Landing /></PublicLayout>
        }
      />

      {/* ── Protected app routes ─────────────────────────────────────────── */}
      <Route path="/dashboard" element={<ProtectedRoute padTop={false}><Dashboard /></ProtectedRoute>} />
      <Route path="/venues"    element={<ProtectedRoute><VenueSearch /></ProtectedRoute>} />
      <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
      <Route path="/ideas"     element={<ProtectedRoute><IdeasBoard /></ProtectedRoute>} />
      <Route path="/guests"    element={<ProtectedRoute><GuestList /></ProtectedRoute>} />
      <Route path="/seating"   element={<ProtectedRoute><SeatingPlanner /></ProtectedRoute>} />
      <Route path="/budget"    element={<ProtectedRoute><Budget /></ProtectedRoute>} />
      <Route path="/checklist" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
      <Route path="/settings"  element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* ── Catch-all ────────────────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}