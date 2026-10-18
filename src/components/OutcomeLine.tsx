import { site } from "@/config/site";

/** When the fill starts, and how long it takes to reach the last stop. */
const START_S = 0.35;
const RUN_S = 1.6;

/**
 * `site.outcomes` drawn as stops on a line, read left to right as an argument:
 * the years produced the automation, the automation bought back time, the time
 * cut cost. On load the line draws itself and each stop lights as the fill
 * reaches it — the one piece of unprompted motion on the page. Vertical on
 * phones, where four stops don't fit across.
 *
 * Pure CSS (see `.outcome-*` in globals.css), so it costs no JavaScript and
 * renders finished when motion is reduced.
 */
export default function OutcomeLine() {
  const stops = site.outcomes;
  const last = stops.length - 1;

  return (
    <ol className="relative grid gap-7 sm:grid-cols-4 sm:gap-6">
      {/* Across (sm+): the rail, then the lit line drawn over it, both from
          the first stop's centre to the last's. Each column is a quarter of
          the row less the gaps, so the last centre sits 27px past 75%. */}
      <span
        aria-hidden
        className="absolute top-[7px] right-[calc(25%-27px)] left-[7px] hidden h-1 bg-track sm:block"
      />
      <span
        aria-hidden
        className="outcome-fill absolute top-[7px] right-[calc(25%-27px)] left-[7px] hidden h-1 bg-accent sm:block"
      />

      {stops.map((item, i) => {
        // Arrives when the fill does: an even share of the run per stop.
        const delay = `${START_S + (RUN_S * i) / Math.max(last, 1)}s`;
        const end = i === last;

        return (
          <li
            key={item.label}
            className="relative flex items-start gap-4 sm:flex-col sm:gap-4"
          >
            {/* Down (phones): one segment per gap, reaching the next stop's
                centre, each lit in turn. */}
            {!end && (
              <span
                aria-hidden
                className="absolute top-[9px] -bottom-[calc(1.75rem+9px)] left-[7px] w-1 bg-track sm:hidden"
              >
                <span
                  className="outcome-fill absolute inset-0 bg-accent"
                  style={{
                    animationDelay: delay,
                    animationDuration: `${RUN_S / Math.max(last, 1)}s`,
                    animationTimingFunction: "linear",
                  }}
                />
              </span>
            )}
            <span
              aria-hidden
              className={`outcome-stop relative z-10 h-[18px] w-[18px] shrink-0 rounded-full bg-bg ${
                end
                  ? "shadow-[inset_0_0_0_5px_var(--accent)]"
                  : "shadow-[inset_0_0_0_3.5px_var(--accent)]"
              }`}
              style={{ animationDelay: delay }}
            />
            <div className="outcome-label -mt-1 sm:mt-0" style={{ animationDelay: delay }}>
              <p className="text-xl leading-tight font-extrabold tracking-[-0.01em] text-text sm:text-2xl">
                {item.value}
              </p>
              <p className="mt-1 text-note text-muted">{item.label}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
