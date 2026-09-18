import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

function GalleryPhotoViewer({ activeIndex, src, animClass, onAnimationEnd, onPrev, onNext }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const dragStartRef = useRef({ x: 0, y: 0 })
  const initialPanRef = useRef({ x: 0, y: 0 })
  const initialDistanceRef = useRef(null)
  const initialScaleRef = useRef(1)
  const lastTapRef = useRef(0)

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

  // Touch handlers: pinch zoom when 2 touches; pan or swipe when 1 touch
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      initialDistanceRef.current = Math.hypot(dx, dy)
      initialScaleRef.current = scale
      setIsInteracting(true)
      setIsSwiping(false)
    } else if (e.touches.length === 1) {
      const touch = e.touches[0]
      dragStartRef.current = { x: touch.clientX, y: touch.clientY }
      initialPanRef.current = { ...position }

      if (scale > 1) {
        setIsInteracting(true)
        setIsSwiping(false)
      } else {
        setIsSwiping(true)
        setIsInteracting(false)
      }
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistanceRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = dist / initialDistanceRef.current
      const newScale = Math.min(Math.max(initialScaleRef.current * ratio, 1), 3.5)
      setScale(newScale)
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 })
      }
    } else if (e.touches.length === 1) {
      const touch = e.touches[0]
      const dx = touch.clientX - dragStartRef.current.x
      const dy = touch.clientY - dragStartRef.current.y

      if (scale > 1 && isInteracting) {
        const maxPanX = (window.innerWidth * (scale - 1)) / 1.6 + 40
        const maxPanY = (window.innerHeight * (scale - 1)) / 1.6 + 40
        setPosition({
          x: Math.min(Math.max(initialPanRef.current.x + dx, -maxPanX), maxPanX),
          y: Math.min(Math.max(initialPanRef.current.y + dy, -maxPanY), maxPanY),
        })
      } else if (scale === 1 && isSwiping) {
        if (Math.abs(dx) > Math.abs(dy)) {
          setDragOffset(dx)
        }
      }
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      initialDistanceRef.current = null
    }

    if (e.touches.length === 0) {
      setIsInteracting(false)

      if (scale > 1) {
        if (scale <= 1.05) {
          setScale(1)
          setPosition({ x: 0, y: 0 })
        }
      } else if (isSwiping) {
        setIsSwiping(false)
        const threshold = 45
        if (dragOffset > threshold) {
          onPrev()
        } else if (dragOffset < -threshold) {
          onNext()
        }
        setDragOffset(0)
      }
    }
  }

  // Desktop mouse drag
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

  const getTransform = () => {
    if (scale > 1) {
      return `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`
    }
    return `translate3d(${dragOffset}px, 0, 0) scale(1)`
  }

  return (
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
        src={src}
        alt={`웨딩 사진 ${activeIndex + 1}`}
        className={`max-h-[78vh] max-w-[90vw] select-none rounded-sm object-contain will-change-transform shadow-[0_12px_45px_rgba(0,0,0,0.12)] border border-black/5 ${animClass}`}
        style={{
          transform: getTransform(),
          transition: isInteracting || isSwiping ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
          cursor: scale > 1 ? (isInteracting ? 'grabbing' : 'grab') : 'zoom-in',
        }}
        onClick={handleDoubleTap}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  )
}

function GalleryModal({ activeIndex, onClose, onPrev, onNext, gallery }) {
  const [animClass, setAnimClass] = useState('')
  const activeSrc = gallery[activeIndex]

  // Lock body scroll and handle keyboard navigation
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        setAnimClass('slide-from-left')
        onPrev()
      }
      if (e.key === 'ArrowRight') {
        setAnimClass('slide-from-right')
        onNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onPrev, onNext])

  const handlePrev = useCallback(() => {
    setAnimClass('slide-from-left')
    onPrev()
  }, [onPrev])

  const handleNext = useCallback(() => {
    setAnimClass('slide-from-right')
    onNext()
  }, [onNext])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-md select-none touch-none overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="갤러리 확대 보기"
    >
      {/* 상단 페이지 번호 카운터 */}
      <div className="absolute top-5 left-6 z-20 text-sm text-ink-muted font-medium tracking-widest select-none pointer-events-none">
        {activeIndex + 1} / {gallery.length}
      </div>

      {/* 우측 상단 닫기 버튼 */}
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

      {/* 중앙 사진 뷰어 (완벽한 수직 중앙 정렬 & key={activeIndex}로 줌/위치 자동 초기화) */}
      <GalleryPhotoViewer
        key={activeIndex}
        activeIndex={activeIndex}
        src={activeSrc}
        animClass={animClass}
        onAnimationEnd={() => setAnimClass('')}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* 왼쪽 이전 사진 화살표 버튼 (완벽한 수직 중앙 정렬 & SVG 아이콘) */}
      <button
        type="button"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white hover:text-black active:scale-95 transition focus:outline-none border border-black/5"
        onClick={(e) => {
          e.stopPropagation()
          handlePrev()
        }}
        aria-label="이전 사진"
      >
        <svg
          className="h-5 w-5 stroke-current fill-none -translate-x-0.5"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 오른쪽 다음 사진 화살표 버튼 (완벽한 수직 중앙 정렬 & SVG 아이콘) */}
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white hover:text-black active:scale-95 transition focus:outline-none border border-black/5"
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        aria-label="다음 사진"
      >
        <svg
          className="h-5 w-5 stroke-current fill-none translate-x-0.5"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>,
    document.body
  )
}

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? wedding.gallery.length - 1 : prev - 1,
    )
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === wedding.gallery.length - 1 ? 0 : prev + 1,
    )
  }, [])

  const handleClose = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const displayedGallery = isExpanded
    ? wedding.gallery
    : wedding.gallery.slice(0, 6)

  return (
    <section className="px-5 py-16">
      <SectionTitle kicker="GALLERY" title="갤러리" />
      <div className="grid grid-cols-2 gap-2">
        {displayedGallery.map((src) => {
          const originalIndex = wedding.gallery.indexOf(src)
          return (
            <button
              key={src}
              type="button"
              className="aspect-[3/4] overflow-hidden rounded-sm select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              onClick={() => setActiveIndex(originalIndex)}
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={src}
                alt={`웨딩 사진 ${originalIndex + 1}`}
                className="pointer-events-none h-full w-full select-none object-cover transition duration-300 hover:scale-105"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </button>
          )
        })}
      </div>

      {wedding.gallery.length > 6 ? (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2 text-xs font-medium text-ink-muted shadow-2xs transition hover:bg-gray-50 hover:text-ink active:scale-98"
          >
            {isExpanded ? (
              <>
                <span>접기</span>
                <svg
                  className="h-3.5 w-3.5 stroke-current fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </>
            ) : (
              <>
                <span>더보기</span>
                <svg
                  className="h-3.5 w-3.5 stroke-current fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </>
            )}
          </button>
        </div>
      ) : null}

      {activeIndex !== null ? (
        <GalleryModal
          activeIndex={activeIndex}
          gallery={wedding.gallery}
          onClose={handleClose}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
    </section>
  )
}
