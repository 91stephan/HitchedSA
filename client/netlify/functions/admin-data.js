// Server-side admin data API. READ-ONLY: it lists users and computes signup
// stats. It never writes, updates, or deletes any record, and it never touches
// couples' planning data (guests, budget, checklist, etc.).
//
// Security: every request must carry a valid Supabase login token AND the token
// must belong to an email on the admin allowlist below. Anyone else gets 403.
// Hiding the "Admin" link in the browser is only cosmetic; this function is the
// real gate, so a non-admin who navigates to /admin manually still gets nothing.
//
// Required Netlify environment variables (already set for the search function):
//   SUPABASE_URL                (or VITE_SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY   (service_role secret)
// Optional:
//   ADMIN_EMAILS                comma-separated allowlist; defaults to the owner.

import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '91stephan@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

// Signups grouped by day for the last `days` days, oldest first, with zero-fill
// so the chart has a continuous axis even on quiet days.
function buildSignupSeries(users, days) {
  const DAY = 24 * 60 * 60 * 1000
  const now = Date.now()
  const counts = {}
  for (let i = days - 1; i >= 0; i--) {
    counts[new Date(now - i * DAY).toISOString().slice(0, 10)] = 0
  }
  for (const u of users) {
    if (!u.created_at) continue
    const k = u.created_at.slice(0, 10)
    if (k in counts) counts[k] += 1
  }
  return Object.entries(counts).map(([date, count]) => ({ date, count }))
}

export default async (req) => {
  if (req.method !== 'POST') return json({ message: 'Method not allowed' }, 405)

  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return json({ message: 'Admin API is not configured yet.' }, 500)
  }

  // 1. Require a valid Supabase login token.
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) return json({ message: 'Not authorized.' }, 401)

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: userData, error: userErr } = await admin.auth.getUser(token)
  if (userErr || !userData?.user) return json({ message: 'Not authorized.' }, 401)

  // 2. The token must belong to an admin email.
  const email = (userData.user.email || '').trim().toLowerCase()
  if (!ADMIN_EMAILS.includes(email)) return json({ message: 'Forbidden.' }, 403)

  let body = {}
  try {
    body = await req.json()
  } catch {
    /* empty body is fine; defaults to overview */
  }
  const action = body.action || 'overview'
  if (action !== 'overview' && action !== 'users') {
    return json({ message: 'Unknown action.' }, 400)
  }

  // 3. Page through all auth users (listUsers is paginated). Read-only.
  const users = []
  const perPage = 200
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
    if (error) return json({ message: 'Failed to load users.' }, 502)
    const batch = data?.users || []
    users.push(...batch)
    if (batch.length < perPage) break
  }

  const slim = users.map((u) => ({
    id: u.id,
    email: u.email || null,
    created_at: u.created_at || null,
    last_sign_in_at: u.last_sign_in_at || null,
  }))
  // Newest first.
  slim.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))

  const DAY = 24 * 60 * 60 * 1000
  const now = Date.now()
  const within = (iso, days) => iso && now - new Date(iso).getTime() <= days * DAY
  const overview = {
    totalUsers: slim.length,
    newLast7: slim.filter((u) => within(u.created_at, 7)).length,
    newLast30: slim.filter((u) => within(u.created_at, 30)).length,
    activeLast30: slim.filter((u) => within(u.last_sign_in_at, 30)).length,
    signupsByDay: buildSignupSeries(slim, 30),
  }

  if (action === 'overview') return json({ overview })
  return json({ users: slim, overview })
}
