"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  /** ms, for staggering a group of siblings */
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Starts already visible (never opacity-0) so content is never at the mercy of
  // JS actually running — a scroll animation is a nice-to-have, not a requirement
  // to see the page. Only a subtle position offset is gated behind JS.
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isRevealed ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-transform duration-700 ease-out",
        isRevealed ? "translate-y-0" : "translate-y-8",
        className
      )}
    >
      {children}
    </div>
  )
}
