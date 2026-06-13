import type { Metadata } from "next";
import { Manrope, Syne, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/shared/SmoothScroller";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import SmartCursor from "@/components/shared/SmartCursor";

const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontEditorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abolfazl Shirkavand | Head of Digital Innovation",
  description: "Process Excellence & Digital Transformation. Engineering measurable outcomes at enterprise scale.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontMono.variable} ${fontEditorial.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <SmoothScroller>
            <div id="main-content">{children}</div>
          </SmoothScroller>
          <SmartCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
