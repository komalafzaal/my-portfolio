"use client"

import { useEffect, useRef, useState } from "react"

// Counts a stat like "100K+" up from 0 the first time it scrolls into view.
// Values without a leading number (e.g. "1st Try") are shown as-is.
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(\D*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ""
  const [current, setCurrent] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!match || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    setCurrent(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setCurrent(Math.round(target * (1 - Math.pow(1 - t, 3))))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return <span ref={ref}>{match ? `${current}${suffix}` : value}</span>
}
