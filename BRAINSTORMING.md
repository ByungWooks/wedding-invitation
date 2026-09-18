# 갤러리 6개 노출(더보기) 및 달력 예식일 색상 변경 브레인스토밍 (BRAINSTORMING)

## 1. 요청 사항 분석
1. **갤러리 6개 기본 노출 및 더보기 기능**:
   - 갤러리 진입 시 첫 6장만 2열 그리드로 노출하여 페이지 스크롤 부담 완화.
   - 하단에 "더보기 ∨" 버튼을 누르면 나머지 6장(총 12장)이 펼쳐짐.
   - 펼쳐진 후에는 다시 깔끔하게 축소할 수 있도록 "접기 ∧" 버튼 제공.
   - 확대 모달(`GalleryModal`)에서는 메인 목록 상태와 관계없이 12장 전체를 자유롭게 탐색할 수 있도록 유지.
2. **달력 예식일 표시 색상 개선 (결혼식에 어울리는 색상)**:
   - **문제점 분석**:
     - 기존 테마의 `rose` 컬러는 실질적으로 `#b49b82` (브라운/카키 베이지) 계열이어서, 16일 원형 표시와 하트가 다소 어둡고 칙칙해 보여 "결혼식다운 화사함과 설렘"이 부족했음.
   - **개선 방향**:
     - 결혼식 청첩장에 가장 잘 어울리는 **로맨틱 더스티 로즈(Romantic Dusty Rose, `#d86a76` / `#c85a67`)** 또는 **화사하고 품격 있는 소프트 코랄 핑크**를 포인트 컬러로 적용.
     - 16일 원형 뱃지, 우측 상단 미니 하트, D-Day 카운터 강조 색상에 일관되게 적용하여 한눈에 사랑스럽고 특별한 날임이 돋보이도록 변경.

---

## 2. 세부 설계 방안

### A. 갤러리 더보기 토글 (`src/components/Gallery.jsx`)
- **상태 관리**: `const [isExpanded, setIsExpanded] = useState(false)`
- **표시 목록**: `displayedGallery = isExpanded ? wedding.gallery : wedding.gallery.slice(0, 6)`
- **인덱스 매핑**: 모달을 열 때 `wedding.gallery.indexOf(src)`를 넘겨 12장 기준 정위치 보장.
- **버튼 UI**:
  - `inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-medium text-ink-muted shadow-2xs hover:bg-gray-50 hover:text-ink active:scale-98 transition`
  - 상태에 따른 아이콘 및 라벨:
    - 닫힘: `더보기` + 아래쪽 쉐브론 (`∨`)
    - 열림: `접기` + 위쪽 쉐브론 (`∧`)

### B. 달력 예식일 웨딩 컬러 적용 (`src/components/Calendar.jsx`)
- **컬러 톤**:
  - 기존: `#b49b82` (어두운 브라운/카키)
  - 변경: `#d86a76` (은은하고 생기 있는 로맨틱 로즈 핑크)
- **적용 부위**:
  1. **16일 원형 마커**: `bg-[#d86a76] text-white font-bold shadow-xs`
  2. **16일 우측 상단 미니 하트**: `text-[#d86a76]`
  3. **예식 일시 요약 서브텍스트 ("토요일 오전 11시")**: `text-[#c85a67] font-medium`
  4. **D-Day 남은 일수 텍스트 ("300일 남았습니다")**: `text-[#c85a67] font-semibold`
  5. **신랑 ♥ 신부 사이 하트**: `text-[#d86a76]`

---

## 3. 검증 전략
- `npm run lint` 및 `npm run build` 검증
- 로컬 개발 서버(`http://localhost:5173`)에서 확인:
  1. 갤러리 6개 로드 확인 및 "더보기" / "접기" 토글 동작 확인
  2. 모달 내 12장 전체 스와이프 탐색 무결성 확인
  3. 달력 16일 표시가 칙칙한 브라운 대신 화사하고 우아한 웨딩 로즈 컬러로 돋보이는지 확인
- 배포 없이 로컬 전용 확인 유지
