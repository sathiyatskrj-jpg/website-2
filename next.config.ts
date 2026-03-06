import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/website-2",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
