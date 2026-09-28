import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { SiteShell } from "@/components/shell/SiteShell";
import { site } from "@/content/site";
import "./globals.css";
import "@/styles/home.css";
import "@/styles/pages.css";

const funnelDisplay = Funnel_Display({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-funnel-display", display: "swap" });
const funnelSans = Funnel_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-funnel-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} (${site.nickname}) · ${site.role}`,
    template: `%s · ${site.name}`,
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
    title: `${site.name} (${site.nickname})`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} (${site.nickname})`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.nickname,
  url: site.url,
  image: `${site.url}/about/portrait.webp`,
  jobTitle: site.role,
  address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
