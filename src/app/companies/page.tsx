import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CompanyCard from "@/components/CompanyCard";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { companies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Companies",
  description:
    "Zaims Holding's operating companies: NexGen Build, Dammam Laser CNC, and Edge Steel KSA.",
};

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our companies."
        description="Three industrial operators. Complementary capabilities. Shared ownership with room for each business to run."
        actions={[
          { label: "Get in touch", href: "/contact" },
          { label: "Why this structure", href: "/why-zaims", variant: "secondary" },
        ]}
      />

      <section id="portfolio" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {companies.map((c, i) => (
              <StaggerItem key={c.slug}>
                <CompanyCard company={c} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="ownership" className="bg-paper border-t border-mono-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="font-display text-2xl font-bold text-mono-90 md:text-3xl">
                  How we think about ownership
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-5 text-[15px] leading-relaxed text-mono-70 md:text-base">
                <p>
                  Zaims is not a marketplace and not a short-hold financial sponsor. We hold operating
                  companies that belong in the same industrial conversation — construction systems,
                  structural steel, and precision fabrication.
                </p>
                <p>
                  Each company keeps its brand, customers, and craft. The holding provides permanent
                  capital orientation, shared standards where they matter, and a path for joint delivery
                  when a project needs more than one specialty.
                </p>
                <p>
                  Want the strategic thesis?{" "}
                  <Link
                    href="/why-zaims"
                    className="font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-yellow cursor-pointer"
                  >
                    Read Why Zaims
                  </Link>
                  . Looking for selected deliveries across the group?{" "}
                  <Link
                    href="/portfolio"
                    className="font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-yellow cursor-pointer"
                  >
                    See track record
                  </Link>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <ClosingCTA
        title="Interested in the portfolio?"
        description="Investors, partners, and operators — start a conversation with the holding."
      />
    </>
  );
}
