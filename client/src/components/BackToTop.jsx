import { useEffect, useState } from 'react'
import Icon from './Icon'

// Floating "back to top" button that fades in after the reader scrolls down.
// Handy on the long article and guide pages. SSR-safe: state starts hidden and
// the scroll listener only attaches in the browser via useEffect.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-opacity hover:opacity-90"
      style={{ background: 'var(--color-primary)', color: '#fff' }}
    >
      <Icon name="arrowUp" size={20} />
    </button>
  )
}
