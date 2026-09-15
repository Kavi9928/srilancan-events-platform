import type { Metadata } from "next"
import Link from "next/link"
import {
  SparklesIcon,
  EyeIcon,
  TargetIcon,
  HeartIcon,
  UsersIcon,
  TicketIcon,
  CheckIcon,
  ArrowRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/site/scroll-reveal"
import { StatsSection } from "@/components/site/stats-section"
import { TeamSection } from "@/components/site/team-section"
import { getSiteStats } from "@/lib/site-stats"
import { getAboutContent } from "@/lib/about"
import { listTeamMembers } from "@/lib/team"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sri Lankan Events brings Sri Lankan films, concerts, and cultural celebrations to communities across Canada.",
}

const VALUES = [
  {
    icon: UsersIcon,
    title: "Community first",
    description:
      "Every decision starts with one question — does this bring our community closer together?",
  },
  {
    icon: HeartIcon,
    title: "Culture with care",
    description:
      "We treat the films, music, and traditions we platform with the respect they deserve.",
  },
  {
    icon: TicketIcon,
    title: "Effortless from start to seat",
    description:
      "Finding an event and holding a ticket should never take more than a couple of minutes.",
  },
]

export default async function AboutPage() {
  const [stats, about, teamMembers] = await Promise.all([
    getSiteStats(),
    getAboutContent(),
    listTeamMembers(),
  ])

  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_15%_10%,rgba(249,115,22,0.1),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <ScrollReveal>
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-white/5 px-4 py-1.5">
              <SparklesIcon className="h-3.5 w-3.5 text-red-400" />
              <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
                Who we are
              </span>
            </div>
            <h1 className="text-4xl font-black text-white sm:text-5xl">
              Bringing Sri Lanka{" "}
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                closer to home
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Sri Lankan Events is where our community in Canada finds the films, concerts, and
              celebrations that keep home close — all in one place, all a few taps away.
            </p>
          </div>
        </ScrollReveal>

        {/* Story */}
        <ScrollReveal delay={100}>
          <div className="mt-16 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="space-y-4 text-white/70">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{about.storyTitle}</h2>
              {about.storyBody.split("\n").map((paragraph, index) =>
                paragraph.trim() ? <p key={index}>{paragraph}</p> : null
              )}
            </div>

            {about.quote ? (
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/15 via-white/5 to-orange-500/10 p-8">
                <div className="text-5xl leading-none font-black text-red-500/40">&ldquo;</div>
                <p className="mt-2 text-lg leading-relaxed font-medium text-white">{about.quote}</p>
                {about.quoteAuthor ? (
                  <p className="mt-4 text-sm text-white/50">{about.quoteAuthor}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </ScrollReveal>
      </div>

      {/* Stats (full-bleed) */}
      <StatsSection stats={stats} />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <ScrollReveal>
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
              What drives us
            </span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">Vision &amp; Mission</h2>
          </div>
        </ScrollReveal>

        <div className="relative mt-14">
          {/* Connecting line between the two panels */}
          <div className="pointer-events-none absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-red-500/40 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Vision */}
            <ScrollReveal>
              <div className="rounded-[2rem] bg-gradient-to-br from-red-500/50 via-white/10 to-transparent p-px">
                <div className="relative h-full overflow-hidden rounded-[2rem] bg-black/85 p-8 sm:p-10">
                  <EyeIcon className="pointer-events-none absolute -top-8 -right-8 h-44 w-44 text-white/[0.03]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <span className="bg-gradient-to-br from-red-500 to-orange-400 bg-clip-text text-5xl leading-none font-black text-transparent">
                        01
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
                        <EyeIcon className="h-5 w-5 text-red-400" />
                      </div>
                    </div>

                    <p className="mt-6 text-xs font-bold tracking-[0.2em] text-red-400 uppercase">
                      Our Vision
                    </p>
                    <h3 className="mt-3 text-2xl leading-snug font-bold text-white">
                      {about.visionTitle}
                    </h3>
                    <p className="mt-4 leading-relaxed text-white/60">{about.visionBody}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission — offset for asymmetry */}
            <ScrollReveal delay={150} className="lg:mt-20">
              <div className="rounded-[2rem] bg-gradient-to-br from-orange-500/50 via-white/10 to-transparent p-px">
                <div className="relative h-full overflow-hidden rounded-[2rem] bg-black/85 p-8 sm:p-10">
                  <TargetIcon className="pointer-events-none absolute -top-8 -right-8 h-44 w-44 text-white/[0.03]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <span className="bg-gradient-to-br from-orange-400 to-rose-500 bg-clip-text text-5xl leading-none font-black text-transparent">
                        02
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
                        <TargetIcon className="h-5 w-5 text-orange-400" />
                      </div>
                    </div>

                    <p className="mt-6 text-xs font-bold tracking-[0.2em] text-orange-400 uppercase">
                      Our Mission
                    </p>
                    <h3 className="mt-3 text-2xl leading-snug font-bold text-white">
                      {about.missionTitle}
                    </h3>

                    <ul className="mt-6 space-y-3">
                      {about.missionPoints.map((point) => (
                        <li key={point} className="flex gap-3 text-white/60">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/15">
                            <CheckIcon className="h-3 w-3 text-orange-400" />
                          </span>
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Values */}
        <ScrollReveal className="mt-24">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What we stand for</h2>
            <p className="mx-auto max-w-xl text-white/60">
              Three things we hold onto, no matter how much we grow.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {VALUES.map((value, index) => {
            const Icon = value.icon
            return (
              <ScrollReveal key={value.title} delay={index * 120}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-500/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Team */}
        <TeamSection members={teamMembers} />

        {/* CTA */}
        <ScrollReveal className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/20 via-black to-orange-500/10 p-10 text-center">
            <div className="pointer-events-none absolute -inset-x-20 -top-20 h-40 rounded-full bg-red-600/20 blur-3xl" />
            <div className="relative space-y-5">
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                Come be part of the next one
              </h2>
              <p className="mx-auto max-w-lg text-white/70">
                Browse what&apos;s playing near you, or reach out if you&apos;d like to host or
                partner on an event.
              </p>
              <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row">
                <Button
                  nativeButton={false}
                  render={<Link href="/movies" />}
                  className="bg-gradient-to-r from-red-600 to-orange-500 shadow-lg shadow-red-500/20 hover:from-red-700 hover:to-orange-600"
                >
                  Browse events
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/contact" />}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
