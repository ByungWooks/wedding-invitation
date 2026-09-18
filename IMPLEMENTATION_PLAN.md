# 갤러리 더보기 기능 및 달력 웨딩 컬러 변경 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- [Gallery.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Gallery.jsx)에서 상위 6장의 사진만 먼저 노출하고, "더보기" 버튼 클릭 시 전체(12장)로 펼쳐지도록 합니다. (펼쳐진 후 "접기" 가능)
- [Calendar.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Calendar.jsx)에서 기존의 칙칙한 브라운 톤(`#b49b82`) 대신 결혼식에 어울리는 **로맨틱 더스티 로즈 핑크(`#d86a76`, `#c85a67`)** 컬러를 예식일(16일) 원형 마커, 하트, D-Day 강조 문구에 적용합니다.
- 변경 작업은 외부 배포 없이 로컬(`http://localhost:5173`)에서만 우선 검증합니다.

---

## 2. 세부 구현 단계

### Step 1. 갤러리 6개 제한 및 "더보기/접기" 토글 버튼 구현 (`src/components/Gallery.jsx`)
1. `isExpanded` 상태 추가:
   - `const [isExpanded, setIsExpanded] = useState(false)`
2. 표시 목록 분기:
   - `const displayedGallery = isExpanded ? wedding.gallery : wedding.gallery.slice(0, 6)`
3. 썸네일 클릭 시 `wedding.gallery.indexOf(src)`를 전달하여 12장 모달과의 완벽한 인덱스 동기화.
4. 그리드 하단에 정갈한 알약형 "더보기/접기" 토글 버튼 추가:
   - `isExpanded` false: `더보기 ∨`
   - `isExpanded` true: `접기 ∧`

### Step 2. 달력 예식일 및 하이라이트 웨딩 컬러 변경 (`src/components/Calendar.jsx`)
1. 16일 원형 뱃지 배경색: `bg-[#d86a76] text-white shadow-xs`
2. 16일 위 미니 하트: `text-[#d86a76]`
3. 서브헤더 "토요일 오전 11시": `text-[#c85a67]`
4. D-Day 카운트 강조 ("D-Day일"): `text-[#c85a67]`
5. 커플 하트("신랑 ♥ 신부"): `text-[#d86a76]`

### Step 3. 빌드 및 린트 검증
- `npm run lint` 및 `npm run build` 실행하여 무결성 검증

### Step 4. 로컬 확인 및 안내
- `http://localhost:5173`에서 시각적 확인 및 인터랙션 테스트 완료 후 사용자 보고

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획(갤러리 6개 + 더보기 버튼, 달력 16일 결혼식 로맨틱 로즈 핑크 컬러 적용)에 대해 확인해 주시면 즉시 코드 수정을 진행하겠습니다.
