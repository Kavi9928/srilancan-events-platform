import { ClapperboardIcon, MapPinIcon, NewspaperIcon } from "lucide-react"

import { CountUp } from "@/components/site/count-up"
import { ScrollReveal } from "@/components/site/scroll-reveal"
import type { SiteStats } from "@/lib/site-stats"

export function StatsSection({ stats }: { stats: SiteStats }) {
  const tiles = [
    { label: "Movies & Events", value: stats.movieCount, icon: ClapperboardIcon, suffix: "+" },
    { label: "Cities Covered", value: stats.locationCount, icon: MapPinIcon, suffix: "" },
    { label: "Articles Published", value: stats.blogPostCount, icon: NewspaperIcon, suffix: "" },
  ].filter((tile) => tile.value > 0)

  if (tiles.length < 2) return null

  return (
    <section className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] border-y border-white/10 bg-gradient-to-r from-black via-gray-950 to-black py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))` }}
        >
          {tiles.map((tile, index) => {
            const Icon = tile.icon
            return (
              <ScrollReveal key={tile.label} delay={index * 100}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className="mb-1 h-7 w-7 text-red-400" />
                  <div className="text-4xl font-black text-white sm:text-5xl">
                    <CountUp value={tile.value} suffix={tile.suffix} />
                  </div>
                  <p className="text-sm font-medium text-white/60">{tile.label}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
