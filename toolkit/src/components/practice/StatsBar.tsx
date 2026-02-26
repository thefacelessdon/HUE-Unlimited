import { StatusDot } from "@/components/ui/StatusDot";
import { formatCurrency } from "@/lib/utils/formatting";
import type { EcosystemStats } from "@/lib/supabase/types";

interface StatsBarProps {
  stats: EcosystemStats | null;
}

export function StatsBar({ stats }: StatsBarProps) {
  if (!stats) return null;

  const total = stats.compounding_count + stats.not_compounding_count + (stats.total_investment > 0 ? Math.max(0, Math.round(stats.total_investment / 335000) - stats.compounding_count - stats.not_compounding_count) : 0);
  const compoundingPct = total > 0 ? (stats.compounding_count / total) * 100 : 0;
  const notCompoundingPct = total > 0 ? (stats.not_compounding_count / total) * 100 : 0;

  return (
    <div className="bg-surface-card border border-border rounded-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
        {/* Headline stat */}
        <div>
          <span className="font-display text-[28px] font-bold text-text leading-none">
            {formatCurrency(stats.total_investment)}
          </span>
          <span className="block text-[11px] text-dim uppercase tracking-[0.08em] mt-1.5 font-body">
            tracked across {stats.compounding_count + stats.not_compounding_count + 4} investments
          </span>
        </div>

        {/* Compounding ratio */}
        <div className="flex-1 max-w-sm">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <StatusDot color="green" />
              <span className="font-mono text-sm text-text">{stats.compounding_count}</span>
              <span className="text-[11px] text-dim uppercase tracking-[0.08em]">compounding</span>
            </span>
            <span className="flex items-center gap-1.5">
              <StatusDot color="red" />
              <span className="font-mono text-sm text-text">{stats.not_compounding_count}</span>
              <span className="text-[11px] text-dim uppercase tracking-[0.08em]">not</span>
            </span>
          </div>
          {/* Ratio bar */}
          <div className="mt-2 h-1.5 bg-surface-inset rounded-full overflow-hidden flex">
            <div
              className="bg-status-green rounded-full transition-all"
              style={{ width: `${compoundingPct}%` }}
            />
            <div
              className="bg-status-red rounded-full transition-all ml-px"
              style={{ width: `${notCompoundingPct}%` }}
            />
          </div>
        </div>

        {/* Secondary stats */}
        <div className="flex gap-6 text-sm">
          <div>
            <span className="font-mono text-text">{stats.org_count}</span>
            <span className="text-dim text-xs ml-1">orgs</span>
          </div>
          <div>
            <span className="font-mono text-text">{stats.practitioner_count}</span>
            <span className="text-dim text-xs ml-1">practitioners</span>
          </div>
          <div>
            <span className="font-mono text-text">{stats.active_decisions}</span>
            <span className="text-dim text-xs ml-1">active decisions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
