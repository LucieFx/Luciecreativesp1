import React from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
}: TiltCardProps) {
  return (
    <div className={`relative transition-transform duration-200 ease-out hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}

export default TiltCard;
