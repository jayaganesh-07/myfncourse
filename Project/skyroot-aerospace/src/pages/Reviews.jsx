import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import ReviewCard from '../components/ReviewCard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAuth } from '../context/AuthContext'
import { useReveal } from '../hooks/useReveal'

const seedReviews = [
  {
    id: 'seed-1',
    name: 'Ananya R.',
    rating: 5,
    date: '2025-05-18',
    comment:
      "Skyroot Aerospace's Vikram-1 mission is a major milestone for India's private space industry. It demonstrates the country's growing capabilities in commercial space technology and inspires future innovation.",
  },
  {
    id: 'seed-2',
    name: 'Karthik S.',
    rating: 4,
    date: '2025-06-02',
    comment: 'Impressive turnaround time between static-fire tests and the actual launch. Excited to see Vikram-2 fly next.',
  },
]

export default function Reviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useLocalStorage('skyroot_reviews', seedReviews)
  const [form, setForm] = useState({ rating: 5, comment: '' })
  useReveal([reviews.length])

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.comment.trim()) return
    const newReview = {
      id: `r-${Date.now()}`,
      name: user.name,
      rating: form.rating,
      comment: form.comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    }
    setReviews([newReview, ...reviews])
    setForm({ rating: 5, comment: '' })
  }

  return (
    <div className="bg-space min-h-screen px-5 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--flame)]">Mission feedback</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Reviews</h1>
        <p className="mt-2 max-w-xl text-[color:var(--muted)]">
          What space enthusiasts and industry watchers are saying about Skyroot's missions.
        </p>

        {user ? (
          <form onSubmit={handleSubmit} className="reveal mt-8 rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-6">
            <p className="text-sm font-semibold text-white">Leave a review as {user.name}</p>
            <div className="mt-3 flex gap-1 text-xl text-[color:var(--flame)]">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setForm((f) => ({ ...f, rating: n }))}
                  aria-label={`${n} star`}
                >
                  <FiStar className={n <= form.rating ? 'fill-current' : 'opacity-30'} />
                </button>
              ))}
            </div>
            <textarea
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              placeholder="Share your thoughts on the mission…"
              rows={3}
              className="mt-3 w-full rounded-lg border border-[color:var(--line)] bg-black/30 p-3 text-sm text-white outline-none placeholder:text-[color:var(--muted)]"
            />
            <button
              type="submit"
              className="btn-launch mt-3 rounded-full bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] px-5 py-2 text-sm font-semibold text-white"
            >
              Post review
            </button>
          </form>
        ) : (
          <div className="reveal mt-8 rounded-2xl border border-dashed border-[color:var(--line)] bg-[color:var(--panel)]/50 p-6 text-sm text-[color:var(--muted)]">
            <Link to="/login" className="font-semibold text-[color:var(--blue)] hover:underline">Sign in</Link> to leave your own mission review.
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
