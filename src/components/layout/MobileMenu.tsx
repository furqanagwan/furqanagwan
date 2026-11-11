"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { MOBILE_MENU_ID } from "./landmarkIds";
import {
  NAV_SECTIONS,
  isActivePath,
  isNavGroup,
  isSectionActive,
  type NavGroupSection,
  type NavLinkSection,
} from "./navigation";
import { useExpandedNavGroups } from "./useExpandedNavGroups";

const MOBILE_SECTION_TEXT = "text-base font-bold leading-[22.96px] py-1";

const mobileLinkColor = (isActive: boolean) =>
  isActive ? "text-white" : "text-white/60 hover:text-white";

function MobileMenuLink({
  section,
  isActive,
  onNavigate,
}: {
  section: NavLinkSection;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={section.href}
      onClick={onNavigate}
      className={`block ${MOBILE_SECTION_TEXT} transition-colors ${mobileLinkColor(isActive)}`}
    >
      {section.label}
    </Link>
  );
}

function MobileMenuGroup({
  group,
  pathname,
  isActive,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  group: NavGroupSection;
  pathname: string;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={onToggle}
        className={`flex items-center justify-between w-full ${MOBILE_SECTION_TEXT} bg-transparent border-none cursor-pointer transition-colors ${mobileLinkColor(isActive)}`}
      >
        <span>{group.label}</span>
        <ChevronDown
          size={16}
          className={`text-white/60 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="list-none pl-4 pt-2 space-y-3">
          {group.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`block text-sm font-medium transition-colors ${mobileLinkColor(isActivePath(pathname, item.href))}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function MobileMenuContactButton({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mt-auto flex shrink-0 items-center justify-end px-6 pt-8 pb-[max(1.5rem,var(--safe-bottom))]">
      <Link
        href="/contact"
        onClick={onNavigate}
        className="text-sm font-medium bg-[#333] text-white px-5 py-2.5 rounded-full hover:bg-[#444] transition-colors"
      >
        Contact
      </Link>
    </div>
  );
}

export default function MobileMenu() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useSidebar();
  const { toggleGroup, isGroupExpanded } = useExpandedNavGroups(pathname);

  return (
    <div
      className="fixed inset-y-0 left-0 w-[min(85vw,360px)] z-0 flex flex-col bg-black text-white md:hidden overflow-y-auto pl-[var(--safe-left)]"
      id={MOBILE_MENU_ID}
      inert={!isMobileMenuOpen}
    >
      <div
        aria-hidden="true"
        className="shrink-0 h-[calc(54px+var(--safe-top))]"
      />

      <nav aria-label="Main" className="shrink-0 px-6 pt-8">
        <ul className="list-none pl-0 space-y-4">
          {NAV_SECTIONS.map((section) => (
            <li key={section.label}>
              {isNavGroup(section) ? (
                <MobileMenuGroup
                  group={section}
                  pathname={pathname}
                  isActive={isSectionActive(pathname, section)}
                  isExpanded={isGroupExpanded(section)}
                  onToggle={() => toggleGroup(section.label)}
                  onNavigate={closeMobileMenu}
                />
              ) : (
                <MobileMenuLink
                  section={section}
                  isActive={isSectionActive(pathname, section)}
                  onNavigate={closeMobileMenu}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenuContactButton onNavigate={closeMobileMenu} />
    </div>
  );
}
