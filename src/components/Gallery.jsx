import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const activeSrc =
    activeIndex === null ? null : wedding.gallery[activeIndex]

  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)
  const touchDeltaXRef = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const showPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? wedding.gallery.length - 1 : prev - 1,
    )
  }

  const showNext = () => {
    setActiveIndex((prev) =>
      prev === wedding.gallery.length - 1 ? 0 : prev + 1,
    )
  }

  useEffect(() => {
    if (activeSrc === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeSrc])

  // Mobile touch swipe handling
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX
      touchStartYRef.current = e.touches[0].clientY
      touchDeltaXRef.current = 0
      setIsSwiping(true)
    }
  }

  const handleTouchMove = (e) => {
    if (!isSwiping || e.touches.length !== 1) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const dx = currentX - touchStartXRef.current
    const dy = currentY - touchStartYRef.current

    // Only swipe horizontally if horizontal motion is dominant
    if (Math.abs(dx) > Math.abs(dy)) {
      if (e.cancelable) e.preventDefault()
      touchDeltaXRef.current = dx
      setDragOffset(dx)
    }
  }

  const handleTouchEnd = () => {
    if (!isSwiping) return
    setIsSwiping(false)
    const threshold = 45 // swipe distance threshold in px
    const dx = touchDeltaXRef.current

    if (dx < -threshold) {
      showNext()
    } else if (dx > threshold) {
      showPrev()
    }
    setDragOffset(0)
    touchDeltaXRef.current = 0
  }

  return (
    <section className="px-5 py-16">
      <SectionTitle kicker="GALLERY" title="갤러리" />
      <div className="grid grid-cols-2 gap-2">
        {wedding.gallery.map((src, index) => (
          <button
            key={src}
            type="button"
            className="aspect-[3/4] overflow-hidden rounded-sm select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose"
            onClick={() => setActiveIndex(index)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={src}
              alt={`웨딩 사진 ${index + 1}`}
              className="pointer-events-none h-full w-full select-none object-cover transition duration-300 hover:scale-105"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </button>
        ))}
      </div>

      {/* 사진 확대 뷰어 모달 (스와이프 지원 & 딤드 영역 클릭 시 닫힘) */}
      {activeSrc
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xs select-none touch-none overflow-hidden"
              onClick={() => setActiveIndex(null)}
              onContextMenu={(e) => e.preventDefault()}
              role="dialog"
              aria-modal="true"
              aria-label="갤러리 확대 보기"
            >
              {/* 상단 페이지 번호 */}
              <div className="absolute top-5 left-6 text-sm text-white/80 font-light tracking-widest select-none">
                {activeIndex + 1} / {wedding.gallery.length}
              </div>

              {/* 닫기 버튼 */}
              <button
                type="button"
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/20 active:scale-95 focus:outline-none"
                onClick={() => setActiveIndex(null)}
                aria-label="닫기"
              >
                <span className="text-2xl font-light leading-none">×</span>
              </button>

              {/* 사진 컨테이너 (터치 스와이프 적용) */}
              <div
                className="relative flex items-center justify-center max-h-[85vh] max-w-[92vw] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
              >
                <img
                  src={activeSrc}
                  alt="선택한 웨딩 사진"
                  className="max-h-[85vh] max-w-[92vw] select-none rounded-sm object-contain will-change-transform pointer-events-auto"
                  style={{
                    transform: `translateX(${dragOffset}px)`,
                    transition: isSwiping ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>

              {/* 이전 사진 버튼 */}
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white/80 hover:text-white hover:bg-black/50 active:scale-95 transition focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  showPrev()
                }}
                aria-label="이전 사진"
              >
                <span className="text-3xl font-light leading-none">‹</span>
              </button>

              {/* 다음 사진 버튼 */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white/80 hover:text-white hover:bg-black/50 active:scale-95 transition focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  showNext()
                }}
                aria-label="다음 사진"
              >
                <span className="text-3xl font-light leading-none">›</span>
              </button>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
