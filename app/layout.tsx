import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eric Lopez Rosales (Frenek) | Software Engineer",
  description: "Portafolio oficial de Eric Frenek Lopez Rosales. Desarrollador Backend especializado en Go, AWS CDK, integraciones de API y arquitecturas Serverless.",
  keywords: [
    "Eric Lopez Rosales", 
    "Frenek Lopez", 
    "Eric Frenek", 
    "Backend Engineer", 
    "Go Developer", 
    "AWS CDK", 
    "Serverless", 
    "Gin Framework",
    "Docker"
  ],
  openGraph: {
    title: "Eric Lopez Rosales (Frenek) | Software Engineer",
    description: "Construyendo infraestructura sólida y código limpio. Especialista en Go y AWS.",
    url: "https://freneklopez.dev",
    siteName: "Frenek Lopez Portfolio",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
