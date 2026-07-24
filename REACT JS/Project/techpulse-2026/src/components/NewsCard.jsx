import { Link } from 'react-router-dom'
import { FiArrowRight, FiShare2, FiBookmark, FiCalendar } from 'react-icons/fi'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from '../context/ToastContext'
import CategoryIcon from './CategoryIcon'

export default function NewsCard({ news, featured = false }) {
  const [favorites, setFavorites] = useLocalStorage('techpulse_favorites', [])
  const { showToast } = useToast()
  const isFav = favorites.includes(news.slug)

  const toggleFavorite = (e) => {
    e.preventDefault()
    if (isFav) {
      setFavorites(favorites.filter((s) => s !== news.slug))
      showToast('Removed from favorites', 'info')
    } else {
      setFavorites([...favorites, news.slug])
      showToast('Added to favorites', 'success')
    }
  }

  const handleShare = async (e) => {
    e.preventDefault()
    const url = `${window.location.origin}/news/${news.slug}`
    try {
      if (navigator.share) {
        await navigator.share({ title: news.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        showToast('Link copied to clipboard', 'success')
      }
    } catch {
      // user cancelled share — no action needed
    }
  }

  return (
    <Link
      to={`/news/${news.slug}`}
      className={`glass-card group flex flex-col overflow-hidden ${
        featured ? 'sm:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'sm:w-1/2' : 'aspect-[16/10]'}`}>
        <img
          src={news.thumbnail}
          alt={news.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-space-950/80 px-3 py-1 text-xs font-medium text-aurora backdrop-blur">
          <CategoryIcon name={news.category} size={12} />
          {news.category}
        </span>
        <button
          onClick={toggleFavorite}
          aria-label="Bookmark"
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
            isFav ? 'bg-aurora text-space-950' : 'bg-space-950/70 text-mist hover:text-aurora'
          }`}
        >
          <FiBookmark size={14} className={isFav ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-mist-muted">
          <FiCalendar size={12} />
          {new Date(news.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          <span>· {news.readTime}</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-mist group-hover:text-aurora transition-colors">
          {news.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-mist-muted">{news.shortDescription}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="flex items-center gap-1 text-sm font-medium text-aurora">
            Read More <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
          <button
            onClick={handleShare}
            aria-label="Share"
            className="flex h-8 w-8 items-center justify-center rounded-full text-mist-muted transition-colors hover:text-aurora"
          >
            <FiShare2 size={14} />
          </button>
        </div>
      </div>
    </Link>
  )
}
