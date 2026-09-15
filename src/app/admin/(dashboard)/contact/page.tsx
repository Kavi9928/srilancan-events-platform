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
import { formatDateTime } from "@/lib/format"
import { listInquiriesForAdmin } from "@/lib/admin-contact"
import {
  markInquiryReadAction,
  markInquiryUnreadAction,
  deleteInquiryAction,
} from "@/app/admin/contact/actions"

export const dynamic = "force-dynamic"

export default async function AdminContactPage() {
  const inquiries = await listInquiriesForAdmin()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Inquiries</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Received</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                No inquiries yet.
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/contact/${inquiry.id}`} className="hover:underline">
                    {inquiry.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                </TableCell>
                <TableCell className="max-w-64 truncate">
                  {inquiry.subject || "General inquiry"}
                </TableCell>
                <TableCell>
                  <Badge variant={inquiry.isRead ? "outline" : "secondary"}>
                    {inquiry.isRead ? "Read" : "New"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDateTime(inquiry.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontalIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/admin/contact/${inquiry.id}`} />}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {inquiry.isRead ? (
                        <DropdownMenuItem onClick={markInquiryUnreadAction.bind(null, inquiry.id)}>
                          Mark as unread
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={markInquiryReadAction.bind(null, inquiry.id)}>
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={deleteInquiryAction.bind(null, inquiry.id)}
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
