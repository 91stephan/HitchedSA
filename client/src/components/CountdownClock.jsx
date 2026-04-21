import { useCountdown } from '../hooks/useCountdown'

function TimeBox({ value, label, light }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold font-display shadow-lg"
        style={light
          ? { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff' }
          : { background: 'var(--color-primary)', color: 'var(--color-button-text)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
        }
      >
        {String(value).padStart(2, '0')}
      </div>
      <span
        className="text-xs mt-2 font-semibold uppercase tracking-widest"
        style={{ color: light ? 'rgba(255,255,255,0.75)' : 'var(--color-text-muted)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function CountdownClock({ targetDate, light = true }) {
  const timeLeft = useCountdown(targetDate)

  if (!timeLeft) return null

  if (timeLeft.isPast) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-3">🎊</div>
        <p className="font-display text-2xl font-bold" style={{ color: light ? '#fff' : 'var(--color-primary)' }}>
          Today is your wedding day!
        </p>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <TimeBox value={timeLeft.days}    label="Days"    light={light} />
      <TimeBox value={timeLeft.hours}   label="Hours"   light={light} />
      <TimeBox value={timeLeft.minutes} label="Minutes" light={light} />
      <TimeBox value={timeLeft.seconds} label="Seconds" light={light} />
    </div>
  )
}
