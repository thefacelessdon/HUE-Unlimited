# DECISIONS_REDESIGN.md — The Decision Calendar

Read this after DESIGN_AMENDMENT.md. This refines the Decisions page — the tool that tracks what's being decided, when it locks, and where the practice team needs to show up.

---

## What's Working

The Decisions page is the most functional page in the toolkit right now:
- Temporal grouping (Within 30 Days, Within 6 Months) — correct pattern
- Lock date countdowns in red/orange mono — strong urgency signal
- Output links on cards ("▸ Output: CACHE 2026 Grant Cycle Brief [Published]") — demonstrates the toolkit's cross-tool value
- Dependency text on cards — shows the analytical thinking
- Stakeholder org on cards — immediately identifies who's deciding

Don't break any of this. The refinements below are additions and fixes, not replacements.

---

## 1. FIX: "Entity Details" Generic Heading

The detail panel shows "Entity Details" as a section header. This is a code artifact — every detail panel is likely reusing the same component with a generic title.

**Fix:** Remove the heading entirely. The content is self-explanatory — Status, Stakeholder, Locks Date, Description are all clearly labeled fields. A heading that says "Decision Details" above them adds nothing. Just remove it.

If you must keep a heading for structural consistency across detail panels, use the entity-specific name: "Decision Details" for decisions, "Investment Details" for investments, etc. But ideally, remove it from all detail panels — the entity title and badges at the top of the panel already establish what you're looking at.

---

## 2. FIX: Dependencies Should Be Linked, Not Text

### Current State
Dependencies show as a text paragraph:
"Should reference Walton cultural district plan findings. Should address concentration trend identified in Cycle 2 outcomes."

### Required State
Dependencies should be two things:

**a) Linked decision cards** from the `decision_dependencies` junction table:

```
DEPENDS ON

┌─ Decision ──────────────────────────────────────────┐
│ 2027 Community Programming Slate                     │
│ Crystal Bridges · Deliberating · Locks Jun 14        │
└──────────────────────────────────────────────────────┘
```

These are clickable inline reference cards (blue left border for decisions) that navigate to the linked decision's detail.

Query:
```sql
-- Decisions this depends on
SELECT d.* FROM decisions d
  JOIN decision_dependencies dd ON dd.depends_on_id = d.id
  WHERE dd.decision_id = [this_decision_id];

-- Decisions that depend on this
SELECT d.* FROM decisions d
  JOIN decision_dependencies dd ON dd.decision_id = d.id
  WHERE dd.depends_on_id = [this_decision_id];
```

If the foreign key bug from INVESTMENTS_BUGFIX.md hasn't been fixed for decision_dependencies yet, fix it now. Run:
```sql
SELECT 
  d1.decision_title as decision,
  dd.depends_on_id,
  d2.decision_title as depends_on
FROM decision_dependencies dd
JOIN decisions d1 ON dd.decision_id = d1.id
LEFT JOIN decisions d2 ON dd.depends_on_id = d2.id;
```

If `depends_on` is NULL, the UUIDs are broken. Fix them.

**b) Dependency context text** below the linked cards:

```
DEPENDENCY CONTEXT
Should reference Walton cultural district plan findings.
Should address concentration trend identified in Cycle 2 outcomes.
```

This is the `dependencies_text` field — the practice team's analytical notes on what this decision should take into account. It stays as text but is secondary to the actual linked decisions. Style it as a callout block:

```css
.dependency-context {
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

Show "DEPENDS ON" section with linked cards first, then "DEPENDENCY CONTEXT" text below. If no linked dependencies exist (junction table empty for this decision), only show the text.

Also show **"DEPENDED ON BY"** — decisions that depend on THIS decision:

```
DEPENDED ON BY

┌─ Decision ──────────────────────────────────────────┐
│ Crystal Bridges 2027 Programming Slate               │
│ Crystal Bridges · Deliberating · Locks Jun 14        │
│ Should align with CACHE grant cycle                  │
└──────────────────────────────────────────────────────┘
```

This is critical information — if you're looking at the CACHE Grant Cycle decision, knowing that Crystal Bridges' programming decision depends on its outcome changes how you approach the intervention.

---

## 3. FIX: Deliberation Timeline Redundancy

The detail panel shows "Deliberation Timeline" as a section header, then "DELIBERATION TIMELINE" again as a label above the bar. Remove the duplicate.

**Improved timeline:**

```
Deliberation Timeline

