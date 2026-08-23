import { site } from "@/config/site";
import Reveal from "./Reveal";
import Section from "./Section";
import Card from "./ui/Card";
import Chip from "./ui/Chip";
import AgentVis from "./skills/AgentVis";
import AnomalyVis from "./skills/AnomalyVis";
import MetricsVis from "./skills/MetricsVis";
import PipelineVis from "./skills/PipelineVis";
import RolloutVis from "./skills/RolloutVis";
import ScanVis from "./skills/ScanVis";

// Each group in site.ts names its animation by key; this resolves it.
const VIS = {
  pipeline: PipelineVis,
  rollout: RolloutVis,
  anomaly: AnomalyVis,
  agent: AgentVis,
  metrics: MetricsVis,
  scan: ScanVis,
} as const;

/** One line describing each visual, for people who can't see it play. */
const VIS_LABEL: Record<keyof typeof VIS, string> = {
  pipeline: "A delivery pipeline running its stages one after another.",
  rollout: "A rolling update bringing pods up across the fleet.",
  anomaly:
    "A model scoring live transactions, flagging an outlier and firing a Telegram alert.",
  agent:
    "An AI ops agent handing a request to its devops specialist, then waiting for human approval before it runs a command over SSH.",
  metrics: "A live latency chart beside a scrolling log tail.",
  scan: "A security scan clearing its checks.",
};

export default function Skills() {
  // Flattened once for the scrolling band under the cards. Deduplicated —
  // some tools legitimately appear in more than one group (Python is in both
  // CI/CD and AI), and the band should list each name only once.
  const all = [...new Set(site.skills.flatMap((g) => g.items))];

  return (
    <>
      <Section
        id="skills"
        title={site.sections.skills.label}
        subtitle={site.sections.skills.subtitle}
      >
        {/* Three across from `lg`: six cards land in two rows instead of three. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.skills.map((group, i) => {
            const Vis = VIS[group.vis];

            return (
              <Reveal key={group.title} delay={i * 70}>
                <Card>
                  <h3 className="relative text-body font-semibold tracking-tight">
                    {group.title}
                  </h3>

                  {/* The panel itself is aria-hidden, so this one label stands
                      in for it. Scoped to the visual rather than the whole card
                      — the pills below have to stay readable. */}
                  <div
                    role="img"
                    aria-label={VIS_LABEL[group.vis]}
                    className="relative mt-4"
                  >
                    <Vis />
                  </div>

                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* full-bleed scrolling band */}
      <div
        className="relative flex overflow-hidden border-y border-line py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
        aria-hidden
      >
        {/* duplicated track so the -50% loop is seamless */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="animate-marquee flex shrink-0 items-center gap-8 pr-8"
          >
            {all.map((item, i) => (
              <span
                key={`${copy}-${i}-${item}`}
                className="text-sm whitespace-nowrap text-faint"
              >
                {item}
                <span className="ml-8 text-accent">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
