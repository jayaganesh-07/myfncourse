import { gallery } from '../data/gallery'
import { useReveal } from '../hooks/useReveal'

const founders = [
  { name: 'Pawan Kumar Chandana', role: 'Co-founder & CEO — former ISRO scientist' },
  { name: 'Naga Bharath Daka', role: 'Co-founder & COO — former ISRO scientist' },
]

const achievements = [
  "First privately developed Indian rocket to reach space (Mission Prarambh, 2022)",
  "First private orbital launch from Indian soil (Mission Aagaman, 2025)",
  "In-house 3D-printed solid and liquid propulsion engines",
]

export default function About() {
  useReveal()
  return (
    <div className="bg-space min-h-screen px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--purple)]">About Skyroot</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Company overview</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-[color:var(--muted)]">
          Skyroot Aerospace is a private Indian aerospace company building the Vikram series of
          launch vehicles, aiming to make space more accessible for satellite operators through
          affordable, dedicated, and rideshare launches.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="reveal">
            <h2 className="font-display text-2xl font-semibold">Founders</h2>
            <div className="mt-4 space-y-4">
              {founders.map((f) => (
                <div key={f.name} className="rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] p-4">
                  <p className="font-semibold text-white">{f.name}</p>
                  <p className="text-sm text-[color:var(--muted)]">{f.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <h2 className="font-display text-2xl font-semibold">Vision</h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">
              To make space accessible from India — building reliable, low-cost launch vehicles
              that serve the fast-growing global smallsat market and anchor India's private
              space economy.
            </p>
          </div>
        </div>

        <div className="reveal mt-14">
          <h2 className="font-display text-2xl font-semibold">Achievements</h2>
          <ul className="mt-4 space-y-3">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--panel)] p-4 text-sm text-[color:var(--muted)]">
                <span className="font-mono text-[color:var(--flame)]">✓</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-14">
          <h2 className="font-display text-2xl font-semibold">India's space journey</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
            India opened its space sector to private players in 2020. Since then, companies like
            Skyroot have moved from paper designs to flight hardware in a few short years,
            complementing ISRO's decades of government-led launches with a growing commercial
            launch industry.
          </p>
        </div>

        <div className="reveal mt-14">
          <h2 className="font-display text-2xl font-semibold">Gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((g) => (
              <figure key={g.id} className="overflow-hidden rounded-xl border border-[color:var(--line)]">
                <img src={g.image} alt={g.caption} className="h-36 w-full object-cover transition-transform duration-500 hover:scale-110" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
