import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { CountdownTimer } from "@/components/site/countdown-timer"
import { ScrollReveal } from "@/components/site/scroll-reveal"
import type { Movie } from "@/lib/types"

export function ComingUpNext({ movie }: { movie: Movie | null }) {
  if (!movie) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <div className="absolute inset-0">
            <Image
              src={movie.bannerUrl}
              alt=""
              fill
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          </div>

          <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-1.5 text-xs font-semibold text-red-300">
                Coming Up Next
              </span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">{movie.title}</h2>
              <p className="line-clamp-2 text-white/70">{movie.description}</p>
              <Link
                href={`/movies/${movie.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300"
              >
                See details
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <CountdownTimer targetDate={movie.releaseDate} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
