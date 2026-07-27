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
  ].join('\n    ')

  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>\n    ${headTags}`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    path === '/' ? join(distDir, 'index.html') : join(distDir, path.slice(1), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  count++
  console.log(`prerendered ${path} → ${outFile.slice(distDir.length)}`)
}

console.log(`\n✓ prerendered ${count} public routes`)
