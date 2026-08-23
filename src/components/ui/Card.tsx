type Props = {
  as?: "div" | "article";
  /** Extra layout classes for the card body (padding, flex direction, gaps). */
  className?: string;
  children: React.ReactNode;
};

/**
 * The one card shell on the page: hairline border, surface fill, and on hover a
 * small lift plus an accent wash bleeding in from the top-right corner.
 *
 * Skills, Selected Work and Education all use it, so three grids that look
 * alike now also *behave* alike — before this they each hovered differently and
 * two of them glowed different colours.
 *
 * Children need `relative` to sit above the wash.
 */
export default function Card({ as: Tag = "div", className = "", children }: Props) {
  return (
    <Tag
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-hover ${className}`}
    >
      <div className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </Tag>
  );
}
