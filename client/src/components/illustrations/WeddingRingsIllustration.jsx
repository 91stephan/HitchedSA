import { useRef } from 'react'

export default function WeddingRingsIllustration({ size = 160 }) {
  const id = useRef(`wri-${Math.random().toString(36).slice(2, 8)}`).current

  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-t`}>
          <rect x="0" y="0" width="160" height="82" />
        </clipPath>
        <clipPath id={`${id}-b`}>
          <rect x="0" y="82" width="160" height="78" />
        </clipPath>
      </defs>

      {/* Left ring — bottom half sits behind right ring */}
      <circle cx="63" cy="82" r="35" stroke="var(--color-primary)" strokeWidth="7" fill="none" clipPath={`url(#${id}-b)`} />

      {/* Right ring — full, sits in middle layer */}
      <circle cx="97" cy="82" r="35" stroke="var(--color-accent)" strokeWidth="7" fill="none" />

      {/* Left ring — top half sits in front of right ring */}
      <circle cx="63" cy="82" r="35" stroke="var(--color-primary)" strokeWidth="7" fill="none" clipPath={`url(#${id}-t)`} />

      {/* Five-petal flower at the top junction */}
      <g transform="translate(80,47)">
        <ellipse cx="0" cy="-7.5" rx="4" ry="6.5" fill="var(--color-primary)" fillOpacity="0.45" />
        <ellipse cx="0" cy="-7.5" rx="4" ry="6.5" fill="var(--color-accent)" fillOpacity="0.45" transform="rotate(72)" />
        <ellipse cx="0" cy="-7.5" rx="4" ry="6.5" fill="var(--color-primary)" fillOpacity="0.4" transform="rotate(144)" />
        <ellipse cx="0" cy="-7.5" rx="4" ry="6.5" fill="var(--color-accent)" fillOpacity="0.4" transform="rotate(216)" />
        <ellipse cx="0" cy="-7.5" rx="4" ry="6.5" fill="var(--color-primary)" fillOpacity="0.42" transform="rotate(288)" />
        <circle cx="0" cy="0" r="5" fill="var(--color-accent)" fillOpacity="0.9" />
        <circle cx="0" cy="0" r="2.5" fill="var(--color-primary)" fillOpacity="0.7" />
      </g>

      {/* Small diamond gem on left ring */}
      <polygon points="29,82 33,76 37,82 33,88" fill="var(--color-accent)" fillOpacity="0.75" />
      <polygon points="30,82 33,77.5 36,82 33,86.5" fill="var(--color-accent)" fillOpacity="0.3" />

      {/* Small diamond gem on right ring */}
      <polygon points="123,82 127,76 131,82 127,88" fill="var(--color-primary)" fillOpacity="0.75" />
      <polygon points="124,82 127,77.5 130,82 127,86.5" fill="var(--color-primary)" fillOpacity="0.3" />

      {/* Tiny sparkles */}
      <circle cx="46" cy="54" r="2.5" fill="var(--color-accent)" fillOpacity="0.45" />
      <circle cx="44" cy="54" r="1" fill="var(--color-accent)" fillOpacity="0.3" />
      <circle cx="116" cy="112" r="2" fill="var(--color-primary)" fillOpacity="0.4" />
      <circle cx="52" cy="118" r="1.5" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="120" cy="52" r="2" fill="var(--color-primary)" fillOpacity="0.35" />
    </svg>
  )
}
