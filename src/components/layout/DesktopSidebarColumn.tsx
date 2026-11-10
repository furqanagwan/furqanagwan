"use client";

import { useSidebar } from "./SidebarContext";
import Sidebar from "./Sidebar";

export function DesktopSidebarColumn() {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`
        relative hidden md:block overflow-hidden
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-[200px]" : "w-0"}
      `}
    >
      <Sidebar />
    </div>
  );
}
