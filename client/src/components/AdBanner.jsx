import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, ADSENSE_SLOT } from '../lib/adsense'

const SIZE_STYLES = {
  leaderboard: { minHeight: 90,  maxWidth: 728 },
  rectangle:   { minHeight: 280, maxWidth: 336 },
  sidebar:     { minHeight: 250, maxWidth: 300 },
  banner:      { minHeight: 60,  maxWidth: '100%' },
}

export default function AdBanner({ size = 'leaderboard', className = '' }) {
  const pushed = useRef(false)
  const { minHeight, maxWidth } = SIZE_STYLES[size] || SIZE_STYLES.leaderboard
  const isActive = !!ADSENSE_CLIENT && !!ADSENSE_SLOT

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
          data-ad-slot={ADSENSE_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Render nothing when no explicit ad slot is configured. Auto ads (enabled in
  // the AdSense dashboard) place ads on their own via the loader script in
  // index.html, so we do NOT want empty placeholder boxes on the live site.
  return null
}