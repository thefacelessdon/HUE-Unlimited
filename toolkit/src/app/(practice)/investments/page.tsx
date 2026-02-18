import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatCurrency } from "@/lib/utils/formatting";
import {
  INVESTMENT_STATUS_LABELS,
  COMPOUNDING_LABELS,
} from "@/lib/utils/constants";
import type { Investment } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

function statusColor(status: string): "green" | "red" | "blue" | "orange" | "dim" {
  const map: Record<string, "green" | "red" | "blue" | "orange" | "dim"> = {
    active: "green",
    planned: "blue",
    completed: "dim",
    cancelled: "red",
  };
  return map[status] || "dim";
}

function compoundingColor(status: string): "green" | "red" | "blue" | "orange" | "dim" {
  const map: Record<string, "green" | "red" | "blue" | "orange" | "dim"> = {
    compounding: "green",
    not_compounding: "red",
    too_early: "blue",
    unknown: "dim",
  };
  return map[status] || "dim";
}

export const metadata = {
  title: "Investments — Cultural Architecture Toolkit",
};

export default async function InvestmentsPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("investments")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("created_at", { ascending: false });

  const investments = (data as Investment[]) || [];

  const totalAmount = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const activeCount = investments.filter((i) => i.status === "active").length;
  const compoundingCount = investments.filter(
    (i) => i.compounding === "compounding"
  ).length;

  return (
    <div className="space-y-section">
      <PageHeader title="Investments" subtitle="Where money is going, what it's producing, and whether it's compounding." />

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-muted">Total Investments</p>
          <p className="text-lg font-semibold text-text mt-1">
            {investments.length}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Total Amount</p>
          <p className="text-lg font-semibold text-text mt-1">
            {formatCurrency(totalAmount)}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Active</p>
          <p className="text-lg font-semibold text-status-green mt-1">
            {activeCount}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Compounding</p>
          <p className="text-lg font-semibold text-status-green mt-1">
            {compoundingCount}
          </p>
        </Card>
      </div>

      {/* Investment list */}
      <Card>
        <CardHeader
          title="All Investments"
          description={`${investments.length} investments tracked`}
        />
        {investments.length === 0 ? (
          <EmptyState
            title="No investments yet"
            description="Investments will appear here once added to the ecosystem"
          />
        ) : (
          <div className="space-y-3">
            {investments.map((inv) => (
              <div
                key={inv.id}
                className="border border-border rounded-lg p-4 hover:border-border-medium transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-text">
                        {inv.initiative_name}
                      </span>
                      <StatusBadge
                        label={INVESTMENT_STATUS_LABELS[inv.status] || inv.status}
                        color={statusColor(inv.status)}
                      />
                      <StatusBadge
                        label={COMPOUNDING_LABELS[inv.compounding] || inv.compounding}
                        color={compoundingColor(inv.compounding)}
                      />
                    </div>
                    {inv.source_name && (
                      <p className="text-xs text-muted mt-1">
                        Source: {inv.source_name}
                      </p>
                    )}
                    {inv.description && (
                      <p className="text-xs text-dim mt-1 line-clamp-2">
                        {inv.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {inv.amount !== null && (
                      <p className="text-sm font-medium text-text">
                        {formatCurrency(inv.amount)}
                      </p>
                    )}
                    {inv.period && (
                      <p className="text-xs text-dim mt-0.5">{inv.period}</p>
                    )}
                  </div>
                </div>
                {inv.outcome && (
                  <p className="text-xs text-muted mt-2 border-l-2 border-accent-warm/30 pl-2">
                    {inv.outcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
