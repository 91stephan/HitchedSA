import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'
import Icon from '../components/Icon'

export default function About() {
  useMeta({
    title: 'About HitchedSA',
    description: 'HitchedSA is a free, all-in-one wedding planning platform built specifically for South African couples. Learn about our tools and mission.',
    url: '/about',
  })
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="section-title">About HitchedSA</h1>
      <p className="section-subtitle mb-10">South Africa's free wedding planning platform</p>

      <div className="space-y-8" style={{ color: 'var(--color-text)' }}>
        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>What is HitchedSA?</h2>
          <p className="text-sm leading-relaxed mb-3">
            HitchedSA is a free, all-in-one wedding planning platform built specifically for South African couples. We bring together every tool you need to plan your big day, from your first venue search to finalising your seating plan the night before.
          </p>
          <p className="text-sm leading-relaxed">
            Unlike generic international wedding planners, HitchedSA is built around South African venues, suppliers, and traditions. Our venue and supplier search is powered by Google Maps and covers the full country, from Cape Town's Winelands to Johannesburg's Midrand, Durban's beachfront to Mpumalanga's bush estates.
          </p>
        </section>

        <section className="card p-0 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
          <div style={{ height: 4, background: 'var(--color-primary)' }} />
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: 'var(--color-border)' }} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-primary)' }}>
                From the Founder
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-5" style={{ color: 'var(--color-heading)' }}>
              Built on a Couch, for Couples Like Us
            </h2>
            <div className="space-y-4" style={{ color: 'var(--color-text)', fontSize: '15px', lineHeight: 1.75 }}>
              <p>HitchedSA didn't begin in a boardroom, with a complicated business plan or a dramatic lightbulb moment.</p>
              <p>It started with me sitting on the couch, watching the woman I love plan our wedding.</p>
              <p>There were lists, screenshots, supplier messages, budgets, dates, ideas, even more lists, and several conversations where I confidently nodded while quietly trying to remember the difference between a seating chart and a guest list.</p>
              <p>I genuinely wanted to contribute. The problem was that I wasn't always sure where I fitted into the planning.</p>
              <p>I'm naturally someone who likes building things, solving problems and finding simpler ways to get things done. So, while sitting on that couch, I started thinking: what could I build that would genuinely make this journey easier for both of us?</p>
              <p>That small thought turned into HitchedSA.</p>
              <p>I began creating the tools we needed, something that could bring the planning, budget, guests, suppliers and endless little details together in one place. It gave me a way to contribute from my side of the wedding planning, using the skills I already had.</p>
              <p>And somewhere between building features, discussing wedding ideas and learning far more about table arrangements than I ever expected, I realised that we couldn't be the only South African couple feeling slightly overwhelmed by it all.</p>
              <p>So, I decided to share what I was building.</p>
              <p>HitchedSA is my contribution to our wedding journey, but it's also something I hope can help couples across South Africa enjoy theirs. Because wedding planning will always have a little chaos, but it should also be exciting, meaningful and something you experience together.</p>
              <p className="italic" style={{ color: 'var(--color-text-muted)' }}>Built with love, a lot of learning, and one very well-used couch.</p>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              <span
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-vibes text-3xl"
                style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                aria-hidden="true"
              >
                S
              </span>
              <div>
                <p className="font-vibes text-3xl leading-none" style={{ color: 'var(--color-accent)' }}>Stephan</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Founder of HitchedSA and groom-in-training</p>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>What's Included</h2>
          <ul className="text-sm space-y-2" style={{ color: 'var(--color-text-muted)' }}>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Interactive wedding checklist with 50+ tasks grouped by timeline</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Budget tracker with category breakdown and over-budget alerts</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Guest list manager with RSVP tracking and dietary requirements</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Venue search powered by Google Maps across all South African provinces</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Supplier directory: photographers, DJs, florists, caterers and more</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Ideas and mood board for saving inspiration</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Seating planner with drag-and-drop table layout</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Countdown clock to your wedding day</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Live weather forecast for your venue location</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Cloud sync across all devices</span></li>
            <li className="flex items-start gap-2"><Icon name="check" size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} /> <span>Multiple colour themes to match your wedding style</span></li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>Is It Really Free?</h2>
          <p className="text-sm leading-relaxed mb-3">
            Yes. HitchedSA is completely free for couples. There are no subscriptions, no premium tiers, and no paywalled features. Every tool on the platform is available to every couple at no charge.
          </p>
          <p className="text-sm leading-relaxed">
            We keep the platform free through unobtrusive advertising displayed in designated areas of the site. These ads are served by Google AdSense and do not affect your planning experience.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>Contact Us</h2>
          <p className="text-sm leading-relaxed mb-4">
            Have a question, found a bug, or want to suggest a feature? We'd love to hear from you.
          </p>
          <Link to="/contact" className="btn-primary text-sm">Get in Touch</Link>
        </section>
      </div>
    </div>
  )
}