# GitHub 원격 저장소 연동 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
현재까지 완성된 모바일 청첩장 코드(웨딩 사진 13장, 신랑 이병욱 ♥ 신부 송현지 정보, 맞춤 일러스트 약도, 계좌/방명록 기능 등)를 사용자의 GitHub 계정 (`ByungWooks/wedding-invitation`)에 안전하게 커밋하고 푸시합니다.

---

## 2. 세부 진행 단계

### Step 1. 로컬 Git 정리 및 커밋
1. `git status` 확인:
   - `src/components/IllustratedMap.jsx`
   - `src/components/Location.jsx`
   - `src/data/wedding.js`
   - `src/App.jsx`
   - `index.html`
   - `BRAINSTORMING.md`, `IMPLEMENTATION_PLAN.md`
2. Git author 정보 확인 및 필요시 조정:
   - 현재: `ByungWook-Lee96 <byungwook414@gmail.com>`
3. 변경사항 스테이징 및 커밋:
   - `git add .`
   - `git commit -m "feat: 더컨벤션 송파문정점 맞춤 일러스트 약도 및 청첩장 완성"`
4. 기본 브랜치명을 최신 표준인 `main`으로 설정:
   - `git branch -M main`

### Step 2. GitHub 원격 저장소(Remote) 설정
1. 원격 주소 등록:
   - `git remote add origin https://github.com/ByungWooks/wedding-invitation.git`
   - (이미 존재할 경우 set-url로 갱신)

### Step 3. GitHub 레포지토리 생성 및 푸시
1. 사용자가 GitHub 웹(`https://github.com/new`)에서 `wedding-invitation` 레포지토리를 생성했는지 확인.
2. `git push -u origin main` 실행.

---

## 3. 사용자 확인 (User Confirmation)
- GitHub에 `wedding-invitation` 이름으로 비어있는 새 저장소를 만드셨는지(또는 만드실 예정인지) 확인 후 즉시 커밋 및 푸시 작업을 진행합니다.
