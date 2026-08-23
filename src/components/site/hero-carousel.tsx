"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react"
import type { Movie } from "@/lib/types"

const HERO_IMAGES = [
  { id: 1, src: "https://picsum.photos/seed/hero-cinema-1/1600/900", alt: "Cinema experience" },
  { id: 2, src: "https://picsum.photos/seed/hero-cinema-2/1600/900", alt: "Live events" },
  { id: 3, src: "https://picsum.photos/seed/hero-cinema-3/1600/900", alt: "Entertainment" },
  { id: 4, src: "https://picsum.photos/seed/hero-cinema-4/1600/900", alt: "Movie night" },
]

export function HeroCarousel({ movies }: { movies: Movie[] }) {
  return (
    <section className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-red-950 to-black">
      {/* Animated background carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-slides-wrapper absolute inset-0">
          <div className="hero-slides-track flex h-full">
            {[...HERO_IMAGES, ...HERO_IMAGES].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="hero-slide relative h-full w-screen flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index < 4}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                {/* Accent gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-transparent to-black/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 animate-pulse rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-200">Sri Lankan Cinema & Events</span>
          </div>

          {/* Main headline with gradient */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-white drop-shadow-lg">Discover</span>
              <span className="block bg-gradient-to-r from-red-400 via-rose-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                Epic Events
              </span>
              <span className="block text-white drop-shadow-lg">&amp; Cinema</span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-100 drop-shadow-md animate-fade-in animation-delay-200">
            Experience the magic of Sri Lankan cinema and live entertainment. Book your tickets now and be part of unforgettable moments.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-center pt-4 animate-fade-in animation-delay-400">
            <Button
              nativeButton={false}
              render={<Link href="/movies" />}
              className="rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-red-500/50 hover:from-red-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
            >
              Explore Events
              <ArrowRightIcon className="size-5" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/coming-soon" />}
              className="rounded-full border-2 border-red-400/50 bg-transparent px-8 py-4 text-lg font-semibold text-red-200 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="size-8 text-red-400/60" />
      </div>

      <style jsx>{`
        .hero-slides-wrapper {
          perspective: 1000px;
        }

        .hero-slides-track {
          animation: hero-carousel-scroll 16s linear infinite;
        }

        @keyframes hero-carousel-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  )
}
