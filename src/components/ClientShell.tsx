"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import ScrollGradient from "@/components/ScrollGradient";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();

  return (
    <>
      <ScrollGradient />
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
