import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SectionTitle } from './SectionTitle'

function formatTime(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

export function Guestbook() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 1. Supabase 연동 시 초기 데이터 로드 및 Realtime 구독
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    let isMounted = true

    const fetchEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .select('id, name, message, created_at')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (isMounted && data) {
          setEntries(data)
        }
      } catch (err) {
        console.error('방명록 불러오기 실패:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchEntries()

    // 실시간 구독 (새 글 등록 시 자동 반영)
    const channel = supabase
      .channel('guestbook-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guestbook' },
        (payload) => {
          if (!isMounted) return
          setEntries((prev) => {
            // 중복 방지
            if (prev.some((entry) => entry.id === payload.new.id)) {
              return prev
            }
            return [payload.new, ...prev]
          })
        },
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  // 2. 메시지 등록
  const submit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    if (!trimmedName || !trimmedMessage || isSubmitting) return

    setIsSubmitting(true)

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('guestbook')
          .insert([
            {
              name: trimmedName,
              message: trimmedMessage,
            },
          ])
          .select()

        if (error) throw error

        if (data && data[0]) {
          setEntries((prev) => {
            if (prev.some((e) => e.id === data[0].id)) return prev
            return [data[0], ...prev]
          })
        }
      } else {
        // Supabase 미설정 시 로컬 state로 폴백
        const localEntry = {
          id: crypto.randomUUID(),
          name: trimmedName,
          message: trimmedMessage,
          created_at: new Date().toISOString(),
        }
        setEntries((prev) => [localEntry, ...prev])
      }

      setName('')
      setMessage('')
    } catch (err) {
      console.error('방명록 등록 실패:', err)
      setErrorMessage('등록에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
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
          disabled={isSubmitting}
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="축하 메시지를 남겨 주세요"
          rows={3}
          className="w-full resize-none rounded-md border border-cream-300 bg-white/80 px-3 py-2.5 text-sm outline-none placeholder:text-ink-soft focus:border-rose"
          maxLength={200}
          disabled={isSubmitting}
        />

        {errorMessage ? (
          <p className="text-center text-xs text-rose-dark">{errorMessage}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-ink py-3 text-sm text-cream-50 transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </form>

      <ul className="mt-8 space-y-3">
        {isLoading ? (
          <li className="py-6 text-center text-xs text-ink-soft">
            메시지를 불러오는 중입니다...
          </li>
        ) : entries.length === 0 ? (
          <li className="py-6 text-center text-sm text-ink-soft">
            첫 축하 메시지를 남겨 주세요
          </li>
        ) : (
          entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-md bg-white/70 px-4 py-3 shadow-xs"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-ink">{entry.name}</p>
                <time className="text-[11px] text-ink-soft">
                  {formatTime(entry.created_at || entry.createdAt)}
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
