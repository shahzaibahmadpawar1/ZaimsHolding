import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import SectorsTimeline from "@/components/SectorsTimeline";
import ScrollZoomReveal from "@/components/ScrollZoomReveal";
import { FadeIn } from "@/components/Motion";

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

      <section id="sectors" className="relative overflow-hidden bg-surface py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] font-bold leading-none text-mono-90/[0.035]"
          aria-hidden
        >
          ZAIMS
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeIn className="mb-12 text-center md:mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
              — Our sectors —
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-mono-90 md:text-4xl">
              Operating <span className="text-brand-yellow">lenses</span>
            </h2>
          </FadeIn>

          <SectorsTimeline />
        </div>
      </section>

      <ScrollZoomReveal videoSrc="/assets/images/video2.mp4" />

      <section id="holding" className="border-t border-mono-20 bg-paper py-16 md:py-24">
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
                className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-surface hover:opacity-90 cursor-pointer"
              >
                Why Zaims
              </Link>
              <Link
                href="/companies"
                className="rounded-full border border-mono-30 px-5 py-2.5 text-sm font-semibold text-mono-90 transition-colors hover:bg-mono-10 hover:text-brand-yellow cursor-pointer"
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
