"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

// Determine if it's daytime (6am - 6pm) or nighttime
function getTimeBasedTheme(): "light" | "dark" {
  const hour = new Date().getHours();
  // Daytime: 6am (6) to 6pm (18)
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

// Inner component that syncs theme with time
function TimeBasedThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Set theme based on current time
    const updateTheme = () => {
      const timeTheme = getTimeBasedTheme();
      setTheme(timeTheme);
    };

    // Set initial theme
    updateTheme();

    // Update theme every minute to catch time changes
    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    // Clear any existing theme preference to enforce time-based
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
