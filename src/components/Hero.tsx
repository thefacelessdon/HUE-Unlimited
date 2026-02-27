"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      headlineRef.current?.classList.add("developed");
    }, 100);

    const subTimer = setTimeout(() => {
      subRef.current?.style.setProperty("opacity", "1");
      subRef.current?.style.setProperty("transform", "translateY(0)");
    }, 1400);

    return () => {
      clearTimeout(timer);
      clearTimeout(subTimer);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-12 pt-28 md:px-12 lg:px-12">
      {/* Gradient bloom — bottom 25% */}
      <div
        className="gradient-pulse pointer-events-none absolute bottom-0 left-0 right-0 h-[50vh]"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,0,0,0.75) 0%, rgba(255,100,0,0.65) 16%, rgba(255,200,0,0.75) 30%, rgba(0,160,255,0.5) 60%, rgba(0,0,255,0.75) 80%)",
          filter: "blur(52px)",
          opacity: 0.42,
        }}
        aria-hidden="true"
      />

      {/* Top metadata row */}
      <div className="relative z-10 flex items-start justify-between">
        <p
          className="font-mono text-[10px] font-light uppercase tracking-[0.18em]"
          style={{ color: "var(--yellow)" }}
        >
          HUE Unlimited — A 21st Century Creative Studio
        </p>
        <p
          className="hidden font-mono text-[10px] font-light uppercase tracking-[0.18em] text-right md:block"
          style={{ color: "var(--muted)" }}
        >
          Embedded → Retained
          <br />
          Compounding
        </p>
      </div>

      {/* Headline area — bottom-anchored */}
      <div className="relative z-10 mt-auto max-w-[1200px]">
        <div ref={headlineRef} className="hero-headline">
          <h1
            className="display-text text-[clamp(48px,10vw,160px)]"
          >
            <span className="text-white">WE DON&apos;T</span>
            <br />
            <span className="text-white">LEARN YOUR</span>
            <br />
            <span className="text-outline-white">BRAND.</span>
            <br />
            <span className="text-white">WE BECOME</span>
            <br />
            <span className="text-outline-yellow">PART OF IT.</span>
          </h1>
        </div>
      </div>

      {/* Subhead row */}
      <div className="relative z-10 mt-10 flex items-end justify-between">
        <p
          ref={subRef}
          className="body-muted max-w-lg text-[14px] md:text-[15px]"
          style={{
            opacity: 0,
            transform: "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          The embedded creative partner for brands that produce at volume
          and can&apos;t afford to lose the thread.
        </p>
        <span
          className="hidden font-mono text-[10px] font-light uppercase tracking-[0.22em] md:block"
          style={{ color: "var(--muted)" }}
        >
          Scroll ↓
        </span>
      </div>
    </section>
  );
}
