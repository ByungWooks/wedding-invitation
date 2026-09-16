import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const activeSrc =
    activeIndex === null ? null : wedding.gallery[activeIndex]

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

      {activeSrc
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 select-none"
              onClick={() => setActiveIndex(null)}
              onContextMenu={(e) => e.preventDefault()}
              role="dialog"
              aria-modal="true"
              aria-label="갤러리 확대 보기"
            >
              <div className="absolute top-4 left-6 text-sm text-white/80 font-light tracking-widest select-none">
                {activeIndex + 1} / {wedding.gallery.length}
              </div>

              <img
                src={activeSrc}
                alt="선택한 웨딩 사진"
                className="max-h-[85vh] max-w-[92vw] select-none object-contain transition duration-200"
                onClick={(event) => event.stopPropagation()}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />

              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white text-3xl font-light focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  showPrev()
                }}
                aria-label="이전 사진"
              >
                ‹
              </button>

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white text-3xl font-light focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  showNext()
                }}
                aria-label="다음 사진"
              >
                ›
              </button>

              <button
                type="button"
                className="absolute right-4 top-4 p-2 text-3xl leading-none text-white/80 hover:text-white"
                onClick={() => setActiveIndex(null)}
                aria-label="닫기"
              >
                ×
              </button>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
