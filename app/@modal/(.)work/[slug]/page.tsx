import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/work-data";
import { CaseStudyOverlay } from "@/components/work/CaseStudyOverlay";

interface ModalPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ModalCaseStudyPage({ params }: ModalPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyOverlay slug={slug} />;
}
