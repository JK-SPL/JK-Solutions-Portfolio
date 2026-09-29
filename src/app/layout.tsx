import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/data/site";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LightField } from "@/components/lighting/LightField";
import { CommandPalette } from "@/components/nav/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Digital Products & Engineering`,
    template: `%s — ${SITE.name}`,
  },
  description: "Digital products, websites and business systems built from idea to deployment. Based in India, built for real-world use.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Digital Products & Engineering`,
    description: "Digital products, websites and business systems built from idea to deployment.",
    images: [{ url: "/images/jk-portrait.jpg", width: 941, height: 1672 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  description: "Digital products, websites and business systems built from idea to deployment.",
  url: SITE.url,
  founder: { "@type": "Person", name: "Jitendra Akoli", jobTitle: "Founder, JK SOLUTIONS" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-label focus:text-white"
        >
          Skip to content
        </a>

        <LightField />
        <Navbar />
        <CommandPalette />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}