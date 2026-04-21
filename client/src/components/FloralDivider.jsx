export default function FloralDivider({ className = '' }) {
  return (
    <div className={`floral-divider ${className}`}>
      <svg
        width="120"
        height="28"
        viewBox="0 0 120 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'var(--color-primary)', opacity: 0.55 }}
      >
        {/* Left branch */}
        <path d="M0 14 Q10 6 20 14 Q30 22 40 14" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M12 14 Q16 8 20 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M28 14 Q32 8 36 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Small leaves left */}
        <ellipse cx="10" cy="9" rx="4" ry="2.2" transform="rotate(-25 10 9)" fill="currentColor" opacity="0.4"/>
        <ellipse cx="30" cy="9" rx="4" ry="2.2" transform="rotate(-155 30 9)" fill="currentColor" opacity="0.4"/>

        {/* Centre bloom */}
        <circle cx="60" cy="14" r="4" fill="currentColor" opacity="0.7"/>
        <circle cx="60" cy="14" r="2" fill="currentColor" opacity="0.9"/>
        <circle cx="60" cy="7" r="2.2" fill="currentColor" opacity="0.35"/>
        <circle cx="60" cy="21" r="2.2" fill="currentColor" opacity="0.35"/>
        <circle cx="53" cy="14" r="2.2" fill="currentColor" opacity="0.35"/>
        <circle cx="67" cy="14" r="2.2" fill="currentColor" opacity="0.35"/>
        <circle cx="55" cy="9"  r="1.8" fill="currentColor" opacity="0.25"/>
        <circle cx="65" cy="9"  r="1.8" fill="currentColor" opacity="0.25"/>
        <circle cx="55" cy="19" r="1.8" fill="currentColor" opacity="0.25"/>
        <circle cx="65" cy="19" r="1.8" fill="currentColor" opacity="0.25"/>

        {/* Right branch (mirrored) */}
        <path d="M120 14 Q110 6 100 14 Q90 22 80 14" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M108 14 Q104 8 100 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M92 14 Q88 8 84 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Small leaves right */}
        <ellipse cx="110" cy="9" rx="4" ry="2.2" transform="rotate(25 110 9)"  fill="currentColor" opacity="0.4"/>
        <ellipse cx="90"  cy="9" rx="4" ry="2.2" transform="rotate(155 90 9)"  fill="currentColor" opacity="0.4"/>
      </svg>
    </div>
  )
}
