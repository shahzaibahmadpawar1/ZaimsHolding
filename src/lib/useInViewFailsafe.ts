"use client";

import { useEffect, useState } from "react";

/**
 * Marks a reveal as "shown" after whileInView OR after `ms` from mount.
 * Used to settle transforms — content itself must stay opacity:1.
 */
export function useInViewFailsafe(ms = 800) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), ms);
    return () => window.clearTimeout(id);
  }, [ms]);

  return {
    shown,
    onViewportEnter: () => setShown(true),
  };
}

/** False until after first client paint — SSR/first paint stays fully visible. */
export function useClientMotionReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}
