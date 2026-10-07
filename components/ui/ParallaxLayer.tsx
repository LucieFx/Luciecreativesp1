import React from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  className = "",
  style = {},
}: ParallaxLayerProps) {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

interface FloatingDepthOrbProps {
  color?: string;
  size?: number;
  speed?: number;
  className?: string;
  blur?: number;
}

export function FloatingDepthOrb({
  color = "rgba(139, 26, 26, 0.06)",
  size = 450,
  blur = 120,
}: FloatingDepthOrbProps) {
  return null;
}
