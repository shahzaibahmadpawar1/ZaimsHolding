import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Selected work across Zaims Holding operating companies — attributed to NexGen Build, Dammam Laser CNC, and Edge Steel KSA.",
};

const projects = [
  {
    name: "Integrated commercial structure (Riyadh)",
    type: "Illustrative group narrative",
    companies: "Edge Steel KSA · NexGen Build · Dammam Laser CNC",
    summary:
      "Example of how the chain can engage: structural steel, building systems, and precision panels under aligned ownership. Specific client names and metrics published when cleared for external use.",
  },
  {
    name: "Industrial facility systems (Eastern Province)",
    type: "Construction & MEP",
    companies: "NexGen Build",
    summary:
      "Representative of NexGen's integrated construction and systems delivery in Dammam and Jubail — including environments that demand Aramco-grade process discipline.",
  },
  {
    name: "Architectural & decorative metal programs",
    type: "Precision & architectural fab",
    companies: "Dammam Laser CNC · Edge Steel KSA",
    summary:
      "Laser-cut and fabricated metalwork for architectural and industrial applications — precision from Dammam Laser, structural and panel systems from Edge where the brief requires both.",
  },
  {
    name: "Government & infrastructure steel packages",
    type: "Structural fabrication",
    companies: "Edge Steel KSA",
    summary:
      "Structural and architectural steel for demanding Saudi clients. Public case studies with logos and figures will be added as approvals allow.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Track record"
        title="Selected work across the group."
        description="We publish only what we can stand behind. Entries below describe the kinds of work our companies deliver — with company attribution. Detailed case studies will replace illustrative narratives as clearances arrive."
      />

      <section id="work" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 space-y-6">
          <Stagger className="space-y-6">
            {projects.map((p, i) => (
              <StaggerItem key={p.name}>
                <article className="rounded-2xl border border-mono-20 p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mono-45">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-mono-30">·</span>
                    <span>{p.type}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold text-mono-90">{p.name}</h2>
                  <p className="mt-2 text-sm font-medium text-brand-accent">{p.companies}</p>
                  <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-mono-70">{p.summary}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-10">
          <p className="text-sm text-mono-55">
            For company-level capabilities and credentials, see{" "}
            <Link
              href="/companies"
              className="font-medium text-brand-primary underline underline-offset-4 cursor-pointer"
            >
              Our companies
            </Link>
            .
          </p>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
