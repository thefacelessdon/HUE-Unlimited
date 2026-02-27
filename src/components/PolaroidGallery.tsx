"use client";

import { useState } from "react";
import Image from "next/image";

interface Polaroid {
  id: string;
  image: string;
  title: string;
  backstory: string;
}

interface PolaroidGalleryProps {
  polaroids: Polaroid[];
}

export function PolaroidGallery({ polaroids }: PolaroidGalleryProps) {
  const [selected, setSelected] = useState<Polaroid | null>(null);

  return (
    <>
      {/* Header */}
      <div className="px-6 pb-10 pt-12 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <p className="section-label mb-8">Polaroid Archives</p>
          <h1 className="display-text mb-4 text-[clamp(36px,6vw,80px)]">
            <span className="text-white">MOMENTS IN</span>
            <br />
            <span className="text-outline-white">FOCUS.</span>
          </h1>
          <p className="body-muted max-w-lg text-[15px]">
            A curated collection of polaroid captures — each one with a story to
            tell.
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="mx-auto max-w-site px-6 pb-24 md:px-12 lg:px-12">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {polaroids.map((polaroid) => (
            <div
              key={polaroid.id}
              onClick={() => setSelected(polaroid)}
              className="group mb-4 inline-block w-full cursor-pointer break-inside-avoid"
            >
              <div
                className="border p-3 pb-10 transition-all duration-300 group-hover:-rotate-1 group-hover:border-white/20"
                style={{
                  borderColor: "var(--border)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={polaroid.image}
                    alt={polaroid.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p
                  className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: "var(--muted)" }}
                >
                  {polaroid.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <div className="mt-8">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{ color: "var(--muted)" }}
          >
            {polaroids.length} polaroids · Various sessions
          </span>
        </div>
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border"
            style={{ borderColor: "var(--border)", background: "#000" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center border transition-colors duration-200 hover:border-white/30"
              style={{ borderColor: "var(--border)", background: "#000" }}
              aria-label="Close"
            >
              <span style={{ color: "var(--muted)" }}>✕</span>
            </button>

            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
                sizes="672px"
              />
            </div>

            <div className="p-8">
              <h2 className="display-text mb-3 text-[24px] text-white">
                {selected.title}
              </h2>
              <p className="body-muted text-[14px]">{selected.backstory}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
