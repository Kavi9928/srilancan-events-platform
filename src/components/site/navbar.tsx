"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "All Movies", href: "/movies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

// Hysteresis: enter the floating state at 300px, leave it at 200px so
// scrolling around the threshold can't flip the navbar back and forth.
const ENTER_FLOAT_AT = 300
const EXIT_FLOAT_AT = 200

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      setIsScrolled((prev) => (prev ? y > EXIT_FLOAT_AT : y > ENTER_FLOAT_AT))
    }

    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    // Run once so a reload part-way down the page starts in the right state.
    update()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Close the mobile menu after navigating. Reacting to the router changing
  // route — an external system — rather than deriving state during render;
  // the in-menu links close it themselves, so this is what covers browser
  // back/forward while the menu is open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
  }, [pathname])

  return (
    // The sticky shell keeps a constant height and stays pinned to the top of
    // the viewport, so nothing below it ever shifts. Only the pill inside it
    // animates — width, radius and height all transition cleanly because the
    // element never changes its position type.
    // (flex, so the pill's top margin offsets it inside the shell instead of
    // collapsing out and dragging the whole shell down with it.)
    <div className="pointer-events-none sticky top-0 z-50 flex h-20 flex-col">
      <nav
        className={`pointer-events-auto relative mx-auto flex flex-col transition-all duration-500 ease-out ${
          isScrolled
            ? "mt-3 w-[95%] max-w-4xl rounded-2xl border border-white/10 shadow-2xl shadow-red-500/20"
            : "mt-0 w-full rounded-none border-x-0 border-t-0 border-b border-white/10"
        }`}
      >
        {/* Glow that bleeds out past the pill edges once it is floating */}
        <div
          className={`absolute -inset-1 -z-10 rounded-[inherit] bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 blur-md transition-opacity duration-500 ${
            isScrolled ? "opacity-60" : "opacity-0"
          }`}
        />

        {/* Background + accent layers, clipped to the current corner radius */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          <div
            className={`absolute inset-0 backdrop-blur-3xl transition-colors duration-500 ${
              isScrolled ? "bg-black/90" : "bg-black/80"
            }`}
          />
          <div className="absolute left-0 top-0 h-px w-96 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-96 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(249,115,22,0.05),transparent_50%)]" />
        </div>

        {/* Content */}
        <div
          className={`mx-auto w-full transition-all duration-500 ${
            isScrolled ? "max-w-full px-6" : "max-w-7xl px-4 sm:px-6 lg:px-8"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-500 ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Left - Logo (No Background) */}
            <Link href="/" className="group relative flex-shrink-0">
              {/* Glow effect */}
              <div
                className={`absolute -inset-2 -z-10 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-rose-500 blur transition-opacity duration-500 ${
                  isScrolled ? "opacity-10" : "opacity-20"
                } group-hover:opacity-40`}
              />

              <Image
                src="/logo.png"
                alt="SriLanCAN Events"
                width={120}
                height={60}
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? "h-12" : "h-14"
                }`}
                priority
              />
            </Link>

            {/* Center - Navigation Links */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative px-4 text-sm font-medium transition-all duration-300 ${
                      isActive ? "text-red-400" : "text-white/70 hover:text-white"
                    } ${isScrolled ? "py-2" : "py-2.5"}`}
                  >
                    {isActive && (
                      <>
                        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20" />
                        <Sparkles className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 animate-pulse text-red-400" />
                      </>
                    )}
                    <span className={isActive ? "ml-4" : ""}>{link.label}</span>

                    {/* Underline animation */}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right - CTA Button */}
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/movies"
                className="group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 transition-opacity group-hover:opacity-90" />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Text */}
                <span className="relative block transition-transform duration-300 group-hover:scale-105">
                  Book Now
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="rounded-lg border border-white/10 p-2.5 transition-colors hover:border-white/20 hover:bg-white/10 lg:hidden"
            >
              {isOpen ? (
                <XIcon className="h-5 w-5 text-white" />
              ) : (
                <MenuIcon className="h-5 w-5 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="space-y-2 border-t border-white/10 pb-4 pt-4 lg:hidden">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 font-medium transition-all ${
                    pathname === link.href
                      ? "border border-red-500/30 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white"
                      : "border border-transparent text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/movies"
                onClick={() => setIsOpen(false)}
                className="mt-4 block rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3 text-center font-semibold text-white transition-all hover:shadow-lg hover:shadow-red-500/50"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
