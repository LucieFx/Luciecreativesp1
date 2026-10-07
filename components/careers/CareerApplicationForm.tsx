"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Upload, Loader2, Send } from "lucide-react";
import { CareerRole } from "@/lib/careers-data";

interface CareerApplicationFormProps {
  role: CareerRole;
}

export function CareerApplicationForm({ role }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    portfolio: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    location: "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setCvFile(null);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({
        type: "error",
        text: "The selected CV file exceeds 5MB. Please upload a smaller PDF or Word document.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvFile(null);
      return;
    }

    // Check extension
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(ext)) {
      setStatusMessage({
        type: "error",
        text: "Invalid file format. Please upload a PDF or Word document (.pdf, .doc, .docx).",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvFile(null);
      return;
    }

    setStatusMessage(null);
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Validate required fields marked with * in specification
    const missing: string[] = [];
    if (!formData.name.trim()) missing.push("Your name");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.experience) missing.push("Total experience");
    if (!formData.noticePeriod) missing.push("Notice period");
    if (!formData.location.trim()) missing.push("Current location");
    if (!cvFile) {
      missing.push("CV upload");
    }

    if (missing.length > 0 || !cvFile) {
      setStatusMessage({
        type: "error",
        text: `Please fill out all required fields: ${missing.join(", ")}.`,
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const submissionData = new FormData();
      submissionData.append("roleSlug", role.slug);
      submissionData.append("roleTitle", role.title);
      submissionData.append("name", formData.name.trim());
      submissionData.append("email", formData.email.trim());
      submissionData.append("phone", formData.phone.trim());
      submissionData.append("city", formData.city.trim());
      submissionData.append("portfolio", formData.portfolio.trim());
      submissionData.append("experience", formData.experience);
      submissionData.append("currentSalary", formData.currentSalary.trim());
      submissionData.append("expectedSalary", formData.expectedSalary.trim());
      submissionData.append("noticePeriod", formData.noticePeriod);
      submissionData.append("location", formData.location.trim());
      submissionData.append("cv", cvFile as Blob);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setStatusMessage({
        type: "success",
        text: "Your application has been received! Our leadership team reviews every candidate within 48 hours and will reach out via email or phone.",
      });

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        portfolio: "",
        experience: "",
        currentSalary: "",
        expectedSalary: "",
        noticePeriod: "",
        location: "",
      });
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      const isNetworkError =
        err instanceof TypeError ||
        err?.message === "Failed to fetch" ||
        (typeof navigator !== "undefined" && !navigator.onLine);

      const errorMessage = isNetworkError
        ? "Couldn't submit your application. Check your connection and try again, or email us at hello@luciecreatives.in."
        : (err?.message || "Couldn't submit your application. Check your connection and try again, or email us at hello@luciecreatives.in.");

      // Input is preserved when submission fails
      setStatusMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-line/90 shadow-xs p-6 sm:p-10 relative overflow-hidden">
      <div className="border-b border-line/60 pb-6 mb-8">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#8B1A1A] block mb-1">
          APPLICATION FORM
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
          Apply for {role.title}
        </h3>
        <p className="text-sm text-muted font-medium mt-1">
          Direct review by Lucie Creatives leadership. Confidential and direct.
        </p>
      </div>

      {statusMessage && (
        <div
          role="alert"
          className={`p-4 sm:p-5 rounded-2xl mb-8 flex items-start gap-3.5 border ${
            statusMessage.type === "success"
              ? "bg-brand-red-50 border-brand-red/20 text-ink"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm font-medium leading-relaxed">
            <p className="font-bold">
              {statusMessage.type === "success"
                ? "Application Successfully Dispatched"
                : "Submission Issue"}
            </p>
            <p className="mt-0.5">{statusMessage.text}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Row 1: Name* & Email* (Two-column on desktop, single on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Name <span className="text-[#8B1A1A]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Full Name"
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Email <span className="text-[#8B1A1A]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. aakash@example.com"
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            />
          </div>
        </div>

        {/* Row 2: Phone & City (Two-column on desktop, single on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Surat, Ahmedabad, Vadodara"
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            />
          </div>
        </div>

        {/* Row 3: Portfolio / Profile link (Full width) */}
        <div>
          <label
            htmlFor="portfolio"
            className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
          >
            Portfolio/profile link
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="https://behance.net/yourprofile or Google Drive link"
            className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
          />
        </div>

        {/* Row 4: Total experience* (select) & Notice period* (select) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="experience"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Total experience <span className="text-[#8B1A1A]">*</span>
            </label>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            >
              <option value="">Select experience level</option>
              <option value="0 to 1 yr">0 to 1 yr</option>
              <option value="1 to 3 yrs">1 to 3 yrs</option>
              <option value="3 to 5 yrs">3 to 5 yrs</option>
              <option value="5+ yrs">5+ yrs</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="noticePeriod"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Notice period <span className="text-[#8B1A1A]">*</span>
            </label>
            <select
              id="noticePeriod"
              name="noticePeriod"
              required
              value={formData.noticePeriod}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            >
              <option value="">Select notice duration</option>
              <option value="Immediate">Immediate</option>
              <option value="15 days">15 days</option>
              <option value="1 month">1 month</option>
              <option value="2+ months">2+ months</option>
            </select>
          </div>
        </div>

        {/* Row 5: Current monthly salary (₹) & Expected monthly salary (₹) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="currentSalary"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Current monthly salary (₹)
            </label>
            <input
              type="number"
              id="currentSalary"
              name="currentSalary"
              min="0"
              step="500"
              value={formData.currentSalary}
              onChange={handleChange}
              placeholder="e.g. 25000"
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="expectedSalary"
              className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
            >
              Expected monthly salary (₹)
            </label>
            <input
              type="number"
              id="expectedSalary"
              name="expectedSalary"
              min="0"
              step="500"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="e.g. 35000"
              className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
            />
          </div>
        </div>

        {/* Row 6: Current location* (Full width) */}
        <div>
          <label
            htmlFor="location"
            className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
          >
            Current location <span className="text-[#8B1A1A]">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Adajan, Surat or Satellite, Ahmedabad"
            className="w-full px-4 py-3 rounded-xl border border-line bg-white/50 text-ink placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
          />
        </div>

        {/* Row 7: CV upload* (PDF/Word, max 5MB) */}
        <div>
          <label
            htmlFor="cv"
            className="block text-xs font-bold uppercase tracking-wider text-body mb-2"
          >
            CV upload <span className="text-[#8B1A1A]">*</span>
          </label>
          <div className="relative border-2 border-dashed border-line hover:border-[#8B1A1A]/40 rounded-lg p-5 bg-white/50 transition-colors text-center">
            <input
              type="file"
              id="cv"
              name="cv"
              ref={fileInputRef}
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <Upload className="w-6 h-6 text-[#8B1A1A] mb-2" />
              <p className="text-sm font-bold text-ink">
                {cvFile ? cvFile.name : "Click or drag your CV here"}
              </p>
              <p className="text-xs text-muted mt-1">
                Accepts PDF or Word document (Maximum file size: 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* DPDP Act Privacy Notice */}
        <p className="text-[11px] text-muted leading-relaxed">
          By submitting this application, you agree to our{" "}
          <Link href="/privacy" className="text-[#8B1A1A] underline font-semibold hover:text-[#8b1a1a]">
            Privacy Policy
          </Link>
          . Candidate personal data is processed solely for recruitment evaluation under the Digital Personal Data Protection Act (DPDP Act) 2023.
        </p>

        {/* Form Footer */}
        <div className="pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-medium self-start sm:self-auto">
            Fields marked <span className="text-[#8B1A1A] font-bold">*</span> are required
          </p>

          {/* "Send application" button (filled maroon, white text) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-[#8B1A1A] hover:bg-[#8b1a1a]/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Send application</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
