"use client";

import { site } from "@/config/site";
import { CheckIcon } from "../Icons";
import VisPanel from "./VisPanel";
import { useVisClock } from "./useVisClock";

const { label, run, stages } = site.visuals.pipeline;
const N = stages.length;
const DURATIONS = stages.map((s) => s.ms);

/** Rewind speed when the loop resets. */
const RESET_MS = 260;

/**
 * A delivery pipeline running on a loop: stages light up one at a time, the
 * accent beam fills each connector in lockstep with that stage's timer, and
 * durations land as stages clear.
 */
export default function PipelineVis() {
  const { ref, i, done } = useVisClock(N, DURATIONS);

  return (
    <div ref={ref}>
      <VisPanel
        label={label}
        note={run}
        status={done ? "deployed" : "running"}
        busy={!done}
      >
        <ol className="flex h-full flex-col justify-between">
          {stages.map((stage, s) => {
            const passed = s < i;
            const running = s === i;

            return (
              <li
                key={stage.name}
                className="relative flex items-center gap-2.5 py-[3px] pl-[22px]"
              >
                {/* connector reaching down to the next node's centre */}
                {s < N - 1 && (
                  <span className="absolute top-1/2 left-[6px] h-full w-px bg-line">
                    <span
                      className="absolute inset-0 origin-top bg-accent transition-transform ease-linear"
                      style={{
                        transform: `scaleY(${passed || running ? 1 : 0})`,
                        transitionDuration: running
                          ? `${stage.ms}ms`
                          : `${RESET_MS}ms`,
                      }}
                    />
                  </span>
                )}

                {/* Node. Rings are box-shadows, not borders: the unlayered
                    `* { border-color }` rule in globals.css outranks Tailwind's
                    layered border-colour utilities. Text size drives the check
                    icon, which is sized in `em`. */}
                <span
                  className={`absolute left-0 flex h-[13px] w-[13px] items-center justify-center rounded-full text-[8px] transition-colors duration-300 ${
                    passed
                      ? "bg-accent-soft shadow-[inset_0_0_0_1px_var(--accent)]"
                      : running
                        ? "bg-accent shadow-[0_0_0_3px_var(--accent-soft)]"
                        : "shadow-[inset_0_0_0_1px_var(--border-strong)]"
                  }`}
                >
                  {passed ? (
                    <CheckIcon className="text-accent" />
                  ) : running ? (
                    <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-faint/50" />
                  )}
                </span>

                <span
                  className={`text-[11px] transition-colors duration-300 ${
 running ? "text-text" : passed ? "text-muted" : "text-faint"
 }`}
                >
                  {stage.name}
                </span>

                {/* duration, or a progress bar while the stage runs */}
                <span className="ml-auto flex h-3.5 items-center">
                  {passed ? (
                    <span className="text-micro tabular-nums text-faint">
                      {stage.took}
                    </span>
                  ) : running ? (
                    <span className="relative h-1 w-10 overflow-hidden rounded-full bg-line-strong">
                      {/* keyframed, not transitioned — this element mounts
                          mid-run, and transitions don't fire on mount. */}
                      <span
                        className="animate-bar-fill absolute inset-0 origin-left rounded-full bg-accent"
                        style={{ animationDuration: `${stage.ms}ms` }}
                      />
                      <span className="animate-bar-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-2 to-transparent" />
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
      </VisPanel>
    </div>
  );
}
