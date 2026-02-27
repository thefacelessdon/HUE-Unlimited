"use client";

import { useEffect, useRef } from "react";

const SECTION_LABELS: Record<string, string> = {
  hero: "00 — ARRIVAL",
  "client-logos": "01 — TRUSTED BY",
  "the-shift": "02 — THE SHIFT",
  work: "03 — THE WORK",
  "what-we-do": "04 — WHAT WE DO",
  systems: "05 — SYSTEMS",
  "how-it-works": "06 — THE MODEL",
  cta: "07 — NEXT",
};

export default function SectionLabel() {
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_LABELS);
    let current = "";

    const onScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.4;

      let activeId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) {
          activeId = id;
        }
      }

      const label = SECTION_LABELS[activeId];
      if (label !== current && labelRef.current) {
        current = label;
        labelRef.current.textContent = label;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={labelRef}
      className="pointer-events-none fixed hidden md:block"
      style={{
        bottom: "32px",
        left: "48px",
        zIndex: 100,
        fontFamily: "'Roboto', monospace",
        fontSize: "9px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(255, 255, 255, 0.28)",
        transition: "opacity 0.6s ease",
      }}
      aria-hidden="true"
    >
      00 — ARRIVAL
    </div>
  );
}
