"use client";

import { site } from "@/config/site";
import VisPanel from "./VisPanel";
import { useVisClock } from "./useVisClock";

const { label, host, chart, stream, lines } = site.visuals.metrics;

/**
 * A fixed p95 series in milliseconds, with one small excursion over the
 * threshold so the chart has something to say. Hard-coded rather than generated
 * — random values would differ between the server and client render.
 */
const SERIES = [
  128, 131, 127, 134, 140, 136, 129, 133, 142, 151, 147, 139, 133, 130, 136,
  144, 158, 171, 166, 152, 141, 135, 132, 129, 134, 138, 133, 127, 125, 131,
  137, 145, 139, 132, 128, 130, 136, 133, 129, 126,
];
/** How many samples are on screen at once. */
const WINDOW = 24;
/** How many log lines fit beside them. */
const TAIL = 7;
const THRESHOLD = 160;

const MIN = 115;
const MAX = 180;
const VB_W = 240;
const VB_H = 72;
/** Keep the trace off the panel edges: 10% of the height as headroom each way. */
const PAD = 0.1;

const STEP_MS = 420;

/** Older log lines slide up under this fade rather than being cut mid-glyph. */
const FADE = "linear-gradient(to bottom, transparent, #000 30%)";

const LVL: Record<string, string> = {
  ok: "text-accent",
  info: "text-muted",
  dbg: "text-faint",
};

/** Fraction of the plot height, measured from the bottom. */
function frac(v: number) {
  const n = Math.min(1, Math.max(0, (v - MIN) / (MAX - MIN)));
  return PAD + n * (1 - PAD * 2);
}
const yOf = (v: number) => VB_H * (1 - frac(v));
const xOf = (k: number) => (k * VB_W) / (WINDOW - 1);

/**
 * The two halves of the job side by side: a latency chart sliding against its
 * SLO on the left, the log tail scrolling on the right. One clock drives both,
 * so a new sample and a new log line land together.
 *
 * The head of the trace is an HTML dot rather than an SVG circle — the chart
 * stretches to its pane with `preserveAspectRatio="none"`, which would squash a
 * circle into an ellipse.
 */
export default function MetricsVis() {
  // No hold on the wrap: a live feed that freezes for two seconds every lap
  // reads as a stall.
  const { ref, i } = useVisClock(SERIES.length, STEP_MS, STEP_MS);

  const values = Array.from(
    { length: WINDOW },
    (_, k) => SERIES[(i + k) % SERIES.length],
  );
  const head = values[WINDOW - 1];
  const trace = values.map((v, k) => `${xOf(k)},${yOf(v)}`).join(" ");

  const tail = Array.from(
    { length: TAIL },
    (_, k) => lines[(i + k) % lines.length],
  );

  return (
    <div ref={ref}>
      <VisPanel label={label} note={host} status="live" busy>
        <div className="flex h-full gap-2.5">
          {/* ---- metrics ---- */}
          <div className="flex w-[44%] shrink-0 flex-col gap-1">
            <div className="flex items-baseline justify-between text-[9px]">
              <span className="text-faint">{chart}</span>
              <span className="tabular-nums text-accent">{head}ms</span>
            </div>

            <div className="relative min-h-0 flex-1">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="metrics-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.28"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <line
                  x1="0"
                  y1={yOf(THRESHOLD)}
                  x2={VB_W}
                  y2={yOf(THRESHOLD)}
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-line-strong"
                />

                <polygon
                  points={`0,${VB_H} ${trace} ${VB_W},${VB_H}`}
                  fill="url(#metrics-fill)"
                />
                <polyline
                  points={trace}
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-accent"
                />
              </svg>

              <span
                className="absolute right-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_3px_var(--accent-soft)]"
                style={{ top: `${(1 - frac(head)) * 100}%` }}
              />
            </div>

            <span className="text-[9px] text-faint/70">
              slo {THRESHOLD}ms
            </span>
          </div>

          <span className="w-px shrink-0 bg-line" />

          {/* ---- logs ---- */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-baseline justify-between text-[9px]">
              <span className="text-faint">{stream}</span>
              <span className="text-faint/70">tail -f</span>
            </div>

            <div
              className="flex min-h-0 flex-1 flex-col justify-end gap-[3px] overflow-hidden"
              style={{ maskImage: FADE, WebkitMaskImage: FADE }}
            >
              {tail.map((line, k) => {
                const newest = k === TAIL - 1;
                return (
                  <div
                    key={`${line.t}-${k}`}
                    className="flex items-baseline gap-1.5 text-[9px] whitespace-nowrap"
                  >
                    <span className="shrink-0 tabular-nums text-faint/70">
                      {line.t}
                    </span>
                    <span
                      className={`truncate ${newest ? "text-text" : LVL[line.lvl]}`}
                    >
                      {line.msg}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </VisPanel>
    </div>
  );
}
