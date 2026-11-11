"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { SIDEBAR_NAVIGATION_ID } from "./landmarkIds";
import {
  NAV_SECTIONS,
  isActivePath,
  isNavGroup,
  isSectionActive,
  type NavGroupSection,
  type NavLinkSection,
} from "./navigation";
import { useExpandedNavGroups } from "./useExpandedNavGroups";

const SIDEBAR_ROW_TEXT =
  "text-base font-bold leading-5 md:text-sm md:font-medium md:leading-[22.96px]";

const SIDEBAR_ROW_HIGHLIGHT =
  "before:block before:h-full before:pointer-events-none before:absolute before:w-full before:z-[-1] before:rounded-[6.08px] before:left-0 before:top-0";

const SIDEBAR_ROW_ACTIVE = "before:bg-black/5 dark:before:bg-white/5";

const SIDEBAR_ROW_INACTIVE =
  "before:bg-transparent hover:before:bg-black/5 dark:hover:before:bg-white/5";

function SidebarLinkRow({
  section,
  isActive,
}: {
  section: NavLinkSection;
  isActive: boolean;
}) {
  return (
    <div
      className={`relative ${SIDEBAR_ROW_TEXT} items-center justify-between w-full rounded-[6.08px] ${SIDEBAR_ROW_HIGHLIGHT} ${
        isActive ? SIDEBAR_ROW_ACTIVE : SIDEBAR_ROW_INACTIVE
      } group`}
    >
      <Link
        href={section.href}
        className={`${SIDEBAR_ROW_TEXT} block h-full w-full pl-3 pr-5 py-2`}
      >
        {section.label}
      </Link>
    </div>
  );
}

function SidebarGroupRow({
  group,
  isExpanded,
  onToggle,
}: {
  group: NavGroupSection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`relative ${SIDEBAR_ROW_TEXT} items-center justify-between w-full rounded-[6.08px] ${SIDEBAR_ROW_HIGHLIGHT} ${SIDEBAR_ROW_INACTIVE} group`}
    >
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={onToggle}
        className={`${SIDEBAR_ROW_TEXT} flex items-center justify-between h-full w-full pl-3 pr-3 py-2 bg-transparent border-none cursor-pointer`}
      >
        <span>{group.label}</span>
        <ChevronDown
          size={14}
          className={`text-black/40 dark:text-white/40 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

function SidebarGroupLinks({
  group,
  isExpanded,
  pathname,
}: {
  group: NavGroupSection;
  isExpanded: boolean;
  pathname: string;
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-200 ease-in-out ${
        isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="list-none pl-3 pt-1">
        {group.items.map((item) => (
          <li key={item.label} className="mt-0.5">
            <div
              className={`relative rounded-[6.08px] ${SIDEBAR_ROW_HIGHLIGHT} ${
                isActivePath(pathname, item.href)
                  ? SIDEBAR_ROW_ACTIVE
                  : SIDEBAR_ROW_INACTIVE
              }`}
            >
              <Link
                href={item.href}
                className="text-sm font-medium block pl-3 pr-5 py-1.5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();
  const { toggleGroup, isGroupExpanded } = useExpandedNavGroups(pathname);

  return (
    <nav
      id={SIDEBAR_NAVIGATION_ID}
      aria-label="Main"
      inert={!isOpen}
      className="hidden md:block w-[200px] mt-[187px] px-5 absolute right-0 top-0"
    >
      <div
        className={`fixed max-h-[min(808px,calc(100dvh-187px))] overflow-x-hidden overflow-y-auto pb-[46px] transition-[opacity,translate] duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 -translate-x-[200px]"
        }`}
      >
        <div className="w-40">
          <ul
            className={`${SIDEBAR_ROW_TEXT} tracking-[normal] list-none pl-0`}
          >
            {NAV_SECTIONS.map((section, index) => (
              <li
                key={section.label}
                className={`relative ${SIDEBAR_ROW_TEXT} ${index > 0 ? "mt-0.5" : ""}`}
              >
                {isNavGroup(section) ? (
                  <>
                    <SidebarGroupRow
                      group={section}
                      isExpanded={isGroupExpanded(section)}
                      onToggle={() => toggleGroup(section.label)}
                    />
                    <SidebarGroupLinks
                      group={section}
                      isExpanded={isGroupExpanded(section)}
                      pathname={pathname}
                    />
                  </>
                ) : (
                  <SidebarLinkRow
                    section={section}
                    isActive={isSectionActive(pathname, section)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
