import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const BLOG_POSTS = [
  { id: 1, title: "The Ultimate Guide to Finding the Best Events", category: "Events Guide", author: "Sarah Chen", status: "published", date: "Mar 15, 2024", views: 1250 },
  { id: 2, title: "5 Must-Attend Music Festivals This Year", category: "Music", author: "James Wilson", status: "published", date: "Mar 10, 2024", views: 890 },
  { id: 3, title: "Cinema Trends: What's Hot in 2024", category: "Movies", author: "Emma Davis", status: "draft", date: "Mar 8, 2024", views: 0 },
]

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/admin/sections" />}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Create and manage articles</p>
        </div>
      </div>

      <div className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {post.status}
                  </span>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
