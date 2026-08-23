type Props = {
  /** Small uppercase mono label, top left. */
  label: string;
  /** Dim detail beside the label — a run number, a count. */
  note?: string;
  /** Word inside the status pill, top right. */
  status: string;
  /** While true the status dot pulses. Set false once the cycle completes. */
  busy: boolean;
  children: React.ReactNode;
};

/**
 * The frame every toolchain visual sits in: fixed height, hairline border, and
 * a header strip carrying a label and a status pill. Six different animations
 * share it, which is what makes the grid read as one designed object instead of
 * six unrelated widgets.
 *
 * Decorative throughout — the describing `aria-label` lives on the card outside.
 */
export default function VisPanel({
  label,
  note,
  status,
  busy,
  children,
}: Props) {
  return (
    <div
      aria-hidden
      // No margin of its own — the card that hosts it owns the spacing.
      className="relative flex h-44 flex-col overflow-hidden rounded-xl border border-line bg-bg"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-3 py-2">
        <div className="flex items-baseline gap-1.5 overflow-hidden">
          <span className="text-micro tracking-widest text-faint uppercase">
            {label}
          </span>
          {note && (
            <span className="truncate text-micro text-faint/70">
              {note}
            </span>
          )}
        </div>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-accent-soft px-2 py-[3px]">
          <span className="relative flex h-1.5 w-1.5">
            {busy && (
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
            )}
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-[9.5px] tracking-widest text-accent uppercase">
            {status}
          </span>
        </span>
      </div>

      <div className="relative min-h-0 flex-1 px-3 py-2">{children}</div>
    </div>
  );
}
