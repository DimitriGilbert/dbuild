import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";
import "highlight.js/styles/github-dark.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dbuild.dev",
  description:
    "Dbuild.dev is a portfolio and blog showcasing projects and insights",
  metadataBase: new URL("https://dbuild.dev"),
  openGraph: {
    title: "Dbuild.dev",
    description:
      "Dbuild.dev is a portfolio and blog showcasing projects and insights",
    url: "https://dbuild.dev",
    siteName: "Dbuild.dev",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "Dbuild.dev",
    description:
      "Dbuild.dev is a portfolio and blog showcasing projects and insights",
    images: ["/og-image.jpg"],
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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
