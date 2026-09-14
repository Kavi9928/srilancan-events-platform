import { SearchIcon, TicketIcon, PartyPopperIcon } from "lucide-react"

import { ScrollReveal } from "@/components/site/scroll-reveal"

const STEPS = [
  {
    icon: SearchIcon,
    title: "Browse events",
    description: "Explore movies and events by city, genre, or what's playing right now.",
  },
  {
    icon: TicketIcon,
    title: "Book your tickets",
    description: "Tap \"Book Tickets\" and complete your purchase securely through Ticket Tailor.",
  },
  {
    icon: PartyPopperIcon,
    title: "Enjoy the show",
    description: "Show up with your ticket and enjoy — it's that simple.",
  },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12 space-y-3 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-xl text-white/70">
            Getting to your next event takes three simple steps.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <ScrollReveal key={step.title} delay={index * 150}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/10">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-500/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mb-2 text-xs font-semibold tracking-wider text-red-400">
                  STEP {index + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-white/60">{step.description}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
