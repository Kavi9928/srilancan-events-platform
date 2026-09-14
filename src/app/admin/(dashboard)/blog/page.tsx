import Link from "next/link"
import { MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatReleaseDate } from "@/lib/format"
import { listBlogPostsForAdmin } from "@/lib/admin-blog"
import { deleteBlogPostAction } from "@/app/admin/blog/actions"

export const dynamic = "force-dynamic"

export default async function AdminBlogPage() {
  const posts = await listBlogPostsForAdmin()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <Button nativeButton={false} render={<Link href="/admin/blog/new" />}>
          Add post
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published Date</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                No blog posts yet.
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {post.title}
                    {post.isFeatured ? <Badge>Featured</Badge> : null}
                  </div>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <Badge variant={post.isPublished ? "secondary" : "outline"}>
                    {post.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{formatReleaseDate(post.publishedAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontalIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/admin/blog/${post.id}/edit`} />}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={deleteBlogPostAction.bind(null, post.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
