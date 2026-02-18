interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export function Card({
  children,
  className = "",
  padding = true,
  onClick,
  selected = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface-card border border-border rounded-card transition-all duration-card ${
        padding ? "p-6" : ""
      } ${
        onClick
          ? "cursor-pointer hover:border-border-medium hover:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
          : ""
      } ${
        selected ? "border-l-2 border-l-accent" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="text-base font-display font-semibold text-text">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-muted mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
