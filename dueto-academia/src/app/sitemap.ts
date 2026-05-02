import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteMetadata";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1 },
  { path: "/cursos", priority: 0.9 },
  { path: "/professores", priority: 0.7 },
  { path: "/contato", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
