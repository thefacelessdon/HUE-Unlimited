# DASHBOARD_REDESIGN.md — From SaaS Dashboard to Ecosystem Intelligence View

Read this after DESIGN_AMENDMENT.md. This is specifically about the Dashboard page — the first thing a user sees. The current version reads as a SaaS admin panel. It needs to read as institutional intelligence.

---

## Problem Summary

The dashboard currently says "you have admin tasks." It should say "here's what's happening in the ecosystem and where you need to show up." Three specific issues:

1. Submissions dominate the Needs Attention section — four submission cards push strategic items below the fold. Submissions are operational housekeeping. They don't belong on the dashboard.
2. The stats bar looks like every other SaaS metrics row — KPI boxes in a horizontal line.
3. The Recent Activity log has broken entries ("UPDATED INVESTMENT investment" instead of actual names) and adds length without adding intelligence.

---

## New Dashboard Structure

Reorder the page to lead with intelligence, not admin tasks.

```
┌─────────────────────────────────────────────────────────────┐
│ Dashboard                                                   │
│ The state of the NWA cultural ecosystem at a glance.        │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │ ECOSYSTEM HEADLINE                                      │ │
│ │ (editorial framing of the stats)                        │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                     64px spacing                            │
│                                                             │
│ DECISIONS FORMING                                           │
│ (only decisions approaching lock — no submissions)          │
│                                                             │
│                     64px spacing                            │
│                                                             │
│ NARRATIVE GAPS                                              │
│ (the editorial heart of the dashboard)                      │
│                                                             │
│                     64px spacing                            │
│                                                             │
│ RECENT CHANGES                                              │
│ (5 items max, all with real entity names)                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Submissions are removed from the dashboard entirely. They live in the Submissions page. The sidebar badge count on "Submissions" is sufficient notification.

---

## Section 1: Ecosystem Headline

Replace the current stats bar (horizontal KPI boxes with progress bar) with an editorial statement supported by data.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  $6M invested across 18 initiatives.                        │
│  10 are compounding. 4 are not.                             │
│                                                             │
│  14 organizations · 12 practitioners · 8 active decisions   │
│  2 high-gap narratives                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Implementation:

**Line 1 — The headline finding:**
```css
.headline-primary {
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.35;
  letter-spacing: -0.01em;
}
```

The dollar amount within this sentence should be styled distinctly:
```css
.headline-amount {
  font-family: var(--font-mono);
  font-weight: 700;
}
```

So the render is: "$6M" in mono bold, "invested across 18 initiatives." in serif regular. All one flowing sentence, not a box with a number.

**Line 2 — The compounding verdict:**
```css
.headline-secondary {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.35;
}
```

"10 are compounding" — the number 10 gets `color: var(--status-green)`.
"4 are not" — the number 4 gets `color: var(--status-red)`.

This replaces the progress bar. The sentence IS the visualization. Two colored numbers in a sentence convey the ratio more editorially than a green/red bar.

**Line 3 — Supporting context:**
```css
.headline-context {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 12px;
}
```

Secondary stats separated by middots (·). "2 high-gap narratives" gets `color: var(--status-red)` on the number to flag it.

**Container:**
```css
.ecosystem-headline {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 32px;
}
```

**How to generate the headline dynamically:**

Query the `ecosystem_stats` view for the counts, then construct the sentence:

```typescript
// Pseudo-code for the headline
const total = stats.total_investment; // format as $X.XM or $X,XXX,XXX
const count = stats.investment_count; // "18 initiatives"
const compounding = stats.compounding_count;
const notCompounding = stats.not_compounding_count;

// Line 1
`${formatCurrency(total)} invested across ${count} initiatives.`

// Line 2
`${compounding} are compounding. ${notCompounding} are not.`

