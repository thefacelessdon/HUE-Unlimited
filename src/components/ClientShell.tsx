"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
