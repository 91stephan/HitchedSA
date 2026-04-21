import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
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
  const { firstLaunchDone } = useApp()

  if (!firstLaunchDone) {
    return (
      <Routes>
        <Route path="*" element={<Welcome />} />
      </Routes>
    )
  }

  return (
    <>
      <Navbar />
      {/* Dashboard gets no top padding — its hero sits flush under the transparent navbar */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/venues" element={<div className="pt-16"><VenueSearch /></div>} />
        <Route path="/suppliers" element={<div className="pt-16"><Suppliers /></div>} />
        <Route path="/ideas" element={<div className="pt-16"><IdeasBoard /></div>} />
        <Route path="/guests" element={<div className="pt-16"><GuestList /></div>} />
        <Route path="/seating" element={<div className="pt-16"><SeatingPlanner /></div>} />
        <Route path="/budget" element={<div className="pt-16"><Budget /></div>} />
        <Route path="/checklist" element={<div className="pt-16"><Checklist /></div>} />
        <Route path="/settings" element={<div className="pt-16"><Settings /></div>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
