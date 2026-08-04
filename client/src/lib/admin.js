// Client-side admin allowlist. This ONLY controls whether the "Admin" switch is
// shown in the UI; it is not a security boundary. Every piece of admin data is
// gated server-side in netlify/functions/admin-data.js, which independently
// verifies the caller's login token against its own allowlist before returning
// anything. Editing this file cannot grant anyone real admin access.
export const ADMIN_EMAILS = ['91stephan@gmail.com']

export function isAdminEmail(email) {
  return !!email && ADMIN_EMAILS.includes(email.trim().toLowerCase())
}
