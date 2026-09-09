import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { Check, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Comparison",
  description:
    "How Zaims Holding compares to fragmented contractor stacks and generic conglomerates — for partners and investors.",
};

const rows: { label: string; zaims: string; fragmented: string; conglomerate: string }[] = [
  {
    label: "Ownership horizon",
    zaims: "Permanent / long-term hold",
    fragmented: "Project-by-project",
    conglomerate: "Varies; often financial complexity",
  },
  {
    label: "Capability fit",
    zaims: "Complementary industrial chain",
    fragmented: "Ad-hoc subcontract stack",
    conglomerate: "Often broad, loosely related",
  },
  {
    label: "Accountability",
    zaims: "Group story + named operators",
    fragmented: "Finger-pointing at interfaces",
    conglomerate: "Layers of corporate distance",
  },
  {
    label: "Credentials",
    zaims: "Attributed to earning company",
    fragmented: "Scattered / hard to verify",
    conglomerate: "Brand halo, mixed substance",
  },
  {
    label: "Partner engagement",
    zaims: "Holding dialogue, operating delivery",
    fragmented: "Many contracts, many owners",
    conglomerate: "IR-heavy, slow paths",
  },
  {
    label: "Focus",
    zaims: "KSA industrial construction & fab",
    fragmented: "Whoever wins the bid",
    conglomerate: "Multi-sector sprawl",
  },
];

export default function ComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Comparison"
        title="How Zaims compares."
        description="For investors and strategic partners evaluating ownership models — not a contractor bid sheet."
      />

      <section id="table" className="bg-surface py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6 overflow-x-auto">
          <FadeIn>
            <table className="w-full min-w-[720px] text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-mono-20">
                  <th className="py-4 pr-4 font-display text-xs uppercase tracking-wider text-mono-45 font-semibold w-[22%]">
                    Dimension
                  </th>
                  <th className="py-4 px-4 font-display text-sm font-bold text-brand-primary w-[26%]">
                    Zaims Holding
                  </th>
                  <th className="py-4 px-4 font-display text-sm font-bold text-mono-70 w-[26%]">
                    Fragmented contractors
                  </th>
                  <th className="py-4 pl-4 font-display text-sm font-bold text-mono-70 w-[26%]">
                    Generic conglomerate
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-mono-20 align-top">
                    <td className="py-5 pr-4 font-medium text-mono-90">{row.label}</td>
                    <td className="py-5 px-4 text-mono-90 bg-brand-primary/[0.03]">
                      <span className="inline-flex gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-brand-accent flex-shrink-0" />
                        {row.zaims}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-mono-55">
                      <span className="inline-flex gap-2">
                        <Minus className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {row.fragmented}
                      </span>
                    </td>
                    <td className="py-5 pl-4 text-mono-55">
                      <span className="inline-flex gap-2">
                        <Minus className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {row.conglomerate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>
        </div>
      </section>

      <section id="fit" className="bg-paper border-t border-mono-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="When Zaims fits"
              title="Best suited for partners who care about industrial coherence."
            />
          </FadeIn>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Capital partners",
                body: "Looking for focused KSA industrial exposure with operators already in the chain — not a thesis assembled after the raise.",
              },
              {
                title: "Strategic collaborators",
                body: "Need a holding counterpart that can speak group strategy while delivery stays with named companies.",
              },
              {
                title: "Institutional stakeholders",
                body: "Prefer clear credential attribution (e.g. NexGen Aramco vendor status) over vague group claims.",
              },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="rounded-2xl border border-mono-20 bg-surface p-6">
                  <h3 className="font-display text-lg font-bold text-mono-90">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mono-70">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
