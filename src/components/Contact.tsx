import { site } from "@/config/site";
import Section from "./Section";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "./Icons";

/**
 * The end of the line: the rail stops at this section's station. The email
 * address is the call to action, set large enough to read as one.
 */
export default function Contact() {
  const { links, contact } = site;

  const elsewhere = [
    links.github && { href: links.github, label: "GitHub", Icon: GitHubIcon },
    links.linkedin && {
      href: links.linkedin,
      label: "LinkedIn",
      Icon: LinkedInIcon,
    },
    links.telegram && {
      href: links.telegram,
      label: "Telegram",
      Icon: TelegramIcon,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    Icon: (props: { className?: string }) => React.ReactNode;
  }[];

  return (
    <Section
      id="contact"
      title={site.sections.contact.label}
      subtitle={site.sections.contact.subtitle}
    >
      <p className="max-w-[56ch] text-lead leading-relaxed text-muted">
        {contact.body}
      </p>

      {links.email && (
        <a
          href={`mailto:${links.email}`}
          className="mt-8 inline-block text-[1.35rem] font-extrabold tracking-[-0.01em] break-all text-text underline decoration-accent decoration-[3px] underline-offset-[10px] transition-colors hover:text-accent sm:text-4xl"
        >
          {links.email}
        </a>
      )}

      {elsewhere.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {elsewhere.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-body font-semibold text-muted transition-colors hover:text-text"
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
