import Reveal from "./Reveal";
import { sectionIndex, type SectionId } from "@/config/nav";

type Props = {
  /** Must be listed in `site.order` — that's where the 01/02/03 comes from. */
  id: SectionId;
  title: string;
  subtitle?: string;
  /** Centred narrow column, for the closing Contact section. */
  align?: "left" | "center";
  /** Decorative layer behind the content, e.g. a drifting colour wash. */
  backdrop?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  subtitle,
  align = "left",
  backdrop,
  children,
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <section
      id={id}
      // `overflow-hidden` only when there's a backdrop to clip: it creates a
      // scroll container, which would stop About's sticky column sticking.
      className={["py-20 sm:py-28", backdrop && "relative overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      {backdrop}

      <div
        className={`mx-auto px-5 sm:px-8 ${centered ? "max-w-3xl text-center" : "max-w-6xl"}`}
      >
        <Reveal>
          <div className="mb-12 sm:mb-16">
            <div
              className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
            >
              <span className="text-xs font-semibold tracking-widest text-accent">
                {sectionIndex(id)}
              </span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="text-xs font-semibold tracking-widest text-faint uppercase">
                {title}
              </span>
            </div>
            {subtitle && (
              <h2
                className={`mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1] ${centered ? "mx-auto" : ""}`}
              >
                {subtitle}
              </h2>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
