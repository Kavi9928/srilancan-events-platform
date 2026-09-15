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
              <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-black">
                {/* Portrait — desaturated until hover */}
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
                </div>

                {/* Details overlapping the portrait */}
                <div className="relative -mt-20 px-5 pb-6">
                  <p className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-[0.65rem] leading-snug font-bold tracking-[0.12em] text-transparent uppercase">
                    {member.role}
                  </p>
                  <h3 className="mt-1.5 text-lg leading-tight font-bold text-white">
                    {member.name}
                  </h3>
                  <span className="mt-2.5 block h-0.5 w-7 rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-500 group-hover:w-14" />

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
