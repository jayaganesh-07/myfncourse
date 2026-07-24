import { useScrollReveal } from '../hooks/useScrollReveal'

export default function RevealOnScroll({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`${visible ? 'reveal-in' : 'reveal-init'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
