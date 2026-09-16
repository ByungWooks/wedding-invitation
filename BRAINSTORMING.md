# 갤러리 모달 완벽한 수직 중앙 정렬 버그 분석 및 해결 (BRAINSTORMING)

## 1. 사용자 스크린샷 정밀 분석
- **사용자 문의**: "이게 너가 말하는 수직 정중앙에 배치된거야?"
- **스크린샷 실측 데이터 (444x803px 기준)**:
  - 사진 시작 위치: Y = 190px
  - 사진 종료 위치: Y = 757px (사진 높이 567px)
  - **상단 빈 공간**: **190px**
  - **하단 빈 공간**: **46px**
  - 사진의 실제 중심: Y = 473.5px
  - 화면의 실제 중심: Y = 401.5px
  - **결과**: 사진이 화면 중심보다 **무려 72px이나 하단으로 치우쳐 쏠려 있음!**

---

## 2. 근본 원인 (Root Cause) 규명

1. **`fixed inset-0`와 `h-[100dvh]`의 충돌 (가장 치명적 원인)**:
   - `fixed inset-0`는 화면의 `top: 0, bottom: 0`에 고정되는 속성입니다.
   - 여기에 `h-[100dvh]`를 중복 선언하면서, 브라우저 환경에서 실제 가시 영역보다 더 큰 전체 높이(약 910~950px)로 모달 높이가 강제 확장되었습니다.
   - 그 결과 모달의 `top: 50%`(중앙) 계산이 475px로 잡혀, 화면의 803px 안에서는 사진과 화살표가 모두 **하단으로 푹 꺼져서 노출**되었던 것입니다.
2. **`GalleryPhotoViewer` 내부의 `h-full w-full px-4 py-8` 중복**:
   - 부모가 이미 `flex items-center justify-center`인데, 자식 div에 `h-full w-full`과 `py-8`을 씌워 플렉스 중앙 정렬 계산을 왜곡함.
3. **플렉스 컨테이너 내부의 `<style>` 태그**:
   - `GalleryModal` 내부에 인라인 `<style>` 태그가 존재하여, 플렉스 컨테이너의 인플로우 자식으로 인식될 소지가 있음.

---

## 3. 완벽한 해결 방안

1. **`MapZoomModal`과 동일한 완벽 검증 레이아웃 적용**:
   - 루트: `fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xs select-none touch-none overflow-hidden`
   - `h-[100dvh]` 완전히 제거 ➔ 순수 `fixed inset-0`가 뷰포트 상하좌우를 정확히 0으로 잡도록 함.
2. **자식 래퍼의 불필요한 `h-full w-full` 제거**:
   - `relative flex items-center justify-center p-4`로 간소화.
   - 이미지를 `max-h-[78vh] max-w-[90vw] object-contain`으로 설정.
   - 상단 여백과 하단 여백이 수학적으로 정확히 1:1로 일치하게 됨.
3. **`<style>` 태그를 `src/index.css`로 이전**:
   - 키프레임 애니메이션(`slideFromLeft`, `slideFromRight`)을 `src/index.css`로 분리하여 모달 내부에는 순수한 UI 엘리먼트만 존재하도록 정리.
