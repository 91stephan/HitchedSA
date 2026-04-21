import { useEffect, useState } from 'react'

const CONFETTI_COLORS = ['#D4829A', '#C9A84C', '#6B9E78', '#B76E79', '#1B2B5E', '#E8A44A']

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function Celebration({ show, onDone }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!show) return
    const items = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${randomBetween(5, 95)}%`,
      top: `${randomBetween(-10, 20)}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: randomBetween(8, 18),
      delay: `${randomBetween(0, 1)}s`,
      duration: `${randomBetween(2, 3.5)}s`,
      shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'rect' : 'diamond',
    }))
    setPieces(items)
    const t = setTimeout(() => { setPieces([]); onDone?.() }, 3500)
    return () => clearTimeout(t)
  }, [show])

  if (!pieces.length) return null

  return (
    <div className="celebration-overlay" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'diamond' ? '0' : '2px',
            transform: p.shape === 'diamond' ? 'rotate(45deg)' : undefined,
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}

      {/* Central message */}
      <div
        className="rounded-2xl px-8 py-6 text-center animate-scale-in shadow-2xl pointer-events-auto"
        style={{ background: 'var(--color-card-bg)', border: '2px solid var(--color-accent)' }}
      >
        <div className="text-5xl mb-3">💍</div>
        <div className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
          Congratulations!
        </div>
        <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Your wedding date has been set!
        </div>
      </div>
    </div>
  )
}
