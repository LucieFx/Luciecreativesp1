"use client";

import { useState, useEffect } from "react";

/**
 * useLiteMotion:
 * Returns true when:
 * - prefers-reduced-motion: reduce
 * - saveData is active (navigator.connection.saveData)
 * - hardwareConcurrency <= 4 (low-power CPU / mobile)
 * - deviceMemory <= 4 (low RAM device)
 */
export function useLiteMotion(): boolean {
  const [isLite, setIsLite] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkLite = (): boolean => {
      // 1. prefers-reduced-motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 2. saveData
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean };
        deviceMemory?: number;
      };
      const saveData = Boolean(nav.connection?.saveData);

      // 3. hardwareConcurrency <= 4
      const lowConcurrency =
        typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;

      // 4. deviceMemory <= 4
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;

      return prefersReduced || saveData || lowConcurrency || lowMemory;
    };

    setIsLite(checkLite());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setIsLite(checkLite());
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isLite;
}

/**
 * useIsTouch:
 * Detects touch / coarse pointer devices (phones, tablets).
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const hoverNone = window.matchMedia("(hover: none)").matches;
      const touchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
      const touchEvent = "ontouchstart" in window;
      setIsTouch(coarse || hoverNone || touchPoints || touchEvent);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return isTouch;
}

export default useLiteMotion;
