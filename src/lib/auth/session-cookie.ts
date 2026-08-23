import { cookies } from "next/headers"

import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  type SessionPayload,
} from "@/lib/auth/session"

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value)
}

/** Throws if there is no valid admin session. Call this first in every mutating Server Action. */
export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getSessionFromCookies()
  if (!session) {
    throw new Error("Not authenticated")
  }
  return session
}

export async function setSessionCookie(sub: string): Promise<void> {
  const cookieStore = await cookies()
  const token = createSessionToken(sub)
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
