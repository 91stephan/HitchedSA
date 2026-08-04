// A faint, fixed, full-viewport photo that sits behind a page's content to
// gently reflect the page's theme. It paints above the solid theme background
// (via z-index: -10) but below all page content, so cards and text stay fully
// readable. Decorative only, so it is aria-hidden and ignores pointer events.
//
// Must be rendered as a SIBLING before the page's content wrapper, never inside
// it: the page wrappers use `animate-fade-in` (a CSS transform), and a `fixed`
// element inside a transformed ancestor is clipped to that ancestor instead of
// the viewport.
export default function PageBackdrop({ src, position = 'center', strength = 0.16 }) {
  // strength = how visible the photo is (0 = invisible, 1 = full). The veil is
  // the theme background colour laid over the photo; higher strength = thinner
  // veil. Kept low so running text over the page gutters stays comfortable.
  const veilTop = Math.round((1 - strength) * 100)
  const veilBottom = Math.min(100, veilTop + 12)
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        backgroundImage:
          `linear-gradient(to bottom, ` +
          `color-mix(in srgb, var(--color-bg) ${veilTop}%, transparent), ` +
          `color-mix(in srgb, var(--color-bg) ${veilBottom}%, transparent)), ` +
          `url(${src})`,
        backgroundSize: 'cover, cover',
        backgroundPosition: `center, ${position}`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundAttachment: 'fixed, fixed',
        filter: 'saturate(0.9)',
      }}
    />
  )
}
