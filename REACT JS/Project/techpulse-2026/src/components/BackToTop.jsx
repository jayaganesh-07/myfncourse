import { FiArrowUp } from 'react-icons/fi'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function BackToTop() {
  const { scrolled } = useScrollProgress()

  if (!scrolled) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-space-800/90 border border-white/10 text-aurora shadow-lg backdrop-blur transition-transform hover:scale-110 hover:border-aurora animate-reveal"
    >
      <FiArrowUp size={18} />
    </button>
  )
}
