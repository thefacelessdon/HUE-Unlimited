"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import CustomCursor from "@/components/CustomCursor";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
