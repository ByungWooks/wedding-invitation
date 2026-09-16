# 피드백 반영 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
사용자 피드백 4가지를 빠짐없이 반영하여, 사진 복사 방지 적용, 방명록 제거(DB 무의존 정적 사이트화), 공식 PDF 약도 및 대중교통 정보 100% 일치 반영, 티맵 삭제(네이버/카카오 2버튼 체제)를 완성하고 Vercel에 즉시 배포합니다.

---

## 2. 세부 구현 단계

### Step 1. 사진 우클릭 & 모바일 롱탭 저장 방지
1. `src/index.css` 전역 스타일 추가:
   - `img { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }`
2. `src/components/Gallery.jsx`:
   - 썸네일 이미지 및 전체 화면 모달 이미지에 `onContextMenu={(e) => e.preventDefault()}` 및 `onDragStart={(e) => e.preventDefault()}` 추가.
   - 모바일에서 꾹 눌렀을 때 이미지 저장 메뉴가 뜨지 않도록 처리.
3. `src/components/Cover.jsx`:
   - 커버 배경 이미지 컨테이너에도 방어 속성 확인.

### Step 2. 방명록 섹션 제거 (DB 의존성 제거)
1. `src/App.jsx`:
   - `<Guestbook />` 컴포넌트 호출 및 구분선 제거.
   - `import { Guestbook } from './components/Guestbook'` 제거.
2. (DB 관련 환경 변수 불필요, 순수 정적 사이트로 전환 완료)

### Step 3. 공식 PDF 약도 및 상세 대중교통 정보 반영
1. PDF(`/Users/bottlewook/Downloads/더컨벤션_송파_청첩장_약도.pdf`)에서 고해상도 공식 약도 이미지 추출 -> `public/photos/official_map.png` 저장.
2. `src/data/wedding.js` 교통 정보 갱신:
   - 지하철: `8호선 문정역 3번 출구 도보 5분`
   - 버스: 일반/간선/지선/직행 버스 상세 노선 번호 및 하차 정류소(`문정법조타운·건영아파트`) 완벽 기재
   - 자가용: `네비게이션에 송파구 송파대로 155 검색`
   - 예식장 전화번호: `02-6418-5000`
3. `src/components/Location.jsx`:
   - 공식 약도 이미지를 세련된 라운드 카드로 렌더링 (클릭 시 확대 모달 기능 지원).
   - 기존의 커스텀 약도 대신 예식장 공식 약도 그래픽과 상세 버스/지하철/자가용 안내 배치.

### Step 4. 티맵 버튼 삭제 및 길찾기 2열 재정렬
1. `Location.jsx`에서 티맵 버튼 제거.
2. `[네이버지도]`와 `[카카오맵]`을 `grid grid-cols-2 gap-3`으로 넓고 시원하게 재배치.

### Step 5. 빌드, 린트 및 GitHub 배포
1. `npm run build` 및 `npm run lint` 검증.
2. Git 커밋 및 `main` 브랜치 푸시 -> Vercel 자동 재배포.

---

## 3. 사용자 확인 (User Confirmation)
- 위 4가지 피드백 구현 계획에 대해 확인을 구합니다.
