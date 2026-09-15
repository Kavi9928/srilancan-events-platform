import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/site/scroll-reveal"

const FAQS = [
  {
    question: "How do I book tickets for a movie or event?",
    answer:
      "Click \"Book Now\" on any movie or event page — you'll be taken to our secure ticketing partner to select your seats and complete payment.",
  },
  {
    question: "Can I get a refund or exchange my tickets?",
    answer:
      "Refunds and exchanges are handled case by case. Send us a message above with your booking details and we'll do our best to help.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes — for groups of 10 or more, message us with the event, date, and group size and we'll follow up with pricing.",
  },
  {
    question: "What cities do you host events in?",
    answer:
      "We host movies and events across Canada. Use the city filter on the Now Showing and Coming Soon pages to see what's happening near you.",
  },
  {
    question: "How will I receive my tickets?",
    answer:
      "Tickets are emailed to you right after purchase. Bring a printed copy or show the email on your phone at the door.",
  },
  {
    question: "How do I ask about a partnership or sponsorship?",
    answer:
      "Send us a message using the contact form above, or email info@srilancanevents.ca directly, and our team will follow up.",
  },
]

export function FaqSection() {
  return (
    <ScrollReveal className="mt-20">
      <div className="space-y-3 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
        <p className="mx-auto max-w-xl text-white/60">
          Quick answers to the things people ask us most.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 px-6 sm:px-8">
        <Accordion defaultValue={[0]}>
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={index}
              className="not-last:border-b not-last:border-white/10"
            >
              <AccordionTrigger className="py-4 text-base text-white hover:no-underline hover:text-red-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-white/60">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollReveal>
  )
}
