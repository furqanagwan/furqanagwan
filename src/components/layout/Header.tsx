"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface NavItem {
  label: string;
  href: string;
}

// Top-level nav. Keeps the existing routes on this site.
const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experiences", href: "/experiences" },
  { label: "Qualifications", href: "/qualifications" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const { toggleMobileMenu, isMobileMenuOpen } = useSidebar();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-[51] h-14 md:h-16 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-[1440px] mx-auto h-full px-6 md:px-8 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Furqan Agwan — home"
          className="text-[18px] md:text-[19px] font-semibold tracking-tight text-foreground shrink-0"
        >
          furqanagwan
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-x-7 flex-1"
          aria-label="Main"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[14.5px] font-medium transition-colors ${
                isActive(item.href)
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: primary CTA (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1 h-9 px-4 rounded-full bg-foreground text-background text-[13.5px] font-medium hover:opacity-80 transition-opacity"
          >
            Get in touch
            <span aria-hidden="true" className="-mr-0.5">
              ↗
            </span>
          </Link>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
