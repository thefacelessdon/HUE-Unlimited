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
    description: "HOW WE ABSORB A BRAND BEFORE WE MAKE ANYTHING",
    access: "PUBLIC",
  },
  {
    id: "02",
    name: "Embedded Operating Model",
    description: "WHAT THE RETAINER LOOKS LIKE, DAY TO DAY",
    access: "PUBLIC",
  },
  {
    id: "03",
    name: "Creative Brief Framework",
    description: "THE BRIEF STRUCTURE WE RUN ON EVERY PROJECT",
    access: "CLIENTS ONLY",
  },
  {
    id: "04",
    name: "Talent Network & Capacity Model",
    description: "HOW WE SCALE WITHOUT FIXED OVERHEAD",
    access: "CLIENTS ONLY",
  },
  {
    id: "05",
    name: "Monthly Value Report",
    description: "HOW WE KEEP THE PARTNERSHIP VISIBLE",
    access: "CLIENTS ONLY",
  },
];

/**
 * Types out text character by character into an element.
 * Returns array of timeout IDs for cleanup.
 */
function typeOut(el: HTMLElement, text: string, speed = 24): number[] {
  el.textContent = "";
  el.style.textDecoration = "none";
  const ids: number[] = [];
  const chars = Array.from(text);
  chars.forEach((char, i) => {
    const id = window.setTimeout(() => {
      el.textContent += char;
    }, i * speed);
    ids.push(id);
  });
  return ids;
}

/**
 * For CLIENTS ONLY items: after typing, strike through the text,
 * pause, then replace with redaction dashes.
 */
function strikeAndRedact(
  el: HTMLElement,
  startDelay: number
): number[] {
  const ids: number[] = [];

  // Step 1: add strikethrough
  ids.push(
    window.setTimeout(() => {
      el.style.textDecoration = "line-through";
      el.style.textDecorationColor = "rgba(255,255,255,0.4)";
    }, startDelay)
  );

  // Step 2: replace with redaction dashes
  ids.push(
    window.setTimeout(() => {
      el.style.textDecoration = "none";
      el.textContent = "";
      const redacted = "— — — — — — —";
      const chars = Array.from(redacted);
      chars.forEach((char, i) => {
        ids.push(
          window.setTimeout(() => {
            el.textContent += char;
          }, i * 18)
        );
      });
    }, startDelay + 350)
  );

  return ids;
}

function SystemRow({ system }: { system: SystemItem }) {
  const descRef = useRef<HTMLSpanElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const handleEnter = useCallback(() => {
    if (!descRef.current) return;
    clearAll();

    // Type out the description in all-caps Roboto
    const typeIds = typeOut(descRef.current, system.description, 24);
    timeoutsRef.current.push(...typeIds);

    // For CLIENTS ONLY: strike through then redact
    if (system.access === "CLIENTS ONLY") {
      const typeDuration = system.description.length * 24;
      const redactIds = strikeAndRedact(
        descRef.current,
        typeDuration + 300
      );
      timeoutsRef.current.push(...redactIds);
    }
  }, [system, clearAll]);

  const handleLeave = useCallback(() => {
    clearAll();
    if (descRef.current) {
      descRef.current.textContent = "";
      descRef.current.style.textDecoration = "none";
    }
  }, [clearAll]);

  return (
    <div
      className="group flex cursor-pointer items-center gap-4 border-b py-5 transition-all duration-200 hover:translate-x-1.5 md:gap-6 md:py-6 lg:gap-8"
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
      <span
        className="display-text flex-1 text-[clamp(16px,2.5vw,28px)] transition-colors duration-200 group-hover:text-white"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {system.name}
      </span>

      {/* Typewriter description — Roboto, uppercase, terminal-style */}
      <span
        ref={descRef}
        className="hidden w-[300px] shrink-0 text-right font-mono text-[10px] font-light uppercase tracking-[0.12em] lg:inline-block"
        style={{
          color: "var(--muted)",
          minHeight: "1.2em",
          transition: "text-decoration-color 0.2s ease",
        }}
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
