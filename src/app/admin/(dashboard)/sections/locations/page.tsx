import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const LOCATIONS = [
  { id: "toronto", label: "Toronto", eventCount: 12, icon: "🏙️" },
  { id: "vancouver", label: "Vancouver", eventCount: 8, icon: "🏔️" },
  { id: "montreal", label: "Montreal", eventCount: 10, icon: "🇫🇷" },
  { id: "calgary", label: "Calgary", eventCount: 6, icon: "⛰️" },
  { id: "ottawa", label: "Ottawa", eventCount: 5, icon: "🏛️" },
]

export default function LocationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/admin/sections" />}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Location Events</h1>
          <p className="text-muted-foreground">Manage events by Canadian cities</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((location) => (
          <Card key={location.id}>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-3xl mb-2">{location.icon}</div>
                <h3 className="font-semibold text-lg">{location.label}</h3>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Total Events</p>
                <p className="text-2xl font-bold">{location.eventCount}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
