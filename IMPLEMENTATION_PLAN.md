# 네이버 지도(실시간 대화형 지도) 연동 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- 발급받은 Client ID(`15daibshf8`)를 연동하여 [Location.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Location.jsx)에 **네이버 실시간 대화형 지도**를 적용합니다.
- `[네이버 지도]`와 `[공식 약도]`를 자유롭게 전환할 수 있는 세련된 2-탭 UI를 제공합니다.
- 외부에 배포하지 않고 로컬(`http://localhost:5173`)에서만 우선 검증합니다.

---

## 2. 세부 구현 단계

### Step 1. 환경 변수 및 보안 설정
- `.gitignore`에 `.env` 추가
- `.env` 파일 생성:
  ```env
  VITE_NAVER_MAP_CLIENT_ID=15daibshf8
  ```

### Step 2. `NaverMap.jsx` 신규 컴포넌트 생성 (`src/components/NaverMap.jsx`)
- 네이버 지도 OpenAPI v3 스크립트 동적 로드 (`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=15daibshf8`)
- 지도 캔버스 초기화:
  - 중심 좌표: `lat: 37.483935`, `lng: 127.123512` (더컨벤션 송파문정점)
  - 줌 레벨: `16`
  - 지도 높이: `h-72` (약 288px)로 모바일 및 웹에 최적화
- 마커 및 라벨 오버레이:
  - 예식장 위치에 커스텀 핀 마커 및 "더컨벤션 송파문정점" 안내 뱃지 부착
- 편의 컨트롤:
  - 우측 하단 줌 컨트롤 (+ / -) 및 중앙 복귀 아이콘 버튼 제공

### Step 3. `Location.jsx` 탭 전환 UI 및 컴포넌트 통합
- 탭 상태: `const [mapTab, setMapTab] = useState('naver')` ('naver' | 'official')
- 탭 헤더:
  - `[네이버 지도]` 탭 활성화 시 `NaverMap` 노출
  - `[공식 약도]` 탭 활성화 시 기존 약도 이미지 노출 (클릭 시 1.45배 확대 모달 정상 작동)
- 주소 복사, 길찾기 버튼(네이버 지도, 카카오맵), 교통 안내는 기존 스타일 그대로 완벽 유지

### Step 4. 빌드, 린트 및 로컬 동작 검증
- `npm run lint` 및 `npm run build` 오류 검증
- 로컬 `http://localhost:5173`에서:
  1. 네이버 지도 타일 및 마커가 정상 렌더링되는지 확인
  2. 지도 드래그 및 줌 동작 확인
  3. `[공식 약도]` 탭 전환 및 확대 모달 연동 정상 작동 확인
  4. 하단 네이버/카카오 길찾기 링크 정상 작동 확인

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획(Secret 불필요 안내 + Client ID 연동 + 2-탭 인터페이스 로컬 구현)에 대해 확인을 요청합니다.
