"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Qualifications", href: "/qualifications" },
  { label: "Education", href: "/education" },
  { label: "Experiences", href: "/experiences" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  // Determine active item based on pathname
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
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
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li
                    key={item.label}
                    className={`relative text-base font-bold leading-5 md:text-sm md:font-medium md:leading-[22.96px] ${index > 0 ? "mt-0.5" : ""}`}
                  >
                    <div
                      className={`
                        relative text-base font-bold items-center justify-between leading-5 w-full rounded-[6.08px] 
                        md:text-sm md:font-medium md:leading-[22.96px]
                        before:block before:h-full before:pointer-events-none before:absolute before:w-full before:z-[-1] before:rounded-[6.08px] before:left-0 before:top-0
                        ${
                          active
                            ? "before:bg-black/5 dark:before:bg-white/5"
                            : "before:bg-transparent hover:before:bg-black/5 dark:hover:before:bg-white/5"
                        }
                        group
                      `}
                    >
                      <Link
                        href={item.href}
                        className="text-base font-bold block h-full leading-5 w-full pl-3 pr-5 py-2 md:text-sm md:font-medium md:leading-[22.96px]"
                      >
                        {item.label}
                      </Link>
                    </div>
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
