/* Solitaire engagement-ring mark used in the Navbar/Footer logo.
   Single-colour line art so the parent can pass the exact hex/var and it
   adapts to both transparent (white) and solid (theme accent) navbar states.
   Depth comes from opacity variation on the facets and band, not extra hues. */
export default function LogoRingIllustration({ color = 'var(--color-accent)', size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Nudge the whole mark up so its optical centre (the band is bottom-heavy)
          lines up with the script wordmark instead of sitting low. */}
      <g transform="translate(0 -1.8)">
      {/* Ring band */}
      <circle cx="14" cy="18.4" r="6" stroke={color} strokeWidth="2.3" fill="none" />
      {/* Inner-edge highlight to give the band a little shine and thickness */}
      <path d="M9.5,20.7 A6,6 0 0 0 18.5,20.7" stroke={color} strokeWidth="0.9"
        strokeLinecap="round" opacity="0.35" fill="none" />

      {/* Basket / prongs seating the stone into the band */}
      <path d="M10.6,8.4 L13.4,12.1" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M17.4,8.4 L14.6,12.1" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />

      {/* Diamond, round brilliant seen from the front */}
      <path d="M10.8,4.4 L17.2,4.4 L19,8 L14,12.4 L9,8 Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round"
        fill={color} fillOpacity="0.16" />
      {/* Girdle */}
      <line x1="9" y1="8" x2="19" y2="8" stroke={color} strokeWidth="0.9" opacity="0.6" />
      {/* Crown facets */}
      <line x1="10.8" y1="4.4" x2="12.3" y2="8" stroke={color} strokeWidth="0.7" opacity="0.5" />
      <line x1="17.2" y1="4.4" x2="15.7" y2="8" stroke={color} strokeWidth="0.7" opacity="0.5" />
      <line x1="14" y1="4.4" x2="14" y2="8" stroke={color} strokeWidth="0.7" opacity="0.5" />
      {/* Pavilion facets converging on the culet */}
      <line x1="9" y1="8" x2="14" y2="12.4" stroke={color} strokeWidth="0.7" opacity="0.45" />
      <line x1="19" y1="8" x2="14" y2="12.4" stroke={color} strokeWidth="0.7" opacity="0.45" />
      <line x1="12.3" y1="8" x2="14" y2="12.4" stroke={color} strokeWidth="0.6" opacity="0.4" />
      <line x1="15.7" y1="8" x2="14" y2="12.4" stroke={color} strokeWidth="0.6" opacity="0.4" />

      {/* Sparkle */}
      <path d="M21.5,3.1 L21.5,6 M20.1,4.55 L22.9,4.55"
        stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  )
}
