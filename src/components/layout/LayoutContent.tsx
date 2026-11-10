"use client";

import { useSidebar } from "./SidebarContext";
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import { MobileLogo } from "./MobileLogo";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MenuOverlay } from "./MenuOverlay";
import { DesktopSidebarColumn } from "./DesktopSidebarColumn";
import { MAIN_CONTENT_ID } from "./landmarkIds";
import { MOBILE_MENU_SLIDE_TRANSITION } from "./mobileMenuStyles";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobileMenuOpen } = useSidebar();

  return (
    <>
      <MobileLogo />
      <MobileMenuToggle />
      <MobileMenu />

      <div
        className={`
          relative min-h-screen bg-background transition-transform ${MOBILE_MENU_SLIDE_TRANSITION} z-50
          ${isMobileMenuOpen
            ? "translate-x-[min(85vw,360px)] md:translate-x-0 overflow-hidden h-screen"
            : "translate-x-0"
          }
        `}
      >
        <MenuOverlay />
        <Header />

        <div
          className={`
          grid grid-cols-[1fr] min-h-screen
          ${isOpen ? "md:grid-cols-[200px_1fr]" : "md:grid-cols-[0px_1fr]"}
        `}
        >
          <DesktopSidebarColumn />

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
