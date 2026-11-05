"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { MOBILE_MENU_ID } from "./landmarkIds";
import { ChevronDown } from "lucide-react";
import {
  NAV_SECTIONS,
  isActivePath,
  isSectionActive,
  type NavSection,
} from "./navigation";

export default function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const isExpanded = (section: NavSection) => {
    if (isSectionActive(pathname, section) && section.items) return true;
    return expandedSections.includes(section.label);
  };

  return (
    <>
      <div
        className="fixed inset-y-0 left-0 w-[min(85vw,360px)] z-0 bg-black text-white md:hidden overflow-y-auto pl-[var(--safe-left)]"
        id={MOBILE_MENU_ID}
        inert={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between h-[calc(54px+var(--safe-top))] pt-[var(--safe-top)] px-6">
          <div aria-hidden="true" className="w-1" />{" "}
        </div>

        <nav aria-label="Main" className="px-6 pt-8">
          <ul className="list-none pl-0 space-y-4">
            {NAV_SECTIONS.map((section) => {
              const hasSubitems = section.items && section.items.length > 0;
              const sectionActive = isSectionActive(pathname, section);
              const expanded = hasSubitems && isExpanded(section);

              return (
                <li key={section.label}>
                  {hasSubitems ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
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
                                  ${isActivePath(pathname, item.href) ? "text-white" : "text-white/60 hover:text-white"}
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

        <div className="absolute bottom-[max(1.5rem,var(--safe-bottom))] left-6 right-6 flex items-center justify-end">
          <Link
            href="/login"
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
