import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,
  output: "export",
  distDir: "dist",
  basePath: "/snake2",
}

export default nextConfig
