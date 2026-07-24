import { FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function ReviewCard({ review, canManage = false, onEdit, onDelete }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar || `https://i.pravatar.cc/100?u=${review.id}`}
            alt={review.name}
            className="h-10 w-10 rounded-full object-cover border border-white/10"
          />
          <div>
            <p className="font-medium text-mist">{review.name}</p>
            <p className="text-xs text-mist-muted">
              {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <FiStar
              key={n}
              size={13}
              className={n <= review.rating ? 'fill-flare text-flare' : 'text-space-600'}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mist-muted">{review.text}</p>
      {canManage && (
        <div className="mt-4 flex gap-3 border-t border-white/10 pt-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-xs font-medium text-aurora hover:underline"
          >
            <FiEdit2 size={12} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-xs font-medium text-red-400 hover:underline"
          >
            <FiTrash2 size={12} /> Delete
          </button>
        </div>
      )}
    </div>
  )
}
