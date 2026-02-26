import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import type { Ecosystem } from "@/lib/supabase/types";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

export const metadata = {
  title: "Settings — Cultural Architecture Toolkit",
};

export default async function SettingsPage() {
  const supabase = createClient();

  const [{ data: ecosystem }, { data: { user } }] = await Promise.all([
    supabase
      .from("ecosystems")
      .select("*")
      .eq("id", NWA_ECOSYSTEM_ID)
      .single(),
    supabase.auth.getUser(),
  ]);

  const eco = ecosystem as Ecosystem | null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Settings</h1>
        <p className="text-sm text-muted mt-1">
          Account and ecosystem configuration
        </p>
      </div>

      {/* Account */}
      <Card>
        <CardHeader title="Account" description="Your account details" />
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted">Email</p>
            <p className="text-sm text-text mt-0.5">{user?.email || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted">User ID</p>
            <p className="text-sm text-dim mt-0.5 font-mono text-xs">
              {user?.id || "—"}
            </p>
          </div>
        </div>
      </Card>

      {/* Ecosystem */}
      <Card>
        <CardHeader
          title="Ecosystem"
          description="Current ecosystem configuration"
        />
        {eco ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted">Name</p>
              <p className="text-sm text-text mt-0.5">{eco.name}</p>
            </div>
            {eco.region && (
              <div>
                <p className="text-xs text-muted">Region</p>
                <p className="text-sm text-text mt-0.5">{eco.region}</p>
              </div>
            )}
            {eco.description && (
              <div>
                <p className="text-xs text-muted">Description</p>
                <p className="text-sm text-text mt-0.5">{eco.description}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted">Ecosystem ID</p>
              <p className="text-sm text-dim mt-0.5 font-mono text-xs">
                {eco.id}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-dim">No ecosystem configured</p>
        )}
      </Card>
    </div>
  );
}
