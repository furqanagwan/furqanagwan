"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

function getTimeBasedTheme(): "light" | "dark" {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

function TimeBasedThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const updateTheme = () => {
      const timeTheme = getTimeBasedTheme();
      setTheme(timeTheme);
    };

    updateTheme();

    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("theme");
    }
  }, []);

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={getTimeBasedTheme()}
      enableSystem={false}
      storageKey="theme"
    >
      <TimeBasedThemeSync />
      {children}
    </NextThemesProvider>
  );
}
