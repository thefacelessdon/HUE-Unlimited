"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

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
      {/* Film strip header */}
      <div className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-hue-400">
            Film Archive
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Analog <span className="gradient-text">memories</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            A collection of moments captured on film — raw, unfiltered, and real.
          </p>
        </div>
      </div>

      {/* Scroll controls */}
      <div className="absolute right-6 top-[7.5rem] z-10 flex gap-2 lg:right-24">
        <button
          onClick={() => scroll("left")}
          className="rounded-full border border-white/10 bg-neutral-900/80 p-2 backdrop-blur-sm transition-colors hover:border-white/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="rounded-full border border-white/10 bg-neutral-900/80 p-2 backdrop-blur-sm transition-colors hover:border-white/30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Film strip sprocket holes - top */}
      <div className="flex h-6 items-center justify-around bg-neutral-900 px-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="h-3 w-5 rounded-sm bg-neutral-800" />
        ))}
      </div>

      {/* Scrollable film strip */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto bg-neutral-900 px-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0"
            style={{ width: item.type === "video" ? "500px" : "350px" }}
          >
            {item.type === "image" ? (
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
                <Image
                  src={item.url}
                  alt={`Film frame ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="350px"
                />
                {/* Film frame number */}
                <div className="absolute bottom-2 right-2 font-mono text-xs text-orange-400/70">
                  {String(index + 1).padStart(2, "0")}A
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
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
                    setPlayingVideo(playingVideo === item.url ? null : item.url)
                  }
                  className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
                >
                  {playingVideo === item.url ? (
                    <Pause className="h-12 w-12 text-white/80" />
                  ) : (
                    <Play className="h-12 w-12 text-white/80" />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Film strip sprocket holes - bottom */}
      <div className="flex h-6 items-center justify-around bg-neutral-900 px-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="h-3 w-5 rounded-sm bg-neutral-800" />
        ))}
      </div>
    </div>
  );
}
