# 모바일 계좌번호 밑줄 방지 및 토스트 알림 한 줄 표시 브레인스토밍 (BRAINSTORMING)

## 1. 문제 원인 및 배경 분석

### A. 모바일 크롬/사파리 계좌번호 자동 밑줄 현상
1. **현상**:
   - iOS Chrome(모바일 크롬) 및 Safari 환경에서 청첩장의 계좌번호 영역을 볼 때, `607302-01-201858`, `429-910150-34307`, `421-08-007054` 등의 숫자에 밑줄이 자동으로 그어짐.
2. **해결**:
   - 3중 방어([index.html](file:///Users/bottlewook/Documents/wedding-invitation/index.html) `format-detection` 메타 태그 + [src/index.css](file:///Users/bottlewook/Documents/wedding-invitation/src/index.css) `a[href^="tel"]` 밑줄 차단 + [src/components/Account.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Account.jsx) 하이픈 분리 렌더링) 적용 완료.

### B. 토스트 알림("계좌번호가 복사되었습니다") 줄바꿈 깨짐 현상
1. **현상**:
   - 모바일 화면 폭(예: iPhone 16 393px)에서 복사 버튼을 눌렀을 때 토스트 메시지가 `"계좌번호가 복사되었습니 / 다"`처럼 끝 글자만 애매하게 두 번째 줄로 넘어감.
2. **원인**:
   - [src/components/Toast.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Toast.jsx)에 `fixed left-1/2 -translate-x-1/2`가 적용되어 있는데, `whitespace-nowrap`(줄바꿈 방지)이나 `w-max`가 지정되어 있지 않음.
   - CSS 특성상 `left: 50%`로 배치된 요소에 너비나 `whitespace-nowrap`이 없으면 브라우저가 화면 오른쪽 끝까지의 남은 절반 폭(50% 너비)을 최대 폭으로 계산하여 강제로 줄바꿈을 발생시킴.
3. **해결 방안**:
   - [src/components/Toast.jsx](file:///Users/bottlewook/Documents/wedding-invitation/src/components/Toast.jsx)의 토스트 컨테이너에 `whitespace-nowrap w-max` 클래스를 추가하여 **"계좌번호가 복사되었습니다"가 언제나 깔끔하게 한 줄로 표시**되도록 수정.
