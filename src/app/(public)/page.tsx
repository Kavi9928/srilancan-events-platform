import { EventsGalleryCarousel } from "@/components/site/events-gallery-carousel"
import { EventsFilter } from "@/components/site/events-filter"
import { BlogSection } from "@/components/site/blog-section"

export default async function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <EventsGalleryCarousel />

      {/* Events Filter Section */}
      <EventsFilter />

      {/* Blog Section */}
      <div className="py-16">
        <BlogSection />
      </div>
    </div>
  )
}
