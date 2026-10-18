import { site } from "@/config/site";
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

/** Each panel's line colour, from the `--line-*` tokens in globals.css. */
const LINE: Record<keyof typeof VIS, string> = {
  pipeline: "var(--line-pipeline)",
  rollout: "var(--line-rollout)",
  anomaly: "var(--line-anomaly)",
  agent: "var(--line-agent)",
  metrics: "var(--line-metrics)",
  scan: "var(--line-scan)",
};

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
  return (
    <Section
      id="skills"
      title={site.sections.skills.label}
      subtitle={site.sections.skills.subtitle}
    >
      {/* Each group is its own line on the map, in its own colour: the band
          across the top, and every live element in its visual. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {site.skills.map((group) => {
          const Vis = VIS[group.vis];

          return (
            <Card key={group.title} line={LINE[group.vis]}>
              <h3 className="mt-1 text-body font-extrabold tracking-[-0.01em]">
                {group.title}
              </h3>

              {/* The panel itself is aria-hidden, so this one label stands
                  in for it. Scoped to the visual rather than the whole card
                  — the tags below have to stay readable. */}
              <div
                role="img"
                aria-label={VIS_LABEL[group.vis]}
                className="mt-4"
              >
                <Vis />
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
