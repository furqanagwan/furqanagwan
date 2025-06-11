import { Moon, Sun } from "lucide-react";
import ThemeToggle from "./ui/theme-toggle";

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto w-full px-4 py-8 text-xs text-muted-foreground flex flex-col sm:flex-row gap-3 justify-between mt-auto border-t border-border">
      <span>© {new Date().getFullYear()} Furqan Agwan</span>
      <div className="flex items-center gap-2">
        <ThemeToggle
          icon={<Sun className="h-4 w-4 dark:hidden" />}
          darkIcon={<Moon className="h-4 w-4 hidden dark:inline" />}
        />
      </div>
    </footer>
  );
}
