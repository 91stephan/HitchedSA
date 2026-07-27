import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import Icon from '../components/Icon'
import { useMeta } from '../hooks/useMeta'
import { PROVINCE_LIST } from '../content/provinces'
import { ARTICLE_LIST } from '../content/articles'

const GUIDES = [
  {
    to: '/wedding-guide',
    image: '/images/articles/best-wedding-season-south-africa.jpg',
    imageAlt: 'Outdoor South African wedding ceremony setup',
    category: 'Planning',
    title: 'The Complete SA Wedding Planning Guide',
    desc: 'Every step from engagement to "I do": timelines, budgets, suppliers and SA-specific advice.',
    read: '15 min read',
  },
  {
    to: '/wedding-venues-guide',
    image: '/images/venue-types/wine-farm.jpg',
    imageAlt: 'Wine farm wedding venue in the Cape Winelands',
    category: 'Venues',
    title: 'South African Wedding Venues: The Complete Regional Guide',
    desc: 'Wine farms, bush lodges, beaches and heritage estates: every venue type and region compared.',
    read: '12 min read',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Wedding Guides & Articles',
  description: 'Wedding planning guides and venue advice for South African couples.',
  url: 'https://hitchedsa.co.za/articles',
  publisher: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
}

function ArticleCard({ to, category, title, desc, read, image, imageAlt }) {
  return (
    <Link to={to} className="card p-0 block overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={image}
        alt={imageAlt}
        width="800"
        height="360"
        loading="lazy"
        className="w-full object-cover"
        style={{ aspectRatio: '20 / 9' }}
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
            {category}
          </span>
        </div>
        <h2 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--color-heading)' }}>
          {title}
        </h2>
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{read}</span>
      </div>
    </Link>
  )
}

export default function Articles() {
  useMeta({
    title: 'Wedding Guides & Articles for SA Couples',
    description:
      'Free wedding planning guides written for South Africa: venue guides by province, budgets in rand, seasonal advice and planning checklists.',
    url: '/articles',
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
        Guides & Articles
      </p>
      <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        Wedding Guides for South African Couples
      </h1>
      <p className="text-base mb-10 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
        Practical, local, and free: budgets in rand, load shedding contingencies, seasonal
        advice for every province, and the honest prices venues actually charge.
      </p>

      <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
        Planning Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {GUIDES.map((g) => (
          <ArticleCard key={g.to} {...g} />
        ))}
      </div>

      <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
        Latest Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {ARTICLE_LIST.map((a) => (
          <ArticleCard
            key={a.slug}
            to={`/articles/${a.slug}`}
            image={`/images/articles/${a.slug}.jpg`}
            imageAlt={a.title}
            category={a.category}
            title={a.title}
            desc={a.excerpt}
            read={a.readTime}
          />
        ))}
      </div>

      <AdBanner slot="articles-hub-mid" size="leaderboard" />

      <h2 className="font-display text-xl font-bold mb-4 mt-12" style={{ color: 'var(--color-heading)' }}>
        Venue Guides by Province
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {PROVINCE_LIST.map((p) => (
          <ArticleCard
            key={p.slug}
            to={`/wedding-venues/${p.slug}`}
            image={p.image}
            imageAlt={p.imageAlt}
            category="Venues"
            title={`Wedding Venues in ${p.inName}`}
            desc={p.tagline}
            read={p.readTime}
          />
        ))}
      </div>

      <div className="mb-12">
        <AdBanner slot="articles-hub-bottom" size="leaderboard" />
      </div>

      {/* CTA */}
      <div className="card p-8 text-center" style={{ background: 'var(--color-surface)' }}>
        <div className="flex justify-center mb-3">
          <Icon name="rings" size={32} style={{ color: 'var(--color-primary)' }} />
        </div>
        <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
          Ready to Start Planning?
        </h2>
        <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          HitchedSA's free planner keeps your venue shortlist, budget, guest list and checklist in one place.
        </p>
        <Link to="/login" className="btn-primary text-sm px-8">
          Start Planning Free
        </Link>
      </div>
    </div>
  )
}
