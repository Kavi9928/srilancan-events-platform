import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { listMoviesForAdmin } from "@/lib/admin-movies"
import { listLocations } from "@/lib/locations"
import { listBlogPostsForAdmin } from "@/lib/admin-blog"

export const dynamic = "force-dynamic"

export default async function SectionsPage() {
  const [movies, locations, posts] = await Promise.all([
    listMoviesForAdmin(),
    listLocations(),
    listBlogPostsForAdmin(),
  ])

  const sections = [
    {
      id: "hero",
      title: "Hero Section",
      description: "The homepage hero carousel shows whichever movies are flagged \"Feature in Hero section\" on the Movies page.",
      icon: "🎬",
      href: "/admin/movies",
      stats: {
        label: "Featured movies",
        count: movies.filter((movie) => movie.isFeatured).length,
      },
    },
    {
      id: "locations",
      title: "Location Events",
      description: "Manage the cities movies and events can be assigned to.",
      icon: "🌍",
      href: "/admin/locations",
      stats: {
        label: "Cities",
        count: locations.length,
      },
    },
    {
      id: "blog",
      title: "Blog Posts",
      description: "Create and manage blog articles shown on the homepage.",
      icon: "📝",
      href: "/admin/blog",
      stats: {
        label: "Total posts",
        count: posts.length,
      },
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Sections</h1>
        <p className="text-muted-foreground mt-2">
          Control the content displayed on your homepage
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id} className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{section.icon}</CardTitle>
                  <h3 className="font-semibold text-lg mt-2">{section.title}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{section.description}</p>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-2">
                  {section.stats.label}
                </div>
                <div className="text-2xl font-bold mb-4">{section.stats.count}</div>
              </div>

              <Button
                nativeButton={false}
                render={<Link href={section.href} />}
                className="w-full"
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
