import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, ChevronDownIcon, ClapperboardIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Movie } from "@/lib/types"

const MAX_FAN_ITEMS = 7
const ANGLE_STEP = 11
const LIFT_PER_STEP = 16

function FanCard({ movie, index, mid }: { movie: Movie; index: number; mid: number }) {
  const offset = index - mid
  const angle = offset * ANGLE_STEP
  const lift = Math.abs(offset) * LIFT_PER_STEP

  return (
    <div
      className="group relative -mx-3 w-24 shrink-0 origin-bottom sm:w-32 md:w-40"
      style={{ transform: `rotate(${angle}deg) translateY(${lift}px)` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl shadow-2xl ring-1 ring-white/10">
        <Image
          src={movie.posterUrl}
          alt=""
          fill
          sizes="160px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>
  )
}

export function HeroFan({ movies }: { movies: Movie[] }) {
  const items = movies.slice(0, MAX_FAN_ITEMS)
  const mid = (items.length - 1) / 2

  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-28 sm:pt-28">
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          <ClapperboardIcon className="size-3.5" />
          Now streaming across Sri Lanka
        </span>

        <h1 className="mt-6 leading-[1.05]">
          <span
            className="block text-4xl text-white/80 italic sm:text-5xl"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            enter the world
          </span>
          <span
            className="mt-1 block text-4xl font-bold text-white sm:text-6xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            of Sri Lankan cinema.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm text-white/50 sm:text-base">
          Discover movies and events near you, and book your tickets in a few
          clicks.
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/movies" />}
          className="mt-7 rounded-full bg-white px-5 text-black hover:bg-white/90"
        >
          Explore Movies
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>

      {items.length > 0 ? (
        <div className="relative mt-16 sm:mt-20">
          <div className="flex items-end justify-center overflow-visible px-4">
            {items.map((movie, index) => (
              <FanCard key={movie.id} movie={movie} index={index} mid={mid} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
        </div>
      ) : null}

      <div className="relative z-10 mt-10 overflow-hidden border-t border-white/10 py-3">
        <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-8 text-xs tracking-wide text-white/40 uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 gap-8">
              <span>New releases every week</span>
              <span>&middot;</span>
              <span>Book tickets online</span>
              <span>&middot;</span>
              <span>Sri Lankan Events</span>
              <span>&middot;</span>
              <span>New releases every week</span>
              <span>&middot;</span>
              <span>Book tickets online</span>
              <span>&middot;</span>
              <span>Sri Lankan Events</span>
              <span>&middot;</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-4 flex justify-center">
        <ChevronDownIcon className="size-5 animate-bounce text-white/30" />
      </div>
    </section>
  )
}
