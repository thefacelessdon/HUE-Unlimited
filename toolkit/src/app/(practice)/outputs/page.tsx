import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { OutputsView } from "@/components/practice/views/OutputsView";
import type { Output, Decision, Organization, Investment, Precedent, Narrative, OutputReference } from "@/lib/supabase/types";

import { formatDate, daysUntil } from "@/lib/utils/formatting";

const NWA_ECOSYSTEM_ID = "a0000000-0000-0000-0000-000000000001";

export const metadata = {
  title: "Outputs — Cultural Architecture Toolkit",
};

export default async function OutputsPage() {
  const supabase = createClient();

  const [
    { data: outputData },
    { data: decisionData },
    { data: orgData },
    { data: refData },
    { data: investmentData },
    { data: precedentData },
    { data: narrativeData },
  ] = await Promise.all([
    supabase
      .from("outputs")
      .select("*")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID)
      .order("created_at", { ascending: false }),
    supabase
      .from("decisions")
      .select("id, decision_title, locks_date, status, stakeholder_name, stakeholder_org_id")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID),
    supabase
      .from("organizations")
      .select("id, name")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID),
    supabase
      .from("output_references")
      .select("*"),
    supabase
      .from("investments")
      .select("id, initiative_name, amount, source_name, status, compounding")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID),
    supabase
      .from("precedents")
      .select("id, name, period, takeaway")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID),
    supabase
      .from("narratives")
      .select("id, source_name, narrative_text, reality_text, gap")
      .eq("ecosystem_id", NWA_ECOSYSTEM_ID),
  ]);

  const outputs = (outputData as Output[]) || [];
  const decisions = (decisionData as Pick<Decision, "id" | "decision_title" | "locks_date" | "status" | "stakeholder_name" | "stakeholder_org_id">[]) || [];
  const orgs = (orgData as Pick<Organization, "id" | "name">[]) || [];
  const refs = (refData as OutputReference[]) || [];
  const investments = (investmentData as Pick<Investment, "id" | "initiative_name" | "amount" | "source_name" | "status" | "compounding">[]) || [];
  const precedents = (precedentData as Pick<Precedent, "id" | "name" | "period" | "takeaway">[]) || [];
  const narratives = (narrativeData as Pick<Narrative, "id" | "source_name" | "narrative_text" | "reality_text" | "gap">[]) || [];

  // Build maps
  const decisionMap: Record<string, { id: string; decision_title: string; locks_date: string | null; status: string; stakeholder_name: string | null; stakeholder_org_id: string | null }> = {};
  decisions.forEach((d) => { decisionMap[d.id] = d; });

  const orgMap: Record<string, { id: string; name: string }> = {};
  orgs.forEach((o) => { orgMap[o.id] = o; });

  const investmentMap: Record<string, typeof investments[0]> = {};
  investments.forEach((i) => { investmentMap[i.id] = i; });

  const precedentMap: Record<string, typeof precedents[0]> = {};
  precedents.forEach((p) => { precedentMap[p.id] = p; });

  const narrativeMap: Record<string, typeof narratives[0]> = {};
  narratives.forEach((n) => { narrativeMap[n.id] = n; });

  // Group references by output
  const refsByOutput: Record<string, OutputReference[]> = {};
  refs.forEach((r) => {
    if (!refsByOutput[r.output_id]) refsByOutput[r.output_id] = [];
    refsByOutput[r.output_id].push(r);
  });

  // Build editorial stats sentence
  const published = outputs.filter((o) => o.is_published);
  const drafts = outputs.filter((o) => !o.is_published);
  const decisionTriggered = published.filter((o) => o.triggered_by_decision_id && decisionMap[o.triggered_by_decision_id]);

  let statsSentence = "";
  if (outputs.length > 0) {
    const parts: string[] = [];
    parts.push(`${published.length} output${published.length !== 1 ? "s" : ""} published, ${drafts.length} in draft.`);

    if (decisionTriggered.length > 0) {
      const triggerDescriptions = decisionTriggered.map((o) => {
        const d = decisionMap[o.triggered_by_decision_id!];
        const days = daysUntil(d.locks_date);
        const lockStr = d.locks_date ? ` (delivers before ${formatDate(d.locks_date)} lock${days !== null && days > 0 ? `, ${days}d` : ""})` : "";
        return `the ${o.title.split("—")[0].trim()}${lockStr}`;
      });

      parts.push(
        `${decisionTriggered.length} ${decisionTriggered.length === 1 ? "is" : "are"} decision-triggered — ${triggerDescriptions.join(" and ")}.`
      );

      const standing = published.filter((o) => !o.triggered_by_decision_id);
      if (standing.length > 0) {
        parts.push(`${standing.length} ${standing.length === 1 ? "is" : "are"} a standing ecosystem analysis.`);
      }
    }

    statsSentence = parts.join(" ");
  }

  return (
    <div className="space-y-section">
      <PageHeader
        title="Outputs"
        subtitle="Briefs, analyses, and frameworks we've produced from the intelligence."
      />

      {outputs.length === 0 ? (
        <EmptyState
          title="No outputs yet"
          description="Published intelligence will appear here."
        />
      ) : (
        <>
          {/* Editorial stats bar */}
          {statsSentence && (
            <p className="text-[14px] text-text leading-relaxed border-y border-border py-4 -mt-2">
              {statsSentence}
            </p>
          )}

          <OutputsView
            outputs={outputs}
            decisionMap={decisionMap}
            orgMap={orgMap}
            refsByOutput={refsByOutput}
            investmentMap={investmentMap}
            precedentMap={precedentMap}
            narrativeMap={narrativeMap}
            allDecisions={decisions}
            allOrgs={orgs}
            allInvestments={investments}
            allPrecedents={precedents}
            allNarratives={narratives}
          />
        </>
      )}
    </div>
  );
}
