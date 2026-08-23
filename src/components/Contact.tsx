import { site } from "@/config/site";
import Reveal from "./Reveal";
import Section from "./Section";
import IconLink from "./ui/IconLink";
import {
  ArrowIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from "./Icons";

export default function Contact() {
  const { links, contact } = site;

  return (
    <Section
      id="contact"
      title={site.sections.contact.label}
      subtitle={site.sections.contact.subtitle}
      align="center"
      backdrop={
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float-slow absolute bottom-[-180px] left-1/2 h-[460px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)] blur-2xl" />
        </div>
      }
    >
      <Reveal delay={120}>
        <p className="mx-auto max-w-xl text-lead leading-relaxed text-muted">
          {contact.body}
        </p>
      </Reveal>

      <Reveal delay={180}>
        <a
          href={`mailto:${links.email}`}
          className="group mt-9 inline-flex items-center gap-2.5 rounded-xl bg-text px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <MailIcon className="h-4 w-4" />
          {links.email}
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-8 flex items-center justify-center gap-3">
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
        </div>
      </Reveal>
    </Section>
  );
}
