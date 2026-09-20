import Image from "next/image"

import { ScrollReveal } from "@/components/site/scroll-reveal"
import type { TeamMember } from "@/lib/types"

export function TeamSection({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null

  return (
    <div className="mt-24">
      <ScrollReveal>
        <div className="space-y-3 text-center">
          <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
            The people behind it
          </span>
          <h2 className="text-3xl font-black text-white sm:text-4xl">Meet the team</h2>
        </div>
      </ScrollReveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {members.map((member, index) => (
          <ScrollReveal key={member.id} delay={index * 80} className="lg:even:mt-10">
            <div className="group h-full rounded-[1.75rem] bg-gradient-to-br from-red-500/40 via-white/10 to-transparent p-px transition-all duration-500 hover:from-red-500 hover:via-orange-400/60">
              <div className="relative flex h-full flex-col rounded-[1.75rem] bg-black px-5 pt-7 pb-6 text-center">
                {/* A circular mask rather than a full-bleed rectangle: it suits
                    an ordinary head-and-shoulders photo, and it also crops away
                    the flat backdrop on portraits that arrive as a circle
                    already drawn on a light square. */}
                <div className="relative mx-auto aspect-square w-full max-w-[10.5rem]">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/10 transition-all duration-500 group-hover:ring-red-500/40">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 60vw, (max-width: 768px) 40vw, (max-width: 1024px) 25vw, 11rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  {member.role ? (
                    <p className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-[0.65rem] leading-snug font-bold tracking-[0.12em] text-transparent uppercase">
                      {member.role}
                    </p>
                  ) : null}
                  <h3
                    className={`text-lg leading-tight font-bold text-white ${
                      member.role ? "mt-1.5" : ""
                    }`}
                  >
                    {member.name}
                  </h3>
                  <span className="mx-auto mt-2.5 block h-0.5 w-7 rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-500 group-hover:w-14" />

                  {member.bio ? (
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-2.5 text-xs leading-relaxed text-white/60">{member.bio}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
