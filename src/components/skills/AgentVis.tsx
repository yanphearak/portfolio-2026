"use client";

import { site } from "@/config/site";
import { CheckIcon } from "../Icons";
import VisPanel from "./VisPanel";
import { useVisClock } from "./useVisClock";

const { label, host, ask, delegate, command, result } = site.visuals.agent;

/**
 * One entry per transcript line. The approval sits longest on screen — it's the
 * beat the whole animation exists to show.
 */
const DURATIONS = [850, 1100, 1900, 1300, 1200];
const N = DURATIONS.length;

/** Older lines slide up under this fade, the way a chat transcript does. */
const FADE = "linear-gradient(to bottom, transparent, #000 22%)";

/** Small leading dot, shared by every agent line. */
function Dot({ state }: { state: "run" | "done" }) {
  return (
    <span className="relative h-[6px] w-[6px] shrink-0 rounded-full bg-accent">
      {state === "run" && (
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
      )}
    </span>
  );
}

/**
 * The ops agent working a request end to end: it's asked a question, hands off
 * to the devops specialist, proposes a command, waits for a human to approve it,
 * then runs it and reports back. The approval gate is the point — the agent
 * never executes on its own, and the animation shouldn't imply otherwise.
 */
export default function AgentVis() {
  const { ref, i, done } = useVisClock(N, DURATIONS);

  const status =
    i <= 1 ? "thinking" : i === 2 ? "approval" : i === 3 ? "running" : "done";

  return (
    <div ref={ref}>
      <VisPanel label={label} note={`ssh · ${host}`} status={status} busy={i < 4}>
        <div
          className="flex h-full flex-col justify-end gap-1 overflow-hidden"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        >
          {/* the ask */}
          <div className="flex justify-end">
            <span className="max-w-[88%] truncate rounded-lg rounded-br-sm border border-line bg-surface px-2 py-1 text-micro text-muted">
              {ask}
            </span>
          </div>

          {/* hand-off to the specialist agent */}
          {i >= 1 && (
            <div className="flex items-center gap-2">
              <Dot state={i === 1 ? "run" : "done"} />
              <span className="truncate text-micro text-muted">
                {delegate}
              </span>
              {i === 1 ? (
                <span className="relative ml-auto h-1 w-8 shrink-0 overflow-hidden rounded-full bg-line-strong">
                  {/* keyframed, not transitioned — this element mounts mid-run,
                      and transitions don't fire on mount. */}
                  <span
                    className="animate-bar-fill absolute inset-0 origin-left rounded-full bg-accent"
                    style={{ animationDuration: `${DURATIONS[1]}ms` }}
                  />
                </span>
              ) : (
                <CheckIcon className="ml-auto shrink-0 text-[9px] text-accent" />
              )}
            </div>
          )}

          {/* the approval gate */}
          {i >= 2 && (
            <div
              className={`rounded-lg border border-line px-2 py-1.5 transition-colors duration-300 ${
                i > 2 ? "bg-accent-soft" : "bg-surface"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] bg-accent-soft text-[9px] text-accent shadow-[inset_0_0_0_1px_var(--accent)]">
                  $
                </span>
                <span className="min-w-0 flex-1 truncate text-micro text-text">
                  {command}
                </span>

                {i > 2 ? (
                  <span className="flex shrink-0 items-center gap-1 text-[9px] text-accent">
                    <CheckIcon className="text-[9px]" />
                    approved
                  </span>
                ) : (
                  <span className="flex shrink-0 items-center gap-1 text-[9px] text-accent">
                    <Dot state="run" />
                    approve?
                  </span>
                )}
              </div>
              <div className="mt-0.5 pl-[23px] text-[9px] text-faint">
                {i > 2 ? "approved by you" : `waiting on a human · ${host}`}
              </div>
            </div>
          )}

          {/* the run */}
          {i >= 3 && (
            <div className="flex items-center gap-2">
              <Dot state={i === 3 ? "run" : "done"} />
              <span className="truncate text-micro text-muted">
                ssh {host}
              </span>
              {i === 3 ? (
                <span className="relative ml-auto h-1 w-8 shrink-0 overflow-hidden rounded-full bg-line-strong">
                  <span
                    className="animate-bar-fill absolute inset-0 origin-left rounded-full bg-accent"
                    style={{ animationDuration: `${DURATIONS[3]}ms` }}
                  />
                  <span className="animate-bar-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-2 to-transparent" />
                </span>
              ) : (
                <CheckIcon className="ml-auto shrink-0 text-[9px] text-accent" />
              )}
            </div>
          )}

          {/* what came back */}
          {i >= 4 && (
            <div className="flex items-center gap-2 rounded-md bg-surface px-1.5 py-0.5">
              <span className="truncate text-micro text-text">
                {result}
              </span>
              <span className="ml-auto shrink-0 text-[9px] text-accent">
                {done ? "complete" : "…"}
              </span>
            </div>
          )}
        </div>
      </VisPanel>
    </div>
  );
}
