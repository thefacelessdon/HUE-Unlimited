import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { StatusDot } from "@/components/ui/StatusDot";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, daysUntil } from "@/lib/utils/formatting";
import { DECISION_STATUS_LABELS } from "@/lib/utils/constants";
import type { Decision } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

function statusColor(status: string): "green" | "red" | "blue" | "orange" | "dim" {
  const map: Record<string, "green" | "red" | "blue" | "orange" | "dim"> = {
    upcoming: "blue",
    deliberating: "orange",
    locked: "red",
    completed: "green",
  };
  return map[status] || "dim";
}

export const metadata = {
  title: "Decisions — Cultural Architecture Toolkit",
};

export default async function DecisionsPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("decisions")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("locks_date", { ascending: true });

  const decisions = (data as Decision[]) || [];

  const activeDecisions = decisions.filter(
    (d) => d.status === "upcoming" || d.status === "deliberating"
  );
  const completedDecisions = decisions.filter(
    (d) => d.status === "completed" || d.status === "locked"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Decisions</h1>
        <p className="text-sm text-muted mt-1">
          Track decision timelines and intervention windows
        </p>
      </div>

      {/* Active decisions */}
      <Card>
        <CardHeader
          title="Active Decisions"
          description={`${activeDecisions.length} decisions in progress`}
        />
        {activeDecisions.length === 0 ? (
          <EmptyState
            title="No active decisions"
            description="Active decisions will appear here"
          />
        ) : (
          <div className="space-y-3">
            {activeDecisions.map((d) => {
              const days = daysUntil(d.locks_date);
              const urgency =
                days !== null && days <= 14
                  ? "red"
                  : days !== null && days <= 30
                  ? "orange"
                  : "blue";

              return (
                <div
                  key={d.id}
                  className="border border-border rounded-lg p-4 hover:border-dim/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <StatusDot
                          color={statusColor(d.status)}
                          pulse={d.status === "deliberating"}
                        />
                        <span className="text-sm font-medium text-text">
                          {d.decision_title}
                        </span>
                        <StatusBadge
                          label={DECISION_STATUS_LABELS[d.status] || d.status}
                          color={statusColor(d.status)}
                        />
                      </div>
                      {d.stakeholder_name && (
                        <p className="text-xs text-muted mt-1 ml-4">
                          {d.stakeholder_name}
                        </p>
                      )}
                      {d.description && (
                        <p className="text-xs text-dim mt-1 ml-4 line-clamp-2">
                          {d.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {d.locks_date && (
                        <div>
                          <p className="text-xs text-dim">
                            Locks {formatDate(d.locks_date)}
                          </p>
                          {days !== null && (
                            <p
                              className={`text-xs font-medium mt-0.5 ${
                                urgency === "red"
                                  ? "text-status-red"
                                  : urgency === "orange"
                                  ? "text-status-orange"
                                  : "text-status-blue"
                              }`}
                            >
                              {days}d remaining
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {d.intervention_needed && (
                    <p className="text-xs text-muted mt-2 ml-4 border-l-2 border-accent-dim/30 pl-2">
                      {d.intervention_needed}
                    </p>
                  )}
                  {d.dependencies && (
                    <p className="text-xs text-dim mt-1 ml-4">
                      Dependencies: {d.dependencies}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Completed / Locked decisions */}
      {completedDecisions.length > 0 && (
        <Card>
          <CardHeader
            title="Completed & Locked"
            description={`${completedDecisions.length} past decisions`}
          />
          <div className="space-y-2">
            {completedDecisions.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between py-2 px-2 rounded hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <StatusDot color={statusColor(d.status)} />
                  <span className="text-sm text-text truncate">
                    {d.decision_title}
                  </span>
                  <StatusBadge
                    label={DECISION_STATUS_LABELS[d.status] || d.status}
                    color={statusColor(d.status)}
                  />
                </div>
                {d.outcome && (
                  <span className="text-xs text-dim shrink-0 ml-2 max-w-[200px] truncate">
                    {d.outcome}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
