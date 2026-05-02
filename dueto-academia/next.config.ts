import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.217.39.208"],
  outputFileTracingExcludes: {
    "/*": ["./public/images/dueto/**/*"],
  },
};

export default nextConfig;
