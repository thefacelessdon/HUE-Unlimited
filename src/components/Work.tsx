"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkCard {
  id: string;
  client: string;
  pill: string;
  title: string;
  stats: string;
  tags: string[];
  bgGradient: string;
  watermark: string;
  href?: string;
}

const workCards: WorkCard[] = [
  {
    id: "01",
    client: "Spotify",
    pill: "Spotify · Embedded Partner",
    title: "CO-BUILT FREQUENCY VIA STORYTELLING.",
    stats: "#1 Black Music Destination · 2.1M Followers · 250M Video Views · 6 Regions · 2× Telly Awards",
    tags: ["Global Brand Building", "Creative Direction", "Content", "Social"],
    bgGradient:
      "radial-gradient(ellipse at bottom right, rgba(255,200,0,0.5) 0%, rgba(255,60,0,0.35) 30%, transparent 70%)",
    watermark: "FREQUENCY",
    href: "/work/frequency",
  },
  {
    id: "02",
    client: "Disney",
    pill: "Disney / Pixar · Brand Extension",
    title: "TOOK SOUL BEYOND THE SCREEN.",
    stats: "80+ SKU Catalog · Disney Parks OOH · Amazon Storefront · Gold Telly Winner",
    tags: ["Brand Identity", "Product Design", "Campaign Rollout", "Evergreen Programs"],
    bgGradient:
      "radial-gradient(ellipse at bottom left, rgba(100,0,200,0.45) 0%, rgba(40,0,100,0.3) 40%, transparent 70%)",
    watermark: "SOUL",
    href: "/work/soul",
  },
  {
    id: "03",
    client: "Red Bull",
    pill: "Red Bull · Music Residency",
    title: "CURATED TALENT OF THE NEXT GENERATION.",
    stats: "10 Rising Creators · 30+ Content Assets · Collaborative EP Executive Produced",
    tags: ["Experiential", "Content Production", "Program Development"],
    bgGradient:
      "radial-gradient(ellipse at bottom right, rgba(255,0,0,0.45) 0%, rgba(180,0,0,0.25) 35%, transparent 70%)",
    watermark: "CAMP",
  },
  {
    id: "04",
    client: "Death Row",
    pill: "Death Row × Gamma · Artist Rollout",
    title: "SHAPED THE NEW ERA OF DEATH ROW.",
    stats: "25M+ Video Views · #2 R&B Radio · Top 20 Mediabase · 1M+ Monthly Listeners",
    tags: ["Artist Branding", "360 Campaign", "Social", "Creative Direction"],
    bgGradient:
      "radial-gradient(ellipse at bottom left, rgba(255,160,0,0.4) 0%, rgba(180,80,0,0.25) 35%, transparent 70%)",
    watermark: "DEATH ROW",
  },
  {
    id: "05",
    client: "Artist Commerce",
    pill: "Anderson .Paak · MGK · Snoop Dogg",
    title: "MADE COMMERCE FEEL LIKE CULTURE.",
    stats: "Full Brand Systems · Vans · Hot Topic · Amazon · Touring Retail",
    tags: ["Artist Commerce", "Retail", "Brand Systems"],
    bgGradient:
      "radial-gradient(ellipse at bottom right, rgba(0,0,255,0.4) 0%, rgba(0,0,150,0.25) 35%, transparent 70%)",
    watermark: "COMMERCE",
  },
];

