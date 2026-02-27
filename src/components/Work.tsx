"use client";

import Link from "next/link";

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
  featured?: boolean;
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
    featured: true,
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
      className="group relative flex flex-col justify-end overflow-hidden border p-6 transition-colors duration-300 hover:border-white/20 md:p-8"
      style={{
        borderColor: "var(--border)",
        background: "#000",
        minHeight: card.featured ? "480px" : "420px",
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
        style={{ opacity: card.featured ? 0.08 : 0.05 }}
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
        {/* Pill */}
        <span
          className="mb-3 inline-block font-mono text-[9px] font-light uppercase tracking-[0.14em]"
          style={{ color: "var(--yellow)" }}
        >
          {card.pill}
        </span>

        {/* Title */}
        <h3 className="display-text mb-4 text-[clamp(20px,3vw,32px)] text-white">
          {card.title}
        </h3>

        {/* Stats */}
        <p
          className="mb-4 font-mono text-[10px] font-light uppercase tracking-[0.12em]"
          style={{ color: "var(--muted)" }}
        >
          {card.stats}
        </p>

        {/* Tags */}
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
      <Link href={card.href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function Work() {
  return (
    <section id="work" className="px-6 py-24 md:px-12 md:py-28 lg:px-12">
      <div className="mx-auto max-w-site">
        <p className="section-label mb-8">The Work</p>

        {/* Film strip top perforation */}
        <div
          className="mb-6 flex gap-2"
          aria-hidden="true"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="h-[6px] w-[10px] flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          ))}
        </div>

        {/* Cards grid — featured card spans full, rest 2-col */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <WorkCardComponent card={workCards[0]} />
          </div>
          {workCards.slice(1).map((card) => (
            <WorkCardComponent key={card.id} card={card} />
          ))}
        </div>

        {/* Film strip bottom perforation */}
        <div
          className="mt-6 flex gap-2"
          aria-hidden="true"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="h-[6px] w-[10px] flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-12 text-center">
          <span className="display-text text-outline-yellow cursor-pointer text-[clamp(24px,4vw,48px)] transition-opacity hover:opacity-70">
            SEE ALL WORK →
          </span>
        </div>
      </div>
    </section>
  );
}
