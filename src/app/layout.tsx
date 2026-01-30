import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
    locale: "en_US",
    url: "https://furqanagwan.com",
    siteName: "Furqan Agwan",
    title: "Furqan Agwan",
    description:
      "Personal website of Furqan Agwan - Blog, Experiences, Projects, and Qualifications",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furqan Agwan",
    description: "Personal website of Furqan Agwan",
    creator: "@furqanagwan",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  other: {
    "theme-color": "#000000",
  },
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
