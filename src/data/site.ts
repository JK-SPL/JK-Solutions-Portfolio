export const SITE = {
  name: "JK SOLUTIONS",
  tagline: "Digital Product Studio",
  statement: "I BUILD WITH AI. I ENGINEER FOR REAL LIFE.",
  supporting:
    "JK SOLUTIONS builds real digital products and business systems using AI-assisted engineering, automation, SaaS architecture, web technology and immersive experiences.",
  capabilities: ["VIBE CODING", "AI", "SAAS", "AUTOMATION", "WEB", "CRM", "3D MOTION"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "WORK" },
  { href: "/products", label: "PRODUCTS" },
  // `/capabilities` is the canonical route; `/services` permanently redirects
  // to it, so the old URL keeps resolving without duplicating the page.
  { href: "/capabilities", label: "CAPABILITIES" },
  { href: "/lab", label: "LAB" },
  { href: "/resume", label: "RESUME" },
] as const;
