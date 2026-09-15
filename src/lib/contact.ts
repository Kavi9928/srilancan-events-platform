import { prisma } from "@/lib/prisma"
import type { ContactInquiry } from "@/lib/types"
import type { ContactInquiry as PrismaContactInquiry } from "@/generated/prisma/client"

function serializeInquiry(inquiry: PrismaContactInquiry): ContactInquiry {
  return {
    ...inquiry,
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
  }
}

export async function createContactInquiry(data: {
  name: string
  email: string
  subject: string | null
  message: string
}): Promise<ContactInquiry> {
  const inquiry = await prisma.contactInquiry.create({ data })
  return serializeInquiry(inquiry)
}
