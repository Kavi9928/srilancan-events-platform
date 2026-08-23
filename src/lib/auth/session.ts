import { createHmac, timingSafeEqual } from "node:crypto"

export const SESSION_COOKIE_NAME = "admin_session"

export type SessionPayload = {
  sub: string
  iat: number
  exp: number
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set")
  }
  return secret
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url")
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8")
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url")
}

export function createSessionToken(sub: string, ttlSeconds = 60 * 60 * 24 * 7): string {
  const now = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = { sub, iat: now, exp: now + ttlSeconds }
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(encodedPayload)
  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null

  const [encodedPayload, signature] = token.split(".")
  if (!encodedPayload || !signature) return null

  const expectedSignature = sign(encodedPayload)
  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    return payload
  } catch {
    return null
  }
}
