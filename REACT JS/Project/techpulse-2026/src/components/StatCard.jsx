import { useCountUp } from '../hooks/useCountUp'

export default function StatCard({ label, value, suffix = '' }) {
  const [ref, count] = useCountUp(value)
  return (
    <div ref={ref} className="glass-card p-6 text-center">
      <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-wider text-mist-muted">{label}</p>
    </div>
  )
}
