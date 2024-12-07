import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Add the specific port if needed; otherwise, remove this line.
      },
      {
        protocol: "https",
        hostname: "anikii.vercel.app",
      },
      {
        protocol: "https",
        hostname: "gogocdn.net",
      },
    ],
  },
};

export default nextConfig;
