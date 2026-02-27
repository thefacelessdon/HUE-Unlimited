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
  return (
    <section className="px-6 py-20 md:px-12 lg:px-12">
      <div className="mx-auto max-w-site">
        <p className="section-label mb-12 justify-center">Trusted By</p>
        {/* Desktop: single row. Mobile: two rows */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {clients.map((name) => (
            <span
              key={name}
              className="font-mono text-[11px] font-light uppercase tracking-[0.14em] transition-opacity duration-300 hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.5)" }}
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
