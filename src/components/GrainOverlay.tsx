"use client";

import { useEffect, useRef } from "react";

/**
 * Animated film grain overlay — canvas-based, regenerates every 3 frames.
 * Replaces the static SVG grain for a living, breathing texture.
 * Hidden on mobile (<768px) and when prefers-reduced-motion is set.
 */
export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip animation on mobile or reduced motion
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Small internal resolution — browser upscales via CSS
    canvas.width = 256;
    canvas.height = 256;

    function generateGrain() {
      const imageData = ctx!.createImageData(256, 256);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }

      ctx!.putImageData(imageData, 0, 0);
    }

    generateGrain();

    let frameCount = 0;
    let rafId: number;

    function animate() {
      frameCount++;
      if (frameCount % 3 === 0) generateGrain();
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 hidden md:block"
      style={{
        zIndex: 50,
        opacity: 0.035,
        mixBlendMode: "overlay",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
