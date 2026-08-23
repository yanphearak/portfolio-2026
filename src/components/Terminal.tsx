"use client";

import { useEffect, useRef, useState } from "react";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "ok" | "info" | "warn" };

// Purely decorative. Change the strings to whatever suits you.
const SCRIPT: Line[] = [
  { kind: "cmd", text: "kubectl get nodes" },
  { kind: "out", text: "node-01   Ready   control-plane   412d   v1.29.4", tone: "info" },
  { kind: "out", text: "node-02   Ready   worker          412d   v1.29.4", tone: "info" },
  { kind: "out", text: "node-03   Ready   worker          412d   v1.29.4", tone: "info" },
  { kind: "cmd", text: "kubectl rollout status deploy/api -n prod" },
  { kind: "out", text: 'deployment "api" successfully rolled out', tone: "ok" },
  { kind: "cmd", text: "kubectl get pods -n prod -l app=api" },
  { kind: "out", text: "api-7d9f4b6c8-2xk4p   1/1   Running   0   38s", tone: "ok" },
  { kind: "out", text: "api-7d9f4b6c8-9lmzq   1/1   Running   0   36s", tone: "ok" },
];

const TYPE_MS = 26; // per character
const PAUSE_MS = 420; // between lines

export default function Terminal() {
  const [done, setDone] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [index, setIndex] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Honour reduce-motion by printing the whole script at once.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(SCRIPT);
      setIndex(SCRIPT.length);
      return;
    }

    if (index >= SCRIPT.length) return;
    const line = SCRIPT[index];

    // Output lines appear whole; commands type out character by character.
    if (line.kind === "out") {
      const t = setTimeout(() => {
        setDone((d) => [...d, line]);
        setIndex((i) => i + 1);
      }, PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (typing.length < line.text.length) {
      const t = setTimeout(
        () => setTyping(line.text.slice(0, typing.length + 1)),
        TYPE_MS,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDone((d) => [...d, line]);
      setTyping("");
      setIndex((i) => i + 1);
    }, PAUSE_MS);
    return () => clearTimeout(t);
  }, [index, typing]);

  // Keep the newest line in view as the script grows.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [done, typing]);

  const toneClass = (tone?: string) =>
    tone === "ok"
      ? "text-accent"
      : tone === "warn"
        ? "text-amber-400"
        : "text-muted";

  return (
    <div className="relative">
      {/* soft glow behind the window */}
      <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(closest-side,var(--glow-a),transparent)] blur-xl" />

      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-soft shadow-2xl shadow-black/40">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-faint">
            ~/devops — zsh
          </span>
        </div>

        <div
          ref={bodyRef}
          className="h-[300px] overflow-hidden px-4 py-4 text-xs leading-relaxed sm:text-note"
        >
          {done.map((line, i) =>
            line.kind === "cmd" ? (
              <p key={i} className="mt-2 first:mt-0">
                <span className="text-accent-2">➜</span>{" "}
                <span className="text-faint">devops</span>{" "}
                <span className="text-text">{line.text}</span>
              </p>
            ) : (
              <p key={i} className={`pl-4 ${toneClass(line.tone)}`}>
                {line.text}
              </p>
            ),
          )}

          {index < SCRIPT.length && SCRIPT[index].kind === "cmd" && (
            <p className="mt-2">
              <span className="text-accent-2">➜</span>{" "}
              <span className="text-faint">devops</span>{" "}
              <span className="text-text">{typing}</span>
              <span className="animate-caret ml-px inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-accent" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
