import { Component } from 'react'

// Catches render/runtime errors anywhere below it so a single broken component
// shows a friendly recovery screen instead of a blank white page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Log for debugging; never surfaces to the user.
    console.error('App error boundary caught:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="text-center max-w-md animate-fade-in">
          <div className="font-vibes text-5xl mb-3" style={{ color: 'var(--color-primary)' }}>
            HitchedSA
          </div>
          <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
            Something went wrong
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Sorry about that. Reloading the page usually fixes it. Your saved planning is not
            affected.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary text-sm px-6">
            Reload the page
          </button>
        </div>
      </div>
    )
  }
}
