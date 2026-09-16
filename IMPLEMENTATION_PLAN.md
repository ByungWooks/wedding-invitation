# 화이트 톤 리뉴얼 및 피드백 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
사용자의 요청에 따라 '네비게이션' 표기를 '내비게이션'으로 수정하고, 약도 외곽의 검은 테두리를 정밀 제거하며, 청첩장 전체 톤앤매너를 기존의 노란빛 크림색에서 화사하고 세련된 퓨어 화이트 톤(Pure White & Modern Charcoal)으로 전면 리뉴얼하여 배포합니다.

---

## 2. 세부 구현 단계

### Step 1. 텍스트 오타 수정
- `src/data/wedding.js`: `네비게이션` ➔ `내비게이션에 송파구 송파대로 155 검색` 수정.
- `src/components/Location.jsx`: 자가용 안내 항목 내 표기 일치 확인.

### Step 2. 약도 이미지 검은 테두리 제거 (Inset 크롭)
- 원본 이미지에서 테두리 안쪽으로 약 12~14px씩 상하좌우를 크롭하여 검은 선을 완전히 제거.
- `public/photos/official_map.png` 교체.
- 모바일 카드 안에서 경계선 없이 하얀 도화지 위에 자연스럽게 지도가 펼쳐지도록 스타일링.

### Step 3. 전체 컬러 팔레트 화이트 톤 리뉴얼
1. `tailwind.config.js` 및 `src/index.css`:
   - `cream` 컬러를 밝고 깨끗한 화이트/오프화이트 스펙트럼(`50: #ffffff`, `100: #fafbfc`, `200: #f1f5f9`, `300: #e2e8f0`)으로 리셋하거나 소프트 화이트 계열로 매핑.
   - `ink` 텍스트 컬러를 브라운 계열(`4a4036`)에서 세련된 모던 차콜 블랙(`DEFAULT: #1e293b`, `muted: #64748b`, `soft: #94a3b8`)으로 변경.
2. `src/App.jsx`:
   - 전체 바탕: `bg-[#f4f6f8]` (화사한 오프화이트)
   - 모바일 청첩장 본체: `bg-white shadow-[0_4px_30px_rgba(0,0,0,0.05)]`
   - 구분선: 은은한 소프트 그레이 (`bg-gray-200`)
3. `src/components/Cover.jsx`:
   - 배경 오버레이를 `from-white/70 via-white/50 to-white`로 변경하여 맑고 환한 첫인상 부여.
   - D-Day 카운트다운 타임박스를 퓨어 화이트 + 소프트 보더로 구성.
4. `src/components/Location.jsx` & `src/components/Account.jsx`:
   - 카드 배경: `bg-slate-50/70 border-slate-100` 등 화사하고 깔끔한 화이트 카드 톤으로 통일.

### Step 4. 빌드, 린트 및 배포
- `npm run build` 및 `npm run lint` 통과 확인.
- Git 커밋 및 `main` 브랜치 푸시 ➔ Vercel 자동 배포.

---

## 3. 사용자 확인 (User Confirmation)
- 위 3가지 피드백(내비게이션 수정, 약도 검은선 제거, 화사한 화이트 톤 리뉴얼) 계획에 대해 확인을 구합니다.
