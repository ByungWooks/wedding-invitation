# 갤러리 사진 확대 및 계좌번호 변경 배포 브레인스토밍 (BRAINSTORMING)

## 1. 요청 사항 및 현황 분석

1. **요청 사항**:
   - "계좌번호 수정 사항까지 해서 배포해줘"
2. **배포 대상 변경 항목**:
   - **갤러리 사진 확대/축소 기능 (`src/components/Gallery.jsx`)**:
     - 핀치 줌 (1.0x ~ 3.5x), 더블 탭 토글 (1.0x ↔ 2.2x), 패닝(상하좌우 드래그)
     - 기본 1.0x 배율에서는 좌우 스와이프 사진 넘김 유지
     - PC 더블 클릭 및 마우스 드래그 조작 지원
     - 사진 전환 시 배율 및 위치 원점 자동 초기화
   - **혼주 계좌번호 최신화 (`src/data/wedding.js`)**:
     - 신랑 부친: 국민은행 `366502-01-154602` 이길수
     - 신랑 모친: 하나은행 `429-910150-34307` 최한나
     - 신부 부친: 국민은행 `515502-01-030171` 송우석
     - 신부 모친: 우리은행 `421-08-007054` 김옥희
3. **배포 방식 분석**:
   - 본 리포지토리는 GitHub 원격 저장소(`origin/main`)에 연결되어 있으며, Vercel 자동 배포 파이프라인(`https://wedding-invitation-20270116.vercel.app`)이 구축되어 있음.
   - 로컬 검증(`npm run lint`, `npm run build`) 후 `main` 브랜치에 커밋 및 푸시(`git push origin main`)하면 Vercel 프로덕션 배포가 자동 수행됨.

---

## 2. 배포 절차 설계

1. **사전 검증**:
   - `npm run lint`: ESLint 문법 및 코드 스타일 검사 100% 통과 확인
   - `npm run build`: Vite 프로덕션 번들 빌드 성공 확인
2. **변경 파일 스테이징 및 커밋**:
   - 커밋 메시지: `feat: 사진 확대(줌) 기능 추가 및 혼주 계좌번호 변경`
   - 대상 파일:
     - `src/components/Gallery.jsx`
     - `src/data/wedding.js`
     - `BRAINSTORMING.md`
     - `IMPLEMENTATION_PLAN.md`
3. **원격 푸시 및 배포 완료 확인**:
   - `git push origin main` 실행
   - 배포 결과 확인 및 완료 보고
