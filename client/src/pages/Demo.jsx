import { Link } from 'react-router-dom'
import { useMeta } from '../hooks/useMeta'
import Icon from '../components/Icon'
import BrowserFrame from '../components/demo/BrowserFrame'
import {
  DemoDashboardPanel, DemoGuestPanel, DemoBudgetPanel,
  DemoChecklistPanel, DemoSeatingPanel, DemoIdeasPanel,
} from '../components/demo/DemoPanels'

const SECTIONS = [
  { id: 'dashboard', url: 'hitchedsa.co.za/dashboard', icon: 'heart', title: 'Your wedding dashboard',
    desc: 'A live countdown to the big day, plus an at-a-glance view of your guests, budget and checklist the moment you log in.',
    Panel: DemoDashboardPanel },
  { id: 'guests', url: 'hitchedsa.co.za/guests', icon: 'users', title: 'Guest list & RSVPs',
    desc: 'Track who is coming, dietary needs, plus-ones and children. Confirmed, pending and declined counts update as you go, and you can export the whole list to CSV.',
    Panel: DemoGuestPanel },
  { id: 'budget', url: 'hitchedsa.co.za/budget', icon: 'wallet', title: 'Budget tracker',
    desc: 'Set your total budget in rand and split it across every category. See what you have spent, what is left, and which deposits are paid.',
    Panel: DemoBudgetPanel },
  { id: 'checklist', url: 'hitchedsa.co.za/checklist', icon: 'clipboard', title: 'Planning checklist',
    desc: 'A South African wedding checklist grouped by how far out you are, from 12 months to the wedding week, so nothing slips through the cracks.',
    Panel: DemoChecklistPanel },
  { id: 'seating', url: 'hitchedsa.co.za/seating', icon: 'chair', title: 'Seating planner',
    desc: 'Create your tables, set each table capacity and assign guests to seats so your reception layout is sorted well before the day.',
    Panel: DemoSeatingPanel },
  { id: 'ideas', url: 'hitchedsa.co.za/ideas', icon: 'bulb', title: 'Ideas & mood board',
    desc: 'Save inspiration for your ceremony, flowers, décor and cake in one place, and share the vision with your partner and suppliers.',
    Panel: DemoIdeasPanel },
]

export default function Demo() {
  useMeta({
    title: 'See the Wedding Planner in Action',
    description: 'Take a look inside the free HitchedSA wedding planner: dashboard, guest list, budget tracker, checklist, seating planner and mood board, all shown with a sample wedding.',
    url: '/demo',
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      {/* Intro */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8 sm:w-12" style={{ background: 'var(--color-border)' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-primary)' }}>
            Live Demo · Sample Wedding
          </span>
          <span className="h-px w-8 sm:w-12" style={{ background: 'var(--color-border)' }} />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
          See exactly what you get before you sign up
        </h1>
        <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          This is the real HitchedSA planner, filled with a sample wedding so you can look around. Everything here is
          view-only. Create your free account to start planning your own.
        </p>
        <div className="mt-6">
          <Link to="/login" className="btn-primary text-base px-8 py-3.5 inline-block" style={{ borderRadius: '9999px' }}>
            Start Planning Free
          </Link>
        </div>
      </div>

      {/* Tool previews */}
      <div className="mt-14 space-y-16">
        {SECTIONS.map((s, i) => (
          <section key={s.id} className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name={s.icon} size={22} style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
                  Step {i + 1}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
            </div>
            <div className={`lg:col-span-3 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              {/* pointer-events disabled: the demo is strictly view-only */}
              <BrowserFrame url={s.url}>
                <div style={{ pointerEvents: 'none' }}>
                  <s.Panel />
                </div>
              </BrowserFrame>
            </div>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="text-center mt-20 card p-10" style={{ background: 'var(--color-surface)' }}>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
          Ready to plan your own wedding?
        </h2>
        <p className="mb-6 text-base max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Every tool you just saw is free to use. Set your date, add your guests and start ticking off your checklist today.
        </p>
        <Link to="/login" className="btn-primary text-base px-10 py-4 inline-block" style={{ borderRadius: '9999px' }}>
          Create Your Free Account
        </Link>
        <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
          No credit card required · Free forever
        </p>
      </section>
    </div>
  )
}
