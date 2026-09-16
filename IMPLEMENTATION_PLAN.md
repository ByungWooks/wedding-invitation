# 전화 걸기 버튼 삭제 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
'오시는 길' 안내 카드 하단의 [전화 걸기] 버튼을 삭제하고 [주소 복사] 버튼만 중앙 정렬하여 배포합니다.

---

## 2. 세부 구현 단계

### Step 1. `src/components/Location.jsx` 수정
- `{wedding.tel ? ( <a ...>전화 걸기</a> ) : null}` 코드 블록 삭제.
- [주소 복사] 버튼을 깔끔하게 중앙 정렬 배치.

### Step 2. `src/data/wedding.js` 수정
- `tel: '02-6418-5000'` 필드 제거.

### Step 3. 빌드, 린트 및 배포
- `npm run build` 및 `npm run lint` 통과 확인.
- Git 커밋 및 `main` 브랜치 푸시 ➔ Vercel 자동 배포.

---

## 3. 사용자 확인 (User Confirmation)
- [전화 걸기] 버튼 삭제 작업을 바로 진행할지 확인합니다.
