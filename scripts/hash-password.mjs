// Usage: node scripts/hash-password.mjs 'your-plaintext-password'
// Prints a bcrypt hash to paste into ADMIN_PASSWORD_HASH in .env
import bcrypt from "bcryptjs"

const password = process.argv[2]
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs 'your-plaintext-password'")
  process.exit(1)
}

const hash = bcrypt.hashSync(password, 12)
// Escaped for .env: Next's env loader does $VAR-style expansion, which
// would otherwise corrupt the $2b$12$... bcrypt prefix.
console.log(hash.replaceAll("$", "\\$"))
