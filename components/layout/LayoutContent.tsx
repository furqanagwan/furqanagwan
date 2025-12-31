"use client";

import { useSidebar } from "./SidebarContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <>
      {/* Header - positioned at root level, outside the grid */}
      <Header />

      {/* Mobile Menu Overlay */}
      <MobileMenu />

      {/* Main Layout Grid */}
      <div
        className={`
          grid grid-cols-[1fr] min-h-screen transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "md:grid-cols-[0px_200px_1fr]"
              : "md:grid-cols-[0px_0px_1fr]"
          }
        `}
      >
        {/* Column 1: Mobile Sidebar spacer (0px on desktop) */}
        <div className="hidden md:block"></div>

        {/* Column 2: Desktop Sidebar container - animated width */}
        <div
          className={`
            relative hidden md:block overflow-hidden
            transition-all duration-300 ease-in-out
            ${isOpen ? "w-[200px]" : "w-0"}
          `}
        >
          <Sidebar />
        </div>

        {/* Column 3: Main Content */}
        <div className="relative min-w-0">
          <main className="relative pt-[54px] md:pt-16">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
