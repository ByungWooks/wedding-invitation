# 갤러리 사진 확대 및 계좌번호 변경 배포 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- [Gallery.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Gallery.jsx)의 사진 줌/팬 기능과 [wedding.js](file:///Users/bottlewook/Documents/wedding-invitation/src/data/wedding.js)의 최신 혼주 계좌번호 변경 내역을 메인 브랜치에 커밋하고, Vercel 프로덕션에 정상 배포합니다.

---

## 2. 세부 실행 단계

### Step 1. 빌드 및 린트 최종 검증
- `npm run lint` 실행
- `npm run build` 실행

### Step 2. Git 스테이징 및 커밋
- 변경 사항 확인:
  - `src/components/Gallery.jsx`: 핀치 줌, 더블탭 줌, 패닝 기능
  - `src/data/wedding.js`: 혼주 계좌번호 최신화
  - `BRAINSTORMING.md` / `IMPLEMENTATION_PLAN.md`: 작업 문서 갱신
- 커밋 생성:
  ```bash
  git add src/components/Gallery.jsx src/data/wedding.js BRAINSTORMING.md IMPLEMENTATION_PLAN.md
  git commit -m "feat: 사진 확대(줌) 기능 추가 및 혼주 계좌번호 변경"
  ```

### Step 3. 원격 푸시 및 배포
- `git push origin main`
- Vercel 자동 빌드 및 배포 트리거 완료 확인

---

## 3. 사후 검증
- 원격 저장소 푸시 성공 여부 확인
- 배포 URL(`https://wedding-invitation-20270116.vercel.app`) 안내
