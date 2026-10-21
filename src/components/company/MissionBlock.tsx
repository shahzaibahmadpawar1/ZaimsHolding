import Image from "next/image";
import { FadeIn } from "@/components/Motion";
import type { MissionContent } from "@/lib/companyPages";

export type MissionMedia =
  | { type: "video"; src: string }
  | { type: "image"; src: string; alt?: string };

type MissionBlockProps = {
  mission: MissionContent;
  media?: MissionMedia;
  /** Optional corner badge — omit when the company has no matching credential */
  badge?: { title: string; subtitle: string } | null;
};

export default function MissionBlock({
  mission,
  media,
  badge = null,
}: MissionBlockProps) {
  return (
    <section id="mission" className="bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12 lg:items-center">
        <FadeIn className="relative overflow-hidden rounded-2xl bg-mono-100 lg:col-span-5">
          <div className="relative aspect-[4/5]">
            {media?.type === "video" ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Company mission video"
              />
            ) : media?.type === "image" ? (
              <Image
                src={media.src}
                alt={media.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(201,162,39,0.45),transparent_50%),linear-gradient(160deg,#0a1a2e,#123354)]" />
            )}
          </div>
          {badge ? (
            <div className="absolute bottom-4 right-4 rounded-md bg-mono-100/90 px-3 py-2 text-center">
              <p className="company-display text-lg font-bold text-brand-yellow">{badge.title}</p>
              <p className="company-body text-[10px] font-semibold uppercase tracking-wider text-surface/80">
                {badge.subtitle}
              </p>
            </div>
          ) : null}
        </FadeIn>

        <FadeIn delay={0.08} className="lg:col-span-7">
          <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
            {mission.eyebrow}
          </p>
          <h2 className="company-display mt-2 text-3xl font-bold text-mono-90 md:text-4xl">
            Our <span className="text-brand-yellow">Mission</span>
          </h2>
          <div className="mt-6 space-y-4">
            {mission.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="company-body text-[15px] leading-relaxed text-mono-70 md:text-base">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
