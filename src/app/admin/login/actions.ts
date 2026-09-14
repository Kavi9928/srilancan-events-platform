"use server"

import { redirect } from "next/navigation"

import { verifyAdminCredentials } from "@/lib/auth/password"
import { clearSessionCookie, setSessionCookie } from "@/lib/auth/session-cookie"

export type LoginState = {
  error?: string
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  console.log("[DEBUG login attempt] email:", JSON.stringify(email), "password:", JSON.stringify(password))

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const isValid = await verifyAdminCredentials(email, password)
  if (!isValid) {
    return { error: "Invalid email or password." }
  }

  await setSessionCookie(email)
  redirect("/admin")
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie()
  redirect("/admin/login")
}
