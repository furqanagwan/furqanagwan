"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

export default function ThemeToggle({
  icon,
  darkIcon,
}: {
  icon?: ReactNode;
  darkIcon?: ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex items-center gap-1 text-foreground hover:underline text-xs"
    >
      {isDark
        ? darkIcon || <Sun className="w-4 h-4" />
        : icon || <Moon className="w-4 h-4" />}
    </button>
  );
}
