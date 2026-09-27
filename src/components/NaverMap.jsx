import { useEffect, useRef, useState } from 'react'
import { wedding } from '../data/wedding'

const VENUE_COORDS = {
  lat: 37.484005272438594,
  lng: 127.12278911775194,
}

export function NaverMap() {
  const mapElementRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID || '15daibshf8'

  useEffect(() => {
    let isMounted = true

    const initMap = () => {
      if (!mapElementRef.current || !window.naver?.maps) return

      try {
        const venueLatLng = new window.naver.maps.LatLng(VENUE_COORDS.lat, VENUE_COORDS.lng)

        const map = new window.naver.maps.Map(mapElementRef.current, {
          center: venueLatLng,
          zoom: 16,
          minZoom: 13,
          maxZoom: 19,
          zoomControl: false,
          scaleControl: false,
          mapDataControl: false,
          logoControlOptions: {
            position: window.naver.maps.Position.BOTTOM_LEFT,
          },
        })

        mapInstanceRef.current = map

        // 커스텀 마커
        const marker = new window.naver.maps.Marker({
          position: venueLatLng,
          map,
          title: wedding.venue,
          animation: window.naver.maps.Animation.DROP,
        })

        // 마커 상단 라벨 인포윈도우
        const contentString = `
          <div style="padding: 5px 11px; background: rgba(34, 34, 34, 0.9); backdrop-filter: blur(4px); color: #ffffff; border-radius: 16px; font-size: 11.5px; font-weight: 600; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.18); display: flex; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,0.15);">
            <span style="color: #d86a76; font-size: 11px;">♥</span>
            <span>${wedding.venue}</span>
          </div>
        `

        const infoWindow = new window.naver.maps.InfoWindow({
          content: contentString,
          backgroundColor: 'transparent',
          borderWidth: 0,
          disableAnchor: false,
          pixelOffset: new window.naver.maps.Point(0, -2),
        })

        infoWindow.open(map, marker)

        // 마커 클릭 시 네이버 지도 길찾기/상세 새 창 열기
        window.naver.maps.Event.addListener(marker, 'click', () => {
          if (wedding.naverMapUrl) {
            window.open(wedding.naverMapUrl, '_blank')
          }
        })

        if (isMounted) {
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || '지도를 초기화하는 중 오류가 발생했습니다.')
          setIsLoading(false)
        }
      }
    }

    if (window.naver?.maps) {
      initMap()
      return () => {
        isMounted = false
      }
    }

    // 스크립트 로드
    const scriptId = 'naver-map-script'
    let script = document.getElementById(scriptId)

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'text/javascript'
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&ncpKeyId=${clientId}`
      script.async = true
      document.head.appendChild(script)
    }

    const handleLoad = () => {
      if (isMounted) {
        initMap()
      }
    }

    const handleError = () => {
      if (isMounted) {
        setError('네이버 지도를 불러오지 못했습니다. 네트워크 상태를 확인해 주세요.')
        setIsLoading(false)
      }
    }

    script.addEventListener('load', handleLoad)
    script.addEventListener('error', handleError)

    return () => {
      isMounted = false
      script.removeEventListener('load', handleLoad)
      script.removeEventListener('error', handleError)
    }
  }, [clientId])

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1, true)
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1, true)
    }
  }

  const handleResetCenter = () => {
    if (mapInstanceRef.current && window.naver?.maps) {
      const center = new window.naver.maps.LatLng(VENUE_COORDS.lat, VENUE_COORDS.lng)
      mapInstanceRef.current.panTo(center)
    }
  }

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-xs">
      <div ref={mapElementRef} className="h-full w-full" />

      {/* 로딩 인디케이터 */}
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/90 text-ink-muted">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-rose border-t-transparent" />
          <p className="mt-2 text-xs">네이버 지도를 불러오는 중입니다...</p>
        </div>
      ) : null}

      {/* 에러 상태 */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4 text-center text-xs text-ink-muted">
          <p className="font-medium text-ink">지도를 불러오지 못했습니다</p>
          <p className="mt-1 text-[11px] text-ink-soft">{error}</p>
          <a
            href={wedding.naverMapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#03C75A] px-3.5 py-1.5 text-xs font-medium text-white"
          >
            네이버 지도 앱에서 바로보기
          </a>
        </div>
      ) : null}

      {/* 우측 하단 컨트롤러 (+ / - / 중앙 복귀) */}
      {!isLoading && !error ? (
        <div className="absolute bottom-3 right-3 z-10 flex flex-col items-center gap-1.5 rounded-lg bg-white/95 p-1 shadow-md backdrop-blur-xs border border-black/5">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-7 w-7 items-center justify-center rounded text-ink transition hover:bg-gray-100 active:scale-95"
            aria-label="지도 확대"
          >
            <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <div className="h-px w-4 bg-gray-200" />
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-7 w-7 items-center justify-center rounded text-ink transition hover:bg-gray-100 active:scale-95"
            aria-label="지도 축소"
          >
            <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M5 12h14" />
            </svg>
          </button>
          <div className="h-px w-4 bg-gray-200" />
          <button
            type="button"
            onClick={handleResetCenter}
            className="flex h-7 w-7 items-center justify-center rounded text-ink transition hover:bg-gray-100 active:scale-95"
            aria-label="예식장 위치로 중앙 복귀"
            title="예식장 위치로 복귀"
          >
            <svg className="h-3.5 w-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  )
}
