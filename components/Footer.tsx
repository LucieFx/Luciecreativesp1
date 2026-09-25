"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONFIG, NAV_LINKS, WHATSAPP_CONFIG } from "@/lib/constants";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import Image from "next/image";
import Link from "next/link";


const SERVICE_LINKS = [
  { name: "Web Development", href: "/web-development" },
  { name: "Video Editing", href: "/video-editing" },
  { name: "Graphic Design", href: "/graphic-design" },
  { name: "Branding", href: "/graphic-design" },
  { name: "UI/UX Design", href: "/ui-ux-design" },
  { name: "Logo Design", href: "/graphic-design" },
  { name: "Social Media Design", href: "/graphic-design" },
];

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("instagram")) return <InstagramIcon className={className} />;
  if (lower.includes("linkedin")) return <LinkedinIcon className={className} />;
  if (lower.includes("twitter") || lower.includes("x")) return <XIcon className={className} />;
  return null;
}

interface FooterProps {
  contactEmail?: string;
}

export function Footer({ contactEmail }: FooterProps = {}) {
  const displayEmail = contactEmail || SITE_CONFIG.officialEmail;
  const [times, setTimes] = useState({
    sf: "00:00:00",
    london: "00:00:00",
    mumbai: "00:00:00",
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();

      const formatTime = (timeZone: string) => {
        return new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
      };

      setTimes({
        sf: formatTime("America/Los_Angeles"),
        london: formatTime("Europe/London"),
        mumbai: formatTime("Asia/Kolkata"),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { duration: 1.15 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-white text-text-primary pt-16 pb-12 px-4 sm:px-6 md:px-12 border-t border-brand-red/20 shadow-[0_-20px_50px_rgba(130,3,3,0.04)] relative overflow-hidden font-normal select-none">
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Global Live Clocks & Operational Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 mb-12 border-b border-line/60">
          <div className="flex items-center gap-2 bg-brand-red-50 px-3.5 py-1.5 rounded-full border border-brand-red/15 text-xs text-brand-red">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span>Operational Status: All Agency Nodes Online • Sprints Active</span>
          </div>

          {/* Live World Clocks */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-body font-bold flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-muted">SF:</span>
              <span className="font-mono text-ink">{times.sf}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted">LDN:</span>
              <span className="font-mono text-ink">{times.london}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted">BOM:</span>
              <span className="font-mono text-ink">{times.mumbai}</span>
            </div>
          </div>
        </div>

        {/* Accessible Section Heading for Screen Readers */}
        <h2 className="sr-only">Footer Navigation</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-14 border-b border-line/60">
          {/* Brand Info */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center mb-5 group">
              <div className="relative h-10 w-auto group-hover:scale-105 transition-transform">
                <Image
                  src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835250/lucie-creatives/logo/lucie-logo.png"
                  alt="Lucie Creatives"
                  width={170}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-muted text-xs sm:text-sm font-normal leading-relaxed max-w-sm mb-5">
              {SITE_CONFIG.description}
            </p>
            <div className="text-xs text-brand-red font-black uppercase tracking-wider flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <a
                  href={`mailto:${displayEmail}`}
                  className="hover:underline hover:opacity-85 transition-opacity cursor-pointer"
                >
                  {displayEmail}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                <a
                  href={WHATSAPP_CONFIG.defaultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message Lucie Creatives on WhatsApp"
                  className="hover:underline hover:opacity-85 transition-opacity cursor-pointer"
                >
                  {WHATSAPP_CONFIG.displayText}
                </a>
              </div>
            </div>
          </div>

          {/* Primary Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black text-text-tertiary uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2 font-medium text-xs sm:text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body hover:text-brand-red transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-text-tertiary uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2 font-medium text-xs sm:text-sm">
              <li>
                <Link
                  href="/video-editing"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/graphic-design"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/dev"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  Insights
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="text-brand-red font-bold hover:underline transition-colors inline-block"
                >
                  Start a Project ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Hiring */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-text-tertiary uppercase tracking-wider mb-4">
              Hiring
            </h3>
            <ul className="space-y-2 font-medium text-xs sm:text-sm">
              <li>
                <Link
                  href="/careers"
                  className="text-body hover:text-brand-red transition-colors inline-block"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-text-tertiary uppercase tracking-wider mb-4">
              Socials
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {SITE_CONFIG.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    aria-label={`${s.name} (${s.handle})`}
                    className="flex items-center justify-between py-2 px-2.5 rounded-xl bg-white/80 hover:bg-red-50 border border-line/60 hover:border-brand-red/30 text-body hover:text-brand-red transition-all group"
                  >
                    <span className="flex items-center text-body group-hover:text-brand-red group-hover:scale-110 transition-all shrink-0">
                      <SocialIcon name={s.name} className="w-4 h-4" />
                    </span>
                    <span className="text-brand-red text-[11px] font-black group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      {s.handle}
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-medium relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} LUCIE CREATIVES AGENCY. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-muted/60">•</span>
            <span>
              Designed and Developed by{" "}
              <a
                href="https://www.instagram.com/luciecreatives/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red font-bold hover:underline transition-colors"
              >
                LucieCreatives
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-red transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-red transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="group p-2.5 bg-white border border-brand-red/20 hover:border-brand-red hover:bg-brand-redLight text-brand-red transition-all rounded-xl flex items-center justify-center shadow-soft hover:shadow-floating focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:outline-none cursor-pointer overflow-hidden relative"
              aria-label="Back to top"
            >
              <div className="relative w-4 h-4 overflow-hidden">
                <ArrowUpRight className="w-4 h-4 -rotate-45 text-brand-red transition-transform duration-300 group-hover:-translate-y-4" />
                <ArrowUpRight className="w-4 h-4 -rotate-45 text-brand-red transition-transform duration-300 translate-y-4 group-hover:translate-y-0 absolute inset-0" />
              </div>
            </button>
          </div>
        </div>


      </div>
    </footer>
  );
}
