import Image from "next/image";
import { site } from "@/config/site";
import Reveal from "./Reveal";
import Terminal from "./Terminal";
import IconLink from "./ui/IconLink";
import {
  ArrowIcon,
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from "./Icons";

export default function Hero() {
  const { links } = site;

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* backdrop: blueprint grid + two drifting colour washes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="animate-float-slow absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)] blur-2xl" />
        <div
          className="animate-float-slow absolute -top-16 right-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,var(--glow-b),transparent)] blur-2xl"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ---- copy ---- */}
          <div>
            {/* Face and availability sit on one row: the photo is the first
                thing above the fold, without displacing the terminal. */}
            {(site.photo || site.available) && (
              <Reveal>
                <div className="mb-7 flex items-center gap-3.5">
                  {site.photo && (
                    <Image
                      src={site.photo}
                      alt={site.photoAlt}
                      width={104}
                      height={104}
                      priority
                      className="h-13 w-13 shrink-0 rounded-full border border-line-strong object-cover"
                    />
                  )}
                  {/* A spec-sheet field, not a pill: the same uppercase-label /
                      value pair the spec sheet below uses, with a hard accent
                      rule carrying the signal the green dot used to. */}
                  {site.available && (
                    <div className="border-l-2 border-accent pl-3.5">
                      <span className="block text-micro font-semibold tracking-[0.22em] text-faint uppercase">
                        Status
                      </span>
                      <span className="mt-1 block text-note text-text">
                        {site.availabilityText}
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            <Reveal delay={60}>
              <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-[4.1rem]">
                {site.name}
                <span className="mt-1.5 block text-gradient">{site.role}</span>
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-6 max-w-xl text-lead leading-relaxed text-muted">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-2 rounded-xl bg-text px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  View my work
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                {links.resume && (
                  <a
                    href={links.resume}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-surface-hover"
                  >
                    <FileIcon className="h-4 w-4" />
                    Résumé
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex items-center gap-2.5">
                {links.email && (
                  <IconLink href={`mailto:${links.email}`} label="Email">
                    <MailIcon />
                  </IconLink>
                )}
                {links.github && (
                  <IconLink href={links.github} label="GitHub" external>
                    <GitHubIcon />
                  </IconLink>
                )}
                {links.linkedin && (
                  <IconLink href={links.linkedin} label="LinkedIn" external>
                    <LinkedInIcon />
                  </IconLink>
                )}
                {links.telegram && (
                  <IconLink href={links.telegram} label="Telegram" external>
                    <TelegramIcon />
                  </IconLink>
                )}
                <span className="ml-2 text-xs text-faint">
                  {site.location}
                </span>
              </div>
            </Reveal>
          </div>

          {/* ---- terminal ---- */}
          <Reveal delay={220} className="lg:pl-4">
            <Terminal />
          </Reveal>
        </div>

        {/* ---- outcome strip ----
             Read left to right it's still an argument — the years produced
             the automation, the automation bought back time, the time saved
             cut cost — but boxed, so each claim stands on its own rather
             than depending on a rail to connect it. The stack itself sits in
             About and Toolchain; the fold argues what it was worth. */}
        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-24 lg:grid-cols-4">
            {site.outcomes.map((item) => (
              <div
                key={item.label}
                className="bg-bg px-5 py-6 transition-colors hover:bg-bg-soft sm:px-6 sm:py-7"
              >
                <dt className="flex items-center gap-2.5 text-micro font-semibold tracking-[0.22em] text-faint uppercase">
                  {/* The same accent bar as the STATUS field above, so the two
                      read as one family. Fixed height on purpose: it sits in
                      this flex row, so animating it would grow the cell, and
                      every cell shares a grid row — the whole strip would
                      resize on hover and shove the page down. */}
                  <span
                    aria-hidden="true"
                    className="h-3 w-0.5 shrink-0 rounded-full bg-accent"
                  />
                  {item.label}
                </dt>
                <dd className="mt-2.5 text-lg font-semibold tracking-tight text-text sm:text-xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
