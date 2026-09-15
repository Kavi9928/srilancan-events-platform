import { prisma } from "@/lib/prisma"
import type { ContactInquiry } from "@/lib/types"

function serializeInquiry(inquiry: {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}): ContactInquiry {
  return {
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
  }
}

export async function listInquiriesForAdmin(): Promise<ContactInquiry[]> {
  const inquiries = await prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" } })
  return inquiries.map(serializeInquiry)
}

export async function getRecentInquiriesForAdmin(limit = 5): Promise<ContactInquiry[]> {
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  })
  return inquiries.map(serializeInquiry)
}

export async function getInquiryForAdmin(id: string): Promise<ContactInquiry | null> {
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } })
  return inquiry ? serializeInquiry(inquiry) : null
}

export async function getUnreadInquiryCount(): Promise<number> {
  return prisma.contactInquiry.count({ where: { isRead: false } })
}

export async function markInquiryRead(id: string): Promise<ContactInquiry> {
  const inquiry = await prisma.contactInquiry.update({ where: { id }, data: { isRead: true } })
  return serializeInquiry(inquiry)
}

export async function markInquiryUnread(id: string): Promise<ContactInquiry> {
  const inquiry = await prisma.contactInquiry.update({ where: { id }, data: { isRead: false } })
  return serializeInquiry(inquiry)
}

export async function deleteInquiryRecord(id: string): Promise<void> {
  await prisma.contactInquiry.delete({ where: { id } })
}
