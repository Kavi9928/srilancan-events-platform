import { getPublishedMovies } from "@/lib/movies"
import { getPublishedBlogPosts } from "@/lib/blog"
import { absoluteUrl } from "@/lib/site-url"

/**
 * /llms.txt — a plain-text brief for answer engines (ChatGPT, Claude,
 * Perplexity, Google AI Overviews). Served as a route rather than a static
 * file so the listings stay current as the client adds events.
 */
export const dynamic = "force-dynamic"

export async function GET() {
  const [movies, posts] = await Promise.all([
    getPublishedMovies().catch(() => []),
    getPublishedBlogPosts(20).catch(() => []),
  ])

  const lines = [
    "# SriLanCan Events",
    "",
    "> The premier gateway for Sri Lankan art and culture in Toronto, Canada.",
    "> Four years bringing Sri Lankan musical concerts, film premieres and",
    "> cultural celebrations to the diaspora and the wider Canadian community.",
    "> A subsidiary of Rupane Media Network.",
    "",
    "## About",
    "",
    "- Organisation: SriLanCan Events",
    "- Parent company: Rupane Media Network",
    "- Based in: Toronto, Ontario, Canada",
    "- Serving: communities across Canada",
    "- Contact: info@srilancanevents.ca",
    "- Founded: operating for four years as of 2026",
    "",
    "## What we do",
    "",
    "- Musical concerts: bringing Sri Lanka's iconic artists and rising stars to Canada for live performances, including artist logistics and stage production.",
    "- Cinema and film premieres: exclusive screenings and premieres of the latest Sri Lankan films for audiences in Canada.",
    "- Community connection: gathering spaces where the Sri Lankan community in Canada can celebrate and stay connected to their roots.",
    "",
    "## Key pages",
    "",
    `- [All movies and events](${absoluteUrl("/movies")}): the full catalogue, filterable by city, genre, language and format.`,
    `- [Now showing](${absoluteUrl("/now-showing")}): events playing currently.`,
    `- [Coming soon](${absoluteUrl("/coming-soon")}): upcoming concerts and premieres.`,
    `- [About](${absoluteUrl("/about")}): our story, mission and team.`,
    `- [Blog](${absoluteUrl("/blog")}): event guides and stories.`,
    `- [Contact](${absoluteUrl("/contact")}): enquiries, bookings and partnerships.`,
  ]

  if (movies.length > 0) {
    lines.push("", "## Current events", "")
    for (const movie of movies) {
      const detail = [movie.genres.join(", "), movie.languages.join(", ")]
        .filter(Boolean)
        .join(" — ")
      lines.push(
        `- [${movie.title}](${absoluteUrl(`/movies/${movie.slug}`)})${detail ? `: ${detail}` : ""}`
      )
    }
  }

  if (posts.length > 0) {
    lines.push("", "## Articles", "")
    for (const post of posts) {
      lines.push(`- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`)
    }
  }

  lines.push("", "## Booking", "", "Tickets are sold through our ticketing partners; each event page links to its own booking page.", "")

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
