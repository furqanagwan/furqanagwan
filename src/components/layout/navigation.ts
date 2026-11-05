export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  href?: string;
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

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isSectionActive(pathname: string, section: NavSection): boolean {
  if (section.href) return isActivePath(pathname, section.href);
  return section.items?.some((item) => isActivePath(pathname, item.href)) ?? false;
}
