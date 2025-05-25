import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "../styles/global.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexxel.dev"),
  title: {
    default: "Furqan Agwan",
    template: "%s | Furqan Agwan",
  },
  description: "Developer, cardist and maker of things.",
  openGraph: {
    title: "Furqan Agwan",
    description: "Developer, cardist and maker of things.",
    url: "https://www.nexxel.dev",
    siteName: "Furqan Agwan",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.nexxel.dev/og/home" }],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Furqan Agwan",
    card: "summary_large_image",
    creator: "@furqanagwan",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body className="antialiased min-h-screen font-mono">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
