// Build-time prerender entry — renders the PUBLIC pages to static HTML so search
// engines get full content without executing JavaScript. Only public routes are
// prerendered; the authenticated app stays client-side only.
// Used by scripts/prerender.mjs after `vite build` (see package.json "build").
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/PublicLayout'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import WeddingGuide from './pages/WeddingGuide'
import VenueGuide from './pages/VenueGuide'
import Articles from './pages/Articles'
import WeddingVenuesHub from './pages/WeddingVenuesHub'
import ProvinceVenues from './pages/ProvinceVenues'
import { PROVINCE_LIST } from './content/provinces'

const DEFAULT_DESC =
  'Plan your perfect South African wedding for free. Venue search, budget tracker, guest list, supplier directory, checklist, seating planner and more — built for SA couples.'

// Route list with the same titles/descriptions the pages set via useMeta,
// so the static <head> matches what the client renders.
export const ROUTES = [
  {
    path: '/',
    title: 'Free South African Wedding Planner | HitchedSA',
    description:
      'Plan your perfect South African wedding for free — venue search, budget tracker, guest list, supplier directory, seating planner and more. Built for SA couples.',
  },
  {
    path: '/about',
    title: 'About HitchedSA | HitchedSA',
    description:
      'HitchedSA is a free, all-in-one wedding planning platform built specifically for South African couples. Learn about our tools and mission.',
  },
  {
    path: '/contact',
    title: 'Contact HitchedSA | HitchedSA',
    description:
      'Get in touch with the HitchedSA team — questions, bug reports, feature suggestions, or supplier listing enquiries.',
  },
  { path: '/privacy', title: 'Privacy Policy | HitchedSA', description: DEFAULT_DESC },
  { path: '/terms', title: 'Terms of Service | HitchedSA', description: DEFAULT_DESC },
  {
    path: '/wedding-guide',
    title: 'Complete South African Wedding Planning Guide | HitchedSA',
    description:
      'The complete guide to planning a South African wedding — 12-month timeline, budget in Rands, venue tips, supplier advice, cultural traditions and more.',
  },
  {
    path: '/wedding-venues-guide',
    title: 'South African Wedding Venues Guide | HitchedSA',
    description:
      'The complete guide to wedding venues in South Africa — wine farms, bush lodges, beaches, and heritage estates. Regional breakdowns, price guides, and booking tips for SA couples.',
  },
  {
    path: '/articles',
    title: 'Wedding Guides & Articles for SA Couples | HitchedSA',
    description:
      'Free wedding planning guides written for South Africa — venue guides by province, budgets in rand, seasonal advice and planning checklists.',
  },
  {
    path: '/wedding-venues',
    title: 'South African Wedding Venues by Province | HitchedSA',
    description:
      'Find your wedding venue by province — in-depth guides to all nine South African provinces with featured venues, areas, real price ranges, best seasons and local booking tips.',
  },
  ...PROVINCE_LIST.map((p) => ({
    path: `/wedding-venues/${p.slug}`,
    title: `${p.metaTitle} | HitchedSA`,
    description: p.metaDescription,
  })),
]

export function render(path) {
  return renderToString(
    <ThemeProvider>
      <AuthProvider>
        <StaticRouter location={path}>
          <Routes>
            <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
            <Route path="/wedding-guide" element={<PublicLayout><WeddingGuide /></PublicLayout>} />
            <Route path="/wedding-venues-guide" element={<PublicLayout><VenueGuide /></PublicLayout>} />
            <Route path="/articles" element={<PublicLayout><Articles /></PublicLayout>} />
            <Route path="/wedding-venues" element={<PublicLayout><WeddingVenuesHub /></PublicLayout>} />
            <Route path="/wedding-venues/:slug" element={<PublicLayout><ProvinceVenues /></PublicLayout>} />
          </Routes>
        </StaticRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
