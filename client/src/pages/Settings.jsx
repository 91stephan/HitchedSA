import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import ThemePreviewCard from '../components/ThemePreviewCard'
import Modal from '../components/Modal'
import FloralDivider from '../components/FloralDivider'
import WeddingRingsIllustration from '../components/illustrations/WeddingRingsIllustration'

export default function Settings() {
  const { partners, setPartners, weddingDate, setWeddingDate, clearAllData } = useApp()
  const { themeId, applyTheme, themes } = useTheme()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const [partner1, setPartner1] = useState(partners.partner1)
  const [partner2, setPartner2] = useState(partners.partner2)
  const [dateInput, setDateInput] = useState(weddingDate || '')
  const [savedNames, setSavedNames] = useState(false)
  const [savedDate, setSavedDate] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const saveNames = () => {
    setPartners({ partner1: partner1.trim(), partner2: partner2.trim() })
    setSavedNames(true)
    setTimeout(() => setSavedNames(false), 2000)
  }

  const saveDate = () => {
    setWeddingDate(dateInput || null)
    setSavedDate(true)
    setTimeout(() => setSavedDate(false), 2000)
  }

  const clearDate = () => {
    setDateInput('')
    setWeddingDate(null)
    setSavedDate(true)
    setTimeout(() => setSavedDate(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-5 mb-6">
        <WeddingRingsIllustration size={90} />
        <div>
          <h1 className="section-title mb-1">Settings</h1>
          <p className="section-subtitle mb-0">Customise your HitchedSA experience</p>
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="card mb-6">
        <h2 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
          Wedding Theme
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Selecting a theme instantly updates the entire app.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.values(themes).map((t) => (
            <ThemePreviewCard
              key={t.id}
              theme={t}
              selected={themeId === t.id}
              onClick={() => applyTheme(t.id)}
            />
          ))}
        </div>
      </div>

      {/* Partner Names */}
      <div className="card mb-6">
        <h2 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
          Partner Names
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label">Partner 1</label>
            <input
              className="input-field"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              placeholder="Partner 1 name"
            />
          </div>
          <div>
            <label className="label">Partner 2</label>
            <input
              className="input-field"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              placeholder="Partner 2 name"
            />
          </div>
        </div>
        <button className="btn-primary text-sm" onClick={saveNames}>
          {savedNames ? '✓ Saved!' : 'Save Names'}
        </button>
      </div>

      {/* Wedding Date */}
      <div className="card mb-6">
        <h2 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
          Wedding Date
        </h2>
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
          {weddingDate
            ? `Currently set to: ${new Date(weddingDate).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`
            : 'No date set. Setting a date enables the countdown clock and date-based checklist.'}
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-48">
            <label className="label">Wedding Date</label>
            <input
              type="date"
              className="input-field"
              value={dateInput}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          <button className="btn-primary text-sm" onClick={saveDate}>
            {savedDate ? '✓ Saved!' : 'Save Date'}
          </button>
          {weddingDate && (
            <button className="btn-ghost text-sm" onClick={clearDate}>
              Clear Date
            </button>
          )}
        </div>
      </div>

      <FloralDivider />

      {/* Data Management */}
      <div
        className="card p-5"
        style={{ border: '2px solid var(--color-danger)', background: `color-mix(in srgb, var(--color-card-bg) 95%, var(--color-danger))` }}
      >
        <h2 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--color-danger)' }}>
          Danger Zone
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Clearing all data permanently removes your guests, budget, ideas, checklists, and settings from this device. This cannot be undone.
        </p>
        <button className="btn-danger" onClick={() => setShowClearConfirm(true)}>
          🗑️ Clear All Data
        </button>
      </div>

      {/* Confirm Clear Modal */}
      <Modal open={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Clear All Data?">
        <div className="text-center">
          <div className="text-3xl mb-4" style={{ color: 'var(--color-danger)', opacity: 0.7 }}>⚠</div>
          <p className="text-sm mb-2" style={{ color: 'var(--color-text)' }}>
            This will permanently delete all your wedding planning data including:
          </p>
          <ul className="text-sm mb-6 space-y-1" style={{ color: 'var(--color-text-muted)' }}>
            <li>• All guests and RSVPs</li>
            <li>• Budget entries</li>
            <li>• Ideas board</li>
            <li>• Checklist progress</li>
            <li>• Venue and supplier shortlists</li>
            <li>• Partner names and wedding date</li>
          </ul>
          <div className="flex gap-3">
            <button className="btn-outline flex-1" onClick={() => setShowClearConfirm(false)}>
              Cancel
            </button>
            <button className="btn-danger flex-1" onClick={clearAllData}>
              Yes, Clear Everything
            </button>
          </div>
        </div>
      </Modal>

      {/* Account */}
      <div className="card mb-6">
        <h2 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
          Account
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Signed in as <strong>{user?.email}</strong>
        </p>
        <button className="btn-outline text-sm" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      {/* App Info */}
      <div className="text-center mt-6">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          HitchedSA v0.2.0 · Data synced securely to the cloud
        </p>
      </div>
    </div>
  )
}
