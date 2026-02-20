# OPPORTUNITIES_REDESIGN.md — The Opportunity Pipeline

Read this after DESIGN_AMENDMENT.md. This refines the Opportunities page — the tool that tracks every open grant, commission, RFP, and residency flowing through the ecosystem.

---

## What's Working

- Status grouping (Closing Soon / Open) — correct urgency pattern
- Type badges (RFP, RESIDENCY, GRANT) — clear categorization
- Amount right-aligned in mono with deadline countdown — good scan path
- Eligibility always visible on cards — practitioners check this first
- Deadline countdown color-coded in red/orange — urgency signal working

---

## 1. FIX: Amount Display Bugs

### "$45,000 – $45,000" redundancy
When `amount_min` equals `amount_max`, show a single amount:

```typescript
function formatAmountRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return '';
  if (min === null) return `Up to ${formatCurrency(max)}`;
  if (max === null) return `From ${formatCurrency(min)}`;
  if (min === max) return formatCurrency(min);
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}
```

### Missing amount on cards
When both amount fields are null (like the UA Residency), don't leave empty space. Either:
- Show nothing in the amount position (let the card be shorter)
- Or show the amount area with: `Stipend + materials` or whatever the `amount_description` field says

```typescript
// In the card component:
const amountDisplay = formatAmountRange(opp.amount_min, opp.amount_max);
const amountFallback = opp.amount_description || null;

// Render:
{amountDisplay ? (
  <span className="card-amount">{amountDisplay}</span>
) : amountFallback ? (
  <span className="card-amount-description">{amountFallback}</span>
) : null}
```

```css
.card-amount-description {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-secondary);
  text-align: right;
}
```

---

## 2. FIX: Add Source Org to Cards

Every card should show who is offering this opportunity:

```
┌─────────────────────────────────────────────────────────────┐
│ GRANT   Open                         $2,500 – $10,000      │
│                                       Due Mar 14 (24d)      │
│ CACHE Creative Economy Micro-Grants                         │
│ CACHE                                                       │
│                                                             │
│ Project-based grants for creative work. Priority:           │
│ community engagement, cross-disciplinary collaboration.     │
│                                                             │
│ Eligibility: NWA-based practitioners and organizations      │
└─────────────────────────────────────────────────────────────┘
```

Source org line: `font-size: 13px; color: var(--text-secondary);`
If `source_org_id` resolves, make it a clickable link to the org detail.
If only `source_name` exists, show as plain text.

---

## 3. ADD: Closed / Awarded Tab

The DESIGN_SPEC called for three status groups. Currently only "Closing Soon" and "Open" appear. Add "Closed / Awarded" below.

### Tab structure

Instead of inline section headers, use proper tabs at the top:

```
[Open  4]  [Closing Soon  1]  [Closed / Awarded  2]
```

Implementation:
```typescript
type OpportunityTab = 'open' | 'closing_soon' | 'closed';

// Classify opportunities:
function classifyOpportunity(opp: Opportunity): OpportunityTab {
  if (opp.status === 'closed' || opp.status === 'awarded') return 'closed';
  if (opp.deadline) {
    const daysRemaining = differenceInDays(new Date(opp.deadline), new Date());
    if (daysRemaining <= 14) return 'closing_soon';
  }
  return 'open';
}
```

### Closed / Awarded cards

When an opportunity is closed or awarded, the card shows its lifecycle outcome:

```
┌─────────────────────────────────────────────────────────────┐
│ GRANT   Awarded                                    $450K    │
│                                          Closed Jan 2025    │
│ Creative Economy Grants — Cycle 2                           │
│ CACHE                                                       │
│                                                             │
│ Became → Creative Economy Grants — Cycle 2 [Investment]     │
└─────────────────────────────────────────────────────────────┘
```

The "Became →" line is the lifecycle link. It connects the opportunity to the investment it produced.

```sql
-- Find the investment this opportunity became
SELECT * FROM investments WHERE id = [opportunity.awarded_investment_id];
```

