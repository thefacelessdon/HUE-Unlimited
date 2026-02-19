# NARRATIVES_REDESIGN.md — Story vs. Reality

Read this after DESIGN_AMENDMENT.md. This refines the Narratives page — the tool that tracks what's being said about the ecosystem versus what's actually happening.

---

## What This Tool Does

Every institution, funder, and media outlet tells a story about NWA's creative ecosystem. Those stories shape decisions — budget allocations, grant priorities, programming direction. When the story diverges from reality, money flows to the wrong places.

The Narratives tool tracks the gap between story and reality. It's the practice team's fact-checking layer. It doesn't argue with narratives publicly — it equips the team with evidence to bring into conversations where those narratives are shaping decisions.

This is the most politically sensitive tool in the kit. It essentially says: "Here's what Crystal Bridges claims, and here's what's actually happening." The tool should maintain analytical rigor without reading as adversarial. The gap is the finding. The evidence is the support. What you do with it is the practice.

---

## What's Working

- SAYS / REALITY split on cards — correct core structure
- Gap-level color coding (high = red, medium = orange, aligned = green)
- Source type badges (PRACTITIONER, MEDIA COVERAGE, INSTITUTIONAL, etc.)
- Slide-over detail panel on card click
- Date on cards — temporal context matters for narratives

Don't break any of this.

---

## 1. FIX: Stats Bar Should Be Editorial

### Current State
```
8
NARRATIVES TRACKED    ■ 2 high gap  ■ 4 medium  ■ 1 aligned
```

This is a count. It tells you nothing about what the narratives reveal.

### Required State

Editorial sentence format, same pattern as Investments:

```
5 narratives tracked across 4 sources. 2 show high gaps between
story and reality. The widest gap: City of Bentonville's "Creative
Capital" positioning against flat municipal cultural investment.
```

The sentence does three things: total count, gap severity breakdown, and the single most important finding — which narrative has the biggest gap and why it matters.

### How to compute

```typescript
const narratives = await supabase.from('narratives').select('*, source_org:organizations(name)');
const total = narratives.length;
const sources = new Set(narratives.map(n => n.source_org?.name || n.source_name)).size;
const highGap = narratives.filter(n => n.gap === 'high');
const mediumGap = narratives.filter(n => n.gap === 'medium');
const aligned = narratives.filter(n => n.gap === 'aligned');

// The "widest gap" is the first high-gap narrative, or if none, the first medium
const widest = highGap[0] || mediumGap[0];
```

### Styling

Same as Investment stats: `font-family: var(--font-sans); font-size: 15px; color: var(--text-secondary); line-height: 1.6;`

Numbers and org names in `font-weight: 600; color: var(--text-primary);`

Gap counts use colored dots: `■ 2 high gap` with red dot, `■ 3 medium` with orange dot, `■ 1 aligned` with green dot — these can sit below the sentence as a compact legend.

---

## 2. FIX: Cards Should Truncate

### Current State
Cards show the full narrative text and reality text, making each card extremely tall. The list becomes a wall of text.

### Required State

Cards show truncated versions with clear visual hierarchy:

```
┌─────────────────────────────────────────────────────────────────┐
│ HIGH GAP · REGIONAL POSITIONING                     Jan 15, 2026│
│                                                                 │
│ City of Bentonville - Economic Development                      │
│                                                                 │
│ SAYS                                                            │
│ Positions Bentonville as "Creative Capital of the South"        │
│ with emphasis on Crystal Bridges, trails, and tech...           │
│                                                                 │
│ REALITY                                                         │
│ Cultural funding flat YoY at <1% of municipal budget.           │
│ Net outflow of musicians and filmmakers...                      │
│                                                                 │
│ ▸ Connected to: FY2027 Cultural Budget Allocation (locks Nov 1) │
└─────────────────────────────────────────────────────────────────┘
```

Rules:
- SAYS: 2-line clamp (roughly 180 characters)
- REALITY: 2-line clamp
- No evidence on card — that's detail panel content
- Add one connected decision or investment if one exists (see section 5)
- Card border-left color: red for high gap, orange for medium, green for aligned

