"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Video, Code2, Compass } from "lucide-react";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  statusBadge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "reel-delivered",
    type: "Video",
    title: "New reel delivered",
    subtitle: "Resort walkthrough · 9:16 vertical",
    statusBadge: "Delivered",
    icon: Video,
  },
  {
    id: "site-live",
    type: "Web",
    title: "Website live",
    subtitle: "Media house agency · mediahouse.space",
    statusBadge: "Live",
    icon: Code2,
  },
  {
    id: "logo-handed-over",
    type: "Brand",
    title: "Logo handed over",
    subtitle: "Jewelry brand · Vector identity kit",
    statusBadge: "Handed over",
    icon: Compass,
  },
];

export function HeroNotificationStack() {
  const shouldReduceMotion = useReducedMotion();

  // Inset classes for stacked deck appearance (Card 0: full, Card 1: 14px inset, Card 2: 28px inset)
  const widthClasses = [
    "w-full",
    "w-[calc(100%-14px)] mx-auto -mt-[11px]",
    "w-[calc(100%-28px)] mx-auto -mt-[11px]",
  ];

  return (
    <div className="w-full max-w-md mt-6 sm:mt-7 mb-11 sm:mb-12 select-none overflow-visible">
      <div className="flex flex-col overflow-visible">
        {NOTIFICATIONS.map((item, idx) => {
          const Icon = item.icon;
          const zIndex = 30 - idx * 10;
          const widthClass = widthClasses[idx] || "w-full";

          return (
            <motion.div
              key={item.id}
              className={`relative flex ${widthClass}`}
              style={{ zIndex }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      delay: 1.25 + idx * 0.1,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
            >
              <div
                className="w-full bg-white rounded-[18px] border border-[#8B1A1A]/16 shadow-[0_4px_16px_rgba(139,26,26,0.05),0_1px_3px_rgba(0,0,0,0.04)] px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 hover:border-[#8B1A1A]/35 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(139,26,26,0.08)] transition-all duration-200 cursor-default"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#8B1A1A]/08 border border-[#8B1A1A]/12 flex items-center justify-center text-[#8B1A1A] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-xs sm:text-[13px] font-semibold text-slate-900 tracking-tight truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <span className="text-[10px] font-semibold text-[#8B1A1A] bg-[#8B1A1A]/08 border border-[#8B1A1A]/15 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {item.statusBadge}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroNotificationStack;
