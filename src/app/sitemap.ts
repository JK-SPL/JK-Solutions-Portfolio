import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/projects";
import { getSiteUrl } from "@/data/site";
import { tenantSitemapPaths } from "@/data/tenants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const statics = ["", "/work", "/products", "/products/sevadesk", "/products/jk-attendance", "/lab", "/about", "/capabilities", "/process", "/resume", "/contact"];
  const projects = publishedProjects.map((p) => `/work/${p.slug}`);
  // Tenant product routes derived from TNT_REGISTRY — only live tenants with
  // real pages are advertised, so every URL here resolves.
  const tenants = tenantSitemapPaths();
  return [...statics, ...projects, ...tenants].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
