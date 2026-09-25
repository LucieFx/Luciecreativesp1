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
  color = "rgba(122, 31, 43, 0.06)",
  size = 450,
  className = "",
  blur = 120,
}: FloatingDepthOrbProps) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        filter: `blur(${blur}px)`,
      }}
      className={`absolute rounded-full pointer-events-none select-none ${className}`}
    />
  );
}
