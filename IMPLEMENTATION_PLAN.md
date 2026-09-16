# 반지 픽셀아트 QR 코드 생성 계획서 (IMPLEMENTATION_PLAN)

## 1. 구현 목표
- 모바일 청첩장 도메인(`https://wedding-invitation-20270116.vercel.app/`)을 인코딩하는 고해상도 QR 코드를 생성합니다.
- 구글 크롬 QR 스타일과 유사하되, 중앙에 사용자가 전달한 **픽셀아트 다이아몬드 반지**를 고화질로 얹어 제작합니다.
- 생성된 QR 이미지를 바탕화면과 프로젝트 저장소에 배치하고, QR 인식 테스트(디코딩 검증)를 거친 후 완료합니다.

---

## 2. 세부 구현 단계

### Step 1. 반지 픽셀아트 아이콘 추출 및 정제
- 레퍼런스 이미지에서 외곽 불필요 영역을 제거하고, 순수 픽셀아트 반지(다이아몬드 + 링) 스프라이트를 추출.
- 깨끗한 흰색 둥근 배경 패치(Corner radius)와 적절한 패딩을 부여하여 QR 스캔 인식률 극대화.

### Step 2. QR 코드 합성 스크립트 작성 및 실행
- Python `qrcode` 라이브러리의 `ERROR_CORRECT_H` (30% 복원율) 사용.
- 고해상도(모듈당 20~25px, 전체 약 1000x1000px 이상)로 렌더링.
- 중앙 정렬하여 반지 아이콘 합성.

### Step 3. 유효성 검증
- 생성된 QR 이미지 파일을 직접 스캔/디코딩하여 타깃 URL(`https://wedding-invitation-20270116.vercel.app/`)이 정상 검출되는지 테스트.
- 실제 스마트폰 카메라로도 인식이 원활한지 확인.

### Step 4. 파일 저장 및 깃 푸시
- 저장 위치:
  1. `/Users/bottlewook/Desktop/wedding_invitation_qr.png` (사용자 편의용)
  2. `public/photos/wedding_qr_ring.png` (웹 청첩장 리소스용)
- Git 커밋 및 Vercel 배포 반영.
