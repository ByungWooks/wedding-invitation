import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

export function Greeting() {
  return (
    <section className="px-8 py-16">
      <SectionTitle kicker="INVITATION" title="초대의 글" />
      <p className="whitespace-pre-line text-center font-serif text-[15px] leading-[2.1] tracking-wide text-ink">
        {wedding.greeting}
      </p>
    </section>
  )
}
