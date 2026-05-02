import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.217.39.208"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/dueto/uploads/**",
        search: "",
      },
    ],
  },
  outputFileTracingExcludes: {
    "/*": ["./public/images/dueto/**/*"],
  },
};

export default nextConfig;
