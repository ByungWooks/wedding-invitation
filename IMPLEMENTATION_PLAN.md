# Supabase 실시간 방명록 DB 연동 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
하객들이 남기는 축하 메시지가 데이터베이스에 안전하게 영구 저장되고, 새로고침 없이도 다른 하객들에게 실시간으로 업데이트되는 Supabase 실시간 방명록 기능을 구현합니다.

---

## 2. 세부 구현 단계

### Step 1. 코드베이스에 Supabase 라이브러리 및 연동 코드 구성
1. `@supabase/supabase-js` 패키지 설치 (`npm install @supabase/supabase-js`).
2. `src/lib/supabase.js` 생성:
   - Supabase 클라이언트 초기화.
   - 환경변수가 없을 경우 로컬 모드로 안전하게 폴백(Graceful degradation).
3. `src/components/Guestbook.jsx` 전면 개편:
   - Supabase DB에서 최신 방명록 목록 불러오기 (로딩 상태 처리).
   - 방명록 작성 시 DB `insert` 수행 및 중복 클릭 방지/유효성 검사.
   - Supabase Realtime 구독을 통한 실시간 새 글 수신.
4. `.env.example` 생성:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. 빌드(`npm run build`) 및 린트(`npm run lint`) 검증.
6. GitHub `main` 브랜치로 자동 푸시.

### Step 2. 사용자 Supabase 프로젝트 생성 및 키 설정 안내
1. Supabase([supabase.com](https://supabase.com)) 회원가입 및 새 프로젝트 생성 가이드 (무료).
2. SQL Editor에 1초 만에 실행할 수 있는 테이블 및 RLS 보안 스크립트 제공.
3. Project Settings -> API 에서 `Project URL`과 `anon public key` 확인 가이드.
4. Vercel 대시보드([vercel.com](https://vercel.com))에 환경 변수 2개 등록하는 방법 가이드.

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획대로 `@supabase/supabase-js` 설치 및 방명록 연동 코드를 먼저 구현하여 GitHub에 푸시해 드릴까요?
