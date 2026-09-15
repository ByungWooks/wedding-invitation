export function IllustratedMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-cream-300 bg-[#FAF7F2] p-2 shadow-xs">
      <svg
        viewBox="0 0 380 290"
        className="h-auto w-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shadow" x="-8%" y="-8%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#4a4036" floodOpacity="0.12" />
          </filter>
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d5b89b" />
            <stop offset="100%" stopColor="#a68568" />
          </linearGradient>
        </defs>

        {/* 배경 블록들 (블럭 구역) */}
        {/* 서측 블록 (법조단지 쪽) */}
        <rect x="12" y="12" width="138" height="60" rx="8" fill="#F0ECE4" />
        <rect x="12" y="80" width="138" height="65" rx="8" fill="#F0ECE4" />
        <rect x="12" y="153" width="138" height="125" rx="8" fill="#F0ECE4" />

        {/* 동측 블록 (로데오거리 쪽) */}
        <rect x="226" y="12" width="142" height="110" rx="8" fill="#F0ECE4" />
        <rect x="226" y="130" width="142" height="148" rx="8" fill="#F0ECE4" />

        {/* 랜드마크 텍스트 (주변 건물 및 구역) */}
        <text x="81" y="47" textAnchor="middle" fill="#8C7E72" fontSize="10.5" fontFamily="sans-serif">
          문정법조단지
        </text>
        <text x="81" y="117" textAnchor="middle" fill="#8C7E72" fontSize="10" fontFamily="sans-serif">
          서울동부지방법원
        </text>
        <text x="297" y="70" textAnchor="middle" fill="#8C7E72" fontSize="10.5" fontFamily="sans-serif">
          문정로데오거리
        </text>
        <text x="297" y="210" textAnchor="middle" fill="#8C7E72" fontSize="10" fontFamily="sans-serif">
          문정 1동 주민센터
        </text>

        {/* 도로망 (아이보리 화이트) */}
        {/* 중앙 송파대로 (남북) */}
        <rect x="156" y="0" width="64" height="290" fill="#FFFFFF" />
        {/* 횡단 도로 1 (상단) */}
        <rect x="0" y="74" width="380" height="4" fill="#E4DCD0" />
        {/* 횡단 도로 2 (중앙 문정로) */}
        <rect x="0" y="122" width="380" height="6" fill="#E4DCD0" />

        {/* 도로 경계선 */}
        <line x1="156" y1="0" x2="156" y2="290" stroke="#E4DCD0" strokeWidth="1.5" />
        <line x1="220" y1="0" x2="220" y2="290" stroke="#E4DCD0" strokeWidth="1.5" />

        {/* 중앙 차선 점선 */}
        <line
          x1="188"
          y1="10"
          x2="188"
          y2="280"
          stroke="#E8E1D5"
          strokeWidth="1.5"
          strokeDasharray="5,6"
        />

        {/* 횡단보도 */}
        <g opacity="0.6">
          <line x1="160" y1="72" x2="216" y2="72" stroke="#D1C7BA" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="160" y1="126" x2="216" y2="126" stroke="#D1C7BA" strokeWidth="2" strokeDasharray="3,3" />
        </g>

        {/* 방면 화살표 라벨 */}
        <g fill="#A69888" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
          <text x="188" y="16">▲ 잠실 · 가락시장 방면</text>
          <text x="188" y="282">▼ 장지 · 복정 방면</text>
        </g>

        {/* 8호선 문정역 표시 */}
        <g transform="translate(142, 60)" filter="url(#shadow)">
          <rect x="0" y="0" width="92" height="26" rx="13" fill="#FFFFFF" stroke="#E6186C" strokeWidth="1.5" />
          {/* 8호선 뱃지 */}
          <circle cx="13" cy="13" r="8" fill="#E6186C" />
          <text x="13" y="16" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">
            8
          </text>
          <text x="46" y="17" fill="#333333" fontSize="11" fontWeight="bold" letterSpacing="0.5">
            문정역
          </text>
        </g>

        {/* 문정역 출구들 */}
        {/* 3번 출구 (서측 남쪽) */}
        <g transform="translate(133, 90)">
          <rect x="0" y="0" width="22" height="15" rx="3" fill="#3D352E" />
          <text x="11" y="11" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
            3번
          </text>
        </g>

        {/* 4번 출구 */}
        <g transform="translate(133, 44)">
          <rect x="0" y="0" width="22" height="15" rx="3" fill="#786C60" />
          <text x="11" y="11" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
            4번
          </text>
        </g>

        {/* 2번 출구 */}
        <g transform="translate(222, 90)">
          <rect x="0" y="0" width="22" height="15" rx="3" fill="#786C60" />
          <text x="11" y="11" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
            2번
          </text>
        </g>

        {/* 1번 출구 */}
        <g transform="translate(222, 44)">
          <rect x="0" y="0" width="22" height="15" rx="3" fill="#786C60" />
          <text x="11" y="11" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
            1번
          </text>
        </g>

        {/* 도보 이동 경로 (문정역 3번 출구 -> 더컨벤션) */}
        <path
          d="M 144 107 L 144 185"
          fill="none"
          stroke="#C4A484"
          strokeWidth="3"
          strokeDasharray="4,4"
          strokeLinecap="round"
        />

        {/* 도보 시간 말풍선 */}
        <g transform="translate(74, 134)" filter="url(#shadow)">
          <rect x="0" y="0" width="64" height="20" rx="10" fill="#C4A484" />
          <text x="32" y="13.5" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">
            도보 3분 (200m)
          </text>
        </g>

        {/* 목적지: 더컨벤션 송파문정점 건물 하이라이트 */}
        <g transform="translate(20, 180)" filter="url(#shadow)">
          <rect
            x="0"
            y="0"
            width="128"
            height="76"
            rx="10"
            fill="#FFFFFF"
            stroke="url(#roseGradient)"
            strokeWidth="2"
          />

          {/* 상단 핀 & 웨딩 마크 */}
          <g transform="translate(64, -12)">
            <circle cx="0" cy="0" r="12" fill="#A68568" stroke="#FFFFFF" strokeWidth="2" />
            <path
              d="M -5 -3 Q 0 -8 5 -3 Q 0 4 -5 -3 Z"
              fill="#FFFFFF"
              transform="scale(0.8) translate(-1, 0)"
            />
            <circle cx="0" cy="-3" r="2" fill="#FFFFFF" />
          </g>

          {/* 건물명 */}
          <text
            x="64"
            y="26"
            textAnchor="middle"
            fill="#3D352E"
            fontSize="12.5"
            fontWeight="bold"
            fontFamily="serif"
          >
            더컨벤션 송파문정점
          </text>

          {/* 상세 안내 */}
          <text
            x="64"
            y="43"
            textAnchor="middle"
            fill="#A68568"
            fontSize="9.5"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            12층 그랜드볼룸
          </text>

          <text
            x="64"
            y="59"
            textAnchor="middle"
            fill="#7A6E63"
            fontSize="8.5"
            fontFamily="sans-serif"
          >
            (NH송파농협 신청사)
          </text>
        </g>
      </svg>
      <p className="mt-1 text-center text-[11px] text-ink-soft">
        문정역 3번 출구에서 송파대로 방향으로 도보 약 3분 거리에 위치합니다.
      </p>
    </div>
  )
}
