import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { missions } from '../data/missions'
import MissionCard from '../components/MissionCard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useReveal } from '../hooks/useReveal'

const statuses = ['All', 'Success', 'Scheduled', 'Planned']

export default function Missions() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [, setRecentlyViewed] = useLocalStorage('skyroot_recent_mission', null)
  useReveal([query, status])

  const filtered = useMemo(() => {
    return missions.filter((m) => {
      const matchesStatus = status === 'All' || m.status === status
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.rocket.toLowerCase().includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [query, status])

  return (
    <div className="bg-space min-h-screen px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--blue)]">Flight log</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Missions</h1>
        <p className="mt-2 max-w-xl text-[color:var(--muted)]">
          Every Skyroot flight, from the first sub-orbital test to upcoming orbital launches.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-[color:var(--line)] bg-black/30 px-4 py-2.5">
            <FiSearch className="text-[color:var(--muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by mission or rocket name…"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[color:var(--muted)]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-mono ${
                  status === s
                    ? 'border-transparent bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] text-white'
                    : 'border-[color:var(--line)] text-[color:var(--muted)] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {filtered.length === 0 && (
            <p className="text-sm text-[color:var(--muted)]">No missions match that search.</p>
          )}
          {filtered.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onView={(m) => setRecentlyViewed(m.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
