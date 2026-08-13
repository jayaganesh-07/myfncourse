import { FiStar } from 'react-icons/fi'

export default function ReviewCard({ review }) {
  return (
    <article className="card-glow reveal rounded-2xl bg-[color:var(--panel)] p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">{review.name}</p>
        <p className="font-mono text-xs text-[color:var(--muted)]">{review.date}</p>
      </div>
      <div className="mt-1 flex gap-0.5 text-[color:var(--flame)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} className={i < review.rating ? 'fill-current' : 'opacity-30'} />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{review.comment}</p>
    </article>
  )
}
