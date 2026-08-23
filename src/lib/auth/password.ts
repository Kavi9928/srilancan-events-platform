import bcrypt from "bcryptjs"

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminPasswordHash) {
    throw new Error("ADMIN_EMAIL / ADMIN_PASSWORD_HASH environment variables are not set")
  }

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false
  }

  // Unescape the dollar signs that were escaped in .env file
  const unescapedHash = adminPasswordHash.replace(/\\\$/g, "$")
  return bcrypt.compare(password, unescapedHash)
}
