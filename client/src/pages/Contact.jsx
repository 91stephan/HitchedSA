import { useMeta } from '../hooks/useMeta'
import Icon from '../components/Icon'

const FAQ = [
  {
    q: 'Is HitchedSA really free to use?',
    a: 'Yes. Every planning tool is free for couples, with no subscriptions, paywalls or premium tiers. The service is funded by the ads you see on the site, which is what keeps the planner free for everyone.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'You can read all of our guides, venue pages and articles without signing up. To save your budget, guest list, checklist and other planning tools across your devices, you create a free account so your work is stored and synced.',
  },
  {
    q: 'Is my planning information private and secure?',
    a: 'Your data is stored securely and is never sold. Passwords are encrypted and kept only as a one-way hash by our authentication provider, so we never see them. You can read exactly what we collect and why in our Privacy Policy, which is written to comply with POPIA.',
  },
  {
    q: 'Can I use HitchedSA on my phone?',
    a: 'Yes. HitchedSA works in the browser on your phone, tablet and laptop, and your planning stays in sync across all of them when you are signed in.',
  },
  {
    q: 'Which provinces do you cover?',
    a: 'All nine South African provinces. Our venue and planning guides cover the Western Cape, Gauteng, KwaZulu-Natal, Eastern Cape, Free State, Limpopo, Mpumalanga, North West and Northern Cape.',
  },
  {
    q: 'How do I delete my account and data?',
    a: 'You can remove your account and its data from your account settings at any time. If you would rather we do it for you, email us at the address above and we will take care of it.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function Contact() {
  useMeta({
    title: 'Contact HitchedSA',
    description: 'Get in touch with the HitchedSA team: questions, bug reports, feature suggestions, or supplier listing enquiries.',
    url: '/contact',
  })
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <h1 className="section-title">Contact Us</h1>
      <p className="section-subtitle mb-10">We'd love to hear from you</p>

      <div className="space-y-6">
        <div className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>
            Get in Touch
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Got a question about the platform, found a bug, or have a feature suggestion? We want to hear from you.
          </p>
          <div className="space-y-3 text-sm" style={{ color: 'var(--color-text)' }}>
            <div className="flex items-center gap-3">
              <Icon name="mail" size={18} />
              <div>
                <div className="font-medium">Email</div>
                <a
                  href="mailto:21rssolutions@gmail.com"
                  className="text-sm"
                  style={{ color: 'var(--color-primary)' }}
                >
                  21rssolutions@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="globe" size={18} />
              <div>
                <div className="font-medium">Website</div>
                <a
                  href="https://hitchedsa.co.za"
                  className="text-sm"
                  style={{ color: 'var(--color-primary)' }}
                >
                  hitchedsa.co.za
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="flag" size={18} />
              <div>
                <div className="font-medium">Location</div>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>South Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>
            For Wedding Suppliers
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Are you a South African wedding venue or supplier who would like to be featured on HitchedSA? Contact us at the email above to discuss listing options.
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>
            Response Time
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            We aim to respond to all enquiries within 2 business days. For urgent issues, please include "URGENT" in your subject line.
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
            Frequently Asked Questions
          </h2>
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-display text-sm font-semibold mb-1.5" style={{ color: 'var(--color-heading)' }}>
                  {q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}