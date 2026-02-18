import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/utils/formatting";
import { OPPORTUNITY_STATUS_LABELS } from "@/lib/utils/constants";
import type { Opportunity } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

function statusColor(status: string): "green" | "red" | "blue" | "orange" | "dim" {
  const map: Record<string, "green" | "red" | "blue" | "orange" | "dim"> = {
    open: "green",
    closing_soon: "orange",
    closed: "dim",
    awarded: "blue",
  };
  return map[status] || "dim";
}

export const metadata = {
  title: "Opportunities — Cultural Architecture Toolkit",
};

export default async function OpportunitiesPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("opportunities")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("deadline", { ascending: true });

  const opportunities = (data as Opportunity[]) || [];

  const openOpps = opportunities.filter(
    (o) => o.status === "open" || o.status === "closing_soon"
  );
  const closedOpps = opportunities.filter(
    (o) => o.status === "closed" || o.status === "awarded"
  );

  return (
    <div className="space-y-section">
      <PageHeader
        title="Opportunities"
        subtitle="Every open grant, commission, RFP, and residency flowing through the ecosystem."
      />

      {/* Open Opportunities */}
      <Card>
        <CardHeader
          title="Open Opportunities"
          description={`${openOpps.length} opportunities available`}
        />
        {openOpps.length === 0 ? (
          <EmptyState
            title="No open opportunities"
            description="Open opportunities will appear here"
          />
        ) : (
          <div className="space-y-3">
            {openOpps.map((opp) => (
              <div
                key={opp.id}
                className="border border-border rounded-lg p-4 hover:border-border-medium transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-text">
                        {opp.title}
                      </span>
                      <StatusBadge
                        label={OPPORTUNITY_STATUS_LABELS[opp.status] || opp.status}
                        color={statusColor(opp.status)}
                      />
                      <span className="text-[10px] text-dim uppercase">
                        {opp.opportunity_type}
                      </span>
                    </div>
                    {opp.source_name && (
                      <p className="text-xs text-muted mt-1">
                        Source: {opp.source_name}
                      </p>
                    )}
                    {opp.description && (
                      <p className="text-xs text-dim mt-1 line-clamp-2">
                        {opp.description}
                      </p>
                    )}
                    {opp.eligibility && (
                      <p className="text-xs text-dim mt-1">
                        Eligibility: {opp.eligibility}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {(opp.amount_min !== null || opp.amount_max !== null) && (
                      <p className="text-sm font-medium text-text">
                        {opp.amount_min !== null && opp.amount_max !== null
                          ? `${formatCurrency(opp.amount_min)} – ${formatCurrency(opp.amount_max)}`
                          : formatCurrency(opp.amount_min ?? opp.amount_max)}
                      </p>
                    )}
                    {opp.deadline && (
                      <p className="text-xs text-dim mt-0.5">
                        Due {formatDate(opp.deadline)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Closed / Awarded */}
      {closedOpps.length > 0 && (
        <Card>
          <CardHeader
            title="Closed & Awarded"
            description={`${closedOpps.length} past opportunities`}
          />
          <div className="space-y-2">
            {closedOpps.map((opp) => (
              <div
                key={opp.id}
                className="flex items-center justify-between py-2 px-2 rounded hover:bg-surface-elevated/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-text truncate">
                    {opp.title}
                  </span>
                  <StatusBadge
                    label={OPPORTUNITY_STATUS_LABELS[opp.status] || opp.status}
                    color={statusColor(opp.status)}
                  />
                </div>
                <div className="text-right shrink-0 ml-2">
                  {opp.awarded_to && (
                    <span className="text-xs text-muted">
                      Awarded to: {opp.awarded_to}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
