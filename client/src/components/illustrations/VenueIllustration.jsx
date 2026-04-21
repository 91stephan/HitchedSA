export default function VenueIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* Steps at base */}
      <rect x="22" y="138" width="116" height="9" rx="2" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.45" />
      <rect x="32" y="130" width="96" height="9" rx="2" fill="var(--color-primary)" fillOpacity="0.08" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.4" />

      {/* Left pillar */}
      <rect x="36" y="66" width="20" height="72" rx="3" fill="var(--color-primary)" fillOpacity="0.08" stroke="var(--color-primary)" strokeWidth="1.5" />
      {/* Left pillar capital */}
      <rect x="33" y="63" width="26" height="6" rx="1.5" fill="var(--color-primary)" fillOpacity="0.15" stroke="var(--color-primary)" strokeWidth="1.2" />

      {/* Right pillar */}
      <rect x="104" y="66" width="20" height="72" rx="3" fill="var(--color-primary)" fillOpacity="0.08" stroke="var(--color-primary)" strokeWidth="1.5" />
      {/* Right pillar capital */}
      <rect x="101" y="63" width="26" height="6" rx="1.5" fill="var(--color-primary)" fillOpacity="0.15" stroke="var(--color-primary)" strokeWidth="1.2" />

      {/* Arch (filled gently) */}
      <path d="M36,66 Q36,18 80,18 Q124,18 124,66" stroke="var(--color-primary)" strokeWidth="2.5" fill="var(--color-primary)" fillOpacity="0.05" />

      {/* Door — rounded top */}
      <path d="M57,130 L57,88 Q57,70 80,70 Q103,70 103,88 L103,130 Z"
        stroke="var(--color-accent)" strokeWidth="1.5" fill="var(--color-accent)" fillOpacity="0.1" />
      {/* Door panel lines */}
      <line x1="80" y1="70" x2="80" y2="130" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.35" />
      <line x1="57" y1="100" x2="103" y2="100" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.35" />
      {/* Door knob */}
      <circle cx="96" cy="108" r="3.5" fill="var(--color-accent)" fillOpacity="0.65" />
      <circle cx="96" cy="108" r="1.5" fill="var(--color-accent)" fillOpacity="0.9" />

      {/* Climbing vine stem on left */}
      <path d="M36,63 C29,50 33,36 30,22" stroke="var(--color-primary)" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />

      {/* Leaves on vine */}
      <ellipse cx="32" cy="23" rx="8" ry="3.5" fill="var(--color-primary)" fillOpacity="0.3" transform="rotate(-35 32 23)" />
      <ellipse cx="30" cy="40" rx="8" ry="3" fill="var(--color-primary)" fillOpacity="0.25" transform="rotate(22 30 40)" />
      <ellipse cx="33" cy="57" rx="7" ry="3" fill="var(--color-primary)" fillOpacity="0.22" transform="rotate(-12 33 57)" />

      {/* Small flowers on left vine */}
      <circle cx="32" cy="24" r="3.5" fill="var(--color-accent)" fillOpacity="0.55" />
      <circle cx="32" cy="24" r="1.5" fill="var(--color-accent)" fillOpacity="0.85" />
      <circle cx="30" cy="42" r="2.5" fill="var(--color-primary)" fillOpacity="0.5" />

      {/* Arch crown flower cluster */}
      <circle cx="80" cy="19" r="5.5" fill="var(--color-accent)" fillOpacity="0.5" />
      <circle cx="72" cy="24" r="4" fill="var(--color-primary)" fillOpacity="0.4" />
      <circle cx="88" cy="24" r="4" fill="var(--color-accent)" fillOpacity="0.4" />
      <circle cx="80" cy="19" r="3" fill="var(--color-accent)" fillOpacity="0.85" />

      {/* Sparkles */}
      <circle cx="120" cy="40" r="2" fill="var(--color-accent)" fillOpacity="0.4" />
      <circle cx="145" cy="90" r="1.5" fill="var(--color-primary)" fillOpacity="0.3" />
    </svg>
  )
}
