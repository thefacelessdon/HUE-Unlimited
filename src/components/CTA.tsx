"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial states
    const elements = [
      labelRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      bodyRef.current,
      buttonsRef.current,
      noteRef.current,
    ].filter(Boolean) as HTMLElement[];

    gsap.set(elements, { opacity: 0, y: 32 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Gradient blooms in first (600ms before type) — handled by ScrollGradient keyframes
          // Section label
          tl.to(labelRef.current, {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          }, 0.6);

          // "STOP" rises
          tl.to(line1Ref.current, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          }, 0.68);

          // "STARTING" rises — 80ms later
          tl.to(line2Ref.current, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          }, 0.76);

          // "FROM SCRATCH." rises — 160ms later
          tl.to(line3Ref.current, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          }, 0.84);

          // Subhead fades in
          tl.to(bodyRef.current, {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          }, 1.1);

          // Buttons fade in together
          tl.to(buttonsRef.current, {
            opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          }, 1.3);

          // Process note fades in last
          tl.to(noteRef.current, {
            opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          }, 1.5);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-36 lg:px-12"
    >
      {/* Full-width gradient band */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%]"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,0,0,0.75) 0%, rgba(255,100,0,0.65) 16%, rgba(255,200,0,0.75) 30%, rgba(0,160,255,0.5) 60%, rgba(0,0,255,0.75) 80%)",
          filter: "blur(52px)",
          opacity: 0.42,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-site">
        <p ref={labelRef} className="section-label mb-8">
          Ready When You Are
        </p>

        <h2 className="display-text mb-10 text-[clamp(48px,9vw,140px)]">
          <span ref={line1Ref} className="block text-white">
            STOP
          </span>
          <span ref={line2Ref} className="block text-outline-white">
            STARTING
          </span>
          <span ref={line3Ref} className="block text-outline-yellow">
            FROM SCRATCH.
          </span>
        </h2>

        <p
          ref={bodyRef}
          className="body-muted mb-10 max-w-lg text-[14px] md:text-[16px]"
        >
          Tell us what you&apos;re building. If there&apos;s a fit, you&apos;ll
          know from the first conversation.
        </p>

        <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Link
            href="mailto:creative@hueunlimited.com"
            className="btn-primary text-center"
          >
            Start a conversation →
          </Link>
          <Link href="#work" className="btn-ghost text-center">
            See the work first
          </Link>
        </div>

        <p
          ref={noteRef}
          className="mt-10 font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: "var(--muted)" }}
        >
          We respond within 48 hours. First call is 30 minutes — no decks, no
          pitch.
        </p>
      </div>
    </section>
  );
}
