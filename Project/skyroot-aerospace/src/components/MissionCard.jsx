import { FiMapPin, FiCalendar, FiPackage } from 'react-icons/fi'

const statusColor = {
  Success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Scheduled: 'bg-[color:var(--blue)]/15 text-blue-300 border-blue-500/30',
  Planned: 'bg-[color:var(--purple)]/15 text-purple-300 border-purple-500/30',
}

export default function MissionCard({ mission, onView }) {
  return (
    <article className="card-glow reveal flex flex-col gap-4 rounded-2xl bg-[color:var(--panel)] p-6 md:flex-row md:items-center">
      <div className="font-mono text-3xl font-bold text-[color:var(--muted)] md:w-20">{mission.code}</div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-lg font-semibold">{mission.name}</h3>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-mono ${statusColor[mission.status]}`}>
            {mission.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-[color:var(--muted)]">{mission.summary}</p>

        <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs text-[color:var(--muted)]">
          <span className="flex items-center gap-1.5"><FiCalendar /> {mission.launchDate}</span>
          <span className="flex items-center gap-1.5"><FiMapPin /> {mission.site}</span>
          <span className="flex items-center gap-1.5"><FiPackage /> {mission.rocket}</span>
        </div>
      </div>

      <button
        onClick={() => onView?.(mission)}
        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium text-white hover:bg-white/10 md:self-start"
      >
        View orbit details
      </button>
    </article>
  )
}
