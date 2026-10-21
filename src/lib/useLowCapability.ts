"use client";

import { useSyncExternalStore } from "react";

/**
 * True only when the user prefers reduced motion.
 * CPU/RAM heuristics were too aggressive and disabled hero/About scroll animations
 * on a large share of normal devices.
 */
export function detectLowCapability(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => onStoreChange();
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

export function useLowCapability() {
  return useSyncExternalStore(subscribe, detectLowCapability, () => false);
}
