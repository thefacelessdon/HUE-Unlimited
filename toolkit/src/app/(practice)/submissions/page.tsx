import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils/formatting";
import type { Submission } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

function statusColor(status: string): "green" | "red" | "blue" | "orange" | "dim" {
  const map: Record<string, "green" | "red" | "blue" | "orange" | "dim"> = {
    pending: "orange",
    approved: "green",
    rejected: "red",
  };
  return map[status] || "dim";
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export const metadata = {
  title: "Submissions — Cultural Architecture Toolkit",
};

export default async function SubmissionsPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("submissions")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("created_at", { ascending: false });

  const submissions = (data as Submission[]) || [];

  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status !== "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Submissions</h1>
        <p className="text-sm text-muted mt-1">
          Community submissions and intake queue
        </p>
      </div>

      {/* Pending */}
      <Card>
        <CardHeader
          title="Pending Review"
          description={`${pending.length} submissions awaiting review`}
        />
        {pending.length === 0 ? (
          <EmptyState
            title="No pending submissions"
            description="New submissions will appear here for review"
          />
        ) : (
          <div className="space-y-3">
            {pending.map((s) => {
              const submissionData = s.data as Record<string, unknown>;
              const title =
                (submissionData?.title as string) ||
                (submissionData?.name as string) ||
                s.submission_type;

              return (
                <div
                  key={s.id}
                  className="border border-border rounded-lg p-4 hover:border-dim/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-text">
                          {title}
                        </span>
                        <StatusBadge label="Pending" color="orange" />
                        <span className="text-[10px] text-dim uppercase">
                          {s.submission_type}
                        </span>
                      </div>
                      {s.submitter_name && (
                        <p className="text-xs text-muted mt-1">
                          From: {s.submitter_name}
                          {s.submitter_org && ` (${s.submitter_org})`}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-dim shrink-0">
                      {formatDate(s.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Reviewed */}
      {reviewed.length > 0 && (
        <Card>
          <CardHeader
            title="Reviewed"
            description={`${reviewed.length} reviewed submissions`}
          />
          <div className="space-y-2">
            {reviewed.map((s) => {
              const submissionData = s.data as Record<string, unknown>;
              const title =
                (submissionData?.title as string) ||
                (submissionData?.name as string) ||
                s.submission_type;

              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-2 px-2 rounded hover:bg-surface/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm text-text truncate">{title}</span>
                    <StatusBadge
                      label={STATUS_LABELS[s.status] || s.status}
                      color={statusColor(s.status)}
                    />
                    <span className="text-[10px] text-dim uppercase">
                      {s.submission_type}
                    </span>
                  </div>
                  <span className="text-xs text-dim shrink-0 ml-2">
                    {formatDate(s.reviewed_at || s.created_at)}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
