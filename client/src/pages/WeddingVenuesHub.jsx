import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import { useMeta } from '../hooks/useMeta'
import { PROVINCE_LIST } from '../content/provinces'
import Icon from '../components/Icon'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'South African Wedding Venues by Province',
  description:
    'Browse wedding venue guides for every South African province: areas, prices, seasons and booking advice for Western Cape, Gauteng, KwaZulu-Natal and more.',
  url: 'https://hitchedsa.co.za/wedding-venues',
  publisher: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
}

export default function WeddingVenuesHub() {
  useMeta({
    title: 'South African Wedding Venues by Province',
    description:
      'Find your wedding venue by province: in-depth guides to all nine South African provinces with featured venues, areas, real price ranges, best seasons and local booking tips.',
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
        Every province has its own wedding character: Winelands estates in the Cape, garden
        chapels around Johannesburg, warm-ocean beaches in KZN. Pick your province for an
        in-depth guide to areas, prices, seasons and booking.
      </p>

      {/* Province guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {PROVINCE_LIST.map((p) => (
          <Link key={p.slug} to={`/wedding-venues/${p.slug}`} className="card p-0 block overflow-hidden hover:shadow-md transition-shadow">
            {p.image && (
              <img
                src={p.image}
                alt={p.imageAlt}
                width="800"
                height="360"
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: '20 / 9' }}
              />
            )}
            <div className="p-6">
              <h2 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>
                {p.name}
              </h2>
              <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>{p.tagline}</p>
              <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                Read the guide →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Original SA-specific editorial: how to choose a venue */}
      <section className="mt-12 mb-4">
        <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
          How to Choose a Wedding Venue in South Africa
        </h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          <p>
            Your venue is usually the single biggest line on a South African wedding budget, and it quietly
            decides most of the other choices: your date, your guest numbers, your style and often your caterer.
            It is worth getting right before you book anything else. As a rough guide, venue hire alone runs from
            about R15,000 in the quieter regions to R65,000 or more for sought-after Winelands and Garden Route
            estates, while a full 100-guest wedding usually lands between R250,000 and R600,000 once everything is
            added.
          </p>

          <h3 className="font-display text-lg font-semibold pt-2" style={{ color: 'var(--color-heading)' }}>
            Start with the season and the region
          </h3>
          <p>
            South African weather is regional, so the right month depends entirely on where you marry. The Cape is
            driest from October to April but comes with the summer south-easter, so ask coastal and Winelands
            venues how they handle wind. The Highveld around Johannesburg and Pretoria gets short, dramatic
            afternoon thunderstorms in summer, which makes a late-afternoon ceremony and a solid wet-weather plan
            essential. KwaZulu-Natal is warm all year, but many locals prefer the mild, low-humidity winter. The
            Lowveld and bushveld are at their best in the dry winter months, which also line up with the best game
            viewing for safari weddings.
          </p>

          <h3 className="font-display text-lg font-semibold pt-2" style={{ color: 'var(--color-heading)' }}>
            Match the venue type to the day you picture
          </h3>
          <p>
            Wine farms and garden estates suit relaxed, scenic celebrations; beach and coastal venues work for
            warm-weather weddings with a view; bush lodges turn a wedding into a weekend away; and hotels or
            heritage and urban venues keep everything under one roof, which helps with older guests and winter
            dates. Each province guide above breaks down the areas, price ranges and standout venue styles for
            that region.
          </p>

          <h3 className="font-display text-lg font-semibold pt-2" style={{ color: 'var(--color-heading)' }}>
            Ask these questions on every site visit
          </h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>What is the wet-weather or high-wind plan, and where exactly does the ceremony move to?</li>
            <li>Is there a noise curfew, and what time does the music have to stop?</li>
            <li>Do you have to use in-house catering and bar, or can you bring your own, and is there corkage?</li>
            <li>How many guests can the space seat comfortably, not just at the maximum?</li>
            <li>Is on-site or nearby accommodation available for you and out-of-town guests?</li>
            <li>What deposit secures the date, and what is the cancellation and postponement policy?</li>
          </ul>

          <h3 className="font-display text-lg font-semibold pt-2" style={{ color: 'var(--color-heading)' }}>
            Book earlier than you think
          </h3>
          <p>
            Popular venues and peak Saturday dates in spring and autumn are often booked twelve to eighteen months
            ahead. If you have your heart set on a specific estate or a long weekend, secure the venue first and
            build the rest of the plan around it. Once your date is set, you can track every supplier, deposit and
            deadline in one place with the free HitchedSA planner.
          </p>
        </div>
      </section>

      <AdBanner slot="venues-hub-mid" size="leaderboard" />

      {/* National guide + planner CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
        <Link to="/wedding-venues-guide" className="card p-6 block hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-3"><Icon name="map" size={32} style={{ color: 'var(--color-primary)' }} /></div>
          <h2 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>
            National Venue Guide
          </h2>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Venue types, all regions compared, what to check on visits, and how booking works in South Africa.
          </p>
        </Link>
        <div className="card p-6 text-center" style={{ background: 'var(--color-surface)' }}>
          <div className="flex justify-center mb-3"><Icon name="search" size={32} style={{ color: 'var(--color-primary)' }} /></div>
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
