"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="cta"
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
        <p className="section-label mb-8">Ready When You Are</p>

        <h2 className="display-text mb-10 text-[clamp(48px,9vw,140px)]">
          <span className="text-white">STOP</span>
          <br />
          <span className="text-outline-white">STARTING</span>
          <br />
          <span className="text-outline-yellow">FROM SCRATCH.</span>
        </h2>

        <p className="body-muted mb-10 max-w-lg text-[14px] md:text-[16px]">
          Tell us what you&apos;re building. If there&apos;s a fit, you&apos;ll
          know from the first conversation.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="mailto:creative@hueunlimited.com" className="btn-primary">
            Start a conversation →
          </Link>
          <Link href="#work" className="btn-ghost">
            See the work first
          </Link>
        </div>

        <p
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
