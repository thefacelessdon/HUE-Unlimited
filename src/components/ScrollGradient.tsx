"use client";

import { useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────── */
interface Blob {
  x: number; // % of viewport (left)
  y: number; // % of viewport (top)
  r: number; // radius as % of viewport width
  color: [number, number, number, number]; // [r, g, b, alpha]
}

interface GradientKeyframe {
  stop: number; // 0–1 scroll progress
  blobs: Blob[];
}

/* ─── Keyframes ──────────────────────────────────────────────────── */
const GRADIENT_KEYFRAMES: GradientKeyframe[] = [
  {
    stop: 0.0,
    blobs: [
      { x: 15, y: 85, r: 55, color: [255, 20, 0, 0.7] },
      { x: 75, y: 90, r: 45, color: [255, 140, 0, 0.45] },
      { x: 50, y: 95, r: 60, color: [0, 0, 200, 0.2] },
    ],
  },
  {
    stop: 0.35,
    blobs: [
      { x: 20, y: 75, r: 55, color: [255, 200, 0, 0.65] },
      { x: 70, y: 80, r: 45, color: [255, 60, 0, 0.5] },
      { x: 45, y: 88, r: 40, color: [0, 0, 200, 0.2] },
    ],
  },
  {
    stop: 0.65,
    blobs: [
      { x: 80, y: 90, r: 45, color: [0, 20, 120, 0.25] },
      { x: 20, y: 85, r: 40, color: [20, 0, 80, 0.15] },
      { x: 50, y: 95, r: 35, color: [0, 0, 0, 0.0] },
    ],
  },
  {
    stop: 0.8,
    blobs: [
      { x: 10, y: 75, r: 55, color: [0, 40, 255, 0.55] },
      { x: 85, y: 80, r: 45, color: [80, 0, 200, 0.4] },
      { x: 50, y: 90, r: 40, color: [0, 160, 255, 0.25] },
    ],
  },
  {
    stop: 1.0,
    blobs: [
      { x: 10, y: 85, r: 65, color: [255, 0, 0, 0.75] },
      { x: 50, y: 90, r: 55, color: [255, 200, 0, 0.7] },
      { x: 85, y: 85, r: 60, color: [0, 0, 255, 0.75] },
    ],
  },
];

/* ─── Interpolation ──────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function getKeyframePair(p: number) {
  const f = GRADIENT_KEYFRAMES;
  for (let i = 0; i < f.length - 1; i++) {
    if (p >= f[i].stop && p <= f[i + 1].stop) {
      const t = smoothstep(
        (p - f[i].stop) / (f[i + 1].stop - f[i].stop)
      );
      return { from: f[i], to: f[i + 1], t };
    }
  }
  return p <= 0
    ? { from: f[0], to: f[0], t: 0 }
    : { from: f[f.length - 1], to: f[f.length - 1], t: 1 };
}

function interpolateBlobs(a: Blob[], b: Blob[], t: number): Blob[] {
  return a.map((blob, i) => ({
    x: lerp(blob.x, b[i].x, t),
    y: lerp(blob.y, b[i].y, t),
    r: lerp(blob.r, b[i].r, t),
    color: [
      Math.round(lerp(blob.color[0], b[i].color[0], t)),
      Math.round(lerp(blob.color[1], b[i].color[1], t)),
      Math.round(lerp(blob.color[2], b[i].color[2], t)),
      +lerp(blob.color[3], b[i].color[3], t).toFixed(3),
    ] as [number, number, number, number],
  }));
}

function blobsToCSS(blobs: Blob[]): string {
  return blobs
    .map(({ x, y, r, color: [cr, cg, cb, a] }) =>
      `radial-gradient(ellipse ${r * 2}vw ${r * 1.6}vw at ${x}% ${y}%, rgba(${cr},${cg},${cb},${a}) 0%, transparent 70%)`
    )
    .join(", ");
}

/* ─── Component ──────────────────────────────────────────────────── */
const SMOOTHING = 0.08;

export default function ScrollGradient() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.style.background = blobsToCSS(GRADIENT_KEYFRAMES[0].blobs);
      return;
    }

    let currentY = 0;
    let targetY = window.scrollY;
    let rafId: number;

    const onScroll = () => {
      targetY = window.scrollY;
    };

    function tick() {
      currentY += (targetY - currentY) * SMOOTHING;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentY / maxScroll : 0;

      const { from, to, t } = getKeyframePair(progress);
      const blobs = interpolateBlobs(from.blobs, to.blobs, t);
      el!.style.background = blobsToCSS(blobs);

      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="gradient-bg pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
