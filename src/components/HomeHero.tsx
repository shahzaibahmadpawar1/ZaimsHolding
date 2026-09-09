"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { TextReveal } from "@/components/Motion";
import CompanyOrbit from "@/components/CompanyOrbit";
import { companies } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

function FloatingOrb({
  className,
  delay = 0,
  duration = 12,
}: {
  className: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} />;

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -28, 12, 0],
        x: [0, 18, -10, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function MagneticCTA({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    variant === "primary"
      ? "rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-primary shadow-lg shadow-black/20"
      : "rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm";

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} inline-flex cursor-pointer transition-colors hover:opacity-95`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-steel-hero bg-noise"
    >
      {/* Ambient orbs */}
      <FloatingOrb
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-accent/20 blur-3xl"
        delay={0}
        duration={14}
      />
      <FloatingOrb
        className="pointer-events-none absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
        delay={2}
        duration={16}
      />
      <FloatingOrb
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-brand-secondary/40 blur-3xl"
        delay={1}
        duration={11}
      />

      {/* Animated grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          y: reduce ? 0 : gridY,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Horizontal steel lines */}
      {!reduce &&
        [18, 42, 68].map((top, i) => (
          <motion.div
            key={top}
            className="pointer-events-none absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ top: `${top}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease }}
          />
        ))}

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-10 px-6 pb-24 pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-28">
        <motion.div
          className="lg:col-span-7"
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <motion.p
            className="mb-6 font-display text-sm font-bold tracking-[0.2em] text-brand-accent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            ZAIMS HOLDING
          </motion.p>

          <TextReveal
            text="We build and hold industrial companies that make Saudi infrastructure possible."
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-[3.6rem]"
            delay={0.15}
          />

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/70 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
          >
            Three complementary operating companies. One long-term ownership structure. Construction,
            steel, and precision fabrication — aligned for the Kingdom.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.05, ease }}
          >
            <MagneticCTA href="/companies">Explore our companies</MagneticCTA>
            <MagneticCTA href="/contact" variant="secondary">
              Get in touch
            </MagneticCTA>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:col-span-5 lg:block"
          style={reduce ? undefined : { y: orbitY }}
        >
          <CompanyOrbit />
        </motion.div>

        {/* Mobile company chips */}
        <motion.div
          className="flex flex-wrap gap-2 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {companies.map((c) => (
            <Link
              key={c.slug}
              href={`/companies/${c.slug}`}
              className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm cursor-pointer"
            >
              {c.shortName}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
