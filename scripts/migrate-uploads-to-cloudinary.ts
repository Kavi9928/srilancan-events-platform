/**
 * One-shot migration: pushes every image still stored under public/uploads/ up
 * to Cloudinary and rewrites the database URL in place.
 *
 * Needed because lib/cloudinary.ts fell back to local disk while the Cloudinary
 * credentials were blank — and public/ is read-only and ephemeral on a
 * serverless host, so those files would not survive a deploy.
 *
 *   npx tsx --env-file=.env scripts/migrate-uploads-to-cloudinary.ts
 *
 * Safe to re-run: records already pointing at res.cloudinary.com are skipped.
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

const LOCAL_PREFIX = "/uploads/"

/** Mirrors the folder layout lib/cloudinary.ts uses for fresh uploads. */
function folderFor(localUrl: string): string {
  const segment = localUrl.slice(LOCAL_PREFIX.length).split("/")[0]
  return `movies/${segment || "misc"}`
}

async function uploadLocalFile(localUrl: string): Promise<string> {
  const absolute = path.join(process.cwd(), "public", localUrl.replace(/^\//, ""))
  const buffer = await readFile(absolute)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderFor(localUrl) },
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

type Migration = { label: string; localUrl: string; apply: (url: string) => Promise<unknown> }

async function collectMigrations(): Promise<Migration[]> {
  const jobs: Migration[] = []

  for (const member of await prisma.teamMember.findMany()) {
    if (member.imageUrl.startsWith(LOCAL_PREFIX)) {
      jobs.push({
        label: `team/${member.name}`,
        localUrl: member.imageUrl,
        apply: (imageUrl) => prisma.teamMember.update({ where: { id: member.id }, data: { imageUrl } }),
      })
    }
  }

  for (const movie of await prisma.movie.findMany()) {
    if (movie.posterUrl.startsWith(LOCAL_PREFIX)) {
      jobs.push({
        label: `movie poster/${movie.title}`,
        localUrl: movie.posterUrl,
        apply: (posterUrl) => prisma.movie.update({ where: { id: movie.id }, data: { posterUrl } }),
      })
    }
    if (movie.bannerUrl.startsWith(LOCAL_PREFIX)) {
      jobs.push({
        label: `movie banner/${movie.title}`,
        localUrl: movie.bannerUrl,
        apply: (bannerUrl) => prisma.movie.update({ where: { id: movie.id }, data: { bannerUrl } }),
      })
    }
  }

  for (const post of await prisma.blogPost.findMany()) {
    if (post.imageUrl.startsWith(LOCAL_PREFIX)) {
      jobs.push({
        label: `blog/${post.title}`,
        localUrl: post.imageUrl,
        apply: (imageUrl) => prisma.blogPost.update({ where: { id: post.id }, data: { imageUrl } }),
      })
    }
  }

  return jobs
}

async function main() {
  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary credentials are not set — nothing would upload.")
  }

  const jobs = await collectMigrations()
  if (jobs.length === 0) {
    console.log("Nothing to migrate — no records point at public/uploads/.")
    return
  }

  console.log(`Migrating ${jobs.length} image(s) to Cloudinary…\n`)
  let migrated = 0
  const failures: string[] = []

  for (const job of jobs) {
    try {
      const remoteUrl = await uploadLocalFile(job.localUrl)
      await job.apply(remoteUrl)
      migrated++
      console.log(`  ok   ${job.label}\n       ${job.localUrl} -> ${remoteUrl}`)
    } catch (error) {
      // Keep going: one unreadable file should not strand the rest.
      const message = error instanceof Error ? error.message : String(error)
      failures.push(`${job.label} (${job.localUrl}): ${message}`)
      console.error(`  FAIL ${job.label}: ${message}`)
    }
  }

  console.log(`\nMigrated ${migrated}/${jobs.length}.`)
  if (failures.length > 0) {
    console.log("\nFailures — these records still point at local disk:")
    for (const failure of failures) console.log(`  - ${failure}`)
    process.exitCode = 1
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
