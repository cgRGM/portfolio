import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalNavigation from "@/components/conditional-navigation";
import { ConvexClientProvider } from "@/components/providers/convex-client";

export const metadata: Metadata = {
  title: "CG Stewart | Full Stack Developer",
  description:
    "Full stack developer portfolio featuring web applications, blog posts, and project showcases. Built with modern technologies.",
  keywords: [
    "full stack developer",
    "web development",
    "portfolio",
    "react",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "CG Stewart" }],
  creator: "CG Stewart",
  publisher: "CG Stewart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cgstewart.dev"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CG Stewart | Full Stack Developer",
    description:
      "Full stack developer portfolio featuring web applications, blog posts, and project showcases.",
    url: "https://cgstewart.dev",
    siteName: "CG Stewart Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "CG Stewart - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CG Stewart | Full Stack Developer",
    description:
      "Full stack developer portfolio featuring web applications, blog posts, and project showcases.",
    creator: "@c_g_stewart", // Replace with your Twitter handle
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <ConvexAuthNextjsServerProvider>
          <ConditionalNavigation />
          <ConvexClientProvider> {children}</ConvexClientProvider>
          <SpeedInsights /> <Analytics />
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}
