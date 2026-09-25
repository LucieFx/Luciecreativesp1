import React from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  maxPull?: number;
}

export function Magnetic({
  children,
  className = "",
}: MagneticProps) {
  return (
    <div className={`inline-block transition-transform duration-150 ease-out hover:scale-[1.02] ${className}`}>
      {children}
    </div>
  );
}

export default Magnetic;
