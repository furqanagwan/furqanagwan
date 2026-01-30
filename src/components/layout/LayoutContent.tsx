"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import Sidebar from "./Sidebar";
import Header, { SidebarToggleIcon } from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobileMenuOpen, closeMobileMenu, toggleMobileMenu } =
    useSidebar();

  return (
    <>
      {/* Sticky Mobile Logo - Fixed outside the sliding content */}
      <div className="fixed top-0 left-0 h-[54px] flex items-center px-6 z-[60] md:hidden pointer-events-none">
        <Link
          href="/"
          className={`text-[20px] font-bold tracking-tight pointer-events-auto transition-colors duration-300 ${isMobileMenuOpen ? "text-white" : "text-black dark:text-white"
            }`}
          onClick={closeMobileMenu}
        >
          furqanagwan
        </Link>
      </div>

      {/* Sticky Mobile Menu Toggle - Fixed outside the sliding content */}
      <div className="fixed top-0 right-0 h-[54px] flex items-center px-6 z-[100] md:hidden pointer-events-none">
        <button
          type="button"
          aria-label="Toggle mobile menu"
          onClick={toggleMobileMenu}
          className={`pointer-events-auto bg-transparent p-2 transition-colors duration-300 ${isMobileMenuOpen ? "text-white" : "text-black dark:text-white"
            }`}
        >
          <SidebarToggleIcon
            className="w-[18px] h-[18px]"
            isOpen={isMobileMenuOpen}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer (Fixed background layer) */}
      <MobileMenu />

      {/* Main Content Wrapper - Slides to reveal menu */}
      <div
        className={`
          relative min-h-screen bg-background transition-transform duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-50
          ${isMobileMenuOpen
            ? "translate-x-[85%] md:translate-x-0 overflow-hidden h-screen"
            : "translate-x-0"
          }
        `}
      >
        {/* Overlay to close menu when clicking content */}
        <div
          className={`
            absolute inset-0 z-50 bg-black/5 backdrop-blur-[8px] cursor-pointer md:hidden
            transition-all duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Header - Now part of the sliding content */}
        <Header />

        <div
          className={`
          grid grid-cols-[1fr] min-h-screen
          ${isOpen
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
      </div>
    </>
  );
}
