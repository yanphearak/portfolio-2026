import Image from "next/image";
import { site } from "@/config/site";
import OutcomeLine from "./OutcomeLine";
import IconLink from "./ui/IconLink";
import {
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from "./Icons";

export default function Hero() {
  const { links } = site;

  return (
    <section id="top" className="pt-28 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
          <div>
            <h1 className="text-display leading-[0.95] font-extrabold tracking-[-0.035em]">
              {site.name}
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-lead text-muted sm:text-xl">
              <span className="font-semibold text-text">{site.role}</span>
              <span>in {site.location}</span>
            </p>

            {site.available && (
              <p className="mt-3 flex items-center gap-2.5 text-body text-muted">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-signal"
                />
                {site.availabilityText}
              </p>
            )}

            <p className="mt-8 max-w-[40ch] text-xl leading-snug text-text sm:text-[1.6rem] sm:leading-[1.3]">
              {site.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {links.email && (
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-accent px-5 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
                >
                  <MailIcon className="h-4 w-4" />
                  Email me
                </a>
              )}
              <a
                href="#experience"
                className="inline-flex items-center rounded-[6px] border border-line-strong px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-text"
              >
                See my experience
              </a>
              {links.resume && (
                <a
                  href={links.resume}
                  className="inline-flex items-center gap-2 rounded-[6px] border border-line-strong px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-text"
                >
                  <FileIcon className="h-4 w-4" />
                  Résumé
                </a>
              )}

              <span className="flex items-center gap-2 sm:ml-2">
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
              </span>
            </div>
          </div>

          {site.photo && (
            <Image
              src={site.photo}
              alt={site.photoAlt}
              width={416}
              height={416}
              priority
              className="order-first h-20 w-20 rounded-[6px] object-cover lg:order-none lg:mt-3 lg:h-52 lg:w-52"
            />
          )}
        </div>

        <div className="mt-20 sm:mt-24">
          <OutcomeLine />
        </div>
      </div>
    </section>
  );
}
