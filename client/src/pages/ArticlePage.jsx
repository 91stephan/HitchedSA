import { Fragment } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import ShareButtons from '../components/ShareButtons'
import Icon from '../components/Icon'
import { useMeta } from '../hooks/useMeta'
import { ARTICLES, ARTICLE_LIST } from '../content/articles'

function buildSchema(a) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.metaDescription,
      author: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
      publisher: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
      url: `https://hitchedsa.co.za/articles/${a.slug}`,
      dateModified: '2026-07-23',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faqs.map((f) => ({
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
        { '@type': 'ListItem', position: 2, name: 'Guides & Articles', item: 'https://hitchedsa.co.za/articles' },
        { '@type': 'ListItem', position: 3, name: a.title, item: `https://hitchedsa.co.za/articles/${a.slug}` },
      ],
    },
  ]
}

function Block({ block }) {
  if (block.type === 'p') {
    return <p className="text-sm mb-4">{block.text}</p>
  }
  if (block.type === 'list') {
    return (
      <ul className="text-sm mb-4 space-y-2 list-disc pl-5">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  }
  if (block.type === 'table') {
    return (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {block.headers.map((h) => (
                <th
                  key={h}
                  className="text-left p-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ background: 'var(--color-surface)', color: 'var(--color-heading)', borderBottom: '2px solid var(--color-border)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                {row.map((cell, j) => (
                  <td key={j} className="p-3 align-top" style={{ color: j === 0 ? 'var(--color-heading)' : 'var(--color-text-muted)' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (block.type === 'tip') {
    return (
      <div className="card p-4 mb-4 text-sm flex gap-2" style={{ background: 'var(--color-surface)', borderLeft: '3px solid var(--color-primary)' }}>
        <Icon name="bulb" size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
        <span>
          <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Tip: </span>
          {block.text}
        </span>
      </div>
    )
  }
  return null
}

export default function ArticlePage() {
  const { slug } = useParams()
  const a = ARTICLES[slug]

  useMeta({
    title: a ? a.metaTitle : 'Wedding Guides & Articles',
    description: a ? a.metaDescription : undefined,
    url: a ? `/articles/${a.slug}` : '/articles',
    image: a ? `/images/articles/${a.slug}.jpg` : undefined,
  })

  if (!a) return <Navigate to="/articles" replace />

  const related = ARTICLE_LIST.filter((o) => o.slug !== a.slug).slice(0, 3)
  const midPoint = Math.floor(a.sections.length / 2)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(a)) }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">›</span>
        <Link to="/articles" className="hover:underline">Guides & Articles</Link>
        <span className="mx-1">›</span>
        <span style={{ color: 'var(--color-text)' }}>{a.title}</span>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
        {a.category}
      </p>
      <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        {a.title}
      </h1>
      <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
        Updated {a.updated} · {a.readTime}
      </p>
      <figure className="mb-6 -mx-4 sm:mx-0">
        <img
          src={`/images/articles/${a.slug}.jpg`}
          alt={a.title}
          width="1600"
          height="700"
          loading="eager"
          className="w-full object-cover sm:rounded-2xl"
          style={{ aspectRatio: '16 / 7', maxHeight: 440 }}
        />
      </figure>
      <div className="mb-8">
        <ShareButtons
          title={`${a.title} | HitchedSA`}
          url={`https://hitchedsa.co.za/articles/${a.slug}`}
        />
      </div>

      <div className="space-y-10" style={{ color: 'var(--color-text)', lineHeight: 1.8 }}>

        {/* Intro */}
        <section>
          {a.intro.map((para, i) => (
            <p key={i} className="text-sm mb-4">{para}</p>
          ))}
        </section>

        <AdBanner slot={`article-${a.slug}-top`} size="leaderboard" />

        {/* Sections, with an ad slot midway through */}
        {a.sections.map((s, i) => (
          <Fragment key={s.heading}>
            <section>
              <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
                {s.heading}
              </h2>
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} />
              ))}
            </section>
            {i === midPoint && <AdBanner slot={`article-${a.slug}-mid`} size="rectangle" />}
          </Fragment>
        ))}

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {a.faqs.map((f) => (
              <div key={f.q} className="card p-5">
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-heading)' }}>{f.q}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot={`article-${a.slug}-bottom`} size="leaderboard" />

        {/* Related articles */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Keep Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((o) => (
              <Link key={o.slug} to={`/articles/${o.slug}`} className="card p-0 block overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={`/images/articles/${o.slug}.jpg`}
                  alt={o.title}
                  width="400"
                  height="150"
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ aspectRatio: '8 / 3' }}
                />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--color-heading)' }}>
                    {o.title}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{o.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card p-8 text-center" style={{ background: 'var(--color-surface)' }}>
          <div className="flex justify-center mb-3">
            <Icon name="rings" size={32} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
            Plan Your Wedding with HitchedSA
          </h2>
          <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Free budget tracker, guest list, checklist and venue shortlist, built for South African weddings.
          </p>
          <Link to="/login" className="btn-primary text-sm px-8">
            Start Planning Free
          </Link>
        </div>
      </div>
    </div>
  )
}
