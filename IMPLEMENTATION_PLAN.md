# 계좌번호 신랑/신부 및 혼주(양가 부모님) 확장 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
양가 부모님(아빠, 엄마, 장인어른, 장모님)과 신랑, 신부 총 6명의 계좌를 모두 깔끔하게 표시할 수 있도록 데이터 구조와 UI를 확장하고 Vercel에 배포합니다.

---

## 2. 세부 구현 단계

### Step 1. 데이터 모델 확장 (`src/data/wedding.js`)
- `relation` 필드를 추가하여 계좌 구분 지원:
  ```javascript
  accounts: {
    groom: [
      { relation: '신랑', holder: '이병욱', bank: '국민은행', number: '123-456-789012' },
      { relation: '아버지', holder: '이OO', bank: '신한은행', number: '110-123-456789' },
      { relation: '어머니', holder: '김OO', bank: '농협은행', number: '356-123-456789' },
    ],
    bride: [
      { relation: '신부', holder: '송현지', bank: '카카오뱅크', number: '3333-12-3456789' },
      { relation: '아버지', holder: '송OO', bank: '우리은행', number: '1002-123-456789' },
      { relation: '어머니', holder: '박OO', bank: '하나은행', number: '123-456789-12345' },
    ],
  }
  ```

### Step 2. UI 렌더링 개선 (`src/components/Account.jsx`)
- `AccountRow`에 `relation` 뱃지(예: `신랑`, `아버지`, `어머니`) 노출.
- 복사 시 계좌번호만 정확하게 클립보드에 복사되고, "이병욱님의 계좌번호가 복사되었습니다" 또는 "계좌번호가 복사되었습니다" Toast 노출.
- 카드 디자인을 화이트 톤과 어울리는 정갈한 레이아웃으로 마무리.

### Step 3. 빌드, 린트 및 배포
- `npm run build` 및 `npm run lint` 통과 확인.
- Git 커밋 및 `main` 브랜치 푸시 ➔ Vercel 자동 배포.

---

## 3. 사용자 확인 (User Confirmation)
- 신랑/신부 및 양가 부모님 6인 계좌 체제로 확장하는 계획에 대해 확인을 구합니다.
