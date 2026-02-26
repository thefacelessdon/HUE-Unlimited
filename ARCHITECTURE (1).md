# Cultural Architecture Toolkit — Technical Architecture

## Stack
- **Database**: Supabase (Postgres + Auth + Realtime + Storage)
- **Front-end**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Supabase Magic Links (passwordless)
- **Deployment**: Vercel
- **Email**: Resend (opportunity digest)

---

## Supabase Setup

### Project Configuration
1. Create new Supabase project
2. Run `schema.sql` in SQL Editor (creates all tables, enums, RLS policies, views, seed data)
3. Enable Email auth provider with magic link
4. Set site URL and redirect URLs in Auth settings
5. Copy project URL and anon key for `.env.local`

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Project Structure

```
toolkit/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout, providers
│   │   ├── page.tsx                      # Landing / redirect
│   │   │
│   │   ├── (public)/                     # PUBLIC SURFACE (no auth)
│   │   │   ├── layout.tsx                # Public header/footer
│   │   │   ├── opportunities/
│   │   │   │   ├── page.tsx              # Browse opportunities
│   │   │   │   └── [id]/page.tsx         # Opportunity detail
│   │   │   ├── outputs/
│   │   │   │   └── [id]/page.tsx         # Published brief/analysis
│   │   │   └── ecosystem/
│   │   │       └── [slug]/page.tsx       # Public ecosystem overview
│   │   │
│   │   ├── submit/                       # CONTRIBUTOR SURFACE (no auth)
│   │   │   ├── opportunity/page.tsx      # Submit an opportunity
│   │   │   ├── verify/page.tsx           # Verify investment data
│   │   │   ├── flag/page.tsx             # Flag a decision window
│   │   │   └── success/page.tsx          # Confirmation
│   │   │
│   │   ├── (practice)/                   # PRACTICE SURFACE (auth required)
│   │   │   ├── layout.tsx                # Sidebar nav, auth gate
│   │   │   ├── dashboard/page.tsx        # Overview: stats, stale items, upcoming interventions
│   │   │   ├── ecosystem-map/
│   │   │   │   ├── page.tsx              # Org list + practitioner list
│   │   │   │   ├── orgs/[id]/page.tsx    # Org detail (with inline related data)
│   │   │   │   └── practitioners/page.tsx
│   │   │   ├── investments/
│   │   │   │   ├── page.tsx              # Ledger list with filters + stats
│   │   │   │   └── [id]/page.tsx         # Investment detail
│   │   │   ├── decisions/
│   │   │   │   ├── page.tsx              # Calendar/timeline view
│   │   │   │   └── [id]/page.tsx         # Decision detail with dependencies
│   │   │   ├── precedents/
│   │   │   │   ├── page.tsx              # Archive list
│   │   │   │   └── [id]/page.tsx         # Full precedent entry
│   │   │   ├── opportunities/
│   │   │   │   ├── page.tsx              # Full opportunity management (inc. closed)
│   │   │   │   └── [id]/page.tsx         # Opportunity detail + editing
│   │   │   ├── narratives/
│   │   │   │   ├── page.tsx              # Narrative record list
│   │   │   │   └── [id]/page.tsx         # Narrative detail
│   │   │   ├── outputs/
│   │   │   │   ├── page.tsx              # All outputs (drafts + published)
│   │   │   │   ├── [id]/page.tsx         # Output detail
│   │   │   │   └── new/page.tsx          # Synthesis workspace
│   │   │   ├── submissions/
│   │   │   │   └── page.tsx              # Review queue for external submissions
│   │   │   └── settings/
│   │   │       └── page.tsx              # Ecosystem settings, team management
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx            # Magic link login
│   │   │   ├── callback/route.ts         # Auth callback handler
│   │   │   └── logout/route.ts           # Logout handler
│   │   │
│   │   └── api/                          # API routes
│   │       └── digest/route.ts           # Cron: weekly opportunity digest email
│   │
│   ├── components/
│   │   ├── ui/                           # Base components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── StatusDot.tsx
│   │   │
│   │   ├── forms/                        # Input forms
│   │   │   ├── OrganizationForm.tsx
│   │   │   ├── InvestmentForm.tsx
│   │   │   ├── DecisionForm.tsx
│   │   │   ├── PrecedentForm.tsx
│   │   │   ├── OpportunityForm.tsx
│   │   │   ├── NarrativeForm.tsx
│   │   │   ├── OutputForm.tsx
│   │   │   ├── PractitionerForm.tsx
│   │   │   └── QuickCapture.tsx          # Universal quick-add from anywhere
│   │   │
│   │   ├── practice/                     # Practice surface components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── StaleIndicator.tsx
│   │   │   ├── InlineReferences.tsx      # Shows related entries from other tools
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── SynthesisWorkspace.tsx    # Split-panel drafting view
│   │   │   └── MaintenanceDashboard.tsx
│   │   │
│   │   ├── public/                       # Public surface components
│   │   │   ├── PublicHeader.tsx
│   │   │   ├── OpportunityCard.tsx
│   │   │   ├── OpportunityFilters.tsx
│   │   │   ├── EcosystemOverview.tsx
│   │   │   └── OutputReader.tsx
│   │   │
│   │   └── shared/                       # Cross-surface components
│   │       ├── TagSelector.tsx
│   │       ├── OrgSelector.tsx
│   │       ├── DateRangePicker.tsx
│   │       ├── CompoundingBadge.tsx
│   │       ├── GapIndicator.tsx
│   │       └── AmountDisplay.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Browser Supabase client
│   │   │   ├── server.ts                 # Server Supabase client
│   │   │   ├── middleware.ts             # Auth middleware
│   │   │   └── types.ts                  # Generated types from schema
│   │   │
│   │   ├── queries/                      # Reusable data fetching
│   │   │   ├── organizations.ts
│   │   │   ├── investments.ts
│   │   │   ├── decisions.ts
│   │   │   ├── precedents.ts
│   │   │   ├── opportunities.ts
│   │   │   ├── narratives.ts
│   │   │   ├── outputs.ts
│   │   │   ├── stats.ts
│   │   │   └── submissions.ts
│   │   │
│   │   ├── hooks/                        # React hooks
│   │   │   ├── useEcosystem.ts           # Current ecosystem context
│   │   │   ├── useProfile.ts             # Current user profile
│   │   │   └── useRealtime.ts            # Supabase realtime subscriptions
│   │   │
│   │   └── utils/
│   │       ├── formatting.ts             # Currency, dates, etc.
│   │       └── constants.ts              # Enum labels, colors, etc.
│   │
│   └── styles/
│       └── globals.css                   # Tailwind imports + custom tokens
│
├── public/
│   └── ...
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Routing Logic

### Public Surface (`/opportunities`, `/outputs`, `/ecosystem`)
- No auth required
- Server-rendered for SEO
- Uses Supabase anon key (RLS allows public reads on opportunities + published outputs)
- Shareable URLs for everything

### Contributor Surface (`/submit/*`)
- No auth required
- Form-based, writes to `submissions` table
- Project lead reviews in practice surface
- Confirmation page with tracking

### Practice Surface (`/(practice)/*`)
- Auth required (magic link)
- Layout includes sidebar navigation across all 7 tools
- Dashboard is the home screen
- Quick capture accessible from every page (keyboard shortcut)

### Auth Flow
1. User goes to `/auth/login`
2. Enters email → receives magic link
3. Clicks link → `/auth/callback` exchanges token
4. Redirects to `/(practice)/dashboard`
5. Session persisted via Supabase cookie

---

## Key Data Flows

### Opportunity Lifecycle
```
Stakeholder submits via /submit/opportunity
  → submissions table (status: pending)
  → Project lead reviews in /submissions
  → Approved → opportunities table (status: open)
  → Visible on public /opportunities
  → Deadline passes → status: closed
  → Awarded → awarded_to filled, optional link to new investment entry
```

### Intelligence Output Flow
```
Decision calendar flags upcoming intervention
  → Partner opens synthesis workspace (/outputs/new)
  → Pins references: org profile, investment history, precedent, narrative
  → Writes brief in right panel
  → Saves as draft (is_published: false)
  → Reviews with team
  → Publishes → shareable link generated (/outputs/[id])
  → Shared with stakeholder via email or meeting
```

### Investment Data Verification
```
Project lead creates initial entries from public sources
  → Partner sends stakeholder verification link (/submit/verify?org=xxx)
  → Form shows pre-populated data from investments table
  → Stakeholder confirms, corrects, or adds
  → Submission enters review queue
  → Project lead approves → updates investments table
```

---

## Component Design Patterns

### Inline References
Every detail page shows related entries from other tools in a sidebar or bottom section:
- Org detail → their investments, decisions, opportunities, narrative entries
- Investment detail → source org, related precedent, compounding chain
- Decision detail → stakeholder org, dependencies, relevant investments and precedents
- Precedent detail → related investments, connected precedents

### Quick Capture (Cmd+K)
Universal input accessible from any practice surface page:
1. Select tool type (opportunity, investment, decision, etc.)
2. Fill required fields (2-4 fields max)
3. Save → enters system, can be enriched later
4. Keyboard-first for speed

### Staleness System
Every entity with `last_reviewed_at`:
- Visual indicator (subtle when fresh, prominent when stale)
- "Mark as reviewed" button that updates timestamp
- Maintenance dashboard groups stale items by tool
- Staleness thresholds: orgs 90d, investments 60d, decisions 30d, opportunities 14d

---

## Design Tokens (Tailwind)

```
colors:
  surface:    #0F0F0F (bg)
  card:       #1A1A1A
  border:     #2A2A2A
  text:       #E8E8E8
  muted:      #999999
  dim:        #666666
  accent:     #C4A67A (warm gold)
  accentDim:  #8B7355

status:
  green:      #5B8C5A (compounding, open, active)
  red:        #C45B5B (not compounding, high gap, closing)
  blue:       #5B7FC4 (upcoming, in progress)
  orange:     #C4885B (deliberating, closing soon, medium gap)
```

---

## Build Order for Prototype

### Sprint 1 (Week 1-2): Foundation
- [ ] Supabase project + schema deployment
- [ ] Next.js project scaffold with Tailwind
- [ ] Auth flow (magic link login/logout)
- [ ] Base UI components (Card, Button, Input, Badge, StatusDot, Table)
- [ ] Supabase client setup (browser + server)
- [ ] Type generation from schema
- [ ] Practice surface layout (sidebar, header, auth gate)
- [ ] Public surface layout (header, footer)

### Sprint 2 (Week 2-3): Core Tools
- [ ] Dashboard with ecosystem stats + stale items + upcoming interventions
- [ ] Ecosystem map: org list, org detail with inline references
- [ ] Investment ledger: list with filters and summary stats
- [ ] Decision calendar: timeline view with status indicators
- [ ] Opportunity layer: public browse + practice management
- [ ] CRUD forms for all entity types

### Sprint 3 (Week 3-4): Advanced Features
- [ ] Precedent archive: list + full entry view
- [ ] Narrative record: list with gap indicators
- [ ] Quick capture (Cmd+K)
- [ ] Submission flows (opportunity submission, investment verification)
- [ ] Submission review queue
- [ ] Output drafting (basic version of synthesis workspace)

### Sprint 4 (Week 4-5): Polish
- [ ] Inline references across all detail pages
- [ ] Activity feed
- [ ] Staleness indicators throughout
- [ ] Public ecosystem overview page
- [ ] Published output reader view
- [ ] Mobile responsiveness for public + contributor surfaces
- [ ] Email digest setup (Resend)

---

## What This Doesn't Cover Yet
- Practitioner survey flow
- Subscription management for opportunity digest
- Advanced pattern detection / automated flagging
- Export functionality
- Multi-ecosystem switching (schema supports it, UI deferred)
- Full synthesis workspace (Phase 4 from design doc)
