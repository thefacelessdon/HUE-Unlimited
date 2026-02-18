"use client";

/* ── CardList: single-column, tight stacking ──────── */

interface CardListProps {
  children: React.ReactNode;
  className?: string;
}

export function CardList({ children, className = "" }: CardListProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {children}
    </div>
  );
}

/* ── ListCard: content-hugging card ───────────────── */

interface ListCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  accentBar?: string;
}

export function ListCard({
  children,
  onClick,
  selected = false,
  className = "",
  accentBar,
}: ListCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface-card border rounded-card transition-all duration-card ${
        onClick
          ? "cursor-pointer hover:border-border-medium"
          : ""
      } ${
        selected
          ? "ring-1 ring-accent border-accent"
          : "border-border"
      } ${accentBar ? "flex" : ""} ${className}`}
    >
      {accentBar && (
        <div className={`w-1 shrink-0 rounded-l-card ${accentBar}`} />
      )}
      <div className="flex-1 min-w-0 px-5 py-4">
        {children}
      </div>
    </div>
  );
}

/* ── Backward-compat re-exports ──────────────────── */

export { CardList as CardGrid };
export { ListCard as GridCard };
