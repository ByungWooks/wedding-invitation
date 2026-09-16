# 약도 확대 뷰어 개선 및 고화질화 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- 모바일에서 "탭하여 약도 크게 보기"를 눌렀을 때, 글씨와 길 안내가 확실히 커 보이도록 스마트 줌 뷰어를 구축합니다.
- 3배 이상 확대해도 글씨(문정역 3번 출구, 신한은행, 송파대로 등)가 선명하게 유지되도록 2031x1374px 초고해상도 에셋을 적용합니다.

---

## 2. 세부 구현 단계

### Step 1. 고해상도 약도 리샘플링 생성
- `public/photos/official_map.png`(677x458) ➔ `public/photos/official_map_hd.png`(2031x1374)
- Lanczos 리샘플링 + 언샤프 엣지 샤프닝 필터 적용하여 글자 뭉개짐 방지.

### Step 2. Location 컴포넌트 약도 모달 UX 고도화 (`src/components/Location.jsx`)
- **초고해상도 이미지 연결**: 모달 내 `img` 소스를 `official_map_hd.png`로 교체.
- **제스처 지원**:
  - `double-tap`: 1.0x ↔ 2.2x 토글 확대
  - `pinch-to-zoom`: 1.0x ~ 3.5x 부드러운 터치 줌
  - `drag & pan`: 확대된 상태에서 손가락으로 약도 상하좌우 탐색
- **하단 컨트롤 바 제공**:
  - `[+]`, `[-]`, `[초기화]` 버튼으로 손쉬운 조작 지원
  - "두 손가락으로 확대하거나 더블 탭하세요" 안내 텍스트 노출

### Step 3. 빌드 및 배포 검증
- `npm run build` 및 `npm run lint` 통과 확인.
- Git 푸시 및 Vercel 자동 배포.

---

## 3. 사용자 확인 (User Confirmation)
- 위 스마트 줌(더블탭/핀치줌/컨트롤버튼) 및 3배 고화질 에셋 적용 계획에 대해 확인을 요청합니다.
