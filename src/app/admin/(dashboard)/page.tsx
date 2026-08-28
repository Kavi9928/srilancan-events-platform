import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const counts = {
    nowShowing: 0,
    comingSoon: 0,
    archived: 0,
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      {/* Movie Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Movies</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Now Showing</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {counts.nowShowing}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {counts.comingSoon}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Archived</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {counts.archived}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Manage Sections Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Manage Homepage Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-800">
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
        <div className="grid gap-4 sm:grid-cols-2">
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
