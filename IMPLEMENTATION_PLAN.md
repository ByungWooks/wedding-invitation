# 약도 교체, 배경 톤 및 푸터 하트 구현 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
사용자가 제공한 데스크탑 스크린샷 약도로 교체하고, 전체 배경을 아까의 노란 톤에서 살짝 더 차분하고 고급스러운 웜 베이지 톤으로 조정하며, 하단 푸터 텍스트를 `이병욱 ♥ 송현지`로 수정하여 배포합니다.

---

## 2. 세부 구현 단계

### Step 1. 약도 이미지 교체
- `/Users/bottlewook/Desktop/스크린샷 2026-09-16 오후 10.23.12.png` 파일을 `public/photos/official_map.png`로 복사하여 덮어쓰기.

### Step 2. 배경 톤 감성 튜닝 (아까의 노란톤 + 차분하고 깊은 웜 베이지)
- **외부 바깥 배경**: 아까의 `#efe4d4`보다 살짝 더 차분하고 묵직한 웜 샌드 베이지(`bg-[#e6dccb]` 또는 `#e2d5be`).
- **청첩장 본체(`main`)**: 순백의 쨍한 흰색 대신 감성적인 웜 밀크 화이트(`bg-[#fcfbf9]` 또는 `bg-white`)로 매치하여 본체가 돋보이면서도 자연스럽게 어우러지도록 연출.
- **그림자 및 테두리**: 따뜻한 브라운-그레이 소프트 섀도우 적용.

### Step 3. 푸터 텍스트 하트 표기 (`src/App.jsx`)
- `App.jsx` 하단 푸터:
  - `{wedding.groom} <span className="text-rose text-[10px] mx-1">♥</span> {wedding.bride}` 적용.

### Step 4. 빌드, 린트 및 배포
- `npm run build` 및 `npm run lint` 통과 확인.
- Git 커밋 및 `main` 브랜치 푸시 ➔ Vercel 자동 배포.

---

## 3. 사용자 확인 (User Confirmation)
- 위 계획대로 스크린샷 약도 적용, 차분한 노란 웜베이지 배경 톤 연출, 푸터 하트 수정을 진행할지 확인합니다.
