"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  isMobileMenuOpen: boolean;
  toggle: () => void;
  toggleMobileMenu: () => void;
  setOpen: (open: boolean) => void;
  closeMobileMenu: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const setOpen = (open: boolean) => setIsOpen(open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isMobileMenuOpen,
        toggle,
        toggleMobileMenu,
        setOpen,
        closeMobileMenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