```css
.narrative-card {
  border-left: 3px solid var(--gap-color);
  padding: 16px 20px;
  background: var(--bg-surface);
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background 0.15s;
}

.narrative-card:hover {
  background: var(--bg-inset);
}

.narrative-text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-style: italic;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.reality-text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}
```

### Card element hierarchy

1. **Top line:** Gap badge (colored) + Source type badge + Date (right-aligned, mono)
2. **Title:** Source name (serif, 16px, primary color)
3. **SAYS:** Italicized, truncated narrative text (secondary color)
4. **REALITY:** Normal weight, truncated reality text (primary color)
5. **Connection:** If a linked decision or investment exists, show one line (gold accent, clickable)

The italics on SAYS versus normal on REALITY creates visual distinction without needing the section headers to do all the work.

---

## 3. FIX: Card Sort Order

### Current State
Unclear sort order — appears to be by date.

### Required State

Default sort: **Gap severity descending, then date descending within each level.**

High-gap narratives at top. Within high-gap, most recent first. This means the most urgent gap with the freshest data is always the first card you see.

Add sort toggle:

```
Sort: [Gap severity ▾]  [Most recent ▾]
```

Also add source type filter:

```
[All sources ▾]  Sort: [Gap severity ▾]
```

Source filter options: All sources, Institutional, Regional Positioning, Media Coverage, Practitioner, Funder Report.

---

## 4. REDESIGN: Detail Panel

The detail panel needs significant restructuring. Current panel shows The Narrative, The Reality, Evidence, and Record. This is missing the most important question: **so what?**

### New Detail Panel Structure

```
← Back to narratives

City of Bentonville - Economic Development
HIGH GAP  ·  REGIONAL POSITIONING  ·  Jan 15, 2026

────────────────────────────────────────

What's Being Said

  "Positions Bentonville as 'Creative Capital of the South'
  with emphasis on Crystal Bridges, trail system, and tech
  startup scene."

What's Actually Happening

  Investment ledger shows cultural funding from the city flat
  year-over-year at <1% of municipal budget. Practitioner layer
  shows net outflow of musicians and filmmakers. "Creative
  Capital" narrative not supported by ecosystem investment
  trends — the capital is institutional (Crystal Bridges
  endowment) not municipal.

Why This Gap Matters

  ┌─ callout ─────────────────────────────────────────────┐
  │ This narrative is shaping public perception and        │
  │ potentially influencing the FY2027 budget              │
  │ deliberation. If decision-makers believe the           │
  │ "Creative Capital" story is already true, there's no   │
  │ pressure to increase cultural investment. The gap      │
  │ between the marketing narrative and the investment     │
  │ reality needs to surface before budget deliberation    │
  │ begins in June.                                        │
  └────────────────────────────────────────────────────────┘

  This is a new field: `significance` on the narratives table.
  Practice team writes 2-4 sentences on why this gap matters
  for upcoming decisions. Only show section if field is populated.

Evidence

  City budget analysis FY2024-2026. Practitioner exit
  interviews (Marcus Webb, Sarah Okafor). Crystal Bridges
  funding is Walton-derived, not municipal.

  Below the text, show linked evidence as inline reference cards:

  ┌─ Investment ──────────────────────────────────────────┐
  │ Public Art Installations - Phase 2                     │
  │ City of Bentonville · $200,000 · Not compounding      │
  └────────────────────────────────────────────────────────┘

  ┌─ Practitioner ────────────────────────────────────────┐
  │ Sarah Okafor · Documentary Film                        │
  │ 2 years in NWA · Risk: considering return to LA       │
  └────────────────────────────────────────────────────────┘

Across the Toolkit

  SOURCE ORGANIZATION
  ┌─ Organization ────────────────────────────────────────┐
  │ City of Bentonville                                    │
  │ Government · Cultural Affairs Liaison: Sarah Collins   │
  └────────────────────────────────────────────────────────┘

  CONNECTED DECISIONS
  ┌─ Decision ────────────────────────────────────────────┐
  │ FY2027 Cultural Budget Allocation                      │
  │ City of Bentonville · Upcoming · Locks Nov 1          │
  └────────────────────────────────────────────────────────┘

  OTHER NARRATIVES FROM THIS SOURCE
  ┌─ Narrative ───────────────────────────────────────────┐
  │ City of Bentonville - Public Art Phase 3 Framing       │
  │ Medium Gap · Jan 28, 2026                             │
  └────────────────────────────────────────────────────────┘

  WHAT THIS SOURCE HAS INVESTED
  ┌─ Investment ──────────────────────────────────────────┐
  │ Public Art Installations - Phase 1 · $180,000          │
  │ Not compounding                                        │
  ├─ Investment ──────────────────────────────────────────┤
  │ Public Art Installations - Phase 2 · $200,000          │
  │ Not compounding                                        │
  └────────────────────────────────────────────────────────┘

Source

  URL: [link if source_url exists]
  Published: Jan 15, 2026

Record

  Created: Feb 19, 2026
  Last reviewed: Feb 19, 2026
  [Mark as reviewed]  [Edit]
```

