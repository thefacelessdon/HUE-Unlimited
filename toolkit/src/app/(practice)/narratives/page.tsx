import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils/formatting";
import { GAP_LABELS } from "@/lib/utils/constants";
import type { Narrative } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

function gapColor(gap: string): "green" | "red" | "blue" | "orange" | "dim" {
  const map: Record<string, "green" | "red" | "blue" | "orange" | "dim"> = {
    high: "red",
    medium: "orange",
    low: "blue",
    aligned: "green",
  };
  return map[gap] || "dim";
}

export const metadata = {
  title: "Narratives — Cultural Architecture Toolkit",
};

export default async function NarrativesPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("narratives")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("date", { ascending: false });

  const narratives = (data as Narrative[]) || [];

  const highGap = narratives.filter((n) => n.gap === "high").length;
  const aligned = narratives.filter((n) => n.gap === "aligned").length;

  return (
    <div className="space-y-section">
      <PageHeader
        title="Narratives"
        subtitle="What's being said about this ecosystem versus what's actually happening."
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-muted">Total Narratives</p>
          <p className="text-lg font-semibold text-text mt-1">
            {narratives.length}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-muted">High Gap</p>
          <p className="text-lg font-semibold text-status-red mt-1">
            {highGap}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Aligned</p>
          <p className="text-lg font-semibold text-status-green mt-1">
            {aligned}
          </p>
        </Card>
      </div>

      {/* Narrative list */}
      <Card>
        <CardHeader
          title="All Narratives"
          description={`${narratives.length} narratives tracked`}
        />
        {narratives.length === 0 ? (
          <EmptyState
            title="No narratives yet"
            description="Narratives will appear here once documented"
          />
        ) : (
          <div className="space-y-4">
            {narratives.map((n) => (
              <div
                key={n.id}
                className="border border-border rounded-lg p-4 hover:border-border-medium transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge
                        label={GAP_LABELS[n.gap] || n.gap}
                        color={gapColor(n.gap)}
                      />
                      <span className="text-[10px] text-dim uppercase">
                        {n.source_type}
                      </span>
                      {n.source_name && (
                        <span className="text-xs text-muted">
                          — {n.source_name}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-text">
                        <span className="text-xs text-muted font-medium mr-1">
                          Narrative:
                        </span>
                        {n.narrative_text}
                      </p>
                      {n.reality_text && (
                        <p className="text-sm text-text mt-1">
                          <span className="text-xs text-muted font-medium mr-1">
                            Reality:
                          </span>
                          {n.reality_text}
                        </p>
                      )}
                    </div>
                    {n.evidence_notes && (
                      <p className="text-xs text-dim mt-2 border-l-2 border-accent-warm/30 pl-2">
                        {n.evidence_notes}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {n.date && (
                      <p className="text-xs text-dim">{formatDate(n.date)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
