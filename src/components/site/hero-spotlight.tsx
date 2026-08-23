"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import type { Movie } from "@/lib/types"

const SHOWCASE_IMAGES = [
  { id: 1, src: "https://picsum.photos/seed/showcase-1/280/400", alt: "Event showcase 1" },
  { id: 2, src: "https://picsum.photos/seed/showcase-2/280/400", alt: "Event showcase 2" },
  { id: 3, src: "https://picsum.photos/seed/showcase-3/280/400", alt: "Event showcase 3" },
  { id: 4, src: "https://picsum.photos/seed/showcase-4/280/400", alt: "Event showcase 4" },
  { id: 5, src: "https://picsum.photos/seed/showcase-5/280/400", alt: "Event showcase 5" },
  { id: 6, src: "https://picsum.photos/seed/showcase-6/280/400", alt: "Event showcase 6" },
  { id: 7, src: "https://picsum.photos/seed/showcase-7/280/400", alt: "Event showcase 7" },
  { id: 8, src: "https://picsum.photos/seed/showcase-8/280/400", alt: "Event showcase 8" },
]

export function HeroSpotlight({ movies }: { movies: Movie[] }) {
  return (
    <section className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-[#F5E6D3] via-[#FBF5ED] to-[#F0DCC8] min-h-screen flex flex-col justify-center pt-20 pb-16 px-4 sm:px-6">
      {/* Content container */}
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/60 px-4 py-2 text-sm font-medium text-amber-900 border border-amber-200/50">
          <span className="h-2 w-2 rounded-full bg-amber-700" />
          Experience Sri Lankan Entertainment
        </div>

        {/* Main headline */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
            Discover Events & Cinema That Inspire
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Book tickets to the hottest movies, live events, and cultural experiences happening across Sri Lanka. From blockbuster releases to exclusive screenings.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            nativeButton={false}
            render={<Link href="/movies" />}
            className="rounded-full bg-gradient-to-r from-amber-700 to-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-amber-700/50 hover:from-amber-800 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
          >
            Explore Events Now
            <ArrowRightIcon className="size-5" />
          </Button>
        </div>
      </div>

      {/* Showcase carousel */}
      <div className="mt-16 w-full">
        <div className="showcase-wrapper overflow-hidden px-4">
          <div className="showcase-track flex gap-4 sm:gap-6 justify-center">
            {[...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="showcase-card group relative flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-60 h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-amber-100/30"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="w-full h-full object-cover"
                  priority={index < 8}
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .showcase-wrapper {
          width: 100%;
        }

        .showcase-track {
          animation: carousel-flow 60s linear infinite;
          will-change: transform;
        }

        .showcase-wrapper:hover .showcase-track {
          animation-play-state: paused;
        }

        @keyframes carousel-flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1.5rem));
          }
        }

        @media (max-width: 640px) {
          .showcase-track {
            animation-duration: 45s;
          }
        }
      `}</style>
    </section>
  )
}
