export default function ChecklistIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* Clipboard body */}
      <rect x="35" y="32" width="82" height="108" rx="6" fill="var(--color-card-bg, white)" stroke="var(--color-primary)" strokeWidth="2" />
      <rect x="35" y="32" width="82" height="108" rx="6" fill="var(--color-primary)" fillOpacity="0.05" />

      {/* Clipboard clip at top */}
      <rect x="62" y="24" width="36" height="18" rx="5" fill="var(--color-primary)" fillOpacity="0.15" stroke="var(--color-primary)" strokeWidth="1.8" />
      <rect x="68" y="28" width="24" height="10" rx="3" fill="var(--color-card-bg, white)" stroke="var(--color-primary)" strokeWidth="1.2" />
      <line x1="80" y1="28" x2="80" y2="38" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.5" />

      {/* Checklist items */}
      {/* Item 1 — checked */}
      <rect x="48" y="58" width="11" height="11" rx="2.5" stroke="var(--color-primary)" strokeWidth="1.5" fill="var(--color-primary)" fillOpacity="0.15" />
      <path d="M50,63.5 L53,67 L58,60" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="65" y="61" width="42" height="5" rx="2.5" fill="var(--color-primary)" fillOpacity="0.2" />

      {/* Item 2 — checked */}
      <rect x="48" y="76" width="11" height="11" rx="2.5" stroke="var(--color-primary)" strokeWidth="1.5" fill="var(--color-primary)" fillOpacity="0.15" />
      <path d="M50,81.5 L53,85 L58,78" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="65" y="79" width="36" height="5" rx="2.5" fill="var(--color-primary)" fillOpacity="0.18" />

      {/* Item 3 — unchecked */}
      <rect x="48" y="94" width="11" height="11" rx="2.5" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
      <rect x="65" y="97" width="44" height="5" rx="2.5" fill="var(--color-primary)" fillOpacity="0.12" />

      {/* Item 4 — unchecked */}
      <rect x="48" y="112" width="11" height="11" rx="2.5" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
      <rect x="65" y="115" width="30" height="5" rx="2.5" fill="var(--color-primary)" fillOpacity="0.1" />

      {/* Quill pen — diagonal across the clipboard (decorative) */}
      <g transform="translate(95, 125) rotate(-42)">
        {/* Feather shaft */}
        <line x1="0" y1="-32" x2="0" y2="8" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Feather barbs left */}
        <path d="M0,-28 C-8,-22 -10,-12 -6,-4" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M0,-20 C-7,-15 -9,-8 -5,0" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M0,-12 C-6,-8 -7,-2 -4,4" stroke="var(--color-accent)" strokeWidth="0.9" fill="none" opacity="0.35" />
        {/* Feather barbs right */}
        <path d="M0,-28 C8,-22 10,-12 6,-4" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M0,-20 C7,-15 9,-8 5,0" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M0,-12 C6,-8 7,-2 4,4" stroke="var(--color-accent)" strokeWidth="0.9" fill="none" opacity="0.35" />
        {/* Nib */}
        <path d="M-2,6 L0,12 L2,6" fill="var(--color-accent)" fillOpacity="0.7" />
      </g>

      {/* Small flower bottom corner */}
      <g transform="translate(48, 132)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i}
            cx={Math.cos((deg - 90) * Math.PI / 180) * 7}
            cy={Math.sin((deg - 90) * Math.PI / 180) * 7}
            rx="3.5" ry="5.5"
            fill={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}
            fillOpacity="0.4"
            transform={`rotate(${deg}, ${Math.cos((deg - 90) * Math.PI / 180) * 7}, ${Math.sin((deg - 90) * Math.PI / 180) * 7})`}
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill="var(--color-accent)" fillOpacity="0.75" />
        <circle cx="0" cy="0" r="2" fill="var(--color-primary)" fillOpacity="0.6" />
      </g>

      {/* Sparkles */}
      <circle cx="22" cy="55" r="2" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="140" cy="48" r="1.5" fill="var(--color-primary)" fillOpacity="0.3" />
    </svg>
  )
}
