import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return undefined
    const id = setTimeout(onClose, 1800)
    return () => clearTimeout(id)
  }, [message, onClose])

  if (!message) return null

  return createPortal(
    <div
      role="status"
      className="fixed bottom-8 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-cream-50 shadow-lg"
    >
      {message}
    </div>,
    document.body,
  )
}
