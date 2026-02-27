"use client";

import { useRef, useEffect } from "react";
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

function WorkCardComponent({ card }: { card: WorkCard }) {
  const inner = (
    <div
      className="work-card group relative flex h-full flex-col justify-end overflow-hidden border p-6 transition-colors duration-300 hover:border-white/20 md:p-8"
      style={{
        borderColor: "var(--border)",
        background: "#000",
        width: "min(520px, 80vw)",
        minHeight: "480px",
      }}
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: card.bgGradient }}
        aria-hidden="true"
      />

      {/* Watermark */}
      <span
        className="pointer-events-none absolute right-4 top-4 display-text select-none text-[clamp(48px,8vw,100px)] text-white"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        {card.watermark}
      </span>

      {/* Film frame label */}
      <div
        className="absolute left-6 top-6 font-mono text-[9px] font-light uppercase tracking-[0.16em] md:left-8 md:top-8"
        style={{ color: "var(--muted)" }}
      >
        ► {card.id} HUE ARCHIVA 400 [{card.client.toUpperCase()}]
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span
          className="mb-3 inline-block font-mono text-[9px] font-light uppercase tracking-[0.14em]"
          style={{ color: "var(--yellow)" }}
        >
          {card.pill}
        </span>

        <h3 className="display-text mb-4 text-[clamp(20px,3vw,32px)] text-white">
          {card.title}
        </h3>

        <p
          className="mb-4 font-mono text-[10px] font-light uppercase tracking-[0.12em]"
          style={{ color: "var(--muted)" }}
        >
          {card.stats}
        </p>

        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="border px-3 py-1 font-mono text-[9px] font-light uppercase tracking-[0.10em]"
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

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Calculate how far to scroll horizontally
    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.8,
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

      return () => {
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Header pinned inside section */}
      <div className="flex items-end justify-between px-6 pb-8 pt-24 md:px-12 lg:px-12">
        <div>
          <p className="section-label mb-4">The Work</p>
          <h2 className="display-text text-[clamp(36px,5vw,64px)] text-white">
            SELECTED PROJECTS
          </h2>
        </div>
        <div className="hidden items-center gap-6 md:flex">
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

      {/* Film strip top perforation */}
      <div
        className="mx-6 mb-4 flex gap-2 md:mx-12"
        aria-hidden="true"
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="h-[6px] w-[10px] flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        ))}
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 px-6 md:px-12"
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
            width: "min(520px, 80vw)",
            minHeight: "480px",
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

      {/* Film strip bottom perforation */}
      <div
        className="mx-6 mt-4 flex gap-2 md:mx-12"
        aria-hidden="true"
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="h-[6px] w-[10px] flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        ))}
      </div>
    </section>
  );
}
