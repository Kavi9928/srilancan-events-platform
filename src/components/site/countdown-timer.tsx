"use client"

import { useEffect, useState } from "react"

function getTimeParts(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime()
  // Computed fresh on every render (server and client), so if JS never runs the
  // SSR-rendered value stays visible and correct rather than freezing at 0/00.
  // Server vs. first client render can differ by a second or two — that's an
  // unavoidable, harmless clock mismatch, suppressed below rather than treated
  // as a hydration error. The interval then keeps it ticking client-side.
  const [parts, setParts] = useState(() => getTimeParts(target))

  useEffect(() => {
    const interval = setInterval(() => setParts(getTimeParts(target)), 1000)
    return () => clearInterval(interval)
  }, [target])

  const units = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ]

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex w-16 flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 py-3 backdrop-blur-sm sm:w-20"
        >
          <span
            suppressHydrationWarning
            className="text-2xl font-black text-white tabular-nums sm:text-3xl"
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
