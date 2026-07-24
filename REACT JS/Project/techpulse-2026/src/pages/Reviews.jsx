import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiLock } from 'react-icons/fi'
import { newsData } from '../data/news'
import { initialReviews } from '../data/reviews'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ReviewCard from '../components/ReviewCard'
import ReviewForm from '../components/ReviewForm'
import RevealOnScroll from '../components/RevealOnScroll'

export default function Reviews() {
  const { user, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [userReviews, setUserReviews] = useLocalStorage('techpulse_user_reviews', [])
  const [activeSlug, setActiveSlug] = useState('all')
  const [targetSlug, setTargetSlug] = useState(newsData[0].slug)

  const allReviews = useMemo(() => [...initialReviews, ...userReviews], [userReviews])

  const filteredReviews = useMemo(() => {
    const list = activeSlug === 'all' ? allReviews : allReviews.filter((r) => r.newsSlug === activeSlug)
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [allReviews, activeSlug])

  const avgRating = useMemo(() => {
    if (!filteredReviews.length) return 0
    return (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
  }, [filteredReviews])

  const myReview = useMemo(
    () => (user ? userReviews.find((r) => r.userId === user.id && r.newsSlug === targetSlug) : null),
    [userReviews, user, targetSlug]
  )

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
          newsSlug: targetSlug,
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

  const deleteReview = (id) => {
    setUserReviews(userReviews.filter((r) => r.id !== id))
    showToast('Review deleted', 'info')
  }

  return (
    <div className="section py-16">
      <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Reader Voices</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-mist sm:text-4xl">Reviews</h1>
          <p className="mt-3 max-w-2xl text-mist-muted">
            See what readers think of each story, and share your own take once you're logged in.
          </p>
        </div>
        <div className="glass-card flex items-center gap-2 px-4 py-3">
          <FiStar className="fill-flare text-flare" size={18} />
          <span className="font-display text-xl font-bold text-mist">{avgRating}</span>
          <span className="text-xs text-mist-muted">/ 5 avg · {filteredReviews.length} reviews</span>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={80} className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSlug('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeSlug === 'all' ? 'bg-aurora text-space-950' : 'bg-white/5 text-mist-muted hover:text-mist'
          }`}
        >
          All Topics
        </button>
        {newsData.map((n) => (
          <button
            key={n.slug}
            onClick={() => setActiveSlug(n.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeSlug === n.slug ? 'bg-aurora text-space-950' : 'bg-white/5 text-mist-muted hover:text-mist'
            }`}
          >
            {n.category}: {n.title.split(' ').slice(0, 3).join(' ')}...
          </button>
        ))}
      </RevealOnScroll>

      {/* Post a review */}
      <RevealOnScroll delay={120} className="mt-10">
        <h2 className="font-display text-lg font-semibold text-mist">Write a Review</h2>
        {isAuthenticated ? (
          <div className="mt-4 space-y-4">
            <select
              value={targetSlug}
              onChange={(e) => setTargetSlug(e.target.value)}
              className="w-full max-w-md rounded-full border border-white/10 bg-space-900/60 px-4 py-2.5 text-sm text-mist focus:border-aurora focus:outline-none"
            >
              {newsData.map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.title}
                </option>
              ))}
            </select>
            <ReviewForm
              initial={myReview}
              onSubmit={submitReview}
              onCancel={myReview ? () => deleteReview(myReview.id) : undefined}
            />
          </div>
        ) : (
          <div className="glass-card mt-4 flex flex-col items-center gap-3 p-8 text-center">
            <FiLock className="text-aurora" size={20} />
            <p className="text-sm text-mist-muted">
              <Link to="/login" className="font-semibold text-aurora hover:underline">Log in</Link> or{' '}
              <Link to="/signup" className="font-semibold text-aurora hover:underline">create an account</Link> to post a review.
            </p>
          </div>
        )}
      </RevealOnScroll>

      {/* Review list */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((r, i) => (
          <RevealOnScroll key={r.id} delay={(i % 6) * 60}>
            <ReviewCard
              review={r}
              canManage={isAuthenticated && r.userId === user?.id}
              onEdit={() => {
                setTargetSlug(r.newsSlug)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onDelete={() => deleteReview(r.id)}
            />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
