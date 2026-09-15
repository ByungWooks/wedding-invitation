# GitHub 원격 저장소 연동 브레인스토밍 (BRAINSTORMING)

## 1. 현재 Git 및 GitHub 상태 분석
- **로컬 Git 상태**:
  - `master` 브랜치에 이전 커밋 1건 존재 (`feat: 모바일 청첩장 첫 배포`).
  - 최근 작업 내역(`IllustratedMap.jsx`, `Location.jsx` 수정 등)이 아직 커밋되지 않은 상태.
- **GitHub 계정 상태**:
  - 계정 URL: `https://github.com/ByungWooks`
  - 현재 Public Repository 수: 0개 (아직 `wedding-invitation` 저장소가 GitHub 웹에서 생성되지 않은 상태).
- **인증(Auth) 상태**:
  - `gh` (GitHub CLI) 미설치.
  - SSH(`git@github.com`)는 키 미등록으로 `Permission denied (publickey)`.
  - HTTPS(`https://github.com/ByungWooks/wedding-invitation.git`) 방식이 가장 직관적이고 안정적.

---

## 2. 연동 방안 및 옵션

### 방안 1. GitHub 웹에서 새 레포지토리 생성 후 HTTPS 푸시 (가장 추천)
1. 사용자가 GitHub (`https://github.com/new`)에서 `wedding-invitation` 레포지토리(Public 또는 Private)를 1클릭으로 생성.
2. 로컬에서 최근 변경사항을 깔끔하게 커밋 (`git add .` -> `git commit -m "feat: 청첩장 완성 및 맞춤 일러스트 약도 적용"`).
3. 원격 저장소 추가: `git remote add origin https://github.com/ByungWooks/wedding-invitation.git`.
4. 브랜치명 표준화: `git branch -M main`.
5. 푸시: `git push -u origin main`.
   - macOS Keychain이 인증 창을 띄우거나 GitHub 토큰/로그인으로 연결.

### 방안 2. SSH 키 등록 후 푸시
- `~/.ssh/id_rsa.pub` 키를 복사하여 `https://github.com/settings/keys`에 등록한 뒤 `git@github.com:ByungWooks/wedding-invitation.git`으로 푸시.

---

## 3. 추천 워크플로우
- 로컬 변경사항을 먼저 완벽하게 커밋해두고,
- 원격 저장소 주소(`https://github.com/ByungWooks/wedding-invitation.git`)를 `origin`으로 등록.
- 사용자가 GitHub에서 레포지토리를 만들었는지 확인 후 푸시 명령어 실행 또는 원클릭 가이드 제공.
