// ─── AdSense Configuration ───────────────────────────────────────────────────
// All values are driven by Netlify environment variables.
// Add these two variables in Netlify → Site configuration → Environment variables,
// then trigger a redeploy — ads will start showing automatically.
//
//   VITE_ADSENSE_CLIENT_ID  →  ca-pub-1556321842353782
//   VITE_ADSENSE_SLOT       →  (10-digit slot ID from AdSense → Ads → By ad unit)

export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT_ID || null
export const ADSENSE_SLOT   = import.meta.env.VITE_ADSENSE_SLOT       || null