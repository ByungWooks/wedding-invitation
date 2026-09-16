import { wedding } from '../data/wedding'
import { useCountdown } from '../hooks/useCountdown'

function TimeBox({ value, label }) {
  return (
    <div className="flex min-w-[58px] flex-col items-center rounded-lg border border-gray-100 bg-white/90 px-2 py-3 shadow-xs backdrop-blur-xs">
      <span className="font-serif text-2xl tabular-nums text-ink">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] tracking-widest text-ink-muted">
        {label}
      </span>
    </div>
  )
}

export function Cover() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(
    wedding.datetime,
  )

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="pointer-events-none absolute inset-0 select-none bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${wedding.coverImage || '/photos/photo_10.jpg'})`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white" />

      <div className="relative">
        <p className="mb-8 text-[11px] tracking-[0.4em] text-rose-dark">
          WEDDING INVITATION
        </p>
        <h1 className="font-serif text-4xl font-medium leading-relaxed tracking-wide">
          {wedding.groom}
          <span className="mx-3 text-2xl text-rose">♥</span>
          {wedding.bride}
        </h1>
        <p className="mt-8 text-sm leading-7 tracking-wide text-ink-muted">
          {wedding.datetimeLabel}
        </p>
        <p className="mt-1 text-sm tracking-wide text-ink-muted">
          {wedding.venue}
        </p>

        <div className="mt-12">
          {isPast ? (
            <p className="font-serif text-lg text-ink-muted">
              두 사람의 새로운 시작을 축하해 주세요
            </p>
          ) : (
            <>
              <p className="mb-4 text-[11px] tracking-[0.3em] text-ink-soft">
                D-DAY
              </p>
              <div className="flex justify-center gap-2">
                <TimeBox value={days} label="DAYS" />
                <TimeBox value={hours} label="HRS" />
                <TimeBox value={minutes} label="MIN" />
                <TimeBox value={seconds} label="SEC" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
