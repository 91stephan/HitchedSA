// Post-build prerender: writes a static HTML snapshot of every public route into
// dist/, so Netlify serves real content (with per-page <head> meta) to crawlers.
// Netlify serves existing files before the /* SPA redirect, so no _redirects change
// is needed. The React app still mounts on top and takes over navigation.
//
// Run automatically by `npm run build`:
//   vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

const { render, ROUTES } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
)

const template = readFileSync(join(distDir, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

// Default social-share card for pages without their own image (homepage, guides).
// Table Mountain reads as "South Africa"; swap for a branded 1200x630 card later.
const DEFAULT_OG_IMAGE = 'https://hitchedsa.co.za/images/provinces/western-cape.jpg'

// Site-wide brand structured data, injected on the homepage only so Google can
// recognise HitchedSA as an entity (Organization) and the site itself (WebSite).
// No SearchAction: the venue/supplier search is login-gated, so there is no
// public results URL a sitelinks search box could point at.
const HOME_STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HitchedSA',
    url: 'https://hitchedsa.co.za',
    logo: 'https://hitchedsa.co.za/favicon.svg',
    description:
      'A free, all-in-one wedding planning platform built for South African couples: venue search, budget tracker, guest list, checklist, seating planner and more.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HitchedSA',
    url: 'https://hitchedsa.co.za',
  },
]

// Per-path sitemap hints, mirroring the priorities used in the old static file.
function sitemapMeta(path) {
  if (path === '/') return { priority: '1.0', changefreq: 'weekly' }
  if (path === '/articles') return { priority: '0.9', changefreq: 'weekly' }
  if (['/wedding-guide', '/wedding-venues-guide', '/wedding-venues'].includes(path))
    return { priority: '0.9', changefreq: 'monthly' }
  if (path.startsWith('/wedding-venues/')) return { priority: '0.9', changefreq: 'monthly' }
  if (path.startsWith('/articles/')) return { priority: '0.8', changefreq: 'monthly' }
  if (path === '/privacy' || path === '/terms') return { priority: '0.5', changefreq: 'yearly' }
  return { priority: '0.7', changefreq: 'monthly' }
}

const today = new Date().toISOString().slice(0, 10)
const sitemapUrls = []

let count = 0
for (const { path, title, description, image } of ROUTES) {
  const appHtml = render(path)
  const canonical = `https://hitchedsa.co.za${path === '/' ? '/' : path}`
  const ogImage = image ? `https://hitchedsa.co.za${image}` : DEFAULT_OG_IMAGE

  const headTags = [
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="HitchedSA" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    path === '/'
      ? `<script type="application/ld+json">${JSON.stringify(HOME_STRUCTURED_DATA)}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ')

  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>\n    ${headTags}`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    path === '/' ? join(distDir, 'index.html') : join(distDir, path.slice(1), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)

  const { priority, changefreq } = sitemapMeta(path)
  sitemapUrls.push(
    `  <url><loc>${canonical}</loc><lastmod>${today}</lastmod>` +
      `<priority>${priority}</priority><changefreq>${changefreq}</changefreq></url>`
  )

  count++
  console.log(`prerendered ${path} → ${outFile.slice(distDir.length)}`)
}

// Generate sitemap.xml from the same ROUTES list so it can never drift.
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${sitemapUrls.join('\n')}\n` +
  `</urlset>\n`
writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
console.log(`\n✓ prerendered ${count} public routes`)
console.log(`✓ generated sitemap.xml with ${sitemapUrls.length} urls`)
