"use client"

import { useActionState } from "react"
import { CheckIcon, SendIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitContactInquiryAction, type ContactFormState } from "@/app/contact/actions"

const initialState: ContactFormState = { status: "idle" }

const fieldClassName =
  "border-white/15 bg-white/5 text-white transition-colors placeholder:text-white/30 focus-visible:border-red-500/50"

const labelClassName = "mb-1.5 block text-xs font-semibold tracking-wider text-white/50 uppercase"

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactInquiryAction, initialState)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
          <CheckIcon className="h-6 w-6 text-green-400" />
        </div>
        <p className="font-semibold text-white">Message sent</p>
        <p className="max-w-sm text-sm text-white/60">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className={fieldClassName}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className={fieldClassName}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClassName}>
          Subject <span className="normal-case opacity-60">(optional)</span>
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="What's this about?"
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="How can we help?"
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 shadow-lg shadow-red-500/20 transition-all hover:from-red-700 hover:to-orange-600 hover:shadow-red-500/40 sm:w-auto"
        >
          <SendIcon className="h-4 w-4" />
          {isPending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-white/40">We typically reply within 1–2 business days.</p>
      </div>

      {state.status === "error" ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
