import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import ValuesScrollGallery from "@/components/ValuesScrollGallery";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { companies, leadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zaims Holding — an industrial holding company owning complementary construction and fabrication businesses in Saudi Arabia.",
};

const values = [
  {
    title: "Operator mindset",
    desc: "We are not distant capital. We understand fabrication floors, site logistics, and what permanent ownership demands.",
    image: "/assets/images/values-operator-mindset.jpg",
  },
  {
    title: "Complementary by design",
    desc: "Companies are chosen because they fit an industrial chain — steel, precision fab, construction systems — not because a thesis needed a logo.",
    image: "/assets/images/values-complementary.jpg",
  },
  {
    title: "Standards that travel",
    desc: "Quality discipline matters more than slogans. Credentials stay with the company that earned them; the group insists they are real.",
    image: "/assets/images/values-standards.jpg",
  },
  {
    title: "Long horizon",
    desc: "No forced flip clock. Holding structure exists so operators can plan beyond a fund vintage.",
    image: "/assets/images/values-long-horizon.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A holding built for industrial reality."
        description="Zaims Holding owns and operates complementary construction and fabrication companies across Saudi Arabia. We exist to align capital, craft, and accountability — not to auction projects or flip assets on a timer."
      />

      <section id="story" className="bg-surface py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
          <Reveal direction="right" className="lg:col-span-4">
            <SectionHeading eyebrow="Our story" title="From fragmentation to a coherent group." />
          </Reveal>
          <Reveal
            direction="left"
            delay={0.08}
            className="space-y-5 text-base leading-relaxed text-mono-70 lg:col-span-8"
          >
            <p>
              Critical infrastructure in the Kingdom still too often depends on a patchwork of unrelated
              contractors — steel from one owner, systems from another, precision parts from a third —
              with no shared incentive to protect the whole.
            </p>
            <p>
              Zaims was formed to hold businesses that belong together:{" "}
              <strong className="font-semibold text-brand-yellow">NexGen Build</strong> for construction and
              MEP, <strong className="font-semibold text-brand-yellow">Edge Steel KSA</strong> for structural
              and architectural steel, and{" "}
              <strong className="font-semibold text-brand-yellow">Dammam Laser CNC</strong> for precision
              fabrication. Each company keeps its operating identity. The holding keeps the long view.
            </p>
            <p>
              We are operators and owners — not a pure financial sponsor, and not a general contractor
              brand papering over unrelated subs. Company-level credentials (including NexGen&apos;s Saudi
              Aramco vendor #10119021) stay attributed to the operator that earned them.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="values" className="bg-mono-100">
        <ValuesScrollGallery items={values} />
      </section>

      <section id="leadership" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Leadership"
              title="People published by our operating companies."
              description="Operating leadership includes Adil Tasawar (Founder & Managing Director, Edge Steel KSA) and NexGen Build leaders as published on nxgens.com. Dammam Laser CNC does not list named executives on its public site — contact that company directly for operating inquiries."
            />
          </FadeIn>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <StaggerItem key={person.name}>
                <article className="flex h-full flex-col rounded-2xl border border-mono-20 bg-paper p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/10 font-display text-lg font-bold text-brand-primary">
                    {person.name
                      .replace(/^Eng\.\s*/, "")
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-mono-90">{person.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-yellow">{person.role}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-mono-45">
                    {person.company}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mono-70">{person.bio}</p>
                  {person.sourceUrl ? (
                    <a
                      href={person.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-xs font-semibold text-brand-primary transition-colors hover:text-brand-yellow"
                    >
                      Source →
                    </a>
                  ) : null}
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-sm text-mono-55">
            For Dammam Laser CNC operating contact:{" "}
            <a
              href="https://dammamlaser.com/about-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-primary underline underline-offset-4 hover:text-brand-yellow"
            >
              dammamlaser.com/about-us
            </a>
            {" · "}
            <a
              href="mailto:info@dammamlaser.com"
              className="font-medium text-brand-primary underline underline-offset-4 hover:text-brand-yellow"
            >
              info@dammamlaser.com
            </a>
            .
          </p>
        </div>
      </section>

      <section id="footprint" className="border-t border-mono-20 bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Footprint"
              title="Where the group operates."
              description="Operating companies span Riyadh and the Eastern Province — with facilities and project reach across Saudi Arabia."
            />
          </FadeIn>
          <ul className="mt-10 space-y-4">
            {companies.map((c) => (
              <li
                key={c.slug}
                className="flex flex-col gap-1 border-b border-mono-20 py-4 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <Link
                    href={`/companies/${c.slug}`}
                    className="font-display font-semibold text-brand-yellow transition-colors hover:text-brand-primary"
                  >
                    {c.name}
                  </Link>
                  {c.address ? <p className="mt-1 text-sm text-mono-55">{c.address}</p> : null}
                </div>
                <span className="text-sm text-mono-55">{c.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
