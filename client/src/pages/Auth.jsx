import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import WeddingRingsIllustration from '../components/illustrations/WeddingRingsIllustration'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80'

export default function Auth() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode]           = useState('login')   // 'login' | 'register'
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')

  const reset = () => { setError(''); setSuccess('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    reset()

    if (!email.trim() || !password) { setError('Please fill in all fields.'); return }
    if (mode === 'register' && password !== confirm) { setError('Passwords do not match.'); return }
    if (mode === 'register' && password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      if (mode === 'login') {
        const { error: err } = await signIn({ email, password })
        if (err) { setError(err.message); return }
        navigate('/dashboard')
      } else {
        const { error: err } = await signUp({ email, password })
        if (err) { setError(err.message); return }
        setSuccess('Account created! Setting up your wedding planner…')
        setTimeout(() => navigate('/welcome-setup'), 1200)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

      <div className="relative z-10 w-full max-w-md px-4 py-10 flex flex-col items-center animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-3"><WeddingRingsIllustration size={120} /></div>
          <h1 className="font-vibes text-6xl mb-2 drop-shadow-lg" style={{ color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            HitchedSA
          </h1>
          <p className="text-white/80 text-sm italic">Your South African wedding companion</p>
        </div>

        {/* Tab toggle */}
        <div className="glass rounded-full p-1 flex gap-1 mb-5 w-full max-w-xs">
          {['login', 'register'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); reset() }}
              className="flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={mode === m
                ? { background: 'rgba(255,255,255,0.9)', color: '#4A2C35' }
                : { color: 'rgba(255,255,255,0.8)' }
              }
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="glass rounded-2xl p-6 w-full">
          <h2 className="font-display text-xl font-semibold mb-5 text-white">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="label-light">Email</label>
              <input
                type="email"
                className="input-glass"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label-light">Password</label>
              <input
                type="password"
                className="input-glass"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="label-light">Confirm Password</label>
                <input
                  type="password"
                  className="input-glass"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && (
              <div className="text-sm text-red-300 bg-red-900/30 rounded-xl px-4 py-2 border border-red-400/30">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-green-300 bg-green-900/30 rounded-xl px-4 py-2 border border-green-400/30">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-base font-display font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
                border: '2px solid rgba(255,255,255,0.7)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-4 text-white/50">
          Free forever · Your data is private and secure
        </p>
      </div>
    </div>
  )
}