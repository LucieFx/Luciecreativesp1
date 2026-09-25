import React from "react";

interface SectionLabelProps {
  number?: string;
  text: string;
  className?: string;
}

export function SectionLabel({ number, text, className = "" }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="w-2 h-2 rounded-sm bg-brand-crimson" />
      <span className="font-mono text-xs font-bold uppercase tracking-telemetry text-brand-crimson">
        {number && <>{number} : </>}{text}
      </span>
    </div>
  );
}
