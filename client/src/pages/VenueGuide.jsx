import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import { useMeta } from '../hooks/useMeta'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'South African Wedding Venues: The Complete Regional Guide',
  description: 'A comprehensive guide to finding and booking wedding venues across South Africa — Cape Town, Winelands, Johannesburg, Durban, Garden Route and beyond.',
  author: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
  publisher: { '@type': 'Organization', name: 'HitchedSA', url: 'https://hitchedsa.co.za' },
  url: 'https://hitchedsa.co.za/wedding-venues-guide',
  dateModified: '2025-05-01',
}

const VENUE_TYPES = [
  {
    type: 'Wine Farm & Estate',
    icon: '🍷',
    desc: 'The most sought-after venue style in South Africa. Wine farms in Stellenbosch, Franschhoek, and Paarl offer dramatic mountain backdrops, lush vineyards, historic Cape Dutch architecture, and excellent in-house catering. Usually includes accommodation for the bridal party. These venues book out fastest — sometimes 18 months ahead for popular weekends.',
    budget: 'R35,000–R90,000+ venue hire',
    best: 'Couples who want a scenic, all-in-one experience',
  },
  {
    type: 'Garden & Fynbos Estate',
    icon: '🌿',
    desc: 'Botanical gardens, fynbos estates, and private nature reserves offer beautiful natural settings with minimal decoration needed. Popular in the Western Cape and around Pretoria. These venues work particularly well for outdoor ceremonies followed by a tented reception.',
    budget: 'R20,000–R60,000 venue hire',
    best: 'Nature-loving couples who want organic, natural aesthetics',
  },
  {
    type: 'Farm & Country Estate',
    icon: '🐄',
    desc: 'Working farms and country properties offer a rustic, relaxed atmosphere at often more affordable prices than wine estates. The Cradle of Humankind (Johannesburg), the Midlands Meander (KZN), and farms around Pretoria\'s East and West offer excellent options. Flexible, often allowing your own caterers.',
    budget: 'R15,000–R45,000 venue hire',
    best: 'Couples wanting a rustic feel with more flexibility and budget',
  },
  {
    type: 'Beach & Coastal',
    icon: '🌊',
    desc: 'South Africa\'s coastline offers spectacular beach wedding settings from the Atlantic Seaboard in Cape Town to KwaZulu-Natal\'s warm Indian Ocean beaches. Key considerations: wind (the Cape can be very windy), beach permits, tidal timing, and finding a nearby venue for wet weather. Many upmarket beach hotels offer dedicated wedding packages.',
    budget: 'R25,000–R70,000 for beachfront venue hire',
    best: 'Couples drawn to the ocean with a relaxed, summer feel',
  },
  {
    type: 'Bush & Game Lodge',
    icon: '🦒',
    desc: 'A bush wedding is one of the most uniquely South African experiences possible. Game lodges in Mpumalanga, Limpopo, the Northern Cape, and KwaZulu-Natal offer intimate settings with wildlife and African sunsets. These venues work best for smaller weddings (under 80 guests) given the logistical demands of getting guests to remote locations.',
    budget: 'R30,000–R120,000+ (includes accommodation packages)',
    best: 'Intimate weddings where the "Africa experience" is the priority',
  },
  {
    type: 'Heritage Building & Manor',
    icon: '🏛️',
    desc: 'South Africa has magnificent colonial-era manor houses, Cape Dutch homesteads, and Victorian heritage buildings that make atmospheric wedding venues. These are particularly concentrated in Cape Town, Stellenbosch, and Johannesburg\'s northern suburbs. Many are on the national heritage register and come with strict noise and time restrictions.',
    budget: 'R20,000–R65,000 venue hire',
    best: 'Couples who love history, architecture, and formal elegance',
  },
  {
    type: 'Hotel & Conference Venue',
    icon: '🏨',
    desc: 'Five-star hotels and purpose-built wedding venues offer reliability, professional service, in-house catering, and on-site accommodation. They are excellent for larger weddings (150+ guests) where logistics need to be tightly managed. Generally more expensive per-head than farm venues but everything is handled for you.',
    budget: 'R40,000–R150,000+ depending on hotel and package',
    best: 'Large weddings where convenience and reliability are priorities',
  },
  {
    type: 'Rooftop & Urban',
    icon: '🌆',
    desc: 'Urban rooftop venues and converted industrial spaces in Cape Town, Johannesburg, and Durban cater to couples wanting a modern, city aesthetic. These venues are especially popular for evening weddings with city skyline views. Many are versatile blank-canvas spaces that allow complete personalisation.',
    budget: 'R15,000–R50,000 venue hire',
    best: 'City-loving couples wanting a modern, non-traditional setting',
  },
]

