import { Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./global.css";

// Font setup
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Global metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://furqanagwan.com"),
  title: {
    default: "Furqan Agwan",
    template: "%s | Furqan Agwan",
  },
  description: "Better than tomorrow",
  icons: [{ rel: "icon", url: "/favicon.ico", type: "image/svg+xml" }],
  openGraph: {
    title: "Furqan Agwan",
    description: "Developer, cardist and maker of things.",
    url: "https://furqanagwan.com",
    siteName: "Furqan Agwan",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  twitter: {
    title: "Furqan Agwan",
    card: "summary_large_image",
    creator: "@furqanagwan",
  },
};

// App root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased min-h-screen transition-colors bg-white text-black dark:bg-neutral-950 dark:text-white ${geist.variable} ${jetbrains.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
