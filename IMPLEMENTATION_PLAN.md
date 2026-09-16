# 상단 이름 '리디바탕' 폰트 적용 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
제공된 '리디바탕(Ridibatang)' 웹폰트를 등록하고, 메인 커버 최상단의 `이병욱 ♥ 송현지` 텍스트에 적용하여 더욱 우아하고 감성적인 타이포그래피를 완성합니다.

---

## 2. 세부 구현 단계

### Step 1. `@font-face` 등록 (`src/index.css`)
- `src/index.css` 최상단에 제공된 `@font-face` 추가:
  ```css
  @font-face {
    font-family: 'Ridibatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-display: swap;
  }
  ```

### Step 2. Tailwind 폰트 패밀리 확장 (`tailwind.config.js`)
- `theme.extend.fontFamily`:
  - `ridi: ['"Ridibatang"', '"Noto Serif KR"', 'serif'],`

### Step 3. 메인 커버 신랑/신부 이름 서체 변경 (`src/components/Cover.jsx`)
- `<h1 className="font-ridi text-4xl font-medium leading-relaxed tracking-wide">` 로 수정.

### Step 4. 빌드, 린트 및 배포
- `npm run build` 및 `npm run lint` 통과 확인.
- Git 커밋 및 `main` 브랜치 푸시 ➔ Vercel 자동 배포.

---

## 3. 사용자 확인 (User Confirmation)
- 리디바탕 웹폰트 적용 작업을 즉시 진행할지 확인합니다.
