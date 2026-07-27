import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// SPA navigation keeps the previous scroll position, so jumping between pages
// (e.g. province to province) can land you mid-page. Reset to the top whenever
// the path changes. Renders nothing.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
