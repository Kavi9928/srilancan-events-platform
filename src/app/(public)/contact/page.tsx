import type { Metadata } from "next"
import {
  MailIcon,
  MapPinIcon,
  SparklesIcon,
  ExternalLinkIcon,
  ClockIcon,
} from "lucide-react"

import { ContactForm } from "@/components/site/contact-form"
import { FaqSection } from "@/components/site/faq-section"
import { ScrollReveal } from "@/components/site/scroll-reveal"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SriLanCan Events in Toronto about an event, a booking, or partnering with us.",
  alternates: { canonical: "/contact" },
}

const MAPS_QUERY = "Toronto,Ontario,Canada"

const CONTACT_METHODS = [
  {
    icon: MailIcon,
    label: "Email",
    value: "info@srilancanevents.ca",
    href: "mailto:info@srilancanevents.ca",
    hint: "We reply within 1–2 business days",
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: "Toronto, Ontario",
    href: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
    hint: "Serving communities across Canada",
  },
]

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.1),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <ScrollReveal>
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-white/5 px-4 py-1.5">
              <SparklesIcon className="h-3.5 w-3.5 text-red-400" />
              <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
                We&apos;d love to hear from you
              </span>
            </div>
            <h1 className="text-4xl font-black text-white sm:text-5xl">
              Get in{" "}
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Questions about an event, a booking, or want to partner with us? Send us a message
              and our team will get back to you shortly.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact methods + form */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {CONTACT_METHODS.map((method, index) => {
              const Icon = method.icon
              const isExternal = method.href.startsWith("http")

              return (
                <ScrollReveal key={method.label} delay={index * 100}>
                  <a
                    href={method.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-white/10"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-500/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wider text-red-400 uppercase">
                        {method.label}
                      </p>
                      <p className="mt-0.5 truncate font-medium text-white">{method.value}</p>
                      <p className="mt-1 text-xs text-white/40">{method.hint}</p>
                    </div>
                  </a>
                </ScrollReveal>
              )
            })}

            <ScrollReveal delay={300}>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-red-600/10 to-orange-500/5 p-5">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                <div>
                  <p className="font-medium text-white">Planning a group booking?</p>
                  <p className="mt-1 text-sm text-white/60">
                    Tell us your event, date, and group size in the form — we&apos;ll send over
                    group pricing.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-br from-red-500/20 via-transparent to-orange-500/20 opacity-40 blur" />
              <h2 className="text-xl font-bold text-white">Send us a message</h2>
              <p className="mt-1 mb-6 text-sm text-white/50">
                Fill in the form below and we&apos;ll be in touch.
              </p>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>

        {/* Map */}
        <ScrollReveal className="mt-16">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Find us in Toronto</h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-red-500/40 hover:text-white"
            >
              Open in Google Maps
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <iframe
              title="Toronto, Ontario, Canada"
              src={`https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>

        <FaqSection />
      </div>
    </div>
  )
}
