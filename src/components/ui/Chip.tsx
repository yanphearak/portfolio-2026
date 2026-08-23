type Props = {
  children: React.ReactNode;
  /** Chip rows are lists, so `li` is the default; use `span` when it isn't. */
  as?: "li" | "span";
};

/**
 * The small mono tag used for every tech name on the page — skill groups,
 * project stacks, coursework. One design, one size, everywhere: two chip styles
 * for the same job is the sort of thing that reads as sloppy without anyone
 * being able to say why.
 *
 * Brightens with the surrounding <Card />'s hover via `group-hover`.
 */
export default function Chip({ children, as: Tag = "li" }: Props) {
  return (
    <Tag className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs text-muted transition-colors group-hover:border-line-strong">
      {children}
    </Tag>
  );
}