// Line 3
`${stats.org_count} organizations · ${stats.practitioner_count} practitioners · ${stats.active_decisions} active decisions · ${stats.high_gap_narratives} high-gap narratives`
```

---

## Section 2: Decisions Forming

Replace "Needs Attention" with a decisions-only section. This is where strategic urgency lives.

**Section header:**
```
Decisions Forming
What's being decided now and when it locks
```

**Show only decisions with status 'deliberating' or 'upcoming' that lock within the next 120 days.** Order by lock date ascending (most urgent first). Max 4 items.

**Each decision card in this section uses a compact format:**

```
┌─────────────────────────────────────────────────────────────┐
│ ● Deliberating    CACHE                    Locks in 25d    │
│                                             Mar 15, 2026    │
│ 2026 Grant Cycle Priorities                                 │
│                                                             │
│ Directional brief needed before Feb board meeting. Brief    │
│ should surface: concentration trend, census data, AAC       │
│ overlap.                                                    │
│                                                             │
│ ▸ Output ready: CACHE 2026 Grant Cycle Brief                │
└─────────────────────────────────────────────────────────────┘
```

Implementation details:
- First line is a flex row: status dot + label (left), org name (center-left), countdown (right)
- Countdown: `font-family: var(--font-mono); font-weight: 600;`
  - ≤30 days: `color: var(--status-red)`
  - 31-90 days: `color: var(--status-orange)`
  - >90 days: `color: var(--text-secondary)`
- Lock date: `font-size: 12px; color: var(--text-tertiary);` below countdown
- Title: `font-family: var(--font-serif); font-size: 16px; font-weight: 600;`
- Intervention note: `font-size: 13px; color: var(--text-secondary);` 2-line max
- Output link (if an output exists for this decision): `font-size: 12px; color: var(--accent-gold);`
  - Query: `SELECT title FROM outputs WHERE triggered_by_decision_id = [decision_id] AND is_published = true`
  - If no output exists, don't show this line
  - If output exists, show "▸ Output ready: [title]" as a clickable link

**If no decisions lock within 120 days:**
```
No decisions forming in the near term.
Next decision window opens [date].
```

---

## Section 3: Narrative Gaps

This section is already the strongest part of the dashboard. Keep the structure but refine the presentation.

**Section header:**
```
Narrative Gaps
Where the story doesn't match the data
```

**Show only narratives with gap level 'high' or 'medium'.** Order: high gaps first, then medium. If there are more than 5, show the first 5 and add a "View all in Narratives →" link.

**Don't show 'aligned' or 'low' gap narratives on the dashboard.** Those are good news — they belong on the Narratives page, not the dashboard. The dashboard surfaces problems.

**Each narrative gap card:**

```
┌──┬──────────────────────────────────────────────────────────┐
│  │ HIGH GAP                                                 │
│  │ City of Bentonville — Economic Development Office        │
│  │                                                          │
│  │ Investment ledger shows total cultural funding flat YoY   │
│  │ when adjusted for inflation. Practitioner layer shows    │
│  │ net outflow of musicians and filmmakers over 18 months.  │
└──┴──────────────────────────────────────────────────────────┘
```

Implementation:
- Left border: `border-left: 3px solid;` — high = `var(--status-red)`, medium = `var(--status-orange)`
- Gap level: `font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;` color matches the border
- Source name: `font-family: var(--font-serif); font-size: 15px; font-weight: 600; color: var(--text-primary);`
- Reality text (not narrative text): `font-size: 13px; color: var(--text-secondary);` — show the reality, not the claim. On the dashboard, we surface what's actually happening, not what's being said. The full narrative vs. reality comparison is in the Narratives page.
- Single line truncation: max 2 lines of reality text, truncate with ellipsis
- Each card is clickable → navigates to Narratives page and opens that item's detail panel

**Important:** Show the `reality_text` on the dashboard, not the `narrative_text`. The dashboard user (the partner) needs to see the truth, not the claim. The full comparison is one click away.

---

## Section 4: Recent Changes

Replace "Recent Activity" with a cleaner, shorter section.

**Section header:**
```
Recent Changes
```

No subtitle needed. This is a utility section, not an editorial one.

**Max 5 items.** No scrolling, no "view more." If the team wants full activity history, that's a future feature.

**Fix the entity name problem.** The current implementation sometimes shows the entity type instead of the entity name (e.g., "UPDATED INVESTMENT investment"). This happens when the `changes` JSONB doesn't include a title field and the code falls back to the entity_type.

Fix:
```typescript
// When rendering an activity log entry:
async function getEntityName(entityType: string, entityId: string) {
  const tableMap: Record<string, { table: string; nameField: string }> = {
    organization: { table: 'organizations', nameField: 'name' },
    investment: { table: 'investments', nameField: 'initiative_name' },
    decision: { table: 'decisions', nameField: 'decision_title' },
    precedent: { table: 'precedents', nameField: 'name' },
    opportunity: { table: 'opportunities', nameField: 'title' },
    narrative: { table: 'narratives', nameField: 'source_name' },
    output: { table: 'outputs', nameField: 'title' },
  };

  const config = tableMap[entityType];
  if (!config) return entityType; // fallback

  // First check if changes JSONB has a title
  if (entry.changes?.title) return entry.changes.title;

  // Otherwise query the actual entity
  const { data } = await supabase
    .from(config.table)
    .select(config.nameField)
    .eq('id', entityId)
    .single();

  return data?.[config.nameField] || entityType;
}
```

**Each activity entry format:**
```
PUBLISHED  OUTPUT    NWA Cultural Ecosystem — State of the System    3d ago
CREATED    DECISION  2026 Grant Cycle Priorities                     1mo ago
```

Implementation:
- Action badge: `font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 6px; border-radius: 3px;`
  - PUBLISHED: gold background tint
  - CREATED: green background tint
  - UPDATED: blue background tint
  - REVIEWED: neutral background tint
- Entity type: `font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-tertiary);`
- Entity name: `font-size: 13px; color: var(--text-primary);` — this MUST be the real name
- Time ago: `font-size: 12px; color: var(--text-tertiary); text-align: right;`
- Each entry is a single row — flex layout with action, type, name, and time
- No card styling — just rows with a subtle bottom border `1px solid var(--border-subtle)` between them
- Each row is clickable → navigates to the relevant tool and opens the entity's detail panel

---

## Section Spacing

```css
.dashboard-section {
  margin-bottom: 64px;
}

