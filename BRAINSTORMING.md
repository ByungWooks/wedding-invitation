# 상단 이름 '리디바탕' 폰트 적용 브레인스토밍 (BRAINSTORMING)

## 1. 요청 사항 분석
- **요청**: 메인 커버 최상단의 `이병욱 ♥ 송현지` 텍스트 폰트를 '리디바탕 (Ridibatang)' 서체로 변경.
- **폰트 소스**:
  ```css
  @font-face {
      font-family: 'Ridibatang';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
      font-weight: normal;
      font-display: swap;
  }
  ```

---

## 2. 구현 방식 검토
1. `src/index.css`에 사용자가 제공한 `@font-face`를 정의.
2. `tailwind.config.js`에 `ridi: ['"Ridibatang"', 'serif']` 폰트 패밀리 확장 추가.
3. `src/components/Cover.jsx`의 `h1` 태그에 `font-ridi` 적용하여 신랑/신부 이름이 한국어 명조 계열 중 가장 정갈하고 우아한 리디바탕체로 렌더링되도록 처리.
4. 필요시 초대의 글 등 다른 세리프 서체에도 통일감 있게 적용 가능한 구조 마련.
