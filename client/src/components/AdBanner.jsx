/**
 * AdBanner — placeholder for Google AdSense units.
 * @param {string} slot - AdSense slot ID (wire up later)
 * @param {'leaderboard'|'rectangle'|'sidebar'|'square'} size
 */
export default function AdBanner({ slot, size = 'rectangle' }) {
  const sizeClasses = {
    leaderboard: 'w-full h-24',   // 728x90
    rectangle:   'w-full h-40',   // 336x280
    sidebar:     'w-full h-60',   // 300x250
    square:      'w-full h-32',   // 250x250
  }

  return (
    <div
      className={`${sizeClasses[size] || sizeClasses.rectangle} rounded-lg flex items-center justify-center border-2 border-dashed text-xs`}
      style={{
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-muted)',
        background: 'var(--color-surface)',
      }}
    >
      {/* ADSENSE UNIT — wire up slot ID later */}
      <div className="text-center">
        <div className="font-medium">Advertisement</div>
        <div className="opacity-60">Slot: {slot || 'not configured'} · {size}</div>
      </div>
    </div>
  )
}
