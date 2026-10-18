import { site } from "@/config/site";
import type { SectionId } from "@/config/nav";

type Props = {
  /** Must be listed in `site.order` — that's where its stop on the line comes from. */
  id: SectionId;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

/*
 * Where the heading's first line sits, so the station can line up with it:
 * the content column's top padding plus half the heading's line box.
 */
const STOP = "top-[calc(8rem+17px)]";
const STOP_CENTRE = "calc(8rem + 24px)";

/**
 * Every section is a stop on one line running down the left margin (on `lg`):
 * the rail continues from section to section, a station marks each heading,
 * and it starts at the first section and ends at the last, wherever
 * `site.order` puts them. Below `lg` the margin folds away and the station sits
 * above the heading instead.
 */
export default function Section({ id, title, subtitle, children }: Props) {
  const first = site.order[0] === id;
  const last = site.order[site.order.length - 1] === id;

  return (
    <section id={id}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
        {/* --- the rail (lg) --- */}
        <div aria-hidden className="relative hidden lg:block">
          <span
            className="absolute left-[6px] w-[3px] bg-track"
            style={{
              top: first ? STOP_CENTRE : 0,
              bottom: last ? undefined : 0,
              height: last ? STOP_CENTRE : undefined,
            }}
          />
          <span
            className={`absolute ${STOP} left-0 flex items-center gap-3`}
          >
            <span
              className={`h-[15px] w-[15px] shrink-0 rounded-full bg-bg ${
                last
                  ? "shadow-[inset_0_0_0_4px_var(--text)]"
                  : "shadow-[inset_0_0_0_3px_var(--text)]"
              }`}
            />
            <span className="text-note font-semibold text-muted">{title}</span>
          </span>
        </div>

        {/* --- the content --- */}
        {/* Top padding is what STOP is measured from; the bottom is kept
            short so consecutive headings don't drift a screen apart. */}
        <div
          className={`pt-20 sm:pt-24 lg:pt-32 ${last ? "pb-24 lg:pb-32" : "pb-4 lg:pb-8"}`}
        >
          <div className="mb-10 sm:mb-14">
            <p className="flex items-center gap-2.5 text-note font-semibold text-muted lg:sr-only">
              <span
                aria-hidden
                className="h-[11px] w-[11px] rounded-full shadow-[inset_0_0_0_2.5px_var(--text)]"
              />
              {title}
            </p>
            {subtitle && (
              <h2 className="mt-3 max-w-[22ch] text-[2rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance sm:text-[2.75rem] lg:mt-0">
                {subtitle}
              </h2>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
