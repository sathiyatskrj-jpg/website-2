"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm",
        "hover:bg-muted transition-colors",
        className,
      )}
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {!mounted ? (
        <span className="h-4 w-4" />
      ) : current === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}

