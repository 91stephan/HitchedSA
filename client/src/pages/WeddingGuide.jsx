import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const SECTIONS = [
  { id: 'timeline',   label: '12-Month Timeline' },
  { id: 'budget',     label: 'Wedding Budget' },
  { id: 'venue',      label: 'Choosing a Venue' },
  { id: 'suppliers',  label: 'Your Supplier Team' },
  { id: 'guests',     label: 'Guest List Tips' },
  { id: 'traditions', label: 'SA Traditions' },
  { id: 'food',       label: 'Food & Catering' },
  { id: 'finalweek',  label: 'The Final Week' },
]

export default function WeddingGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">

      <h1 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--color-heading)' }}>
        The Complete South African Wedding Planning Guide
      </h1>
      <p className="text-base mb-2" style={{ color: 'var(--color-text-muted)' }}>
        Everything you need to know to plan a beautiful, stress-free wedding in South Africa — from setting your budget to walking down the aisle.
      </p>
      <p className="text-xs mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Updated May 2025 · 15 min read
      </p>

      {/* Jump links */}
      <nav className="card p-4 mb-10">
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>IN THIS GUIDE</p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:underline"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="prose-like space-y-12" style={{ color: 'var(--color-text)', lineHeight: 1.8 }}>

        {/* ── 12-Month Timeline ─────────────────────────────────────────── */}
        <section id="timeline">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            The 12-Month South African Wedding Planning Timeline
          </h2>
          <p className="mb-4 text-sm">
            Planning a wedding in South Africa takes between 12 and 18 months for most couples, though it is possible to pull off a beautiful wedding in six months if you are decisive and flexible. The key is knowing which decisions to make first — certain suppliers and venues book up 12 or more months in advance, especially in peak season (October through March in most provinces).
          </p>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>12 Months Out</h3>
          <ul className="text-sm space-y-1.5 mb-4 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            <li>Set your total budget and agree on who is contributing what</li>
            <li>Compile your initial guest list — this drives your venue size</li>
            <li>Research and visit venues; book your top choice immediately</li>
            <li>Book your photographer — top SA photographers fill their diaries 12–18 months ahead</li>
            <li>Choose a wedding date and register it if you plan a civil marriage</li>
            <li>Begin researching other suppliers: videographer, DJ, florist</li>
          </ul>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>9 Months Out</h3>
          <ul className="text-sm space-y-1.5 mb-4 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            <li>Book your caterer (or confirm the venue's in-house catering)</li>
            <li>Book your DJ, live band, or entertainment</li>
            <li>Start looking at wedding dresses — SA designers need 4–6 months for alterations</li>
            <li>Book accommodation for out-of-town guests near the venue</li>
            <li>Start planning the honeymoon</li>
          </ul>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>6 Months Out</h3>
          <ul className="text-sm space-y-1.5 mb-4 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            <li>Send save-the-dates, especially to guests travelling from other provinces or abroad</li>
            <li>Book your florist and begin discussing colour palette and arrangements</li>
            <li>Book hair and makeup artists — they get booked out for popular dates</li>
            <li>Book wedding cake designer</li>
            <li>Start planning your ceremony details and choose an officiant</li>
            <li>Register for gifts if you plan to use a gift registry</li>
          </ul>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>3 Months Out</h3>
          <ul className="text-sm space-y-1.5 mb-4 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            <li>Send formal invitations</li>
            <li>Book transport (wedding car hire, guest shuttle)</li>
            <li>Plan the seating arrangement once RSVPs begin coming in</li>
            <li>Confirm dietary requirements with all guests</li>
            <li>Finalise your menu with the caterer</li>
            <li>Book rehearsal dinner venue</li>
          </ul>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>1 Month Out</h3>
          <ul className="text-sm space-y-1.5 mb-4 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            <li>Chase outstanding RSVPs and finalise headcount</li>
            <li>Give the caterer final numbers</li>
            <li>Confirm every supplier booking and share your detailed timeline</li>
            <li>Finalise and print seating plan</li>
            <li>Collect your wedding dress and do final alterations fitting</li>
            <li>Prepare payments for suppliers — have cash or EFT ready</li>
          </ul>
        </section>

        <AdBanner slot="guide-mid-1" size="leaderboard" />

        {/* ── Budget ──────────────────────────────────────────────────────── */}
        <section id="budget">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Planning Your South African Wedding Budget
          </h2>
          <p className="mb-4 text-sm">
            The average South African wedding costs between R150,000 and R350,000, though costs vary enormously depending on location, guest count, and your choices. Cape Town and the Winelands tend to be the most expensive regions; Johannesburg's East Rand and smaller KZN towns the most affordable.
          </p>
          <p className="mb-4 text-sm">
            The single most important thing you can do for your budget is to decide on your guest count early. Every guest you add increases your catering cost (typically R400–R1,200 per person), your venue cost (larger venues charge more), your stationery cost, and your cake size.
          </p>

          <h3 className="font-semibold text-base mb-3 mt-6" style={{ color: 'var(--color-accent)' }}>Typical Budget Breakdown</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm rounded-xl overflow-hidden" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface)' }}>
                  <th className="text-left px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--color-text-muted)' }}>Category</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--color-text-muted)' }}>% of Budget</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-xs" style={{ color: 'var(--color-text-muted)' }}>R200k Wedding</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Venue hire', '25–35%', 'R50,000–R70,000'],
                  ['Catering & bar', '30–40%', 'R60,000–R80,000'],
                  ['Photography & video', '10–15%', 'R20,000–R30,000'],
                  ['Flowers & décor', '8–12%', 'R16,000–R24,000'],
                  ['Entertainment (DJ/band)', '4–6%', 'R8,000–R12,000'],
                  ['Attire (dress, suit)', '5–8%', 'R10,000–R16,000'],
                  ['Stationery & extras', '2–4%', 'R4,000–R8,000'],
                  ['Honeymoon transport', '3–5%', 'R6,000–R10,000'],
                ].map(([cat, pct, amt]) => (
                  <tr key={cat} style={{ borderTop: '1px solid var(--color-border)' }}>
                    <td className="px-4 py-2.5 text-sm" style={{ color: 'var(--color-text)' }}>{cat}</td>
                    <td className="px-4 py-2.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>{pct}</td>
                    <td className="px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>{amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm mb-4">
            Always keep a contingency buffer of 10–15% of your total budget for unexpected costs. South African weddings rarely come in exactly on budget — there are always last-minute additions, extra guests, or small emergencies.
          </p>
          <p className="text-sm">
            Use HitchedSA's built-in budget tracker to set your total, allocate it across categories, and track every payment. You'll get an instant visual of where you stand at any moment.
          </p>
        </section>

        {/* ── Venue ───────────────────────────────────────────────────────── */}
        <section id="venue">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Choosing a Wedding Venue in South Africa
          </h2>
          <p className="mb-4 text-sm">
            South Africa has some of the most spectacular wedding venues in the world — from Cape Winelands farms and Drakensberg mountain retreats to beachfront Durban estates and Johannesburg heritage buildings. Narrowing down your options starts with three questions: How many guests? What is your budget? What feeling do you want?
          </p>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>Popular SA Wedding Venue Regions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { region: 'Cape Winelands', desc: 'Stellenbosch, Franschhoek, and Paarl offer stunning wine farm venues with mountain backdrops. Peak season is Oct–March. Expect R30,000–R80,000+ for venue hire alone.' },
              { region: 'Cape Town City', desc: 'Heritage buildings, rooftop venues, and beachfront properties. Popular for intimate weddings. Venue costs are similar to the Winelands but can be more budget-friendly.' },
              { region: 'Johannesburg & Pretoria', desc: 'The widest range of venue styles from luxury to affordable. Heritage farms in Muldersdrift and the East Rand are popular. More flexible pricing than the Cape.' },
              { region: 'KwaZulu-Natal', desc: 'Durban beachfront venues, Midlands Meander farms, and bush estates. Generally more affordable than Cape venues with beautiful natural settings.' },
              { region: 'Garden Route', desc: 'Knysna, George, and Plettenberg Bay offer forest and coastal venues. Popular for destination weddings. Limited availability in December–January.' },
              { region: 'Mpumalanga & Limpopo', desc: 'Bush and game lodge weddings for a uniquely African experience. Perfect for smaller, intimate weddings. Safari-style ceremonies are an unforgettable option.' },
            ].map((v) => (
              <div key={v.region} className="card p-4">
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-heading)' }}>{v.region}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{v.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--color-accent)' }}>Questions to Ask Every Venue</h3>
          <ul className="text-sm space-y-1.5 mb-4 list-disc list-inside" style={{ color: 'var(--color-text-muted)' }}>
            <li>What is the minimum and maximum capacity?</li>
            <li>Is catering in-house or can we bring our own caterer?</li>
            <li>Is accommodation on-site or nearby? Is it included?</li>
            <li>What is the noise curfew and can we have live music?</li>
            <li>Is there a wet weather contingency (indoor option)?</li>
            <li>What is included in the hire fee — tables, chairs, lighting?</li>
            <li>Are there preferred or exclusive supplier lists we must use?</li>
            <li>What is the cancellation and rescheduling policy?</li>
          </ul>
        </section>

        <AdBanner slot="guide-mid-2" size="leaderboard" />

        {/* ── Suppliers ───────────────────────────────────────────────────── */}
        <section id="suppliers">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Building Your South African Supplier Team
          </h2>
          <p className="mb-4 text-sm">
            After your venue and date are locked in, building your supplier team is the most important part of wedding planning. The best suppliers in South Africa book out fast — especially in major cities where a single weekend can have dozens of weddings. Here is what you need to know about each key supplier category.
          </p>

          {[
            {
              title: 'Photographers',
              body: 'Your wedding photographer is arguably your most important supplier — their work is what you will look at for the rest of your lives. South Africa has exceptional photographers, especially in Cape Town and Johannesburg. Budget R15,000–R45,000 for a full-day photographer. Always view full wedding galleries (not just highlight shots), meet in person or on a video call, and ensure you own the digital files. Book 12–18 months in advance for peak season dates.',
            },
            {
              title: 'Caterers',
              body: 'Many SA venues provide in-house catering as part of the package. If your venue allows external caterers, get at least three itemised quotes for accurate comparison. Typical per-head costs in South Africa range from R400–R500 for a self-service buffet to R800–R1,200+ for a plated menu with waiting staff. Confirm what is included: crockery, cutlery, glassware, waitstaff, setup and teardown, and a separate menu for vegetarian and dietary requirements.',
            },
            {
              title: 'Florists',
              body: 'A good florist does far more than flowers — they set the visual tone for your entire wedding. South Africa has exceptional florists, particularly in the Winelands and Johannesburg. Budget R15,000–R40,000 for full floral styling including ceremony arch, bridal bouquet, bridesmaid bouquets, and table centrepieces. Always ask for a detailed quote showing each element, and confirm whether the quote includes delivery, setup, and collection.',
            },
            {
              title: 'DJs & Entertainment',
              body: 'A skilled DJ keeps your reception energy alive. Budget R5,000–R15,000 for a professional wedding DJ in South Africa, though top-tier DJs in major cities charge more. Provide a must-play and do-not-play list. Check whether they have their own sound equipment, lighting, and backup gear. For something more unique, consider a live band, jazz quartet, traditional drumming for the arrival, or a mix of live and DJ entertainment.',
            },
            {
              title: 'Hair & Makeup Artists',
              body: 'Book your bridal hair and makeup team as soon as your venue is confirmed. Top bridal beauty artists in Cape Town and Johannesburg fill their schedules 9–12 months ahead. Always do a trial run 4–8 weeks before the wedding. Confirm how many artists they will bring for your bridal party, how much time they need on the morning, and what travel fees apply if they need to come to your venue.',
            },
          ].map((s) => (
            <div key={s.title} className="mb-5">
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-accent)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.body}</p>
            </div>
          ))}
        </section>

        {/* ── Guest List ──────────────────────────────────────────────────── */}
        <section id="guests">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Managing Your Guest List
          </h2>
          <p className="mb-4 text-sm">
            The guest list is one of the most emotionally charged parts of wedding planning for South African couples. Extended family expectations, workplace obligations, and social pressure can quickly turn a planned 80-person wedding into a 180-person event. Being firm about your numbers from the beginning saves enormous cost and stress.
          </p>
          <h3 className="font-semibold text-base mb-2 mt-4" style={{ color: 'var(--color-accent)' }}>Tips for Managing Your List</h3>
          <ul className="text-sm space-y-2 list-disc list-inside mb-4" style={{ color: 'var(--color-text-muted)' }}>
            <li>Start with a dream list — every person you would genuinely love to have there. Then work backwards to your budget.</li>
            <li>Create an A-list and B-list. Send A-list invitations first. Only extend B-list invitations if A-list guests decline.</li>
            <li>Set a clear RSVP deadline (typically 6 weeks before the wedding) and follow up with non-responders personally.</li>
            <li>Track dietary requirements early — your caterer needs final numbers 2–3 weeks before the wedding.</li>
            <li>For mixed cultural celebrations, seat guests who know each other together to help people feel comfortable.</li>
            <li>Use HitchedSA's guest list manager to track RSVPs, dietary needs, and table assignments all in one place.</li>
          </ul>
        </section>

        <AdBanner slot="guide-mid-3" size="leaderboard" />

        {/* ── SA Traditions ───────────────────────────────────────────────── */}
        <section id="traditions">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            South African Wedding Traditions
          </h2>
          <p className="mb-4 text-sm">
            South Africa's rich cultural diversity means weddings here are as varied and beautiful as the country itself. Many couples choose to blend Western and traditional elements, creating a celebration that is uniquely South African.
          </p>

          {[
            {
              title: 'Zulu Weddings (Umabo)',
              body: 'Traditional Zulu weddings are vibrant, multi-day celebrations. The Umabo ceremony involves the bride moving to the groom\'s family home and presenting gifts. Guests dress in traditional Zulu attire — colourful beadwork, animal skin, and reed skirts. Slaughtering a cow is a central part of many traditional ceremonies as an offering to the ancestors.',
            },
            {
              title: 'Xhosa Weddings (Umtshato)',
              body: 'Xhosa weddings feature the Lobola (bride price) negotiation as a foundational element. The Umabo ceremony follows, with the bride and her family bringing gifts to the groom\'s family. Traditional Xhosa attire is stunning — bold blue and white fabrics with detailed beadwork. Dancing, singing, and storytelling play a central role in the celebrations.',
            },
            {
              title: 'Afrikaans Weddings',
              body: 'Traditional Afrikaans weddings often include a "snoekbraai" or braai reception, gospel-influenced music, and boeremusiek. The "bruidstee" (bridal tea) is a popular pre-wedding celebration for the bride and her family. Afrikaans weddings tend to be hearty, generous celebrations centred around family, food, and community.',
            },
            {
              title: 'Cape Malay Weddings',
              body: 'Cape Malay weddings in the Western Cape are colourful and musical affairs. The "Nagmaal" celebrations before the wedding involve singing and lantern processions. Aromatic Cape Malay cuisine — denningvleis, bobotie, and koeksisters — plays a central role. Bright colours, especially yellow, feature prominently in decor and attire.',
            },
            {
              title: 'Lobola Negotiations',
              body: 'Lobola (also known as roora in Shona or bohadi in Sesotho) is practised across many South African cultures and is a fundamental part of many SA weddings. It represents the groom\'s family\'s appreciation of the bride and creates a bond between the two families. Today, Lobola negotiations often combine traditional protocols with modern realities, sometimes including a mix of cattle and monetary contributions.',
            },
          ].map((t) => (
            <div key={t.title} className="card p-5 mb-4">
              <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-heading)' }}>{t.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.body}</p>
            </div>
          ))}
        </section>

        {/* ── Food & Catering ─────────────────────────────────────────────── */}
        <section id="food">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            Food &amp; Catering for a South African Wedding
          </h2>
          <p className="mb-4 text-sm">
            South Africans take food seriously, and a wedding where guests leave hungry is a wedding people will remember for the wrong reasons. The food and drink budget is typically the single largest expense for a South African wedding — budget generously and guests will talk about your wedding for years.
          </p>

          <h3 className="font-semibold text-base mb-2 mt-4" style={{ color: 'var(--color-accent)' }}>Popular SA Wedding Menu Formats</h3>
          <ul className="text-sm space-y-2 list-disc list-inside mb-5" style={{ color: 'var(--color-text-muted)' }}>
            <li><strong style={{ color: 'var(--color-text)' }}>Plated dinner</strong> — Most formal. Waiters serve each course individually. Higher cost but premium experience.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Buffet</strong> — Very popular at SA weddings. Allows greater variety and guests can choose. More relaxed atmosphere.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Cocktail-style</strong> — Roaming canapés and stations instead of a sit-down meal. Works well for smaller or afternoon weddings.</li>
            <li><strong style={{ color: 'var(--color-text)' }}>Braai reception</strong> — Quintessentially South African. A well-run braai with top-quality meat is a crowd favourite and can be more cost-effective than formal catering.</li>
          </ul>

          <h3 className="font-semibold text-base mb-2 mt-4" style={{ color: 'var(--color-accent)' }}>The Bar</h3>
          <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Decide early whether you will offer a full open bar, limited bar (beer, wine, soft drinks), or a cash bar. South African guests generally expect at least a limited open bar. Confirm who supplies the alcohol — many venues have preferred suppliers or only allow their own bar. A per-consumption bar costs less for the couple but can feel less generous to guests.
          </p>
        </section>

        {/* ── Final Week ──────────────────────────────────────────────────── */}
        <section id="finalweek">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
            The Final Week Before Your Wedding
          </h2>
          <p className="mb-4 text-sm">
            The week before your wedding is not the time to add new tasks — it is the time to confirm everything is in place, delegate as much as possible, and look after yourself.
          </p>
          <ul className="text-sm space-y-2 list-disc list-inside mb-6" style={{ color: 'var(--color-text-muted)' }}>
            <li>Send a detailed day-of timeline to every supplier at least 5 days before</li>
            <li>Confirm arrival times with your photographer, DJ, florist, and caterer</li>
            <li>Confirm final headcount with your caterer and venue</li>
            <li>Have all supplier payments ready — most SA suppliers require cash or immediate EFT on the day</li>
            <li>Pack an emergency kit: safety pins, pain medication, stain remover, needle and thread, phone charger, snacks</li>
            <li>Assign a trusted friend or family member to handle supplier queries on the day so you can be present</li>
            <li>Avoid trying new foods, getting a dramatic new haircut, or making any major purchases</li>
            <li>Get as much sleep as possible in the three days before the wedding</li>
            <li>Have your dress/suit pressed and ready at least 2 days before</li>
            <li>Write your vows if you are doing personal vows — don't leave this to the night before</li>
          </ul>

          <div className="card p-6 text-center" style={{ background: 'var(--color-surface)' }}>
            <div className="text-3xl mb-3">💍</div>
            <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
              Plan Your Wedding with HitchedSA
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Use our free wedding planning tools to manage your budget, guest list, venue search, supplier directory, checklist, seating plan, and more — all in one place, built for South African couples.
            </p>
            <Link to="/login" className="btn-primary text-sm px-8">
              Start Planning for Free
            </Link>
          </div>
        </section>

        <AdBanner slot="guide-bottom" size="leaderboard" />

      </div>
    </div>
  )
}