### Queries for "Across the Toolkit"

```sql
-- Source organization
SELECT * FROM organizations WHERE id = [source_org_id];

-- Connected decisions (decisions involving the same stakeholder org)
SELECT * FROM decisions
  WHERE stakeholder_org_id = [source_org_id]
  AND status IN ('upcoming', 'deliberating')
  ORDER BY locks_date ASC;

-- Other narratives from same source
SELECT * FROM narratives
  WHERE source_org_id = [source_org_id]
  AND id != [this_narrative_id]
  ORDER BY date DESC;

-- What this source has invested
SELECT * FROM investments
  WHERE source_org_id = [source_org_id]
  ORDER BY amount DESC
  LIMIT 5;

-- Practitioners referenced in evidence (future: structured references)
-- For now, this is manual — practice team links via evidence_notes
```

---

## 5. ADD: Schema Enhancement

Add one field to the narratives table:

```sql
ALTER TABLE narratives ADD COLUMN IF NOT EXISTS significance TEXT;
```

This is the "Why This Gap Matters" content. The practice team writes 2-4 sentences connecting the narrative gap to upcoming decisions, investments, or practitioner impact. It answers: if someone reads this narrative entry, what should they do about it?

Only show the "Why This Gap Matters" section in the detail panel if `significance` is not null. Don't force the practice team to write it for every entry — some narratives are worth tracking but don't have immediate implications.

---

## 6. ADD: Connected Decision Line on Cards

The single most valuable addition to narrative cards: show the most relevant upcoming decision connected to this narrative's source organization.

```typescript
// For each narrative, find the nearest upcoming decision from the same org
const connectedDecision = await supabase
  .from('decisions')
  .select('decision_title, locks_date, status')
  .eq('stakeholder_org_id', narrative.source_org_id)
  .in('status', ['upcoming', 'deliberating'])
  .order('locks_date', { ascending: true })
  .limit(1)
  .single();
```

Display on card:
```
▸ Connected to: FY2027 Cultural Budget Allocation (locks Nov 1)
```

Styled:
```css
.card-connection {
  font-size: 12px;
  color: var(--accent-gold);
  margin-top: 8px;
  cursor: pointer;
}
.card-connection:hover {
  text-decoration: underline;
}
```

Clicking navigates to the Decisions page with that decision's detail panel open.

If no connected decision exists, don't show the line. But for most narratives there will be one — because narratives from organizations tend to relate to those organizations' upcoming decisions.

This single line transforms the narrative card from "interesting observation" to "evidence relevant to a specific decision with a deadline."

---

## 7. GOVERNING PRINCIPLES FOR NARRATIVES

### What enters the narrative record

Not every public statement needs tracking. A narrative entry is warranted when:

1. **The statement shapes decisions.** If a funder's annual report claims "record investment" and that claim influences their next grant cycle, track it.
2. **The gap between claim and reality is measurable.** The toolkit has data that either supports or contradicts the narrative. If you can't point to evidence, it's opinion, not analysis.
3. **The source has institutional weight.** A blog post by an unknown commenter doesn't need tracking. A City marketing campaign, a foundation annual report, or a major media feature does.
4. **The narrative is persistent, not momentary.** Track claims that will be referenced repeatedly, not one-off quotes.

### What doesn't need tracking

