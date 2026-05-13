import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import AdBanner from '../components/AdBanner'

const LS_KEY = 'hitchedsa_notebook'
const PAGES = ['Notes', 'To-Do', 'Inspiration', 'Questions']

function loadPages() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {} } catch { return {} }
}

export default function Notebook() {
  const { partners } = useApp()
  const [activePage, setActivePage] = useState(0)
  const [pages, setPages] = useState(loadPages)
  const [saved, setSaved] = useState(true)
  const saveTimer = useRef(null)

  const coupleLabel =
    partners.partner1 && partners.partner2
      ? `${partners.partner1} & ${partners.partner2}`
      : 'Our Wedding'

  const handleChange = (text) => {
    setSaved(false)
    const next = { ...pages, [activePage]: text }
    setPages(next)
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)) } catch {}
      setSaved(true)
    }, 600)
  }

  useEffect(() => () => clearTimeout(saveTimer.current), [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="section-title">Notebook</h1>
      <p className="section-subtitle">Your private space for wedding notes, ideas and reminders</p>

      <AdBanner size="leaderboard" className="mb-6" />

      {/* Book wrapper */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 12px 48px rgba(0,0,0,0.18), -4px 0 0 0 var(--color-accent)',
        }}
      >
        {/* Book header / cover strip */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ background: 'var(--color-accent)', color: '#fff' }}
        >
          <span className="font-vibes text-2xl">{coupleLabel} — Wedding Notebook</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.22)' }}
          >
            {saved ? '✓ Saved' : '…saving'}
          </span>
        </div>

        {/* Page tabs row */}
        <div
          className="flex gap-0 border-b"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {PAGES.map((name, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className="flex-1 py-2.5 text-sm font-medium transition-all border-r last:border-r-0"
              style={{
                borderColor: 'var(--color-border)',
                background: activePage === i ? 'var(--color-card-bg)' : 'transparent',
                color: activePage === i ? 'var(--color-accent)' : 'var(--color-text-muted)',
                borderBottom: activePage === i ? `2px solid var(--color-accent)` : '2px solid transparent',
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Lined paper writing area */}
        <div
          style={{
            background: 'var(--color-card-bg)',
            backgroundImage: `
              linear-gradient(90deg, transparent 56px, rgba(230,179,179,0.35) 56px, rgba(230,179,179,0.35) 58px, transparent 58px),
              repeating-linear-gradient(
                transparent,
                transparent 30px,
                var(--color-border) 30px,
                var(--color-border) 31px
              )
            `,
            backgroundPositionY: '20px',
          }}
        >
          {/* Page section header */}
          <div
            className="flex items-center gap-3 px-6 pt-5 pb-2 border-b"
            style={{ borderColor: 'rgba(230,179,179,0.5)' }}
          >
            <span className="font-vibes text-3xl" style={{ color: 'var(--color-accent)', lineHeight: 1 }}>
              {PAGES[activePage]}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              page {activePage + 1} of {PAGES.length}
            </span>
          </div>

          {/* Text area — lined */}
          <textarea
            className="w-full focus:outline-none resize-none"
            style={{
              background: 'transparent',
              color: 'var(--color-text)',
              lineHeight: '31px',
              paddingTop: '7px',
              paddingLeft: '70px',
              paddingRight: '32px',
              paddingBottom: '24px',
              minHeight: '520px',
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: '14.5px',
              caretColor: 'var(--color-primary)',
            }}
            placeholder={`Start writing your ${PAGES[activePage].toLowerCase()} here…`}
            value={pages[activePage] || ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-2.5 border-t text-xs"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <span>{(pages[activePage] || '').length} characters</span>
          <span>Notes are saved in your browser on this device</span>
        </div>
      </div>

      <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>
        Your notebook saves automatically. Sign into the same browser to keep your notes.
      </p>
    </div>
  )
}