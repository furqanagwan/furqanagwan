export interface NavItem {
  label: string;
  href: string;
}

export interface NavLinkSection {
  label: string;
  href: string;
}

export interface NavGroupSection {
  label: string;
  items: NavItem[];
}

export type NavSection = NavLinkSection | NavGroupSection;

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

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavGroup(section: NavSection): section is NavGroupSection {
  return "items" in section;
}

export function isSectionActive(pathname: string, section: NavSection): boolean {
  if (isNavGroup(section)) {
    return section.items.some((item) => isActivePath(pathname, item.href));
  }
  return isActivePath(pathname, section.href);
}
