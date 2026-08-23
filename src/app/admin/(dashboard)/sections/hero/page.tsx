import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const FEATURED_EVENTS = [
  { id: 1, title: "Live Cinema", description: "Experience the magic of cinema", status: "active", order: 1 },
  { id: 2, title: "Cultural Events", description: "Celebrate Sri Lankan heritage", status: "active", order: 2 },
  { id: 3, title: "Live Concerts", description: "World-class musicians performing", status: "active", order: 3 },
]

export default function HeroPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/admin/sections" />}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Hero Section</h1>
            <p className="text-muted-foreground">Manage featured carousel events</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {FEATURED_EVENTS.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                    {event.status}
                  </span>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Remove</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
