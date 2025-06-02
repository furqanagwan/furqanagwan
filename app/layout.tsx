<<<<<<< HEAD
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "../styles/global.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

=======
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
>>>>>>> origin/migration
export const metadata: Metadata = {
  metadataBase: new URL("https://furqanagwan.com"),
  title: {
    default: "Furqan Agwan",
    template: "%s | Furqan Agwan",
  },
  description: "Better than tomorrow",
<<<<<<< HEAD
=======
  icons: [{ rel: "icon", url: "/favicon.ico", type: "image/svg+xml" }],
>>>>>>> origin/migration
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
<<<<<<< HEAD
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
=======
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
>>>>>>> origin/migration
  },
  twitter: {
    title: "Furqan Agwan",
    card: "summary_large_image",
    creator: "@furqanagwan",
  },
};

<<<<<<< HEAD
=======
// App root layout
>>>>>>> origin/migration
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="en" className={geistMono.variable}>
      <body className="antialiased min-h-screen font-mono">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          {children}
          <Analytics />
        </div>
=======
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased min-h-screen transition-colors bg-white text-black dark:bg-neutral-950 dark:text-white ${geist.variable} ${jetbrains.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
>>>>>>> origin/migration
      </body>
    </html>
  );
}
