# Cultural Architecture Toolkit — Architecture

## What This Is

Two connected surfaces backed by one database:

1. **Practice Surface** — the analytical toolkit where the practice team tracks investments, decisions, precedents, opportunities, narratives, and practitioners across the NWA cultural ecosystem. Dark theme. Authenticated.

2. **Public Surface** — where creative workers find opportunities, build profiles, track engagements, and get paid. Where funders see verified practitioners and manage engagements. Light theme. Public browsing, auth for interaction.

The surfaces share a database. A completed engagement on the public surface automatically generates an investment entry in the practice toolkit. A preparation context written by the practice team appears on the public opportunity detail page. The more work flows through the platform, the more the toolkit knows.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, React 18) |
| Language | TypeScript 5 |
| Database | Supabase (PostgreSQL + RLS + Auth + Storage) |
| Styling | Tailwind CSS 3.4 + custom CSS properties |
| Charts | Recharts 3.7 |
| Auth | Supabase Auth (email + password for demo; magic links for production) |
| Deployment | Vercel |
| Fonts | DM Serif Display, DM Sans, JetBrains Mono |

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-side only
```

---

## Project Structure

```
toolkit/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (fonts, global CSS)
│   │   ├── page.tsx                      # Root redirect (→ /dashboard or /auth/login)
│   │   ├── globals.css                   # Design tokens + pub-theme styles
│   │   ├── (practice)/                   # Authenticated practice surface
│   │   │   ├── layout.tsx                # Auth check, sidebar, dark theme
│   │   │   ├── dashboard/page.tsx        # Overview: ecosystem stats, headlines
│   │   │   ├── ecosystem-map/page.tsx    # Organizations, contacts, practitioners
│   │   │   ├── investments/page.tsx      # Investment ledger with compounding chains
│   │   │   ├── decisions/page.tsx        # Decision calendar and interventions
│   │   │   ├── precedents/page.tsx       # Historical archive
│   │   │   ├── opportunity-tracker/page.tsx  # Internal opportunity management
│   │   │   ├── narratives/page.tsx       # Narrative vs. reality tracking
│   │   │   ├── outputs/page.tsx          # Intelligence layer (briefs, analyses)
│   │   │   ├── submissions/page.tsx      # Review queue for external submissions
│   │   │   └── settings/page.tsx         # Configuration
│   │   ├── opportunities/                # Public surface (light theme, no auth)
│   │   │   ├── layout.tsx                # pub-theme wrapper + metadata
│   │   │   ├── page.tsx                  # Public opportunity listing
│   │   │   └── submit/page.tsx           # External opportunity submission form
│   │   ├── auth/
│   │   │   ├── login/page.tsx            # Login (password + magic link)
│   │   │   ├── callback/route.ts         # OAuth callback handler
│   │   │   └── logout/route.ts           # Sign out
│   │   └── submit/
│   │       ├── flag/page.tsx             # Decision flag submission form
│   │       ├── practitioner/page.tsx     # Practitioner tip submission form
│   │       └── verify/page.tsx           # Verification forms for orgs/practitioners
│   ├── components/
│   │   ├── ui/                           # Reusable primitives (Button, Input, Badge, etc.)
│   │   ├── practice/                     # Practice surface components
│   │   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   │   ├── StatsBar.tsx              # Ecosystem stats bar
│   │   │   └── views/*View.tsx           # Page-specific view components
│   │   ├── contributor/                  # External verification forms
│   │   └── public/                       # Public surface components
│   │       ├── PublicOpportunities.tsx    # Card grid + filters + detail overlay
│   │       ├── OpportunitySubmitForm.tsx  # External submission form
│   │       ├── DecisionFlagForm.tsx       # Decision flag public form
│   │       └── PractitionerTipForm.tsx   # Practitioner tip public form
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts                 # Browser Supabase client
│       │   ├── server.ts                 # Server Supabase client (cookies)
│       │   ├── middleware.ts             # Auth middleware
│       │   └── types.ts                  # TypeScript types matching schema
│       └── utils/
│           ├── constants.ts              # Enum labels, status colors, thresholds
│           └── formatting.ts             # Currency, date, countdown helpers
├── schema.sql                            # ← Source of truth (root)
├── seed.sql                              # ← Full demo dataset (root)
└── reset.sql                             # ← Drop-everything script (root)
```

---

## Database Schema

### Source Files

| File | Purpose |
|------|---------|
| `schema.sql` | Complete DDL: enums, tables, indexes, views, RLS policies, functions, triggers, and minimal seed data |
| `seed.sql` | Comprehensive NWA prototype dataset (run after schema.sql) |
| `reset.sql` | Drops all objects for a clean rebuild |

### Enums

| Enum | Values |
|------|--------|
| `org_type` | foundation, government, cultural_institution, corporate, nonprofit, intermediary, education, media |
| `investment_status` | planned, active, completed, cancelled |
| `investment_category` | direct_artist_support, strategic_planning, public_art, artist_development, education_training, sector_development, institutional_capacity, infrastructure, programming, communications |
| `compounding_status` | compounding, not_compounding, too_early, unknown |
| `decision_status` | upcoming, deliberating, locked, completed |
| `opportunity_type` | grant, rfp, commission, project, residency, program, fellowship |
| `opportunity_status` | open, closing_soon, closed, awarded |
| `narrative_source_type` | institutional, regional_positioning, media_coverage, practitioner |
| `gap_level` | high, medium, low, aligned |
| `output_type` | directional_brief, orientation_framework, state_of_ecosystem, memory_transfer, field_note, foundational_text |
| `submission_status` | pending, approved, rejected |
| `user_role` | partner, project_lead, contributor |

### Tables

#### Core

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | Extends `auth.users` | id (FK → auth.users), full_name, role, email |
| `ecosystems` | Multi-ecosystem support | name, slug, description, region |

#### 1. Ecosystem Map

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `organizations` | Stakeholder entities | → ecosystems. Fields: name, org_type, mandate, controls, constraints, decision_cycle, website, notes |
| `contacts` | People at orgs | → organizations. Fields: name, title, role_description, is_decision_maker |
| `org_relationships` | Inter-org links | → organizations (org_a_id, org_b_id). Fields: relationship_type, strength |
| `practitioners` | Individual creatives | → ecosystems. Fields: discipline, tenure, income_sources, retention_factors, risk_factors, institutional_affiliations |

#### 2. Investment Ledger

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `investments` | Funding flows | → ecosystems, → organizations (source_org_id), → investments (builds_on_id, led_to_id), → precedents. Fields: initiative_name, amount, period, category, status, compounding, compounding_notes |

#### 3. Decision Calendar

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `decisions` | Upcoming/active decisions | → ecosystems, → organizations (stakeholder). Fields: decision_title, deliberation_start/end, locks_date, status, dependencies, intervention_needed, is_recurring |
| `decision_dependencies` | Decision → decision links | → decisions (decision_id, depends_on_id) |

#### 4. Precedent Archive

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `precedents` | Historical reference | → ecosystems, → investments. Fields: name, period, involved, what_produced, what_worked, what_didnt, connects_to, takeaway |

#### 5. Opportunity Layer

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `opportunities` | Available opportunities | → ecosystems, → organizations (source_org_id), → investments (awarded_investment_id), → profiles (submitted_by). Fields: title, opportunity_type, amount_min/max, deadline, eligibility, status |

#### 6. Narrative Record

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `narratives` | Story vs. reality | → ecosystems, → organizations (source_org_id). Fields: source_type, narrative_text, reality_text, gap, evidence_notes |

#### 7. Intelligence Layer

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `outputs` | Produced analysis | → ecosystems, → profiles (author), → organizations (target_stakeholder), → decisions (triggered_by). Fields: output_type, title, content, summary, is_published, file_url, file_type |
| `output_references` | Citations in outputs | → outputs. Fields: reference_type, reference_id, context_note |

#### Supporting

| Table | Purpose |
|-------|---------|
| `tags` | Shared tagging (sector, theme, geography) |
| `organization_tags` | Junction: org ↔ tag |
| `investment_tags` | Junction: investment ↔ tag |
| `opportunity_tags` | Junction: opportunity ↔ tag |
| `precedent_tags` | Junction: precedent ↔ tag |
| `submissions` | External submission review queue |
| `activity_log` | Audit trail |

### Views

| View | Purpose |
|------|---------|
| `stale_entries` | Entries overdue for review (orgs 90d, investments 60d, decisions 30d, opportunities 14d, practitioners 180d) |
| `ecosystem_stats` | Aggregate counts and totals per ecosystem |
| `upcoming_interventions` | Decisions that need action within 90 days |

### Row Level Security

- **Public (anon)**: Can read open/closing_soon opportunities and published outputs. Can insert submissions.
- **Authenticated**: Can read all tables. Can insert/update most tables. Profiles are self-managed.
- All tables have RLS enabled.

### Functions & Triggers

- `update_updated_at()` — Auto-updates `updated_at` on all tables that have it
- `handle_new_user()` — Auto-creates a profile row when a new auth user signs up

---

## Seed Data (NWA Prototype)

The `seed.sql` file loads a comprehensive demo dataset:

| Entity | Count | Notes |
|--------|-------|-------|
| Ecosystems | 1 | Northwest Arkansas |
| Organizations | 14 | Foundations, institutions, government, corporate, education, nonprofits |
| Contacts | 20 | Sample contacts with roles and decision-maker flags |
| Org Relationships | 15 | Funding, partnership, and governance links |
| Practitioners | 12 | Across disciplines with income, retention, and risk data |
| Investments | 18 | With compounding chains linked (builds_on_id ↔ led_to_id) |
| Decisions | 8 | With 4 dependency links between them |
| Precedents | 7 | Historical cases with lessons and investment links |
| Opportunities | 12 | 9 open/closing, 3 closed/awarded with investment links |
| Narratives | 8 | Institutional, media, practitioner, and regional positioning |
| Outputs | 3 | Directional brief, memory transfer, state-of-ecosystem |
| Tags | 16 | Sector (7), theme (6), geography (3) |
| Submissions | 4 | Review queue demo entries |
| Activity Log | 10 | Recent activity entries |

### UUID Convention

All seed UUIDs follow a predictable pattern for cross-referencing:

| Prefix | Entity |
|--------|--------|
| `a0000000-...` | Ecosystems |
| `b0000000-...-000000000001` through `...0014` | Organizations |
| `c0000000-...-000000000001` through `...0018` | Investments |
| `d0000000-...-000000000001` through `...0008` | Decisions |
| `e0000000-...-000000000001` through `...0003` | Outputs |
| `f0000000-...-000000000001` through `...0016` | Tags |

---

## Two Surfaces

### Practice Surface (Dark Theme)

Authenticated dashboard at `/(practice)/*`. Dark background (`#141414`), warm text (`#E8E4E0`). Uses Tailwind utility classes referencing CSS custom properties defined in `globals.css`.

Auth: Supabase auth with password + magic link. Middleware redirects unauthenticated users to `/auth/login`.

### Public Surface (Light Theme)

Unauthenticated at `/opportunities`. Light background (`#FAFAF7`), dark text (`#1A1A18`). Uses `.pub-theme` CSS class with dedicated custom properties. No Tailwind dark mode — standalone CSS.

RLS policy allows anon reads of open/closing_soon opportunities.

---

## Design Tokens

### Practice Surface (Dark)

```css
:root {
  --bg: #141414;
  --surface: #1A1A1A;
  --surface-inset: #111111;
  --border: #2A2A2A;
  --border-medium: #3A3A3A;
  --text: #E8E4E0;
  --muted: #999999;
  --dim: #666666;
  --accent: #C4A67A;
  --accent-glow: rgba(196, 166, 122, 0.06);
  --status-green: #5B8C5A;
  --status-red: #C45B5B;
  --status-blue: #5B7FC4;
  --status-orange: #C4885B;
  --status-purple: #8B5BC4;
}
```

### Public Surface (Light)

```css
.pub-theme {
  --pub-bg: #FAFAF7;
  --pub-surface: #FFFFFF;
  --pub-border: #E8E8E3;
  --pub-text: #1A1A18;
  --pub-muted: #6B6B66;
  --pub-accent: #C4A67A;
}
```

Same accent gold, same fonts. Different ground and text colors. The practice surface is warm-dark. The public surface is warm-light.

---

## Routing Logic

### Public Surface (`/opportunities`, `/submit/*`)
- No auth required to browse opportunities or submit forms
- Auth required to: create profile, express interest, access engagement workspace
- Server-rendered opportunity pages for SEO and shareability
- Light theme applied via layout

### Practice Surface (`/(practice)/*`)
- Auth required for all routes
- Redirect to `/auth/login` if not authenticated
- Practice team users only (role-gated in production)
- Dark theme applied via layout
- Sidebar navigation across all tools

### Auth Flow
1. User visits `/auth/login`
2. Creates account or signs in (email + password for demo)
3. On first login → redirect to `/profile` for profile creation
4. On subsequent login → redirect to `/opportunities` (or `/dashboard` if practice team)
5. Session persisted via Supabase cookie

---

## Database Reset Procedure

To nuke and rebuild:

1. Open Supabase Dashboard → SQL Editor
2. Run `reset.sql` (drops all objects)
3. Run `schema.sql` (creates everything + minimal seed)
4. Run `seed.sql` (loads full NWA prototype data)

Verify with:
```sql
SELECT COUNT(*) as orgs FROM organizations;
SELECT COUNT(*) as investments FROM investments;
SELECT COUNT(*) as opportunities FROM opportunities;
```

Expected: 14 orgs, 18 investments, 12 opportunities.

---

## Key Data Flows

### Opportunity Discovery → Interest Signal
```
Practitioner browses /opportunities
  → Clicks card → /opportunities/[id]
  → Sees preparation context + funder intelligence
  → Clicks "I'm applying" → interest record created
  → Applies externally via funder's process
  → Interest signal visible in practice surface
```

### Engagement Lifecycle
```
Opportunity awarded (practice team or funder records this)
  → Engagement created with scope, milestones, deliverables, payment terms
  → Practitioner and funder access shared workspace at /engagements/[id]
  → Milestones checked as completed
  → Deliverables submitted and accepted
  → Both parties confirm completion
  → Investment entry auto-created in practice toolkit
  → Practitioner profile updated with verified engagement
  → Opportunity status updated to 'awarded'
```

### Submission Flow
```
Anyone submits via /opportunities/submit, /submit/flag, or /submit/practitioner
  → submissions table (status: pending)
  → Practice team reviews in /submissions
  → Approved → entity created (opportunity, decision, or practitioner)
  → Appears in appropriate tool on the practice surface
```

---

## Component Design Patterns

### Inline Reference Cards
Used across both surfaces. A compact card with colored left border indicating entity type:
- Gold: Investment / Organization
- Blue: Decision
- Green: Opportunity
- Neutral/gray: Precedent
- Orange: Narrative
- Purple: Output

Each card shows: entity name, 1-2 key details, clickable. Used in "Across the Toolkit" sections and "Connects To" sections.

### Detail Panel (Practice Surface)
Slide-over panel on the right side. Consistent structure per tool:
1. Entity title + badges
2. Key fields (labeled, not under a generic heading)
3. Tool-specific sections (takeaway, intervention, dependencies, etc.)
4. "Across the Toolkit" — cross-tool connections
5. Record (created, reviewed, actions)

### Editorial Stats Pattern
Used on practice surface (dashboard, investment list, outputs, submissions):
"6 investments totaling $3.6M tracked across 6 organizations. 3 are compounding. 2 are not."
Sentence format, not stat cards.

---

## Build Phases

### Phase 1: Foundation + Public Surface (Complete)
- Database schema deployment
- Auth setup
- Public opportunities page (card grid, filters, summary)
- Opportunity submission form
- Practice surface layout + dashboard

### Phase 2: Practice Tools Redesign (Complete)
- Narratives: editorial stats, gap-coded cards, cross-tool detail panel
- Outputs: delivery tracking, creation workflow, reference browser, document upload
- Submissions: 3-tab review queue, ecosystem matching, public forms

### Phase 3: Engagement Loop (Future)
- Engagement workspace (milestones, deliverables, activity)
- Completion confirmation flow
- Engagement → investment auto-creation
- Funder interface

### Phase 4: Expanded Workforce (Future)
- Availability calendar on profiles
- Day-rate display
- Quick-book flow for short engagements