If `awarded_investment_id` is set, show the link. If the opportunity was closed but not awarded (cancelled, no qualified applicants, etc.), show "Closed — not awarded" with a brief note if available.

```css
.card-lifecycle-link {
  font-size: 12px;
  color: var(--accent-gold);
  margin-top: 8px;
  cursor: pointer;
}
.card-lifecycle-link:hover {
  text-decoration: underline;
}
```

This tab is important because it shows the pipeline working. Opportunities don't just disappear — they become investments. That lifecycle is one of the toolkit's unique contributions.

---

## 4. FIX: Detail Panel — Remove Empty Sections

### "Application" section
If there's no application URL, instructions, or contact info, don't show the section. Only render when there's actual content:

```typescript
const hasApplicationInfo = opp.application_url || opp.application_instructions || opp.contact_email;

{hasApplicationInfo && (
  <section>
    <h3>Application</h3>
    {opp.application_url && <a href={opp.application_url}>Apply here →</a>}
    {opp.application_instructions && <p>{opp.application_instructions}</p>}
    {opp.contact_email && <p>Contact: {opp.contact_email}</p>}
  </section>
)}
```

### "Details" heading
Same issue as decisions — "Details" is generic. Remove the heading. The labeled fields (SOURCE, DEADLINE, DESCRIPTION, ELIGIBILITY, AMOUNT) are self-explanatory.

---

## 5. ENRICH: Detail Panel "Across the Toolkit"

### Current state
Shows source org only. Thin.

### Full "Across the Toolkit" content:

**Source Organization** (keep)
- Inline reference card with gold left border
- Clickable → Ecosystem Map

**Source Org's Other Opportunities**
```sql
SELECT * FROM opportunities
  WHERE source_org_id = [this_opp.source_org_id]
  AND id != [this_opp.id]
  AND status IN ('open', 'closing_soon')
  ORDER BY deadline ASC;
```
- Label: "Also from [Org Name]"
- Shows other active opportunities from the same source
- Useful context: CACHE is offering both micro-grants and a fellowship? That's a different engagement than one isolated grant.

**Source Org's Investments** (what they've funded before)
```sql
SELECT * FROM investments
  WHERE source_org_id = [this_opp.source_org_id]
  ORDER BY amount DESC
  LIMIT 3;
```
- Label: "What [Org Name] has invested"
- Inline reference cards with gold left border
- This tells practitioners: "This funder has previously invested $450K in creative economy grants and $85K in the census." It establishes the funder's track record.

**Became Investment** (if closed/awarded)
```sql
SELECT * FROM investments WHERE id = [opp.awarded_investment_id];
```
- Label: "This opportunity became"
- Inline reference card showing the investment with amount, compounding status
- Only shows on closed/awarded opportunities

**Eligible Practitioners** (aspirational — see Section 7)
- Which practitioners in the ecosystem match this opportunity's eligibility?
- This is a future feature but architecturally important

### Detail panel section order:

```
[Title, type badge, status badge, amount]

SOURCE
[Org name, clickable]

DEADLINE
[Date, countdown]

DESCRIPTION
[Full description text]

ELIGIBILITY
[Full eligibility text]

AMOUNT
[Amount or range with description]

APPLICATION
[URL, instructions, contact — only if available]

Across the Toolkit
  Source Organization
  Also from [Org Name] (other active opps)
  What [Org Name] Has Invested
  This Opportunity Became [investment] (if closed/awarded)

Record
  Created, Last reviewed
  [Mark as reviewed] [Edit]
```

---

## 6. CARD REFINEMENTS

### Deadline countdown color tiers
Match the decision countdown pattern:

```
≤7 days:   color: var(--status-red); font-weight: 700;
8-14 days: color: var(--status-red);
15-30 days: color: var(--status-orange);
>30 days:  color: var(--text-secondary);
```

### Type badge colors
Each opportunity type should have a distinct badge color:

