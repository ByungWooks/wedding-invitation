export function SectionTitle({ kicker, title }) {
  return (
    <header className="mb-8 text-center">
      {kicker ? (
        <p className="mb-2 text-[11px] tracking-[0.35em] text-rose-dark uppercase">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-serif text-xl font-medium tracking-wide text-ink">
        {title}
      </h2>
      <span className="mx-auto mt-4 block h-px w-10 bg-rose" />
    </header>
  )
}
