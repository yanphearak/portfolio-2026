import Image from "next/image";

import { site } from "@/config/site";
import Section from "./Section";

export default function About() {
  const { about } = site;

  return (
    <Section
      id="about"
      title={site.sections.about.label}
      subtitle={site.sections.about.subtitle}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <div className="max-w-[64ch] space-y-5">
          {about.paragraphs.map((text, i) => (
            <p
              key={i}
              // The opening paragraph introduces him; it reads at full strength.
              className={`text-lead leading-[1.7] ${i === 0 ? "text-text" : "text-muted"}`}
            >
              {text}
            </p>
          ))}
        </div>

        {about.image && (
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Image
              src={about.image}
              alt={about.imageAlt}
              width={1536}
              height={2048}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-[4/5] w-full rounded-[6px] object-cover"
            />
          </div>
        )}
      </div>
    </Section>
  );
}
