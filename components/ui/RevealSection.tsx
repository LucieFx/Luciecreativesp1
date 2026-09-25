import React from "react";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealSection({
  children,
  className = "",
}: RevealSectionProps) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
