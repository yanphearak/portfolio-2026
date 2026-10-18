type Props = {
  href: string;
  /** Accessible name — the icon itself carries no text. */
  label: string;
  /** Opens in a new tab. Leave off for `mailto:` links. */
  external?: boolean;
  children: React.ReactNode;
};

/** A square icon button: the GitHub / LinkedIn / email row in the hero and the
 *  footer are the same control, so they share one component. */
export default function IconLink({ href, label, external, children }: Props) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="grid h-10 w-10 place-items-center rounded-[6px] border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
    >
      {children}
    </a>
  );
}
