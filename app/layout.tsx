import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteShell } from "@/components/shell/SiteShell";
import { site } from "@/content/site";
import { getCertifications } from "@/lib/data";
import "./globals.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import "@/styles/note-figures.generated.css";

const funnelDisplay = localFont({ src: "../public/fonts/funnel-display-latin.woff2", weight: "400 600", style: "normal", variable: "--font-funnel-display", display: "swap" });
const funnelSans = localFont({ src: "../public/fonts/funnel-sans-latin.woff2", weight: "400 500", style: "normal", variable: "--font-funnel-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.nickname}`,
  },
  description: site.description,
  applicationName: "abosh.io",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "abosh.io",
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  colorScheme: "dark",
};

async function personJsonLd() {
  const certifications = await getCertifications();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.nickname,
    url: site.url,
    image: `${site.url}/about/portrait.webp`,
    jobTitle: site.role,
    description: site.description,
    knowsAbout: site.expertise,
    worksFor: { "@type": "Organization", name: "Vrolen", url: "https://vrolen.com" },
    hasCredential: certifications.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.name })),
    address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
    sameAs: [site.linkedin, site.instagram, site.github],
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = await personJsonLd();
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} ${funnelSans.variable}`}
      suppressHydrationWarning
      data-lens="pending"
    >
      <head>
        {/* Before first paint: lets CSS stage reveals without hiding anything from no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteShell />
        <main id="main" className="site-main">
          {children}
        </main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
