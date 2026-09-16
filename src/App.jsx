import { useCallback, useState } from 'react'
import { Account } from './components/Account'
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
    <div className="min-h-svh bg-cream-200">
      <main className="mx-auto min-h-svh max-w-md bg-cream-100 shadow-[0_0_40px_rgba(74,64,54,0.08)]">
        <Cover />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Greeting />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Gallery />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Location onCopied={showToast} />
        <div className="mx-auto h-px w-12 bg-cream-300" />
        <Account onCopied={showToast} />
        <footer className="pb-12 pt-8 text-center text-[11px] tracking-widest text-ink-soft">
          {wedding.groom} & {wedding.bride}
        </footer>
      </main>
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  )
}

export default App
