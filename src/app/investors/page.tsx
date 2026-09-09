import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { companies } from "@/lib/content";
import { FileText, Leaf, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Investor and stakeholder information for Zaims Holding — industrial ownership across construction and fabrication in Saudi Arabia.",
};

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Built for partners who value industrial coherence."
        description="Zaims Holding offers focused exposure to complementary Saudi construction and fabrication operators — with a permanent ownership posture and clear company-level accountability."
        actions={[
          { label: "Get in touch", href: "/contact" },
          { label: "Why Zaims", href: "/why-zaims", variant: "secondary" },
        ]}
      />

      <section id="glance" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="At a glance"
              title="What capital partners should know."
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Three operating companies",
                body: companies.map((c) => c.name).join(", ") + ".",
              },
              {
                title: "Sector focus",
                body: "Construction & MEP, structural steel, precision laser/CNC fabrication — Kingdom of Saudi Arabia.",
              },
              {
                title: "Ownership stance",
                body: "Long-term hold. Operators keep identity. Holding aligns capital, standards, and group narrative.",
              },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="h-full rounded-2xl border border-mono-20 p-6">
                  <h3 className="font-display text-lg font-bold text-mono-90">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mono-70">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="resources" className="bg-paper border-y border-mono-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading eyebrow="Resources" title="Investor pathways." />
          </FadeIn>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Investment inquiries",
                body: "Share context via Contact (inquiry type: Investment). Formal materials shared under NDA as appropriate.",
                href: "/contact",
                cta: "Contact IR path",
              },
              {
                icon: Leaf,
                title: "Sustainability & ESG",
                body: "Operating companies carry site-level safety and quality systems (including ISO 9001 at NexGen). Group ESG reporting is in development.",
                href: "/about",
                cta: "About the group",
              },
              {
                icon: Newspaper,
                title: "Media",
                body: "For press, use Contact with inquiry type Media. Seeded updates live on the News page.",
                href: "/news",
                cta: "View news",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col rounded-2xl border border-mono-20 bg-white p-6">
                  <item.icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-lg font-bold text-mono-90">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-mono-70">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-5 text-sm font-semibold text-brand-primary hover:text-brand-accent cursor-pointer"
                  >
                    {item.cta} →
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCTA
        title="Ready for a holding-level conversation?"
        description="Tell us who you are and what you're exploring — we'll route you correctly."
      />
    </>
  );
}
