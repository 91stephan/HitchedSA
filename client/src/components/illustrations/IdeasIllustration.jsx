export default function IdeasIllustration({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className="animate-float" aria-hidden="true">

      {/* Back polaroid (rotated left) */}
      <g transform="rotate(-18, 52, 95)">
        <rect x="28" y="62" width="48" height="58" rx="4" fill="var(--color-primary)" fillOpacity="0.08" stroke="var(--color-primary)" strokeWidth="1.5" />
        {/* Photo area */}
        <rect x="33" y="67" width="38" height="36" rx="2" fill="var(--color-primary)" fillOpacity="0.15" />
        {/* Caption line */}
        <rect x="35" y="108" width="28" height="4" rx="2" fill="var(--color-primary)" fillOpacity="0.25" />
        <rect x="38" y="115" width="20" height="3" rx="1.5" fill="var(--color-primary)" fillOpacity="0.15" />
        {/* Small heart in photo */}
        <path d="M52,80 C52,80 50,78 48,78 C45.5,78 44,80 44,82 C44,85 48,88 52,91 C56,88 60,85 60,82 C60,80 58.5,78 56,78 C54,78 52,80 52,80 Z"
          fill="var(--color-primary)" fillOpacity="0.4" />
      </g>

      {/* Right polaroid (rotated right) */}
      <g transform="rotate(15, 108, 95)">
        <rect x="84" y="62" width="48" height="58" rx="4" fill="var(--color-accent)" fillOpacity="0.08" stroke="var(--color-accent)" strokeWidth="1.5" />
        {/* Photo area */}
        <rect x="89" y="67" width="38" height="36" rx="2" fill="var(--color-accent)" fillOpacity="0.15" />
        {/* Caption line */}
        <rect x="91" y="108" width="28" height="4" rx="2" fill="var(--color-accent)" fillOpacity="0.25" />
        <rect x="94" y="115" width="20" height="3" rx="1.5" fill="var(--color-accent)" fillOpacity="0.15" />
        {/* Small flower in photo */}
        <circle cx="108" cy="78" r="4" fill="var(--color-accent)" fillOpacity="0.45" />
        <circle cx="113" cy="82" r="3.5" fill="var(--color-accent)" fillOpacity="0.35" />
        <circle cx="108" cy="87" r="4" fill="var(--color-accent)" fillOpacity="0.4" />
        <circle cx="103" cy="82" r="3.5" fill="var(--color-accent)" fillOpacity="0.35" />
        <circle cx="108" cy="82" r="3" fill="var(--color-accent)" fillOpacity="0.7" />
      </g>

      {/* Front polaroid (centred, upright) */}
      <rect x="56" y="52" width="48" height="60" rx="4" fill="var(--color-card-bg, white)" stroke="var(--color-primary)" strokeWidth="1.8" />
      <rect x="61" y="57" width="38" height="38" rx="2" fill="var(--color-primary)" fillOpacity="0.12" stroke="var(--color-primary)" strokeWidth="0.8" />
      {/* Flower bouquet in front photo */}
      <circle cx="80" cy="70" r="5" fill="var(--color-primary)" fillOpacity="0.4" />
      <circle cx="86" cy="74" r="4.5" fill="var(--color-accent)" fillOpacity="0.45" />
      <circle cx="80" cy="78" r="5" fill="var(--color-primary)" fillOpacity="0.35" />
      <circle cx="74" cy="74" r="4.5" fill="var(--color-accent)" fillOpacity="0.4" />
      <circle cx="80" cy="74" r="4" fill="var(--color-accent)" fillOpacity="0.7" />
      {/* Stems */}
      <line x1="80" y1="83" x2="78" y2="93" stroke="var(--color-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <line x1="80" y1="83" x2="82" y2="93" stroke="var(--color-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <line x1="80" y1="83" x2="80" y2="93" stroke="var(--color-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Caption lines */}
      <rect x="63" y="99" width="34" height="4" rx="2" fill="var(--color-text, #4A2C35)" fillOpacity="0.18" />
      <rect x="67" y="106" width="26" height="3" rx="1.5" fill="var(--color-text, #4A2C35)" fillOpacity="0.1" />

      {/* Scattered small flowers outside */}
      <circle cx="22" cy="58" r="4" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="26" cy="62" r="3" fill="var(--color-primary)" fillOpacity="0.3" />
      <circle cx="22" cy="66" r="3.5" fill="var(--color-accent)" fillOpacity="0.3" />
      <circle cx="22" cy="62" r="2.5" fill="var(--color-accent)" fillOpacity="0.7" />

      <circle cx="138" cy="50" r="3.5" fill="var(--color-primary)" fillOpacity="0.35" />
      <circle cx="142" cy="54" r="3" fill="var(--color-accent)" fillOpacity="0.3" />
      <circle cx="138" cy="58" r="3" fill="var(--color-primary)" fillOpacity="0.3" />
      <circle cx="138" cy="54" r="2" fill="var(--color-primary)" fillOpacity="0.7" />

      {/* Push pin on front polaroid */}
      <circle cx="80" cy="53" r="3.5" fill="var(--color-accent)" fillOpacity="0.75" />
      <circle cx="80" cy="53" r="1.5" fill="var(--color-accent)" fillOpacity="0.95" />
    </svg>
  )
}
