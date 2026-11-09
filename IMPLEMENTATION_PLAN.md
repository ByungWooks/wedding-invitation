# 모바일 계좌번호 밑줄 제거 및 토스트 한 줄 표시 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
1. 모바일 Chrome 및 Safari 등에서 계좌번호가 전화번호로 오인식되어 밑줄이 그어지는 현상을 **3중 방어**로 제거합니다. (로컬 반영 완료)
2. [src/components/Toast.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Toast.jsx)에서 복사 완료 토스트 메시지(`"계좌번호가 복사되었습니다"`, `"주소가 복사되었습니다"`)가 끝 글자만 애매하게 줄바꿈되지 않고 **항상 깔끔하게 한 줄로 표시**되도록 수정합니다.
3. 로컬 검증 후 곧바로 Vercel 프로덕션 배포(`git push origin main`)까지 완료합니다.

---

## 2. 세부 구현 단계

### Step 1. 계좌번호 자동 밑줄 3중 방어 (적용 완료)
- [index.html](file:///Users/bottlewook/Documents/wedding-invitation/index.html): `<meta name="format-detection" content="telephone=no, address=no, email=no" />` 추가
- [src/index.css](file:///Users/bottlewook/Documents/wedding-invitation/src/index.css): `a[href^="tel"]`, `a[x-apple-data-detectors]` 스타일 무력화
- [src/components/Account.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Account.jsx): 하이픈(`-`) 분리 렌더링 적용

### Step 2. [src/components/Toast.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Toast.jsx) 한 줄 표시(`whitespace-nowrap`) 적용
- [`Toast`](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Toast.jsx#L4-L22) 컴포넌트의 클래스에 `whitespace-nowrap w-max`를 추가하여 `left-1/2` 배치 시에도 텍스트가 50% 폭에 갇혀 줄바꿈되지 않도록 수정합니다:
  ```jsx
  className="fixed bottom-8 left-1/2 z-[110] w-max -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm text-cream-50 shadow-lg"
  ```

### Step 3. 검증 및 프로덕션 배포
- `npm run lint` 및 `npm run build` 무결성 확인
- Git 커밋 및 `git push origin main`을 통한 Vercel 프로덕션 배포

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획서를 확인해 주시면 즉시 [src/components/Toast.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Toast.jsx) 수정 및 프로덕션 배포까지 완료하겠습니다.
