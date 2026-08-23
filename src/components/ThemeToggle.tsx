"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

/**
 * Reads the theme the blocking script in layout.tsx already applied, then
 * flips it and remembers the choice.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private mode — the toggle still works for this session
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:bg-surface-hover hover:text-text"
    >
      {/* Render nothing until mounted so server and client markup agree. */}
      {mounted ? (
        theme === "dark" ? (
          <SunIcon className="h-[17px] w-[17px]" />
        ) : (
          <MoonIcon className="h-[17px] w-[17px]" />
        )
      ) : (
        <span className="h-[17px] w-[17px]" />
      )}
    </button>
  );
}
