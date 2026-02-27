"use client";

import { useRef, useCallback } from "react";

interface SystemItem {
  id: string;
  name: string;
  description: string;
  access: "PUBLIC" | "CLIENTS ONLY";
}

const systems: SystemItem[] = [
  {
    id: "01",
    name: "Brand Immersion Protocol",
    description: "How we absorb a brand before we make anything",
    access: "PUBLIC",
  },
  {
    id: "02",
    name: "Embedded Operating Model",
    description: "What the retainer looks like, day to day",
    access: "PUBLIC",
  },
  {
    id: "03",
    name: "Creative Brief Framework",
    description: "The brief structure we run on every project",
    access: "CLIENTS ONLY",
  },
  {
    id: "04",
    name: "Talent Network & Capacity Model",
    description: "How we scale without fixed overhead",
    access: "CLIENTS ONLY",
  },
  {
    id: "05",
    name: "Monthly Value Report",
    description: "How we keep the partnership visible",
    access: "CLIENTS ONLY",
  },
];

function typeOut(el: HTMLElement, text: string, speed = 28) {
  el.textContent = "";
  const chars = Array.from(text);
  chars.forEach((char, i) => {
    setTimeout(() => {
      el.textContent += char;
    }, i * speed);
  });
  return chars.length * speed;
}

function redact(el: HTMLElement, speed = 28) {
  const redacted = "— — — — — — — — —";
  el.textContent = "";
  const chars = Array.from(redacted);
  chars.forEach((char, i) => {
    setTimeout(() => {
      el.textContent += char;
    }, i * speed);
  });
}

function SystemRow({ system }: { system: SystemItem }) {
  const descRef = useRef<HTMLSpanElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const handleEnter = useCallback(() => {
    if (!descRef.current) return;
    // Clear any pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const duration = typeOut(descRef.current, system.description);

    if (system.access === "CLIENTS ONLY") {
      const id = window.setTimeout(() => {
        if (descRef.current) redact(descRef.current);
      }, duration + 400);
      timeoutsRef.current.push(id);
    }
  }, [system]);

  const handleLeave = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (descRef.current) descRef.current.textContent = "";
  }, []);

  return (
    <div
      className="group flex cursor-pointer items-center gap-6 border-b py-6 transition-all duration-200 hover:translate-x-1.5 md:gap-8"
      style={{ borderColor: "var(--border)" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Number */}
      <span
        className="w-8 shrink-0 font-mono text-[10px] font-light tracking-[0.14em]"
        style={{ color: "var(--muted)" }}
      >
        {system.id}
      </span>

      {/* Name */}
      <span className="display-text flex-1 text-[clamp(18px,2.5vw,28px)] transition-colors duration-200 group-hover:text-white"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {system.name}
      </span>

      {/* Typewriter description area */}
      <span
        ref={descRef}
        className="hidden w-[280px] shrink-0 text-right font-mono text-[10px] font-light uppercase tracking-[0.12em] lg:inline-block"
        style={{ color: "var(--muted)", minHeight: "1.2em" }}
      />

      {/* Badge */}
      <span
        className="hidden shrink-0 border px-2 py-1 font-mono text-[8px] font-light uppercase tracking-[0.14em] md:inline-block"
        style={{
          borderColor:
            system.access === "PUBLIC"
              ? "rgba(255,255,0,0.3)"
              : "var(--border)",
          color:
            system.access === "PUBLIC"
              ? "var(--yellow)"
              : "var(--muted)",
        }}
      >
        {system.access}
      </span>

      {/* Arrow */}
      <span
        className="shrink-0 font-mono text-[14px] transition-colors duration-200 group-hover:text-yellow"
        style={{ color: "var(--muted)" }}
      >
        ↗
      </span>
    </div>
  );
}

export default function Systems() {
  return (
    <section
      id="systems"
      className="reveal px-6 py-24 md:px-12 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="section-label mb-8">HUE Systems</p>
            <h2 className="display-text text-[clamp(36px,5vw,72px)] text-white">
              THE INFRA-
              <br />
              STRUCTURE
              <br />
              BEHIND THE
              <br />
              WORK.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="body-muted max-w-md text-[14px] md:text-[15px]">
              An embedded relationship only works if there&apos;s a system
              underneath it. These are the structures that make it run — for
              every client, from week one.
            </p>
          </div>
        </div>

        {/* Systems list */}
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {systems.map((system) => (
            <SystemRow key={system.id} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
