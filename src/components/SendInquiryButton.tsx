"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, X } from "lucide-react";

type SendState = "idle" | "pending" | "success" | "error";

/**
 * Newsletter-style send button inspired by:
 * https://www.framer.com/marketplace/components/newsletter-buttons/
 * Preview: https://newsletter-button.framer.website
 *
 * Sequence: Folding… → origami paper plane launches with loop trail → Sent
 */
export default function SendInquiryButton({
  disabled = false,
  label = "Send inquiry",
  state,
}: {
  disabled?: boolean;
  label?: string;
  state: SendState;
}) {
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [flightKey, setFlightKey] = useState(0);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState<"fold" | "fly">("fold");

  useEffect(() => {
    if (state !== "pending") {
      setPhase("fold");
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      // Launch from near the icon slot on the button
      setOrigin({ x: rect.left + rect.width * 0.78, y: rect.top + rect.height * 0.48 });
    }
    setFlightKey((k) => k + 1);
    setPhase("fold");

    const flyTimer = window.setTimeout(() => setPhase("fly"), 420);
    return () => window.clearTimeout(flyTimer);
  }, [state]);

  const showFlight = state === "pending" && phase === "fly" && !reduce;

  // Loop-the-loop then exit up-right (local px from button origin)
  const trailPath =
    "M 0 0 C 22 -34, 58 -40, 64 -6 C 70 24, 40 34, 18 10 C 2 -8, 40 -52, 130 -105 C 190 -140, 280 -165, 360 -185";

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="submit"
        disabled={disabled || state === "pending"}
        className="relative inline-flex min-w-[10.5rem] cursor-pointer items-center justify-center gap-2.5 overflow-visible rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-surface disabled:cursor-wait"
        whileTap={reduce || state === "pending" ? undefined : { scale: 0.97 }}
        animate={
          state === "pending"
            ? { scale: [1, 0.97, 1] }
            : state === "success"
              ? { backgroundColor: "#166b79" }
              : state === "error"
                ? { backgroundColor: "#b91c1c" }
                : { backgroundColor: "#0f2744" }
        }
        transition={{ duration: 0.35 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === "success" ? (
            <motion.span
              key="success"
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8 }}
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Sent
            </motion.span>
          ) : state === "error" ? (
            <motion.span
              key="error"
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
              Try again
            </motion.span>
          ) : state === "pending" ? (
            <motion.span
              key="pending"
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Folding…
              <span className="inline-block h-4 w-4 opacity-0" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {label}
              <PaperPlaneIcon className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>

        {state === "pending" && phase === "fold" && !reduce && (
          <motion.span
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-surface"
            initial={{ scale: 1, rotate: -18, opacity: 1 }}
            animate={{
              scale: [1, 0.55, 0.28],
              rotate: [-18, -4, 20],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <PaperPlaneIcon className="h-4 w-4" />
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {showFlight && (
          <motion.div
            key={flightKey}
            className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <svg
              className="absolute overflow-visible"
              width={1}
              height={1}
              style={{ left: origin.x, top: origin.y }}
              aria-hidden
            >
              <motion.path
                d={trailPath}
                fill="none"
                stroke="rgba(15,39,68,0.3)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.8, 0.5, 0] }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            {/* Keyframed loop: climb → loop → exit top-right */}
            <motion.div
              className="absolute text-surface drop-shadow-[0_2px_10px_rgba(15,39,68,0.4)]"
              style={{ left: origin.x, top: origin.y }}
              initial={{ x: 0, y: 0, rotate: -18, scale: 0.55, opacity: 0 }}
              animate={{
                x: [0, 28, 58, 48, 22, 55, 140, 260, 360],
                y: [0, -30, -28, 8, 6, -48, -110, -155, -185],
                rotate: [-18, -40, 20, 110, 200, -10, -28, -18, -12],
                scale: [0.55, 1, 1.05, 1, 0.95, 1, 0.95, 0.85, 0.7],
                opacity: [0, 1, 1, 1, 1, 1, 1, 0.85, 0],
              }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <PaperPlaneIcon className="h-5 w-5" outlined />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Origami paper plane (not Lucide airplane) — Framer Newsletter Buttons look */
function PaperPlaneIcon({
  className = "h-4 w-4",
  outlined = false,
}: {
  className?: string;
  outlined?: boolean;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M2.15 11.1 21.55 3.25c.58-.24 1.02.32.74.86L15.35 21c-.2.44-.78.5-1.08.1l-3.7-4.75-4.35 2.12c-.5.24-1-.2-.85-.72l1.1-4.05Z"
        fill="currentColor"
        stroke={outlined ? "rgba(15,39,68,0.5)" : "none"}
        strokeWidth={outlined ? 0.75 : 0}
        strokeLinejoin="round"
      />
      <path
        d="M10.6 13.6 21.55 3.25 8.7 12.75l1.9.85Z"
        fill="currentColor"
        opacity={0.5}
      />
      <path
        d="M10.6 13.6 15.35 21"
        fill="none"
        stroke={outlined ? "rgba(15,39,68,0.4)" : "rgba(255,255,255,0.4)"}
        strokeWidth="0.95"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type { SendState };
