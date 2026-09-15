import { randomUUID } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// Cloudinary isn't configured with real credentials yet (local dev only) —
// fall back to writing uploads into public/uploads instead of failing.
const HAS_CLOUDINARY_CREDENTIALS =
  (process.env.CLOUDINARY_CLOUD_NAME?.length ?? 0) > 4 &&
  (process.env.CLOUDINARY_API_KEY?.length ?? 0) > 4 &&
  (process.env.CLOUDINARY_API_SECRET?.length ?? 0) > 4

export type UploadFolder = "posters" | "banners" | "blog" | "team"

async function uploadToLocalDisk(
  file: File,
  folder: UploadFolder
): Promise<{ secureUrl: string; publicId: string }> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const extension = path.extname(file.name) || ".jpg"
  const filename = `${randomUUID()}${extension}`

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), buffer)

  return { secureUrl: `/uploads/${folder}/${filename}`, publicId: filename }
}

function uploadToCloudinary(
  file: File,
  folder: UploadFolder
): Promise<{ secureUrl: string; publicId: string }> {
  return file.arrayBuffer().then(
    (arrayBuffer) =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: `movies/${folder}` },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error("Cloudinary upload returned no result"))
              return
            }
            resolve({ secureUrl: result.secure_url, publicId: result.public_id })
          }
        )
        uploadStream.end(Buffer.from(arrayBuffer))
      })
  )
}

export async function uploadImage(
  file: File,
  folder: UploadFolder
): Promise<{ secureUrl: string; publicId: string }> {
  if (!HAS_CLOUDINARY_CREDENTIALS) {
    return uploadToLocalDisk(file, folder)
  }
  return uploadToCloudinary(file, folder)
}
