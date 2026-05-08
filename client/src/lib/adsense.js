// ─── AdSense Configuration ──────────────────────────────────────────────────
// Publisher ID is loaded from the environment variable VITE_ADSENSE_CLIENT_ID.
// Uncomment it in your .env (and in Netlify env vars) once AdSense is approved.

// Ad Slot IDs — create these in AdSense → Ads → By ad unit → Display ads → New ad unit
// Replace each placeholder below with the 10-digit numeric slot ID from AdSense.
// You only need to create 2 ad units:
//   1. A "Display" unit for leaderboard/in-content (728×90 or responsive)
//   2. A "Display" unit for sidebar (300×250 or responsive)

export const AD_SLOTS = {
  leaderboard: 'REPLACE_WITH_LEADERBOARD_SLOT_ID', // used on: Checklist, Budget, Guests, Dashboard, Venues, Suppliers
  rectangle:   'REPLACE_WITH_LEADERBOARD_SLOT_ID', // same unit as leaderboard is fine
  banner:      'REPLACE_WITH_LEADERBOARD_SLOT_ID', // same unit as leaderboard is fine
  sidebar:     'REPLACE_WITH_SIDEBAR_SLOT_ID',     // used on: Suppliers sidebar
}