```
GRANT:       border-color and text: var(--status-green)
RFP:         border-color and text: var(--status-blue)
COMMISSION:  border-color and text: var(--accent-gold)
RESIDENCY:   border-color and text: var(--status-purple)
FELLOWSHIP:  border-color and text: var(--status-orange)
```

This lets you scan the page and immediately see what types of opportunities dominate. If everything is green (grants), the pipeline is one-dimensional.

### Eligibility styling
Eligibility is the first thing a practitioner checks. Make it slightly more prominent:

```css
.card-eligibility {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border-subtle);
}

.card-eligibility-label {
  font-weight: 600;
  color: var(--text-secondary);
}
```

The border-top separates eligibility from description, making it easy to find.

---

## 7. GOVERNING PRINCIPLES FOR OPPORTUNITIES

### The opportunity layer serves two audiences

**For the practice team:** Opportunities are signals of where money is about to flow. An open RFP from City of Bentonville for cultural district branding means a decision has already been made to invest in branding — the practice team should know this is happening and consider whether it connects to other toolkit entries (the cultural district planning investment, the Bentonville economic development narrative).

**For practitioners:** Opportunities are direct value. "Here are 5 things you can apply to right now." This is the "value before contribution" mechanism — the reason practitioners engage with the toolkit at all.

### How opportunities enter the system

1. **Practice team research** — scanning funder websites, grant databases, city procurement portals, foundation announcement pages. The practice team creates entries from public postings.

2. **Stakeholder tips** — a funder contact mentions "we're about to open a new grant cycle." The practice team creates the entry when the opportunity becomes public.

3. **Submissions** — external contributors can submit opportunities through the contributor surface. These enter the submissions queue for review.

4. **Lifecycle conversion** — when a decision in the toolkit results in a new program or funding opportunity (e.g., CACHE board decides on 2026 grant priorities → micro-grants open), the practice team creates the opportunity entry and links it to the decision.

### Opportunity lifecycle

```
Open → Closing Soon (≤14 days) → Closed → Awarded → [links to Investment]
         auto-transition              manual    manual
```

- **Open → Closing Soon:** Automatic based on deadline. No manual action needed.
- **Closing Soon → Closed:** Manual. Practice team marks as closed when deadline passes.
- **Closed → Awarded:** Manual. Practice team updates when the award is announced.
- **Awarded → Investment:** Manual. Practice team creates an investment entry and links it via `awarded_investment_id`.

The lifecycle completion — opportunity becoming an investment — is what demonstrates the toolkit's longitudinal value. Money doesn't just appear in the investment ledger. It has a trail: decision → opportunity → investment → compounding assessment.

### What the opportunity page is NOT

- It's not a grant database competing with Foundation Directory or Grants.gov. It's ecosystem-specific — only opportunities flowing through this ecosystem.
- It's not a comprehensive listing of every available grant nationally. It's curated by the practice team for relevance.
- It's not an application portal. The toolkit doesn't manage applications — it surfaces opportunities and links to application information.

### The practitioner-facing opportunity surface

The opportunities page in the practice surface shows all data including source org connections, lifecycle links, and analytical context. The contributor/public surface (future feature) should show a simplified view:

- Opportunity title, type, deadline, amount, eligibility, description
- Application link
- Source org name (but not the org's full toolkit profile)
- No "Across the Toolkit" connections (those are internal analytical context)

This simplified view is what practitioners receive when the practice team sends them curated opportunities as part of the "value before contribution" exchange.

---

## 8. BUILD PRIORITY

1. **Fix amount display** — single amount when min equals max, fallback to amount_description when no numbers
2. **Add source org to cards** — below title, clickable if org link exists
3. **Add Closed / Awarded tab** — with lifecycle "Became →" links to investments
4. **Remove empty Application section** — only render when content exists
5. **Remove generic "Details" heading** from detail panel
6. **Enrich "Across the Toolkit"** — source org's other opportunities, their investment history, lifecycle investment link
7. **Add type badge colors** — distinct color per opportunity type
8. **Refine eligibility styling** — border-top separator, slightly more prominent
9. **Implement deadline countdown color tiers** — 4-level urgency matching decisions
