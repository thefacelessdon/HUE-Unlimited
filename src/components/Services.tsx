"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Brand Campaigns & Creative Direction",
  "Content Production — Video, Photo, Digital",
  "Social Strategy & Execution",
  "Event Creative & Experiential",
  "Brand Identity & Visual Systems",
  "Packaging & Product Creative",
  "Program Development & Management",
  "Artist Commerce & Retail",
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial states via GSAP
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const rows = rowsRef.current.filter(Boolean) as HTMLElement[];
    const headlineSpans = headline?.querySelectorAll(":scope > span");

    if (label) gsap.set(label, { opacity: 0, y: 32 });
    if (headlineSpans) gsap.set(headlineSpans, { opacity: 0, y: 32 });
    if (body) gsap.set(body, { opacity: 0, y: 32 });
    gsap.set(rows, { opacity: 0, x: -16 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Section label — 0ms delay, 600ms
          if (label) {
            tl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);
          }

          // Headline lines — 80ms stagger, 700ms
          if (headlineSpans) {
            tl.to(
              headlineSpans,
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
              0.08
            );
          }

          // Body — 360ms delay, 600ms
          if (body) {
            tl.to(body, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.36);
          }

          // Service rows — 40ms stagger, slide from left
          tl.to(
            rows,
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
            0.4
          );
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="px-6 py-24 md:px-12 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-site">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <p ref={labelRef} className="section-label mb-8">
              What We Do
            </p>
            <h2
              ref={headlineRef}
              className="display-text mb-8 text-[clamp(36px,5vw,72px)]"
            >
              <span className="block text-white">AGENCY RANGE.</span>
              <span className="block text-outline-white">IN-HOUSE</span>
              <span className="block text-outline-yellow">MEMORY.</span>
            </h2>
            <div
              ref={bodyRef}
              className="body-muted max-w-lg space-y-4 text-[14px] md:text-[15px]"
            >
              <p>
                You&apos;re past the phase where one person does everything. But
                you&apos;re not ready — or willing — to build and carry a full
                in-house team.
              </p>
              <p>
                Most brands in that position end up with one of two problems: an
                agency that relearns them on every engagement, or freelancers
                they&apos;re managing themselves. Either way, the creative
                director becomes the project manager.
              </p>
              <p>
                HUE is the third option. A standing creative layer — embedded in
                your brand, retained for ongoing work, scaling up when the work
                demands it. The longer we work together, the faster and sharper
                it gets.
              </p>
            </div>
          </div>

          {/* Right column — service list */}
          <div className="flex flex-col justify-center">
            {services.map((service, i) => (
              <div
                key={service}
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                className="group flex items-baseline gap-4 border-b py-5 transition-colors duration-200 hover:border-white/20"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="font-mono text-[10px] font-light tracking-[0.14em] text-[rgba(255,255,255,0.36)] transition-colors duration-200 group-hover:text-[#ffff00]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-body text-[14px] font-light transition-colors duration-200 group-hover:text-white md:text-[15px]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
