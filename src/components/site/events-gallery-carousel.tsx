"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SparklesIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Live Cinema",
    image: "https://picsum.photos/seed/event-1/600/800",
    description: "Experience the magic of cinema with exclusive screenings and live performances.",
  },
  {
    id: 2,
    title: "Cultural Events",
    image: "https://picsum.photos/seed/event-2/600/800",
    description: "Celebrate Sri Lankan heritage with traditional music, dance, and performances.",
  },
  {
    id: 3,
    title: "Live Concerts",
    image: "https://picsum.photos/seed/event-3/600/800",
    description: "World-class musicians performing classical and contemporary music.",
  },
]

export function EventsGalleryCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % GALLERY_ITEMS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])


  return (
    <section className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-black via-gray-950 to-gray-900 h-screen flex items-center px-4 sm:px-8 lg:px-16 py-16 overflow-hidden">
      {/* Animated background glow effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-orange-600 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Left Content Section */}
      <div className={`flex-1 max-w-2xl z-10 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 backdrop-blur-md mb-8 hover:border-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
          <SparklesIcon className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-sm font-semibold text-red-300">Premium Events Selection</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          <span className="block">Discover</span>
          <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Unforgettable
          </span>
          <span className="block">Experiences</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed mb-8">
          Curated selection of premium events and cinema. From world-class performances to cultural celebrations, find your next unforgettable moment.
        </p>

        {/* Services */}
        <div className="flex gap-6 mb-12">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all">
            <span className="text-2xl">📽️</span>
            <div>
              <p className="font-semibold text-red-300 text-sm">Curated Events</p>
              <p className="text-xs text-gray-400">Hand-picked</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold text-orange-300 text-sm">Quick Booking</p>
              <p className="text-xs text-gray-400">In seconds</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-rose-300 text-sm">Best Deals</p>
              <p className="text-xs text-gray-400">Save more</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            nativeButton={false}
            render={<Link href="/movies" />}
            className="group rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-2xl hover:shadow-red-500/50 hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center"
          >
            <span>Explore Now</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/coming-soon" />}
            className="rounded-full border-2 border-red-400/60 bg-white/5 backdrop-blur-sm px-8 py-4 text-lg font-bold text-red-200 hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
          >
            Coming Soon
          </Button>
        </div>
      </div>

      {/* Right Carousel Section - 3 Cards (Front, Left, Right) */}
      <div className={`flex-1 flex justify-end items-center z-10 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <div className="relative w-full h-screen flex items-center justify-center" style={{ perspective: "1200px" }}>
          <div className="relative w-full h-80 flex justify-center items-center">
            {GALLERY_ITEMS.map((item, index) => {
              const diff = (index - current + GALLERY_ITEMS.length) % GALLERY_ITEMS.length

              let rotateY = 0
              let translateX = 0
              let translateZ = 0
              let scale = 0.5
              let opacity = 0
              let zIndex = 0

              // Only show 3 cards: center (0), right (1), left (2)
              if (diff === 0) {
                // Front/Center - Featured
                rotateY = 0
                translateX = 0
                translateZ = 0
                scale = 1
                opacity = 1
                zIndex = 50
              } else if (diff === 1) {
                // Right
                rotateY = -35
                translateX = 160
                translateZ = -80
                scale = 0.8
                opacity = 0.95
                zIndex = 30
              } else if (diff === GALLERY_ITEMS.length - 1) {
                // Left
                rotateY = 35
                translateX = -160
                translateZ = -80
                scale = 0.8
                opacity = 0.95
                zIndex = 30
              }

              return (
                <div
                  key={item.id}
                  className="absolute w-72 h-96 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group"
                  style={{
                    transform: `rotateY(${rotateY}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Glow border effect on center card */}
                  {diff === 0 && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                  )}

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={diff === 0}
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-300" />

                  {/* Content - center card only */}
                  {diff === 0 && (
                    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                      <span className="text-amber-400 text-xs font-semibold px-3 py-1 bg-amber-600/30 rounded-full w-fit">Featured</span>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200 text-xs leading-relaxed">{item.description}</p>
                      </div>
                      <button className="w-fit px-5 py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50">
                        Book Now
                      </button>
                    </div>
                  )}

                  {/* Title on side cards */}
                  {diff !== 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-semibold text-center group-hover:text-red-400 transition-colors">{item.title}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
