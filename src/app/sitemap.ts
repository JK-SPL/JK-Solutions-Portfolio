import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const statics = ["", "/work", "/products", "/products/sevadesk", "/products/jk-attendance", "/lab", "/about", "/capabilities", "/process", "/resume", "/contact"];
  const projects = publishedProjects.map((p) => `/work/${p.slug}`);
  return [...statics, ...projects].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
