/**
 * Site-wide motion design tokens and physics curves.
 * Standardized constants for Framer Motion and Lenis.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING_SOFT = {
  type: "spring" as const,
  stiffness: 140,
  damping: 22,
  mass: 0.8,
};

export const SPRING_SNAPPY = {
  type: "spring" as const,
  stiffness: 320,
  damping: 26,
};

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 1.0,
} as const;

export const STAGGER = 0.06;

export const VIEWPORT = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px -5% 0px",
} as const;

/**
 * Helper to smoothly scroll to an element or position using the global Lenis instance.
 * Falls back to native smooth scrolling if Lenis is unavailable or under reduced motion.
 */
export function scrollTo(target: string | HTMLElement | number, options?: Record<string, any>) {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "auto" });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "auto" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "auto" });
    }
    return;
  }

  const lenis = (window as any).__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { duration: 1.15, ...options });
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
}
