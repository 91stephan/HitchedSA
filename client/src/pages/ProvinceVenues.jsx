import { Fragment } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import ShareButtons from '../components/ShareButtons'
import { useMeta } from '../hooks/useMeta'
import { PROVINCES, PROVINCE_LIST } from '../content/provinces'

function buildSchema(p) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.metaTitle,
      description: p.metaDescription,
      author: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
      publisher: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
      url: `https://hitchedsa.co.za/wedding-venues/${p.slug}`,
      dateModified: '2026-07-23',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hitchedsa.co.za/' },
        { '@type': 'ListItem', position: 2, name: 'Wedding Venues', item: 'https://hitchedsa.co.za/wedding-venues' },
        { '@type': 'ListItem', position: 3, name: p.name, item: `https://hitchedsa.co.za/wedding-venues/${p.slug}` },
      ],
    },
  ]
}

export default function ProvinceVenues() {
  const { slug } = useParams()
  const p = PROVINCES[slug]

  useMeta({
    title: p ? p.metaTitle : 'Wedding Venues',
    description: p ? p.metaDescription : undefined,
    url: p ? `/wedding-venues/${p.slug}` : '/wedding-venues',
  })

  if (!p) return <Navigate to="/wedding-venues" replace />

  const others = PROVINCE_LIST.filter((o) => o.slug !== p.slug)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(p)) }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">›</span>
        <Link to="/wedding-venues" className="hover:underline">Wedding Venues</Link>
        <span className="mx-1">›</span>
        <span style={{ color: 'var(--color-text)' }}>{p.name}</span>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
        Wedding Venues by Province
      </p>
      <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        Wedding Venues in {p.inName}
      </h1>
      <p className="text-base mb-2" style={{ color: 'var(--color-text-muted)' }}>
        {p.tagline}. Where to look, what it costs, and when to book.
      </p>
      <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
        Updated {p.updated} · {p.readTime}
      </p>
      <div className="mb-8">
        <ShareButtons
          title={`Wedding Venues in ${p.inName}: ${p.tagline}`}
          url={`https://hitchedsa.co.za/wedding-venues/${p.slug}`}
        />
      </div>

      <div className="space-y-14" style={{ color: 'var(--color-text)', lineHeight: 1.8 }}>

        {/* Intro */}
        <section>
          {p.intro.map((para, i) => (
            <p key={i} className="text-sm mb-4">{para}</p>
          ))}
        </section>

        {/* Areas */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
            Where to Get Married in {p.shortName}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            The province area by area, each with its own character, venues and price point.
          </p>
          <div className="space-y-5">
            {p.areas.map((a) => (
              <div key={a.name} className="card p-5">
                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>
                  {a.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-primary)' }}>{a.knownFor}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot={`province-${p.slug}-mid-1`} size="leaderboard" />

        {/* Featured venue listings - researched, real venues per province */}
        {p.venues.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
              Featured {p.shortName} Wedding Venues
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
              A hand-picked selection of real, operating venues across {p.inName}. Visit their websites for current packages and availability.
            </p>
            <div className="space-y-5">
              {p.venues.map((v, i) => (
                <Fragment key={v.name}>
                  <div className="card p-5">
                    <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--color-heading)' }}>{v.name}</h3>
                    <p className="text-xs mb-2" style={{ color: 'var(--color-primary)' }}>{v.area} · {v.type}</p>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-muted)' }}>{v.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {v.capacity && <span><strong style={{ color: 'var(--color-text)' }}>Capacity:</strong> {v.capacity}</span>}
                      {v.priceBand && <span><strong style={{ color: 'var(--color-text)' }}>Price:</strong> {v.priceBand}</span>}
                      {v.website && (
                        <a href={v.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
                          Visit website →
                        </a>
                      )}
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Look at ${v.name} in ${v.area} for our wedding 💍\nhttps://hitchedsa.co.za/wedding-venues/${p.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: '#25D366' }}
                      >
                        Share on WhatsApp
                      </a>
                    </div>
                  </div>
                  {/* In-list ad after the 4th venue card */}
                  {i === 3 && <AdBanner slot={`province-${p.slug}-venues`} size="leaderboard" />}
                </Fragment>
              ))}
            </div>
          </section>
        )}

        {/* Pricing */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            What {p.shortName} Wedding Venues Cost
          </h2>
          <div className="card p-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--color-heading)' }}>Item</th>
                  <th className="text-left py-2 font-semibold" style={{ color: 'var(--color-heading)' }}>Typical range</th>
                </tr>
              </thead>
              <tbody>
                {p.pricing.map((row) => (
                  <tr key={row.item} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="py-2.5 pr-4" style={{ color: 'var(--color-text)' }}>{row.item}</td>
                    <td className="py-2.5 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
            Ranges are indicative for 2026 and vary by season, day of week and guest count. Always confirm current pricing directly with venues.
          </p>
        </section>

        {/* Season */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Best Time of Year
          </h2>
          <div className="space-y-3">
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-accent)' }}>✅ Best months</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{p.season.best}</p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-accent)' }}>⚠️ Plan around</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{p.season.avoid}</p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-accent)' }}>🌤️ Weather wisdom</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{p.season.wind}</p>
            </div>
          </div>
        </section>

        <AdBanner slot={`province-${p.slug}-mid-2`} size="leaderboard" />

        {/* Tips */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Local Booking Tips
          </h2>
          <ul className="text-sm space-y-2 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            {p.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            {p.shortName} Wedding Venue FAQs
          </h2>
          <div className="space-y-4">
            {p.faqs.map((f) => (
              <div key={f.q} className="card p-5">
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-heading)' }}>{f.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot={`province-${p.slug}-bottom`} size="leaderboard" />

        {/* Other provinces */}
        <section>
          <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Venue Guides for Other Provinces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {others.map((o) => (
              <Link key={o.slug} to={`/wedding-venues/${o.slug}`} className="card p-5 block hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{o.emoji}</div>
                <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--color-heading)' }}>
                  {o.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{o.tagline}</p>
              </Link>
            ))}
            <Link to="/wedding-venues-guide" className="card p-5 block hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🗺️</div>
              <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--color-heading)' }}>
                National Venue Guide
              </h3>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Venue types, regions and the booking process across South Africa
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="card p-8 text-center" style={{ background: 'var(--color-surface)' }}>
            <div className="text-3xl mb-3">💍</div>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
              Planning a {p.shortName} Wedding?
            </h2>
            <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              Use HitchedSA's free planner (venue search, budget tracker, guest list, seating and checklist), built for South African couples.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="btn-primary text-sm px-8">
                Start Planning Free
              </Link>
              <Link to="/wedding-guide" className="btn-outline text-sm px-8">
                Full Planning Guide
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
