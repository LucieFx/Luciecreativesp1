import React from 'react';

interface CountUpProps {
  value: string | number;
  duration?: number;
  delay?: number;
  className?: string;
  prefixClassName?: string;
  suffixClassName?: string;
}

export function CountUp({
  value,
  className = '',
}: CountUpProps) {
  return (
    <span className={`tabular-nums ${className}`} aria-label={String(value)}>
      {value}
    </span>
  );
}

export default CountUp;
