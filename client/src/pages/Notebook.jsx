import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import Icon from '../components/Icon'
import AdBanner from '../components/AdBanner'
import PageBackdrop from '../components/PageBackdrop'

const LS_KEY = 'hitchedsa_notebook'
const LS_FONT = 'hitchedsa_notebook_font'
const PAGES = ['Notes', 'To-Do', 'Inspiration', 'Questions']

// Ruled-line height. The text line-height matches this so writing sits
// in the gap above each rule, not on top of it.
const LINE_H = 34

const FONTS = [
  { id: 'serif', label: 'Classic Serif', stack: '"Georgia", "Times New Roman", serif' },
  { id: 'hand',  label: 'Handwriting',   stack: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive' },
  { id: 'sans',  label: 'Modern Sans',   stack: 'system-ui, "Segoe UI", Roboto, sans-serif' },
  { id: 'mono',  label: 'Typewriter',    stack: '"Courier New", Courier, monospace' },
]

function loadPages() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {} } catch { return {} }
}

function loadFont() {
  try { return localStorage.getItem(LS_FONT) || 'serif' } catch { return 'serif' }
}

export default function Notebook() {
  const { partners } = useApp()
  const [activePage, setActivePage] = useState(0)
  const [pages, setPages] = useState(loadPages)
  const [saved, setSaved] = useState(true)
  const [fontId, setFontId] = useState(loadFont)
  const saveTimer = useRef(null)

  const fontStack = (FONTS.find((f) => f.id === fontId) || FONTS[0]).stack

  const changeFont = (id) => {
    setFontId(id)
    try { localStorage.setItem(LS_FONT, id) } catch {}
  }

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
    <>
    <PageBackdrop src="/images/suppliers/florists.jpg" />
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
          <span className="font-vibes text-2xl">{coupleLabel} · Wedding Notebook</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.22)' }}
          >
            {saved ? <span className="inline-flex items-center gap-1"><Icon name="check" size={12} /> Saved</span> : '…saving'}
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

        {/* Font picker row */}
        <div
          className="flex items-center justify-end gap-2 px-4 py-2 border-b"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Font</label>
          <select
            className="input-field text-xs py-1 w-auto"
            value={fontId}
            onChange={(e) => changeFont(e.target.value)}
          >
            {FONTS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>

        {/* Writing area */}
        <div style={{ background: 'var(--color-card-bg)' }}>
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

          {/* Text area - lined. Rules live on the textarea so they always
              line up with the text; writing rests in the gap above each rule. */}
          <textarea
            className="w-full focus:outline-none resize-none"
            style={{
              background: 'transparent',
              backgroundImage: `
                linear-gradient(90deg, transparent 55px, rgba(230,179,179,0.4) 55px, rgba(230,179,179,0.4) 57px, transparent 57px),
                repeating-linear-gradient(
                  transparent 0,
                  transparent ${LINE_H - 1}px,
                  var(--color-border) ${LINE_H - 1}px,
                  var(--color-border) ${LINE_H}px
                )
              `,
              backgroundPositionY: '12px',
              color: 'var(--color-text)',
              lineHeight: `${LINE_H}px`,
              paddingTop: '12px',
              paddingLeft: '70px',
              paddingRight: '32px',
              paddingBottom: '24px',
              minHeight: '510px',
              fontFamily: fontStack,
              fontSize: '15px',
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
    </>
  )
}