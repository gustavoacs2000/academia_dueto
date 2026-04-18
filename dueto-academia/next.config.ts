import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.217.39.208"],
  // Prevent large static originals from being traced into serverless functions.
  outputFileTracingExcludes: {
    "*": ["./public/images/dueto/**/*"],
  },
};

export default nextConfig;
