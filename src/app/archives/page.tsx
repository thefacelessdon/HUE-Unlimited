import Link from "next/link";

export const metadata = {
  title: "Archives | HUE Unlimited",
  description: "Film and polaroid archives — analog captures from the HUE vault.",
};

const collections = [
  {
    id: "01",
    title: "FILM ARCHIVE",
    subtitle: "Analog Photography",
    description:
      "A collection of moments captured on film — raw, unfiltered, and real. Shot on various analog stocks across sessions, locations, and years.",
    count: "24 frames",
    href: "/film-archive",
  },
  {
    id: "02",
    title: "POLAROID ARCHIVES",
    subtitle: "Portrait Collection",
    description:
      "A curated collection of polaroid captures — each one with a story to tell. Portraits, sessions, and behind-the-scenes moments.",
    count: "21 polaroids",
    href: "/polaroid-archives",
  },
];

export default function ArchivesPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 pb-12 pt-12 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <p className="section-label mb-8">HUE Vault</p>
          <h1 className="display-text mb-6 text-[clamp(48px,8vw,120px)]">
            <span className="text-white">THE</span>
            <br />
            <span className="text-outline-white">ARCHIVES.</span>
          </h1>
          <p className="body-muted max-w-lg text-[15px]">
            Analog photography from the HUE vault. Everything here was shot on
            film — no digital, no retouching. Raw captures from the work and the
            life around it.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <div className="grid gap-6 md:grid-cols-2">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={col.href}
                className="group relative flex min-h-[360px] flex-col justify-end border p-8 transition-all duration-300 hover:border-white/20 md:p-10"
                style={{ borderColor: "var(--border)", background: "#000" }}
              >
                {/* Watermark */}
                <span
                  className="pointer-events-none absolute right-6 top-6 display-text select-none text-[80px] text-white"
                  style={{ opacity: 0.04 }}
                  aria-hidden="true"
                >
                  {col.id}
                </span>

                {/* Count badge */}
                <span
                  className="absolute right-6 top-6 border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                >
                  {col.count}
                </span>

                {/* Content */}
                <div>
                  <span
                    className="mb-2 inline-block font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--yellow)" }}
                  >
                    {col.subtitle}
                  </span>
                  <h2 className="display-text mb-4 text-[clamp(28px,4vw,48px)] text-white transition-colors duration-300 group-hover:text-yellow">
                    {col.title}
                  </h2>
                  <p className="body-muted max-w-md text-[14px]">
                    {col.description}
                  </p>
                  <span
                    className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 group-hover:text-white"
                    style={{ color: "var(--muted)" }}
                  >
                    View Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
