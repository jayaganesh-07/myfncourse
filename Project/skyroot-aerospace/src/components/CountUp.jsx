import { useEffect, useRef, useState } from 'react'

// Small count-up used for the mission telemetry strip on Home.
export default function CountUp({ end, duration = 1400, suffix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          function tick(now) {
            const progress = Math.min((now - start) / duration, 1)
            setValue(Math.round(progress * end))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="font-mono">
      {value}
      {suffix}
    </span>
  )
}
