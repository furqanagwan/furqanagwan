"use client";

import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <MobileMenu />
      <main className="relative pt-14 md:pt-16">
        {children}
        <Footer />
      </main>
    </div>
  );
}
