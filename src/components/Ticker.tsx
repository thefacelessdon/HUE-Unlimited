const items = [
  "Brand Campaigns",
  "Content Production",
  "Creative Direction",
  "Social Strategy",
  "Brand Identity Systems",
  "Event Creative",
  "Visual Language",
  "Packaging + Product",
  "Program Development",
  "Experiential Production",
  "Artist Commerce",
];

export default function Ticker() {
  const track = items.map((item) => (
    <span
      key={item}
      className="whitespace-nowrap font-mono text-[11px] font-light uppercase tracking-[0.16em]"
      style={{ color: "var(--muted)" }}
    >
      {item}
      <span className="mx-6 inline-block" style={{ color: "var(--yellow)" }}>
        ·
      </span>
    </span>
  ));

  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="ticker-track flex w-max">
        {track}
        {/* Duplicate for seamless loop */}
        {track}
      </div>
    </div>
  );
}
