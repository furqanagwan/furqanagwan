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
    items: [
      { label: "Qualifications", href: "/qualifications" },
      { label: "Education", href: "/education" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Check if a path is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Check if any item in a section is active
  const isSectionActive = (section: NavSection) => {
    if (section.href) return isActive(section.href);
    return section.items?.some((item) => isActive(item.href)) ?? false;
  };

  // Toggle section expansion
  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  // Auto-expand sections with active items
  const isExpanded = (section: NavSection) => {
    if (isSectionActive(section) && section.items) return true;
    return expandedSections.includes(section.label);
  };

  return (
    <>
      {/* Mobile Menu Placeholder */}
      <div className="md:hidden"></div>

      {/* Desktop Left Sidebar - with slide animation */}
      <nav
        className={`
          hidden md:block w-[200px] mt-[187px] px-5 absolute right-0 top-0
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-[200px]"}
        `}
      >
        <div
          className={`
            fixed max-h-[808px] overflow-x-hidden overflow-y-auto pb-[46px]
            transition-opacity duration-300 ease-in-out
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="w-40">
            <ul className="text-base font-bold tracking-[normal] leading-5 list-none pl-0 md:text-sm md:font-medium md:leading-[22.96px]">
              {navSections.map((section, index) => {
                const hasSubitems = section.items && section.items.length > 0;
                const sectionActive = isSectionActive(section);
                const expanded = hasSubitems && isExpanded(section);

                return (
                  <li
                    key={section.label}
                    className={`relative text-base font-bold leading-5 md:text-sm md:font-medium md:leading-[22.96px] ${index > 0 ? "mt-0.5" : ""}`}
                  >
                    {/* Section Header */}
                    <div
                      className={`
                        relative text-base font-bold items-center justify-between leading-5 w-full rounded-[6.08px] 
                        md:text-sm md:font-medium md:leading-[22.96px]
                        before:block before:h-full before:pointer-events-none before:absolute before:w-full before:z-[-1] before:rounded-[6.08px] before:left-0 before:top-0
                        ${
                          sectionActive && !hasSubitems
                            ? "before:bg-black/5 dark:before:bg-white/5"
                            : "before:bg-transparent hover:before:bg-black/5 dark:hover:before:bg-white/5"
                        }
                        group
                      `}
                    >
                      {hasSubitems ? (
                        <button
                          type="button"
                          onClick={() => toggleSection(section.label)}
                          className="text-base font-bold flex items-center justify-between h-full leading-5 w-full pl-3 pr-3 py-2 md:text-sm md:font-medium md:leading-[22.96px] bg-transparent border-none cursor-pointer"
                        >
                          <span>{section.label}</span>
                          <ChevronDown
                            size={14}
                            className={`text-black/40 dark:text-white/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={section.href!}
                          className="text-base font-bold block h-full leading-5 w-full pl-3 pr-5 py-2 md:text-sm md:font-medium md:leading-[22.96px]"
                        >
                          {section.label}
                        </Link>
                      )}
                    </div>

                    {/* Expandable Sub-items */}
                    {hasSubitems && (
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-in-out ${
                          expanded
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="list-none pl-3 pt-1">
                          {section.items!.map((item) => {
                            const itemActive = isActive(item.href);
                            return (
                              <li key={item.label} className="mt-0.5">
                                <div
                                  className={`
                                    relative rounded-[6.08px]
                                    before:block before:h-full before:pointer-events-none before:absolute before:w-full before:z-[-1] before:rounded-[6.08px] before:left-0 before:top-0
                                    ${
                                      itemActive
                                        ? "before:bg-black/5 dark:before:bg-white/5"
                                        : "before:bg-transparent hover:before:bg-black/5 dark:hover:before:bg-white/5"
                                    }
                                  `}
                                >
                                  <Link
                                    href={item.href}
                                    className="text-sm font-medium block pl-3 pr-5 py-1.5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                                  >
                                    {item.label}
                                  </Link>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
