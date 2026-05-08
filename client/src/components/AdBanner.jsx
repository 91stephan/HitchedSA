import { useEffect, useRef } from 'react'
import { AD_SLOTS } from '../lib/adsense'

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT_ID

const SIZE_STYLES = {
  leaderboard: { minHeight: 90,  maxWidth: 728 },
  rectangle:   { minHeight: 280, maxWidth: 336 },
  sidebar:     { minHeight: 250, maxWidth: 300 },
  banner:      { minHeight: 60,  maxWidth: '100%' },
}

export default function AdBanner({ slot, size = 'leaderboard', className = '' }) {
  const pushed = useRef(false)
  const { minHeight, maxWidth } = SIZE_STYLES[size] || SIZE_STYLES.leaderboard

  const slotId = AD_SLOTS[size] || null
  const isActive = !!ADSENSE_CLIENT && !!slotId && !slotId.startsWith('REPLACE')

  useEffect(() => {
    if (!isActive || pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // suppress ad init errors
    }
  }, [isActive])

  if (isActive) {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight, maxWidth }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div
        className="w-full rounded-xl flex items-center justify-center border border-dashed"
        style={{
          minHeight,
          maxWidth,
          borderColor: 'var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <div className="text-center py-3">
          <div className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
            Advertisement
          </div>
          <div className="text-xs opacity-50" style={{ color: 'var(--color-text-muted)' }}>
            {size}
          </div>
        </div>
      </div>
    </div>
  )
}