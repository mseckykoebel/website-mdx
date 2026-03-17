import "./globals.css";

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { baseUrl } from "~/app/sitemap";
import { QueryClientProvider } from "~/app/providers/QueryClientProvider";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mason Secky-Koebel",
    template: "%s | Mason Secky-Koebel",
  },
  description: "Mason Secky-Koebel's personal website",
  openGraph: {
    title: "Mason Secky-Koebel",
    description: "Mason Secky-Koebel's personal website",
    url: baseUrl,
    siteName: "Mason Secky-Koebel",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <div className="min-h-screen py-6 md:py-12 px-6 md:px-24 lg:px-48 xl:px-64">
          <QueryClientProvider>{children}</QueryClientProvider>
        </div>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
