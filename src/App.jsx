import { useCallback, useState } from 'react'
import { Account } from './components/Account'
import { Calendar } from './components/Calendar'
import { Cover } from './components/Cover'
import { Gallery } from './components/Gallery'
import { Greeting } from './components/Greeting'
import { Location } from './components/Location'
import { Toast } from './components/Toast'
import { wedding } from './data/wedding'

function App() {
  const [toast, setToast] = useState('')
  const showToast = useCallback((message) => setToast(message), [])

  return (
    <div className="min-h-svh bg-cream-200 flex items-center justify-center p-0 lg:py-10">

      {/* 청첩장 본체 카드 (모바일 100% 핏, 데스크톱에서는 라운드 카드 섀도우) */}
      <main className="w-full min-h-svh max-w-md bg-cream-100 shadow-[0_4px_35px_rgba(60,50,40,0.09)] lg:min-h-0 lg:rounded-3xl lg:shadow-[0_20px_60px_rgba(60,50,40,0.14)] lg:border lg:border-cream-300/60 overflow-hidden transition-all">
        <Cover />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Greeting />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Calendar />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Gallery />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Location onCopied={showToast} />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Account onCopied={showToast} />
        <footer className="pb-12 pt-8 text-center text-xs tracking-widest text-ink-soft">
          {wedding.groom} <span className="mx-1 text-rose text-xs">♥</span> {wedding.bride}
        </footer>
      </main>

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  )
}

export default App
