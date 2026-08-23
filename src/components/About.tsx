import Image from "next/image";

import { site } from "@/config/site";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  const { about } = site;

  return (
    <Section
      id="about"
      title={site.sections.about.label}
      subtitle={site.sections.about.subtitle}
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {about.paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-lead leading-[1.75] text-muted">{text}</p>
            </Reveal>
          ))}
        </div>

        {/* `sticky` sits outside <Reveal /> on purpose: the reveal transform
            would become the containing block and the image would stop
            tracking the viewport. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          {about.image && (
            <Reveal delay={120}>
              {/* The page's card shell — border, radius, surface fill — so a
                  bare photo still belongs to the same family as every other
                  panel on the page. */}
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  width={1536}
                  height={2048}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
