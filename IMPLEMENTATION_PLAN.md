# 갤러리 사진 줌 비활성화 및 지도 확대 유지 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- **약도(지도) 확대 기능은 100% 그대로 유지**합니다. ([MapZoomModal.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/MapZoomModal.jsx) 일체 수정 없음)
- **갤러리 웨딩 사진 모달**([Gallery.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Gallery.jsx))에서만 핀치 줌 및 더블 탭 확대 기능을 비활성화하여, 사진 넘김(스와이프/화살표) 전용으로 최적화합니다.
- 변경 작업은 로컬(`http://localhost:5173`)에서 먼저 검증합니다.

---

## 2. 세부 구현 단계

### Step 1. `Gallery.jsx`의 사진 줌 기능 제거 및 스와이프 전용 최적화
1. `GalleryPhotoViewer` 컴포넌트 정리:
   - `scale`, `position` 상태 및 `handleDoubleTap` 제거
   - 2-터치 핀치 줌 및 확대 팬(pan) 계산 코드 제거
   - `cursor: zoom-in` 제거
2. 순수 좌우 스와이프 로직 유지:
   - 1-터치 `dragOffset` 계산을 통해 손가락을 뗄 때 좌/우 45px 이상이면 이전/다음 사진으로 부드럽게 전환
3. 완벽한 중앙 정렬 및 비율 유지:
   - `max-h-[78vh] max-w-[90vw] object-contain` 유지

### Step 2. 지도(약도) 모달 보존 확인
- `src/components/MapZoomModal.jsx`는 변경하지 않고 그대로 유지

### Step 3. 빌드 및 린트 검증
- `npm run lint` 및 `npm run build` 실행

### Step 4. 로컬 동작 검증
- 갤러리 사진 확대 비활성화 동작 확인 (핀치/더블탭 시 확대 안 됨)
- 갤러리 좌우 스와이프 정상 동작 확인
- 지도 약도 확대 모달 정상 동작(1.45배 즉시 확대, 핀치 줌, 드래그 이동) 보존 확인

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획(지도 확대는 그대로 유지하고 갤러리 사진만 확대 비활성화)에 대해 확인해 주시면 즉시 코드 수정을 진행하겠습니다.
