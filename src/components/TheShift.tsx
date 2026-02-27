"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    words: ["EVERYONE", "GOT", "A", "PLATFORM."],
    emphasis: [] as number[],
    body: "The production and distribution tools that used to give institutions their authority became free. The architecture inverted.",
  },
  {
    words: ["TRUST", "MOVED", "FROM", "INSTITUTIONS", "TO", "COMMUNITIES."],
    emphasis: [] as number[],
    body: "Authority doesn\u2019t flow from brands anymore. It emerges from communities \u2014 from creators who\u2019ve earned it through proximity and consistency.",
  },
  {
    words: [
      "THAT'S",
      "NOT",
      "A",
      "CAMPAIGN",
      "PROBLEM.",
      "THAT'S",
      "A",
      "CULTURAL",
      "PRESENCE",
      "PROBLEM.",
    ],
    emphasis: [7, 8], // "CULTURAL PRESENCE" in yellow
    body: "",
  },
];

const PIVOT_LINE = "THE WORK BELOW IS PROOF IT'S POSSIBLE.";

// Phase timing for each statement (within 0–1 scroll progress)
const PHASES = [
  {
    fadeIn: 0.0,
    illumStart: 0.02,
    illumEnd: 0.26,
    fadeOut: 0.26,
    gone: 0.3,
  },
  {
    fadeIn: 0.3,
    illumStart: 0.32,
    illumEnd: 0.56,
    fadeOut: 0.56,
    gone: 0.6,
  },
  {
    fadeIn: 0.6,
    illumStart: 0.62,
    illumEnd: 0.84,
    fadeOut: 0.84,
    gone: 0.88,
  },
];

export default function TheShift() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stmtRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[][]>([[], [], []]);
  const pivotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip scrollytelling on mobile
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;

          // Update each statement
          PHASES.forEach((phase, si) => {
            const stmtEl = stmtRefs.current[si];
            if (!stmtEl) return;

            // Calculate statement container opacity
            let opacity = 0;
            if (p >= phase.fadeIn && p < phase.gone) {
              if (p < phase.illumStart) {
                // Fading in
                opacity =
                  (p - phase.fadeIn) / (phase.illumStart - phase.fadeIn);
              } else if (p >= phase.fadeOut) {
                // Fading out
                opacity =
                  1 - (p - phase.fadeOut) / (phase.gone - phase.fadeOut);
              } else {
                opacity = 1;
              }
            }
            opacity = Math.max(0, Math.min(1, opacity));
            stmtEl.style.opacity = String(opacity);
            stmtEl.style.visibility = opacity <= 0 ? "hidden" : "visible";

            // Word illumination
            const words = wordRefs.current[si];
            if (!words) return;
            const wordCount = STATEMENTS[si].words.length;

            let wordProgress = 0;
            if (p >= phase.illumStart && p <= phase.illumEnd) {
              wordProgress =
                (p - phase.illumStart) / (phase.illumEnd - phase.illumStart);
            } else if (p > phase.illumEnd) {
              wordProgress = 1;
            }

            const activeIdx = Math.min(
              wordCount - 1,
              Math.floor(wordProgress * wordCount)
            );

            words.forEach((wordEl, wi) => {
              if (!wordEl) return;
              if (wi < activeIdx) {
                wordEl.style.opacity = "0.25"; // already read
              } else if (wi === activeIdx && p >= phase.illumStart) {
                wordEl.style.opacity = "1"; // currently reading
              } else {
                wordEl.style.opacity = "0.18"; // not yet reached
              }
            });
          });

          // Pivot line
          const pivotEl = pivotRef.current;
          if (pivotEl) {
            if (p < 0.88) {
              pivotEl.style.opacity = "0";
              pivotEl.style.transform = "translateY(32px)";
            } else {
              const t = Math.min(1, (p - 0.88) / 0.1);
              pivotEl.style.opacity = String(t);
              pivotEl.style.transform = `translateY(${32 * (1 - t)}px)`;
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="the-shift" ref={sectionRef} className="relative md:h-[350vh]">
      {/* Desktop: sticky scrollytelling container */}
      <div className="relative hidden h-screen items-center justify-center overflow-hidden md:sticky md:top-0 md:flex">
        {STATEMENTS.map((stmt, si) => (
          <div
            key={si}
            ref={(el) => {
              stmtRefs.current[si] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{
              opacity: si === 0 ? 1 : 0,
              visibility: si === 0 ? "visible" : ("hidden" as const),
            }}
          >
            <div className="mx-auto max-w-[1200px]">
              <p
                className="display-text text-center leading-[0.95]"
                style={{ fontSize: "clamp(64px, 9vw, 144px)" }}
              >
                {stmt.words.map((word, wi) => (
                  <span
                    key={wi}
                    ref={(el) => {
                      if (!wordRefs.current[si]) wordRefs.current[si] = [];
                      wordRefs.current[si][wi] = el;
                    }}
                    style={{
                      opacity: 0.18,
                      color: stmt.emphasis.includes(wi) ? "#ffff00" : "#ffffff",
                      display: "inline-block",
                      marginRight: "0.3em",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
              {stmt.body && (
                <p
                  className="mx-auto mt-8 max-w-2xl text-center text-[14px] font-light leading-relaxed md:text-[15px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {stmt.body}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Pivot line */}
        <div
          ref={pivotRef}
          className="absolute inset-x-0 bottom-[15vh] text-center"
          style={{ opacity: 0, transform: "translateY(32px)" }}
        >
          <p
            className="uppercase tracking-[0.18em]"
            style={{
              fontFamily: "'Roboto', monospace",
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {PIVOT_LINE}
          </p>
        </div>
      </div>

      {/* Mobile: simple stacked statements, fully visible */}
      <div className="space-y-12 px-6 py-24 text-center md:hidden">
        {STATEMENTS.map((stmt, si) => (
          <div key={si}>
            <p
              className="display-text leading-[0.95]"
              style={{ fontSize: "clamp(36px, 9vw, 64px)" }}
            >
              {stmt.words.map((word, wi) => (
                <span
                  key={wi}
                  style={{
                    color: stmt.emphasis.includes(wi) ? "#ffff00" : "#ffffff",
                    display: "inline-block",
                    marginRight: "0.25em",
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
            {stmt.body && (
              <p
                className="mx-auto mt-4 max-w-md text-[13px] font-light leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {stmt.body}
              </p>
            )}
          </div>
        ))}
        <p
          className="uppercase tracking-[0.18em]"
          style={{
            fontFamily: "'Roboto', monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {PIVOT_LINE}
        </p>
      </div>
    </section>
  );
}
