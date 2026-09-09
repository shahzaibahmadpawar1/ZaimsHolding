import Link from "next/link";
import Image from "next/image";
import HomeHero from "@/components/HomeHero";
import VisionLetter from "@/components/VisionLetter";
import CompanyCard from "@/components/CompanyCard";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import ClosingCTA from "@/components/ClosingCTA";
import { FadeIn, Stagger, StaggerItem, Reveal } from "@/components/Motion";
import { companies, sectors } from "@/lib/content";

const proofs = [
  {
    icon: "/assets/icons/icon-shield.png",
    title: "Aramco-grade standards",
    desc: "NexGen Build holds Saudi Aramco vendor approval #10119021 — attributed where it belongs.",
  },
  {
    icon: "/assets/icons/icon-trophy.png",
    title: "SCA-certified fabrication",
    desc: "Edge Steel and Dammam Laser operate as SCA-certified contractors for Kingdom projects.",
  },
  {
    icon: "/assets/icons/icon-group.png",
    title: "Three companies, one group",
    desc: "Construction, steel, and precision fab under permanent holding ownership — not a one-off JV.",
  },
  {
    icon: "/assets/icons/icon-footprint.png",
    title: "Kingdom footprint",
    desc: "Operations across Riyadh and the Eastern Province — Dammam, Jubail, and beyond.",
  },
];

const faqItems = [
  {
    q: "What does Zaims Holding own?",
    a: "Three operating companies: NexGen Build (construction & building systems), Dammam Laser CNC (precision laser and CNC fabrication), and Edge Steel KSA (structural and architectural steel). Each runs day-to-day independently; the holding aligns capital, quality, and cross-company delivery.",
    image: "/assets/images/values-complementary.jpg",
  },
  {
    q: "Is Zaims a contractor or an investor?",
    a: "Both, in the industrial sense. We are operators who own complementary businesses for the long term — not a fund with a forced exit clock, and not a brokerage that auctions projects. Partners engage the group; work is delivered by the operating companies.",
    image: "/assets/images/values-operator-mindset.jpg",
  },
  {
    q: "How do the companies work together?",
    a: "They are designed as a chain: Edge for structural and architectural steel, Dammam Laser for precision components and panels, NexGen for construction and MEP systems. Shared ownership means coordination happens inside the group instead of across competing subcontractors.",
    image: "/assets/images/values-standards.jpg",
  },
  {
    q: "Who should get in touch?",
    a: "Investors and capital partners, strategic operators exploring collaboration, and media or institutional stakeholders. Project delivery conversations are routed to the relevant operating company — start at Contact and we'll connect you.",
    image: "/assets/images/values-long-horizon.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <VisionLetter />

      {/* Companies */}
      <section id="companies" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Companies"
              title="Operating companies we hold."
              description="A focused industrial portfolio — not a sprawling conglomerate. Each company is built to stand alone and stronger together."
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" delay={0.1}>
            {companies.map((c, i) => (
              <StaggerItem key={c.slug}>
                <CompanyCard company={c} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-10">
            <Link
              href="/companies"
              className="text-sm font-semibold text-brand-primary hover:text-brand-yellow transition-colors cursor-pointer"
            >
              View all companies →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="bg-surface py-20 md:py-28 border-y border-mono-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Sectors"
              title="Where the group operates."
              description="Four industrial lenses. One holding. Capabilities live inside the operating companies — the group sets direction and accountability."
            />
          </FadeIn>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {sectors.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} direction={i % 2 === 0 ? "right" : "left"}>
                <div className="border-t border-mono-20 pt-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Image
                      src={s.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-11 w-11 object-contain"
                      unoptimized
                    />
                    <p className="text-xs font-semibold uppercase tracking-wider text-mono-45">
                      {String(i + 1).padStart(2, "0")} · via {s.company}
                    </p>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-mono-90">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mono-70">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <FadeIn className="mt-12">
            <Link
              href="/sectors"
              className="text-sm font-semibold text-brand-primary hover:text-brand-yellow transition-colors cursor-pointer"
            >
              Explore sectors →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Why structure */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <SectionHeading
                eyebrow="Why this structure"
                title="Integration is a holding strategy — not a slide in a pitch deck."
                description="Fragmented ownership creates fragmented outcomes. Zaims exists so complementary industrial capabilities share capital, standards, and a long horizon."
              />
              <Link
                href="/why-zaims"
                className="mt-8 inline-flex text-sm font-semibold text-brand-primary transition-colors hover:text-brand-yellow cursor-pointer"
              >
                Read the thesis →
              </Link>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-2xl border border-mono-20 bg-surface p-8 shadow-soft md:p-10">
                <ul className="space-y-6">
                  {[
                    "Permanent ownership mindset — no forced three-year flip",
                    "Cross-company coordination without killing local operators",
                    "Credentials stay with the company that earned them",
                    "Partners engage one group story with clear operating entities",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-mono-70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Track record"
              title="Proof, attributed honestly."
              description="We don't invent group-wide badges. Credentials belong to the operating companies that earned them."
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2" delay={0.05}>
            {proofs.map((p) => (
              <StaggerItem key={p.title}>
                <div className="flex gap-4 rounded-2xl border border-mono-20 bg-white/60 p-6">
                  <Image
                    src={p.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 object-contain"
                    unoptimized
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-mono-90">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mono-70">{p.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-10">
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-brand-primary hover:text-brand-yellow transition-colors cursor-pointer"
            >
              See selected work →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Common questions"
              title="What partners ask first."
              align="center"
            />
          </FadeIn>
          <FadeIn delay={0.08} className="mt-12">
            <FaqAccordion items={faqItems} />
          </FadeIn>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
