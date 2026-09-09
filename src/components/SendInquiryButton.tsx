"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Plane, X } from "lucide-react";

type SendState = "idle" | "pending" | "success" | "error";

/**
 * Paper-plane send button inspired by Framer Newsletter Buttons:
 * https://www.framer.com/marketplace/components/newsletter-buttons/
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
  const [flightKey, setFlightKey] = useState(0);

  useEffect(() => {
    if (state === "pending") setFlightKey((k) => k + 1);
  }, [state]);

  const showFlight = state === "pending" && !reduce;

  return (
    <>
      <motion.button
        type="submit"
        disabled={disabled || state === "pending"}
        className="relative inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-90"
        whileTap={reduce || state === "pending" ? undefined : { scale: 0.97 }}
        animate={
          state === "pending"
            ? { scale: [1, 0.98, 1] }
            : state === "success"
              ? { backgroundColor: "#0f766e" }
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Inquiry sent
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
              Sending…
              {!reduce && (
                <motion.span
                  animate={{ x: [0, 4, 0], y: [0, -2, 0], rotate: [0, 12, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Plane className="h-4 w-4" />
                </motion.span>
              )}
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
              <Plane className="h-4 w-4 -rotate-12" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full-viewport paper-plane flight route */}
      <AnimatePresence>
        {showFlight && (
          <motion.div
            key={flightKey}
            className="pointer-events-none fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d="M 12 78 C 28 58, 48 42, 68 34 S 92 18, 108 8"
                fill="none"
                stroke="rgba(184,115,51,0.4)"
                strokeWidth="0.6"
                strokeDasharray="1.5 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            <motion.div
              className="absolute left-[18%] top-[72%] flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white shadow-[0_12px_40px_rgba(15,39,68,0.35)]"
              initial={{ x: 0, y: 0, scale: 0.6, rotate: -20, opacity: 0 }}
              animate={{
                x: ["0vw", "18vw", "38vw", "58vw", "78vw"],
                y: ["0vh", "-10vh", "-22vh", "-32vh", "-48vh"],
                rotate: [-20, 8, -6, 14, -8],
                scale: [0.6, 1, 1.05, 1, 0.85],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Plane className="h-5 w-5" />
            </motion.div>

            {/* Fold / trail sparks */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute left-[18%] top-[72%] h-1.5 w-1.5 rounded-full bg-brand-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  x: ["0vw", `${14 + i * 18}vw`, `${40 + i * 20}vw`],
                  y: ["0vh", `${-8 - i * 6}vh`, `${-24 - i * 8}vh`],
                  opacity: [0, 0.9, 0],
                  scale: [0.4, 1, 0.2],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.08 + i * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export type { SendState };
