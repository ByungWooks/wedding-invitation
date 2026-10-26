# 계좌번호 상시 노출(아코디언 닫힘 제거) 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- [Account.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Account.jsx)의 아코디언 접기/펼치기 기능을 제거하고, **신랑측 및 신부측 계좌번호가 항상 열려 있는(상시 노출) 깔끔한 카드 형태**로 변경합니다.
- 계좌 복사 및 토스트 알림 기능은 그대로 보존합니다.
- 외부에 배포하지 않고 **로컬(`http://localhost:5173`) 환경에서 먼저 검증**한 후, 사용자의 최종 확인을 받아 배포를 진행합니다.

---

## 2. 세부 구현 단계

### Step 1. [Account.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Account.jsx) 컴포넌트 리팩터링
1. **`Accordion` 컴포넌트 제거 및 `AccountGroup` 컴포넌트 신설**:
   - `useState`를 통한 `open` 상태 및 토글 클릭 핸들러 제거.
   - `+` / `−` 버튼 제거.
   - 카드 헤더: "신랑측", "신부측" 텍스트를 담은 정갈한 서브헤더 (`px-4 py-3 text-xs font-semibold tracking-wider text-ink-muted border-b border-gray-100 bg-gray-50/60`).
   - 카드 본문: 신랑측/신부측 각각의 `AccountRow` 목록을 항상 렌더링.
2. **`AccountRow` 복사 로직 유지**:
   - 클립보드 복사 API 및 토스트 알림(`onCopied`) 기능 유지.

### Step 2. 무결성 검증
1. `npm run lint`: ESLint 검사 통과 확인.
2. `npm run build`: Vite 프로덕션 빌드 무결성 확인.

### Step 3. 로컬 확인 및 사용자 컨펌 요청
1. 로컬 개발 서버(`http://localhost:5173`)에서 상시 노출 레이아웃 확인.
2. 사용자에게 로컬 화면 확인을 요청하고, 승인 시까지 배포(`git push`) 보류.

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획대로 계좌번호 영역을 항상 펼쳐진 고정 카드 형태로 변경하고 로컬에서 먼저 확인하실 수 있도록 진행할지 확인을 요청합니다.
