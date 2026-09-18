import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function MapZoomModalView({ onClose, mapSrc, mapAlt = '약도 확대 보기' }) {
  // 모달 열림 즉시 크게 보이도록 기본 배율을 1.45x로 설정
  const [scale, setScale] = useState(1.45)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)

  const dragStartRef = useRef({ x: 0, y: 0 })
  const initialPanRef = useRef({ x: 0, y: 0 })
  const initialDistanceRef = useRef(null)
  const initialScaleRef = useRef(1.45)
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

  // Double tap to toggle zoom between 1.0x (전체보기) and 1.8x (상세확대)
  const handleDoubleTap = (e) => {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastTapRef.current < 320) {
      if (scale > 1.2) {
        setScale(1)
        setPosition({ x: 0, y: 0 })
      } else {
        setScale(1.8)
        setPosition({ x: 0, y: 0 })
      }
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
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
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = dist / initialDistanceRef.current
      const newScale = Math.min(Math.max(initialScaleRef.current * ratio, 0.9), 3.5)
      setScale(newScale)
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 })
      }
    } else if (e.touches.length === 1 && scale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x
      const dy = e.touches[0].clientY - dragStartRef.current.y
      const maxPanX = (window.innerWidth * (scale - 1)) / 1.5 + 50
      const maxPanY = (window.innerHeight * (scale - 1)) / 1.5 + 50
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
      if (scale <= 0.95) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-md select-none touch-none overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="약도 확대 뷰어"
    >
      {/* 상단 안내 라벨 */}
      <div className="absolute top-5 left-6 z-20 text-xs text-ink-muted tracking-wider font-medium select-none pointer-events-none">
        더컨벤션 송파문정 약도
      </div>

      {/* 닫기 버튼 (우측 상단, 화이트 테마에 맞춘 다크 그레이 톤) */}
      <button
        type="button"
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-ink hover:bg-black/10 active:scale-95 transition focus:outline-none"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="닫기"
      >
        <span className="text-2xl font-light leading-none">×</span>
      </button>

      {/* 중앙 약도 이미지 (클릭 시 전파 방지, 1.45배 즉시 확대 상태 & 드래그 탐색) */}
      <div
        className="relative flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={mapSrc}
          alt={mapAlt}
          className="max-h-[80vh] w-full max-w-[540px] rounded-xl bg-white object-contain shadow-[0_12px_45px_rgba(0,0,0,0.12)] border border-black/5 transition-transform will-change-transform"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transition: isInteracting ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0, 0.2, 1)',
            cursor: scale > 1 ? (isInteracting ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          onClick={handleDoubleTap}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </div>,
    document.body
  )
}

export function MapZoomModal({ isOpen, onClose, mapSrc, mapAlt }) {
  if (!isOpen) return null
  return <MapZoomModalView onClose={onClose} mapSrc={mapSrc} mapAlt={mapAlt} />
}
