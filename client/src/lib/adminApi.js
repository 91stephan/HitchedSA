// Client wrapper for the server-gated admin data function. The server is the
// real authority on who is an admin; this just attaches the login token.
import { supabase } from './supabase'

const ENDPOINT = '/.netlify/functions/admin-data'

async function call(payload) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    const e = new Error('Please sign in.')
    e.code = 'auth'
    throw e
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(payload),
  })

  let data = {}
  try { data = await res.json() } catch { /* non-JSON error */ }

  if (res.status === 403) {
    const e = new Error('Your account does not have admin access.')
    e.code = 'forbidden'
    throw e
  }
  if (res.status === 401) {
    const e = new Error('Please sign in.')
    e.code = 'auth'
    throw e
  }
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status}).`)
  }
  return data
}

export function fetchAdminOverview() {
  return call({ action: 'overview' })
}

export function fetchAdminUsers() {
  return call({ action: 'users' })
}
