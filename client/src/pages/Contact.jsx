import { useMeta } from '../hooks/useMeta'

export default function Contact() {
  useMeta({
    title: 'Contact HitchedSA',
    description: 'Get in touch with the HitchedSA team — questions, bug reports, feature suggestions, or supplier listing enquiries.',
    url: '/contact',
  })
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="section-title">Contact Us</h1>
      <p className="section-subtitle mb-10">We'd love to hear from you</p>

      <div className="space-y-6">
        <div className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>
            Get in Touch
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Whether you have a question about the platform, want to report a bug, or have a feature suggestion, we want to hear from you.
          </p>
          <div className="space-y-3 text-sm" style={{ color: 'var(--color-text)' }}>
            <div className="flex items-center gap-3">
              <span className="text-lg">📧</span>
              <div>
                <div className="font-medium">Email</div>
                <a
                  href="mailto:hello@hitchedsa.co.za"
                  className="text-sm"
                  style={{ color: 'var(--color-primary)' }}
                >
                  hello@hitchedsa.co.za
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🌐</span>
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
              <span className="text-lg">🇿🇦</span>
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
      </div>
    </div>
  )
}