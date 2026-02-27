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
  const renderItems = (prefix: string) =>
    items.map((item) => (
      <span
        key={`${prefix}-${item}`}
        className="whitespace-nowrap font-mono text-[10px] font-light uppercase tracking-[0.16em] md:text-[11px]"
        style={{ color: "var(--muted)" }}
      >
        {item}
        <span className="mx-4 inline-block md:mx-6" style={{ color: "var(--yellow)" }}>
          ·
        </span>
      </span>
    ));

  return (
    <div
      className="overflow-hidden border-y py-4 md:py-5"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="ticker-track flex w-max">
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
}
