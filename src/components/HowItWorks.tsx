export default function HowItWorks() {
  return (
    <section className="reveal px-6 py-24 md:px-12 md:py-28 lg:px-12">
      <div className="mx-auto max-w-site">
        <p className="section-label mb-8">How It Works</p>
        <h2 className="display-text mb-16 text-[clamp(36px,5vw,72px)] text-white">
          TWO WAYS IN.
          <br />
          <span className="text-outline-white">ONE THAT STICKS.</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tier 1 — Featured / Yellow */}
          <div
            className="flex flex-col border p-8 md:p-10"
            style={{ background: "var(--yellow)", borderColor: "var(--yellow)" }}
          >
            <span
              className="mb-6 font-mono text-[9px] font-light uppercase tracking-[0.16em]"
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              Tier 1 — The core model
            </span>
            <h3
              className="display-text mb-4 text-[clamp(24px,3vw,36px)]"
              style={{ color: "#000" }}
            >
              EMBEDDED PARTNERSHIP
            </h3>
            <p
              className="mb-8 text-[14px] font-light leading-relaxed"
              style={{ color: "rgba(0,0,0,0.7)" }}
            >
              A retained HUE team inside your brand. Dedicated creative lead.
              Ongoing access to our production network. Weekly syncs. The longer
              it runs, the better it gets.
            </p>
            <ul className="mt-auto space-y-3">
              {[
                "Monthly retainer with defined capacity tiers",
                "Dedicated creative lead — single point of contact",
                "Full production network, scaled to demand",
                "Weekly syncs + quarterly reviews",
                "3–6 month minimum",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-mono text-[10px] uppercase tracking-[0.10em]"
                  style={{ color: "rgba(0,0,0,0.6)" }}
                >
                  <span style={{ color: "#000" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 2 — Ghost / Dark */}
          <div
            className="flex flex-col border p-8 md:p-10"
            style={{ background: "#000", borderColor: "var(--border)" }}
          >
            <span
              className="mb-6 font-mono text-[9px] font-light uppercase tracking-[0.16em]"
              style={{ color: "var(--muted)" }}
            >
              Tier 2
            </span>
            <h3 className="display-text mb-4 text-[clamp(24px,3vw,36px)] text-white">
              PROJECT ENGAGEMENT
            </h3>
            <p className="body-muted mb-8 text-[14px]">
              Scoped work with defined deliverables and a fixed fee. The right
              entry point if you want to see the work before committing to a
              retainer. Most project clients do.
            </p>
            <ul className="mt-auto space-y-3">
              {[
                "Fixed fee based on scope",
                "Clear timeline from the start",
                "Natural on-ramp to Tier 1",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-mono text-[10px] uppercase tracking-[0.10em]"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={{ color: "var(--yellow)" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
