import Link from "next/link";

export const metadata = {
  title: "Case Studies | HUE Unlimited",
  description:
    "How we help brands connect with culture through authentic storytelling.",
};

export default function CaseStudies() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-site px-6 py-20 lg:px-12">
        <div className="mb-16">
          <p className="section-label mb-8">Case Studies</p>
          <h1 className="display-text mb-6 text-[clamp(36px,6vw,80px)] text-white">
            FREQUENCY
            <br />
            <span className="text-outline-yellow">CAMPAIGN</span>
          </h1>
          <p className="body-muted max-w-2xl text-[15px]">
            How we helped Spotify build the #1 destination for Black music
            — from the architecture up.
          </p>
        </div>

        {/* Video placeholder */}
        <div
          id="frequency"
          className="relative mb-12 flex aspect-video items-center justify-center border"
          style={{ borderColor: "var(--border)", background: "var(--dim)" }}
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.14em]"
            style={{ color: "var(--muted)" }}
          >
            Video placeholder
          </span>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { value: "+340%", label: "Engagement Increase" },
            { value: "15M+", label: "Reach Achieved" },
            { value: "92%", label: "Brand Favorability" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border p-6 text-center"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="display-text mb-2 text-[32px]"
                style={{ color: "var(--yellow)" }}
              >
                {stat.value}
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: "var(--muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/#work" className="btn-ghost">
            ← Back to Work
          </Link>
        </div>
      </div>
    </div>
  );
}
