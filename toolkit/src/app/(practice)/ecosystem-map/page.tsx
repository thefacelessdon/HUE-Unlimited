import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { ORG_TYPE_LABELS } from "@/lib/utils/constants";
import type { Organization, Practitioner } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

export const metadata = {
  title: "Ecosystem Map — Cultural Architecture Toolkit",
};

export default async function EcosystemMapPage() {
  const supabase = createClient();

  const [{ data: orgs }, { data: practitioners }] = await Promise.all([
    supabase
      .from("organizations")
      .select("*")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
      .order("name"),
    supabase
      .from("practitioners")
      .select("*")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
      .order("name"),
  ]);

  const organizations = (orgs as Organization[]) || [];
  const practitionerList = (practitioners as Practitioner[]) || [];

  return (
    <div className="space-y-section">
      <PageHeader title="Ecosystem Map" subtitle="Every institution, funder, and practitioner in the system — and how they connect." />

      {/* Organizations */}
      <Card>
        <CardHeader
          title="Organizations"
          description={`${organizations.length} organizations tracked`}
        />
        {organizations.length === 0 ? (
          <EmptyState
            title="No organizations yet"
            description="Organizations will appear here once added to the ecosystem"
          />
        ) : (
          <div className="space-y-2">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="border border-border rounded-lg p-4 hover:border-border-medium transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text">
                        {org.name}
                      </span>
                      <StatusBadge
                        label={ORG_TYPE_LABELS[org.org_type] || org.org_type}
                        color="blue"
                      />
                    </div>
                    {org.mandate && (
                      <p className="text-xs text-muted mt-1 line-clamp-2">
                        {org.mandate}
                      </p>
                    )}
                  </div>
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent-warm shrink-0"
                    >
                      Website
                    </a>
                  )}
                </div>
                {(org.controls || org.constraints) && (
                  <div className="mt-2 flex gap-4 text-xs text-dim">
                    {org.controls && <span>Controls: {org.controls}</span>}
                    {org.constraints && (
                      <span>Constraints: {org.constraints}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Practitioners */}
      <Card>
        <CardHeader
          title="Practitioners"
          description={`${practitionerList.length} practitioners tracked`}
        />
        {practitionerList.length === 0 ? (
          <EmptyState
            title="No practitioners yet"
            description="Practitioners will appear here once added to the ecosystem"
          />
        ) : (
          <div className="space-y-2">
            {practitionerList.map((p) => (
              <div
                key={p.id}
                className="border border-border rounded-lg p-4 hover:border-border-medium transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-text">
                      {p.name}
                    </span>
                    {p.discipline && (
                      <span className="ml-2 text-xs text-dim">
                        {p.discipline}
                      </span>
                    )}
                    {p.tenure && (
                      <p className="text-xs text-muted mt-1">
                        Tenure: {p.tenure}
                      </p>
                    )}
                  </div>
                </div>
                {p.retention_factors && (
                  <p className="text-xs text-dim mt-2">
                    Retention: {p.retention_factors}
                  </p>
                )}
                {p.risk_factors && (
                  <p className="text-xs text-status-orange mt-1">
                    Risk: {p.risk_factors}
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
