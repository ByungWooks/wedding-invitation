export const wedding = {
  groom: '이병욱',
  bride: '송현지',
  datetime: '2027-01-16T11:00:00+09:00',
  datetimeLabel: '2027년 1월 16일 토요일 오전 11시',
  venue: '더컨벤션 송파문정점',
  venueDetail: '12층 그랜드볼룸',
  venueAddress: '서울특별시 송파구 송파대로 155',
  venueAddressDetail: 'NH송파농협 신청사 11~13층',
  coverImage: '/photos/photo_10.jpg',
  kakaoMapUrl: 'https://map.kakao.com/link/search/더컨벤션송파문정점',
  naverMapUrl: 'https://map.naver.com/p/search/더컨벤션송파문정점',
  mapImage: '/photos/official_map.png',
  transport: {
    subway: '8호선 문정역 3번 출구 도보 5분',
    bus: {
      general: '30, 31, 100, 331',
      main: '302, 303, 320, 333, 350, 360, 343, 345, 422, N13, N37',
      branch: '3322, 3420',
      direct: '1009, 1112, 1117, 1650, 500-1, 500-1A, 3302, 4305, G2100, G6009',
      notice: '문정법조타운·건영아파트 정류소에서 하차 후 도보이동 (일반버스)',
      policy: '대중교통 정책에 따라 변동될 수 있습니다.',
    },
    car: '내비게이션에 송파구 송파대로 155 검색',
    parking: 'NH송파농협 신청사 지하 주차장 이용 (하객 2시간 무료)',
  },
  greeting: `서로 다른 길을 걷던 두 사람이
한 마음으로 만나
평생을 함께하기로 약속했습니다.

귀한 걸음으로 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`,
  gallery: [
    '/photos/photo_01.jpg',
    '/photos/photo_02.jpg',
    '/photos/photo_03.jpg',
    '/photos/photo_04.jpg',
    '/photos/photo_05.jpg',
    '/photos/photo_06.jpg',
    '/photos/photo_07.jpg',
    '/photos/photo_08.jpg',
    '/photos/photo_09.jpg',
    '/photos/photo_10.jpg',
    '/photos/photo_12.jpg',
    '/photos/photo_13.jpg',
  ],
  accounts: {
    groom: [
      { relation: '신랑', bank: '국민은행', number: '123-456-789012', holder: '이병욱' },
      { relation: '아버지', bank: '신한은행', number: '110-123-456789', holder: '이OO (아버지)' },
      { relation: '어머니', bank: '농협은행', number: '356-123-456789', holder: '김OO (어머니)' },
    ],
    bride: [
      { relation: '신부', bank: '카카오뱅크', number: '3333-12-3456789', holder: '송현지' },
      { relation: '아버지', bank: '우리은행', number: '1002-123-456789', holder: '송OO (아버지)' },
      { relation: '어머니', bank: '하나은행', number: '123-456789-12345', holder: '박OO (어머니)' },
    ],
  },
}
