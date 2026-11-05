import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/schema";
import { SkipToContentLink } from "@/components/layout/SkipToContentLink";
import { SITE_LOCALE, SITE_RSS_FEED_PATH, SITE_URL, SITE_X_HANDLE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Furqan Agwan",
    template: "%s | Furqan Agwan",
  },
  description:
    "Personal website of Furqan Agwan - Blog, Experiences, Projects, and Qualifications",
  keywords: [
    "Furqan Agwan",
    "Software Engineer",
    "Developer",
    "Portfolio",
    "Blog",
  ],
  authors: [{ name: "Furqan Agwan" }],
  creator: "Furqan Agwan",
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: "Furqan Agwan",
    title: "Furqan Agwan",
    description:
      "Personal website of Furqan Agwan - Blog, Experiences, Projects, and Qualifications",
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE_X_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  alternates: {
    types: {
      "application/rss+xml": SITE_RSS_FEED_PATH,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className="antialiased font-[var(--font-openai)]"
        suppressHydrationWarning
      >
        <SkipToContentLink />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
          </SidebarProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
