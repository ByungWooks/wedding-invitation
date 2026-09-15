import { useEffect, useState } from 'react'

function getRemaining(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: diff === 0,
  }
}

export function useCountdown(targetIso) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetIso))

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetIso)), 1000)
    return () => clearInterval(id)
  }, [targetIso])

  return remaining
}
