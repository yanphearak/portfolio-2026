type Props = {
  as?: "div" | "article";
  /**
   * The line this card belongs to: any colour value, usually one of the
   * `--line-*` tokens. Draws the band across the top and re-tints everything
   * inside that uses the accent.
   */
  line?: string;
  /** Extra layout classes for the card body (padding, flex direction, gaps). */
  className?: string;
  children: React.ReactNode;
};

/**
 * The one card shell on the page: raised fill, hairline border, small radius,
 * and a coloured band across the top naming which line it's on. Flat on
 * purpose — no hover lift or glow; nothing on it is clickable.
 */
export default function Card({
  as: Tag = "div",
  line,
  className = "",
  children,
}: Props) {
  return (
    <Tag
      data-line={line ? "" : undefined}
      style={line ? ({ "--accent": line } as React.CSSProperties) : undefined}
      className={`relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-raised p-5 ${className}`}
    >
      {line && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />
      )}
      {children}
    </Tag>
  );
}
