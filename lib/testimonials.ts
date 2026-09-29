/**
 * Single source of truth for Lucie Creatives client testimonials.
 *
 * Rules:
 * - Typed data structure with fields: id, name, role, company, quote, isPlaceholder (boolean).
 * - Placeholder entries render only when NODE_ENV !== "production".
 * - In production, if no real (non-placeholder) testimonials exist, the section is hidden cleanly.
 * - Build-time check logs a clear warning whenever placeholder testimonials are present.
 */

import { HOME_TESTIMONIALS, Testimonial } from "../data/testimonials";

export type { Testimonial };
export { HOME_TESTIMONIALS };

export const TESTIMONIALS_DATA: Testimonial[] = HOME_TESTIMONIALS;


/**
 * Returns active testimonials according to the environment:
 * - Production: returns ONLY verified real reviews (!isPlaceholder).
 * - Development / Non-production: returns all testimonials including placeholders for design inspection.
 */
export function getActiveTestimonials(): Testimonial[] {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return TESTIMONIALS_DATA.filter((t) => !t.isPlaceholder);
  }
  return TESTIMONIALS_DATA;
}

/**
 * Build-time check that inspects TESTIMONIALS_DATA and logs a clear warning
 * listing any placeholder testimonials that need replacement before production release.
 */
export function checkPlaceholderTestimonials(): {
  hasPlaceholders: boolean;
  placeholders: Testimonial[];
} {
  const placeholders = TESTIMONIALS_DATA.filter((t) => t.isPlaceholder);

  if (placeholders.length > 0) {
    const list = placeholders
      .map(
        (p, idx) =>
          `   [${idx + 1}] "${p.quote}" — ${p.name}, ${p.role} at ${p.company} (ID: ${p.id})`
      )
      .join("\n");

    const warningMessage = [
      "",
      "================================================================================",
      "[TESTIMONIALS BUILD-TIME AUDIT] Placeholder testimonials detected:",
      list,
      "",
      "Action required: Replace these with real, verified client reviews.",
      "Note: Placeholders are automatically suppressed when NODE_ENV === 'production'.",
      "================================================================================",
      "",
    ].join("\n");

    if (typeof window === "undefined") {
      // Use console.warn so it is visible during next build / SSR compilation
      console.warn(warningMessage);
    }
  }

  return {
    hasPlaceholders: placeholders.length > 0,
    placeholders,
  };
}

// Execute check at evaluation time on server/build
if (typeof window === "undefined") {
  checkPlaceholderTestimonials();
}
