import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'

// Real 404 page. Replaces the old catch-all redirect to "/", which Google
// treated as a soft 404 and which dropped mistyped-URL visitors on the homepage
// with no explanation.
export default function NotFound() {
  useMeta({
    title: 'Page Not Found',
    description: 'The page you were looking for could not be found. Explore HitchedSA wedding guides, venues by province, and free planning tools.',
    url: '/404',
    noindex: true,
  })

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fade-in">
      <div className="font-vibes text-6xl mb-4" style={{ color: 'var(--color-primary)' }}>
        Oops
      </div>
      <h1 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        We could not find that page
      </h1>
      <p className="text-base mb-8" style={{ color: 'var(--color-text-muted)' }}>
        The link may be broken or the page may have moved. Here are some good places to pick up
        your planning.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="btn-primary text-sm px-6">
          Back to Home
        </Link>
        <Link to="/wedding-venues" className="btn-outline text-sm px-6">
          Wedding Venues
        </Link>
        <Link to="/articles" className="btn-outline text-sm px-6">
          Guides &amp; Articles
        </Link>
      </div>
    </div>
  )
}
