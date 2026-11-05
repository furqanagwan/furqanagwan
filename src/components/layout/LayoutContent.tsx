"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import Sidebar from "./Sidebar";
import Header, { SidebarToggleIcon } from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import { MAIN_CONTENT_ID, MOBILE_MENU_ID } from "./landmarkIds";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobileMenuOpen, closeMobileMenu, toggleMobileMenu } =
    useSidebar();

  return (
    <>
      <div className="fixed top-[var(--safe-top)] left-0 h-[54px] flex items-center pl-[max(1.5rem,var(--safe-left))] pr-6 z-[60] md:hidden pointer-events-none">
        <Link
          href="/"
          className={`text-[20px] font-bold tracking-tight pointer-events-auto transition-colors duration-300 ${isMobileMenuOpen ? "text-white" : "text-black dark:text-white"
            }`}
          onClick={closeMobileMenu}
        >
          furqanagwan
        </Link>
      </div>

      <div className="fixed top-[var(--safe-top)] right-0 h-[54px] flex items-center pl-6 pr-[max(1.5rem,var(--safe-right))] z-[100] md:hidden pointer-events-none">
        <button
          type="button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls={MOBILE_MENU_ID}
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

      <MobileMenu />

      <div
        className={`
          relative min-h-screen bg-background transition-transform duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-50
          ${isMobileMenuOpen
            ? "translate-x-[min(85vw,360px)] md:translate-x-0 overflow-hidden h-screen"
            : "translate-x-0"
          }
        `}
      >
        <div
          className={`
            absolute inset-0 z-50 bg-black/5 backdrop-blur-[8px] cursor-pointer md:hidden
            transition-all duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

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
          <div className="hidden md:block"></div>

          <div
            className={`
            relative hidden md:block overflow-hidden
            transition-all duration-300 ease-in-out
            ${isOpen ? "w-[200px]" : "w-0"}
          `}
          >
            <Sidebar />
          </div>

          <div className="relative min-w-0 pl-[var(--safe-left)] pr-[var(--safe-right)] pb-[var(--safe-bottom)]">
            <main id={MAIN_CONTENT_ID} tabIndex={-1} className="relative outline-none pt-[calc(54px+var(--safe-top))] md:pt-[calc(4rem+var(--safe-top))]">
              {children}
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
