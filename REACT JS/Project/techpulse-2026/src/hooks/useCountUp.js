import { useEffect, useRef, useState } from 'react'

export function useCountUp(target = 0, { duration = 1400, startOnView = true } = {}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const run = () => {
      if (hasRun.current) return
      hasRun.current = true
      const start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const pct = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - pct, 3)
        setValue(Math.round(target * eased))
        if (pct < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (!startOnView) {
      run()
      return
    }

    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) run()
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration, startOnView])

  return [ref, value]
}
