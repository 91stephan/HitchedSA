export default function SeatingIllustration({ size = 160 }) {
  const chairs = 8
  const cx = 80
  const cy = 82
  const tableR = 36
  const chairR = tableR + 18
  const chairW = 12
  const chairH = 9

  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* Tablecloth outer ring */}
      <circle cx={cx} cy={cy} r={tableR + 6} fill="var(--color-primary)" fillOpacity="0.06" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3" />

      {/* Table surface */}
      <circle cx={cx} cy={cy} r={tableR} fill="var(--color-accent)" fillOpacity="0.1" stroke="var(--color-primary)" strokeWidth="2.2" />

      {/* Centre flower on table */}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg - 90) * (Math.PI / 180)
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(rad) * 10}
            cy={cy + Math.sin(rad) * 10}
            rx="5" ry="8"
            fill={i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)'}
            fillOpacity="0.35"
            transform={`rotate(${deg}, ${cx + Math.cos(rad) * 10}, ${cy + Math.sin(rad) * 10})`}
          />
        )
      })}
      <circle cx={cx} cy={cy} r="6" fill="var(--color-accent)" fillOpacity="0.8" />
      <circle cx={cx} cy={cy} r="3" fill="var(--color-primary)" fillOpacity="0.7" />

      {/* Chairs around the table */}
      {Array.from({ length: chairs }, (_, i) => {
        const angle = ((360 / chairs) * i - 90) * (Math.PI / 180)
        const chairCx = cx + chairR * Math.cos(angle)
        const chairCy = cy + chairR * Math.sin(angle)
        const deg = (360 / chairs) * i
        return (
          <g key={i} transform={`rotate(${deg}, ${cx}, ${cy})`}>
            {/* Chair back (rounded rectangle) */}
            <rect
              x={cx - chairW / 2}
              y={cy - chairR - chairH}
              width={chairW}
              height={chairH}
              rx="3"
              fill="var(--color-primary)"
              fillOpacity="0.18"
              stroke="var(--color-primary)"
              strokeWidth="1.4"
            />
            {/* Chair seat */}
            <rect
              x={cx - chairW / 2 + 1}
              y={cy - chairR - 1}
              width={chairW - 2}
              height="5"
              rx="1.5"
              fill="var(--color-primary)"
              fillOpacity="0.12"
              stroke="var(--color-primary)"
              strokeWidth="1"
            />
            {/* Place plate */}
            <circle
              cx={cx}
              cy={cy - tableR + 10}
              r="5"
              fill="var(--color-accent)"
              fillOpacity="0.2"
              stroke="var(--color-accent)"
              strokeWidth="1"
            />
          </g>
        )
      })}

      {/* Sparkles */}
      <circle cx="18" cy="82" r="2" fill="var(--color-accent)" fillOpacity="0.3" />
      <circle cx="142" cy="82" r="2" fill="var(--color-primary)" fillOpacity="0.3" />
      <circle cx="80" cy="18" r="2" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="80" cy="148" r="2" fill="var(--color-primary)" fillOpacity="0.3" />
    </svg>
  )
}
