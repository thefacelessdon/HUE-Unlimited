"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface FilmStripProps {
  media: MediaItem[];
}

export function FilmStrip({ media }: FilmStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="px-6 pb-10 pt-12 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <p className="section-label mb-8">Film Archive</p>
          <h1 className="display-text mb-4 text-[clamp(36px,6vw,80px)]">
            <span className="text-white">ANALOG</span>
            <br />
            <span className="text-outline-white">MEMORIES.</span>
          </h1>
          <p className="body-muted max-w-lg text-[15px]">
            A collection of moments captured on film — raw, unfiltered, and
            real.
          </p>
        </div>
      </div>

      {/* Scroll controls */}
      <div className="absolute right-6 top-14 z-10 flex gap-2 md:right-12">
        <button
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center border transition-colors duration-200 hover:border-white/30"
          style={{ borderColor: "var(--border)", background: "#000" }}
          aria-label="Scroll left"
        >
          <span style={{ color: "var(--muted)" }}>←</span>
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center border transition-colors duration-200 hover:border-white/30"
          style={{ borderColor: "var(--border)", background: "#000" }}
          aria-label="Scroll right"
        >
          <span style={{ color: "var(--muted)" }}>→</span>
        </button>
      </div>

      {/* Film strip sprocket holes - top */}
      <div
        className="flex h-6 items-center justify-around px-4"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="h-[6px] w-[10px] flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        ))}
      </div>

      {/* Scrollable film strip */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto px-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0"
            style={{ width: item.type === "video" ? "500px" : "350px" }}
          >
            {item.type === "image" ? (
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.url}
                  alt={`Film frame ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="350px"
                />
                {/* Film frame number */}
                <div
                  className="absolute bottom-2 right-2 font-mono text-[9px] tracking-[0.12em]"
                  style={{ color: "rgba(255,200,0,0.6)" }}
                >
                  {String(index + 1).padStart(2, "0")}A
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden">
                <video
                  src={item.url}
                  className="h-full w-full object-cover"
                  loop
                  muted
                  playsInline
                  ref={(el) => {
                    if (el && playingVideo === item.url) el.play();
                    else if (el) el.pause();
                  }}
                />
                <button
                  onClick={() =>
                    setPlayingVideo(
                      playingVideo === item.url ? null : item.url
                    )
                  }
                  className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/10"
                  style={{ background: "rgba(0,0,0,0.2)" }}
                >
                  <span className="display-text text-[24px] text-white">
                    {playingVideo === item.url ? "❚❚" : "▶"}
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Film strip sprocket holes - bottom */}
      <div
        className="flex h-6 items-center justify-around px-4"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="h-[6px] w-[10px] flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        ))}
      </div>

      {/* Frame count */}
      <div className="px-6 py-6 md:px-12">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: "var(--muted)" }}
        >
          {media.length} frames · Various stocks · 2019–2025
        </span>
      </div>
    </div>
  );
}
