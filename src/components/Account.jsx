import { useState } from 'react'
import { wedding } from '../data/wedding'
import { SectionTitle } from './SectionTitle'

function AccountRow({ account, onCopied }) {
  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(account.number)
      } else {
        throw new Error('clipboard unavailable')
      }
      onCopied('복사되었습니다')
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = account.number
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand('copy')
      textarea.remove()
      onCopied(ok ? '복사되었습니다' : '복사에 실패했습니다')
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 border-t border-gray-100 py-3 first:border-t-0">
      <div>
        <p className="text-sm">
          {account.bank} {account.number}
        </p>
        <p className="mt-0.5 text-xs text-ink-muted">예금주 {account.holder}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-ink-muted transition hover:bg-gray-100"
      >
        복사
      </button>
    </div>
  )
}

function Accordion({ title, accounts, onCopied }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3.5 text-sm"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="text-ink-soft">{open ? '−' : '+'}</span>
      </button>
      {open ? (
        <div className="border-t border-gray-100 bg-gray-50/50 px-4 pb-3">
          {accounts.map((account) => (
            <AccountRow
              key={`${account.bank}-${account.number}`}
              account={account}
              onCopied={onCopied}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function Account({ onCopied }) {
  return (
    <section className="px-6 py-16">
      <SectionTitle kicker="GIFT" title="축하의 마음 전하실 곳" />
      <div className="space-y-3">
        <Accordion
          title="신랑측"
          accounts={wedding.accounts.groom}
          onCopied={onCopied}
        />
        <Accordion
          title="신부측"
          accounts={wedding.accounts.bride}
          onCopied={onCopied}
        />
      </div>
    </section>
  )
}
