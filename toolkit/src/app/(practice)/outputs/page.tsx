import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils/formatting";
import type { Output } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

const OUTPUT_TYPE_LABELS: Record<string, string> = {
  directional_brief: "Directional Brief",
  orientation_framework: "Orientation Framework",
  state_of_ecosystem: "State of Ecosystem",
  memory_transfer: "Memory Transfer",
  field_note: "Field Note",
  foundational_text: "Foundational Text",
};

export const metadata = {
  title: "Outputs — Cultural Architecture Toolkit",
};

export default async function OutputsPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("outputs")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("created_at", { ascending: false });

  const outputs = (data as Output[]) || [];

  const published = outputs.filter((o) => o.is_published);
  const drafts = outputs.filter((o) => !o.is_published);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Outputs</h1>
        <p className="text-sm text-muted mt-1">
          Briefs, frameworks, and deliverables
        </p>
      </div>

      {/* Published outputs */}
      <Card>
        <CardHeader
          title="Published"
          description={`${published.length} published outputs`}
        />
        {published.length === 0 ? (
          <EmptyState
            title="No published outputs"
            description="Published outputs will appear here"
          />
        ) : (
          <div className="space-y-3">
            {published.map((o) => (
              <div
                key={o.id}
                className="border border-border rounded-lg p-4 hover:border-dim/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-text">
                        {o.title}
                      </span>
                      <StatusBadge
                        label={OUTPUT_TYPE_LABELS[o.output_type] || o.output_type}
                        color="blue"
                      />
                      <StatusBadge label="Published" color="green" />
                    </div>
                    {o.summary && (
                      <p className="text-xs text-dim mt-1 line-clamp-2">
                        {o.summary}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-dim shrink-0">
                    {formatDate(o.published_at || o.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Drafts */}
      <Card>
        <CardHeader
          title="Drafts"
          description={`${drafts.length} drafts in progress`}
        />
        {drafts.length === 0 ? (
          <EmptyState
            title="No drafts"
            description="Draft outputs will appear here"
          />
        ) : (
          <div className="space-y-3">
            {drafts.map((o) => (
              <div
                key={o.id}
                className="border border-border rounded-lg p-4 hover:border-dim/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-text">
                        {o.title}
                      </span>
                      <StatusBadge
                        label={OUTPUT_TYPE_LABELS[o.output_type] || o.output_type}
                        color="blue"
                      />
                      <StatusBadge label="Draft" color="dim" />
                    </div>
                    {o.summary && (
                      <p className="text-xs text-dim mt-1 line-clamp-2">
                        {o.summary}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-dim shrink-0">
                    {formatDate(o.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
