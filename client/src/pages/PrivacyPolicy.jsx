export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="section-title">Privacy Policy</h1>
      <p className="section-subtitle mb-2">Last updated: April 2026</p>
      <p className="text-sm mb-10" style={{ color: 'var(--color-text-muted)' }}>
        This Privacy Policy describes how HitchedSA ("we", "us", or "our") collects, uses, and protects your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and applicable South African law.
      </p>

      <div className="space-y-6 text-sm" style={{ color: 'var(--color-text)' }}>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>1. Information We Collect</h2>
          <p className="mb-2">We collect the following categories of personal information:</p>
          <ul className="space-y-1 list-disc pl-5" style={{ color: 'var(--color-text-muted)' }}>
            <li><strong>Account information:</strong> Email address and password (stored securely via Supabase Auth)</li>
            <li><strong>Profile information:</strong> Partner names, wedding date, and venue location (entered voluntarily)</li>
            <li><strong>Planning data:</strong> Guest list, budget entries, checklist tasks, seating plans, and ideas board content</li>
            <li><strong>Usage data:</strong> Pages visited, features used, and general interaction patterns (collected via analytics)</li>
            <li><strong>Technical data:</strong> IP address, browser type, device type, and operating system</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>2. How We Use Your Information</h2>
          <ul className="space-y-1 list-disc pl-5" style={{ color: 'var(--color-text-muted)' }}>
            <li>To provide and operate the HitchedSA wedding planning service</li>
            <li>To sync your planning data across devices via our secure cloud database</li>
            <li>To send transactional emails related to your account (password resets, etc.)</li>
            <li>To improve our platform based on usage patterns</li>
            <li>To serve relevant advertisements through Google AdSense</li>
            <li>To comply with legal obligations under South African law</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>3. Google AdSense & Cookies</h2>
          <p className="mb-2" style={{ color: 'var(--color-text-muted)' }}>
            HitchedSA uses Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Google's Ads Settings</a>.
          </p>
          <p style={{ color: 'var(--color-text-muted)' }}>
            We also use cookies for authentication and session management. These are strictly necessary for the platform to function.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>4. Data Storage & Security</h2>
          <p className="mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Your data is stored securely on Supabase infrastructure with encryption at rest and in transit. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
          </p>
          <p style={{ color: 'var(--color-text-muted)' }}>
            We do not sell, trade, or rent your personal information to third parties.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>5. Your Rights Under POPIA</h2>
          <p className="mb-2" style={{ color: 'var(--color-text-muted)' }}>Under the Protection of Personal Information Act, you have the right to:</p>
          <ul className="space-y-1 list-disc pl-5" style={{ color: 'var(--color-text-muted)' }}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Object to the processing of your personal information</li>
            <li>Lodge a complaint with the Information Regulator of South Africa</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--color-text-muted)' }}>
            To exercise these rights, contact us at <a href="mailto:hello@hitchedsa.co.za" style={{ color: 'var(--color-primary)' }}>hello@hitchedsa.co.za</a>.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>6. Data Retention</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            We retain your personal information for as long as your account is active or as needed to provide our services. If you delete your account, we will delete your personal data within 30 days, except where we are required by law to retain it.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>7. Third-Party Services</h2>
          <p className="mb-2" style={{ color: 'var(--color-text-muted)' }}>We use the following third-party services:</p>
          <ul className="space-y-1 list-disc pl-5" style={{ color: 'var(--color-text-muted)' }}>
            <li><strong>Supabase</strong> — database and authentication</li>
            <li><strong>Google AdSense</strong> — advertising</li>
            <li><strong>Google Maps Places API</strong> — venue and supplier search</li>
            <li><strong>OpenWeatherMap</strong> — weather forecasts</li>
            <li><strong>Netlify</strong> — hosting and deployment</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>8. Changes to This Policy</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by updating the date at the top of this page. Continued use of HitchedSA after changes constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>9. Contact</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            For privacy-related enquiries, contact us at <a href="mailto:hello@hitchedsa.co.za" style={{ color: 'var(--color-primary)' }}>hello@hitchedsa.co.za</a>.
          </p>
        </section>
      </div>
    </div>
  )
}