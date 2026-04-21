/* Tiny single-ring mark used in the Navbar logo.
   colour prop lets the parent pass the exact hex/var so it adapts to
   both transparent (white) and solid (theme accent) navbar states. */
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
      {/* Band */}
      <circle cx="14" cy="14" r="9" stroke={color} strokeWidth="2.6" fill="none" />

      {/* Diamond / gem setting — small prong crown at top */}
      <path d="M10.5,7.5 L13,5 L15.5,7.5 L14,9.5 Z"
        stroke={color} strokeWidth="1.2" strokeLinejoin="round"
        fill={color} fillOpacity="0.18" />
      {/* Gem facets */}
      <line x1="13" y1="5" x2="14" y2="7.5" stroke={color} strokeWidth="0.8" opacity="0.55" />
      <line x1="15.5" y1="7.5" x2="14" y2="7.5" stroke={color} strokeWidth="0.8" opacity="0.55" />
      <line x1="10.5" y1="7.5" x2="14" y2="7.5" stroke={color} strokeWidth="0.8" opacity="0.55" />

      {/* Small sparkle left */}
      <circle cx="5.5" cy="12" r="1.2" fill={color} fillOpacity="0.45" />
      {/* Small sparkle right */}
      <circle cx="22.5" cy="16" r="1" fill={color} fillOpacity="0.38" />
    </svg>
  )
}
