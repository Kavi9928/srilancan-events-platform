import { prisma } from "@/lib/prisma"
import type { AboutContent } from "@/lib/types"

/** Shown until an admin saves their own copy — the About page is never blank. */
export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  storyTitle: "Our story",
  storyBody: [
    "It started with a familiar frustration — a Sri Lankan film was screening somewhere in the city, and nobody heard about it until the weekend was over. Word travelled through group chats, flyers, and luck.",
    "We built Sri Lankan Events so that never has to happen again. One place where every screening, concert, and cultural night is listed properly, with real showtimes, real venues, and a ticket link that actually works.",
    "Today we bring events to communities across Canada — and we are only getting started.",
  ].join("\n"),
  quote:
    "Culture doesn't travel on its own. Someone has to carry it — and then hand it to the next generation.",
  quoteAuthor: "— The Sri Lankan Events team",
  visionTitle: "To be the heartbeat of Sri Lankan culture in Canada.",
  visionBody:
    "A future where no one in our community misses a moment that matters — where every film screening, every concert, and every celebration finds the people who have been waiting for it.",
  missionTitle:
    "Make every Sri Lankan event in Canada easy to find and effortless to attend.",
  missionPoints: [
    "Curate events that are genuinely worth your evening",
    "Make booking a ticket take seconds, not a phone call",
    "Cover every city where our community gathers",
    "Give Sri Lankan artists a stage far from home",
  ],
}

export async function getAboutContent(): Promise<AboutContent> {
  const content = await prisma.aboutContent.findFirst({ orderBy: { createdAt: "asc" } })
  if (!content) return DEFAULT_ABOUT_CONTENT

  return {
    storyTitle: content.storyTitle,
    storyBody: content.storyBody,
    quote: content.quote,
    quoteAuthor: content.quoteAuthor,
    visionTitle: content.visionTitle,
    visionBody: content.visionBody,
    missionTitle: content.missionTitle,
    missionPoints: content.missionPoints,
  }
}
