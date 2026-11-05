/**
 * Site navigation — the single source of truth for the desktop sidebar and
 * the mobile menu. Add, rename or reorder pages here.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  /** Set for a top-level link. */
  href?: string;
  /** Set for a collapsible group of links. */
  items?: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
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

/** True when `href` is the current page, or a parent of it (except Home). */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** True when the section's link, or any link inside it, is the current page. */
export function isSectionActive(pathname: string, section: NavSection): boolean {
  if (section.href) return isActivePath(pathname, section.href);
  return section.items?.some((item) => isActivePath(pathname, item.href)) ?? false;
}
