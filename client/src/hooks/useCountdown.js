import { useState, useEffect } from 'react'

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(targetDate))

  useEffect(() => {
    if (!targetDate) return
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function calcTimeLeft(targetDate) {
  if (!targetDate) return null
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  }
}
