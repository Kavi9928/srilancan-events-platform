"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import { markInquiryRead, markInquiryUnread, deleteInquiryRecord } from "@/lib/admin-contact"

function revalidateInquiries() {
  revalidatePath("/admin/contact")
  revalidatePath("/admin")
}

export async function markInquiryReadAction(id: string): Promise<void> {
  await requireAdminSession()
  await markInquiryRead(id)
  revalidateInquiries()
}

export async function markInquiryUnreadAction(id: string): Promise<void> {
  await requireAdminSession()
  await markInquiryUnread(id)
  revalidateInquiries()
}

export async function deleteInquiryAction(id: string): Promise<void> {
  await requireAdminSession()
  await deleteInquiryRecord(id)
  revalidateInquiries()
  redirect("/admin/contact")
}
