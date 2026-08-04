import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from './Icon'

// Small fixed pill that makes cloud-save state visible. Before this, a failed
// save was invisible and looked saved, so data silently never reached the
// cloud and vanished when the planner was opened on another device.
export default function SaveStatus() {
  const { syncStatus, retrySync } = useApp()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (syncStatus === 'idle') { setShow(false); return }
    setShow(true)
    // "Saved" is reassurance, not a warning, so let it fade on its own.
    if (syncStatus === 'saved') {
      const t = setTimeout(() => setShow(false), 2200)
      return () => clearTimeout(t)
    }
  }, [syncStatus])

  if (!show) return null

  const base = {
    position: 'fixed',
    right: '1rem',
    bottom: '1rem',
    zIndex: 60,
  }

  if (syncStatus === 'saving') {
    return (
      <div
        style={{ ...base, background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
        className="rounded-lg px-3 py-1.5 text-xs font-medium shadow-md flex items-center gap-2 animate-fade-in"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" className="animate-spin" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        Saving…
      </div>
    )
  }

  if (syncStatus === 'saved') {
    return (
      <div
        style={{ ...base, background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-success)' }}
        className="rounded-lg px-3 py-1.5 text-xs font-medium shadow-md flex items-center gap-1.5 animate-fade-in"
      >
        <Icon name="checkCircle" size={14} />
        Saved
      </div>
    )
  }

  // error
  return (
    <div
      style={{ ...base, background: 'var(--color-card-bg)', border: '1px solid var(--color-danger)', color: 'var(--color-text)', maxWidth: '18rem' }}
      className="rounded-lg px-3 py-2 text-xs shadow-lg flex items-start gap-2 animate-fade-in"
    >
      <Icon name="warning" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-danger)' }} />
      <div>
        <p className="font-semibold mb-0.5" style={{ color: 'var(--color-danger)' }}>Changes not saved</p>
        <p className="mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
          The server did not accept the change. Your data is still here on this device.
        </p>
        <button
          onClick={retrySync}
          className="font-semibold underline"
          style={{ color: 'var(--color-primary)' }}
        >
          Retry now
        </button>
      </div>
    </div>
  )
}
