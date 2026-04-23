const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT_ID

const SIZES = {
  leaderboard: { cls: 'w-full',       style: { minHeight: 90,  maxWidth: 728 } },
  rectangle:   { cls: 'w-full',       style: { minHeight: 280, maxWidth: 336 } },
  sidebar:     { cls: 'w-full',       style: { minHeight: 250, maxWidth: 300 } },
  banner:      { cls: 'w-full',       style: { minHeight: 60,  maxWidth: '100%' } },
}

export default function AdBanner({ slot, size = 'leaderboard', className = '' }) {
  const { cls, style } = SIZES[size] || SIZES.leaderboard

  // Once AdSense is approved and VITE_ADSENSE_CLIENT_ID is set in Netlify,
  // this will render a real ad unit instead of the placeholder.
  if (ADSENSE_CLIENT && slot) {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Placeholder shown until AdSense is configured
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div
        className={`${cls} rounded-xl flex items-center justify-center border border-dashed`}
        style={{
          ...style,
          borderColor: 'var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <div className="text-center py-3">
          <div className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
            Advertisement
          </div>
          <div className="text-xs opacity-50" style={{ color: 'var(--color-text-muted)' }}>
            {size} · {slot || 'pending approval'}
          </div>
        </div>
      </div>
    </div>
  )
}