import Image from "next/image";
import { site } from "@/config/site";
import Section from "./Section";

/** Bullets shown before the rest fold behind "Show all". */
const VISIBLE = 4;

/** The small hollow marker in front of each bullet: a minor stop. */
function Stop() {
  return (
    <span
      aria-hidden
      className="absolute top-[0.55em] left-0 h-[7px] w-[7px] rounded-full shadow-[inset_0_0_0_1.5px_var(--faint)]"
    />
  );
}

/**
 * The roles as stops down a timeline, newest first. A career really is a
 * sequence, so a line is honest here. Each role leads with what it was and
 * its first few responsibilities; the rest sit behind a native <details>, so
 * 26 bullets never land as one wall and nothing needs client JavaScript.
 *
 * Dates and logo sit in the left column, the work in the right; on phones
 * they stack.
 */
export default function Experience() {
  return (
    <Section
      id="experience"
      title={site.sections.experience.label}
      subtitle={site.sections.experience.subtitle}
    >
      <ol>
        {site.experience.map((job) => {
          const current = job.period.includes("Present");
          // "April 2024 — Present" → ["April 2024", "Present"], so the start
          // and end of the range can be weighted differently. A period without
          // the dash leaves `to` undefined: no end date.
          const [from, to] = job.period.split("—").map((part) => part.trim());
          const shown = job.highlights.slice(0, VISIBLE);
          const rest = job.highlights.slice(VISIBLE);
          // Widened from the literal config type, so the "no logo" branch
          // still type-checks while every current entry has one.
          const logo: string = job.logo;

          return (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-5 border-t border-line py-10 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                {/* Logos sit on a white plate at a fixed height, so wordmarks
                    and round emblems come out the same visual size in both
                    themes. No logo: a lettered tile, never a broken image. */}
                {logo ? (
                  <span className="relative block h-12 w-24 shrink-0 rounded-[4px] bg-white">
                    <Image
                      src={logo}
                      alt={`${job.company} logo`}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-[4px] bg-raised text-lg font-extrabold text-muted"
                  >
                    {job.company.charAt(0)}
                  </span>
                )}

                <p className="text-note leading-snug text-muted">
                  {from}
                  {to && (
                    <>
                      {" to "}
                      <span
                        className={
                          current ? "font-semibold text-accent" : "text-text"
                        }
                      >
                        {to}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-extrabold tracking-[-0.01em] sm:text-2xl">
                  {job.role}
                </h3>
                <p className="mt-1 flex flex-wrap gap-x-3 text-body">
                  <span className="font-semibold text-text">{job.company}</span>
                  {job.type && <span className="text-muted">{job.type}</span>}
                </p>

                <p className="mt-4 max-w-[64ch] text-body leading-relaxed text-muted">
                  {job.description}
                </p>

                {shown.length > 0 && (
                  <ul className="mt-5 max-w-[64ch] space-y-2">
                    {shown.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-note leading-relaxed text-muted"
                      >
                        <Stop />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {rest.length > 0 && (
                  <details className="group mt-2 max-w-[64ch]">
                    <summary className="inline-flex list-none items-center gap-2 rounded-[3px] py-1 text-note font-semibold text-accent [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">
                        Show {rest.length} more
                      </span>
                      <span className="hidden group-open:inline">Show fewer</span>
                      <svg
                        viewBox="0 0 10 10"
                        aria-hidden
                        className="size-2.5 fill-current transition-transform group-open:rotate-180"
                      >
                        <path d="M1 3h8L5 8z" />
                      </svg>
                    </summary>
                    <ul className="mt-2 space-y-2">
                      {rest.map((point) => (
                        <li
                          key={point}
                          className="relative pl-5 text-note leading-relaxed text-muted"
                        >
                          <Stop />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
