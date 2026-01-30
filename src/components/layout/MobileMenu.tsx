"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavSection {
  label: string;
  href?: string;
  items?: NavItem[];
}

const navSections: NavSection[] = [
  { label: "Home", href: "/" },
  {
    label: "Work",
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Experiences", href: "/experiences" },
    ],
  },
  {
    label: "About",
    items: [{ label: "Qualifications", href: "/qualifications" }],
  },
  { label: "Blog", href: "/blog" },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isSectionActive = (section: NavSection) => {
    if (section.href) return isActive(section.href);
    return section.items?.some((item) => isActive(item.href)) ?? false;
  };

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const isExpanded = (section: NavSection) => {
    if (isSectionActive(section) && section.items) return true;
    return expandedSections.includes(section.label);
  };

  return (
    <>
      {/* Mobile Menu Drawer - Fixed at bottom z-index, revealed by content sliding */}
      <div
        className="fixed inset-y-0 left-0 w-[85%] z-0 bg-black text-white md:hidden overflow-y-auto"
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Header area in mobile menu */}
        <div className="flex items-center justify-between h-[54px] px-6">
          {/* Logo is now handled by the fixed sticky title in LayoutContent */}
          <div aria-hidden="true" className="w-1" />{" "}
          {/* Spacer to keep layout properties if needed, or just leave empty */}
          {/* No close button needed here as content slides back to close */}
        </div>

        {/* Navigation Links */}
        <nav className="px-6 pt-8">
          <ul className="list-none pl-0 space-y-4">
            {navSections.map((section) => {
              const hasSubitems = section.items && section.items.length > 0;
              const sectionActive = isSectionActive(section);
              const expanded = hasSubitems && isExpanded(section);

              return (
                <li key={section.label}>
                  {hasSubitems ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleSection(section.label)}
                        className={`
                          flex items-center justify-between w-full text-base font-bold leading-[22.96px] py-1 bg-transparent border-none cursor-pointer transition-colors
                          ${sectionActive ? "text-white" : "text-white/60 hover:text-white"}
                        `}
                      >
                        <span>{section.label}</span>
                        <ChevronDown
                          size={16}
                          className={`text-white/60 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-in-out ${expanded
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                          }`}
                      >
                        <ul className="list-none pl-4 pt-2 space-y-3">
                          {section.items!.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={`
                                  block text-sm font-medium transition-colors
                                  ${isActive(item.href) ? "text-white" : "text-white/60 hover:text-white"}
                                `}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={section.href!}
                      onClick={closeMobileMenu}
                      className={`
                        block text-base font-bold leading-[22.96px] py-1 transition-colors
                        ${sectionActive ? "text-white" : "text-white/60 hover:text-white"}
                      `}
                    >
                      {section.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-end">
          <Link
            href="/login" // Matches OpenAI "Log In" button roughly
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
            }}
            className="text-sm font-medium bg-[#333] text-white px-5 py-2.5 rounded-full hover:bg-[#444] transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
