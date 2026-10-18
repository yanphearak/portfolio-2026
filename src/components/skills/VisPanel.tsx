type Props = {
  /** Small label, top left. */
  label: string;
  /** Dim detail beside the label — a run number, a count. */
  note?: string;
  /** Status word, top right. */
  status: string;
  /** While true the status dot is hollow (working); filled once the cycle completes. */
  busy: boolean;
  children: React.ReactNode;
};

/**
 * The frame every toolchain visual sits in: fixed height, recessed fill, and a
 * header strip carrying a label and a status. Six different animations share
 * it, which is what makes the grid read as one designed object instead of six
 * unrelated widgets. Colour comes from the panel's line (`--accent`, set by the
 * card around it).
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
      className="relative flex h-44 flex-col overflow-hidden rounded-[4px] bg-bg-soft"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-3 py-2">
        <div className="flex items-baseline gap-1.5 overflow-hidden">
          <span className="text-micro font-semibold text-muted">{label}</span>
          {note && (
            <span className="truncate text-micro text-faint">{note}</span>
          )}
        </div>

        <span className="flex shrink-0 items-center gap-1.5">
          <span
            className={`h-[7px] w-[7px] rounded-full ${
              busy ? "shadow-[inset_0_0_0_1.5px_var(--accent)]" : "bg-accent"
            }`}
          />
          <span className="text-micro text-accent">{status}</span>
        </span>
      </div>

      <div className="relative min-h-0 flex-1 px-3 py-2">{children}</div>
    </div>
  );
}
