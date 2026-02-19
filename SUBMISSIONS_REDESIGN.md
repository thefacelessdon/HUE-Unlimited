# SUBMISSIONS_REDESIGN.md — The Intake Layer

Read this after DESIGN_AMENDMENT.md. This refines the Submissions page — the review queue where external contributions enter the toolkit.

---

## What This Tool Does

The practice team can't be everywhere. Submissions let the ecosystem feed the toolkit. A program officer at CACHE knows about an upcoming fellowship. A practitioner at a Momentary opening hears that the board is reconsidering their residency model. A community member spots a public art call from the City.

Submissions are the external input channel. They're unverified, unstructured, and potentially noisy — so the practice team reviews everything before it enters the system. The review queue is the quality gate between the outside world and the toolkit database.

The governing principle: **submissions should be easy to make and rigorous to approve.** Low friction for contributors, high standards for what enters the system.

---

## Submission Types

There are five submission types, each mapping to a specific toolkit entity:

### 1. Opportunity Submission
**Source:** Public form at `/opportunities/submit`
**Creates:** Entry in `opportunities` table
**Who submits:** Anyone — practitioners, funders, community members, program officers
**Fields on the public form:**
- Title * (text)
- Type * (select: Grant, RFP, Commission, Residency, Fellowship, Program)
- Source organization (text — who's offering this)
- Amount or range (text — "$5,000–$10,000" or "Stipend + materials")
- Deadline (date picker)
- Description (textarea)
- Eligibility (text)
- Application link (url)
- Your name (optional)
- Your email (optional)

**What the practice team sees in the review queue:**
- All submitted fields
- Whether the source org already exists in the ecosystem map
- Whether there are similar opportunities already listed (deduplication check)

**On approve:** Creates an opportunity record. Practice team can edit fields before creating. Status starts as 'open'. `submitted_externally = true` is set.

### 2. Interest Signal
**Source:** Inline form on `/opportunities/[id]`
**Creates:** Entry in `opportunity_interests` table (or `submissions` with type 'interest_signal')
**Who submits:** Anyone viewing an opportunity
**Fields on the inline form:**
- Name * (text)
- Email * (email)
- Discipline * (text with suggestions)
- Note (textarea, optional — "I'm planning to apply because...")

**What the practice team sees:**
- The signal itself
- Which opportunity it's connected to
- Whether this person matches an existing ecosystem map practitioner
- How many total signals this opportunity has received

**On acknowledge:** Not "approve" — interest signals don't need rejection. The practice team either:
- Links the signal to an existing practitioner record (if the name matches someone in the ecosystem map)
- Creates a new practitioner record from the signal (if they're unknown)
- Just notes it (the signal is valuable even without creating a new record)

Interest signals don't need to sit in the same "Pending Review" queue as other submissions. They should have their own section or tab — they're informational, not gatekept.

### 3. Decision Flag
**Source:** Public form at `/submit/flag` (or a lightweight form accessible via link shared with contacts)
**Creates:** Entry in `decisions` table
**Who submits:** Stakeholders, program officers, board members, anyone close to an organization's decision process
**Fields on the public form:**
- Organization (text — who's making this decision)
- What's being decided (textarea)
- When does this decision lock? (date, approximate is fine)
- How do you know about this? (textarea — context for the practice team)
- Your name (optional)
- Your email (optional)

**What the practice team sees in the review queue:**
- All submitted fields
- Whether the org already exists in the ecosystem map
- Whether there's already a decision entry for this org on a similar topic
- The submitter's relationship to the org (inferred from name/email/context)

**On approve:** Creates a decision record. Practice team adds: deliberation_start, deliberation_end, status, dependencies, intervention_needed. The flag provides the raw signal — the practice team adds the analytical layer.

### 4. Investment Verification
**Source:** Email link sent to specific stakeholders: `/submit/verify?org=[id]`
**Creates:** Updates to existing `investments` records
**Who submits:** Program officers, finance directors, organizational contacts — people who know the actual numbers
**Fields on the verification form:**
- Pre-populated list of investments attributed to their organization
- For each investment: Confirm / Correct / Add context
  - Amount: [pre-filled] → [corrected amount or confirmed]
  - Status: [pre-filled] → [corrected or confirmed]
  - Outcome: [pre-filled] → [additional detail]
  - "Anything we're missing?" (textarea — lets them add investments we don't have)

**What the practice team sees in the review queue:**
- Which fields were confirmed vs. corrected
- Delta between current data and submitted corrections
- Any new investments the stakeholder mentioned
- The stakeholder's name and role

**On approve:** Updates the relevant investment records. Creates new investment records for anything the stakeholder added. This is the highest-value submission type — it turns estimated data into verified data.

### 5. Practitioner Tip
**Source:** Form at `/submit/practitioner` (or shared link)
**Creates:** Entry in `practitioners` table (ecosystem map)
**Who submits:** Other practitioners, program officers, community members
**Fields on the public form:**
- Practitioner name * (text)
- Discipline / what they do * (text)
- How long in NWA? (text)
- How do you know them? (textarea — context)
- Their website or portfolio (url, optional)
- Your name (optional)
- Your email (optional)

**What the practice team sees:**
- All submitted fields
- Whether this person already exists in the ecosystem map
- Whether they have a public profile on the platform

**On approve:** Creates a practitioner record in the ecosystem map. Practice team adds: income_sources, retention_factors, risk_factors from their own research. The tip provides the lead — the practice team does the assessment.

---

## Public Submission Pages

Each submission type has a lightweight public form. These live outside the practice surface — no auth required.

### `/opportunities/submit`
Already specified in PLATFORM_CORE.md. Light theme. Confirmation message on submit.

### `/submit/flag`
```
Flag an Upcoming Decision

Know about a decision being made that could affect NWA's
creative ecosystem? Let us know.

Organization *
[                                              ]

What's being decided? *
[                                              ]
[                                              ]

When does this lock? (approximate is fine)
[          ]

How do you know about this?
[                                              ]
[                                              ]

Your name (optional)
[                                              ]

Your email (optional)
[                                              ]

[Submit flag]
```

Confirmation: "Thanks. We'll look into this."

### `/submit/verify`
This is a special form — it's pre-populated with existing investment data for a specific organization. The URL includes the org ID as a parameter.

```
Verify Investment Data — City of Bentonville

We track cultural investments across NWA to understand where
resources are flowing. Can you confirm or correct this data?

─────────────────────────────────────────────

Public Art Installations - Phase 2
Amount: $200,000      [✓ Correct]  [Edit]
Status: Completed     [✓ Correct]  [Edit]
Outcome: 4 installations completed, 2 by non-local artists
                      [✓ Correct]  [Edit]

Public Art Installations - Phase 1
Amount: $180,000      [✓ Correct]  [Edit]
Status: Completed     [✓ Correct]  [Edit]

─────────────────────────────────────────────

Are we missing any cultural investments from City of Bentonville?

[Add an investment we don't have]

─────────────────────────────────────────────

Your name *
[                                              ]

Your title
[                                              ]

[Submit verification]
```

Confirmation: "Thanks. This helps us maintain accurate data."

### `/submit/practitioner`
```
Suggest a Practitioner

Know a creative worker in NWA we should know about?

Practitioner name *
[                                              ]

What do they do? *
[                                              ]

How long have they been in NWA?
[                                              ]

How do you know them?
[                                              ]
[                                              ]

Their website or portfolio
[                                              ]

Your name (optional)
[                                              ]

[Submit]
```

Confirmation: "Thanks. We'll look into connecting with them."

---

## Review Queue: The Practice Surface

### Page Layout

```
Submissions
External contributions waiting for review.

[Pending 4]  [Interest Signals 3]  [Reviewed 12]
```

Three tabs, not two:
- **Pending** — submissions that need action (opportunity, decision flag, verification, practitioner tip)
- **Interest Signals** — opportunity interest signals from the public surface (informational, not gatekept)
- **Reviewed** — previously approved or rejected submissions (audit trail)

### Pending Tab

Cards grouped by submission type, sorted by date (newest first):

```
OPPORTUNITY SUBMISSIONS (2)

┌─────────────────────────────────────────────────────────────────┐
│ OPPORTUNITY SUBMISSION  ·  Pending              Feb 18, 2026    │
│                                                                 │
│ NWA Community Mural Project                                     │
│ Submitted by Sarah Chen (Downtown Rogers Partnership)           │
│                                                                 │
│ Commission · $5,000-$12,000 · Deadline: Apr 29, 2026           │
│ Eligibility: NWA-based muralists                                │
│                                                                 │
│ ⚠ Source org "Downtown Rogers Partnership" not in ecosystem map │
│                                                                 │
│ [Approve & Create]  [Reject]  [View Details]                    │
└─────────────────────────────────────────────────────────────────┘

DECISION FLAGS (1)

┌─────────────────────────────────────────────────────────────────┐
│ DECISION FLAG  ·  Pending                       Feb 17, 2026    │
│                                                                 │
│ The Momentary — Residency Model Reconsideration                 │
│ Flagged by Anonymous                                            │
│                                                                 │
│ "Heard at an opening that the board is reconsidering whether    │
│ to shift residency focus from national to regional artists"     │
│                                                                 │
│ ✓ The Momentary is in ecosystem map                             │
│ ⚠ No existing decision entry for The Momentary residency       │
│                                                                 │
│ [Create Decision Entry]  [Dismiss]  [View Details]              │
└─────────────────────────────────────────────────────────────────┘

INVESTMENT VERIFICATIONS (1)
...
```

Key additions on cards:
- **Ecosystem map match indicator:** Does the source org or practitioner already exist? Green checkmark if yes, orange warning if no. This tells the practice team whether approving this will also require creating a new org/practitioner record.
- **Deduplication check:** Is there already an opportunity with a similar title or from the same org? "⚠ Similar: 'CACHE Creative Economy Micro-Grants' already listed" — prevents duplicate entries.
- **Contextual action labels:** "Approve & Create" for opportunities, "Create Decision Entry" for flags, "Update Records" for verifications, "Add to Ecosystem Map" for practitioner tips. The button should say what it does, not use a generic label.

### Interest Signals Tab

Different from Pending — these are informational, not gatekept:

```
INTEREST SIGNALS (3)                          Last 30 days

┌─────────────────────────────────────────────────────────────────┐
│ James Torres · Public Art + Fabrication                         │
│ Interested in: Community Art Commission - North Forest Trail    │
│ "This is exactly the type of site-specific work I do."         │
│                                                                 │
│ ✓ Matches ecosystem map: James Torres (Public Art + Fabrication)│
│                                                                 │
│ [Link to practitioner record]  [View opportunity]               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Alex Rivera · Sound Design                                      │
│ Interested in: CACHE Creative Economy Micro-Grants              │
│ No note                                                         │
│                                                                 │
│ ⚠ No match in ecosystem map                                    │
│                                                                 │
│ [Add to ecosystem map]  [View opportunity]                      │
└─────────────────────────────────────────────────────────────────┘
```

Interest signals show:
- Who expressed interest (name, discipline)
- Which opportunity
- Their note (if provided)
- Whether they match an existing ecosystem map practitioner
- Actions: link to existing record, or add as new practitioner, or just leave as signal

This is where the inline interest form feeds the practice team's intelligence. An unknown name expressing interest in a micro-grant is a new practitioner lead. A known practitioner expressing interest in a commission is a data point about their pipeline.

### Reviewed Tab

Shows previously processed submissions with their outcome:

```
┌─────────────────────────────────────────────────────────────────┐
│ OPPORTUNITY SUBMISSION  ·  Approved ✓           Feb 10, 2026    │
│                                                                 │
│ Performing Arts Residency at the Momentary                      │
│ Created: Performing Arts Residency → Opportunities              │
│                                                                 │
│ [View created entry]                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ DECISION FLAG  ·  Rejected                      Feb 8, 2026     │
│                                                                 │
│ Crystal Bridges Parking Expansion                               │
│ Reason: Infrastructure decision, doesn't structurally affect    │
│ the creative ecosystem.                                         │
└─────────────────────────────────────────────────────────────────┘
```

The Reviewed tab serves two purposes: audit trail (what came in and what happened to it) and pattern recognition (are most submissions from the same person? are most rejections the same type?).

---

## Detail Panel: The Review Workflow

When the practice team clicks "View Details" on a submission, the detail panel needs to support a full review workflow — not just display data.

### Opportunity Submission Detail

```
← Back to submissions

NWA Community Mural Project
OPPORTUNITY SUBMISSION  ·  Pending  ·  Feb 18, 2026

────────────────────────────────────────

Submitted Data

  Type: Commission
  Title: NWA Community Mural Project
  Source: Downtown Rogers Partnership
  Amount: $5,000 – $12,000
  Deadline: April 29, 2026
  Description: Downtown Rogers mural project. 3 walls
    available. Community input on themes.
  Eligibility: NWA-based muralists
  Application link: [none provided]

Submitter

  Sarah Chen
  sarah@downtownrogers.org
  Downtown Rogers Partnership

────────────────────────────────────────

Review

  ⚠ Source org "Downtown Rogers Partnership" not in
    ecosystem map. Approving will create the opportunity
    without an org link. Consider adding the org first.

  ⚠ No application link provided. May need to follow up
    with submitter for details.

  ✓ No similar opportunities found (deduplication check passed)

  EDIT BEFORE APPROVING
  [The submission fields should be editable here. The practice
  team can correct the amount, clean up the description, add
  a proper eligibility statement, or add an application URL
  before the opportunity enters the system.]

  Title: [NWA Community Mural Project                        ]
  Type:  [Commission ▾]
  Source org: [+ Create "Downtown Rogers Partnership" ▾]
  Amount min: [5000   ]  Amount max: [12000  ]
  Deadline: [2026-04-29]
  Description: [                                             ]
  Eligibility: [NWA-based muralists                          ]
  Application URL: [                                         ]

  [Approve & Create Opportunity]  [Reject]

  Rejection reason (if rejecting):
  [                                                          ]
```

The critical feature: **editable fields before approval.** Submissions come in messy. The practice team shouldn't have to approve raw data and then go edit the created record separately. Edit in the review panel, approve once, clean data enters the system.

### Decision Flag Detail

```
← Back to submissions

The Momentary — Residency Model Reconsideration
DECISION FLAG  ·  Pending  ·  Feb 17, 2026

────────────────────────────────────────

Flag Details

  Organization: The Momentary
  What's being decided: Board reconsidering whether to shift
    residency focus from national to regional artists.
  Approximate lock date: Unknown
  Context: "Heard at an opening that the board is
    reconsidering. Overheard a board member mention it to
    the festival director."

Flagged by: Anonymous (The Momentary)

────────────────────────────────────────

Review

  ✓ The Momentary exists in ecosystem map
  ⚠ No lock date provided — practice team needs to research
  ⚠ Source is anonymous/overheard — lower confidence signal

  CREATE DECISION ENTRY
  [Pre-populated with flag data, practice team fills gaps]

  Decision title: [The Momentary Residency Model Review      ]
  Stakeholder org: [The Momentary ▾]
  Description: [                                             ]
  Deliberation start: [           ]
  Deliberation end: [             ]
  Locks date: [                   ]
  Status: [Upcoming ▾]
  Intervention needed: [                                     ]

  [Create Decision Entry]  [Dismiss]

  Dismissal reason:
  [                                                          ]
```

### Interest Signal Detail

```
← Back to submissions

James Torres — Interest in North Forest Trail Commission
INTEREST SIGNAL  ·  Feb 19, 2026

────────────────────────────────────────

  Name: James Torres
  Email: james@example.com
  Discipline: Public Art + Fabrication
  Opportunity: Community Art Commission - North Forest Trail
  Note: "This is exactly the type of site-specific work I
    do. Happy to share my wayfinding project as reference."

────────────────────────────────────────

  ✓ Matches ecosystem map practitioner:
  ┌─ Practitioner ────────────────────────────────────────┐
  │ James Torres · Public Art + Fabrication                │
  │ 5 years in NWA · Commissions + fabrication contracts  │
  │ Risk: Commission pipeline inconsistent                │
  └────────────────────────────────────────────────────────┘

  This signal adds context: James is actively pursuing
  commission work, which aligns with his risk factor
  (inconsistent pipeline).

  [Link to practitioner record]  [View opportunity]
```

When an interest signal matches an existing practitioner, showing the practitioner card with their risk factors creates immediate analytical value. "James is looking for commissions" + "his pipeline is inconsistent" = the practice team now knows this opportunity matters for his retention.

---

## How Submissions Power the Database

The flow for each submission type:

```
OPPORTUNITY SUBMISSION
  Submit form → submissions table (JSONB) → Review queue
  → Practice team edits → Approve
  → Creates: opportunities record
  → Sets: submitted_externally = true
  → Sets: submissions.created_entity_id = new opportunity id
  → Sets: submissions.status = 'approved'

DECISION FLAG
  Submit form → submissions table → Review queue
  → Practice team adds analytical fields → Approve
  → Creates: decisions record
  → Sets: submissions.created_entity_id = new decision id
  → Sets: submissions.status = 'approved'

INVESTMENT VERIFICATION
  Verification form → submissions table → Review queue
  → Practice team reviews corrections → Approve
  → Updates: existing investment records
  → Creates: new investment records (if stakeholder added any)
  → Sets: submissions.status = 'approved'

INTEREST SIGNAL
  Inline form → submissions table (or opportunity_interests)
  → Interest Signals tab
  → Practice team links to practitioner or creates new one
  → Optional: creates practitioner record
  → Signal remains in interest tracking

PRACTITIONER TIP
  Submit form → submissions table → Review queue
  → Practice team researches → Approve
  → Creates: practitioners record
  → Sets: submissions.created_entity_id = new practitioner id
  → Sets: submissions.status = 'approved'
```

### Keeping the Database Clean

Three mechanisms:

**1. Editable review.** The practice team can modify every field before approving. Raw submission: "There's some art grants from CACHE." Cleaned entry: "CACHE Creative Economy Micro-Grants, $2,500–$10,000, deadline March 14, 2026." The submission table keeps the raw data. The created entity gets the clean data.

**2. Deduplication checks.** Before approving, the system checks for similar existing entries:
```sql
-- For opportunity submissions
SELECT id, title, source_name FROM opportunities
WHERE ecosystem_id = [ecosystem_id]
AND (
  title ILIKE '%' || [submitted_title_keywords] || '%'
  OR source_org_id = [matched_org_id]
);
```
Show matches in the review panel. If a duplicate exists, the practice team can dismiss the submission or merge the new data into the existing entry.

**3. Org resolution.** When a submission mentions an organization by name:
```sql
-- Try to match to existing org
SELECT id, name FROM organizations
WHERE ecosystem_id = [ecosystem_id]
AND name ILIKE '%' || [submitted_org_name] || '%';
```
If found: link the created entity to the existing org (set `source_org_id`).
If not found: warn the practice team. They can create the org first, then approve the submission. Or approve without an org link and create the org later.

**4. Audit trail.** The `submissions` table keeps the original submission data forever. `created_entity_id` links to what was created from it. `reviewed_by` and `reviewed_at` track who approved it and when. `review_notes` captures any editorial decisions. This means you can always trace a toolkit entry back to the submission that spawned it.

---

## Seed Data for Submissions

```sql
-- Opportunity submission (pending)
INSERT INTO submissions (ecosystem_id, submission_type, data, submitter_name, submitter_email, submitter_org, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'opportunity',
 '{"title": "NWA Community Mural Project", "type": "commission", "source": "Downtown Rogers Partnership", "amount_min": 5000, "amount_max": 12000, "deadline": "2026-04-29", "description": "Downtown Rogers mural project. 3 walls available. Community input on themes.", "eligibility": "NWA-based muralists"}',
 'Sarah Chen', 'sarah@downtownrogers.org', 'Downtown Rogers Partnership', 'pending'),

('a0000000-0000-0000-0000-000000000001', 'opportunity',
 '{"title": "Creative Economy Data Fellowship", "type": "fellowship", "source": "CACHE", "amount_min": 15000, "amount_max": 15000, "deadline": "2026-05-14", "description": "Research fellowship for data analysis on NWA creative economy. Access to CACHE practitioner census data and investment records.", "eligibility": "Researchers and data analysts interested in creative economy"}',
 'Marcus Johnson', 'marcus@cachenwarkansas.org', 'CACHE', 'pending');

-- Decision flag (pending)
INSERT INTO submissions (ecosystem_id, submission_type, data, submitter_name, submitter_org, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'decision_flag',
 '{"organization": "The Momentary", "what_being_decided": "Board reconsidering whether to shift residency focus from national to regional artists. Overheard at an opening — board member mentioned it to the festival director.", "approximate_lock_date": null, "context": "Anonymous tip. Lower confidence but worth investigating — aligns with broader institutional shift toward local engagement."}',
 NULL, 'The Momentary', 'pending');

-- Practitioner tip (pending)
INSERT INTO submissions (ecosystem_id, submission_type, data, submitter_name, submitter_email, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'practitioner_tip',
 '{"name": "Jordan Blake", "discipline": "Ceramics + Community Workshop Facilitation", "tenure": "Just moved to Fayetteville, about 6 months", "context": "Met Jordan at a CACHE event. They run community ceramics workshops and are looking to build a practice here. Previously based in Memphis.", "website": "https://jordanblakestudio.com"}',
 'David Kim', 'david@cachenwarkansas.org', 'pending');
```

---

## Schema: Interest Signal Storage

The inline interest form from the public opportunity page needs to flow into the submissions system. Two options:

**Option A: Use the `submissions` table.** Keep everything in one place:
```sql
INSERT INTO submissions (ecosystem_id, submission_type, data, submitter_name, submitter_email, status)
VALUES (
  [ecosystem_id],
  'interest_signal',
  '{"opportunity_id": "[id]", "opportunity_title": "[title]", "discipline": "[discipline]", "note": "[note]"}',
  [name],
  [email],
  'pending'
);
```
Advantage: one review queue for everything.
Disadvantage: interest signals are high-volume and don't need the same gatekeeping.

**Option B: Use the `opportunity_interests` table directly.** Interest signals bypass the submissions queue:
```sql
INSERT INTO opportunity_interests (opportunity_id, profile_id, notes)
VALUES ([opportunity_id], NULL, [note]);
```
But this requires a `profile_id` which the anonymous form doesn't have.

**Recommendation: Option A with separate tab.** Store in `submissions` with type `interest_signal`. Show in the Interest Signals tab, not the Pending tab. This keeps the practice team's review queue focused on submissions that need gatekeeping while still surfacing interest signals for analysis.

Add fields to the interest signal for non-profile submitters:
```sql
-- The submissions table already has submitter_name and submitter_email
-- The JSONB data field carries opportunity_id and discipline
-- No schema change needed
```

---

## Build Priority

1. **Add Interest Signals tab** to the Submissions page (separate from Pending)
2. **Add Reviewed tab** showing previously processed submissions
3. **Add ecosystem map match indicators** on cards (✓ org exists / ⚠ not found)
4. **Add deduplication warnings** on opportunity submission cards
5. **Make submission detail panel editable** — practice team can modify fields before approving
6. **Contextual action labels** — "Approve & Create Opportunity" not generic "Approve & Create"
7. **Build `/submit/flag` form** — decision flag submission
8. **Build `/submit/practitioner` form** — practitioner tip submission
9. **Wire inline interest form** to submissions table with type 'interest_signal'
10. **Build interest signal matching** — compare submitter name/email against ecosystem map practitioners
11. **Build investment verification form** at `/submit/verify` — pre-populated with org's investments
12. **Add `created_entity_id` linking** — when approving, store the ID of the created entity
13. **Add rejection reason field** — capture why a submission was dismissed

### For the Demo

Steps 1-6 and 9-10 are critical. The decision flag form (7), practitioner tip form (8), and investment verification form (11) are valuable but can be simulated with seed data in the Pending queue. The review workflow — seeing submissions, editing them, and approving clean data into the toolkit — is what needs to be functional.
