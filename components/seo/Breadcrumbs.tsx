import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { getBreadcrumbSchema } from "@/lib/schema-structured-data";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const jsonLd = getBreadcrumbSchema(
    items.map((item) => ({ name: item.label, item: item.href }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`inline-flex items-center gap-2 text-xs font-semibold text-muted flex-wrap ${className}`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-[#8b1a1a] transition-colors"
          aria-label="Home"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <ChevronRight className="w-3 h-3 text-muted/60" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#8b1a1a] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink font-bold" aria-current="page">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}

export default Breadcrumbs;
