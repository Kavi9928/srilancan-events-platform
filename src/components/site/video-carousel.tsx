"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const CAROUSEL_ITEMS = [
  { id: 1, src: "https://picsum.photos/seed/carousel-1/320/400", alt: "Colorful fruit slices" },
  { id: 2, src: "https://picsum.photos/seed/carousel-2/320/400", alt: "Interior design moment" },
  { id: 3, src: "https://picsum.photos/seed/carousel-3/320/400", alt: "Ocean cliff view" },
  { id: 4, src: "https://picsum.photos/seed/carousel-4/320/400", alt: "Hands working detail" },
  { id: 5, src: "https://picsum.photos/seed/carousel-5/320/400", alt: "Grapefruit close-up" },
  { id: 6, src: "https://picsum.photos/seed/carousel-6/320/400", alt: "Woman portrait" },
  { id: 7, src: "https://picsum.photos/seed/carousel-7/320/400", alt: "Night city scene" },
]

export function VideoCarousel() {
  return (
    <section className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[#F8F5EE] py-16 sm:py-20">
      <div className="flex flex-col items-center text-center px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Engage Audiences with Stunning Videos
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg mb-12">
          Boost Your Brand with High-Impact Short Videos from our expert content creators. Our team is ready to propel your business forward
        </p>

        <div className="w-screen relative overflow-hidden mb-12">
          <div className="carousel-track-wrapper overflow-hidden">
            <div className="carousel-track flex gap-5 sm:gap-6 px-4">
              {/* Render cards twice for infinite loop illusion */}
              {[...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="carousel-card flex-shrink-0 w-52 sm:w-64 md:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={320}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={index < 7}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/movies" />}
          className="rounded-full bg-gray-900 px-8 py-3 text-base sm:text-lg text-white hover:bg-gray-800 transition-colors"
        >
          Get Started
        </Button>
      </div>

      <style jsx>{`
        .carousel-track-wrapper {
          width: 100%;
        }

        .carousel-track {
          animation: carousel-scroll 45s linear infinite;
        }

        .carousel-track-wrapper:hover .carousel-track {
          animation-play-state: paused;
        }

        @keyframes carousel-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1.25rem));
          }
        }

        @media (max-width: 640px) {
          @keyframes carousel-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 1rem));
            }
          }
        }
      `}</style>
    </section>
  )
}
