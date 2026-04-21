import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import ThemePreviewCard from '../components/ThemePreviewCard'
import WeddingRingsIllustration from '../components/illustrations/WeddingRingsIllustration'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80'

export default function Welcome() {
  const { completeFirstLaunch } = useApp()
  const { themeId, applyTheme, themes } = useTheme()
  const navigate = useNavigate()

  const [partner1, setPartner1] = useState('')
  const [partner2, setPartner2] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [skipDate, setSkipDate] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!partner1.trim()) e.partner1 = 'Please enter a name'
    if (!partner2.trim()) e.partner2 = 'Please enter a name'
    if (!skipDate && !weddingDate) e.date = 'Please enter a date or select "Still looking"'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    completeFirstLaunch({
      partners: { partner1: partner1.trim(), partner2: partner2.trim() },
      weddingDate: skipDate ? null : weddingDate,
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">

      {/* Full-bleed hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 hero-overlay" />
      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-4 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="mb-4"><WeddingRingsIllustration size={200} /></div>
          <h1 className="font-vibes text-7xl md:text-8xl mb-3 drop-shadow-lg" style={{ color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            HitchedSA
          </h1>
          <p className="font-display text-lg md:text-xl italic text-white/90 drop-shadow" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            Your beautiful South African wedding companion
          </p>
        </div>

        {/* Partner Names — frosted glass card */}
        <div className="glass rounded-2xl p-6 mb-4 w-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-display text-xl font-semibold mb-4 text-white">
            Tell us about you two
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-light">Partner 1 Name</label>
              <input
                className="input-glass"
                placeholder="e.g. Thandi"
                value={partner1}
                onChange={(e) => { setPartner1(e.target.value); setErrors((err) => ({ ...err, partner1: undefined })) }}
              />
              {errors.partner1 && <p className="text-xs mt-1 text-red-300">{errors.partner1}</p>}
            </div>
            <div>
              <label className="label-light">Partner 2 Name</label>
              <input
                className="input-glass"
                placeholder="e.g. Luca"
                value={partner2}
                onChange={(e) => { setPartner2(e.target.value); setErrors((err) => ({ ...err, partner2: undefined })) }}
              />
              {errors.partner2 && <p className="text-xs mt-1 text-red-300">{errors.partner2}</p>}
            </div>
          </div>
        </div>

        {/* Wedding Date — frosted glass card */}
        <div className="glass rounded-2xl p-6 mb-4 w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-display text-xl font-semibold mb-4 text-white">
            When's the big day?
          </h2>
          <div className="mb-3">
            <label className="label-light">Wedding Date</label>
            <input
              type="date"
              className="input-glass"
              value={weddingDate}
              disabled={skipDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => { setWeddingDate(e.target.value); setErrors((err) => ({ ...err, date: undefined })) }}
              style={{ opacity: skipDate ? 0.4 : 1 }}
            />
            {errors.date && <p className="text-xs mt-1 text-red-300">{errors.date}</p>}
          </div>
          <label
            className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all"
            style={{
              borderColor: skipDate ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
              background: skipDate ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
            }}
          >
            <input
              type="checkbox"
              checked={skipDate}
              onChange={(e) => {
                setSkipDate(e.target.checked)
                if (e.target.checked) setWeddingDate('')
                setErrors((err) => ({ ...err, date: undefined }))
              }}
              className="w-4 h-4"
            />
            <div>
              <div className="text-sm font-medium text-white">Still looking — skip for now</div>
              <div className="text-xs text-white/70">You can set your date later from any venue booking or Settings</div>
            </div>
          </label>
        </div>

        {/* Theme Selector — frosted glass card */}
        <div className="glass rounded-2xl p-6 mb-8 w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="font-display text-xl font-semibold mb-1 text-white">Choose your wedding theme</h2>
          <p className="text-sm mb-4 text-white/70">You can always change this in Settings.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(themes).map((t) => (
              <ThemePreviewCard
                key={t.id}
                theme={t}
                selected={themeId === t.id}
                onClick={() => applyTheme(t.id)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-full text-lg font-display font-bold shadow-2xl transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] animate-fade-in"
          style={{
            animationDelay: '0.4s',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
            border: '2px solid rgba(255,255,255,0.7)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            textShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}
        >
          Let's Begin our Journey
        </button>

        <p className="text-center text-xs mt-4 text-white/60 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          All your data is stored privately on this device — no account needed.
        </p>
      </div>
    </div>
  )
}
