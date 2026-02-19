# INVESTMENTS_BUGFIX.md — Critical Data Fixes

Read this BEFORE continuing any other investment page work. These are data and logic bugs that must be resolved first or the visualizations will remain broken.

---

## BUG 1: Source Org IDs Not Resolving (CRITICAL)

### Symptom
"Where the Money Comes From" shows only "Unattributed ($4.8M)" and "Private donors (aggregated) ($1.2M)." There should be 7-8 distinct sources: Walton Family Foundation, CACHE, Crystal Bridges, City of Bentonville, Walmart Foundation, Arkansas Arts Council, etc.

"What Compounds and What Doesn't" shows only 2 bars for the same reason.

The stats area shows "Largest source: Unknown ($4,840,000)" for the same reason.

### Root Cause
The `source_org_id` values in the investments table don't match any `id` values in the organizations table. This is a UUID mismatch — the seed data used deterministic UUIDs but the organizations were likely created with different IDs.

### Diagnostic
Run this query first to confirm:

```sql
SELECT 
  i.initiative_name,
  i.amount,
  i.source_org_id,
  i.source_name,
  o.name as resolved_org_name
FROM investments i
LEFT JOIN organizations o ON i.source_org_id = o.id
ORDER BY i.amount DESC;
```

If `resolved_org_name` is NULL for most rows, the UUIDs don't match. That's the bug.

### Fix

**Step 1:** Get the actual org IDs from the database:

```sql
SELECT id, name FROM organizations ORDER BY name;
```

**Step 2:** Update each investment's `source_org_id` to match the real org ID. Match by name:

```sql
-- Update investments to use correct org IDs by matching source_name to org name
UPDATE investments i
SET source_org_id = o.id
FROM organizations o
WHERE (
  -- Match known source_name patterns to org names
  (i.source_name ILIKE '%Walton%' AND o.name ILIKE '%Walton Family Foundation%')
  OR (i.source_name ILIKE '%CACHE%' AND o.name = 'CACHE')
  OR (i.source_name ILIKE '%Crystal Bridges%' AND o.name ILIKE '%Crystal Bridges%')
  OR (i.source_name ILIKE '%City of Bentonville%' AND o.name ILIKE '%City of Bentonville%')
  OR (i.source_name ILIKE '%City of Fayetteville%' AND o.name ILIKE '%City of Fayetteville%')
  OR (i.source_name ILIKE '%Walmart%Foundation%' AND o.name ILIKE '%Walmart%')
  OR (i.source_name ILIKE '%Walmart%Inc%' AND o.name ILIKE '%Walmart%')
  OR (i.source_name ILIKE '%Arkansas Arts%' AND o.name ILIKE '%Arkansas Arts Council%')
  OR (i.source_name ILIKE '%University%Arkansas%' AND o.name ILIKE '%University of Arkansas%')
  OR (i.source_name ILIKE '%NWA Council%' AND o.name ILIKE '%NWA Council%')
  OR (i.source_name ILIKE '%Momentary%' AND o.name ILIKE '%Momentary%')
  OR (i.source_name ILIKE '%TheatreSquared%' AND o.name ILIKE '%TheatreSquared%')
  OR (i.source_name ILIKE '%Bentonville Film%' AND o.name ILIKE '%Bentonville Film%')
  OR (i.source_name ILIKE '%Downtown Bentonville%' AND o.name ILIKE '%Downtown Bentonville%')
);
```

**Step 3:** If the above doesn't work because `source_name` isn't populated on all records, try matching by the initiative description or do it manually. Run this to see what needs mapping:

```sql
SELECT DISTINCT 
  i.source_name,
  i.source_org_id,
  COUNT(*) as investment_count,
  SUM(i.amount) as total_amount
FROM investments i
LEFT JOIN organizations o ON i.source_org_id = o.id
WHERE o.id IS NULL
GROUP BY i.source_name, i.source_org_id
ORDER BY total_amount DESC;
```

This shows every unresolved source. For each one, manually find the matching org:

