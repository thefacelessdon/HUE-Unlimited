"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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
      <div className="section-padding pb-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-hue-400">
            Polaroid Archives
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Moments in <span className="gradient-text">focus</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            A curated collection of polaroid captures — each one with a story to tell.
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {polaroids.map((polaroid) => (
            <div
              key={polaroid.id}
              onClick={() => setSelected(polaroid)}
              className="group mb-6 inline-block w-full cursor-pointer break-inside-avoid"
            >
              <div className="rounded-lg bg-white p-3 pb-12 shadow-lg transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]">
                <div className="relative aspect-square overflow-hidden bg-neutral-200">
                  <Image
                    src={polaroid.image}
                    alt={polaroid.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-3 text-center font-mono text-sm text-neutral-700">
                  {polaroid.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-neutral-800">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
                sizes="672px"
              />
            </div>

            <div className="p-8">
              <h2 className="mb-3 text-2xl font-bold text-white">
                {selected.title}
              </h2>
              <p className="text-base leading-relaxed text-neutral-400">
                {selected.backstory}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
