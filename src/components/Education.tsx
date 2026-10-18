import Image from "next/image";

import { site } from "@/config/site";
import Section from "./Section";
import Chip from "./ui/Chip";
import { ExternalIcon } from "./Icons";
import HelloWorldSnippet from "./HelloWorldSnippet";

/**
 * Same two-column timeline as Experience — period on the left, the entry on
 * the right — so the two read as stretches of one line.
 */
export default function Education() {
  return (
    <Section
      id="education"
      title={site.sections.education.label}
      subtitle={site.sections.education.subtitle}
    >
      <ol>
        {site.education.map((entry) => (
          <li
            key={`${entry.school}-${entry.period}`}
            className="grid gap-5 border-t border-line py-10 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
          >
            <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start">
              <p className="text-note text-muted">
                {entry.period.replace("—", "to")}
              </p>
              {entry.credential && <Chip as="span">{entry.credential}</Chip>}
            </div>

            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-[-0.01em] text-balance sm:text-2xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-body">
                    <span className="font-semibold text-text">
                      {entry.school}
                    </span>
                    {entry.location && (
                      <span className="text-muted">{entry.location}</span>
                    )}
                  </p>
                </div>

                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${entry.school}`}
                    className="mt-1 text-muted transition-colors hover:text-accent"
                  >
                    <ExternalIcon className="h-[18px] w-[18px]" />
                  </a>
                )}
              </div>

              {entry.image && (
                <Image
                  src={entry.image}
                  alt={entry.imageAlt}
                  width={2048}
                  height={1152}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="mt-6 aspect-[16/9] w-full max-w-2xl rounded-[6px] object-cover"
                />
              )}

              {entry.description && (
                <p className="mt-5 max-w-[64ch] text-body leading-relaxed text-muted">
                  {entry.description}
                </p>
              )}

              {/* The degree where the first program got written gets to show
                  it — and run it. */}
              {entry.snippet && (
                <div className="max-w-2xl">
                  <HelloWorldSnippet />
                </div>
              )}

              {entry.highlights?.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {entry.highlights.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
