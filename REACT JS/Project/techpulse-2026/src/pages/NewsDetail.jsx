import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  FiCalendar, FiUser, FiClock, FiShare2, FiBookmark, FiCheckCircle,
  FiHelpCircle, FiExternalLink, FiTwitter, FiLinkedin, FiMessageCircle, FiMapPin,
} from 'react-icons/fi'
import { getNewsBySlug, getRelatedNews } from '../data/news'
import { initialReviews } from '../data/reviews'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import NewsCard from '../components/NewsCard'
import StatCard from '../components/StatCard'
import ReviewCard from '../components/ReviewCard'
import ReviewForm from '../components/ReviewForm'
import RevealOnScroll from '../components/RevealOnScroll'
import CategoryIcon from '../components/CategoryIcon'
import GalleryLightbox from '../components/GalleryLightbox'

export default function NewsDetail() {
  const { slug } = useParams()
  const news = getNewsBySlug(slug)
  const { user, isAuthenticated } = useAuth()
  const { showToast } = useToast()

  const [favorites, setFavorites] = useLocalStorage('techpulse_favorites', [])
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('techpulse_recently_viewed', [])
  const [userReviews, setUserReviews] = useLocalStorage('techpulse_user_reviews', [])
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const commentsRef = useRef(null)

  useEffect(() => {
    if (!news) return
    setRecentlyViewed((prev) => {
      const withoutCurrent = prev.filter((s) => s !== news.slug)
      return [news.slug, ...withoutCurrent].slice(0, 6)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const galleryItems = useMemo(
    () => (news ? news.gallery.map((src, i) => ({ src, title: `${news.title} — Image ${i + 1}`, category: news.category })) : []),
    [news]
  )

  const relatedNews = useMemo(() => (news ? getRelatedNews(news.id, news.category) : []), [news])

  const allReviews = useMemo(() => [...initialReviews, ...userReviews], [userReviews])
  const articleReviews = useMemo(
    () => allReviews.filter((r) => r.newsSlug === news?.slug).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [allReviews, news]
  )
  const myReview = useMemo(
    () => (user ? articleReviews.find((r) => r.userId === user.id) : null),
    [articleReviews, user]
  )

  if (!news) return <Navigate to="/404" replace />

  const isFav = favorites.includes(news.slug)
  const toggleFavorite = () => {
    if (isFav) {
      setFavorites(favorites.filter((s) => s !== news.slug))
      showToast('Removed from favorites', 'info')
    } else {
      setFavorites([...favorites, news.slug])
      showToast('Added to favorites', 'success')
    }
  }

  const handleShare = async (platform) => {
    const url = `${window.location.origin}/news/${news.slug}`
    if (platform === 'copy') {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard', 'success')
      return
    }
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
  }

  const submitReview = ({ rating, text }) => {
    if (myReview) {
      setUserReviews(
        userReviews.map((r) =>
          r.id === myReview.id ? { ...r, rating, text, date: new Date().toISOString() } : r
        )
      )
      showToast('Review updated', 'success')
    } else {
      setUserReviews([
        ...userReviews,
        {
          id: `ur_${Date.now()}`,
          newsSlug: news.slug,
          userId: user.id,
          name: user.name,
          avatar: `https://i.pravatar.cc/100?u=${user.email}`,
          rating,
          text,
          date: new Date().toISOString(),
        },
      ])
      showToast('Review posted', 'success')
    }
  }

  const deleteReview = () => {
    setUserReviews(userReviews.filter((r) => r.id !== myReview.id))
    showToast('Review deleted', 'info')
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={news.heroImage} alt={news.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/60 to-space-950/20" />
        <div className="section absolute inset-x-0 bottom-0 pb-10">
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-space-950/80 px-3 py-1 text-xs font-medium text-aurora backdrop-blur">
            <CategoryIcon name={news.category} size={12} /> {news.category}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-mist sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist-muted">
            <span className="flex items-center gap-1.5"><FiUser size={13} /> {news.author}</span>
            <span className="flex items-center gap-1.5">
              <FiCalendar size={13} />
              {new Date(news.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5"><FiClock size={13} /> {news.readTime}</span>
          </div>
        </div>
      </section>

      <div className="section grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_320px]">
        {/* Main article */}
        <article>
          <RevealOnScroll className="flex flex-wrap items-center gap-3">
            <button onClick={toggleFavorite} className={`btn-outline !px-4 !py-2 text-sm ${isFav ? '!border-aurora !text-aurora' : ''}`}>
              <FiBookmark size={14} className={isFav ? 'fill-current' : ''} /> {isFav ? 'Saved' : 'Save'}
            </button>
            <button onClick={() => handleShare('twitter')} className="btn-outline !px-4 !py-2 text-sm">
              <FiTwitter size={14} /> Share
            </button>
            <button onClick={() => handleShare('linkedin')} className="btn-outline !px-4 !py-2 text-sm">
              <FiLinkedin size={14} /> Share
            </button>
            <button onClick={() => handleShare('copy')} className="btn-outline !px-4 !py-2 text-sm">
              <FiShare2 size={14} /> Copy Link
            </button>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <p className="mt-8 text-lg leading-relaxed text-mist">{news.intro}</p>
            <p className="mt-4 leading-relaxed text-mist-muted">{news.background}</p>
          </RevealOnScroll>

          {news.sections.map((s, i) => (
            <RevealOnScroll key={s.heading} delay={100 + i * 60}>
              <h2 className="mt-8 font-display text-xl font-semibold text-mist sm:text-2xl">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-mist-muted">{s.body}</p>
            </RevealOnScroll>
          ))}

          {/* Timeline */}
          <RevealOnScroll delay={120}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">Timeline</h2>
            <div className="mt-6 space-y-0">
              {news.timeline.map((t, i) => (
                <div key={t.year + i} className="relative flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-space-800 font-mono text-xs font-semibold text-aurora border border-aurora/30">
                      {t.year}
                    </span>
                    {i !== news.timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-white/10" />}
                  </div>
                  <p className="pt-2 text-sm leading-relaxed text-mist-muted">{t.event}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Key highlights */}
          <RevealOnScroll delay={140}>
            <h2 className="mt-4 font-display text-xl font-semibold text-mist sm:text-2xl">Key Highlights</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {news.keyHighlights.map((h, i) => (
                <li key={i} className="glass-card flex items-start gap-2.5 p-4 text-sm text-mist-muted">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-aurora" size={15} />
                  {h}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Statistics */}
          <RevealOnScroll delay={160}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">By the Numbers</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {news.statistics.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
              ))}
            </div>
          </RevealOnScroll>

          {/* Important facts */}
          <RevealOnScroll delay={180}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">Important Facts</h2>
            <ul className="mt-5 space-y-3">
              {news.importantFacts.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nebula" />
                  {f}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Future impact */}
          <RevealOnScroll delay={200}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">Future Impact</h2>
            <p className="mt-3 leading-relaxed text-mist-muted">{news.futureImpact}</p>
          </RevealOnScroll>

          {/* Interesting facts */}
          <RevealOnScroll delay={220}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">Interesting Facts</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {news.interestingFacts.map((f, i) => (
                <div key={i} className="glass-card p-5 text-sm leading-relaxed text-mist-muted">
                  {f}
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Gallery */}
          <RevealOnScroll delay={240}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">Image Gallery</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryItems.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  <img src={g.src} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-space-950/0 transition-colors group-hover:bg-space-950/20" />
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* FAQs */}
          <RevealOnScroll delay={260}>
            <h2 className="mt-12 flex items-center gap-2 font-display text-xl font-semibold text-mist sm:text-2xl">
              <FiHelpCircle size={20} className="text-aurora" /> Frequently Asked Questions
            </h2>
            <div className="mt-5 space-y-3">
              {news.faqs.map((f, i) => (
                <details key={i} className="glass-card group p-4 open:border-aurora/30">
                  <summary className="cursor-pointer list-none font-medium text-mist">{f.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-mist-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </RevealOnScroll>

          {/* References */}
          <RevealOnScroll delay={280}>
            <h2 className="mt-12 font-display text-xl font-semibold text-mist sm:text-2xl">References</h2>
            <ul className="mt-4 space-y-2">
              {news.references.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-1.5 text-sm text-aurora hover:underline"
                  >
                    <FiExternalLink size={13} /> {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Comments / Reviews */}
          <div ref={commentsRef} className="mt-14 border-t border-white/10 pt-10">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-mist sm:text-2xl">
              <FiMessageCircle size={20} className="text-aurora" /> Comments &amp; Reviews ({articleReviews.length})
            </h2>

            <div className="mt-6">
              {isAuthenticated ? (
                <ReviewForm initial={myReview} onSubmit={submitReview} onCancel={myReview ? deleteReview : undefined} />
              ) : (
                <div className="glass-card flex flex-col items-center gap-3 p-8 text-center">
                  <FiMapPin className="text-aurora" size={20} />
                  <p className="text-sm text-mist-muted">
                    <Link to="/login" className="font-semibold text-aurora hover:underline">Log in</Link> or{' '}
                    <Link to="/signup" className="font-semibold text-aurora hover:underline">sign up</Link> to post your own review.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {articleReviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  canManage={isAuthenticated && r.userId === user?.id}
                  onEdit={() => window.scrollTo({ top: commentsRef.current.offsetTop - 100, behavior: 'smooth' })}
                  onDelete={deleteReview}
                />
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <RevealOnScroll className="glass-card p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-mist-muted">Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {news.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-mist-muted">
                  #{t}
                </span>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80} className="glass-card p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-mist-muted">Related Stories</h3>
            <div className="mt-4 space-y-4">
              {relatedNews.map((r) => (
                <Link key={r.id} to={`/news/${r.slug}`} className="flex gap-3 group">
                  <img src={r.thumbnail} alt={r.title} className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium leading-snug text-mist group-hover:text-aurora">{r.title}</p>
                    <p className="mt-1 text-xs text-mist-muted">
                      {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </aside>
      </div>

      {/* More related news as full cards */}
      <section className="section pb-20">
        <h2 className="font-display text-2xl font-bold text-mist">You Might Also Like</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relatedNews.map((r, i) => (
            <RevealOnScroll key={r.id} delay={i * 80}>
              <NewsCard news={r} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <GalleryLightbox
        images={galleryItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) =>
          setLightboxIndex((prev) => (prev + dir + galleryItems.length) % galleryItems.length)
        }
      />
    </div>
  )
}
