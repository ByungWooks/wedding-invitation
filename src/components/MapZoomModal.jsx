import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function MapZoomModalView({ onClose, mapSrc, mapAlt = '약도 확대 보기' }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)

  const dragStartRef = useRef({ x: 0, y: 0 })
  const initialPanRef = useRef({ x: 0, y: 0 })
  const initialDistanceRef = useRef(null)
  const initialScaleRef = useRef(1)
  const lastTapRef = useRef(0)

  // Lock body scroll and handle Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  // Double tap to toggle zoom between 1x and 2.2x
  const handleDoubleTap = (e) => {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastTapRef.current < 320) {
      if (scale > 1.2) {
        setScale(1)
        setPosition({ x: 0, y: 0 })
      } else {
        setScale(2.2)
        setPosition({ x: 0, y: 0 })
      }
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  // Zoom button controls
  const handleZoomIn = (e) => {
    e.stopPropagation()
    setScale((prev) => Math.min(prev + 0.5, 3.5))
  }

  const handleZoomOut = (e) => {
    e.stopPropagation()
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }

  const handleReset = (e) => {
    e.stopPropagation()
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Touch handlers for mobile pinch-to-zoom & pan drag
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      initialDistanceRef.current = Math.hypot(dx, dy)
      initialScaleRef.current = scale
      setIsInteracting(true)
    } else if (e.touches.length === 1) {
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      initialPanRef.current = { ...position }
      if (scale > 1) {
        setIsInteracting(true)
      }
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistanceRef.current) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = dist / initialDistanceRef.current
      const newScale = Math.min(Math.max(initialScaleRef.current * ratio, 1), 3.5)
      setScale(newScale)
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 })
      }
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault()
      const dx = e.touches[0].clientX - dragStartRef.current.x
      const dy = e.touches[0].clientY - dragStartRef.current.y
      const maxPanX = (window.innerWidth * (scale - 1)) / 1.6 + 30
      const maxPanY = (window.innerHeight * (scale - 1)) / 1.6 + 30
      setPosition({
        x: Math.min(Math.max(initialPanRef.current.x + dx, -maxPanX), maxPanX),
        y: Math.min(Math.max(initialPanRef.current.y + dy, -maxPanY), maxPanY),
      })
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      initialDistanceRef.current = null
    }
    if (e.touches.length === 0) {
      setIsInteracting(false)
      if (scale <= 1.05) {
        setScale(1)
        setPosition({ x: 0, y: 0 })
      }
    }
  }

  // Mouse drag for desktop
  const handleMouseDown = (e) => {
    if (scale > 1) {
      dragStartRef.current = { x: e.clientX, y: e.clientY }
      initialPanRef.current = { ...position }
      setIsInteracting(true)
    }
  }

  const handleMouseMove = (e) => {
    if (isInteracting && scale > 1) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      setPosition({
        x: initialPanRef.current.x + dx,
        y: initialPanRef.current.y + dy,
      })
    }
  }

  const handleMouseUp = () => {
    setIsInteracting(false)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/92 backdrop-blur-xs select-none touch-none overflow-hidden"
      onClick={() => {
        if (scale === 1) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="약도 확대 뷰어"
    >
      {/* 상단 툴바 */}
      <div className="z-10 flex w-full items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 text-white/90">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
          <span className="text-sm font-medium tracking-tight">약도 크게 보기</span>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white/90 transition hover:bg-white/25 active:scale-95 focus:outline-none"
          onClick={onClose}
          aria-label="닫기"
        >
          <span className="text-2xl font-light leading-none">×</span>
        </button>
      </div>

      {/* 중앙 약도 컨테이너 */}
      <div
        className="relative flex flex-1 w-full items-center justify-center overflow-hidden px-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleDoubleTap}
      >
        <img
          src={mapSrc}
          alt={mapAlt}
          className="max-h-[80vh] w-full max-w-[500px] rounded-lg bg-white object-contain shadow-2xl transition-transform will-change-transform pointer-events-auto"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transition: isInteracting ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0, 0.2, 1)',
            cursor: scale > 1 ? (isInteracting ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* 하단 컨트롤 바 및 제스처 힌트 */}
      <div className="z-10 flex flex-col items-center gap-2 px-4 pb-8 pt-2">
        <div className="flex items-center gap-1.5 rounded-full bg-white/20 p-1.5 backdrop-blur-md shadow-lg border border-white/10 text-white text-xs font-medium">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition"
            aria-label="축소"
          >
            <span className="text-base font-bold">−</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1 text-xs rounded-full hover:bg-white/20 active:scale-95 transition"
            aria-label="100% 초기화"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 3.5}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition"
            aria-label="확대"
          >
            <span className="text-base font-bold">+</span>
          </button>
        </div>

        <p className="text-[11px] text-white/60 tracking-tight">
          💡 더블 탭하거나 두 손가락으로 확대할 수 있습니다
        </p>
      </div>
    </div>,
    document.body
  )
}

export function MapZoomModal({ isOpen, onClose, mapSrc, mapAlt }) {
  if (!isOpen) return null
  return <MapZoomModalView onClose={onClose} mapSrc={mapSrc} mapAlt={mapAlt} />
}
