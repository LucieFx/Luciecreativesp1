"use client";

import React, { useEffect } from "react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col justify-between bg-white text-text-primary p-6 md:p-12 transition-all duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <a href="/" onClick={onClose} className="flex items-center">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-ink font-sans">
            Lucie <span className="text-brand-red">Creatives.</span>
          </span>
        </a>

        <button
          onClick={onClose}
          className="p-2.5 bg-surface-alt text-text-secondary hover:bg-brand-redLight hover:text-brand-red transition-colors rounded-control border border-border-light"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Menu Links */}
      <div className="flex flex-col gap-5 my-auto">
        {NAV_LINKS.map((link, idx) => (
          <a
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight transition-transform duration-200 text-text-primary hover:text-brand-red"
            style={{ transitionDelay: `${idx * 40}ms` }}
          >
            {link.name}
          </a>
        ))}
        <a
          href="/contact"
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-between w-full p-5 bg-brand-red hover:bg-brand-redDark text-white shadow-red-btn font-bold text-lg transition-all rounded-control"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-6 h-6" />
        </a>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-border-light flex flex-col sm:flex-row justify-between gap-3 text-xs font-semibold text-text-tertiary">
        <div>{SITE_CONFIG.officialEmail}</div>
        <div>© 2026 LUCIE CREATIVES. ALL RIGHTS RESERVED.</div>
      </div>
    </div>
  );
}
