# 갤러리 모달 완벽한 수직 중앙 정렬 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- 스크린샷에서 확인된 하단 쏠림 현상(상단 여백 190px vs 하단 여백 46px)을 완벽하게 바로잡습니다.
- 상단 여백과 하단 여백이 1:1로 균등하게 배치되어 사진이 정확한 수직 정중앙에 오도록 수정합니다.
- 외부 배포 없이 로컬 개발 서버(`http://localhost:5173`)에서만 우선 검증합니다.

---

## 2. 세부 구현 단계

### Step 1. 키프레임 애니메이션 CSS 이전 (`src/index.css`)
- `slideFromLeft`, `slideFromRight` 애니메이션을 `src/index.css`에 등록하여 모달 내부 flex DOM 오염 제거.

### Step 2. `GalleryModal` 및 `GalleryPhotoViewer` 레이아웃 정상화 (`src/components/Gallery.jsx`)
- `GalleryModal` 루트에서 `h-[100dvh]` 제거 ➔ 순수 `fixed inset-0 z-[9999] flex items-center justify-center` 적용.
- `GalleryPhotoViewer`에서 `h-full w-full py-8` 제거 ➔ `relative flex items-center justify-center p-4`로 변경.
- 사진 크기: `max-h-[78vh] max-w-[90vw] object-contain`.
- 화살표 위치: `top-1/2 -translate-y-1/2` (사진의 정중앙과 완벽 일치).

### Step 3. 빌드, 린트 및 로컬 테스트
- `npm run lint` 및 `npm run build` 통과 확인.
- 로컬 `http://localhost:5173`에서 사진의 상하 여백이 1:1로 동일한지 시각적 검증.

---

## 3. 사용자 확인 (User Confirmation)
- 위 원인 분석(100dvh 충돌 해결 및 1:1 상하 여백 정렬)과 수정 계획에 대해 확인을 구합니다.
