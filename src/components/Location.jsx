import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

export function Location({ onCopied }) {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  useEffect(() => {
    if (!isMapModalOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMapModalOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMapModalOpen])

  const copyAddress = async () => {
    const fullAddress = `${wedding.venueAddress} ${wedding.venueAddressDetail || ''}`.trim()
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullAddress)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = fullAddress
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        textarea.remove()
      }
      onCopied?.('주소가 복사되었습니다')
    } catch {
      onCopied?.('주소 복사에 실패했습니다')
    }
  }

  return (
    <section className="px-6 py-16">
      <SectionTitle kicker="LOCATION" title="오시는 길" />

      {/* 공식 약도 이미지 (클릭 시 확대 모달) */}
      <div className="relative overflow-hidden rounded-xl border border-cream-300 bg-white shadow-xs">
        <button
          type="button"
          onClick={() => setIsMapModalOpen(true)}
          className="group block w-full text-left focus:outline-none"
          aria-label="약도 크게 보기"
        >
          <img
            src={wedding.mapImage || '/photos/official_map.png'}
            alt="더컨벤션 송파문정 약도"
            className="w-full select-none object-contain transition duration-200 group-hover:opacity-95"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
          <div className="flex items-center justify-center gap-1.5 border-t border-cream-200 bg-cream-50/80 py-2 text-center text-[11px] text-ink-muted">
            <svg
              className="h-3.5 w-3.5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            탭하여 약도 크게 보기
          </div>
        </button>
      </div>

      {/* 약도 확대 모달 */}
      {isMapModalOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 select-none"
              onClick={() => setIsMapModalOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="약도 확대 보기"
            >
              <img
                src={wedding.mapImage || '/photos/official_map.png'}
                alt="더컨벤션 송파문정 확대 약도"
                className="max-h-[85vh] max-w-full rounded-lg bg-white object-contain"
                onClick={(e) => e.stopPropagation()}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <button
                type="button"
                className="absolute right-4 top-4 p-2 text-3xl font-light text-white/80 hover:text-white focus:outline-none"
                onClick={() => setIsMapModalOpen(false)}
                aria-label="닫기"
              >
                ×
              </button>
            </div>,
            document.body,
          )
        : null}

      {/* 안내 카드 */}
      <div className="mt-5 rounded-xl border border-cream-300 bg-white/70 p-6 text-center shadow-xs backdrop-blur-xs">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-rose-dark">
          <svg
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>

        <h3 className="font-serif text-lg font-medium text-ink">
          {wedding.venue}
        </h3>
        {wedding.venueDetail ? (
          <p className="mt-0.5 text-xs font-medium text-rose-dark">
            {wedding.venueDetail}
          </p>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {wedding.venueAddress}
          {wedding.venueAddressDetail ? (
            <span className="block text-xs text-ink-soft">
              ({wedding.venueAddressDetail})
            </span>
          ) : null}
        </p>

        <div className="mt-3.5 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={copyAddress}
            className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-50 px-3.5 py-1 text-xs text-ink-muted transition hover:bg-cream-100 hover:text-ink"
          >
            <svg
              className="h-3.5 w-3.5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            주소 복사
          </button>

          {wedding.tel ? (
            <a
              href={`tel:${wedding.tel}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-50 px-3.5 py-1 text-xs text-ink-muted transition hover:bg-cream-100 hover:text-ink"
            >
              <svg
                className="h-3.5 w-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
              </svg>
              전화 걸기
            </a>
          ) : null}
        </div>
      </div>

      {/* 지도 앱 바로가기 버튼 2종 (네이버지도, 카카오맵) */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <a
          href={wedding.naverMapUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-lg bg-[#03C75A] py-3 text-center text-sm font-medium text-white shadow-xs transition hover:opacity-95"
        >
          네이버지도로 보기
        </a>
        <a
          href={wedding.kakaoMapUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-lg bg-[#FEE500] py-3 text-center text-sm font-medium text-[#191919] shadow-xs transition hover:opacity-95"
        >
          카카오맵으로 보기
        </a>
      </div>

      {/* 대중교통 및 주차 상세 안내 */}
      {wedding.transport ? (
        <div className="mt-8 space-y-4 rounded-xl border border-cream-200 bg-cream-50/80 p-5 text-left text-xs leading-relaxed text-ink-muted">
          {/* 지하철 */}
          {wedding.transport.subway ? (
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-cream-200 px-2 py-0.5 font-medium text-[11px] text-ink">
                지하철
              </span>
              <div className="text-ink-muted">{wedding.transport.subway}</div>
            </div>
          ) : null}

          {/* 버스 */}
          {wedding.transport.bus ? (
            <div className="flex items-start gap-3 border-t border-cream-200/70 pt-3">
              <span className="shrink-0 rounded bg-cream-200 px-2 py-0.5 font-medium text-[11px] text-ink">
                버스
              </span>
              <div className="space-y-1 text-[11.5px] text-ink-muted">
                {wedding.transport.bus.general ? (
                  <p>
                    <strong className="text-ink">일반버스:</strong>{' '}
                    {wedding.transport.bus.general}
                  </p>
                ) : null}
                {wedding.transport.bus.main ? (
                  <p>
                    <strong className="text-ink">간선버스:</strong>{' '}
                    {wedding.transport.bus.main}
                  </p>
                ) : null}
                {wedding.transport.bus.branch ? (
                  <p>
                    <strong className="text-ink">지선버스:</strong>{' '}
                    {wedding.transport.bus.branch}
                  </p>
                ) : null}
                {wedding.transport.bus.direct ? (
                  <p>
                    <strong className="text-ink">직행버스:</strong>{' '}
                    {wedding.transport.bus.direct}
                  </p>
                ) : null}
                {wedding.transport.bus.notice ? (
                  <p className="pt-1 text-[11px] text-rose-dark">
                    · {wedding.transport.bus.notice}
                  </p>
                ) : null}
                {wedding.transport.bus.policy ? (
                  <p className="text-[10.5px] text-ink-soft">
                    · {wedding.transport.bus.policy}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* 자가용 및 주차 */}
          {wedding.transport.car || wedding.transport.parking ? (
            <div className="flex items-start gap-3 border-t border-cream-200/70 pt-3">
              <span className="shrink-0 rounded bg-cream-200 px-2 py-0.5 font-medium text-[11px] text-ink">
                자가용
              </span>
              <div className="space-y-1 text-ink-muted">
                {wedding.transport.car ? (
                  <p>{wedding.transport.car}</p>
                ) : null}
                {wedding.transport.parking ? (
                  <p className="text-[11px] text-ink-soft">
                    · {wedding.transport.parking}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
