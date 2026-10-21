"use client";

import { useMotionValue, type MotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";

function clamp01(n: number) {
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

/**
 * Manual section scroll progress (0–1) while the section is pinned/scrubbing.
 * More reliable than Motion `useScroll({ target })` on static `out/` cold loads.
 *
 * progress = clamp((-rect.top) / (sectionHeight - viewportHeight), 0, 1)
 */
export function useSectionScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  enabled = true,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!enabled) {
      progress.set(0);
      return;
    }

    let raf = 0;

    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        progress.set(0);
        return;
      }
      const top = el.getBoundingClientRect().top;
      progress.set(clamp01(-top / total));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    const raf1 = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(measure);
    });

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("load", measure);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(measure);
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf1);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("load", measure);
    };
  }, [sectionRef, enabled, progress]);

  return progress;
}

/**
 * If the user scrolls ~`scrollPx` inside the section but progress stays &lt; `minProgress`,
 * call `onFail` once (scrub is dead → use fallback UI).
 */
export function useScrubFailureFallback(
  sectionRef: RefObject<HTMLElement | null>,
  progress: MotionValue<number>,
  onFail: () => void,
  {
    enabled = true,
    scrollPx = 80,
    minProgress = 0.02,
    holdMs = 300,
  }: {
    enabled?: boolean;
    scrollPx?: number;
    minProgress?: number;
    holdMs?: number;
  } = {},
) {
  useEffect(() => {
    if (!enabled) return;

    let startY: number | null = null;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let failed = false;

    const clearHold = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    const maybeFail = () => {
      if (failed) return;
      const el = sectionRef.current;
      if (!el) return;
      if (startY === null) return;
      if (Math.abs(window.scrollY - startY) < scrollPx) return;
      if (progress.get() >= minProgress) {
        clearHold();
        return;
      }
      if (holdTimer) return;
      holdTimer = setTimeout(() => {
        if (failed) return;
        if (progress.get() < minProgress) {
          failed = true;
          onFail();
        }
      }, holdMs);
    };

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inTrack = rect.top <= 0 && rect.bottom > window.innerHeight * 0.5;
      if (!inTrack) {
        startY = null;
        clearHold();
        return;
      }
      if (startY === null) startY = window.scrollY;
      maybeFail();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearHold();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef, progress, onFail, enabled, scrollPx, minProgress, holdMs]);
}
