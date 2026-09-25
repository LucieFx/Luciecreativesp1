import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: boolean | number;
  className?: string;
  as?: React.ElementType;
}

export function Reveal({
  children,
  className = "",
  as: Component = "div",
}: RevealProps) {
  const Tag = Component as any;
  return <Tag className={className}>{children}</Tag>;
}

export default Reveal;
