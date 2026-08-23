"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import Reveal from "./Reveal";
import Section from "./Section";

const jobs = site.experience;

/**
 * Tabbed, one role at a time — the shape the old site used, rebuilt on this
 * design system.
 *
 * The three roles carry 26 bullets between them. As a single timeline that's a
 * wall nobody reads to the end of; as tabs each role is a short, scannable
 * panel and the reader chooses which one they care about. The rail doubles as
 * the career overview: newest at the top, dates under every company.
 *
 * On `lg` the tabs are a vertical rail with an accent edge marking the active
 * one; below that they collapse to a horizontal snap-scrolling row.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Select and focus by index, wrapping at both ends. */
  function move(next: number) {
    const i = (next + jobs.length) % jobs.length;
    setActive(i);
    tabs.current[i]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    // Both axes are live: the rail is vertical on desktop and horizontal on
    // mobile, and a key handler can't be written per-breakpoint.
    const step: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };

    if (e.key in step) {
      e.preventDefault();
      move(active + step[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(jobs.length - 1);
    }
  }

  const job = jobs[active];
  const current = job.period.includes("Present");
  // "April 2024 — Present" → ["April 2024", "Present"], so the start and end of
  // the range can be weighted differently. `.split` on a string without the
  // dash leaves `to` undefined, which the JSX below treats as "no end date".
  const [from, to] = job.period.split("—").map((part) => part.trim());

  return (
    <Section
      id="experience"
      title={site.sections.experience.label}
      subtitle={site.sections.experience.subtitle}
    >
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          {/* --- the rail ------------------------------------------------- */}
          <div
            role="tablist"
            aria-label="Employment history"
            // Negative margin lets the mobile row bleed to the screen edge so
            // the last tab doesn't look clipped mid-word.
            className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0.5 lg:self-start lg:overflow-visible lg:border-l lg:border-line lg:px-0 lg:pb-0"
          >
            {jobs.map((entry, i) => {
              const on = i === active;

              return (
                <button
                  key={`${entry.company}-${entry.period}`}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`exp-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`exp-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`shrink-0 snap-start rounded-xl border px-4 py-2.5 text-left transition-colors duration-200 lg:-ml-px lg:w-full lg:shrink lg:rounded-none lg:rounded-r-lg lg:border-y-0 lg:border-r-0 lg:border-l-[3px] lg:py-3 ${
                    on
                      ? "border-accent/40 bg-accent-soft text-accent lg:border-l-accent lg:bg-transparent"
                      : "border-line bg-surface text-muted hover:border-line-strong hover:text-text lg:border-l-transparent lg:bg-transparent lg:hover:bg-surface"
                  }`}
                >
                  <span className="block min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-note font-bold whitespace-nowrap lg:whitespace-normal">
                        {entry.short}
                      </span>
                      {entry.period.includes("Present") && (
                        <span className="relative grid h-1.5 w-1.5 shrink-0 place-items-center">
                          <span className="absolute h-1.5 w-1.5 animate-pulse-ring rounded-full bg-accent" />
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 hidden text-micro font-medium tracking-wider text-faint lg:block">
                      {entry.period}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* --- the panel ------------------------------------------------ */}
          <div
            // Remounting on `active` replays the fade, so switching tabs reads
            // as a change rather than a flicker of new text.
            key={active}
            role="tabpanel"
            id={`exp-panel-${active}`}
            aria-labelledby={`exp-tab-${active}`}
            tabIndex={0}
            className="animate-panel-in"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-balance sm:text-xl">
                  {job.role}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="text-body font-bold text-accent">
                    {job.company}
                  </span>
                  {job.type && (
                    <>
                      <span className="text-faint">·</span>
                      <span className="text-body text-muted">{job.type}</span>
                    </>
                  )}
                </div>
              </div>

              {/* The period reads as a range rather than a chip: start dimmed,
                  a hairline for the dash, end carrying the weight — accent
                  plus a live dot while the role is current. The old bordered
                  pill sat right beside the role title and competed with it. */}
              <span className="flex shrink-0 items-center gap-2.5 pt-1.5 text-xs font-semibold tracking-wider whitespace-nowrap uppercase">
                <span className="text-faint">{from}</span>
                {to && (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-px w-5 bg-line-strong"
                    />
                    <span
                      className={
                        current ? "font-medium text-accent" : "text-text"
                      }
                    >
                      {to}
                    </span>
                  </>
                )}
                {current && (
                  <span className="relative grid h-1.5 w-1.5 shrink-0 place-items-center">
                    <span className="absolute h-1.5 w-1.5 animate-pulse-ring rounded-full bg-accent" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-body leading-relaxed text-muted">
              {job.description}
            </p>

            {job.highlights?.length > 0 && (
              <>
                <div className="mt-6 h-px bg-line" />
                {/* Two columns on wide screens: twelve bullets in one column is
                    a column of text, not a list you can scan.

                    Multi-column rather than `grid-cols-2` on purpose. A grid
                    flows by row, so reading down the left column gives you
                    every other bullet, and each row is as tall as its tallest
                    item — which leaves ragged holes beside any long one.
                    Columns flow top-to-bottom, then across: source order is
                    scan order, and items pack tight. */}
                <ul className="mt-6 gap-x-10 md:columns-2">
                  {job.highlights.map((point) => (
                    <li
                      key={point}
                      // `break-inside-avoid` keeps a wrapped bullet from being
                      // split across the column boundary mid-sentence.
                      className="relative mb-2.5 break-inside-avoid pl-5 text-note leading-relaxed text-muted"
                    >
                      <span className="absolute top-[0.6em] left-0 h-1.5 w-1.5 rounded-full bg-accent/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
