import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import VenueSearch from './pages/VenueSearch'
import Suppliers from './pages/Suppliers'
import IdeasBoard from './pages/IdeasBoard'
import GuestList from './pages/GuestList'
import SeatingPlanner from './pages/SeatingPlanner'
import Budget from './pages/Budget'
import Checklist from './pages/Checklist'
import Settings from './pages/Settings'

function AppRoutes() {
  const { user, loading: authLoading } = useAuth()
  const { firstLaunchDone, appLoading } = useApp()

  if (authLoading || appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center animate-fade-in">
          <div className="font-vibes text-5xl mb-3" style={{ color: 'var(--color-primary)' }}>HitchedSA</div>
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading your wedding planner…</div>
        </div>
      </div>
    )
  }

  // Not logged in → show auth page
  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Auth />} />
      </Routes>
    )
  }

  // Logged in but no profile set up → show welcome setup
  if (!firstLaunchDone) {
    return (
      <Routes>
        <Route path="/welcome-setup" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/welcome-setup" replace />} />
      </Routes>
    )
  }

  // Fully authenticated and set up → main app
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/venues"    element={<div className="pt-16"><VenueSearch /></div>} />
        <Route path="/suppliers" element={<div className="pt-16"><Suppliers /></div>} />
        <Route path="/ideas"     element={<div className="pt-16"><IdeasBoard /></div>} />
        <Route path="/guests"    element={<div className="pt-16"><GuestList /></div>} />
        <Route path="/seating"   element={<div className="pt-16"><SeatingPlanner /></div>} />
        <Route path="/budget"    element={<div className="pt-16"><Budget /></div>} />
        <Route path="/checklist" element={<div className="pt-16"><Checklist /></div>} />
        <Route path="/settings"  element={<div className="pt-16"><Settings /></div>} />
        <Route path="*"          element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
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