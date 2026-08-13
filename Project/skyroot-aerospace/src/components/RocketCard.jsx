import { useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function RocketCard({ rocket }) {
  const [favorite, setFavorite] = useLocalStorage('skyroot_favorite_rocket', null)
  const isFav = favorite === rocket.id
  const [imgError, setImgError] = useState(false)

  return (
    <article className="card-glow reveal group overflow-hidden rounded-2xl bg-[color:var(--panel)]">
      <div className="relative h-48 overflow-hidden">
        {!imgError ? (
          <img
            src={rocket.image}
            alt={rocket.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--blue)]/30 to-[color:var(--purple)]/30 text-sm text-[color:var(--muted)]">
            {rocket.name}
          </div>
        )}
        <button
          onClick={() => setFavorite(isFav ? null : rocket.id)}
          aria-label="Mark as favorite rocket"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur ${
            isFav ? 'bg-[color:var(--flame)] text-white' : 'bg-black/40 text-white/80 hover:text-white'
          }`}
        >
          <FiHeart className={isFav ? 'fill-current' : ''} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-mono text-white">
          {rocket.status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold">{rocket.name}</h3>
        <p className="mt-1 text-sm text-[color:var(--muted)]">{rocket.tagline}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div>
            <dt className="text-[color:var(--muted)]">Height</dt>
            <dd className="text-white">{rocket.height}</dd>
          </div>
          <div>
            <dt className="text-[color:var(--muted)]">Payload</dt>
            <dd className="text-white">{rocket.payload}</dd>
          </div>
          <div>
            <dt className="text-[color:var(--muted)]">Fuel</dt>
            <dd className="text-white">{rocket.fuel}</dd>
          </div>
          <div>
            <dt className="text-[color:var(--muted)]">Stages</dt>
            <dd className="text-white">{rocket.stages}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
