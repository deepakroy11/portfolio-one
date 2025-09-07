import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;