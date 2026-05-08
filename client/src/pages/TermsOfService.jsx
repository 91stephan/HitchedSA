export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="section-title">Terms of Service</h1>
      <p className="section-subtitle mb-2">Last updated: April 2026</p>
      <p className="text-sm mb-10" style={{ color: 'var(--color-text-muted)' }}>
        By using HitchedSA ("the platform", "we", "us"), you agree to these Terms of Service. Please read them carefully before creating an account.
      </p>

      <div className="space-y-6 text-sm" style={{ color: 'var(--color-text)' }}>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>1. Acceptance of Terms</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            By accessing or using HitchedSA, you confirm that you are at least 18 years of age, have read and understood these Terms, and agree to be bound by them. If you do not agree to these Terms, you may not use the platform.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>2. Description of Service</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            HitchedSA provides a free, web-based wedding planning platform for South African couples. The platform includes tools for managing guests, budgets, checklists, seating plans, venue searches, supplier directories, ideas boards, and wedding day weather forecasts. All features are provided free of charge to registered couples.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>3. User Accounts</h2>
          <ul className="space-y-1 list-disc pl-5" style={{ color: 'var(--color-text-muted)' }}>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must provide accurate and truthful information when registering</li>
            <li>You may not share your account with others or create accounts on behalf of others without permission</li>
            <li>You must notify us immediately if you suspect unauthorised access to your account</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>4. Acceptable Use</h2>
          <p className="mb-2" style={{ color: 'var(--color-text-muted)' }}>You agree not to:</p>
          <ul className="space-y-1 list-disc pl-5" style={{ color: 'var(--color-text-muted)' }}>
            <li>Use the platform for any unlawful purpose or in violation of South African law</li>
            <li>Attempt to gain unauthorised access to any part of the platform or its infrastructure</li>
            <li>Upload or transmit any malicious code, viruses, or harmful content</li>
            <li>Scrape, copy, or reproduce the platform's content without written permission</li>
            <li>Use the platform to harass, abuse, or harm others</li>
            <li>Interfere with the proper functioning of the platform</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>5. Your Content</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            You retain ownership of all content you upload or enter into HitchedSA (guest names, budget entries, notes, ideas, etc.). By using the platform, you grant us a limited licence to store and process this content solely for the purpose of providing the service to you. We do not use your personal planning data for advertising or share it with third parties.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>6. Advertising</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            HitchedSA displays advertisements through Google AdSense to fund the free service. By using HitchedSA, you acknowledge and agree that advertisements may be displayed on the platform. We have no control over the specific ads shown and are not responsible for the content of third-party advertisements.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>7. Third-Party Integrations</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            HitchedSA integrates with third-party services including Google Maps, OpenWeatherMap, and Supabase to provide certain features. We are not responsible for the availability, accuracy, or reliability of data provided by these third parties. Use of venue and supplier search results is at your own discretion — we do not endorse or recommend any specific venue or supplier.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>8. Disclaimer of Warranties</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            HitchedSA is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or that defects will be corrected. We are not liable for any errors, inaccuracies, or omissions in the content provided.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>9. Limitation of Liability</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            To the maximum extent permitted by South African law, HitchedSA shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to loss of data, revenue, or business opportunities related to your wedding planning.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>10. Termination</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            We reserve the right to suspend or terminate your account at any time if you breach these Terms. You may delete your account at any time through the Settings page. Upon termination, your data will be deleted in accordance with our Privacy Policy.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>11. Governing Law</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            These Terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the exclusive jurisdiction of the South African courts.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--color-accent)' }}>12. Contact</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            For questions about these Terms, contact us at <a href="mailto:hello@hitchedsa.co.za" style={{ color: 'var(--color-primary)' }}>hello@hitchedsa.co.za</a>.
          </p>
        </section>
      </div>
    </div>
  )
}