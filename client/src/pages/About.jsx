import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="section-title">About HitchedSA</h1>
      <p className="section-subtitle mb-10">South Africa's free wedding planning platform</p>

      <div className="space-y-8" style={{ color: 'var(--color-text)' }}>
        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>What is HitchedSA?</h2>
          <p className="text-sm leading-relaxed mb-3">
            HitchedSA is a free, all-in-one wedding planning platform built specifically for South African couples. We bring together every tool you need to plan your big day — from your first venue search to finalising your seating plan the night before.
          </p>
          <p className="text-sm leading-relaxed">
            Unlike generic international wedding planners, HitchedSA is built around South African venues, suppliers, and traditions. Our venue and supplier search is powered by Google Maps and covers the full country — from Cape Town's Winelands to Johannesburg's Midrand, Durban's beachfront to Mpumalanga's bush estates.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>Why We Built It</h2>
          <p className="text-sm leading-relaxed mb-3">
            Planning a wedding in South Africa means juggling dozens of spreadsheets, WhatsApp groups, supplier emails, and printed checklists. We built HitchedSA to replace all of that with a single, beautifully designed platform that does everything in one place.
          </p>
          <p className="text-sm leading-relaxed">
            Every feature was designed with South African couples in mind — our budget tracker uses Rands, our venue search covers South African provinces and cities, our supplier directory covers the categories most commonly needed for a South African wedding, and our weather widget shows forecasts for your specific venue location.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>What's Included</h2>
          <ul className="text-sm space-y-2" style={{ color: 'var(--color-text-muted)' }}>
            <li>✅ Interactive wedding checklist with 50+ tasks grouped by timeline</li>
            <li>✅ Budget tracker with category breakdown and over-budget alerts</li>
            <li>✅ Guest list manager with RSVP tracking and dietary requirements</li>
            <li>✅ Venue search powered by Google Maps across all South African provinces</li>
            <li>✅ Supplier directory — photographers, DJs, florists, caterers and more</li>
            <li>✅ Ideas and mood board for saving inspiration</li>
            <li>✅ Seating planner with drag-and-drop table layout</li>
            <li>✅ Countdown clock to your wedding day</li>
            <li>✅ Live weather forecast for your venue location</li>
            <li>✅ Cloud sync across all devices</li>
            <li>✅ Multiple colour themes to match your wedding style</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>Is It Really Free?</h2>
          <p className="text-sm leading-relaxed mb-3">
            Yes — HitchedSA is completely free for couples. There are no subscriptions, no premium tiers, and no paywalled features. Every tool on the platform is available to every couple at no charge.
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