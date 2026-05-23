import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "highlight.js/styles/github-dark.css";

import "@/index.css";
import { FloatingNavigation } from "@/components/navigation-new";
import { ThemeProvider } from "@/components/theme-provider";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  formatAbsoluteImageUrl,
  formatCanonicalUrl,
} from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: formatCanonicalUrl(),
  },
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: formatCanonicalUrl(),
    siteName: SITE_NAME,
    images: [
      {
        url: formatAbsoluteImageUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Dbuild.dev - Portfolio and Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [formatAbsoluteImageUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.counter.dev/script.js"
          data-id="154c6878-7558-4eff-90f9-bd4904015df1"
          data-utcoffset="1"
          async
        ></script>
        <script
          src="https://chemin.dbuild.dev/script.js"
          data-id="7040d34e-b41f-4f20-88d1-b86ac93266c4"
          data-utcoffset="2"
          data-server="https://chemin.dbuild.dev"
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNavigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
