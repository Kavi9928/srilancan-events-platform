import { prisma } from "@/lib/prisma"
import type { AboutContent } from "@/lib/types"

/** Shown until an admin saves their own copy — the About page is never blank. */
export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  storyTitle: "Cultural curators, not just event organizers",
  storyBody: [
    "For the past four years, SriLanCan Events has served as the premier gateway for Sri Lankan art and culture in Toronto, Canada.",
    "We are more than just event organizers; we are cultural curators dedicated to bringing the pulse of the island to the heart of North America.",
  ].join("\n"),
  quote:
    "The sounds, stories, and spirit of our homeland are never more than a ticket away.",
  quoteAuthor: "— The SriLanCan Events team",
  visionTitle: "To be the premier gateway for Sri Lankan art and culture in Canada.",
  visionBody:
    "More than event organizers — cultural curators bringing the pulse of the island to the heart of North America, so that the community here never loses touch with the culture it came from.",
  missionTitle:
    "Connect the Sri Lankan diaspora and the wider Canadian community with the finest entertainment Sri Lanka has to offer.",
  missionPoints: [
    "Bridge the distance between Colombo and Toronto",
    "Keep the sounds, stories, and spirit of our homeland a ticket away",
    "Bring Sri Lanka's iconic artists and rising stars to Canadian stages",
    "Give Sri Lankan cinema a home on the big screen in Canada",
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