const REGIONS = [
  {
    name: 'Cape Winelands',
    areas: 'Stellenbosch · Franschhoek · Paarl · Robertson',
    season: 'October – April (avoid December–January school holidays for pricing)',
    vibe: 'Romantic, scenic, world-class wine and food. The most in-demand wedding region in SA.',
    tips: 'Book 12–18 months ahead. Almost all Winelands venues have exclusive caterer lists — factor this in. Weather is generally excellent from October–March but summer can be very hot inland.',
    price: 'R35,000–R90,000+ venue hire. Total weddings typically R250,000–R600,000.',
  },
  {
    name: 'Cape Town City & Atlantic Seaboard',
    areas: 'Cape Town CBD · Constantia · Hout Bay · Clifton · Camps Bay',
    season: 'October – April',
    vibe: 'Cosmopolitan, beachfront, mountain views, cosmopolitan cuisine. More urban than the Winelands.',
    tips: 'Wind is a significant factor on the Atlantic Seaboard — always have a wind contingency plan. Constantia venues offer a quieter, estate feel close to the city.',
    price: 'R25,000–R75,000 venue hire. Total weddings typically R200,000–R500,000.',
  },
  {
    name: 'Johannesburg & Surrounds',
    areas: 'Muldersdrift · Hartbeespoort · Midrand · East Rand · Pretoria North',
    season: 'April – September (dry season, avoid Joburg summer storms)',
    vibe: 'Wide variety from luxury to affordable. Less scenically dramatic than the Cape but more options at mid-range price points.',
    tips: 'Johannesburg\'s notorious summer thunderstorms (October–March) make April–September preferable for outdoor ceremonies. Muldersdrift farms offer excellent value 45 minutes west of the city.',
    price: 'R15,000–R60,000 venue hire. Total weddings typically R150,000–R400,000.',
  },
  {
    name: 'KwaZulu-Natal',
    areas: 'Durban · Umhlanga · Midlands Meander · Drakensberg · South Coast',
    season: 'April – October (avoid the humid Durban summer)',
    vibe: 'Tropical, beachfront or cool Midlands farmland. Strong Indian and Zulu cultural influences in the wedding scene.',
    tips: 'Durban summers are hot and humid — coastal venues need good ventilation. The Midlands Meander offers beautiful misty farm venues at very reasonable prices.',
    price: 'R12,000–R50,000 venue hire. Total weddings typically R120,000–R350,000.',
  },
  {
    name: 'Garden Route',
    areas: 'Knysna · George · Plettenberg Bay · Wilderness',
    season: 'October – April',
    vibe: 'Forest, lagoon, and coastal venues in one of SA\'s most beautiful stretches of coastline.',
    tips: 'Popular for destination weddings. Limited venue availability in December–January peak tourist season. Budget for guest travel and accommodation costs.',
    price: 'R20,000–R65,000 venue hire. Total weddings typically R180,000–R450,000.',
  },
  {
    name: 'Mpumalanga & Limpopo',
    areas: 'Hazyview · White River · Magoebaskloof · Bela-Bela',
    season: 'April – September (dry, cooler)',
    vibe: 'Bush, escarpment, and waterfall settings. Ideal for intimate bush weddings and game lodge experiences.',
    tips: 'Best for smaller weddings (under 80 guests). Guests need to travel — provide clear directions and accommodation options nearby. Magical African sunset ceremonies are possible here.',
    price: 'R20,000–R80,000 (often includes accommodation packages). Total weddings R150,000–R350,000.',
  },
]

