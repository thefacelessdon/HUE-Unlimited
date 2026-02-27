"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero with darkroom type development.
 * Characters appear from heavy SVG noise/grain and sharpen into the word —
 * like a photo developing in a darkroom. One-use only, in the hero.
 */
export default function Hero() {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const filterReady = useRef(false);

  useEffect(() => {
    // Animate the SVG turbulence filter: high grain → zero grain
    const turb = turbRef.current;
    if (!turb) return;

    turb.setAttribute("baseFrequency", "0.08");

    const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    // Animate filter: grain dissolves over 1.4s
    tl.to(
      {},
      {
        duration: 1.4,
        ease: "power2.out",
        onUpdate: function () {
          const progress = this.progress();
          // Grain frequency: 0.08 → 0 (disappears)
          const freq = 0.08 * (1 - progress);
          turb.setAttribute("baseFrequency", String(freq));
        },
      },
      0
    );

    // Stagger each line: opacity 0 → 1, slight y shift
    linesRef.current.forEach((line, i) => {
      if (!line) return;
      gsap.set(line, { opacity: 0, y: 8 });
      tl.to(
        line,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.08 * i // stagger 80ms between lines
      );
    });

    // Remove filter after animation to restore crisp text
    tl.call(() => {
      filterReady.current = true;
      const container = document.getElementById("hero-headline-container");
      if (container) container.style.filter = "none";
    });

    // Subhead fade in after headline develops
    tl.to(
      subRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      1.2
    );

    // Parallax: headline drifts up as hero exits viewport
    gsap.to("#hero-headline-container", {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    }); // end gsap.context

    return () => ctx.revert();
  }, []);

  const lines = [
    { text: "WE DON'T", className: "text-white" },
    { text: "LEARN YOUR", className: "text-white" },
    { text: "BRAND.", className: "text-outline-white" },
    { text: "WE BECOME", className: "text-white" },
    { text: "PART OF IT.", className: "text-outline-yellow" },
  ];

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-8 pt-24 md:min-h-screen md:pb-12 md:px-12 lg:px-12">
      {/* SVG filter for grain/noise effect */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="darkroom-grain">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.08"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

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
        <div
          id="hero-headline-container"
          style={{ filter: "url(#darkroom-grain)" }}
        >
          <h1 className="display-text text-[clamp(48px,10vw,160px)]">
            {lines.map((line, i) => (
              <span
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                className={`block ${line.className}`}
                style={{ opacity: 0 }}
              >
                {line.text}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Subhead row */}
      <div className="relative z-10 mt-10 flex items-end justify-between">
        <p
          ref={subRef}
          className="body-muted max-w-lg text-[14px] md:text-[15px]"
          style={{ opacity: 0, transform: "translateY(12px)" }}
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
