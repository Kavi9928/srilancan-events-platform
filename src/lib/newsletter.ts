import { prisma } from "@/lib/prisma"

export async function subscribeEmail(email: string): Promise<void> {
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: { email },
    update: {},
  })
}

export async function getNewsletterSubscriberCount(): Promise<number> {
  return prisma.newsletterSubscriber.count()
}