- Internal meeting notes (unless they reveal a persistent institutional narrative)
- Social media posts (unless they represent an official institutional position)
- Individual opinions that don't shape institutional decisions
- Narratives where the gap is genuinely low and stable — if story matches reality, a brief "aligned" entry is sufficient, no need to over-document

### The "aligned" status matters

"Aligned" doesn't mean unimportant. The Practitioner Interviews entry is "aligned" — what practitioners say matches what the data shows. This is the most reliable kind of entry because it's triangulated from lived experience and system data. When practitioner narratives align with investment data, that's a strong signal. When they diverge from institutional narratives, the institution is the one worth questioning.

### How narratives age

Narratives have a shelf life. A 2024 annual report narrative becomes less relevant as 2025 data emerges. The staleness system should flag narratives older than 6 months for review — not deletion, but reassessment. Has the gap changed? Has the narrative been updated? Is it still being repeated?

### Tone

The narrative record should read as analytical, not accusatory. "City of Bentonville positions NWA as 'Creative Capital of the South'" is a factual observation. "City of Bentonville is lying about cultural investment" is not how this tool works. The gap between narrative and reality is the finding. Let the evidence speak.

---

## 8. LIST VS. LANDSCAPE VIEW (Future)

Like Investments, Narratives could benefit from a landscape view — but the visualization is different. Instead of bar charts, the narrative landscape would show:

**Gap Distribution by Source Type:**
Which source types have the biggest gaps? If institutional narratives consistently show high gaps while practitioner narratives are aligned, that's a structural finding.

**Gap Trend Over Time:**
Are gaps widening or narrowing? If the City of Bentonville narrative showed a high gap in 2024 and still shows a high gap in 2026, the intervention isn't working.

**Source × Gap Matrix:**
```
                    Aligned    Low    Medium    High
Institutional          0        0       1        0
Regional Positioning   0        0       0        2
Media Coverage         0        0       2        0
Practitioner           1        0       0        0
Funder Report          0        0       1        0
```

This matrix immediately shows: regional positioning narratives have the biggest gaps, practitioner narratives are the most reliable. That's a meta-finding about who to trust.

**Don't build this now.** The list view with the improvements above is sufficient for the demo and for the practice. The landscape view is a Phase 2 addition when there are enough narratives (15+) to make patterns visible.

---

## 9. BUILD PRIORITY

1. **Add `significance` column** to narratives table
2. **Rewrite stats bar** as editorial sentence with gap breakdown
3. **Truncate cards** — 2-line clamp on both SAYS and REALITY
4. **Add connected decision line** to cards (most relevant upcoming decision from same source org)
5. **Sort cards by gap severity** descending, then date descending
6. **Add source type filter** dropdown
7. **Restructure detail panel:**
   - What's Being Said
   - What's Actually Happening
   - Why This Gap Matters (only if `significance` exists)
   - Evidence (text + linked reference cards)
   - Across the Toolkit (source org, connected decisions, other narratives, investments)
   - Source (URL if exists)
   - Record
8. **Style SAYS as italic** and REALITY as normal weight on cards for visual distinction
9. **Add left-border color coding** by gap level (red/orange/green)
10. **Make source org clickable** — navigates to Ecosystem Map detail

---

## 10. SEED DATA UPDATE

The current seed narratives are good. Add the `significance` field to the two high-gap entries:

```sql
UPDATE narratives SET significance =
'This narrative is actively shaping public perception and may influence the FY2027 budget deliberation (locks Nov 1). If decision-makers believe the "Creative Capital" story is already true, there is no pressure to increase municipal cultural investment. The gap between marketing narrative and investment reality needs to surface before budget deliberation begins in June. Deliver investment landscape data to Sarah Collins.'
WHERE source_name = 'City of Bentonville - Economic Development';

UPDATE narratives SET significance =
'CACHE''s claim of "record investment" is being referenced in their board materials for the 2026 Grant Cycle deliberation (locks Mar 14). If the board sees total dollars as the success metric, the concentration trend in Cycle 2 — fewer recipients, larger average grants to institutions — will be accepted as normal. The directional brief for the Feb board meeting should present the distribution data alongside the total.'
WHERE source_name = 'CACHE - Annual Report';
```
