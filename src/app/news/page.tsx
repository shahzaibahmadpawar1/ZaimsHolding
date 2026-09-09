import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from Zaims Holding and its operating companies.",
};

const news = [
  {
    date: "2026",
    category: "Group",
    title: "Zaims Holding advances its industrial portfolio narrative",
    excerpt:
      "The holding continues to align NexGen Build, Dammam Laser CNC, and Edge Steel KSA under a single long-term ownership story for partners and investors.",
    href: "/about",
  },
  {
    date: "Operating update",
    category: "NexGen Build",
    title: "NexGen Build — Aramco-approved construction & systems",
    excerpt:
      "NexGen remains positioned as Saudi Aramco Approved Vendor #10119021 with integrated construction and MEP capabilities in the Eastern Province.",
    href: "/companies/nexgen-build",
  },
  {
    date: "Operating update",
    category: "Dammam Laser CNC",
    title: "Precision fabrication capacity in Dammam",
    excerpt:
      "Fiber laser, CO₂, and CNC capabilities supporting industrial and architectural metalwork across the Eastern Province.",
    href: "/companies/dammam-laser",
  },
  {
    date: "Operating update",
    category: "Edge Steel KSA",
    title: "Structural and architectural steel from Riyadh",
    excerpt:
      "Edge Steel continues SCA-certified fabrication for commercial, government, and infrastructure clients across the Kingdom.",
    href: "/companies/edge-steel",
  },
  {
    date: "Perspective",
    category: "Thesis",
    title: "Why complementary ownership beats ad-hoc subcontract stacks",
    excerpt:
      "A short read on the holding thesis — integration as ownership strategy, not a temporary joint venture.",
    href: "/why-zaims",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Updates from the group."
        description="Seeded editorial updates while a full press pipeline comes online. Media inquiries: use Contact with inquiry type Media."
      />

      <section id="updates" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Stagger className="divide-y divide-mono-20 border-y border-mono-20">
            {news.map((item) => (
              <StaggerItem key={item.title}>
                <article className="py-8">
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wider text-mono-45">
                    <span>{item.date}</span>
                    <span className="text-mono-30">·</span>
                    <span className="text-brand-accent">{item.category}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold text-mono-90 md:text-2xl">
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-brand-primary cursor-pointer"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-mono-70">{item.excerpt}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-block text-sm font-semibold text-brand-primary hover:text-brand-accent cursor-pointer"
                  >
                    Read more →
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCTA
        title="Press or partnership inquiry?"
        description="Reach the holding team through Contact."
      />
    </>
  );
}
