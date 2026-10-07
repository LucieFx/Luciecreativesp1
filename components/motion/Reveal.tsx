"use client";

import React, { useRef, useState, useEffect } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: boolean | number;
  className?: string;
  as?: React.ElementType;
  blur?: boolean;
  scale?: boolean;
  y?: number;
}

export function Reveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  duration = 0.7,
  blur = true,
  scale = true,
  y = 22,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = Component as any;

  // Normal smooth blur fade up + scaleup motion without cutting edges
  const style: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translate3d(0, 0, 0) scale3d(1, 1, 1)"
      : `translate3d(0, ${y}px, 0) scale3d(${scale ? 0.975 : 1}, ${scale ? 0.975 : 1}, 1)`,
    filter: inView ? "blur(0px)" : blur ? "blur(6px)" : "none",
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: "opacity, transform, filter",
    overflow: "visible", // CRITICAL: Never cut edges!
  };

  return (
    <Tag ref={ref} className={className} style={style} data-reveal="true">
      {children}
    </Tag>
  );
}

export default Reveal;
