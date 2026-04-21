export default function BudgetIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* Clutch bag body */}
      <path
        d="M28,90 Q28,60 55,58 L105,58 Q132,60 132,90 L132,118 Q132,134 105,135 L55,135 Q28,134 28,118 Z"
        fill="var(--color-accent)" fillOpacity="0.1"
        stroke="var(--color-accent)" strokeWidth="2"
      />

      {/* Bag flap (top fold) */}
      <path
        d="M32,90 Q32,66 55,64 L105,64 Q128,66 128,90"
        fill="var(--color-accent)" fillOpacity="0.08"
        stroke="var(--color-accent)" strokeWidth="1.5"
      />

      {/* Stitching detail on flap */}
      <path
        d="M40,84 Q40,70 58,68 L102,68 Q120,70 120,84"
        stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"
        fill="none"
      />

      {/* Clasp — oval metal catch */}
      <ellipse cx="80" cy="90" rx="16" ry="10" fill="var(--color-accent)" fillOpacity="0.15" stroke="var(--color-accent)" strokeWidth="1.8" />
      <ellipse cx="80" cy="90" rx="9" ry="5.5" fill="var(--color-accent)" fillOpacity="0.3" stroke="var(--color-accent)" strokeWidth="1.2" />

      {/* Chain handle */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse
          key={i}
          cx={80 + (i - 3) * 10}
          cy={52}
          rx="5" ry="3"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          opacity="0.55"
        />
      ))}
      {/* Chain links connecting down */}
      <line x1="52" y1="52" x2="50" y2="64" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.4" />
      <line x1="108" y1="52" x2="110" y2="64" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.4" />

      {/* Flower decoration on bag */}
      <g transform="translate(100, 104)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i} cx={Math.cos((deg - 90) * Math.PI / 180) * 8} cy={Math.sin((deg - 90) * Math.PI / 180) * 8}
            rx="4.5" ry="7"
            fill={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}
            fillOpacity="0.4"
            transform={`rotate(${deg}, ${Math.cos((deg - 90) * Math.PI / 180) * 8}, ${Math.sin((deg - 90) * Math.PI / 180) * 8})`}
          />
        ))}
        <circle cx="0" cy="0" r="5.5" fill="var(--color-accent)" fillOpacity="0.75" />
        <circle cx="0" cy="0" r="2.5" fill="var(--color-primary)" fillOpacity="0.6" />
      </g>

      {/* Coin circle */}
      <circle cx="44" cy="108" r="14" fill="var(--color-accent)" fillOpacity="0.1" stroke="var(--color-accent)" strokeWidth="1.5" />
      <circle cx="44" cy="108" r="10" fill="var(--color-accent)" fillOpacity="0.12" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.5" />
      {/* R symbol in coin */}
      <text x="40" y="113" fontFamily="Georgia, serif" fontSize="12" fill="var(--color-accent)" fillOpacity="0.7" fontWeight="bold">R</text>

      {/* Sparkles */}
      <circle cx="22" cy="75" r="2" fill="var(--color-primary)" fillOpacity="0.35" />
      <circle cx="138" cy="78" r="1.5" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="70" cy="142" r="1.5" fill="var(--color-primary)" fillOpacity="0.3" />
    </svg>
  )
}
