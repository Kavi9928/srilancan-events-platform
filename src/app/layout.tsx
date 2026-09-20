import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/site-url";
import { JsonLd } from "@/components/site/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SriLanCan Events | Sri Lankan Concerts & Films in Toronto",
    template: "%s | SriLanCan Events",
  },
  description:
    "The premier gateway for Sri Lankan art and culture in Toronto. Book tickets for Sri Lankan concerts, film premieres and cultural celebrations across Canada.",
  applicationName: "SriLanCan Events",
  keywords: [
    "Sri Lankan events Toronto",
    "Sri Lankan concerts Canada",
    "Sri Lankan movies Toronto",
    "Sinhala film screenings Canada",
    "SriLanCan Events",
  ],
  openGraph: {
    type: "website",
    siteName: "SriLanCan Events",
    locale: "en_CA",
    url: SITE_URL,
  },
  // Open Graph alone leaves X/Twitter with a degraded preview.
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        {/* Site-wide identity: who this organisation is, and the search action
            engines can surface. Emitted server-side so crawlers see it. */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <ThemeProvider>
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
