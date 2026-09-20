/**
 * Replaces each team member's portrait with the tightly-cropped circular
 * cut-out in public/team/.
 *
 * The originals are a circle drawn on a light square with a margin around it.
 * Inside the round mask on the About page that margin survives as a pale ring.
 * These crops are cut exactly to the circle with transparent corners, so they
 * fill the mask edge to edge.
 *
 *   npx tsx --env-file=.env scripts/replace-team-portraits.ts
 */
import { readFile } from "node:fs/promises"
import path from "node:path"

import { v2 as cloudinary } from "cloudinary"

import { PrismaClient } from "../src/generated/prisma/client"

const prisma = new PrismaClient()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

/** Member name -> the crop cut from their original photo. */
const PORTRAITS: Record<string, string> = {
  "Mr. Kalpa Samarathunga": "member-4.png",
  "Mr. Eranga Hidelarachchi": "member-3.png",
  "Ms. Darshika Chandrathilake": "member-2.png",
  "Ms. Anusha Kingsley": "member-1.png",
  "Mr. Weera Fonseka": "member-5.png",
}

async function upload(file: string): Promise<string> {
  const buffer = await readFile(path.join(process.cwd(), "public", "team", file))
  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "movies/team" },
      (error, uploaded) => {
        if (error || !uploaded) {
          reject(error ?? new Error("Cloudinary returned no result"))
          return
        }
        resolve(uploaded as { secure_url: string })
      }
    )
    stream.end(buffer)
  })
  return result.secure_url
}

async function main() {
  const members = await prisma.teamMember.findMany()
  const unmatched = members.filter((m) => !PORTRAITS[m.name])
  if (unmatched.length > 0) {
    // Names are the only link between a row and its crop, so a rename must
    // stop the run rather than silently skip somebody.
    throw new Error(
      `No crop mapped for: ${unmatched.map((m) => m.name).join(", ")}. Update PORTRAITS.`
    )
  }

  for (const member of members) {
    const url = await upload(PORTRAITS[member.name])
    await prisma.teamMember.update({ where: { id: member.id }, data: { imageUrl: url } })
    console.log(`  ${member.name}\n    -> ${url}`)
  }

  console.log(`\nReplaced ${members.length} portrait(s).`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
