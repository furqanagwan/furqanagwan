"use client";

import { useSidebar } from "./SidebarContext";
import { MOBILE_MENU_SLIDE_TRANSITION } from "./mobileMenuStyles";

export function MenuOverlay() {
  const { isMobileMenuOpen, closeMobileMenu } = useSidebar();

  return (
    <div
      className={`
        absolute inset-0 z-50 bg-black/5 backdrop-blur-[8px] cursor-pointer md:hidden
        transition-all ${MOBILE_MENU_SLIDE_TRANSITION}
        ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={closeMobileMenu}
      aria-hidden="true"
    />
  );
}
