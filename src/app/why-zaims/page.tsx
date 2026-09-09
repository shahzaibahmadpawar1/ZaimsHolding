import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import CompanyCard from "@/components/CompanyCard";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { companies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Why Zaims",
  description:
    "Why Zaims Holding exists — permanent industrial ownership, complementary companies, and integration as strategy.",
};

const notUs = [
  {
    icon: "/assets/icons/icon-timer.png",
    title: "Not a short-hold PE vehicle",
    body: "No structural need to flip companies on a fund clock. Permanent ownership orientation.",
  },
  {
    icon: "/assets/icons/icon-marketplace.png",
    title: "Not a contractor marketplace",
    body: "We don't auction work across strangers. We own operators and take responsibility for the group story.",
  },
  {
    icon: "/assets/icons/icon-check.png",
    title: "Not credential theater",
    body: "Aramco, SCA, and ISO claims stay attached to the company that earned them — starting with NexGen's Aramco vendor #10119021.",
  },
];

export default function WhyZaimsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Zaims"
        title="Three companies. One holding. A long horizon."
        description="Zaims is a thesis about how industrial capability should be owned in Saudi Arabia — complementary operators under permanent capital, not a pile of unrelated assets."
        actions={[
          { label: "Our companies", href: "/companies" },
          { label: "Compare models", href: "/comparison", variant: "secondary" },
        ]}
      />

      <section id="thesis" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="The problem"
              title="Fragmented ownership creates fragmented outcomes."
            />
            <p className="mt-5 text-base leading-relaxed text-mono-70">
              When steel, precision fabrication, and building systems sit under unrelated owners, every
              interface becomes a negotiation. Specs drift. Schedules slip. Accountability dissolves at
              the seams. Investors and principals inherit coordination risk they never priced.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SectionHeading
              eyebrow="The structure"
              title="Integrated from ownership — not from a temporary JV."
            />
            <p className="mt-5 text-base leading-relaxed text-mono-70">
              Zaims holds companies that already belong in the same industrial conversation. They keep
              local brands and operators. The holding aligns incentives, capital posture, and the option
              to deliver as a coherent chain when the work demands it.
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="portfolio" className="bg-paper border-y border-mono-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="The portfolio"
              title="Designed to work as a chain."
              description="THEY WORK TOGETHER. BY DESIGN."
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {companies.map((c, i) => (
              <StaggerItem key={c.slug}>
                <CompanyCard company={c} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="model" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading eyebrow="What we are not" title="Clear about the model." />
          </FadeIn>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {notUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-mono-20 bg-white/50 p-6">
                  <Image
                    src={item.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                    unoptimized
                  />
                  <h3 className="mt-4 font-display text-lg font-bold text-mono-90">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mono-70">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-10">
            <p className="text-[15px] text-mono-70">
              Prefer a side-by-side?{" "}
              <Link
                href="/comparison"
                className="font-semibold text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-yellow cursor-pointer"
              >
                See the comparison
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <ClosingCTA
        title="Does this ownership model fit what you're building?"
        description="Investors and strategic partners — we'd rather talk early than over-explain late."
      />
    </>
  );
}