export default function VenueGuide() {
  useMeta({
    title: 'South African Wedding Venues Guide',
    description: 'The complete guide to wedding venues in South Africa — wine farms, bush lodges, beaches, and heritage estates. Regional breakdowns, price guides, and booking tips for SA couples.',
    url: '/wedding-venues-guide',
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
        Wedding Venues
      </p>
      <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        South African Wedding Venues: The Complete Regional Guide
      </h1>
      <p className="text-base mb-2" style={{ color: 'var(--color-text-muted)' }}>
        Wine estates, beach venues, bush lodges, city rooftops — South Africa has extraordinary options. Here's how to find the right one for your wedding.
      </p>
      <p className="text-xs mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Updated May 2025 · 12 min read
      </p>

      <div className="space-y-14" style={{ color: 'var(--color-text)', lineHeight: 1.8 }}>

        {/* Intro */}
        <section>
          <p className="text-sm mb-4">
            South Africa offers some of the most spectacular wedding venues on the planet — and at price points that are genuinely competitive with international alternatives. Whether you dream of exchanging vows against a Stellenbosch mountain backdrop, at sunset over a Mpumalanga game reserve, or beside the warm Indian Ocean in KwaZulu-Natal, there is a South African venue that can make it happen.
          </p>
          <p className="text-sm mb-4">
            The challenge is not finding options — it's narrowing thousands of possibilities down to the venue that fits your vision, guest count, and budget. This guide breaks down every major venue type and every major region so you can make that decision confidently.
          </p>
          <p className="text-sm">
            The single most important thing to know before you start venue hunting: <strong>popular South African venues book out 12–18 months in advance for peak season dates.</strong> Set your approximate guest count and total venue budget before you begin touring, and move quickly once you find a venue you love.
          </p>
        </section>

        {/* Venue types */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--color-heading)' }}>
            Types of Wedding Venues in South Africa
          </h2>
          <div className="space-y-5">
            {VENUE_TYPES.map((v) => (
              <div key={v.type} className="card p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl shrink-0">{v.icon}</span>
                  <h3 className="font-display font-semibold text-base mt-0.5" style={{ color: 'var(--color-heading)' }}>
                    {v.type}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>{v.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span><strong style={{ color: 'var(--color-text)' }}>Typical cost:</strong> <span style={{ color: 'var(--color-text-muted)' }}>{v.budget}</span></span>
                  <span><strong style={{ color: 'var(--color-text)' }}>Best for:</strong> <span style={{ color: 'var(--color-text-muted)' }}>{v.best}</span></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot="venue-guide-mid-1" size="leaderboard" />

        {/* Region-by-region */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
            South African Wedding Venues by Region
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Each South African region offers a distinct character, season, and price point. Here's what to know before choosing yours.
          </p>
          <div className="space-y-5">
            {REGIONS.map((r) => (
              <div key={r.name} className="card p-6">
                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>{r.name}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-primary)' }}>{r.areas}</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>{r.vibe}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg p-3" style={{ background: 'var(--color-surface)' }}>
                    <div className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Best Season</div>
                    <div style={{ color: 'var(--color-text-muted)' }}>{r.season}</div>
                  </div>
                  <div className="rounded-lg p-3 sm:col-span-2" style={{ background: 'var(--color-surface)' }}>
                    <div className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Local Tips</div>
                    <div style={{ color: 'var(--color-text-muted)' }}>{r.tips}</div>
                  </div>
                </div>
                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
                  <strong style={{ color: 'var(--color-text)' }}>Pricing:</strong> {r.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot="venue-guide-mid-2" size="leaderboard" />

        {/* What to look for */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            What to Look For When Visiting a Venue
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Never book a venue without visiting in person. Photos on a website are always the best-case scenario — you need to see and feel the space yourself. Visit at the same time of day as your planned ceremony if possible, so you can assess the natural light.
          </p>

          <h3 className="font-semibold text-base mb-3 mt-6" style={{ color: 'var(--color-accent)' }}>Practical Checks</h3>
          <ul className="text-sm space-y-2 list-disc list-inside mb-5" style={{ color: 'var(--color-text-muted)' }}>
            <li><strong style={{ color: 'var(--color-text)' }}>Parking:</strong> Is there sufficient parking for your guest count? Is it on-site or a short walk away? Is it safe?</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Access:</strong> Is the road easily navigable by elderly guests and minibus taxis? Are there any gravel road sections?</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Toilets:</strong> Are there enough, and are they close to the reception area? Are they accessible for guests with disabilities?</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Wet weather backup:</strong> If you are planning an outdoor ceremony, what is the plan if it rains? Is there a proper indoor alternative?</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Power:</strong> Does the venue have generator backup for load shedding? This is critical in South Africa.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Noise curfew:</strong> What time must the music stop? Many SA venues have 22:00 or 23:00 curfews due to proximity to residential areas or neighbours.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Mobile signal:</strong> Is there adequate cell signal? Do they have Wi-Fi? Important for your DJ and any digital elements of your wedding.</li>
          </ul>

          <h3 className="font-semibold text-base mb-3 mt-6" style={{ color: 'var(--color-accent)' }}>Catering Arrangements</h3>
          <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
            South African venues fall into three catering categories:
          </p>
          <ul className="text-sm space-y-2 list-disc list-inside mb-5" style={{ color: 'var(--color-text-muted)' }}>
            <li><strong style={{ color: 'var(--color-text)' }}>Exclusive in-house catering:</strong> The venue has their own kitchen and chefs — you must use them. No outside food is allowed. Common at wine estates and hotels. Convenient but less flexible on menu and price.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Preferred supplier list:</strong> The venue requires you to choose from a vetted list of approved external caterers. You have some choice but cannot bring anyone.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Fully open:</strong> You can bring any caterer you like. Maximum flexibility and often lower total cost. Common on farm and DIY venues.</li>
          </ul>

          <h3 className="font-semibold text-base mb-3 mt-6" style={{ color: 'var(--color-accent)' }}>Accommodation</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Check whether the venue has on-site accommodation for the bridal party and key guests. Many SA wine farm and country estate venues include a set number of on-site rooms in the hire package. If there is no accommodation on-site, research the nearest options and their distance — guests drinking alcohol need to be within reasonable distance of where they are staying.
          </p>
        </section>

        {/* Booking process */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            How to Book a Wedding Venue in South Africa
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Once you have found a venue you love, move quickly. South African wedding venues — particularly in the Western Cape — have waiting lists for popular dates. Here is the typical booking process:
          </p>
          <ol className="text-sm space-y-3 list-decimal list-inside mb-5" style={{ color: 'var(--color-text-muted)' }}>
            <li><strong style={{ color: 'var(--color-text)' }}>Request a quote:</strong> Contact the venue with your proposed date, approximate guest count, and any specific requirements. Most venues will send a detailed quote within a few days.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Visit in person:</strong> Before committing, visit the venue in person (with your partner and if possible, your wedding planner). Ask all your questions face-to-face.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Review the contract carefully:</strong> Read every line of the venue contract. Pay particular attention to: cancellation terms, what happens if the venue is damaged, whether the quote is VAT-inclusive, deposit structure, and payment due dates.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Pay the holding deposit:</strong> SA venues typically require a 50% non-refundable holding deposit to secure the date. The balance is usually due 30–60 days before the wedding.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Get everything in writing:</strong> Any verbal promises made by the venue coordinator must be confirmed in writing via email. Coordinators change — the contract is what matters.</li>
          </ol>

          <div className="card p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-heading)' }}>⚠️ The Most Common Venue Booking Mistake</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              South African couples frequently book the venue before confirming the caterer's price. A venue that costs R30,000 hire may require you to use their exclusive caterer at R950 per head — for 100 guests, that's R95,000 on catering alone. Always get the total estimated cost (venue + catering + bar) before signing the venue contract.
            </p>
          </div>
        </section>

        <AdBanner slot="venue-guide-bottom" size="leaderboard" />

        {/* CTA */}
        <section>
          <div className="card p-8 text-center" style={{ background: 'var(--color-surface)' }}>
            <div className="text-3xl mb-3">🔍</div>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
              Search Real SA Wedding Venues
            </h2>
            <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              Use HitchedSA's venue search — powered by Google Maps — to browse real venues across every South African province. Shortlist your favourites and compare them side by side.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="btn-primary text-sm px-8">
                Search Venues Free
              </Link>
              <Link to="/wedding-guide" className="btn-outline text-sm px-8">
                Full Planning Guide
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
