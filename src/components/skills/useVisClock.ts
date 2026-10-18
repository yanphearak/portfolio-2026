"use client";

import { useEffect, useRef, useState } from "react";

/** How long a completed cycle sits on screen before it rewinds. */
const DEFAULT_HOLD_MS = 2400;

/**
 * Some webviews never run the intersection step. A visual frozen on its first
 * frame reads as broken, so start it anyway after this long.
 */
const FAILSAFE_MS = 2500;

type Clock = {
  /** Attach to the element whose visibility gates the animation. */
  ref: React.RefObject<HTMLDivElement | null>;
  /** Current step. `steps` itself means "the cycle completed". */
  i: number;
  /** True once the cycle has completed and is holding before the rewind. */
  done: boolean;
};

/**
 * The heartbeat behind every toolchain visual: one counter walking 0..steps and
 * wrapping, paused whenever the card is off screen.
 *
 * `durations` is either one length for every step or an array of per-step
 * lengths. Pass a module-level constant — the array is read through a ref, so a
 * fresh literal on each render would be picked up silently rather than
 * restarting the loop.
 */
export function useVisClock(
  steps: number,
  durations: number | readonly number[],
  holdMs: number = DEFAULT_HOLD_MS,
): Clock {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [active, setActive] = useState(false);

  const durRef = useRef(durations);
  durRef.current = durations;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour reduce-motion by parking on a finished cycle and never ticking.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(steps);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    // Note this observer is never disconnected: it drives `active` in both
    // directions, so a card scrolled out of view stops running its timer. That
    // is what keeps six looping visuals on one page cheap.
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);

    const failsafe = setTimeout(() => setActive(true), FAILSAFE_MS);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [steps]);

  // One self-rescheduling timer walks the counter; wrapping at `steps` is the loop.
  useEffect(() => {
    if (!active) return;
    const d = durRef.current;
    const ms =
      i >= steps ? holdMs : typeof d === "number" ? d : (d[i] ?? holdMs);
    const t = setTimeout(() => setI((v) => (v >= steps ? 0 : v + 1)), ms);
    return () => clearTimeout(t);
  }, [active, i, steps, holdMs]);

  return { ref, i, done: i >= steps };
}
