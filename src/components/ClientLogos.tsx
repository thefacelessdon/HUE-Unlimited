"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "Spotify",
  "Disney",
  "Red Bull",
  "Death Row Records",
  "Amazon",
  "Vans",
  "Hot Topic",
  "Gamma",
];

export default function ClientLogos() {
  const logosRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const logos = logosRef.current.filter(Boolean) as HTMLElement[];
    if (logos.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#client-logos",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(logos, {
            opacity: 0.45,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="client-logos" className="px-6 py-20 md:px-12 lg:px-12">
      <div className="mx-auto max-w-site">
        <p className="section-label mb-12 justify-center">Trusted By</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {clients.map((name, i) => (
            <span
              key={name}
              ref={(el) => {
                logosRef.current[i] = el;
              }}
              className="font-mono text-[11px] font-light uppercase tracking-[0.14em] transition-opacity duration-200 hover:opacity-80"
              style={{
                color: "rgba(255,255,255,0.45)",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
        <p
          className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: "var(--muted)" }}
        >
          Logo assets pending — text placeholders active
        </p>
      </div>
    </section>
  );
}
