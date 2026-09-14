"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

export function CountUp({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  // Renders the real value immediately (matches SSR) so the number is always
  // correct even if JS never runs. useLayoutEffect then drops it to 0 before
  // the browser paints, purely so the count-up has something to animate from.
  const [display, setDisplay] = useState(value)

  useLayoutEffect(() => {
    // Intentional: this runs before paint specifically to reset to 0 without a
    // visible flash of the real value, so the animation below has a start point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplay(0)
  }, [value])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let settled = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || settled) return
        settled = true
        observer.disconnect()

        const start = performance.now()
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )

    observer.observe(node)

    // Safety net: if the observer never fires for any reason, don't leave the
    // number stuck at 0 — just show the correct value, unanimated.
    const fallback = setTimeout(() => {
      if (!settled) {
        settled = true
        observer.disconnect()
        setDisplay(value)
      }
    }, 2500)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
