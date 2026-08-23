import Image from "next/image";

import { site } from "@/config/site";
import Reveal from "./Reveal";
import Section from "./Section";
import Chip from "./ui/Chip";
import { ExternalIcon } from "./Icons";
import HelloWorldSnippet from "./HelloWorldSnippet";

export default function Education() {
  return (
    <Section
      id="education"
      title={site.sections.education.label}
      subtitle={site.sections.education.subtitle}
    >
      {/* No card shell here, unlike Skills: these entries are a photo with a
          caption under it, and a border plus fill around that just boxes in
          something that reads better open. The gap does the separating. */}
      <div className="grid gap-16 sm:gap-20">
        {site.education.map((entry, i) => (
          <Reveal key={`${entry.school}-${entry.period}`} delay={i * 70}>
            <article className="group">
              {entry.image && (
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt}
                    width={2048}
                    height={1152}
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    className="aspect-[16/9] max-h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              {/* Text starts flush with the image's left edge — no padding to
                  indent it, which is the whole point of dropping the card. */}
              <div className={entry.image ? "mt-7" : ""}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-balance sm:text-xl">
                      {entry.degree}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-body font-medium text-accent">
                        {entry.school}
                      </span>
                      {entry.location && (
                        <>
                          <span className="text-faint">·</span>
                          <span className="text-body text-muted">
                            {entry.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    {entry.credential && (
                      <span className="hidden sm:inline-block">
                        <Chip as="span">{entry.credential}</Chip>
                      </span>
                    )}
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open ${entry.school}`}
                        className="mt-0.5 text-faint transition-all group-hover:text-accent"
                      >
                        <ExternalIcon className="h-[18px] w-[18px]" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs tracking-wider text-faint">
                  {entry.period}
                </p>

                {entry.description && (
                  <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted">
                    {entry.description}
                  </p>
                )}

                {/* The degree where the first program got written gets to show
                    it — and run it. */}
                {entry.snippet && <HelloWorldSnippet />}

                {entry.highlights?.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {entry.highlights.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
