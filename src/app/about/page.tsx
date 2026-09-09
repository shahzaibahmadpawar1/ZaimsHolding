import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";
import ValuesScrollGallery from "@/components/ValuesScrollGallery";
import { FadeIn, Reveal } from "@/components/Motion";
import { companies } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zaims Holding — an industrial holding company owning complementary construction and fabrication businesses in Saudi Arabia.",
};

/**
 * Add matching files under public/assets/images (jpg/png/webp).
 * Filenames below are the expected paths — swap extensions if needed.
 */
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

      <section id="story" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-12">
          <Reveal direction="right" className="lg:col-span-4">
            <SectionHeading eyebrow="Our story" title="From fragmentation to a coherent group." />
          </Reveal>
          <Reveal
            direction="left"
            delay={0.08}
            className="lg:col-span-8 space-y-5 text-base leading-relaxed text-mono-70"
          >
            <p>
              Critical infrastructure in the Kingdom still too often depends on a patchwork of unrelated
              contractors — steel from one owner, systems from another, precision parts from a third —
              with no shared incentive to protect the whole.
            </p>
            <p>
              Zaims was formed to hold businesses that belong together:{" "}
              <strong className="font-semibold text-mono-90">NexGen Build</strong> for construction and
              MEP, <strong className="font-semibold text-mono-90">Edge Steel KSA</strong> for structural
              and architectural steel, and{" "}
              <strong className="font-semibold text-mono-90">Dammam Laser CNC</strong> for precision
              fabrication. Each company keeps its operating identity. The holding keeps the long view.
            </p>
            <p>
              We are operators and owners — not a pure financial sponsor, and not a general contractor
              brand papering over unrelated subs.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="values" className="bg-mono-100">
        <ValuesScrollGallery items={values} />
      </section>

      <section id="leadership" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Leadership"
              title="Leadership profiles coming soon."
              description="Names, roles, and biographies will be published here once finalized. Until then, engage the holding through Contact."
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-dashed border-mono-30 bg-paper p-6 text-center"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-mono-20" />
                <p className="mt-4 font-display font-semibold text-mono-55">Leadership seat {n}</p>
                <p className="mt-1 text-sm text-mono-45">Placeholder</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="footprint" className="bg-paper border-t border-mono-20 py-16 md:py-24">
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
                <span className="font-display font-semibold text-mono-90">{c.name}</span>
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
