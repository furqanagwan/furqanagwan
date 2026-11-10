"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import {
  MOBILE_CHROME_TEXT_OVER_MENU,
  MOBILE_CHROME_TEXT_OVER_PAGE,
} from "./mobileMenuStyles";

export function MobileLogo() {
  const { isMobileMenuOpen, closeMobileMenu } = useSidebar();

  return (
    <div className="fixed top-[var(--safe-top)] left-0 h-[54px] flex items-center pl-[max(1.5rem,var(--safe-left))] pr-6 z-[60] md:hidden pointer-events-none">
      <Link
        href="/"
        className={`text-[20px] font-bold tracking-tight pointer-events-auto transition-colors duration-300 ${
          isMobileMenuOpen
            ? MOBILE_CHROME_TEXT_OVER_MENU
            : MOBILE_CHROME_TEXT_OVER_PAGE
        }`}
        onClick={closeMobileMenu}
      >
        furqanagwan
      </Link>
    </div>
  );
}
