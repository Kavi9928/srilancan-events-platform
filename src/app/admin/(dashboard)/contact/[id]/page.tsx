import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateTime } from "@/lib/format"
import { getInquiryForAdmin, markInquiryRead } from "@/lib/admin-contact"
import { deleteInquiryAction } from "@/app/admin/contact/actions"

type AdminContactDetailPageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function AdminContactDetailPage({ params }: AdminContactDetailPageProps) {
  const { id } = await params
  const inquiry = await getInquiryForAdmin(id)

  if (!inquiry) {
    notFound()
  }

  if (!inquiry.isRead) {
    await markInquiryRead(inquiry.id)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/contact"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Inquiries
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>{inquiry.subject || "General inquiry"}</CardTitle>
            {inquiry.isRead ? null : <Badge variant="secondary">New</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">From</dt>
              <dd className="font-medium">{inquiry.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href={`mailto:${inquiry.email}`} className="font-medium hover:underline">
                  {inquiry.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Received</dt>
              <dd className="font-medium">{formatDateTime(inquiry.createdAt)}</dd>
            </div>
          </dl>

          <div className="rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap">
            {inquiry.message}
          </div>

          <div className="flex gap-3">
            <Button
              nativeButton={false}
              render={<a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || "Your inquiry"}`} />}
            >
              Reply by email
            </Button>
            <Button variant="outline" onClick={deleteInquiryAction.bind(null, inquiry.id)}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
