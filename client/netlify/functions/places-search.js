// Server-side proxy for Google Places (New) search.
//
// Why this exists:
//  - The Google Places key never reaches the browser, so it cannot be scraped
//    out of the JS bundle. Only this function holds it (as a Netlify env var).
//  - Every request must carry a valid Supabase login token, so logged-out
//    visitors and scrapers get nothing.
//  - Free accounts get a weekly search quota; Pro accounts are unlimited.
//
// Required Netlify environment variables (Site settings -> Environment):
//   SUPABASE_URL                (same value as VITE_SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY   (Supabase -> Project Settings -> API -> service_role, SECRET)
//   GOOGLE_PLACES_SERVER_KEY    (a NEW, unrestricted-by-referrer Places API key, SECRET)

import { createClient } from '@supabase/supabase-js'

const FREE_WEEKLY_LIMIT = 5

// Paywall temporarily disabled while the site is in AdSense review, so every
// signed-in user gets unlimited searches and never sees an upgrade prompt.
// Flip this back to true to re-enable the free weekly quota and Pro upsell.
const PAYWALL_ENABLED = false

const FIELD_MASKS = {
  venue:
    'places.id,places.displayName,places.formattedAddress,places.rating,places.photos,places.editorialSummary,places.nationalPhoneNumber,places.priceLevel,places.websiteUri',
  supplier:
    'places.id,places.displayName,places.formattedAddress,places.rating,places.editorialSummary,places.nationalPhoneNumber,places.priceLevel',
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

// Monday (UTC) of the current week, as YYYY-MM-DD.
function currentWeekStart() {
  const now = new Date()
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const dow = (d.getUTCDay() + 6) % 7 // Mon=0 ... Sun=6
  d.setUTCDate(d.getUTCDate() - dow)
  return d.toISOString().slice(0, 10)
}

// Resolve a Places photo resource name into a key-free, browser-loadable URL.
// skipHttpRedirect=true returns JSON with a signed googleusercontent photoUri
// that works without exposing our key.
async function resolvePhoto(photoName, key) {
  try {
    const url =
      `https://places.googleapis.com/v1/${photoName}/media` +
      `?maxWidthPx=800&skipHttpRedirect=true&key=${key}`
    const r = await fetch(url)
    if (!r.ok) return null
    const j = await r.json()
    return j.photoUri || null
  } catch {
    return null
  }
}

export default async (req) => {
  if (req.method !== 'POST') return json({ message: 'Method not allowed' }, 405)

  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  // Prefer a dedicated server key, but fall back to the existing Google key
  // already set in Netlify so search does not depend on a second new variable.
  const GOOGLE_KEY = process.env.GOOGLE_PLACES_SERVER_KEY || process.env.VITE_GOOGLE_MAPS_KEY

  if (!SUPABASE_URL || !SERVICE_KEY || !GOOGLE_KEY) {
    return json({ message: 'Search is not configured yet. Please try again later.' }, 500)
  }

  // 1. Require a valid Supabase login token.
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) return json({ message: 'Please sign in to search.' }, 401)

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: userData, error: userErr } = await admin.auth.getUser(token)
  if (userErr || !userData?.user) return json({ message: 'Please sign in to search.' }, 401)
  const uid = userData.user.id

  let body
  try {
    body = await req.json()
  } catch {
    return json({ message: 'Bad request.' }, 400)
  }
  const action = body.action || 'search'

  // 2. Resolve plan and current usage.
  const weekStart = currentWeekStart()

  const { data: sub } = await admin
    .from('subscriptions')
    .select('plan,status')
    .eq('user_id', uid)
    .maybeSingle()
  const plan = sub && sub.status === 'active' && sub.plan === 'pro' ? 'pro' : 'free'
  // Unlimited when the paywall is off, or for genuine Pro accounts.
  const unlimited = !PAYWALL_ENABLED || plan === 'pro'

  const { data: usageRow } = await admin
    .from('search_usage')
    .select('count')
    .eq('user_id', uid)
    .eq('week_start', weekStart)
    .maybeSingle()
  const used = usageRow?.count || 0
  const remaining = unlimited ? null : Math.max(0, FREE_WEEKLY_LIMIT - used)

  // Status check: just report plan + remaining, no search performed.
  if (action === 'status') {
    return json({ plan, remaining, limit: FREE_WEEKLY_LIMIT })
  }

  if (action !== 'search') return json({ message: 'Unknown action.' }, 400)

  const type = body.type === 'supplier' ? 'supplier' : 'venue'
  const textQuery = (body.textQuery || '').trim()
  if (!textQuery) return json({ message: 'Please enter a location to search.' }, 400)

  // 3. Enforce the free weekly quota (skipped entirely while the paywall is off).
  if (!unlimited && used >= FREE_WEEKLY_LIMIT) {
    return json({ error: 'limit', plan, remaining: 0, limit: FREE_WEEKLY_LIMIT }, 429)
  }

  // 4. Call Google Places with the server-only key.
  let places = []
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_KEY,
        'X-Goog-FieldMask': FIELD_MASKS[type],
      },
      body: JSON.stringify({ textQuery, maxResultCount: 20 }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('Places API error', res.status, detail.slice(0, 500))
      return json({ message: `Search is temporarily unavailable (${res.status}).` }, 502)
    }
    const data = await res.json()
    places = data.places || []
  } catch (e) {
    console.error('Places fetch failed', e)
    return json({ message: 'Search is temporarily unavailable. Please try again.' }, 502)
  }

  // 5. Venues: resolve the first photo of each place into a key-free URL.
  if (type === 'venue') {
    await Promise.all(
      places.map(async (p) => {
        const name = p.photos?.[0]?.name
        if (name) p.photoUri = await resolvePhoto(name, GOOGLE_KEY)
      })
    )
  }

  // 6. Count this search against the free quota (only when the paywall is on).
  let newRemaining = remaining
  if (!unlimited) {
    const nextCount = used + 1
    await admin
      .from('search_usage')
      .upsert(
        { user_id: uid, week_start: weekStart, count: nextCount, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,week_start' }
      )
    newRemaining = Math.max(0, FREE_WEEKLY_LIMIT - nextCount)
  }

  return json({ results: places, plan, remaining: newRemaining, limit: FREE_WEEKLY_LIMIT })
}