/* ── Card with hover photo-lift effect ── */
function WorkCardComponent({
  card,
  vertical,
}: {
  card: WorkCard;
  vertical?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const inner = (
    <div
      ref={cardRef}
      className="work-card group relative flex flex-col justify-end overflow-hidden border p-6 transition-colors duration-300 hover:border-white/20 md:p-8"
      style={{
        borderColor: "var(--border)",
        background: "#000",
        width: vertical ? "100%" : "520px",
        height: vertical ? "340px" : "480px",
        flexShrink: 0,
      }}
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: card.bgGradient }}
        aria-hidden="true"
      />

      {/* Photo lift layer — surfaces on hover */}
      <div
        className="pointer-events-none absolute inset-4 z-20 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-translate-y-2 group-hover:rotate-[0.8deg] md:inset-6"
        style={{
          background: card.bgGradient,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        aria-hidden="true"
      >
        {/* Placeholder grid for when real photos arrive */}
        <div className="flex h-full items-center justify-center">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            ► {card.id} — AWAITING ASSET
          </span>
        </div>
      </div>

      {/* Watermark */}
      <span
        className="pointer-events-none absolute right-4 top-4 display-text select-none text-[clamp(36px,8vw,100px)] text-white"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        {card.watermark}
      </span>

      {/* Film frame label */}
      <div
        className="absolute left-6 top-6 font-mono text-[8px] font-light uppercase tracking-[0.16em] md:left-8 md:top-8 md:text-[9px]"
        style={{ color: "var(--muted)" }}
      >
        ► {card.id} HUE ARCHIVA 400 [{card.client.toUpperCase()}]
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span
          className="mb-2 inline-block font-mono text-[8px] font-light uppercase tracking-[0.14em] md:mb-3 md:text-[9px]"
          style={{ color: "var(--yellow)" }}
        >
          {card.pill}
        </span>
        <h3 className="display-text mb-3 text-[clamp(18px,3vw,32px)] text-white md:mb-4">
          {card.title}
        </h3>
        <p
          className="mb-3 font-mono text-[9px] font-light uppercase tracking-[0.12em] md:mb-4 md:text-[10px]"
          style={{ color: "var(--muted)" }}
        >
          {card.stats}
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="border px-2 py-0.5 font-mono text-[8px] font-light uppercase tracking-[0.10em] md:px-3 md:py-1 md:text-[9px]"
              style={{
                borderColor: "var(--border)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (card.href) {
    return (
      <Link href={card.href} className="block flex-shrink-0">
        {inner}
      </Link>
    );
  }
  return <div className="flex-shrink-0">{inner}</div>;
}

/* ── Sprocket hole strip ── */
function SprocketStrip() {
  return (
    <div className="flex shrink-0 gap-2 px-6 md:px-12" aria-hidden="true">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="h-[6px] w-[10px] flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      ))}
    </div>
  );
}

export default function Work() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default mobile to avoid flash

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Horizontal scroll via sticky + GSAP (no pin — avoids spacer/black-gap issues)
  useEffect(() => {
    if (isMobile || !ready) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // Wait a frame for layout to settle
    const raf = requestAnimationFrame(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;
      if (scrollDistance <= 0) return;

      // Wrapper height = one viewport (sticky container) + scroll distance
      wrapper.style.height = `${window.innerHeight + scrollDistance}px`;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (counterRef.current) {
                const idx = Math.min(
                  Math.floor(self.progress * workCards.length) + 1,
                  workCards.length
                );
                counterRef.current.textContent = `${String(idx).padStart(2, "0")} / ${String(workCards.length).padStart(2, "0")}`;
              }
            },
          },
        });
      }, wrapper);

      (wrapper as HTMLDivElement & { _gsapCtx?: gsap.Context })._gsapCtx = ctx;
    });

    return () => {
      cancelAnimationFrame(raf);
      const w = wrapperRef.current;
      const ctx = (w as HTMLDivElement & { _gsapCtx?: gsap.Context } | null)?._gsapCtx;
      ctx?.revert();
      if (w) w.style.height = "";
    };
  }, [isMobile, ready]);

  // SSR / pre-hydration: render nothing to avoid layout mismatch
  if (!ready) {
    return (
      <section id="work" className="px-6 py-20 md:px-12">
        <p className="section-label mb-4">The Work</p>
        <h2 className="display-text mb-8 text-[28px] text-white md:text-[clamp(36px,5vw,64px)]">
          SELECTED PROJECTS
        </h2>
      </section>
    );
  }

  /* ── Mobile: vertical stack ── */
  if (isMobile) {
    return (
      <section id="work" className="px-6 py-20">
        <p className="section-label mb-4">The Work</p>
        <h2 className="display-text mb-8 text-[28px] text-white">
          SELECTED
          <br />
          PROJECTS
        </h2>
        <div className="flex flex-col gap-4">
          {workCards.map((card) => (
            <WorkCardComponent key={card.id} card={card} vertical />
          ))}
        </div>
        <div className="mt-10 text-center">
          <span className="display-text text-outline-yellow text-[24px]">
            SEE ALL WORK →
          </span>
        </div>
      </section>
    );
  }

  /* ── Desktop: horizontal scroll via sticky (no GSAP pin) ── */
  return (
    <div id="work" ref={wrapperRef} className="relative">
      {/* Sticky container stays in view while wrapper scrolls */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-black">
        {/* Header */}
        <div className="flex shrink-0 items-end justify-between px-6 pb-6 md:px-12 lg:px-12">
          <div>
            <p className="section-label mb-4">The Work</p>
            <h2 className="display-text text-[clamp(36px,5vw,64px)] text-white">
              SELECTED PROJECTS
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span
              ref={counterRef}
              className="font-mono text-[11px] font-light uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              01 / {String(workCards.length).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-[10px] font-light uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Scroll →
            </span>
          </div>
        </div>

        {/* Top sprocket holes */}
        <SprocketStrip />

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex shrink-0 items-stretch gap-4 px-6 py-4 md:px-12"
          style={{ willChange: "transform" }}
        >
          {workCards.map((card) => (
            <WorkCardComponent key={card.id} card={card} />
          ))}
          {/* End card — CTA */}
          <div
            className="flex flex-shrink-0 flex-col items-center justify-center border p-8"
            style={{
              borderColor: "var(--border)",
              background: "#000",
              width: "520px",
              height: "480px",
            }}
          >
            <span className="display-text text-outline-yellow mb-6 text-center text-[clamp(24px,4vw,48px)]">
              SEE ALL
              <br />
              WORK →
            </span>
            <span
              className="font-mono text-[10px] font-light uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              View full portfolio
            </span>
          </div>
        </div>

        {/* Bottom sprocket holes */}
        <SprocketStrip />
      </div>
    </div>
  );
}
