import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils/formatting";
import type { Precedent } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

export const metadata = {
  title: "Precedents — Cultural Architecture Toolkit",
};

export default async function PrecedentsPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("precedents")
    .select("*")
    .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
    .order("created_at", { ascending: false });

  const precedents = (data as Precedent[]) || [];

  return (
    <div className="space-y-section">
      <PageHeader
        title="Precedents"
        subtitle="What's been tried before. The institutional memory that prevents starting from scratch."
      />

      <Card>
        <CardHeader
          title="All Precedents"
          description={`${precedents.length} precedents documented`}
        />
        {precedents.length === 0 ? (
          <EmptyState
            title="No precedents yet"
            description="Precedents will appear here once documented"
          />
        ) : (
          <div className="space-y-4">
            {precedents.map((p) => (
              <div
                key={p.id}
                className="border border-border rounded-lg p-4 hover:border-border-medium transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-text">
                      {p.name}
                    </span>
                    {p.period && (
                      <span className="ml-2 text-xs text-dim">{p.period}</span>
                    )}
                    {p.involved && (
                      <p className="text-xs text-muted mt-1">
                        Involved: {p.involved}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-dim shrink-0">
                    {formatDate(p.created_at)}
                  </span>
                </div>

                {p.description && (
                  <p className="text-xs text-dim mt-2">{p.description}</p>
                )}

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p.what_produced && (
                    <div className="text-xs">
                      <span className="text-muted font-medium">Produced:</span>{" "}
                      <span className="text-dim">{p.what_produced}</span>
                    </div>
                  )}
                  {p.what_worked && (
                    <div className="text-xs">
                      <span className="text-status-green font-medium">
                        Worked:
                      </span>{" "}
                      <span className="text-dim">{p.what_worked}</span>
                    </div>
                  )}
                  {p.what_didnt && (
                    <div className="text-xs">
                      <span className="text-status-red font-medium">
                        Didn&apos;t work:
                      </span>{" "}
                      <span className="text-dim">{p.what_didnt}</span>
                    </div>
                  )}
                  {p.takeaway && (
                    <div className="text-xs">
                      <span className="text-accent font-medium">
                        Takeaway:
                      </span>{" "}
                      <span className="text-dim">{p.takeaway}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
