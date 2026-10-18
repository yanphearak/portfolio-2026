"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { NAV } from "@/config/nav";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
  }

  // Solidify the bar once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section owns the upper third of the viewport.
  useEffect(() => {
    const sections = NAV.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Don't let the page scroll behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the sheet and hands focus back to the button that opened it.
  // Resizing into the desktop layout closes it too — the sheet is `md:hidden`,
  // so without this the scroll lock would stay on with nothing visible to undo it.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) close();
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // How far along the route the reader is: stations before it are passed.
  const at = NAV.findIndex((l) => l.id === active);

  return (
    <header
      // The border is added rather than faded in: the unlayered
      // `* { border-color }` rule in globals.css outranks `border-transparent`.
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a
          href="#top"
          className="text-[15px] font-extrabold tracking-[-0.01em] text-text transition-colors hover:text-accent"
        >
          {site.name}
        </a>

        {/* Desktop: the sections as stops on a line. The stretch up to the
            current stop is lit, so the bar doubles as a progress meter. */}
        <ul className="hidden items-start md:flex">
          {NAV.map((link, i) => {
            const here = i === at;
            const passed = i < at;

            return (
              <li key={link.id} className="relative">
                {i > 0 && (
                  <span
                    aria-hidden
                    className={`absolute top-[4px] right-1/2 left-0 h-[2px] transition-colors duration-300 ${
                      i <= at ? "bg-accent" : "bg-track"
                    }`}
                  />
                )}
                {i < NAV.length - 1 && (
                  <span
                    aria-hidden
                    className={`absolute top-[4px] right-0 left-1/2 h-[2px] transition-colors duration-300 ${
                      i < at ? "bg-accent" : "bg-track"
                    }`}
                  />
                )}
                <a
                  href={`#${link.id}`}
                  aria-current={here ? "location" : undefined}
                  className={`relative flex flex-col items-center gap-1.5 px-3.5 text-note transition-colors ${
                    here
                      ? "font-semibold text-text"
                      : "text-muted hover:text-text"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-[10px] w-[10px] rounded-full transition-[background-color,box-shadow] duration-300 ${
                      here
                        ? "bg-accent shadow-[0_0_0_3px_var(--bg),0_0_0_4.5px_var(--accent)]"
                        : passed
                          ? "bg-accent"
                          : "bg-bg shadow-[inset_0_0_0_2px_var(--track)]"
                    }`}
                  />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`mailto:${site.links.email}`}
            className="hidden rounded-[6px] bg-accent px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90 sm:inline-block"
          >
            Email me
          </a>
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-[6px] border border-line text-muted transition-colors hover:text-text md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet: the same route, run vertically. Collapses via
          grid-template-rows 1fr→0fr rather than a guessed max-height, so it
          fits its contents however many links there are. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid overflow-hidden bg-bg transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        {/* Capped to the viewport below the 4rem bar, and scrollable: in
            landscape on a phone there is less height than this sheet needs. */}
        <ul className="max-h-[calc(100dvh-4rem)] min-h-0 overflow-y-auto overscroll-contain px-5 py-3">
          {NAV.map((link, i) => {
            const here = i === at;

            return (
              <li key={link.id} className="relative">
                <span
                  aria-hidden
                  className={`absolute left-[4px] w-[2px] bg-track ${
                    i === 0 ? "top-1/2" : "top-0"
                  } ${i === NAV.length - 1 ? "bottom-1/2" : "bottom-0"}`}
                />
                <a
                  href={`#${link.id}`}
                  onClick={close}
                  aria-current={here ? "location" : undefined}
                  className={`relative flex items-center gap-4 py-3 text-body ${
                    here ? "font-semibold text-text" : "text-muted"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-[10px] w-[10px] shrink-0 rounded-full ${
                      here
                        ? "bg-accent"
                        : "bg-bg shadow-[inset_0_0_0_2px_var(--track)]"
                    }`}
                  />
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="pt-3 pb-2">
            <a
              href={`mailto:${site.links.email}`}
              onClick={close}
              className="block rounded-[6px] bg-accent px-3 py-2.5 text-center text-body font-semibold text-bg"
            >
              Email me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
