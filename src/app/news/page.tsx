import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCTA from "@/components/ClosingCTA";
import { Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from Zaims Holding and its operating companies.",
};

const news = [
  {
    date: "2024",
    category: "Edge Steel KSA",
    title: "Edge Steel expands equipment rental fleet",
    excerpt:
      "As published on Edge Steel’s About timeline: significant expansion of generators, excavators, cranes, forklifts, and welding machines to support full-service site operations for major contractors.",
    href: "/companies/edge-steel",
  },
  {
    date: "2023",
    category: "Edge Steel KSA",
    title: "Edge Steel crosses 500+ completed projects",
    excerpt:
      "Edge Steel KSA publicly marks crossing the 500-project threshold as a trusted fabrication partner across structural, architectural, and industrial applications in Saudi Arabia.",
    href: "/companies/edge-steel",
  },
  {
    date: "2022",
    category: "Edge Steel KSA",
    title: "CNC fiber laser division commissioned",
    excerpt:
      "Edge Steel’s timeline lists a dedicated CNC fiber laser division for precision architectural panels, decorative façade screens, and tolerance-critical flat components.",
    href: "/companies/edge-steel",
  },
  {
    date: "2021",
    category: "Edge Steel KSA",
    title: "SCA certification achieved",
    excerpt:
      "Edge Steel KSA states Saudi Contractors Authority certification in 2021 — qualifying for government-tier and defence-sector participation.",
    href: "/companies/edge-steel",
  },
  {
    date: "Operating update",
    category: "NexGen Build",
    title: "Saudi Aramco Approved Vendor #10119021",
    excerpt:
      "NexGen Build continues to publish Saudi Aramco vendor approval, Saudi Energy registration, ISO 9001:2015, and AWS welding credentials alongside six integrated construction and MEP divisions.",
    href: "/companies/nexgen-build",
  },
  {
    date: "Operating update",
    category: "Dammam Laser CNC",
    title: "Precision fabrication from Al-Khodariya, Dammam",
    excerpt:
      "Dammam Laser CNC publishes SCA, VAT, and SME credentials with fiber laser, CO₂, and CNC routing capacity for industrial and architectural work across the Eastern Province.",
    href: "/companies/dammam-laser",
  },
  {
    date: "2020",
    category: "Edge Steel KSA",
    title: "Edge Steel KSA founded in Riyadh",
    excerpt:
      "Edge Steel publicly dates its founding to 2020 in Riyadh, combining structural fabrication with a precision-first delivery model for industrial and construction clients.",
    href: "/companies/edge-steel",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Updates from the group."
        description="Milestones and operating notes grounded in what NexGen Build, Dammam Laser CNC, and Edge Steel KSA publish on their own sites. Media inquiries: Contact with inquiry type Media."
      />

      <section id="updates" className="bg-surface py-16 md:py-24">
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
                      className="cursor-pointer transition-colors hover:text-brand-yellow"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-mono-70">{item.excerpt}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
