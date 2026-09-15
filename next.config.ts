import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server serve HMR/devtools assets when opened via the LAN IP
  // (e.g. testing from a phone on the same network), not just localhost.
  allowedDevOrigins: ["192.168.8.187", "192.168.1.20"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Placeholder team portraits — safe to drop once real photos are uploaded.
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1MB, too small for poster/banner uploads in a single submission.
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
