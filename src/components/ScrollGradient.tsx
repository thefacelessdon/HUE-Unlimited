"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed full-viewport gradient that hue-rotates as the user scrolls.
 * Red at arrival → through the spectrum → deep blue at contact.
 */
export default function ScrollGradient() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        "--hue": 240,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gradientRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={
        {
          "--hue": 0,
          background:
            "radial-gradient(ellipse 120% 60% at 50% 110%, hsl(var(--hue, 0) 100% 50% / 0.12), transparent 70%)",
          transition: "none",
        } as React.CSSProperties
      }
      aria-hidden="true"
    />
  );
}
