"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  SITE_CONFIG,
  WHATSAPP_CONFIG,
  buildWhatsAppLink,
} from "@/lib/constants";
import { SectionLabel } from "./ui/SectionLabel";
import { MagneticButton } from "./ui/MagneticButton";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Mail,
  Loader2,
  ExternalLink,
  Send,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import { WhatsAppQR } from "./WhatsAppQR";
import { SplitText } from "@/components/motion/SplitText";
import { m, AnimatePresence } from "framer-motion";
import { SPRING_SOFT, EASE_OUT } from "@/lib/motion";
interface ContactProps {
  primaryCtaLabel?: string;
}

export function Contact({ primaryCtaLabel = "Start a Project" }: ContactProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Web Development",
    budget: "",
    message: "",
    hp_website: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isSuccessMorph, setIsSuccessMorph] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [whatsAppNotice, setWhatsAppNotice] = useState<{
    type: "error" | "info";
    text: string;
    url?: string;
  } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [whatsAppDispatched, setWhatsAppDispatched] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && nameError && value.trim()) {
      setNameError("");
    }
    if (whatsAppNotice) {
      setWhatsAppNotice(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setWhatsAppNotice(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Trigger checkmark morph sequence before full success screen
        setIsSuccessMorph(true);
        setTimeout(() => {
          setStatus("success");
          setIsSuccessMorph(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            service: "Web Development",
            budget: "",
            message: "",
            hp_website: "",
          });
          setNameError("");
          setWhatsAppNotice(null);
        }, 1100);
      } else {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "Couldn't send your message. Check your connection and try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Couldn't send your message. Check your connection and try again."
      );
    }
  };

  const handleWhatsAppSend = () => {
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      setNameError("Please enter your name to start a WhatsApp message.");
      setWhatsAppNotice({
        type: "error",
        text: "Please enter your name above so we know who we're chatting with on WhatsApp.",
      });
      return;
    }
    setNameError("");
    setWhatsAppNotice(null);

    let text = `Hi Lucie Creatives, I'm ${trimmedName}`;
    if (formData.company.trim()) {
      text += `, from ${formData.company.trim()}`;
    }
    text += `.`;

    if (formData.service.trim()) {
      text += ` I'm interested in ${formData.service.trim()}.`;
    }

    if (formData.budget.trim()) {
      text += ` Budget: ${formData.budget.trim()}.`;
    }

    if (formData.message.trim()) {
      text += ` ${formData.message.trim()}`;
    }

    const url = buildWhatsAppLink(text);

    // Trigger celebratory animation for WhatsApp dispatch
    setWhatsAppDispatched(true);
    setTimeout(() => {
      setWhatsAppDispatched(false);
    }, 7000);

    try {
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        setWhatsAppNotice({
          type: "info",
          text: "Popup was blocked by your browser. Click below to open WhatsApp directly.",
          url,
        });
      }
    } catch {
      setWhatsAppNotice({
        type: "error",
        text: "Couldn't open WhatsApp automatically. Click below to continue.",
        url,
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden font-bold">
      {/* Background dot pattern */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionLabel text="START A PROJECT" className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Single Consolidated Heading & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[11px] font-black text-[#8B1A1A] uppercase tracking-wider border border-[#8B1A1A]/15 mb-4">
                <span>Direct Inquiry &amp; Discovery</span>
              </div>

              {/* Animate Headline with SplitText */}
              <SplitText
                as="h1"
                className="font-display font-black tracking-[-0.02em] text-text-primary text-[clamp(2.0rem,4.5vw,4.5rem)] leading-[1.0] mb-5 text-balance"
                accentClassName="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline"
              >
                Let&apos;s build something *iconic together.*
              </SplitText>

              <p className="text-text-secondary text-base font-medium leading-relaxed mb-8 text-pretty">
                Tell us what you&apos;re building. Direct consultation with our founders with guaranteed response within 24 hours.
              </p>

              {/* WhatsApp Messaging Card - Lifts on hover */}
              <m.div
                whileHover={{ y: -4 }}
                transition={SPRING_SOFT}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-line shadow-soft mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-shadow hover:shadow-elevated"
              >
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1.5 text-[#8B1A1A]">
                        <WhatsAppIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          WhatsApp
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-muted bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Messages only
                      </span>
                    </div>
                    <div className="font-extrabold text-lg md:text-xl text-text-primary select-text">
                      {WHATSAPP_CONFIG.displayText}
                    </div>
                  </div>

                  <div>
                    <a
                      href={WHATSAPP_CONFIG.defaultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Message Lucie Creatives on WhatsApp"
                      className="inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 !bg-[#8B1A1A] hover:!bg-[#701515] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-sm transition-all text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0 text-white" />
                      <span>Message us on WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="shrink-0 flex justify-center sm:justify-end">
                  <WhatsAppQR />
                </div>
              </m.div>

              {/* Verified Agency Trust Card (Email Card) - Shown Second */}
              <div className="p-6 bg-white rounded-2xl border border-line shadow-soft mb-6 space-y-4">
                <div className="flex items-center gap-2 text-[#8B1A1A]">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Official Inquiries
                  </span>
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.officialEmail}`}
                  className="block font-extrabold text-lg md:text-xl text-text-primary hover:text-[#7A1F2B] transition-colors uppercase"
                >
                  {SITE_CONFIG.officialEmail}
                </a>

                <div className="pt-4 border-t border-line/60 grid grid-cols-1 gap-2.5 text-xs text-body font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B] shrink-0" />
                    <span>Direct review with our Founders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                    <span>Strict mutual NDA &amp; 100% commercial IP transfer upon signoff</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-text-tertiary font-semibold">
              Founded in Gujarat • Serving ambitious brands across India and Global.
            </div>
          </div>

          {/* Right Column: Interactive Lead Generation Form */}
          <div className="lg:col-span-7 self-start bg-white p-8 md:p-10 rounded-lg border border-line shadow-xs">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <m.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="py-12 px-4 sm:px-8 text-center flex flex-col items-center relative overflow-hidden"
                  role="status"
                  aria-live="polite"
                >
                  {/* Animated Checkmark Indicator */}
                  <div className="relative mb-6">
                    <m.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.15, 1] }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative w-16 h-16 rounded-lg bg-[#8B1A1A] text-white flex items-center justify-center shadow-xs"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <m.path
                          d="M20 6L9 17l-5-5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        />
                      </svg>
                    </m.div>
                  </div>

                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="max-w-md mx-auto"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#8B1A1A] text-xs font-black uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A] inline-block" aria-hidden="true" />
                      <span>Brief Dispatched Successfully</span>
                    </div>

                    <h3 className="font-extrabold text-2xl sm:text-3xl text-text-primary mb-3">
                      We&apos;ve Got Your Brief!
                    </h3>

                    <p className="text-text-secondary text-sm sm:text-base mb-6 font-medium leading-relaxed text-pretty">
                      Thank you for trusting Lucie Creatives. Your brief has been directly routed to our founders. We review every project benchmark and will respond within 24 hours.
                    </p>

                    <div className="p-4 rounded-lg bg-surface-alt border border-line mb-8 text-left text-xs font-medium space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-muted flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-red" />
                          <span>Turnaround Target:</span>
                        </span>
                        <strong className="text-ink font-bold">&lt; 24 Hours Guaranteed</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
                          <span>Direct Routing:</span>
                        </span>
                        <strong className="text-brand-red font-bold">Direct Founder Review</strong>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <MagneticButton onClick={() => setStatus("idle")} variant="secondary" size="md">
                        <span>Submit Another Brief</span>
                      </MagneticButton>
                      <a
                        href={WHATSAPP_CONFIG.defaultLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#8B1A1A] hover:bg-[#7A1F2B] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xs transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </m.div>
                </m.div>
              ) : (
                <form key="contact-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <input
                    type="text"
                    name="hp_website"
                    value={formData.hp_website}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="relative">
                      <label
                        htmlFor="contact-name"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none uppercase font-bold tracking-wider z-10 ${
                          focusedField === "name" || formData.name
                            ? "top-2 text-[10px] text-[#8B1A1A]"
                            : "top-4 text-xs text-muted"
                        }`}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        aria-required="true"
                        aria-invalid={nameError ? "true" : undefined}
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={focusedField === "name" || formData.name ? "Alex Vance" : ""}
                        className={`w-full h-14 bg-white/80 border rounded-xl px-4 pt-5 pb-1.5 text-text-primary text-sm font-medium focus:outline-none transition-all ${
                          nameError
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                            : focusedField === "name"
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                            : "border-line"
                        }`}
                      />
                      <m.div
                        initial={false}
                        animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ transformOrigin: "left center" }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                      />
                      {nameError && (
                        <p role="alert" className="mt-1 text-xs font-semibold text-red-600">
                          {nameError}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label
                        htmlFor="contact-email"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none uppercase font-bold tracking-wider z-10 ${
                          focusedField === "email" || formData.email
                            ? "top-2 text-[10px] text-[#8B1A1A]"
                            : "top-4 text-xs text-muted"
                        }`}
                      >
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        aria-required="true"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={focusedField === "email" || formData.email ? "alex@company.com" : ""}
                        className={`w-full h-14 bg-white/80 border rounded-xl px-4 pt-5 pb-1.5 text-text-primary text-sm font-medium focus:outline-none transition-all ${
                          focusedField === "email"
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                            : "border-line"
                        }`}
                      />
                      <m.div
                        initial={false}
                        animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ transformOrigin: "left center" }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Company Field */}
                    <div className="relative">
                      <label
                        htmlFor="contact-company"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none uppercase font-bold tracking-wider z-10 ${
                          focusedField === "company" || formData.company
                            ? "top-2 text-[10px] text-[#8B1A1A]"
                            : "top-4 text-xs text-muted"
                        }`}
                      >
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        id="contact-company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={focusedField === "company" || formData.company ? "Brand Name Co" : ""}
                        className={`w-full h-14 bg-white/80 border rounded-xl px-4 pt-5 pb-1.5 text-text-primary text-sm font-medium focus:outline-none transition-all ${
                          focusedField === "company"
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                            : "border-line"
                        }`}
                      />
                      <m.div
                        initial={false}
                        animate={{ scaleX: focusedField === "company" ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ transformOrigin: "left center" }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                      <label
                        htmlFor="contact-phone"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none uppercase font-bold tracking-wider z-10 ${
                          focusedField === "phone" || formData.phone
                            ? "top-2 text-[10px] text-[#8B1A1A]"
                            : "top-4 text-xs text-muted"
                        }`}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={focusedField === "phone" || formData.phone ? "+91 98765 43210" : ""}
                        className={`w-full h-14 bg-white/80 border rounded-xl px-4 pt-5 pb-1.5 text-text-primary text-sm font-medium focus:outline-none transition-all ${
                          focusedField === "phone"
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                            : "border-line"
                        }`}
                      />
                      <m.div
                        initial={false}
                        animate={{ scaleX: focusedField === "phone" ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ transformOrigin: "left center" }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Service Field */}
                    <div className="relative">
                      <label
                        htmlFor="contact-service"
                        className={`absolute left-4 top-2 text-[10px] pointer-events-none uppercase font-bold tracking-wider z-10 transition-colors ${
                          focusedField === "service" ? "text-[#8B1A1A]" : "text-[#8B1A1A]"
                        }`}
                      >
                        Required Service *
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        required
                        aria-required="true"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 bg-white/80 border rounded-xl px-4 pt-5 pb-1.5 text-text-primary text-sm font-medium focus:outline-none transition-all cursor-pointer ${
                          focusedField === "service"
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                            : "border-line"
                        }`}
                      >
                        {SERVICE_CATEGORIES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <m.div
                        initial={false}
                        animate={{ scaleX: focusedField === "service" ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ transformOrigin: "left center" }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                      />
                    </div>

                    {/* Budget Field */}
                    <div className="relative">
                      <label
                        htmlFor="contact-budget"
                        className={`absolute left-4 top-2 text-[10px] pointer-events-none uppercase font-bold tracking-wider z-10 transition-colors ${
                          focusedField === "budget"
                            ? "text-[#8B1A1A]"
                            : formData.budget
                            ? "text-[#8B1A1A]"
                            : "text-muted"
                        }`}
                      >
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 bg-white/80 border rounded-xl px-4 pt-5 pb-1.5 text-text-primary text-sm font-medium focus:outline-none transition-all cursor-pointer ${
                          focusedField === "budget"
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                            : "border-line"
                        }`}
                      >
                        <option value="">Select Budget Range (INR)</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                      <m.div
                        initial={false}
                        animate={{ scaleX: focusedField === "budget" ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        style={{ transformOrigin: "left center" }}
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label
                      htmlFor="contact-message"
                      className={`absolute left-4 pointer-events-none uppercase font-bold tracking-wider z-10 transition-all ${
                        focusedField === "message" || formData.message
                          ? "top-2 text-[10px] text-[#8B1A1A]"
                          : "top-4 text-xs text-muted"
                      }`}
                    >
                      Project Details &amp; Objectives *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      aria-required="true"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={
                        focusedField === "message" || formData.message
                          ? "Tell us about your brand vision, target timeline, and goals..."
                          : ""
                      }
                      className={`w-full min-h-[140px] bg-white/80 border rounded-xl p-4 pt-7 text-text-primary text-sm font-medium focus:outline-none transition-all resize-none ${
                        focusedField === "message"
                          ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/15 shadow-[0_0_15px_rgba(139,26,26,0.14)]"
                          : "border-line"
                      }`}
                    />
                    <m.div
                      initial={false}
                      animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      style={{ transformOrigin: "left center" }}
                      className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#8B1A1A] rounded-full pointer-events-none"
                    />
                  </div>

                  {/* Error Banner */}
                  {status === "error" && (
                    <div role="alert" aria-live="polite" className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Buttons: Primary and Secondary WhatsApp Option */}
                  <div>
                    {/* Celebratory WhatsApp Launch Banner */}
                    {whatsAppDispatched && (
                      <m.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="relative p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs font-bold text-ink flex items-center justify-between gap-2 overflow-hidden shadow-xs mb-3"
                      >
                        <div className="flex items-center gap-2 relative z-10">
                          <CheckCircle2 className="w-4 h-4 text-[#8B1A1A] shrink-0" />
                          <span>WhatsApp launched with your pre-filled brief! Press send to chat with founders.</span>
                        </div>
                        <span className="text-[10px] text-brand-red bg-white px-2.5 py-0.5 rounded-md shrink-0 border border-red-200 font-mono">
                          Ready
                        </span>
                      </m.div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                      {isSuccessMorph ? (
                        <m.div
                          initial={{ width: "100%", borderRadius: "8px" }}
                          animate={{ width: "200px", borderRadius: "8px" }}
                          transition={{ duration: 0.4, ease: EASE_OUT }}
                          className="h-12 bg-[#8B1A1A] flex items-center justify-center text-white mx-auto shadow-xs overflow-hidden shrink-0 relative px-4 gap-2"
                        >
                          <m.div
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{ x: 30, y: -25, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          >
                            <Send className="w-4 h-4 text-white" />
                          </m.div>
                          <m.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.35, ease: "easeOut" }}
                            className="flex items-center gap-1.5 font-bold text-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white" />
                            <span>Sent to Founders!</span>
                          </m.div>
                        </m.div>
                      ) : (
                        <MagneticButton
                          type="submit"
                          disabled={status === "submitting"}
                          variant="primary"
                          size="lg"
                          className="w-full sm:flex-1 h-12 rounded-lg !bg-[#8B1A1A] hover:!bg-[#701515] disabled:opacity-75 disabled:cursor-not-allowed text-white font-extrabold text-sm flex items-center justify-center gap-2"
                          aria-label="Submit project discovery brief to Lucie Creatives"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                              <span>Sending message...</span>
                            </>
                          ) : (
                            <>
                              <span>{primaryCtaLabel}</span>
                              <ArrowUpRight className="w-4 h-4 ml-1" />
                            </>
                          )}
                        </MagneticButton>
                      )}

                      {!isSuccessMorph && (
                        <button
                          type="button"
                          onClick={handleWhatsAppSend}
                          className={`w-full sm:flex-1 h-12 rounded-lg px-5 font-extrabold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs relative overflow-hidden ${
                            whatsAppDispatched
                              ? "bg-[#8B1A1A] text-white border-2 border-[#8B1A1A]"
                              : "border-2 border-[#8B1A1A] text-[#8B1A1A] hover:bg-red-50"
                          }`}
                          aria-label="Send project discovery brief on WhatsApp"
                        >
                          {whatsAppDispatched ? (
                            <m.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                              <span>WhatsApp Chat Launched</span>
                            </m.div>
                          ) : (
                            <>
                              <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#8B1A1A]" />
                              <span>Send on WhatsApp</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* WhatsApp Notice / Popup Blocker Alert */}
                    {whatsAppNotice && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="mt-3 p-3 rounded-lg border text-xs font-semibold flex items-center justify-between gap-2.5 bg-red-50 border-red-200 text-ink"
                      >
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-[#8B1A1A]" />
                          <span>{whatsAppNotice.text}</span>
                        </div>
                        {whatsAppNotice.url && (
                          <a
                            href={whatsAppNotice.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-[#8B1A1A] hover:underline shrink-0"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}

                    <p className="mt-2.5 text-[11px] leading-relaxed text-muted text-center">
                      Prefer WhatsApp? It opens with your message ready. Messages only, no calls.
                    </p>

                    <p className="mt-1.5 text-[11px] text-muted text-center">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="underline hover:text-body transition-colors">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>

                  {/* What happens next block */}
                  <div className="mt-8 pt-6 border-t border-line/60">
                    <h4 className="text-xs font-black uppercase tracking-wider text-body mb-3">
                      What happens next
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 bg-white rounded-lg border border-line/60 text-xs font-medium text-body">
                        1. Send your brief
                      </div>
                      <div className="p-3.5 bg-white rounded-lg border border-line/60 text-xs font-medium text-body">
                        2. We review it and reply with questions or a quote
                      </div>
                      <div className="p-3.5 bg-white rounded-lg border border-line/60 text-xs font-medium text-body">
                        3. Kick-off once you approve
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
