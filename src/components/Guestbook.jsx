import { useState } from 'react'
import { SectionTitle } from './SectionTitle'

function formatTime(iso) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function Guestbook() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    if (!trimmedName || !trimmedMessage) return

    const entry = {
      id: crypto.randomUUID(),
      name: trimmedName,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    }

    // TODO: Supabase 연동 시 아래 로컬 setState 대신 insert 후 목록을 다시 불러오세요.
    // 예시)
    // const { error } = await supabase.from('guestbook').insert({
    //   name: entry.name,
    //   message: entry.message,
    // })
    // if (error) { console.error(error); return }
    // const { data } = await supabase
    //   .from('guestbook')
    //   .select('id, name, message, created_at')
    //   .order('created_at', { ascending: false })
    setEntries((prev) => [entry, ...prev])
    setName('')
    setMessage('')
  }

  return (
    <section className="px-6 py-16">
      <SectionTitle kicker="GUESTBOOK" title="방명록" />
      <form onSubmit={submit} className="space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="이름"
          className="w-full rounded-md border border-cream-300 bg-white/80 px-3 py-2.5 text-sm outline-none placeholder:text-ink-soft focus:border-rose"
          maxLength={20}
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="축하 메시지를 남겨 주세요"
          rows={3}
          className="w-full resize-none rounded-md border border-cream-300 bg-white/80 px-3 py-2.5 text-sm outline-none placeholder:text-ink-soft focus:border-rose"
          maxLength={200}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-ink py-3 text-sm text-cream-50"
        >
          등록
        </button>
      </form>

      <ul className="mt-8 space-y-3">
        {entries.length === 0 ? (
          <li className="py-6 text-center text-sm text-ink-soft">
            첫 축하 메시지를 남겨 주세요
          </li>
        ) : (
          entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-md bg-white/70 px-4 py-3 shadow-sm"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{entry.name}</p>
                <time className="text-[11px] text-ink-soft">
                  {formatTime(entry.createdAt)}
                </time>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-6 text-ink-muted">
                {entry.message}
              </p>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
