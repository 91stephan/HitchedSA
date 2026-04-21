export default function GuestIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* Floating hearts above */}
      {/* Large heart centre */}
      <path d="M80,38 C80,38 75,32 70,32 C64,32 60,37 60,42 C60,50 70,58 80,65 C90,58 100,50 100,42 C100,37 96,32 90,32 C85,32 80,38 80,38 Z"
        fill="var(--color-primary)" fillOpacity="0.35" />
      {/* Small heart left */}
      <path d="M48,30 C48,30 45,27 42,27 C38.5,27 36,30 36,33 C36,37.5 41,42 48,46 C55,42 60,37.5 60,33 C60,30 57.5,27 54,27 C51,27 48,30 48,30 Z"
        fill="var(--color-accent)" fillOpacity="0.3" />
      {/* Small heart right */}
      <path d="M112,30 C112,30 109,27 106,27 C102.5,27 100,30 100,33 C100,37.5 105,42 112,46 C119,42 124,37.5 124,33 C124,30 121.5,27 118,27 C115,27 112,30 112,30 Z"
        fill="var(--color-accent)" fillOpacity="0.28" />

      {/* Left figure — partner 1 (primary) */}
      {/* Head */}
      <circle cx="52" cy="78" r="16" stroke="var(--color-primary)" strokeWidth="1.8" fill="var(--color-primary)" fillOpacity="0.1" />
      {/* Neck */}
      <line x1="52" y1="94" x2="52" y2="100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Body / dress silhouette */}
      <path d="M28,148 Q32,100 52,100 Q72,100 76,148 Z"
        stroke="var(--color-primary)" strokeWidth="1.8" fill="var(--color-primary)" fillOpacity="0.1" />
      {/* Arms */}
      <path d="M32,112 Q40,110 52,108" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M72,112 Q64,110 52,108" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

      {/* Right figure — partner 2 (accent) */}
      {/* Head */}
      <circle cx="108" cy="78" r="16" stroke="var(--color-accent)" strokeWidth="1.8" fill="var(--color-accent)" fillOpacity="0.1" />
      {/* Neck */}
      <line x1="108" y1="94" x2="108" y2="100" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Body / suit silhouette */}
      <path d="M84,148 Q88,100 108,100 Q128,100 132,148 Z"
        stroke="var(--color-accent)" strokeWidth="1.8" fill="var(--color-accent)" fillOpacity="0.1" />
      {/* Arms */}
      <path d="M88,112 Q96,110 108,108" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M128,112 Q120,110 108,108" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

      {/* Holding hands in centre */}
      <path d="M72,122 Q80,118 88,122" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M72,122 Q80,118 88,122" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

      {/* Ground line */}
      <line x1="18" y1="148" x2="142" y2="148" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.18" strokeLinecap="round" />

      {/* Tiny sparkles */}
      <circle cx="18" cy="68" r="2" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="142" cy="72" r="1.5" fill="var(--color-primary)" fillOpacity="0.3" />
    </svg>
  )
}
