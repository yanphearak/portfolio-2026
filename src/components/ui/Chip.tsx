type Props = {
  children: React.ReactNode;
  /** Chip rows are lists, so `li` is the default; use `span` when it isn't. */
  as?: "li" | "span";
};

/**
 * The small tag used for every tech name on the page — skill groups,
 * coursework, credentials. One design, one size, everywhere.
 */
export default function Chip({ children, as: Tag = "li" }: Props) {
  return (
    <Tag className="rounded-[3px] bg-surface-hover px-2 py-1 text-xs text-muted">
      {children}
    </Tag>
  );
}
