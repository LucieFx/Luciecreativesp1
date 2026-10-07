"use client";

import React from "react";
import { Magnetic } from "@/components/motion/Magnetic";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  showArrow?: boolean;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  onClick,
  showArrow = false,
  ...props
}: MagneticButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus:outline-none select-none cursor-pointer rounded-xl group";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs font-semibold rounded-lg",
    md: "px-6 py-3.5 text-sm font-bold rounded-xl",
    lg: "px-8 py-4 text-base font-bold rounded-xl shadow-red-btn",
  }[size];

  const variantStyles = {
    primary:
      "bg-brand-red text-white shadow-red-btn hover:shadow-floating btn-fill-wipe",
    secondary:
      "bg-white text-text-primary border border-border-light hover:border-brand-red hover:text-brand-red hover:bg-brand-redLight/40 shadow-soft",
    outline:
      "bg-transparent text-text-secondary border border-border-light hover:border-brand-red hover:text-brand-red hover:bg-white rounded-lg",
    ghost:
      "bg-transparent text-text-secondary hover:text-brand-red hover:bg-brand-redLight/50",
  }[variant];

  const combinedClass = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {showArrow && (
        <svg
          className="w-4 h-4 btn-arrow-slide transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </span>
  );

  const buttonElement = href ? (
    <a href={href} className={combinedClass}>
      {inner}
    </a>
  ) : (
    <button onClick={onClick} className={combinedClass} {...props}>
      {inner}
    </button>
  );

  // Primary buttons and magnetic buttons are wrapped in Magnetic primitive
  return <Magnetic>{buttonElement}</Magnetic>;
}
