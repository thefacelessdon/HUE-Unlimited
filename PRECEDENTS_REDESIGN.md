# PRECEDENTS_REDESIGN.md — Institutional Memory

Read this after DESIGN_AMENDMENT.md. This refines the Precedents page — the tool that captures what's been tried before so the ecosystem doesn't start from scratch.

---

## What's Working

This is the strongest page in the toolkit:
- Card design: takeaway as a gold-bordered pull quote — correct pattern
- Period right-aligned in mono — clean
- Involved parties as a secondary line — appropriate hierarchy
- Detail panel "Lessons" section with green "What Worked" and red "What Didn't Work" — exactly right
- Page subtitle ("The institutional memory that prevents starting from scratch") — the best subtitle in the toolkit

Don't change the fundamental structure. The refinements below are about making the connections actionable.

---

## 1. FIX: "Connects To" Should Be Links + Text, Not Just Text

### Current State (on cards)
"Connects to: Walton downtown cultural district plan (2024) was commissioned without documented reference to this plan. Several recommendations overlap word-for-word. CACHE creative economy census (2025) captures some of the same baseline data, suggesting the 2019 baseline was lost."

This is analytical prose on the card. Too long, and the entity references aren't clickable.

### Fix: Cards

On cards, the "Connects to" line should show ONLY the linked entity names, not the analytical text:

```
Connects to: Downtown Cultural District Planning, 
CACHE Creative Economy Census
```

- Each name is a clickable link styled in `color: var(--accent-gold);`
- Clicking navigates to the relevant tool page and opens that entity's detail panel
- Max 2 entity names on the card. If more, show "and 2 more" which opens the detail panel
- The analytical text ("was commissioned without documented reference...") moves to the detail panel only

```css
.card-connects-to {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 8px;
}

.card-connects-to a,
.card-connects-to .entity-link {
  color: var(--accent-gold);
  cursor: pointer;
  transition: opacity 0.15s;
}

.card-connects-to .entity-link:hover {
  text-decoration: underline;
}
```

### Fix: Detail Panel

In the detail panel, "CONNECTS TO" becomes a structured section with two parts:

**Part 1: Linked entities as inline reference cards**

Query the database for entities this precedent connects to:

```sql
-- Related investment (direct link)
SELECT * FROM investments WHERE precedent_id = [this_precedent_id];

-- If no direct foreign key link exists, use the connects_to_text to identify entities
-- For the prototype, manually link these in the seed data or parse entity names from the text
```

Show as inline reference cards:

```
CONNECTS TO

┌─ Investment ────────────────────────────────────────┐
│ Downtown Cultural District Planning                  │
│ Walton Family Foundation · $750K · Active            │
└──────────────────────────────────────────────────────┘

┌─ Investment ────────────────────────────────────────┐
│ NWA Creative Economy Census                          │
│ CACHE · $85K · Completed                             │
└──────────────────────────────────────────────────────┘
```

Gold left border for investments, blue for decisions, green for opportunities. Each clickable.

**Part 2: Connection context (the analytical text)**

Below the cards, show the full analytical prose:

```
CONNECTION CONTEXT
Walton downtown cultural district plan (2024) was commissioned
without documented reference to this plan. Several recommendations
overlap word-for-word. CACHE creative economy census (2025)
captures some of the same baseline data, suggesting the 2019
baseline was lost.
```

```css
.connection-context {
  padding: 12px 16px;
  background: var(--bg-inset);
  border-left: 2px solid var(--border-medium);
  border-radius: 0 6px 6px 0;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 12px;
}
```

---

## 2. ADD: "Currently Relevant To" in Detail Panel

This is the biggest missing piece. Precedents exist to inform current decisions. The detail panel should surface active decisions and investments that this precedent is relevant to.

### "Currently Relevant To" Section

Show after "Connects To" in the detail panel:

```
CURRENTLY RELEVANT TO

These active decisions and investments involve the same
stakeholders or domain as this precedent.

┌─ Decision ──────────────────────────────────────────┐
│ 2026 Grant Cycle Priorities                          │
│ CACHE · Deliberating · Locks in 24d                  │
└──────────────────────────────────────────────────────┘

┌─ Decision ──────────────────────────────────────────┐
│ FY2027 Municipal Budget — Cultural Line Items        │
│ City of Bentonville · Upcoming · Locks Jul 1         │
└──────────────────────────────────────────────────────┘
```

### How to determine relevance

Since there's no direct foreign key from decisions to precedents, use a heuristic based on shared stakeholders:

