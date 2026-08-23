"use client";

import { site } from "@/config/site";
import { CheckIcon } from "../Icons";
import VisPanel from "./VisPanel";
import { useVisClock } from "./useVisClock";

const { label, repo, checks } = site.visuals.scan;
const N = checks.length;

const STEP_MS = 880;
const HOLD_MS = 2000;

/**
 * A security scan: a beam sweeps the panel and each check resolves as it passes.
 * The beam is a CSS sweep on its own clock rather than a per-step transform —
 * it only has to feel like it's causing the results, not be frame-accurate.
 */
export default function ScanVis() {
  const { ref, i, done } = useVisClock(N, STEP_MS, HOLD_MS);

  return (
    <div ref={ref}>
      <VisPanel
        label={label}
        note={repo}
        status={done ? "clean" : "scanning"}
        busy={!done}
      >
        <div className="relative flex h-full flex-col">
          {!done && (
            <span className="animate-scan-beam pointer-events-none absolute -inset-x-3 -inset-y-2" />
          )}

          <ul className="relative flex flex-1 flex-col justify-around">
            {checks.map((check, c) => {
              const cleared = c < i;
              const scanning = c === i;

              return (
                <li key={check.name} className="flex items-center gap-2.5">
                  {/* Squares here, circles in the pipeline — same family, but
                      you can tell the two cards apart at a glance. */}
                  <span
                    className={`flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-[3px] text-[8px] transition-colors duration-300 ${
                      cleared
                        ? "bg-accent-soft shadow-[inset_0_0_0_1px_var(--accent)]"
                        : scanning
                          ? "bg-accent shadow-[0_0_0_3px_var(--accent-soft)]"
                          : "shadow-[inset_0_0_0_1px_var(--border-strong)]"
                    }`}
                  >
                    {cleared && <CheckIcon className="text-accent" />}
                  </span>

                  <span
                    className={`truncate text-[11px] transition-colors duration-300 ${
 scanning
 ? "text-text"
 : cleared
 ? "text-muted"
 : "text-faint"
 }`}
                  >
                    {check.name}
                  </span>

                  <span className="ml-auto shrink-0 text-micro">
                    {cleared ? (
                      <span className="text-accent">{check.result}</span>
                    ) : scanning ? (
                      <span className="text-muted">scanning…</span>
                    ) : (
                      <span className="text-faint/60">queued</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="relative mt-2 flex items-baseline justify-between border-t border-line pt-2 text-micro">
            <span className="text-faint">quality gate</span>
            <span className={done ? "text-accent" : "text-faint/60"}>
              {done ? "passed" : "pending"}
            </span>
          </div>
        </div>
      </VisPanel>
    </div>
  );
}
