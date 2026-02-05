import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/shared/SmoothScroller";

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

export const metadata: Metadata = {
  title: "Abolfazl Shirkavand | Digital Architect",
  description: "Process Excellence & Digital Transformation. Creating the future of enterprise operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="antialiased">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
