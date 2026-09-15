import Link from "next/link"
import {
  ClapperboardIcon,
  MapPinIcon,
  NewspaperIcon,
  MailIcon,
  SparklesIcon,
  ClockIcon,
  TriangleAlertIcon,
  PencilIcon,
  InboxIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { listMoviesForAdmin, getUpcomingScreeningsForAdmin } from "@/lib/admin-movies"
import { getBlogStatsForAdmin } from "@/lib/admin-blog"
import { getLocationCount } from "@/lib/locations"
import { getNewsletterSubscriberCount } from "@/lib/newsletter"
import { getRecentInquiriesForAdmin, getUnreadInquiryCount } from "@/lib/admin-contact"
import { computeEffectiveStatus, statusLabel } from "@/lib/movie-status"
import { formatReleaseDate, formatDateTime } from "@/lib/format"

export const dynamic = "force-dynamic"

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-4" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-semibold">{value}</CardContent>
    </Card>
  )
}

export default async function AdminDashboardPage() {
  const [
    movies,
    locationCount,
    blogStats,
    subscriberCount,
    upcomingScreenings,
    recentInquiries,
    unreadInquiryCount,
  ] = await Promise.all([
    listMoviesForAdmin(),
    getLocationCount(),
    getBlogStatsForAdmin(),
    getNewsletterSubscriberCount(),
    getUpcomingScreeningsForAdmin(5),
    getRecentInquiriesForAdmin(5),
    getUnreadInquiryCount(),
  ])

  const effectiveStatuses = movies.map((movie) =>
    computeEffectiveStatus(movie.status, movie.releaseDate)
  )
  const counts = {
    nowShowing: effectiveStatuses.filter((status) => status === "NOW_SHOWING").length,
    comingSoon: effectiveStatuses.filter((status) => status === "COMING_SOON").length,
    draft: effectiveStatuses.filter((status) => status === "DRAFT").length,
    archived: effectiveStatuses.filter((status) => status === "ARCHIVED").length,
    featured: movies.filter(
      (movie, index) =>
        movie.isFeatured &&
        effectiveStatuses[index] !== "ARCHIVED" &&
        effectiveStatuses[index] !== "DRAFT"
    ).length,
  }

  const isLive = (index: number) =>
    effectiveStatuses[index] !== "ARCHIVED" && effectiveStatuses[index] !== "DRAFT"

  const missingMetadataCount = movies.filter(
    (movie, index) => isLive(index) && (movie.languages.length === 0 || movie.formats.length === 0)
  ).length

  // listMoviesForAdmin() is already ordered by createdAt desc.
  const recentMovies = movies.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      {/* Movie Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Movies</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={ClapperboardIcon} label="Now Showing" value={counts.nowShowing} />
          <StatCard icon={ClapperboardIcon} label="Coming Soon" value={counts.comingSoon} />
          <StatCard icon={SparklesIcon} label="Featured" value={counts.featured} />
          <StatCard icon={PencilIcon} label="Draft" value={counts.draft} />
          <StatCard icon={ClapperboardIcon} label="Archived" value={counts.archived} />
        </div>
      </div>

      {/* Site Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Site</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={MapPinIcon} label="Locations" value={locationCount} />
          <StatCard icon={MailIcon} label="Newsletter Subscribers" value={subscriberCount} />
          <StatCard icon={InboxIcon} label="New Inquiries" value={unreadInquiryCount} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatCard icon={NewspaperIcon} label="Blog Published" value={blogStats.published} />
          <StatCard icon={NewspaperIcon} label="Blog Drafts" value={blogStats.draft} />
          <StatCard icon={SparklesIcon} label="Blog Featured" value={blogStats.featured} />
        </div>
      </div>

      {/* Data quality nudge */}
      {missingMetadataCount > 0 ? (
        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-200">
              <TriangleAlertIcon className="size-4" />
              Movies missing language or format
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-amber-100/80">
              {missingMetadataCount} active {missingMetadataCount === 1 ? "movie is" : "movies are"}{" "}
              missing a language or format, so they won&apos;t show up in those sidebar filters on
              the site.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/admin/movies" />}
              className="w-full sm:w-auto"
            >
              Review movies
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Movies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentMovies.length === 0 ? (
              <p className="text-sm text-muted-foreground">No movies yet.</p>
            ) : (
              recentMovies.map((movie, index) => (
                <Link
                  key={movie.id}
                  href={`/admin/movies/${movie.id}/edit`}
                  className="-mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-muted"
                >
                  <span className="truncate font-medium">{movie.title}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="secondary">{statusLabel[effectiveStatuses[index]]}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatReleaseDate(movie.releaseDate)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="size-4" />
              Upcoming Screenings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {upcomingScreenings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming screenings scheduled.</p>
            ) : (
              upcomingScreenings.map((screening) => (
                <Link
                  key={screening.id}
                  href={`/admin/movies/${screening.movieId}/edit`}
                  className="-mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-muted"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{screening.movieTitle}</p>
                    {screening.venue ? (
                      <p className="truncate text-xs text-muted-foreground">{screening.venue}</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDateTime(screening.startTime)}
                  </span>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InboxIcon className="size-4" />
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentInquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No inquiries yet.</p>
            ) : (
              recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/contact/${inquiry.id}`}
                  className="-mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-muted"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{inquiry.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {inquiry.subject || "General inquiry"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {inquiry.isRead ? null : <Badge variant="secondary">New</Badge>}
                    <span className="text-xs text-muted-foreground">
                      {formatReleaseDate(inquiry.createdAt)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Manage Sections Card */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-200">Manage Homepage Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-100/80">
            Manage the Hero carousel, Location events, and Blog posts that appear on your homepage.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/admin/sections" />}
            className="w-full sm:w-auto"
          >
            Go to Sections
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/movies" />}
            className="justify-start"
          >
            Manage Movies
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/locations" />}
            className="justify-start"
          >
            Manage Locations
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/blog" />}
            className="justify-start"
          >
            Manage Blog
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/contact" />}
            className="justify-start"
          >
            Manage Inquiries
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/sections" />}
            className="justify-start"
          >
            Manage Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
