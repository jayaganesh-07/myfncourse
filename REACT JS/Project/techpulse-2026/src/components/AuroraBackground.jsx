import { useMemo } from 'react'

export default function AuroraBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden bg-space-950">
      <div className="absolute inset-0 bg-aurora-mesh" />
      <div className="star-field">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-aurora/10 blur-3xl animate-float-slow" />
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-nebula/10 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-flare/10 blur-3xl animate-float-slow" />

      <div className="absolute top-1/4 right-[15%] h-24 w-24 rounded-full border border-aurora/20 animate-spin-slow hidden sm:block" />
      <div className="absolute bottom-10 left-[10%] h-16 w-16 rounded-full border border-nebula/25 animate-spin-slow hidden sm:block" />

      <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent" />
    </div>
  )
}