Jan 14                               Feb 27        Mar 14
Started                          Deliberation    LOCKS
                                    ends
├────────────────────────●───────────┼──────────────┤
         ████████████████ TODAY

         Deliberation period    │ Decision window │
```

Implementation improvements:
- Show three key dates: deliberation_start, deliberation_end, locks_date
- "Today" marker: a vertical line or dot at the proportional position
- Color: green fill from start to today, gray from today to deliberation_end, orange/red from deliberation_end to locks_date
- If today is past deliberation_end but before locks_date: the green portion extends to deliberation_end, then a gap, then orange to locks_date with "Decision period — lock approaching" label
- Date labels: `font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary);`
- "Today" label: `font-size: 11px; color: var(--text-primary); font-weight: 600;`

```css
.timeline-bar {
  position: relative;
  height: 8px;
  border-radius: 4px;
  background: var(--bg-inset);
  margin: 16px 0 8px 0;
}

.timeline-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 4px;
  background: var(--status-green);
  transition: width 0.3s ease;
}

.timeline-today {
  position: absolute;
  top: -4px;
  width: 2px;
  height: 16px;
  background: var(--text-primary);
  transform: translateX(-50%);
}

.timeline-dates {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}
```

---

## 4. ENRICH: "Across the Toolkit" Section

Current state shows only the stakeholder org. A decision needs more context.

### Full "Across the Toolkit" content:

**Stakeholder Organization** (already present — keep)
- Inline reference card with gold left border
- Shows: org name, type
- Clickable → Ecosystem Map detail

**Related Outputs** (partially present — move into Across the Toolkit)
The "Related Outputs" section currently sits above "Across the Toolkit." It IS cross-tool data — move it into the section.

```sql
SELECT * FROM outputs
  WHERE triggered_by_decision_id = [this_decision_id];
```

- Inline reference card with purple left border
- Shows: output title, type badge, published status
- Clickable → Outputs detail

**Stakeholder's Investments** — what has this stakeholder already funded? This is essential context for a decision about future allocation.

```sql
SELECT * FROM investments
  WHERE source_org_id = [stakeholder_org_id]
  ORDER BY amount DESC
  LIMIT 5;
```

- Label: "What [Org Name] has invested"
- Inline reference cards with gold left border
- Shows: investment title, amount, compounding status
- Clickable → Investments detail

**Relevant Precedents** — what's been tried in this domain before?

```sql
-- Direct: precedents involving the same stakeholder org
-- Check the 'involved' text field for the org name
SELECT * FROM precedents
  WHERE involved ILIKE '%' || [stakeholder_org_name] || '%';
```

- Label: "What's been tried before"
- Inline reference cards with neutral left border
- Shows: precedent name, period, takeaway (truncated)
- Clickable → Precedents detail

**Related Narratives** — what's being said about this stakeholder?

```sql
SELECT * FROM narratives
  WHERE source_org_id = [stakeholder_org_id];
```

- Label: "What's being said"
- Inline reference cards with orange left border
- Shows: narrative source_name, gap level badge, reality text (truncated)
- Clickable → Narratives detail

### Section order in the detail panel:

```
[Decision title, badges]

Decision Details
  Status, Stakeholder, Locks Date, Deliberation Period, Description

Intervention Needed
  [callout block with intervention text]

Dependencies
  [linked decision cards]
  [dependency context text]

Deliberation Timeline
  [timeline visualization]

Across the Toolkit
  Stakeholder Organization
  Related Outputs
  What [Org] Has Invested (top 5)
  What's Been Tried Before (precedents)
  What's Being Said (narratives)

Record
  Created, Updated, Last Reviewed
  [Mark as reviewed] [Edit]
```

---

## 5. ADD: Timeline View (Alternative to List)

The list tells you about individual decisions. A timeline view shows when decision windows cluster and overlap — which is essential for planning interventions.

### View Toggle

Same pattern as Investments List/Landscape:

```
[List]  [Timeline]
```

### Timeline View

A horizontal timeline showing all active decisions as bars spanning their deliberation→lock windows:

```
Timeline View

         Feb        Mar        Apr        May        Jun        Jul        Aug        Sep
          |          |          |          |          |          |          |          |
