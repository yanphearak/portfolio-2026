"use client";

import { site } from "@/config/site";
import VisPanel from "./VisPanel";
import { useVisClock } from "./useVisClock";

const { label, app, nodes, podsPerNode } = site.visuals.rollout;
const TOTAL = nodes.length * podsPerNode;

/** One replica replaced per tick — slow enough to read as a pod restarting. */
const STEP_MS = 400;
const HOLD_MS = 2200;

/**
 * A rolling update across the cluster: three nodes, four replicas each. Pods
 * start on the old version (dim and solid — they're running, just behind), go
 * accent while they're being replaced, and settle onto the new version. The
 * update walks node by node, which isn't quite how a scheduler spreads it, but
 * it's the only way the progression reads at this size.
 */
export default function RolloutVis() {
  const { ref, i, done } = useVisClock(TOTAL, STEP_MS, HOLD_MS);
  const ready = Math.min(i, TOTAL);

  return (
    <div ref={ref}>
      <VisPanel
        label={label}
        note={app}
        status={done ? "in sync" : "syncing"}
        busy={!done}
      >
        <div className="flex h-full flex-col justify-between gap-2">
          <div className="flex items-baseline justify-between text-[9px]">
            <span className="text-faint">cluster · {nodes.length} nodes</span>
            <span className="text-faint/70">{TOTAL} replicas</span>
          </div>

          <div className="flex gap-1.5">
            {nodes.map((node, n) => {
              const first = n * podsPerNode;
              const nodeDone = i >= first + podsPerNode;

              return (
                <div
                  key={node}
                  className="min-w-0 flex-1 rounded-lg border border-line bg-surface p-1.5"
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`h-[5px] w-[5px] shrink-0 rounded-full transition-colors duration-300 ${
                        nodeDone ? "bg-accent" : "bg-faint/40"
                      }`}
                    />
                    <span className="truncate text-[8.5px] text-faint">
                      {node}
                    </span>
                  </div>

                  <div className="mt-1 grid grid-cols-2 gap-1">
                    {Array.from({ length: podsPerNode }, (_, p) => {
                      const idx = first + p;
                      const updated = idx < i;
                      const updating = idx === i;

                      return (
                        <span
                          key={p}
                          // Rings are box-shadows for the same reason as the
                          // pipeline nodes: the unlayered `* { border-color }`
                          // rule in globals.css outranks Tailwind's
                          // border-colour utilities.
                          className={`relative h-4 rounded-[3px] transition-colors duration-300 ${
                            updated
                              ? "bg-accent-soft shadow-[inset_0_0_0_1px_var(--accent)]"
                              : updating
                                ? "bg-accent shadow-[0_0_0_2px_var(--accent-soft)]"
                                : "bg-line-strong"
                          }`}
                        >
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <span className="block h-1 overflow-hidden rounded-full bg-line-strong">
              <span
                className="block h-full rounded-full bg-accent transition-[width] duration-200 ease-linear"
                style={{ width: `${(ready / TOTAL) * 100}%` }}
              />
            </span>
            <div className="flex items-baseline justify-between text-micro">
              <span className="text-faint">
                {done ? "rollout complete" : "rolling update"}
              </span>
              <span className="tabular-nums text-accent">
                {ready}/{TOTAL} ready
              </span>
            </div>
          </div>
        </div>
      </VisPanel>
    </div>
  );
}
