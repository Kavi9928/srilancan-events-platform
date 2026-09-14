"use client"

import { useActionState } from "react"
import { MailIcon, CheckIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/site/scroll-reveal"
import { subscribeAction, type NewsletterState } from "@/app/newsletter/actions"

const initialState: NewsletterState = { status: "idle" }

export function NewsletterSection() {
  const [state, formAction, isPending] = useActionState(subscribeAction, initialState)

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/20 via-black to-orange-500/10 p-8 text-center sm:p-12">
          <div className="absolute -inset-x-20 -top-20 h-40 rounded-full bg-red-600/20 blur-3xl" />

          <div className="relative space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <MailIcon className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">Never miss an event</h2>
            <p className="mx-auto max-w-md text-white/70">
              Get new movies, events, and Coming Soon announcements straight to your inbox.
            </p>

            {state.status === "success" ? (
              <div className="mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-medium text-green-400">
                <CheckIcon className="h-4 w-4" />
                {state.message}
              </div>
            ) : (
              <form
                action={formAction}
                className="mx-auto flex max-w-sm flex-col gap-3 pt-2 sm:flex-row"
              >
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="shrink-0 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  {isPending ? "Joining…" : "Subscribe"}
                </Button>
              </form>
            )}
            {state.status === "error" ? (
              <p className="text-sm text-red-400">{state.message}</p>
            ) : null}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
