import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'
import { IllustratedMap } from './IllustratedMap'

export function Location({ onCopied }) {
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

      {/* 시각적 약도 (일러스트 맵) */}
      <IllustratedMap />

      {/* 안내 카드 */}
      <div className="mt-4 rounded-xl border border-cream-300 bg-white/70 p-6 text-center shadow-sm backdrop-blur-xs">
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
          <p className="mt-0.5 text-xs text-rose-dark">{wedding.venueDetail}</p>
        ) : null}

        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
          {wedding.venueAddress}
          {wedding.venueAddressDetail ? (
            <span className="block text-xs text-ink-soft">
              ({wedding.venueAddressDetail})
            </span>
          ) : null}
        </p>

        <button
          type="button"
          onClick={copyAddress}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-50 px-3.5 py-1 text-xs text-ink-muted transition hover:bg-cream-100 hover:text-ink"
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
      </div>

      {/* 지도 앱 바로가기 버튼 */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <a
          href={wedding.naverMapUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-lg bg-[#03C75A] py-2.5 text-center text-xs font-medium text-white shadow-xs transition hover:opacity-95"
        >
          네이버지도
        </a>
        <a
          href={wedding.kakaoMapUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-lg bg-[#FEE500] py-2.5 text-center text-xs font-medium text-[#191919] shadow-xs transition hover:opacity-95"
        >
          카카오맵
        </a>
        <a
          href={
            wedding.tmapUrl ||
            `tmap://search?name=${encodeURIComponent(wedding.venue)}`
          }
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-lg bg-[#1B2857] py-2.5 text-center text-xs font-medium text-white shadow-xs transition hover:opacity-95"
        >
          티맵
        </a>
      </div>

      {/* 대중교통 및 주차 안내 */}
      {wedding.transport ? (
        <div className="mt-8 space-y-4 rounded-xl border border-cream-200 bg-cream-50/70 p-5 text-left text-xs leading-relaxed text-ink-muted">
          {wedding.transport.subway ? (
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-cream-200 px-1.5 py-0.5 font-medium text-[11px] text-ink">
                지하철
              </span>
              <span>{wedding.transport.subway}</span>
            </div>
          ) : null}

          {wedding.transport.bus ? (
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-cream-200 px-1.5 py-0.5 font-medium text-[11px] text-ink">
                버스
              </span>
              <span>{wedding.transport.bus}</span>
            </div>
          ) : null}

          {wedding.transport.parking ? (
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-cream-200 px-1.5 py-0.5 font-medium text-[11px] text-ink">
                주차
              </span>
              <span>{wedding.transport.parking}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
