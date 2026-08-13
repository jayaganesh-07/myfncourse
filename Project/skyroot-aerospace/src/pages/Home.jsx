import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTarget, FiZap, FiGlobe } from 'react-icons/fi'
import { rockets } from '../data/rockets'
import { stats } from '../data/stats'
import CountUp from '../components/CountUp'
import { useReveal } from '../hooks/useReveal'

const featured = rockets[0]

const highlights = [
  { icon: FiZap, title: 'Rapid iteration', text: 'Vikram-S went from design freeze to launch pad in under a week of integration.' },
  { icon: FiTarget, title: 'India-built engines', text: '3D-printed solid and liquid engines developed and tested in-house.' },
  { icon: FiGlobe, title: 'Commercial rideshare', text: 'Dedicated slots for domestic and international smallsat operators.' },
]

export default function Home() {
  useReveal()
  const missionsRef = useRef(null)

  return (
    <div>
      {/* Hero */}
      <section className="bg-space relative overflow-hidden">
        <div className="starfield" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-24 md:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Mission Aagaman · Orbit achieved
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            India's first private rocket to reach <span className="gradient-text">orbit.</span>
          </h1>
          <p className="max-w-xl text-base text-[color:var(--muted)] md:text-lg">
            Skyroot Aerospace builds and flies India's private launch vehicles — from the
            sub-orbital Vikram-S to the orbital Vikram-1 — opening commercial access to space
            for satellite operators everywhere.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => missionsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-launch flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] px-6 py-3 text-sm font-semibold text-white"
            >
              View missions <FiArrowRight />
            </button>
            <Link
              to="/rockets"
              className="rounded-full border border-[color:var(--line)] px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Explore rockets
            </Link>
          </div>
        </div>

        {/* Telemetry strip — signature element */}
        <div className="relative border-t border-[color:var(--line)] bg-black/30 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-2xl font-bold text-white md:text-3xl">
                  <CountUp end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--blue)]">Who we are</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Built by Indian rocket scientists, for Indian orbit access</h2>
            <p className="mt-4 leading-relaxed text-[color:var(--muted)]">
              Founded by former ISRO scientists, Skyroot designs solid and liquid propulsion,
              avionics, and structures entirely in-house — compressing rocket development
              timelines with 3D-printed engines and modular launch vehicles.
            </p>
          </div>
          <div className="reveal float overflow-hidden rounded-3xl border border-[color:var(--line)]">
            <img
              src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1200&auto=format&fit=crop"
              alt="Rocket launch"
              className="h-80 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured rocket */}
      <section ref={missionsRef} className="mx-auto max-w-7xl px-5 py-20">
        <p className="reveal font-mono text-xs uppercase tracking-widest text-[color:var(--purple)]">Featured rocket</p>
        <div className="reveal mt-6 grid gap-8 rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel)] p-8 md:grid-cols-2 md:items-center">
          <img src={featured.image} alt={featured.name} className="h-72 w-full rounded-2xl object-cover" />
          <div>
            <h3 className="font-display text-3xl font-semibold">{featured.name}</h3>
            <p className="mt-2 text-[color:var(--muted)]">{featured.tagline}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-sm">
              <div><dt className="text-[color:var(--muted)]">Height</dt><dd className="text-white">{featured.height}</dd></div>
              <div><dt className="text-[color:var(--muted)]">Payload</dt><dd className="text-white">{featured.payload}</dd></div>
              <div><dt className="text-[color:var(--muted)]">Fuel</dt><dd className="text-white">{featured.fuel}</dd></div>
              <div><dt className="text-[color:var(--muted)]">Status</dt><dd className="text-white">{featured.status}</dd></div>
            </dl>
            <Link to="/rockets" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--blue)] hover:underline">
              See all rockets <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="reveal font-mono text-xs uppercase tracking-widest text-[color:var(--blue)]">Why it matters</p>
        <h2 className="reveal mt-2 font-display text-3xl font-semibold">Highlights from the program</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="card-glow reveal rounded-2xl bg-[color:var(--panel)] p-6">
              <h.icon className="text-2xl text-[color:var(--flame)]" />
              <h3 className="mt-4 font-display text-lg font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="reveal flex flex-col items-start gap-5 rounded-3xl border border-[color:var(--line)] bg-gradient-to-br from-[color:var(--blue)]/20 to-[color:var(--purple)]/20 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold">Follow the next launch countdown</h3>
            <p className="mt-2 text-[color:var(--muted)]">Sign in to save your favorite rocket and leave a mission review.</p>
          </div>
          <Link
            to="/login"
            className="btn-launch flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05070f]"
          >
            Sign in <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}
