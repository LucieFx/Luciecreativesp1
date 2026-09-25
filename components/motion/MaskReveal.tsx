import React from "react";

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function MaskReveal({
  children,
  className = "",
  innerClassName = "w-full h-full",
}: MaskRevealProps) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div className={innerClassName}>{children}</div>
    </div>
  );
}

export default MaskReveal;