.dashboard-section:last-child {
  margin-bottom: 32px;
}
```

64px between sections is generous but intentional. It creates breathing room between conceptually different blocks. An editorial layout uses whitespace as punctuation.

---

## What the Dashboard Does NOT Show

- **Submissions.** Remove them entirely from the dashboard. The sidebar badge on "Submissions" (showing pending count) is sufficient notification. Submissions are operational, not strategic.
- **Stale entries / Needs Review.** These are maintenance tasks for the project lead. They can live on a future "Maintenance" view or within each tool page. The dashboard is the partner's view — it shows ecosystem intelligence, not data hygiene tasks.
- **Full activity history.** 5 items max. This is a heartbeat check, not an audit log.
- **Aligned narratives.** Only high and medium gaps surface here. The dashboard shows where attention is needed.
- **Opportunities.** Open opportunities are visible on the Opportunities page. The dashboard doesn't need to duplicate them unless one is closing within 7 days — and even then, it's a lower priority than decisions and narrative gaps for the partner persona.

---

## Build Steps

1. Remove all submission cards from the dashboard
2. Replace the stats bar with the Ecosystem Headline (editorial sentence format)
3. Replace "Needs Attention" with "Decisions Forming" — decisions only, max 4, ordered by lock date
4. Move Narrative Gaps section up to position 2 (right after headline) — wait, actually keep it as position 3 after Decisions. Decisions are more time-sensitive.
5. Fix the activity log entity name resolution — implement the `getEntityName` function
6. Cap Recent Changes at 5 items
7. Add 64px spacing between all sections
8. Verify every clickable element navigates to the right place
