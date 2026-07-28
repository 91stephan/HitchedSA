import { TESTIMONIALS } from '../content/testimonials'

// Provinces we have a local photo for in /public/images/provinces.
const PROVINCE_IMAGES = new Set([
  'western-cape', 'gauteng', 'kwazulu-natal', 'eastern-cape', 'free-state',
  'limpopo', 'mpumalanga', 'north-west', 'northern-cape',
])

// Derive the province photo from the byline location, e.g.
// "Ballito, KwaZulu-Natal" -> /images/provinces/kwazulu-natal.jpg
function provinceImage(location) {
  if (!location) return null
  const province = location.split(',').pop().trim().toLowerCase().replace(/\s+/g, '-')
  return PROVINCE_IMAGES.has(province) ? `/images/provinces/${province}.jpg` : null
}

function Byline({ name, date, location }) {
  // Render nothing unless we have a real couple's name. This keeps the section
  // honest: an empty attribution never shows a fabricated identity.
  if (!name) return null
  const meta = [date, location].filter(Boolean).join(' · ')
  return (
    <footer className="mt-5 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
      <p className="font-display font-semibold text-sm" style={{ color: 'var(--color-heading)' }}>
        {name}
      </p>
      {meta && (
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          {meta}
        </p>
      )}
    </footer>
  )
}

function TestimonialCard({ item }) {
  const img = provinceImage(item.location)
  return (
    <figure className="card p-7 flex flex-col h-full relative overflow-hidden">
      {img && (
        <img
          src={img}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{
            width: '65%',
            maxWidth: 260,
            opacity: 0.14,
            WebkitMaskImage: 'linear-gradient(to top left, black 10%, transparent 78%)',
            maskImage: 'linear-gradient(to top left, black 10%, transparent 78%)',
          }}
        />
      )}
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="font-display font-bold text-lg mb-3" style={{ color: 'var(--color-heading)' }}>
          {item.title}
        </h3>
        <blockquote className="space-y-3 flex-1">
          {item.quote.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {para}
            </p>
          ))}
        </blockquote>
        <Byline name={item.name} date={item.date} location={item.location} />
      </div>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
          Wedding Stories From HitchedSA Couples
        </h2>
        <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
          How couples across South Africa planned their day, from the first checklist to the honeymoon
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {TESTIMONIALS.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
