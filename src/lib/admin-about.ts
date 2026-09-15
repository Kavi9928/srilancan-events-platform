import { prisma } from "@/lib/prisma"
import type { AboutContent } from "@/lib/types"

/**
 * The About copy is a singleton: update the existing row, or create the first
 * one. There is no natural unique key to upsert on, so the id is looked up.
 */
export async function saveAboutContent(data: AboutContent): Promise<void> {
  const existing = await prisma.aboutContent.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  })

  if (existing) {
    await prisma.aboutContent.update({ where: { id: existing.id }, data })
    return
  }

  await prisma.aboutContent.create({ data })
}
