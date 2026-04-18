"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "Experiences", href: "/experiences" },
  { label: "Qualifications", href: "/qualifications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useSidebar();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <div
      className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
        isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isMobileMenuOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={closeMobileMenu}
        aria-label="Close menu"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm w-full h-full"
        tabIndex={isMobileMenuOpen ? 0 : -1}
      />

      {/* Panel — slides down from the top nav line */}
      <nav
        className={`absolute inset-x-0 top-14 bg-background border-b border-border transition-transform duration-300 origin-top ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
        }`}
        aria-label="Main"
      >
        <ul className="flex flex-col py-4 px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMobileMenu}
                className={`block py-3 text-[22px] font-medium tracking-tight transition-colors ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