```sql
-- Example: if you find source_name = 'Walton Family Foundation'
-- and the actual WFF org id is 'abc-123-...'
UPDATE investments 
SET source_org_id = 'abc-123-...'  -- actual WFF id
WHERE source_name ILIKE '%Walton%';
```

**Step 4:** Verify the fix:

```sql
SELECT 
  i.initiative_name,
  i.amount,
  o.name as source_org,
  i.source_name as fallback_name
FROM investments i
LEFT JOIN organizations o ON i.source_org_id = o.id
ORDER BY i.amount DESC;
```

Every row should now have either a `source_org` (from the linked org) or a `fallback_name` (for things like "Private donors (aggregated)" that genuinely don't have an org entry). The only "Unattributed" entries should be investments that truly have no source — which in the seed data should be zero or near-zero.

### Also Fix These Related Foreign Keys

The same UUID mismatch likely affects other foreign keys in the seed data. Run these diagnostics:

```sql
-- Check decisions → stakeholder_org_id
SELECT d.decision_title, d.stakeholder_org_id, o.name
FROM decisions d
LEFT JOIN organizations o ON d.stakeholder_org_id = o.id;

-- Check opportunities → source_org_id
SELECT op.title, op.source_org_id, o.name
FROM opportunities op
LEFT JOIN organizations o ON op.source_org_id = o.id;

-- Check narratives → source_org_id
SELECT n.source_name, n.source_org_id, o.name
FROM narratives n
LEFT JOIN organizations o ON n.source_org_id = o.id;

-- Check outputs → target_stakeholder_id
SELECT out.title, out.target_stakeholder_id, o.name
FROM outputs out
LEFT JOIN organizations o ON out.target_stakeholder_id = o.id;

-- Check investments → builds_on_id (compounding chains)
SELECT 
  i.initiative_name,
  i.builds_on_id,
  parent.initiative_name as builds_on_name
FROM investments i
LEFT JOIN investments parent ON i.builds_on_id = parent.id
WHERE i.builds_on_id IS NOT NULL;

-- Check investments → led_to_id
SELECT 
  i.initiative_name,
  i.led_to_id,
  child.initiative_name as led_to_name
FROM investments i
LEFT JOIN investments child ON i.led_to_id = child.id
WHERE i.led_to_id IS NOT NULL;

-- Check investments → precedent_id
SELECT 
  i.initiative_name,
  i.precedent_id,
  p.name as precedent_name
FROM investments i
LEFT JOIN precedents p ON i.precedent_id = p.id
WHERE i.precedent_id IS NOT NULL;

-- Check decision_dependencies
SELECT 
  d1.decision_title as decision,
  d2.decision_title as depends_on
FROM decision_dependencies dd
JOIN decisions d1 ON dd.decision_id = d1.id
JOIN decisions d2 ON dd.depends_on_id = d2.id;

-- Check output_references
SELECT 
  o.title as output,
  r.reference_type,
  r.reference_id
FROM output_references r
JOIN outputs o ON r.output_id = o.id;
```

For each broken foreign key, apply the same pattern: find the actual ID in the target table and update the reference. Every cross-tool connection in the toolkit depends on these foreign keys being correct. If they're broken, the "Across the Toolkit" sections in detail panels will be empty, the compounding chains won't visualize, and the landscape charts will be wrong.

---

## BUG 2: Funding vs. Practitioner Reality — Misaligned Rows

### Symptom
The chart shows investment categories (Visual Arts, Institutional Capacity, Strategic Planning) and practitioner disciplines (Painting/Installation, Production/Performance, Graphic/Brand Design) on separate rows. Investment rows show 0 practitioners. Practitioner rows show $0. Nothing aligns.

### Root Cause
Investment categories and practitioner disciplines are different taxonomies. The chart needs a mapping layer to align them.

### Fix

**Create a discipline-to-category mapping:**

```typescript
// Map practitioner disciplines to investment categories that serve them
const disciplineMapping: Record<string, string[]> = {
  'Visual Arts': [
    'Painting / Installation',
    'Ceramics / Sculpture',
    'Photography / Media',
    'Murals / Public Art',
  ],
  'Performing Arts': [
    'Music Production / Audio',
    'Acting / Directing',
    'Dance / Movement',
    'Production / Performance',
  ],
  'Design': [
    'Graphic / Brand Design',
    'Architecture / Spatial Design',
  ],
  'Film': [
    'Documentary / Commercial Film',
  ],
  'Literary': [
    'Literary Arts',
  ],
};

// Reverse mapping: discipline → display category
const practitionerToCategory: Record<string, string> = {};
Object.entries(disciplineMapping).forEach(([category, disciplines]) => {
  disciplines.forEach(d => {
    practitionerToCategory[d] = category;
  });
});
```

**Map investments to these broader categories:**

```typescript
// Map investment categories to the display categories
const investmentCategoryMapping: Record<string, string> = {
  'Direct Artist Support': 'Visual Arts',      // Most direct artist support goes to visual arts in NWA
  'Public Art': 'Visual Arts',
  'Programming': 'Performing Arts',            // TheatreSquared, Momentary programming
  'Sector Development': 'Performing Arts',     // Music initiative
  'Artist Development': 'Visual Arts',
  // Categories that don't map to a single discipline:
  // 'Strategic Planning', 'Institutional Capacity', 'Education & Training', 'Infrastructure'
  // These are cross-cutting and should be excluded from the comparison
};
```

**Rebuild the chart with aligned rows:**

Only show categories where a meaningful comparison exists. Cross-cutting investments (Strategic Planning, Institutional Capacity, Education & Training, Infrastructure) should be excluded from this chart — or shown as a separate "Cross-cutting" total below.

```typescript
interface DisciplineComparison {
  name: string;
  investment: number;
  practitioners: number;
  atRisk: number;
}

const comparisonData: DisciplineComparison[] = [
  {
    name: 'Visual Arts',
    investment: sumInvestmentsMatching(['Direct Artist Support', 'Public Art', 'Artist Development']),
    practitioners: countPractitionersMatching(['Painting / Installation', 'Ceramics / Sculpture', 'Photography / Media', 'Murals / Public Art']),
    atRisk: countAtRiskMatching(['Painting / Installation', 'Ceramics / Sculpture', 'Photography / Media', 'Murals / Public Art']),
  },
  {
    name: 'Performing Arts',
    investment: sumInvestmentsMatching(['Programming', 'Sector Development']),
    practitioners: countPractitionersMatching(['Music Production / Audio', 'Acting / Directing', 'Dance / Movement', 'Production / Performance']),
    atRisk: countAtRiskMatching(['Music Production / Audio', 'Acting / Directing', 'Dance / Movement', 'Production / Performance']),
  },
  {
    name: 'Film',
    investment: sumInvestmentsMatching(['Institutional Capacity']), // BFF-related
    practitioners: countPractitionersMatching(['Documentary / Commercial Film']),
    atRisk: countAtRiskMatching(['Documentary / Commercial Film']),
  },
  {
    name: 'Design',
    investment: 0, // No direct design investment in seed data
    practitioners: countPractitionersMatching(['Graphic / Brand Design', 'Architecture / Spatial Design']),
    atRisk: countAtRiskMatching(['Graphic / Brand Design', 'Architecture / Spatial Design']),
  },
  {
    name: 'Literary',
    investment: 0, // No direct literary investment in seed data
    practitioners: countPractitionersMatching(['Literary Arts']),
    atRisk: countAtRiskMatching(['Literary Arts']),
  },
];
```

**Chart layout — each row shows BOTH bars side by side:**

```
                    INVESTMENT              PRACTITIONERS

Visual Arts     ████████████  $2.1M        ████ 4
Performing Arts ███████       $760K        ████ 4  (1 at risk)
Film            ████          $400K        █ 1     (1 at risk)
Design                        $0           ██ 2
Literary                      $0           █ 1
```

The key: each row is one discipline category with BOTH investment and practitioner data on the same line. The misalignment (Design has $0 investment but 2 practitioners) is the finding.

**Below the chart, add:**

```
Cross-cutting investment not shown above:
Strategic Planning ($835K) · Education & Training ($765K) · Infrastructure ($400K)
These investments serve the ecosystem broadly and don't map to a single discipline.
```

This accounts for the dollars that aren't in the comparison chart, so the numbers don't seem to be missing.

---

## BUG 3: Compounding Explainer Card Still Showing

### Symptom
The List view still has the full-width card explaining "What does compounding mean?" between the stats and the investment cards.

### Fix
Remove the card entirely. Replace with a tooltip.

Find the component rendering this explainer card (likely in the Investments page component) and remove it. Then add a `(?)` icon next to the word "compounding" in the stats area:

```tsx
<span className="tooltip-wrapper">
  compounding
  <button className="tooltip-trigger" aria-label="What does compounding mean?">
    ?
  </button>
  <div className="tooltip-content">
    An investment is compounding when it creates conditions that make the next
    investment more effective — building institutional knowledge, strengthening
    networks, or creating infrastructure others can build on. Not compounding
    means the investment is isolated.
  </div>
</span>
```

```css
.tooltip-wrapper {
  position: relative;
  display: inline;
}

.tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--text-tertiary);
  background: transparent;
  font-size: 10px;
  color: var(--text-tertiary);
  cursor: help;
  margin-left: 4px;
  padding: 0;
  vertical-align: middle;
}

.tooltip-content {
  display: none;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-medium);
  border-radius: 6px;
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  z-index: 100;
}

.tooltip-trigger:hover + .tooltip-content,
.tooltip-trigger:focus + .tooltip-content {
  display: block;
}
```

---

## BUG 4: List View Cards Missing Spec Elements

### Missing: Source org name on cards
Each card should show the source org below the title:

```
Downtown Cultural District Planning
Walton Family Foundation · Strategic Planning
```

This requires the source org join to work (Bug 1 must be fixed first). After Bug 1 is resolved, update the card component:

```tsx
<div className="card-source-line">
  {investment.organization?.name || investment.source_name || 'Unattributed'}
  {investment.category && ` · ${investment.category}`}
</div>
```

```css
.card-source-line {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}
```

### Missing: Compounding chain links on cards
If the investment has `builds_on_id` and the parent resolves, show:

```
Builds on → Creative Economy Grants — Cycle 1
```

If another investment's `builds_on_id` points to this one, show:

```
Led to → Creative Economy Grants — Cycle 2
```

```tsx
{parentInvestment && (
  <div className="chain-link">
    Builds on → {parentInvestment.initiative_name}
  </div>
)}
{childInvestments?.length > 0 && childInvestments.map(child => (
  <div className="chain-link" key={child.id}>
    Led to → {child.initiative_name}
  </div>
))}
```

```css
.chain-link {
  font-size: 12px;
  color: var(--accent-gold);
  margin-top: 8px;
  cursor: pointer;
}
.chain-link:hover {
  text-decoration: underline;
}
```

This also depends on Bug 1 being fixed — the `builds_on_id` and `led_to_id` foreign keys may have the same UUID mismatch.

### Missing: Left-border color on cards
```css
.investment-card {
  border-left: 3px solid transparent;
}
.investment-card--compounding {
  border-left-color: var(--status-green);
}
.investment-card--not-compounding {
  border-left-color: var(--status-red);
}
.investment-card--too-early {
  border-left-color: var(--status-blue);
}
```

---

## Fix Priority

1. **Bug 1 — Source org UUID mismatch.** Run the diagnostic query. Fix the foreign keys. This unblocks everything else.
2. **Bug 1 continued — Check ALL foreign keys** across decisions, opportunities, narratives, outputs, and investment chain links (builds_on_id, led_to_id, precedent_id). Fix any mismatches. This is the single most important fix for the entire toolkit — cross-tool connections depend on it.
3. **Bug 2 — Rebuild the funding vs. practitioner chart** with the discipline mapping. Align rows. Add cross-cutting investment note.
4. **Bug 3 — Remove the compounding explainer card.** Add tooltip.
5. **Bug 4 — Add source org, chain links, and left-border color** to List view cards.
