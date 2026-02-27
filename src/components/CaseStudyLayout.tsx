import Link from "next/link";

interface CaseStudyData {
  client: string;
  headline: string;
  headlineOutline: string;
  description: string;
  challenge: string;
  approach: string;
  impact: string;
  stats: { value: string; label: string }[];
  tags: string[];
  gradient: string;
  next?: { label: string; href: string };
}

export function CaseStudyLayout({ data }: { data: CaseStudyData }) {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-12 md:px-12 lg:px-12">
        {/* Gradient bloom */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40vh]"
          style={{
            background: data.gradient,
            filter: "blur(52px)",
            opacity: 0.35,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-site">
          <p className="section-label mb-8">{data.client}</p>
          <h1 className="display-text mb-6 text-[clamp(40px,7vw,100px)]">
            <span className="text-white">{data.headline}</span>
            <br />
            <span className="text-outline-yellow">{data.headlineOutline}</span>
          </h1>
          <p className="body-muted max-w-2xl text-[15px] md:text-[16px]">
            {data.description}
          </p>
        </div>
      </section>

      {/* Media placeholder */}
      <section className="px-6 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <div
            className="relative flex aspect-video items-center justify-center border"
            style={{ borderColor: "var(--border)", background: "var(--dim)" }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              Hero media — awaiting assets
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 py-16 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <div className="grid gap-4 md:grid-cols-4">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="border p-6"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="display-text mb-2 text-[clamp(24px,3vw,36px)]"
                  style={{ color: "var(--yellow)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-column narrative */}
      <section className="px-6 py-16 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="section-label mb-4">The Challenge</p>
              <p className="body-muted text-[14px] md:text-[15px]">
                {data.challenge}
              </p>
            </div>
            <div>
              <p className="section-label mb-4">Our Approach</p>
              <p className="body-muted text-[14px] md:text-[15px]">
                {data.approach}
              </p>
            </div>
            <div>
              <p className="section-label mb-4">The Impact</p>
              <p className="body-muted text-[14px] md:text-[15px]">
                {data.impact}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="px-6 py-16 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex aspect-[4/3] items-center justify-center border"
                style={{ borderColor: "var(--border)", background: "var(--dim)" }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--muted)" }}
                >
                  Image {n}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags + scope */}
      <section className="px-6 py-12 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <p className="section-label mb-6">Scope</p>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.10em]"
                style={{
                  borderColor: "var(--border)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation footer */}
      <section
        className="border-t px-6 py-12 md:px-12 lg:px-12"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto flex max-w-site items-center justify-between">
          <Link href="/#work" className="btn-ghost">
            ← All Work
          </Link>
          {data.next && (
            <Link href={data.next.href} className="btn-primary">
              Next: {data.next.label} →
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
