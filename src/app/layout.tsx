import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { portfolioConfig } from "@/portfolio-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolioConfig.personal.name} — ${portfolioConfig.personal.navRole}`,
  description: portfolioConfig.personal.metaDescription,
  keywords: [
    "Ujjwal Jain",
    "Product Designer",
    "UI/UX Designer",
    "0→1 Strategy",
    "Mobile & Web UX",
    "Design Systems",
    "Behavioral Psychology",
    "Accessibility (WCAG)",
  ],
  authors: [{ name: portfolioConfig.personal.name, url: portfolioConfig.personal.linkedin }],
  creator: portfolioConfig.personal.name,
  openGraph: {
    title: `${portfolioConfig.personal.name} — ${portfolioConfig.personal.navRole}`,
    description: portfolioConfig.personal.metaDescription,
    url: "https://ujjwaljain.design",
    siteName: `${portfolioConfig.personal.name} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioConfig.personal.name} — ${portfolioConfig.personal.navRole}`,
    description: portfolioConfig.personal.metaDescription,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
