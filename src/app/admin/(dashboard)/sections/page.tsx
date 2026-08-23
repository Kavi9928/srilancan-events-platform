import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SectionsPage() {
  const sections = [
    {
      id: "hero",
      title: "Hero Section",
      description: "Manage the featured carousel on the homepage",
      icon: "🎬",
      href: "/admin/sections/hero",
      stats: {
        label: "Featured Events",
        count: 5,
      },
    },
    {
      id: "locations",
      title: "Location Events",
      description: "Manage events by Canadian cities",
      icon: "🌍",
      href: "/admin/sections/locations",
      stats: {
        label: "Cities",
        count: 5,
      },
    },
    {
      id: "blog",
      title: "Blog Posts",
      description: "Create and manage blog articles",
      icon: "📝",
      href: "/admin/sections/blog",
      stats: {
        label: "Total Posts",
        count: 5,
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
