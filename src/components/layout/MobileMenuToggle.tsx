"use client";

import { useSidebar } from "./SidebarContext";
import { SidebarToggleIcon } from "./SidebarToggleIcon";
import { MOBILE_MENU_ID } from "./landmarkIds";
import {
  MOBILE_CHROME_TEXT_OVER_MENU,
  MOBILE_CHROME_TEXT_OVER_PAGE,
} from "./mobileMenuStyles";

export function MobileMenuToggle() {
  const { isMobileMenuOpen, toggleMobileMenu } = useSidebar();

  return (
    <div className="fixed top-[var(--safe-top)] right-0 h-[54px] flex items-center pl-6 pr-[max(1.5rem,var(--safe-right))] z-[100] md:hidden pointer-events-none">
      <button
        type="button"
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls={MOBILE_MENU_ID}
        onClick={toggleMobileMenu}
        className={`pointer-events-auto bg-transparent p-2 transition-colors duration-300 ${
          isMobileMenuOpen
            ? MOBILE_CHROME_TEXT_OVER_MENU
            : MOBILE_CHROME_TEXT_OVER_PAGE
        }`}
      >
        <SidebarToggleIcon
          className="w-[18px] h-[18px]"
          isOpen={isMobileMenuOpen}
        />
      </button>
    </div>
  );
}
