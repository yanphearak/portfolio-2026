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

  // Typographic wordmark instead of a monogram tile: the given name in the body
  // colour, the family name in the accent, set in the mono face the rest of the
  // site uses for machine-ish text. Splits on the last space so a middle name
  // stays with the first half rather than getting dropped.
  const spaceAt = site.name.lastIndexOf(" ");
  const markHead = (spaceAt === -1 ? site.name : site.name.slice(0, spaceAt)).toLowerCase();
  const markTail = spaceAt === -1 ? "" : site.name.slice(spaceAt + 1).toLowerCase();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          aria-label={site.name}
          className="group text-[15px] tracking-tight lowercase"
        >
          <span className="text-text transition-colors duration-300 group-hover:text-accent">
            {markHead}
          </span>
          {markTail && <span className="text-accent">.{markTail}</span>}
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === link.id
                    ? "text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity duration-300 ${
                    active === link.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`mailto:${site.links.email}`}
            className="hidden rounded-lg bg-text px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:inline-block"
          >
            Get in touch
          </a>
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-text md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet. Collapses via grid-template-rows 1fr→0fr rather than a
          guessed max-height, so it fits its contents however many links there are. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid overflow-hidden border-line bg-bg/95 backdrop-blur-xl transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="min-h-0 space-y-1 overflow-hidden px-5 py-4">
          {NAV.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={close}
                className="block rounded-lg px-3 py-2.5 text-body text-muted transition-colors hover:bg-surface-hover hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={`mailto:${site.links.email}`}
              onClick={close}
              className="block rounded-lg bg-text px-3 py-2.5 text-center text-body font-medium text-bg"
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
