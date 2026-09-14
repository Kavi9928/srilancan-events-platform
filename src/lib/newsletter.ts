import { prisma } from "@/lib/prisma"

export async function subscribeEmail(email: string): Promise<void> {
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: { email },
    update: {},
  })
}
