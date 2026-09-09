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
    name: "Commercial tower steel frameworks & architectural screens",
    type: "Structural & architectural steel",
    companies: "Edge Steel KSA",
    summary:
      "As published by Edge Steel KSA: structural frameworks for commercial towers, precision architectural screens, gold-finish façade panels, decorative metalwork, and commercial cladding — with public project types spanning structural, architectural, laser cutting, interior, and façade work.",
    source: "https://edgesteelksa.com/en",
  },
  {
    name: "Government, defence & infrastructure steel packages",
    type: "Structural fabrication",
    companies: "Edge Steel KSA",
    summary:
      "Edge Steel publicly lists work with clients including the Ministry of Interior, Saudi National Guard, Siemens KSA, Alfanar Projects, Riyadh Metro, Jadah Development, SAPCQ, and Tarshid Energy. 500+ projects completed and SCA certification (achieved 2021) are stated on their About page.",
    source: "https://edgesteelksa.com/en/about",
  },
  {
    name: "Integrated industrial & commercial facilities (Eastern Province)",
    type: "Construction & MEP",
    companies: "NexGen Build",
    summary:
      "NexGen Build delivers complete structural and civil works plus electrical, HVAC, sanitary, waterproofing, and fire protection under one contractor. Saudi Aramco Approved Vendor #10119021, Saudi Energy registration, ISO 9001:2015, and AWS welding credentials are published on nxgens.com — with workshop capacity in Dammam and Jubail.",
    source: "https://nxgens.com/",
  },
  {
    name: "Precision laser, CNC & architectural metal programs",
    type: "Precision manufacturing",
    companies: "Dammam Laser CNC",
    summary:
      "Dammam Laser CNC publishes fiber laser metal cutting, CO₂ laser cutting & engraving, advanced CNC routing, architectural metal works, and custom industrial parts from Al-Khodariya Industrial Area, Dammam — serving construction, oil & gas, automotive, aerospace, and interior design industries as an SCA-certified contractor.",
    source: "https://dammamlaser.com/",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Track record"
        title="Selected work across the group."
        description="Entries below summarize capabilities and publicly listed work from each operating company’s website. Individual client engagements beyond what those sites publish are not invented here."
      />

      <section id="work" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-6 px-6">
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
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-brand-primary transition-colors hover:text-brand-yellow"
                  >
                    Source →
                  </a>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6">
          <FadeIn>
            <p className="text-sm text-mono-55">
              For company-level capabilities and credentials, see{" "}
              <Link
                href="/companies"
                className="cursor-pointer font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-yellow"
              >
                Our companies
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
