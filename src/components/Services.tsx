"use client";

const services = [
  "Brand Campaigns & Creative Direction",
  "Content Production — Video, Photo, Digital",
  "Social Strategy & Execution",
  "Event Creative & Experiential",
  "Brand Identity & Visual Systems",
  "Packaging & Product Creative",
  "Program Development & Management",
  "Artist Commerce & Retail",
];

export default function Services() {
  return (
    <section id="services" className="reveal px-6 py-24 md:px-12 md:py-28 lg:px-12">
      <div className="mx-auto max-w-site">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <p className="section-label mb-8">What We Do</p>
            <h2 className="display-text mb-8 text-[clamp(36px,5vw,72px)]">
              <span className="text-white">AGENCY RANGE.</span>
              <br />
              <span className="text-outline-white">IN-HOUSE</span>
              <br />
              <span className="text-outline-yellow">MEMORY.</span>
            </h2>
            <div className="body-muted max-w-lg space-y-4 text-[14px] md:text-[15px]">
              <p>
                You&apos;re past the phase where one person does everything. But
                you&apos;re not ready — or willing — to build and carry a full
                in-house team.
              </p>
              <p>
                Most brands in that position end up with one of two problems: an
                agency that relearns them on every engagement, or freelancers
                they&apos;re managing themselves. Either way, the creative
                director becomes the project manager.
              </p>
              <p>
                HUE is the third option. A standing creative layer — embedded in
                your brand, retained for ongoing work, scaling up when the work
                demands it. The longer we work together, the faster and sharper
                it gets.
              </p>
            </div>
          </div>

          {/* Right column — service list */}
          <div className="flex flex-col justify-center">
            {services.map((service, i) => (
              <div
                key={service}
                className="group flex items-baseline gap-4 border-b py-5 transition-colors duration-200 hover:border-white/20"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="font-mono text-[10px] font-light tracking-[0.14em]"
                  style={{ color: "var(--muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[14px] font-light transition-colors duration-200 group-hover:text-white md:text-[15px]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