```typescript
async function getRelevantDecisions(precedent: Precedent): Promise<Decision[]> {
  // 1. Parse org names from the 'involved' field
  const involvedOrgs = parseOrgNames(precedent.involved);
  
  // 2. Find org IDs that match
  const orgIds = await findOrgIdsByNames(involvedOrgs);
  
  // 3. Find active decisions involving those orgs
  const decisions = await supabase
    .from('decisions')
    .select('*')
    .in('stakeholder_org_id', orgIds)
    .in('status', ['deliberating', 'upcoming'])
    .order('locks_date', { ascending: true });
  
  return decisions.data || [];
}

async function getRelevantInvestments(precedent: Precedent): Promise<Investment[]> {
  // Direct link
  if (precedent.investment_id) {
    const { data } = await supabase
      .from('investments')
      .select('*')
      .eq('id', precedent.investment_id);
    return data || [];
  }
  
  // Heuristic: active investments by involved orgs
  const involvedOrgs = parseOrgNames(precedent.involved);
  const orgIds = await findOrgIdsByNames(involvedOrgs);
  
  const { data } = await supabase
    .from('investments')
    .select('*')
    .in('source_org_id', orgIds)
    .eq('status', 'active')
    .order('amount', { ascending: false })
    .limit(5);
  
  return data || [];
}

function parseOrgNames(involved: string): string[] {
  // Extract org names from the involved text
  // "CACHE (commissioned), External consulting firm, Regional stakeholders"
  // → ['CACHE']
  // 
  // "City of Bentonville (funded), External curator"
  // → ['City of Bentonville']
  //
  // Split by comma, take the part before any parenthetical, trim,
  // then match against known org names
  const parts = involved.split(',').map(p => p.replace(/\(.*?\)/g, '').trim());
  return parts.filter(p => p.length > 0);
}
```

This heuristic surfaces: "The NWA Creative Economy Strategic Plan (2019) involved CACHE. CACHE currently has an active decision: 2026 Grant Cycle Priorities, locking in 24 days." That connection is the entire point of precedents — they're not archival, they're active memory.

If no relevant active decisions or investments are found, don't show the section. But when it does appear, it transforms the precedent from a historical record into a strategic asset.

---

## 3. FIX: Detail Panel Order — Takeaway First

