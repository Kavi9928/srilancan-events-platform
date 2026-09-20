import type { Movie, Screening } from "@/lib/types"
import { SITE_URL, absoluteUrl } from "@/lib/site-url"
import { SOCIAL_LINKS } from "@/lib/social-links"

/**
 * JSON-LD builders. Search engines use these for rich results, and answer
 * engines lean on them even harder, because structured facts are cheaper to
 * extract than prose.
 *
 * Every builder returns `null` rather than a partial object when required
 * fields are missing: incomplete markup fails validation, which is worse than
 * emitting none at all.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "SriLanCan Events",
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    email: "info@srilancanevents.ca",
    description:
      "The premier gateway for Sri Lankan art and culture in Toronto, Canada — concerts, film premieres and cultural celebrations.",
    areaServed: { "@type": "Country", name: "Canada" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    parentOrganization: { "@type": "Organization", name: "Rupane Media Network" },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "SriLanCan Events",
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/movies?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

/**
 * One Event per screening — a screening is what actually has a start time and
 * a venue. With no screenings there is nothing valid to describe, so this
 * returns null and the page emits no Event markup.
 */
export function movieEventSchema(movie: Movie, screenings: Screening[]) {
  const dated = screenings.filter((screening) => Boolean(screening.startTime))
  if (dated.length === 0) return null

  return dated.map((screening) => {
    const ticketUrl = screening.ticketUrl ?? movie.ticketUrl

    return {
      "@context": "https://schema.org",
      "@type": "ScreeningEvent",
      name: movie.title,
      description: movie.description,
      image: [movie.bannerUrl, movie.posterUrl].filter(Boolean),
      startDate: new Date(screening.startTime).toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      url: absoluteUrl(`/movies/${movie.slug}`),
      organizer: { "@id": ORGANIZATION_ID },
      // A screening carries its own venue; Movie only holds a locationId, so
      // there is no loaded relation to read a city from here.
      location: {
        "@type": "Place",
        name: screening.venue ?? "Toronto, Ontario",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toronto",
          addressRegion: "ON",
          addressCountry: "CA",
        },
      },
      ...(ticketUrl
        ? {
            offers: {
              "@type": "Offer",
              url: ticketUrl,
              availability: "https://schema.org/InStock",
              validFrom: new Date(movie.createdAt).toISOString(),
            },
          }
        : {}),
    }
  })
}

/** Falls back to describing the film itself, which is valid with no showtimes. */
export function movieSchema(movie: Movie) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.description,
    image: movie.posterUrl,
    url: absoluteUrl(`/movies/${movie.slug}`),
    ...(movie.genres.length > 0 ? { genre: movie.genres } : {}),
    ...(movie.languages.length > 0 ? { inLanguage: movie.languages } : {}),
    ...(movie.durationMinutes ? { duration: `PT${movie.durationMinutes}M` } : {}),
    ...(movie.releaseDate
      ? { datePublished: new Date(movie.releaseDate).toISOString().slice(0, 10) }
      : {}),
    ...(movie.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: movie.rating,
            bestRating: 10,
            ratingCount: 1,
          },
        }
      : {}),
  }
}

export function blogPostingSchema(post: {
  title: string
  excerpt: string
  slug: string
  imageUrl: string
  author: string
  publishedAt: string
  updatedAt: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ORGANIZATION_ID },
  }
}
