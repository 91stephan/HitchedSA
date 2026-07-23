import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import { useMeta } from '../hooks/useMeta'
import { PROVINCE_LIST } from '../content/provinces'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'South African Wedding Venues by Province',
  description:
    'Browse wedding venue guides for every South African province — areas, prices, seasons and booking advice for Western Cape, Gauteng, KwaZulu-Natal and more.',
  url: 'https://hitchedsa.co.za/wedding-venues',
  publisher: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
}

export default function WeddingVenuesHub() {
  useMeta({
    title: 'South African Wedding Venues by Province',
    description:
      'Find your wedding venue by province — in-depth guides to all nine South African provinces with featured venues, areas, real price ranges, best seasons and local booking tips.',
    url: '/wedding-venues',
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
        Wedding Venues
      </p>
      <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        South African Wedding Venues by Province
      </h1>
      <p className="text-base mb-10 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
        Every province has its own wedding character — Winelands estates in the Cape, garden
        chapels around Johannesburg, warm-ocean beaches in KZN. Pick your province for an
        in-depth guide to areas, prices, seasons and booking.
      </p>

      {/* Province guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {PROVINCE_LIST.map((p) => (
          <Link key={p.slug} to={`/wedding-venues/${p.slug}`} className="card p-6 block hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{p.emoji}</div>
            <h2 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>
              {p.name}
            </h2>
            <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>{p.tagline}</p>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
              Read the guide →
            </span>
          </Link>
        ))}
      </div>

      <AdBanner slot="venues-hub-mid" size="leaderboard" />

      {/* National guide + planner CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
        <Link to="/wedding-venues-guide" className="card p-6 block hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🗺️</div>
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>
            National Venue Guide
          </h2>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Venue types, all regions compared, what to check on visits, and how booking works in South Africa.
          </p>
        </Link>
        <div className="card p-6 text-center" style={{ background: 'var(--color-surface)' }}>
          <div className="text-3xl mb-3">🔍</div>
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>
            Search Real Venues
          </h2>
          <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Browse and shortlist venues across SA with HitchedSA's free venue search.
          </p>
          <Link to="/login" className="btn-primary text-sm px-6">
            Search Venues Free
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <AdBanner slot="venues-hub-bottom" size="leaderboard" />
      </div>
    </div>
  )
}
