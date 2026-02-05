import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abolfazl Shirkavand | Process Excellence Leader",
  description: "Digital Transformation and Process Improvement expert driving enterprise-wide automation, system integration, and operational excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
