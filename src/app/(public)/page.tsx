import { EventsGalleryCarousel } from "@/components/site/events-gallery-carousel"
import { GenreTicker } from "@/components/site/genre-ticker"
import { StatsSection } from "@/components/site/stats-section"
import { EventsFilter } from "@/components/site/events-filter"
import { ComingUpNext } from "@/components/site/coming-up-next"
import { HowItWorks } from "@/components/site/how-it-works"
import { BlogSection } from "@/components/site/blog-section"
import { NewsletterSection } from "@/components/site/newsletter-section"
import {
  getFeaturedMovies,
  getNowShowingMovies,
  getComingSoonMovies,
  getDistinctGenres,
} from "@/lib/movies"
import { listLocations } from "@/lib/locations"
import { getPublishedBlogPosts } from "@/lib/blog"
import { getSiteStats } from "@/lib/site-stats"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [featuredMovies, nowShowing, comingSoon, locations, blogPosts, genres, stats] =
    await Promise.all([
      getFeaturedMovies(),
      getNowShowingMovies(),
      getComingSoonMovies(),
      listLocations(),
      getPublishedBlogPosts(5),
      getDistinctGenres(),
      getSiteStats(),
    ])

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <EventsGalleryCarousel movies={featuredMovies} />

      {/* Genre Ticker */}
      <GenreTicker genres={genres} />

      {/* Stats Bar */}
      <StatsSection stats={stats} />

      {/* Events Filter Section */}
      <EventsFilter locations={locations} nowShowing={nowShowing} comingSoon={comingSoon} />

      {/* Coming Up Next Spotlight */}
      <ComingUpNext movie={comingSoon[0] ?? null} />

      {/* How It Works */}
      <HowItWorks />

      {/* Blog Section */}
      <div className="py-16">
        <BlogSection posts={blogPosts} />
      </div>

      {/* Newsletter Signup */}
      <NewsletterSection />
    </div>
  )
}