### Current Order
1. Overview (period, involved, description)
2. Lessons (what produced, what worked, what didn't)
3. Takeaway
4. Connects To
5. Record

### Corrected Order
1. **Takeaway** — the most important information, what you came here for
2. Overview (period, involved, description)
3. Lessons (what produced, what worked, what didn't)
4. Connects To (linked cards + context text)
5. Currently Relevant To (active decisions/investments)
6. Across the Toolkit (involved orgs, related outputs)
7. Record

The takeaway is the distilled learning. It should be the first thing you read after the title. Everything else supports or contextualizes it. When the practice team opens a precedent before a stakeholder meeting, they need the takeaway in 2 seconds — not after scrolling through overview and lessons.

### Takeaway styling in the detail panel

The takeaway should be visually prominent — same pull-quote style as on the card but larger:

```css
.detail-takeaway {
  font-family: var(--font-serif);
  font-size: 16px;
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.5;
  border-left: 3px solid var(--accent-gold);
  padding: 16px 20px;
  background: var(--accent-glow);
  border-radius: 0 6px 6px 0;
  margin: 16px 0 32px 0;
}
```

---

## 4. ADD: "Across the Toolkit" Section

After "Currently Relevant To," show the standard cross-tool connections:

**Involved Organizations**
Parse org names from the `involved` field, match to org records, show as inline reference cards:

```
INVOLVED ORGANIZATIONS

┌─ Organization ──────────────────────────────────────┐
│ CACHE                                  Intermediary  │
│ 4 investments · 1 decision · 2 opportunities        │
└──────────────────────────────────────────────────────┘
```

Gold left border. Clickable → Ecosystem Map detail.

**Related Outputs** (outputs that cite this precedent)

```sql
SELECT o.* FROM outputs o
  JOIN output_references r ON r.output_id = o.id
  WHERE r.reference_id = [this_precedent_id]
  AND r.reference_type = 'precedent';
```

Purple left border. Clickable → Outputs detail.

**Related Investment** (direct link if `investment_id` exists)

```sql
SELECT * FROM investments WHERE id = [precedent.investment_id];
```

Gold left border. Clickable → Investments detail.

---

## 5. CARD REFINEMENTS

### Truncate the "Connects to" line
Max 1 line on the card. Show entity names only, not analytical text:

```
Connects to: Downtown Cultural District Planning, Creative Economy Census
```

If the text overflows, truncate with ellipsis. Full content in the detail panel.

### Consider adding a relevance signal
If a precedent connects to an active decision that's locking within 30 days, show a small signal on the card:

```
┌─────────────────────────────────────────────────────────────┐
│ NWA Creative Economy Strategic Plan (2019)       2018-2019  │
│ CACHE, External consulting firm, Regional stakeholders      │
│                                                             │
│ "Comprehensive plans without implementation tracking and    │
│ sequencing logic get shelved..."                            │
│                                                             │
│ Connects to: Cultural District Planning, Creative Economy   │
│ Census                                                      │
│                                                             │
│ ● Active: Relevant to 2026 Grant Cycle Priorities (24d)     │
└─────────────────────────────────────────────────────────────┘
```

The "● Active" line in gold or red signals that this historical precedent is relevant to a current decision. It transforms the card from archival to urgent.

```css
.card-relevance-signal {
  font-size: 12px;
  color: var(--accent-gold);
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-relevance-signal--urgent {
  color: var(--status-red);
}
```

Use `--status-red` if the decision locks within 30 days. Use `--accent-gold` otherwise.

This is optional for the prototype but it's the feature that would make a partner say "oh, this is different." Precedents that actively inform current decisions feel alive.

---

## 6. GOVERNING PRINCIPLES FOR PRECEDENTS

### What makes a precedent

Not every past event is a precedent. A precedent is an initiative, program, investment, or policy that:

1. **Produced learnable results** — something worked, something didn't, and the practice team can articulate what
2. **Is relevant to current or future ecosystem decisions** — the learning transfers
3. **Would otherwise be forgotten** — institutional memory that's not documented elsewhere, or documented but not accessible to the people who need it

The key distinction: a precedent isn't a success story or a failure report. It's a **structured learning** with a takeaway that applies forward.

### How precedents enter the system

The practice team creates precedent entries from:

1. **Stakeholder interviews** — "We tried a public art program in 2021, here's what happened"
2. **Document review** — Annual reports, post-mortems, evaluation documents, strategic plans
3. **Pattern recognition** — When an investment completes, the practice team asks "what did we learn that applies to the next thing?"
4. **Institutional memory recovery** — When a decision is forming and the practice team asks "has this been tried before?" the answer becomes a precedent entry

### The takeaway is the intellectual product

The practice team doesn't just record what happened. They distill a **transferable insight**. Compare:

**Record:** "The 2019 strategic plan had 12 recommendations. It was referenced briefly in 2019-2020 and then shelved."

**Takeaway:** "Comprehensive plans without implementation tracking and sequencing logic get shelved. Next plan needs: fewer recommendations, built-in accountability, explicit sequencing, and a mechanism for transferring learnings to the next planning cycle."

The takeaway is prescriptive. It tells the practice team (and by extension, stakeholders) what to do differently next time. This is the analytical value-add that distinguishes the toolkit from an archive.

### The "What Worked / What Didn't Work" framework

This binary is deliberately simple. Every precedent produces:
- **What Worked** — transferable strengths to preserve or replicate
- **What Didn't Work** — transferable lessons to avoid or address

These aren't evaluations of people or organizations. They're structural observations about what conditions produced results and what conditions didn't. "No implementation tracking mechanism built in" is a structural observation. "The project manager didn't follow through" is a personnel critique that doesn't belong.

### Precedents the practice team doesn't create entries for

- Events that didn't produce transferable learning (a conference that happened; nothing specific to learn)
- Initiatives still in progress (those are investments, not precedents — they become precedents when they're far enough along to assess)
- Rumors or unverified accounts (precedents need factual basis)
- External examples from other regions (unless directly referenced by local stakeholders as a model — in which case the precedent captures "this was cited as a model, here's whether it actually applies")

---

## 7. BUILD PRIORITY

1. **Move Takeaway to top of detail panel** — before Overview and Lessons
2. **Fix "Connects To" on cards** — show only entity names as clickable links, truncate to 1 line
3. **Fix "Connects To" in detail panel** — split into linked inline reference cards + connection context text below
4. **Add "Currently Relevant To" section** — active decisions/investments involving the same stakeholders
5. **Add "Across the Toolkit" section** — involved orgs, related outputs, related investment
6. **Add relevance signal to cards** — "● Active: Relevant to [decision] (Xd)" when a connected decision is approaching lock
7. **Implement entity name parsing** from `involved` field to match against org records for the heuristic connections
