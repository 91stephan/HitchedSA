// Client wrapper for the server-side Places proxy (Netlify function).
// The Google key lives only on the server now, so all venue/supplier searches
// go through here with the user's Supabase login token attached.
import { supabase } from './supabase'

const ENDPOINT = '/.netlify/functions/places-search'
export const SEARCH_LIMIT = 5

async function call(payload) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    const e = new Error('Please sign in to search.')
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

  if (res.status === 429 && data.error === 'limit') {
    const e = new Error('You have used all your free searches this week.')
    e.code = 'limit'
    e.plan = data.plan
    e.limit = data.limit
    throw e
  }
  if (res.status === 401) {
    const e = new Error('Please sign in to search.')
    e.code = 'auth'
    throw e
  }
  if (!res.ok) {
    throw new Error(data.message || `Search failed (${res.status}). Please try again.`)
  }
  return data // { results, plan, remaining, limit }
}

// type: 'venue' | 'supplier'. textQuery is the full search string.
export function runSearch(type, textQuery) {
  return call({ action: 'search', type, textQuery })
}

// Lightweight plan + remaining lookup, no search performed.
export function fetchSearchStatus() {
  return call({ action: 'status' })
}
