import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { sectors, companies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Construction, steel fabrication, precision manufacturing, and industrial systems across the Zaims Holding group.",
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Industrial sectors. Operating clarity."
        description="Zaims is organized around four sector lenses. Delivery sits with the operating company best suited to the work — with the holding aligning capital and standards."
        actions={[
          { label: "Our companies", href: "/companies" },
          { label: "Get in touch", href: "/contact", variant: "secondary" },
        ]}
      />

      <section id="sectors" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Stagger className="space-y-16">
            {sectors.map((s, i) => {
              const company = companies.find((c) => c.name === s.company);
              return (
                <StaggerItem key={s.title}>
                  <article className="grid gap-8 border-t border-mono-20 pt-12 md:grid-cols-12">
                    <div className="md:col-span-1">
                      <span className="font-display text-sm font-bold text-brand-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="md:col-span-5">
                      <h2 className="font-display text-3xl font-bold text-mono-90">{s.title}</h2>
                      <p className="mt-2 text-sm font-medium text-mono-55">Led through {s.company}</p>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-base leading-relaxed text-mono-70">{s.description}</p>
                      {company && (
                        <Link
                          href={`/companies/${company.slug}`}
                          className="mt-5 inline-block text-sm font-semibold text-brand-primary hover:text-brand-accent cursor-pointer"
                        >
                          About {company.shortName} →
                        </Link>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section id="holding" className="bg-paper border-t border-mono-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Holding lens"
              title="Sectors are how we describe the group — not a sales catalog."
              description="If you need project-level capabilities, start with the operating company. If you care about how the pieces fit as an ownership structure, start with Why Zaims."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/why-zaims"
                className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 cursor-pointer"
              >
                Why Zaims
              </Link>
              <Link
                href="/companies"
                className="rounded-full border border-mono-30 px-5 py-2.5 text-sm font-semibold text-mono-90 hover:bg-mono-10 cursor-pointer"
              >
                Companies
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
