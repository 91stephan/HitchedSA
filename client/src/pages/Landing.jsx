import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import { useMeta } from '../hooks/useMeta'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80'

const FEATURES = [
  { icon: '📋', title: 'Interactive Checklist', desc: 'A comprehensive South African wedding checklist with 50+ tasks grouped by how far out you are — 12 months, 6 months, 3 months, and wedding week.' },
  { icon: '💰', title: 'Budget Tracker', desc: 'Set your total wedding budget and track spending across 10 categories including venue, catering, photography, décor, and more. Never go over budget again.' },
  { icon: '👥', title: 'Guest List Manager', desc: 'Add guests, track RSVPs, manage dietary requirements, and assign table numbers. Export your full guest list to CSV anytime.' },
  { icon: '🏛️', title: 'Venue Search', desc: 'Search real South African wedding venues powered by Google Maps — Cape Town, Stellenbosch, Franschhoek, Johannesburg, Durban and beyond.' },
  { icon: '📸', title: 'Supplier Directory', desc: 'Find photographers, DJs, florists, caterers, makeup artists, cake designers, car hire and décor suppliers across South Africa.' },
  { icon: '💡', title: 'Ideas & Mood Board', desc: 'Save wedding inspiration images from the web, organise them into categories, and share your vision with your partner and suppliers.' },
  { icon: '🪑', title: 'Seating Planner', desc: 'Create tables, assign guests, and visualise your reception layout. Plan the perfect seating arrangement with an easy drag-and-drop interface.' },
  { icon: '☁️', title: 'Wedding Day Weather', desc: 'See the weather forecast for your venue location as your wedding day approaches, powered by live OpenWeatherMap data.' },
]

const STEPS = [
  { num: '1', title: 'Create your free account', desc: 'Sign up in under 30 seconds. No credit card required, no hidden fees — HitchedSA is completely free for couples.' },
  { num: '2', title: 'Set your date and venue', desc: 'Enter your wedding date and location. Your countdown clock starts immediately and your checklist phases update automatically.' },
  { num: '3', title: 'Plan everything in one place', desc: 'Budget, guests, suppliers, checklist, seating, ideas — every tool you need, all connected, all synced to the cloud.' },
]

export default function Landing() {
  useMeta({
    title: 'Free South African Wedding Planner',
    description: 'Plan your perfect South African wedding for free — venue search, budget tracker, guest list, supplier directory, seating planner and more. Built for SA couples.',
    url: '/',
  })
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
          <p className="font-vibes text-6xl md:text-7xl text-white mb-4 drop-shadow-lg" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            HitchedSA
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-display font-semibold mb-4 max-w-2xl leading-snug" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            Plan Your Perfect South African Wedding — Free
          </h1>
          <p className="text-white/85 text-base md:text-lg mb-8 max-w-xl font-display italic">
            The all-in-one wedding planner built for South African couples
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'var(--color-primary)', color: '#fff' }}
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.7)', color: '#fff', backdropFilter: 'blur(8px)' }}
            >
              See What's Included
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* How it works */}
        <section className="mb-20 text-center">
          <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
            How It Works
          </h2>
          <p className="mb-10 text-base" style={{ color: 'var(--color-text-muted)' }}>
            Start planning your wedding in minutes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="card text-center p-8">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl mx-auto mb-4"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--color-heading)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
              Everything You Need to Plan Your Wedding
            </h2>
            <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
              Eight powerful tools, one free platform
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--color-heading)' }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad — shown to public visitors, verifiable by Google */}
        <div className="mb-12">
          <AdBanner slot="landing-mid" size="leaderboard" />
        </div>

        {/* Guide teaser */}
        <section className="mb-20">
          <div className="card p-8" style={{ background: 'var(--color-surface)' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="text-4xl shrink-0">📖</div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--color-heading)' }}>
                  The Complete SA Wedding Planning Guide
                </h2>
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  Timelines, budgets, venue tips, supplier advice, cultural traditions, and everything else you need to know — written for South African couples.
                </p>
                <Link to="/wedding-guide" className="btn-primary text-sm">
                  Read the Guide →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why HitchedSA */}
        <section className="mb-20">
          <div className="card p-10 text-center" style={{ background: 'var(--color-surface)' }}>
            <h2 className="font-display text-3xl font-bold mb-6" style={{ color: 'var(--color-heading)' }}>
              Built for South African Couples
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              {[
                { icon: '🇿🇦', title: 'South African Venues & Suppliers', desc: 'Search real wedding venues and suppliers in Cape Town, Johannesburg, Durban, Pretoria, the Winelands and beyond — powered by Google Maps.' },
                { icon: '☁️', title: 'Synced to the Cloud', desc: 'Your wedding data is securely stored and synced across all your devices via Supabase. Access your planner on your phone, tablet or laptop.' },
                { icon: '💎', title: 'Free Forever', desc: 'HitchedSA is completely free for couples. No subscriptions, no paywalls, no premium tiers. Every feature is available to every couple.' },
              ].map((item) => (
                <div key={item.title}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-heading)' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
            Ready to Start Planning?
          </h2>
          <p className="mb-6 text-base" style={{ color: 'var(--color-text-muted)' }}>
            Join South African couples who are planning their dream wedding on HitchedSA.
          </p>
          <Link
            to="/login"
            className="btn-primary text-base px-10 py-4 inline-block"
            style={{ borderRadius: '9999px' }}
          >
            Create Your Free Account
          </Link>
          <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
            No credit card required · Free forever · Cancel anytime
          </p>
        </section>
      </div>
    </div>
  )
}