TODAY ────●
          |
Grant     ██████████████░░░░
Cycle     Deliberating → Locks Mar 14
          |
FY2027    |    ████████████████████████████████░░░░░░░░░░░░░░░
Budget    |    Upcoming → Locks Jul 1
          |
Crystal   |         ██████████████████████████████████████████████████░░░░
Bridges   |         Deliberating → Locks Jun 14
          |
Public Art|                                    ████████████████████████████████████░░░░░░
Phase 3   |                                    Upcoming → Locks Aug 14
          |
Workforce |                                              ████████████████████████████████████░░░░
Phase 2   |                                              Upcoming → Locks Sep 1
          |
BFF       |                                                        ██████████████████████████████████
Strategy  |                                                        Upcoming → Locks Oct 15
          |
```

Each decision is a horizontal bar:
- Green fill: deliberation period
- Orange/gray fill: post-deliberation to lock
- Bar label: decision title (left) and lock date (right)
- Status badge: small colored dot at the start of the bar
- "Today" line: vertical dashed line spanning all rows

**Implementation:**

```tsx
interface TimelineDecision {
  id: string;
  title: string;
  stakeholder: string;
  status: string;
  deliberation_start: Date;
  deliberation_end: Date;
  locks_date: Date;
}
```

```css
.timeline-container {
  padding: 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  overflow-x: auto;
}

.timeline-row {
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
}

.timeline-label {
  width: 200px;
  flex-shrink: 0;
  padding-right: 16px;
}

.timeline-label-title {
  font-family: var(--font-serif);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-label-org {
  font-size: 11px;
  color: var(--text-tertiary);
}

.timeline-track {
  flex: 1;
  position: relative;
  height: 24px;
}

.timeline-bar-deliberation {
  position: absolute;
  height: 100%;
  background: var(--status-green);
  opacity: 0.6;
  border-radius: 3px 0 0 3px;
}

.timeline-bar-lock {
  position: absolute;
  height: 100%;
  background: var(--status-orange);
  opacity: 0.4;
  border-radius: 0 3px 3px 0;
}

.timeline-today-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent-gold);
  z-index: 10;
}

.timeline-today-label {
  position: absolute;
  top: -20px;
  font-size: 10px;
  font-weight: 600;
  color: var(--accent-gold);
  transform: translateX(-50%);
}

.timeline-month-labels {
  display: flex;
  margin-left: 200px;
  margin-bottom: 8px;
}

.timeline-month {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-tertiary);
  border-left: 1px solid var(--border-subtle);
  padding-left: 4px;
}
```

**Calculating bar positions:**
```typescript
// Define the timeline range: from today minus 2 weeks to the latest lock date plus 2 weeks
const timelineStart = subWeeks(new Date(), 2);
const timelineEnd = addWeeks(
  Math.max(...decisions.map(d => d.locks_date)),
  2
);
const totalDays = differenceInDays(timelineEnd, timelineStart);

function getPosition(date: Date): string {
  const days = differenceInDays(date, timelineStart);
  return `${(days / totalDays) * 100}%`;
}

