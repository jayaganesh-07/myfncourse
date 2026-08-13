import { rockets } from '../data/rockets'
import RocketCard from '../components/RocketCard'
import { useReveal } from '../hooks/useReveal'

export default function Rockets() {
  useReveal()
  return (
    <div className="bg-space min-h-screen px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--purple)]">Launch vehicles</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Rockets</h1>
        <p className="mt-2 max-w-xl text-[color:var(--muted)]">
          From the sub-orbital Vikram-S to the flagship Vikram-3, tap the heart to set a favorite.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rockets.map((rocket) => (
            <RocketCard key={rocket.id} rocket={rocket} />
          ))}
        </div>
      </div>
    </div>
  )
}
