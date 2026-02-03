import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://assets.example.com/account123/**')],
  },
};

export default nextConfig;