function getWidth(start: Date, end: Date): string {
  const days = differenceInDays(end, start);
  return `${(days / totalDays) * 100}%`;
}
```

**Interactions:**
- Clicking a timeline bar opens that decision's detail panel (same slide-over as list view)
- Hovering a bar shows: decision title, stakeholder, lock date, days remaining
- The timeline scrolls horizontally if the date range is wide

**What the timeline reveals that the list doesn't:**
- Three decisions cluster in the Mar-Jun window — intervention capacity needs to be planned
- The CACHE Grant Cycle and Crystal Bridges Programming decisions overlap, and one depends on the other — the practice team needs to sequence their interventions
- There's a gap in Jul with nothing locking — that's breathing room
- Four decisions lock in Aug-Oct — heavy back half of the year

This is strategic planning information. The list tells you what's next. The timeline tells you what the year looks like.

---

## 6. CARD REFINEMENTS

The list view cards are already good. Small refinements:

### Add stakeholder org as a clickable link
Currently shows "CACHE" as plain text. Make it a link that navigates to the Ecosystem Map and opens CACHE's detail panel.

```css
.card-stakeholder {
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.15s;
}
.card-stakeholder:hover {
  color: var(--accent-gold);
}
```

### Output link should use the inline reference style
Currently shows "▸ Output: CACHE 2026 Grant Cycle Brief [Published]" as text. Good content, but style it consistently:

```css
.card-output-link {
  font-size: 12px;
  color: var(--accent-gold);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
}
.card-output-link:hover {
  text-decoration: underline;
}
```

Clicking it should navigate to the Outputs page and open that output's detail panel.

### Dependency links should also be clickable
"▸ Depends on: Should reference Walton cultural district plan..." is text. If there are linked decisions in the junction table, show them as clickable:

```
▸ Depends on: 2027 Community Programming Slate
```

Clicking navigates to that decision. If no junction table link exists, show the dependency context text as-is but in secondary styling.

### Color-code the countdown more aggressively
Current: red for 24d. But all countdowns seem to use the same styling.

```
≤14 days:   color: var(--status-red); font-weight: 700;
15-30 days: color: var(--status-red);
31-90 days: color: var(--status-orange);
>90 days:   color: var(--text-secondary);
```

The most urgent decisions should visually shout.

---

## 7. GOVERNING PRINCIPLES FOR DECISIONS

### How decisions enter the system

Decisions don't self-report. The practice team identifies upcoming decision points through:

1. **Stakeholder relationships** — conversations with program officers, city officials, board members who mention upcoming decisions
2. **Board calendars and budget cycles** — public information about when organizations deliberate (CACHE board meets quarterly, city budget cycle is annual, etc.)
3. **Decision flags** — the `decision_flag` submission type lets external contacts signal that a decision is forming ("Momentary considering changing residency model")
4. **Pattern recognition** — when an investment is completed, the practice team asks "what decision comes next?" (e.g., Workforce Phase 1 completed → Phase 2 funding decision upcoming)

### What makes a decision entry valuable

The decision itself is public or semi-public information. What the toolkit adds is:

1. **The lock date** — when the decision becomes final and intervention is no longer possible
2. **The deliberation window** — when input can actually influence the outcome
3. **The intervention note** — what the practice team should do, say, or deliver before this decision locks. This is the core strategic judgment.
4. **Dependencies** — what other decisions, investments, or precedents this decision should consider. This is institutional memory.
5. **Connected outputs** — briefs, frameworks, or analyses the practice team has produced to inform this decision

### The intervention note is the intellectual product

"Directional brief needed before Feb board meeting. Brief should surface: concentration trend in Cycle 2, practitioner census data on income decline, and overlap with AAC grants."

This note is telling the practice team exactly what to do and what to include. It's the strategic planning layer. When someone opens a decision and reads the intervention note, they should know: what to produce, what data to include, who to deliver it to, and by when.

### Decisions the practice team doesn't create entries for

Not every organizational decision needs tracking. The toolkit tracks decisions that:
- Affect the cultural ecosystem structurally (budget allocation, grant priorities, programming direction)
- Have a known or estimable lock date
- Could be informed by ecosystem intelligence (the toolkit has relevant data)
- Have an intervention pathway (the practice team can actually reach the decision-maker)

Internal hiring decisions, vendor selections, event logistics — these don't need entries unless they structurally change the ecosystem.

---

## 8. BUILD PRIORITY

1. **Remove "Entity Details" heading** from the detail panel (or replace with "Decision Details" across all entity types)
2. **Fix dependency rendering** — show linked decisions from junction table as inline reference cards, then dependency context text below
3. **Fix deliberation timeline** — remove duplicate label, add three date markers, improve "Today" positioning
4. **Enrich "Across the Toolkit"** — add stakeholder investments, relevant precedents, related narratives
5. **Reorder detail panel sections** — Decision Details → Intervention → Dependencies → Timeline → Across the Toolkit → Record
6. **Make stakeholder org clickable** on cards and in detail panel
7. **Make output links clickable** — deep-link to Outputs page with detail panel open
8. **Color-code countdowns** with the 4-tier urgency scale
9. **Build Timeline view** behind a List/Timeline toggle
10. **Implement deep-link from dashboard** — clicking a decision on the dashboard opens this page with that decision's detail panel via `?open=[id]`
