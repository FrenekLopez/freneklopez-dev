import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Initialize Inter font for clean, modern typography
const inter = Inter({ subsets: ["latin"] });

// Dynamic domain assignment based on the verified environment variable
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freneklopez.dev";

// Global SEO metadata configuration for Next.js App Router.
// Fully optimized for Google discovery under variants like Eric Lopez, Frenek Lopez, or desarrollador Eric.
export const metadata: Metadata = {
  title: "Eric Lopez Rosales | Cloud Architecture & Backend Software Engineer",
  description:
    "Professional portfolio of Eric Lopez Rosales (Frenek Lopez / desarrollador Eric). Specializing in backend software development with Go (Golang) and automated serverless cloud infrastructure on AWS.",
  keywords: [
    "Eric Lopez Rosales",
    "Eric Lopez",
    "Frenek Lopez",
    "Desarrollador Eric",
    "Developer Eric",
    "Software Engineer",
    "Backend Developer",
    "Cloud Architecture",
    "Go",
    "Golang",
    "AWS",
    "Serverless",
  ],
  authors: [{ name: "Eric Lopez Rosales", url: "https://github.com" }],
  creator: "Eric Lopez Rosales",
  publisher: "Eric Lopez Rosales",
  metadataBase: new URL(siteUrl), // Binds production domain safely without hardcoded parameters
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Eric Lopez Rosales | Cloud Architecture Portfolio",
    description:
      "High-performance backend systems and automated cloud infrastructure built by Eric Lopez Rosales.",
    url: siteUrl, // Target canonical address parsed dynamically
    siteName: "Eric Lopez Rosales Portfolio",
    images: [
      {
        url: "/desarrollador-eric.jpg",
        width: 1200,
        height: 630,
        alt: "Eric Lopez Rosales - Backend Software Developer Portfolio Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'scroll-smooth' enables native smooth scrolling for section anchor elements
    // Language set to English to align with your professional international resume content
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#0f1624] text-slate-300 antialiased selection:bg-blue-500/30`}
      >
        {children}
        <Script
          src="/stats/script.js"
          data-website-id="c41636ec-6a33-408c-9df0-f23b7a3252ac"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
