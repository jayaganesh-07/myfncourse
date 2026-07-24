import { useEffect } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function GalleryLightbox({ images, index, onClose, onNavigate }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNavigate])

  if (index === null) return null
  const item = images[index]

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-space-950/95 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist hover:border-aurora hover:text-aurora"
      >
        <FiX size={18} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate(-1)
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-space-900/70 text-mist hover:border-aurora hover:text-aurora sm:left-6"
      >
        <FiChevronLeft size={20} />
      </button>

      <div className="max-h-[80vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.title}
          className="max-h-[75vh] w-full rounded-2xl object-contain animate-reveal"
        />
        <div className="mt-4 text-center">
          <p className="font-display text-lg text-mist">{item.title}</p>
          <p className="text-xs uppercase tracking-widest text-aurora">{item.category}</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate(1)
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-space-900/70 text-mist hover:border-aurora hover:text-aurora sm:right-6"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  )
}
