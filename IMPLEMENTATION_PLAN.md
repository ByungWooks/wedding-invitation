# 신규 고화질 웨딩 사진 변경 및 최적화 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- `/Users/bottlewook/Downloads/모청/` 디렉터리의 신규 고화질 웨딩 사진 16장을 **눈으로 보는 최고 화질(2K 2048px)을 유지하면서도 서버 비용이 100% 무료(0원)가 되도록 웹 최적화**하여 적용합니다.
- 사진의 촬영 테마 및 무드(클래식 → 화사한 실내 → 엔틱/감성 → 모던 시크 → 그리너리 가든)에 맞추어 **비슷한 씬끼리 자연스러운 스토리라인으로 순서를 정렬**합니다.
- 배포 전 로컬(`http://localhost:5173`) 환경에서 사진 화질 및 갤러리/줌 인터랙션을 먼저 검증합니다.

---

## 2. 세부 구현 단계

### Step 1. 고화질 이미지 최적화 및 저장 (`public/photos/`)
- 원본 16장(총 140MB, 6000x4000)을 Python 스크립트(Pillow 라이브러리)를 사용하여 변환:
  - **해상도**: 긴 축 기준 2048px (스마트폰 레티나 디스플레이 및 고해상도 모니터 대응)
  - **인코딩**: JPEG Quality 86%, Progressive 옵션 적용, EXIF 방향 보정(transposing)
  - **파일명 규칙**: `photo_01.jpg` ~ `photo_16.jpg`로 일관성 있게 명명
  - **예상 용량**: 1장당 약 400~600KB, 전체 16장 합계 약 7~8MB (약 95% 절감)

### Step 2. 데이터 연동 ([wedding.js](file:///Users/bottlewook/Documents/wedding-invitation/src/data/wedding.js))
- `coverImage`: 그리너리 가든 대표 컷인 `photo_13.jpg` (IMG_2489) 지정
- `gallery` 배열: `photo_01.jpg`부터 `photo_16.jpg`까지 순서대로 16개 항목 등록:
  ```javascript
  coverImage: '/photos/photo_13.jpg',
  gallery: [
    '/photos/photo_01.jpg',
    '/photos/photo_02.jpg',
    ...
    '/photos/photo_16.jpg',
  ],
  ```

### Step 3. 무결성 검증 및 로컬 확인
- `npm run lint`: 린트 오류 없음 검증
- `npm run build`: 프로덕션 빌드 정상 완료 확인
- 로컬 개발 서버(`http://localhost:5173`)에서:
  1. 메인 커버 배경 이미지 렌더링 확인
  2. 갤러리 6개 기본 노출 및 '더보기' 클릭 시 16개 전체 펼쳐짐 확인
  3. 갤러리 사진 탭하여 모달 열기, 핀치 줌/더블탭 확대, 좌우 스와이프 정상 작동 확인
  4. 사진 순서의 자연스러움 및 선명한 화질 확인

---

## 3. 사용자 확인 (User Confirmation)
- 위 서버 비용 분석(최적화 시 완전 0원 무료), 최적화 방안(2048px 고화질), 그리고 제안드린 16장 사진 순서에 대해 확인해 주시면 즉시 변환 및 코드 적용을 진행하겠습니다.
