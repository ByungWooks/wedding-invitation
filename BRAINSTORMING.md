# Supabase 실시간 방명록 DB 연동 브레인스토밍 (BRAINSTORMING)

## 1. 현재 상태
- Vercel 배포 완료: `https://wedding-invitation-peach-eight.vercel.app/` 정상 운영 중.
- 현재 방명록: 로컬 React state로만 작동하여 새로고침 시 데이터 유실.
- 목표: Supabase 클라우드 PostgreSQL DB와 연동하여 모든 하객의 축하 메시지를 영구 저장하고 실시간으로 반영.

---

## 2. 세부 설계 및 고려사항

### A. DB 테이블 스키마 (`guestbook`)
```sql
create table guestbook (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  created_at timestamptz default now() not null
);

-- RLS (보안 정책): 하객 누구나 읽고 쓸 수 있도록 허용, 변조/삭제는 방지
alter table guestbook enable row level security;
create policy "Anyone can read guestbook" on guestbook for select using (true);
create policy "Anyone can insert guestbook" on guestbook for insert with check (true);

-- 실시간 (Realtime) 복제 활성화
alter publication supabase_realtime add table guestbook;
```

### B. 클라이언트 연동 (`@supabase/supabase-js`)
- `@supabase/supabase-js` 라이브러리 설치.
- `src/lib/supabase.js`:
  - `import.meta.env.VITE_SUPABASE_URL`
  - `import.meta.env.VITE_SUPABASE_ANON_KEY`
  - 환경변수 미설정 시에도 에러로 렌더링이 깨지지 않도록 안전한 fallback 처리.
- `src/components/Guestbook.jsx`:
  - 컴포넌트 마운트 시 `supabase.from('guestbook').select('*').order('created_at', { ascending: false })` 로 기존 축하 글 로드.
  - 새 글 등록 시 `supabase.from('guestbook').insert([{ name, message }])` 호출.
  - Supabase Realtime 채널(`postgres_changes`) 구독: 다른 하객이 글을 쓰면 새로고침 없이 즉시 화면에 애니메이션과 함께 추가.

### C. 환경 변수 등록 및 자동 배포
- 로컬 개발 환경: `.env` 파일에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 설정.
- Vercel 배포 환경: Vercel 대시보드 -> Project Settings -> Environment Variables에 2개 값 등록.
- GitHub에 커밋 푸시하면 Vercel이 자동으로 최신 코드를 재배포.
