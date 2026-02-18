interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-section">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">
          {title}
        </h1>
        <p className="text-[14px] text-muted mt-1.5 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
