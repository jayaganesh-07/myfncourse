import { useState, useEffect } from 'react'
import { FiStar, FiSend } from 'react-icons/fi'

export default function ReviewForm({ initial, onSubmit, onCancel }) {
  const [rating, setRating] = useState(initial?.rating || 5)
  const [hoverRating, setHoverRating] = useState(0)
  const [text, setText] = useState(initial?.text || '')

  useEffect(() => {
    setRating(initial?.rating || 5)
    setText(initial?.text || '')
  }, [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit({ rating, text: text.trim() })
    if (!initial) setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-5">
      <p className="text-sm font-medium text-mist">Your rating</p>
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(n)}
            aria-label={`Rate ${n} stars`}
          >
            <FiStar
              size={22}
              className={n <= (hoverRating || rating) ? 'fill-flare text-flare' : 'text-space-600'}
            />
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts on this story..."
        rows={3}
        required
        className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-space-900/60 px-4 py-3 text-sm text-mist placeholder:text-mist-muted focus:border-aurora focus:outline-none"
      />
      <div className="mt-3 flex gap-2">
        <button type="submit" className="btn-primary !px-5 !py-2.5 text-sm">
          <FiSend size={14} /> {initial ? 'Update Review' : 'Post Review'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-outline !px-5 !py-2.5 text-sm">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
