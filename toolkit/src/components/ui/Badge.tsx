interface StatusBadgeProps {
  label: string;
  color: "green" | "red" | "blue" | "orange" | "purple" | "dim";
}

const colorStyles = {
  green: {
    text: "text-status-green",
    border: "border-status-green/40",
    bg: "bg-status-green/[0.08]",
    glow: "badge-glow-green",
  },
  red: {
    text: "text-status-red",
    border: "border-status-red/40",
    bg: "bg-status-red/[0.08]",
    glow: "badge-glow-red",
  },
  blue: {
    text: "text-status-blue",
    border: "border-status-blue/40",
    bg: "bg-status-blue/[0.08]",
    glow: "badge-glow-blue",
  },
  orange: {
    text: "text-status-orange",
    border: "border-status-orange/40",
    bg: "bg-status-orange/[0.08]",
    glow: "badge-glow-orange",
  },
  purple: {
    text: "text-status-purple",
    border: "border-status-purple/40",
    bg: "bg-status-purple/[0.08]",
    glow: "badge-glow-purple",
  },
  dim: {
    text: "text-dim",
    border: "border-dim/40",
    bg: "bg-dim/[0.08]",
    glow: "",
  },
};

export function StatusBadge({ label, color }: StatusBadgeProps) {
  const styles = colorStyles[color];

  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold tracking-[0.03em] px-2.5 py-0.5 rounded-xl border ${styles.text} ${styles.border} ${styles.bg} ${styles.glow}`}
    >
      {label}
    </span>
  );
}

// Re-export StatusBadge as Badge for backward compatibility
export const Badge = StatusBadge;
