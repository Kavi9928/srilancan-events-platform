import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadMovieImage(
  file: File,
  folder: "posters" | "banners"
): Promise<{ secureUrl: string; publicId: string }> {
  const buffer = Buffer.from(await file.arrayBuffer())

  return new Promise((resolve, reject) => {
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
    uploadStream.end(buffer)
  })
}
