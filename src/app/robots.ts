import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/lib/site-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin panel is behind a session cookie, but there is no reason to
      // invite crawlers to it — or to index the uploaded-asset directory.
      disallow: ["/admin", "/admin/", "/uploads/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
