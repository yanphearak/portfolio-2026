"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The first program, on the card for the degree where it was written.
 *
 * Three states: idle, `compiling` (a short beat so "Compile & Run" reads as
 * work rather than a no-op), then `ran` — which fires the alert and leaves a
 * shell line under the code, so the card itself shows the result instead of
 * only an OS dialog that vanishes.
 */

/** Source, as line-number → tokens. Written out rather than tokenised: it's six
 *  lines that will never change, and a C lexer to colour them would be absurd. */
const CODE = [
  <>
    <span className="text-code-key">#include</span>{" "}
    <span className="text-code-str">&lt;stdio.h&gt;</span>
  </>,
  null,
  <>
    <span className="text-code-key">int</span>{" "}
    <span className="text-code-fn">main</span>
    <span className="text-faint">(</span>
    <span className="text-code-key">void</span>
    <span className="text-faint">) {"{"}</span>
  </>,
  <>
    {"  "}
    <span className="text-code-fn">printf</span>
    <span className="text-faint">(</span>
    <span className="text-code-str">&quot;Hello World\n&quot;</span>
    <span className="text-faint">);</span>
  </>,
  <>
    {"  "}
    <span className="text-code-key">return</span>{" "}
    <span className="text-code-str">0</span>
    <span className="text-faint">;</span>
  </>,
  <>
    <span className="text-faint">{"}"}</span>
  </>,
];

const COMPILE_MS = 620;

export default function HelloWorldSnippet() {
  const [state, setState] = useState<"idle" | "compiling" | "ran">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // A pending compile must not fire its alert after the section unmounts.
  useEffect(() => () => clearTimeout(timer.current), []);

  function run() {
    if (state === "compiling") return;
    setState("compiling");
    timer.current = setTimeout(() => {
      setState("ran");
      alert("Hello World");
    }, COMPILE_MS);
  }

  return (
    <div className="relative mt-5 overflow-hidden rounded-xl border border-line bg-bg-soft">
      {/* --- title bar ----------------------------------------------------- */}
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-[#ff5f57]/70" />
          <span className="size-2 rounded-full bg-[#febc2e]/70" />
          <span className="size-2 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="text-micro tracking-wider text-faint">
          hello.c
        </span>
        <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-micro tracking-widest text-faint">
          C
        </span>
      </div>

      {/* --- source -------------------------------------------------------- */}
      <pre className="overflow-x-auto px-3.5 py-4 text-xs leading-6 sm:text-note">
        <code>
          {CODE.map((line, i) => (
            <span key={i} className="grid grid-cols-[1.5rem_1fr]">
              {/* Numbers are chrome, not source — excluded from copy/paste. */}
              <span className="select-none text-faint/50" aria-hidden>
                {i + 1}
              </span>
              <span>{line}</span>
            </span>
          ))}
        </code>
      </pre>

      {/* --- run bar ------------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line px-3.5 py-3">
        <button
          type="button"
          onClick={run}
          aria-live="polite"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/35 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent transition-all duration-200 hover:border-accent/60 hover:bg-accent hover:text-bg active:scale-[0.97] disabled:opacity-70"
          disabled={state === "compiling"}
        >
          {state === "compiling" ? (
            <>
              <span className="size-3 animate-spin rounded-full border border-current border-t-transparent" />
              Compiling…
            </>
          ) : (
            <>
              {/* Play triangle, drawn rather than an emoji so it inherits the
                  button's colour on hover. */}
              <svg viewBox="0 0 10 10" className="size-2.5 fill-current" aria-hidden>
                <path d="M1 0.5 9 5 1 9.5Z" />
              </svg>
              {state === "ran" ? "Run again" : "Compile & Run"}
            </>
          )}
        </button>

        <span className="text-micro tracking-wider text-faint">
          gcc hello.c -o hello
        </span>
      </div>

      {/* --- output -------------------------------------------------------- */}
      {state === "ran" && (
        <div className="animate-panel-in border-t border-line bg-bg px-3.5 py-3 text-xs">
          <p className="text-faint">
            <span className="text-accent">$</span> ./hello
          </p>
          <p className="mt-1 flex items-center gap-2 text-text">
            Hello World
            <span className="text-micro tracking-wider text-accent">
              exit 0
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
