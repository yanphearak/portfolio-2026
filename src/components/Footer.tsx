import { site } from "@/config/site";
import IconLink from "./ui/IconLink";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from "./Icons";

export default function Footer() {
  const { links } = site;
  // Baked at build time — redeploys keep it current.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-8 sm:flex-row sm:px-8">
        <p className="order-2 text-xs text-faint sm:order-1">
          © {year} {site.name}
        </p>

        {/* Same IconLink control as the hero and the contact section, so the
            three social rows on the page are one thing in three places. */}
        <div className="order-1 flex items-center gap-2.5 sm:order-2">
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
        </div>

        <a
          href="#top"
          className="order-3 text-xs text-muted transition-colors hover:text-accent"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
