import React from "react";

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  offset?: number;
}

export function ParallaxImage({
  children,
  className = "",
  innerClassName = "w-full h-full",
}: ParallaxImageProps) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div className={innerClassName}>{children}</div>
    </div>
  );
}

export default ParallaxImage;
