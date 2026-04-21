import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={`relative w-full ${maxWidth} rounded-2xl shadow-2xl animate-scale-in`}
        style={{ background: 'var(--color-card-bg)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg font-display font-semibold" style={{ color: 'var(--color-text)' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-opacity-10"
            style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface)' }}
          >
            ✕
          </button>
        </div>
        {/* Body */}
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
