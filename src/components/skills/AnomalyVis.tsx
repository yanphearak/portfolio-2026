"use client";

import { site } from "@/config/site";
import { SendIcon } from "../Icons";
import VisPanel from "./VisPanel";
import { useVisClock } from "./useVisClock";

const { label, model, stream, txn, latency } = site.visuals.anomaly;

/**
 * Transaction scores, 0–100. Ordinary traffic sits in the 35–58 band and one
 * transaction blows past the threshold. Hard-coded rather than generated —
 * random values would differ between the server and client render.
 */
const SCORES = [
  38, 52, 41, 47, 55, 44, 36, 49, 58, 43, 39, 53, 46, 35, 50, 48, 57, 42, 37,
  51, 45, 96, 44, 38, 49, 42, 54, 46, 37, 52,
];
/** Index of the outlier above. */
const ANOM = 21;
/** How many transactions are on screen at once. */
const WINDOW = 18;
const THRESHOLD = 72;

const STEP_MS = 300;
/** Ticks the "alert sent" confirmation stays up after the detection. */
const ALERT_TICKS = 5;

/** Dashes drawn with a gradient — a dashed border loses to the global `*` rule. */
const DASHES =
  "repeating-linear-gradient(to right, var(--border-strong) 0 3px, transparent 3px 8px)";

/**
 * Live transaction scoring: the model rates each transaction as it arrives, and
 * the one that breaks the threshold trips an alert straight out to Telegram.
 * The whole point is the gap between detection and notification being nothing —
 * so the alert row lands on the same tick as the spike.
 */
export default function AnomalyVis() {
  // No hold on the wrap: a live stream that freezes every lap reads as a stall.
  const { ref, i } = useVisClock(SCORES.length, STEP_MS, STEP_MS);

  const bars = Array.from(
    { length: WINDOW },
    (_, k) => SCORES[(i + k) % SCORES.length],
  );

  // How many ticks since the outlier was the newest transaction on screen.
  const headIdx = (i + WINDOW - 1) % SCORES.length;
  const since = (headIdx - ANOM + SCORES.length) % SCORES.length;
  const detected = since === 0;
  const alerted = since > 0 && since <= ALERT_TICKS;

  return (
    <div ref={ref}>
      <VisPanel
        label={label}
        note={model}
        status={detected ? "anomaly" : alerted ? "alert sent" : "scoring"}
        busy={detected || alerted}
      >
        <div className="flex h-full flex-col gap-1.5">
          <div className="flex items-baseline justify-between text-[9px]">
            <span className="text-faint">{stream}</span>
            <span className="text-faint/70">ml scoring</span>
          </div>

          <div className="relative min-h-0 flex-1">
            <span
              className="absolute inset-x-0 h-px"
              style={{ bottom: `${THRESHOLD}%`, backgroundImage: DASHES }}
            />

            <div className="flex h-full items-end gap-[3px]">
              {bars.map((v, k) => {
                const over = v > THRESHOLD;
                return (
                  <span
                    key={k}
                    className={`flex-1 rounded-[2px] transition-[height,background-color] duration-200 ease-out ${
                      over
                        ? "bg-accent"
                        : "bg-line-strong"
                    }`}
                    style={{ height: `${v}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* what the model did about it */}
          <div className="flex items-center gap-2 text-micro">
            {detected ? (
              <>
                <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
                <span className="truncate text-text">anomaly · txn {txn}</span>
                <span className="relative ml-auto h-1 w-8 shrink-0 overflow-hidden rounded-full bg-line-strong">
                  {/* keyframed, not transitioned — this element mounts mid-run,
                      and transitions don't fire on mount. */}
                  <span
                    className="animate-bar-fill absolute inset-0 origin-left rounded-full bg-accent"
                    style={{ animationDuration: `${STEP_MS}ms` }}
                  />
                </span>
              </>
            ) : alerted ? (
              <>
                <SendIcon className="shrink-0 text-micro text-accent" />
                <span className="truncate text-accent">telegram alert sent</span>
                <span className="ml-auto shrink-0 tabular-nums text-accent">
                  {latency}
                </span>
              </>
            ) : (
              <>
                <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-faint/40" />
                <span className="truncate text-faint">
                  scoring · no anomaly
                </span>
              </>
            )}
          </div>
        </div>
      </VisPanel>
    </div>
  );
}
