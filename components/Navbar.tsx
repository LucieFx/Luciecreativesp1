"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { ArrowUpRight, Menu, X, ChevronDown, Video, Palette, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  primaryCtaLabel?: string;
}

export function Navbar({ primaryCtaLabel = "Start a Project" }: NavbarProps = {}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Scroll detection: sticky at top, hides on scroll down (goes up with scroll), reveals on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible when at or near the top
      if (currentScrollY < 30) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolling down -> goes up with scroll (hides)
      // Scrolling up -> slides back into view
      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility: Escape key closes mobile menu & dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (servicesDropdownOpen) setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, servicesDropdownOpen]);

  // Logo click handler (smooth scroll up if on home, or clean jump)
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const lenis = typeof window !== "undefined" ? (window as any).__lenis : null;

    if (pathname === "/") {
      e.preventDefault();
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate: false, duration: 0.9 });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } else {
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate: true });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0 });
      }
    }
  };

  // Strictly determines if a nav link matches current route (never active on "/")
  const isLinkActive = (link: (typeof NAV_LINKS)[0]) => {
    if (pathname === "/") return false;
    if (link.subLinks && link.subLinks.length > 0) {
      return link.subLinks.some(
        (sub) => pathname === sub.href || (sub.href !== "/" && pathname.startsWith(sub.href))
      );
    }
    return pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
  };

  return (
    <>
      {/* Dynamic smart header: sticks at top, goes up with scroll down, reveals on scroll up */}
      <header
        className={`fixed top-3 sm:top-4 left-0 right-0 z-50 pointer-events-none px-3.5 sm:px-6 transition-transform duration-300 ease-out ${
          isVisible || mobileMenuOpen ? "translate-y-0" : "-translate-y-[140%]"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full relative">
          <nav
            aria-label="Primary Navigation"
            className="w-full rounded-xl pointer-events-auto flex items-center justify-between select-none relative bg-white border border-line text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] py-2.5 sm:py-3.5 px-3.5 sm:px-8"
          >
            {/* SECTION 1: Logo (Left) */}
            <Link
              href="/"
              aria-label="Lucie Creatives Home"
              title="Lucie Creatives — Return to Homepage"
              scroll={true}
              onClick={handleLogoClick}
              className="flex items-center group py-0.5 px-1 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-2 cursor-pointer relative z-30"
            >
              <div className="relative h-7 sm:h-8 w-auto flex items-center">
                <Image
                  src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835250/lucie-creatives/logo/lucie-logo.png"
                  alt="Lucie Creatives"
                  width={145}
                  height={46}
                  priority
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            {/* SECTION 2: Desktop Links (Center) */}
            <div
              className="hidden min-[1080px]:flex items-center gap-1 xl:gap-1.5 font-sans relative"
              aria-label="Navigation Links"
            >
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link);

                if (link.hasDropdown && link.subLinks) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesDropdownOpen((prev) => !prev)}
                        aria-expanded={servicesDropdownOpen}
                        aria-haspopup="true"
                        className={`relative whitespace-nowrap px-3.5 py-1.5 text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-sans font-medium tracking-[-0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-1 rounded-lg group select-none flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? "text-[#8B1A1A] font-semibold bg-[#8B1A1A]/[0.08]"
                            : "text-body hover:text-[#8B1A1A] hover:bg-neutral-100/70"
                        }`}
                      >
                        <span className="relative z-10">{link.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen
                              ? "rotate-180 text-[#8B1A1A]"
                              : "text-muted group-hover:text-[#8B1A1A]"
                          }`}
                        />

                        {isActive && (
                          <span
                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#8B1A1A]"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      {/* Floating Dropdown Card */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-2.5 w-80 rounded-2xl bg-white/98 backdrop-blur-xl border border-line/90 p-2 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.16),0_4px_16px_rgba(0,0,0,0.06)] z-50 overflow-hidden"
                          >
                            <div className="px-2.5 pt-2 pb-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-muted">
                              Our Capabilities
                            </div>
                            <div className="space-y-1">
                              {link.subLinks.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                      isSubActive
                                        ? "bg-[#8B1A1A]/[0.08] text-[#8B1A1A]"
                                        : "hover:bg-neutral-100/80 text-ink"
                                    }`}
                                  >
                                    <div
                                      className={`mt-0.5 p-2 rounded-lg shrink-0 transition-colors ${
                                        isSubActive
                                          ? "bg-[#8B1A1A] text-white"
                                          : "bg-neutral-100 group-hover/item:bg-[#8B1A1A]/10 text-body group-hover/item:text-[#8B1A1A]"
                                      }`}
                                    >
                                      {sub.name.includes("Video") && <Video className="w-4 h-4" />}
                                      {sub.name.includes("Graphic") && <Palette className="w-4 h-4" />}
                                      {sub.name.includes("Web") && <Globe className="w-4 h-4" />}
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="text-[13px] font-bold group-hover/item:text-[#8B1A1A] transition-colors leading-tight">
                                        {sub.name}
                                      </div>
                                      {sub.description && (
                                        <div className="text-[11px] text-body/80 font-normal leading-snug mt-0.5 line-clamp-1">
                                          {sub.description}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative whitespace-nowrap px-3.5 py-1.5 text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-sans font-medium tracking-[-0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-1 rounded-lg group select-none ${
                      isActive
                        ? "text-[#8B1A1A] font-semibold bg-[#8B1A1A]/[0.08]"
                        : "text-body hover:text-[#8B1A1A] hover:bg-neutral-100/70"
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>

                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#8B1A1A]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* SECTION 3: Magnetic CTA Button (Right - Desktop) + Mobile Toggle */}
            <div className="flex items-center gap-2.5 font-sans">
              <MagneticNavbarCta href="/contact" label={primaryCtaLabel} />

              {/* Mobile Hamburger / Close Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
                className="min-[1080px]:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-line/60 hover:bg-line text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-2 cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-ink" />
                ) : (
                  <Menu className="w-5 h-5 text-ink" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between p-6 sm:p-10 pointer-events-auto select-none overflow-y-auto"
          >
            {/* Spacing below top navigation pill */}
            <div className="pt-20 sm:pt-24" />

            {/* Mobile Nav Links */}
            <nav
              className="flex flex-col space-y-2 sm:space-y-3 my-auto font-sans"
              aria-label="Mobile Navigation Links"
            >
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link);

                if (link.hasDropdown && link.subLinks) {
                  return (
                    <div key={link.name} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className={`group flex items-center justify-between text-2xl sm:text-3xl font-bold tracking-tight py-2.5 px-3.5 rounded-2xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] cursor-pointer ${
                          isActive
                            ? "text-[#8B1A1A] bg-[#8B1A1A]/[0.08]"
                            : "text-ink hover:text-[#8B1A1A] hover:bg-line/50"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-6 h-6 text-muted transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180 text-[#8B1A1A]" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 pr-1 pt-1 pb-1 flex flex-col space-y-1"
                          >
                            {link.subLinks.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-base sm:text-lg font-semibold transition-all ${
                                    isSubActive
                                      ? "text-[#8B1A1A] bg-[#8B1A1A]/[0.08]"
                                      : "text-body hover:text-[#8B1A1A] hover:bg-line/40"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    {sub.name.includes("Video") && <Video className="w-4 h-4 text-[#8B1A1A]" />}
                                    {sub.name.includes("Graphic") && <Palette className="w-4 h-4 text-[#8B1A1A]" />}
                                    {sub.name.includes("Web") && <Globe className="w-4 h-4 text-[#8B1A1A]" />}
                                    <span>{sub.name}</span>
                                  </div>
                                  <ArrowUpRight className="w-4 h-4 text-muted" />
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center justify-between text-2xl sm:text-3xl font-bold tracking-tight py-2.5 px-3.5 rounded-2xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] ${
                      isActive
                        ? "text-[#8B1A1A] bg-[#8B1A1A]/[0.08]"
                        : "text-ink hover:text-[#8B1A1A] hover:bg-line/50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                      )}
                      <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-[#8B1A1A] transition-all" />
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTA at Bottom */}
            <div className="pt-6 border-t border-line/80 font-sans mt-auto">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#961D1D] to-[#781414] hover:from-[#8B1A1A] hover:to-[#6E1212] text-white font-semibold text-base rounded-xl py-4 shadow-[0_4px_16px_rgba(139,26,26,0.28)] active:scale-[0.98] transition-all"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Desktop Magnetic CTA Button with Spring Physics & Shine Sweep
// ─────────────────────────────────────────────────────────────
function MagneticNavbarCta({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const buttonRef = React.useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle magnetic pull limited to 6px max
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pullX = Math.max(-6, Math.min(6, (e.clientX - centerX) * 0.18));
    const pullY = Math.max(-5, Math.min(5, (e.clientY - centerY) * 0.18));
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="hidden sm:block relative"
    >
      <Link
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden inline-flex items-center gap-1.5 bg-gradient-to-b from-[#961D1D] to-[#781414] hover:from-[#8B1A1A] hover:to-[#6E1212] text-white font-semibold text-xs sm:text-sm rounded-xl px-5 py-2.5 shadow-[0_4px_14px_rgba(139,26,26,0.28)] hover:shadow-[0_6px_20px_rgba(139,26,26,0.38)] active:scale-[0.97] transition-all duration-200 group/cta focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-2 select-none"
      >
        {/* Light shine sweep across button on hover */}
        <motion.span
          initial={false}
          animate={{
            x: isHovered ? "240%" : "-140%",
          }}
          transition={{
            duration: 0.65,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/28 to-transparent -skew-x-12 pointer-events-none"
          aria-hidden="true"
        />

        <span className="relative z-10">{label}</span>
        <ArrowUpRight className="relative z-10 w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-200" />
      </Link>
    </motion.div>
  );
}

