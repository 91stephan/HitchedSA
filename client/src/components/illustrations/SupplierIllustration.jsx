export default function SupplierIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* ── Camera body ──────────────────────────────────────────── */}
      <rect x="22" y="54" width="84" height="62" rx="10" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" strokeWidth="2" />

      {/* Camera top bump (viewfinder hump) */}
      <rect x="42" y="46" width="26" height="12" rx="5" fill="var(--color-primary)" fillOpacity="0.12" stroke="var(--color-primary)" strokeWidth="1.5" />

      {/* Shutter button */}
      <circle cx="82" cy="50" r="5" fill="var(--color-accent)" fillOpacity="0.6" stroke="var(--color-accent)" strokeWidth="1" />
      <circle cx="82" cy="50" r="2.5" fill="var(--color-accent)" fillOpacity="0.9" />

      {/* Lens outer ring */}
      <circle cx="64" cy="85" r="24" fill="var(--color-primary)" fillOpacity="0.06" stroke="var(--color-primary)" strokeWidth="2" />
      {/* Lens inner rings */}
      <circle cx="64" cy="85" r="18" fill="var(--color-primary)" fillOpacity="0.08" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="64" cy="85" r="12" fill="var(--color-primary)" fillOpacity="0.12" stroke="var(--color-primary)" strokeWidth="1" />
      <circle cx="64" cy="85" r="6" fill="var(--color-primary)" fillOpacity="0.22" />
      {/* Lens highlight */}
      <ellipse cx="57" cy="78" rx="4" ry="3" fill="white" fillOpacity="0.35" transform="rotate(-30 57 78)" />

      {/* Flash indicator */}
      <rect x="82" y="60" width="14" height="8" rx="2" fill="var(--color-accent)" fillOpacity="0.25" stroke="var(--color-accent)" strokeWidth="1" />

      {/* Strap lug left */}
      <rect x="18" y="62" width="6" height="10" rx="2" fill="var(--color-primary)" fillOpacity="0.2" stroke="var(--color-primary)" strokeWidth="1" />
      {/* Strap lug right */}
      <rect x="104" y="62" width="6" height="10" rx="2" fill="var(--color-primary)" fillOpacity="0.2" stroke="var(--color-primary)" strokeWidth="1" />

      {/* ── Flower cluster (right side) ───────────────────────── */}
      <g transform="translate(124, 80)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i}
            cx={Math.cos((deg - 90) * Math.PI / 180) * 10}
            cy={Math.sin((deg - 90) * Math.PI / 180) * 10}
            rx="5" ry="8.5"
            fill={i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-primary)'}
            fillOpacity="0.42"
            transform={`rotate(${deg}, ${Math.cos((deg - 90) * Math.PI / 180) * 10}, ${Math.sin((deg - 90) * Math.PI / 180) * 10})`}
          />
        ))}
        <circle cx="0" cy="0" r="6" fill="var(--color-accent)" fillOpacity="0.85" />
        <circle cx="0" cy="0" r="3" fill="var(--color-primary)" fillOpacity="0.7" />
      </g>

      {/* Small bud flowers below main flower */}
      <circle cx="114" cy="97" r="4.5" fill="var(--color-primary)" fillOpacity="0.35" />
      <circle cx="120" cy="103" r="4" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="112" cy="105" r="3.5" fill="var(--color-primary)" fillOpacity="0.3" />

      {/* Flower stems */}
      <path d="M114,97 Q118,108 122,116" stroke="var(--color-primary)" strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M120,103 Q122,112 120,120" stroke="var(--color-primary)" strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />

      {/* ── Music note (bottom right) ─────────────────────────── */}
      <g transform="translate(134, 118)" opacity="0.75">
        {/* Eighth note */}
        <line x1="0" y1="0" x2="0" y2="-22" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Flag */}
        <path d="M0,-22 C6,-18 8,-12 4,-8" stroke="var(--color-accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Note head */}
        <ellipse cx="-3" cy="0" rx="5" ry="4" fill="var(--color-accent)" fillOpacity="0.75" transform="rotate(-15 -3 0)" />
      </g>

      {/* Sparkles */}
      <circle cx="18" cy="100" r="2" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="100" cy="140" r="1.5" fill="var(--color-primary)" fillOpacity="0.3" />
      <circle cx="28" cy="48" r="1.5" fill="var(--color-accent)" fillOpacity="0.35" />
    </svg>
  )
}
