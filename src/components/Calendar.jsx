import { useMemo } from 'react'
import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

export function Calendar() {
  // D-Day 계산
  const dDay = useMemo(() => {
    const weddingDate = new Date(wedding.datetime)
    const now = new Date()
    // 날짜 기준 비교를 위해 시/분/초 제거
    const utcWedding = Date.UTC(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate())
    const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    const diffDays = Math.ceil((utcWedding - utcNow) / (1000 * 60 * 60 * 24))
    return diffDays
  }, [])

  // 2027년 1월 달력 데이터 (일요일 시작)
  // 2027년 1월 1일은 금요일 (index 5)
  // 빈 칸 5개 + 1~31일
  const days = [
    '', '', '', '', '', 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31, '', '', '', '', '', ''
  ]

  const weekHeaders = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <section className="px-6 py-16">
      <SectionTitle kicker="DATE" title="예식 일시" />

      <div className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-xs">
        {/* 날짜 및 시간 타이틀 */}
        <div className="mb-6">
          <p className="font-serif text-xl font-medium tracking-tight text-ink">
            2027년 1월 16일
          </p>
          <p className="mt-1 text-sm font-medium tracking-wide text-[#c85a67]">
            토요일 오전 11시
          </p>
        </div>

        {/* 달력 그리드 */}
        <div className="mx-auto max-w-[320px] rounded-xl bg-gray-50/70 p-4">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium">
            {weekHeaders.map((day, idx) => (
              <div
                key={day}
                className={`py-1 ${
                  idx === 0
                    ? 'text-[#c85a67]/90'
                    : idx === 6
                      ? 'text-blue-600/70'
                      : 'text-ink-muted'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 일자 그리드 */}
          <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
            {days.map((day, idx) => {
              if (day === '') {
                return <div key={`empty-${idx}`} className="h-8 w-8" />
              }

              const isWeddingDay = day === 16
              const colIndex = idx % 7
              const isSunday = colIndex === 0 || day === 1 // 1월 1일 신정
              const isSaturday = colIndex === 6

              return (
                <div
                  key={`day-${day}`}
                  className="flex h-8 w-full items-center justify-center"
                >
                  {isWeddingDay ? (
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#d86a76] text-white font-bold shadow-xs">
                      {day}
                      <span className="absolute -top-1.5 -right-1 text-[11px] leading-none text-[#d86a76]">
                        ♥
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`h-8 w-8 flex items-center justify-center rounded-full text-xs font-normal ${
                        isSunday
                          ? 'text-[#c85a67]/80 font-medium'
                          : isSaturday
                            ? 'text-blue-600/70'
                            : 'text-ink'
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* D-Day 및 안내 문구 */}
        <div className="mt-6 pt-5 border-t border-gray-100/80">
          <p className="text-sm font-medium text-ink">
            {wedding.groom} <span className="text-[#d86a76] text-xs">♥</span> {wedding.bride}의 예식일이{' '}
            <span className="font-semibold text-[#c85a67]">
              {dDay > 0 ? `${dDay}일` : dDay === 0 ? '오늘' : `${Math.abs(dDay)}일 지남`}
            </span>{' '}
            남았습니다.
          </p>
          <p className="mt-1.5 text-xs text-ink-muted">
            {wedding.venue} {wedding.venueDetail}
          </p>
        </div>
      </div>
    </section>
  )
}
