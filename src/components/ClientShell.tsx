"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import ScrollGradient from "@/components/ScrollGradient";
import SectionLabel from "@/components/SectionLabel";
import GrainOverlay from "@/components/GrainOverlay";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();

  return (
    <>
      <ScrollGradient />
      <GrainOverlay />
      <CustomCursor />
      <SectionLabel />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
