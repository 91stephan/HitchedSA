// A lightweight browser-window chrome used to frame the read-only product
// previews on the homepage and the /demo page. Purely presentational.
export default function BrowserFrame({ url = 'hitchedsa.co.za', children, className = '', bodyClassName = '' }) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg ${className}`}
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </span>
        <span
          className="flex-1 text-center text-xs font-medium rounded px-3 py-1 truncate"
          style={{ background: 'var(--color-card-bg)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
        >
          {url}
        </span>
        <span className="w-3 h-3" aria-hidden="true" />
      </div>
      {/* Body */}
      <div className={bodyClassName} style={{ background: 'var(--color-bg)' }}>
        {children}
      </div>
    </div>
  )
}
