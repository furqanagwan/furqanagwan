"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import { SIDEBAR_NAVIGATION_ID } from "./landmarkIds";
import { SidebarToggleIcon } from "./SidebarToggleIcon";

export default function Header() {
  const { toggle, isMobileMenuOpen, isOpen } = useSidebar();

  return (
    <div className="fixed box-border flex h-[calc(54px+var(--safe-top))] pt-[var(--safe-top)] justify-end z-[51] pl-[max(1.5rem,var(--safe-left))] pr-[max(1.5rem,var(--safe-right))] top-0 inset-x-0 md:h-[calc(4rem+var(--safe-top))] md:pl-[max(2rem,var(--safe-left))] md:pr-[max(2rem,var(--safe-right))] bg-[#ffffff] dark:bg-[#000000]">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-x-3 -ml-1">
          <Link
            aria-label="Home"
            href="/"
            className={`relative hidden md:flex items-center h-full ${
              isMobileMenuOpen
                ? "opacity-0 md:opacity-100 duration-0"
                : "opacity-100 transition-opacity duration-200"
            }`}
          >
            <span className="text-[20px] font-bold tracking-tight text-black dark:text-white">
              furqanagwan
            </span>
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation sidebar"
            aria-expanded={isOpen}
            aria-controls={SIDEBAR_NAVIGATION_ID}
            onClick={toggle}
            className="text-black/40 dark:text-white/40 bg-transparent hidden min-h-0 min-w-0 text-center p-5 md:block hover:text-black dark:hover:text-white transition-colors"
          >
            <SidebarToggleIcon
              className="w-[18px] h-[18px]"
              isOpen={isOpen}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:block text-sm font-medium bg-transparent px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
