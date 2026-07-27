import Modal from './Modal'
import Icon from './Icon'
import { SEARCH_LIMIT } from '../lib/placesApi'

// Paywall prompt shown when a free user runs out of weekly searches.
// PayFast checkout will be wired into handleUpgrade later; for now the button
// registers interest so we can turn on billing without touching this UI.
export default function UpgradeModal({ open, onClose }) {
  const handleUpgrade = () => {
    // PAYFAST: replace this with the PayFast checkout redirect once the
    // merchant account is live (build the signed payment URL and send the
    // user to it). Until then, collect interest by email.
    window.open(
      'mailto:hello@hitchedsa.co.za?subject=HitchedSA%20Pro%20-%20notify%20me&body=I%20would%20like%20to%20upgrade%20to%20Pro%20for%20unlimited%20venue%20and%20supplier%20searches.',
      '_blank'
    )
  }

  return (
    <Modal open={open} onClose={onClose} title="Upgrade to HitchedSA Pro" maxWidth="max-w-md">
      <div className="text-center">
        <div className="flex justify-center mb-3"><Icon name="sparkles" size={40} style={{ color: 'var(--color-primary)' }} /></div>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          You have used all {SEARCH_LIMIT} of your free searches this week. Pro gives you
          unlimited venue and supplier searches so you can keep planning without waiting.
        </p>

        <ul className="text-sm text-left space-y-2 mb-5 mx-auto" style={{ maxWidth: '20rem', color: 'var(--color-text)' }}>
          <li className="flex items-center gap-1.5"><Icon name="check" size={14} style={{ color: 'var(--color-primary)' }} /> Unlimited venue searches</li>
          <li className="flex items-center gap-1.5"><Icon name="check" size={14} style={{ color: 'var(--color-primary)' }} /> Unlimited supplier searches</li>
          <li className="flex items-center gap-1.5"><Icon name="check" size={14} style={{ color: 'var(--color-primary)' }} /> Every planning tool stays free either way</li>
        </ul>

        <div
          className="rounded-lg px-4 py-3 mb-5 text-xs"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}
        >
          Pro billing is launching soon. Tap below to be the first to know and we will
          send you the upgrade link the moment it goes live.
        </div>

        <div className="flex gap-3">
          <button className="btn-outline flex-1" onClick={onClose}>Maybe later</button>
          <button className="btn-primary flex-1" onClick={handleUpgrade}>Notify me</button>
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
          Your free searches reset at the start of next week.
        </p>
      </div>
    </Modal>
  )
}
