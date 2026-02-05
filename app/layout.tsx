import type { Metadata } from "next";
import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abolfazl Shirkavand | Digital Transformation & Process Excellence Leader",
  description:
    "Digital Transformation and Process Improvement expert with 8+ years of experience driving enterprise-wide automation, system integration, and operational excellence.",
  keywords: [
    "Digital Transformation",
    "Process Excellence",
    "Continuous Improvement",
    "Automation",
    "System Integration",
    "Process Optimization",
    "Operational Excellence",
    "Change Management",
  ],
  authors: [{ name: "Abolfazl Shirkavand" }],
  openGraph: {
    title: "Abolfazl Shirkavand | Digital Transformation Leader",
    description:
      "8+ years driving enterprise automation, process excellence, and digital transformation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
