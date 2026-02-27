# HUE UNLIMITED — MASTER SITE BRIEF

**For:** Claude Code / Developer Handoff
**Date:** February 2026
**Status:** Build-ready

---

## 0. THE MANDATE

Build a website that could win Awwwards Site of the Day.

The work to get there: Spotify Frequency. Disney/Pixar Soul. Red Bull Camp. Death Row Records. Anderson .Paak. Machine Gun Kelly. Two Telly Awards. 250 million video views. Six global regions.

The site's only job is to let that land — and convert a brand director or creative director into a conversation.

**The single design principle:** The work IS the argument. Every design decision should serve the work's legibility, not compete with it.

---

## 1. CONCEPT — "The Living Archive"

HUE's value proposition is **memory** — they stay embedded, accumulate context, and compound creative knowledge over time. An agency relationship resets. HUE's grows.

The site should feel like that. Like you're moving through a body of work that's been building — not a pitch deck, but evidence. Film textures, real photos, real campaigns, real results. The aesthetic of something that's been lived in, not rendered.

This is not a metaphor to explain to visitors. It's just how the site feels.

---

## 2. TECHNICAL STACK

| Decision | Choice |
|---|---|
| Framework | Next.js (current) — React + App Router |
| Animation | GSAP + ScrollTrigger for scroll-driven animations |
| Fonts | Google Fonts — Montserrat ExtraBold (display), Helvetica Neue (body), Roboto (labels/metadata) |
| 3D | None — performance over spectacle |
| Target load | Under 2s desktop, under 3.5s mobile |
| Mobile | Fully responsive. Interactions gracefully degrade. |

---

## 3. BRAND SYSTEM

### 3.1 Colors

```css
--black:    #000000   /* Background. Always. */
--white:    #ffffff   /* Primary text */
--yellow:   #ffff00   /* Accent. Buttons, labels, highlights. Use sparingly. */
--red:      #ff0000   /* Gradient primary */
--blue:     #0000ff   /* Gradient primary */
--muted:    rgba(255,255,255,0.36)   /* Secondary text */
--border:   rgba(255,255,255,0.09)   /* Dividers */
--dim:      rgba(255,255,255,0.07)   /* Subtle backgrounds */
```

### 3.2 Gradient System (HUE POLYCHROMATIC)

The gradient is HUE's visual signature. Rules:

- Always on black background
- **Maximum 25% of any composition** — it's an accent, not a fill
- Always built from the primary triad: Red → Yellow → Blue
- Appears as a soft, blurred color bloom — never a sharp gradient line
- Bleeds in from corners or bottom edges
- Think: **aurora, not rainbow**

```css
/* Standard corner bloom */
background: radial-gradient(ellipse at bottom right,
  rgba(255,200,0,0.65) 0%,
  rgba(255,60,0,0.45) 25%,
  rgba(0,0,255,0.3) 55%,
  transparent 75%
);
filter: blur(48px);
opacity: 0.45;

/* Full-width base band (hero/CTA sections) */
background: linear-gradient(105deg,
  rgba(255,0,0,0.75) 0%,
  rgba(255,100,0,0.65) 16%,
  rgba(255,200,0,0.75) 30%,
  rgba(0,160,255,0.5) 60%,
  rgba(0,0,255,0.75) 80%
);
filter: blur(52px);
opacity: 0.42;
```

### 3.3 Typography

**Display (H1, H2, large callouts)**
- Font: Montserrat ExtraBold
- Size range: 48px–200px (fluid via `clamp`)
- Letter-spacing: 0.02–0.04em
- Line-height: 0.88–0.92
- Treatment options:
  - Filled white
  - Outlined white: `-webkit-text-stroke: 1.5px #fff; color: transparent`
  - Outlined yellow: `-webkit-text-stroke: 1.5px #ffff00; color: transparent`
  - Mix filled + outlined in same headline for hierarchy

**Body**
- Font: Helvetica Neue
- Weight: 300 (body), 600 (emphasis)
- Size: 14–16px
- Line-height: 1.72
- Color: `rgba(255,255,255,0.50)` default; white for emphasis

**Labels / Metadata**
- Font: Roboto
- Weight: 300–400
- Size: 9–11px
- Letter-spacing: 0.14–0.22em
- Text-transform: uppercase always
- Color: `var(--yellow)` for active labels; `var(--muted)` for secondary

### 3.4 Spacing

| Token | Value |
|---|---|
| Base unit | 8px |
| Section padding (desktop) | 104–128px vertical, 48px horizontal |
| Section padding (mobile) | 64px vertical, 24px horizontal |
| Max content width | 1440px, centered |

### 3.5 Logo

The HUE logotype (fluid "hue" wordmark with the blob "H"):
- White on dark backgrounds
- Never stretched, rotated, or recolored outside brand palette
- In nav: approximately 28px height

### 3.6 Component Styles

**Buttons:**
- **Primary:** background `#ffff00`, color `#000`, Roboto 11px, tracking 0.10em, uppercase, padding 14px 32px, no border-radius
- **Ghost:** transparent bg, white border 1px `rgba(255,255,255,0.25)`, white text, same sizing

**Labels:**
- Yellow bar + Roboto uppercase — always preceded by a 24px yellow line
- Example: `——— WHAT WE DO`

**Dividers:** 1px `rgba(255,255,255,0.09)` — full-width

**Cards:** No border-radius. Flat black background. Border: 1px `var(--border)`. Hover: border brightens to `rgba(255,255,255,0.2)`

---

## 4. SITE ARCHITECTURE

**Single-page scroll. Section order:**

```
[1] HERO
[2] TICKER
[3] CLIENT LOGOS — immediate proof
[4] WORK — the heart. Horizontal scroll with film reel framing.
[5] WHAT WE DO — proposition + services
[6] SYSTEMS — operational depth
[7] HOW IT WORKS — two tiers
[8] CTA
[FOOTER]
```

**Secondary pages (separate routes):**
- `/work/frequency` — Spotify Frequency case study
- `/work/soul` — Disney/Pixar Soul case study
- `/work/redbull` — Red Bull Camp case study
- `/archives` — The polaroid/film archive

---

## 5. SECTION SPECIFICATIONS

### [1] HERO

**Concept:** Minimal. Type-led. The gradient lives at the bottom ~25% of the viewport. The headline is the whole experience. No imagery. Let the type and the gradient do everything.

**Layout:**
- Full viewport height
- Gradient bloom from bottom edge
- Top: nav + two small metadata items (left: eyebrow, right: aside)
- Bottom: headline fills the bottom 60% of viewport
- Far bottom: subhead left, "SCROLL" right

**Content:**

| Element | Text | Style |
|---|---|---|
| Eyebrow (top left) | HUE Unlimited — A 21st Century Creative Studio | Roboto, yellow |
| Aside (top right) | Embedded → Retained → Compounding | Roboto, muted |

**Headline** (Montserrat ExtraBold, massive, bottom-anchored):

```
WE DON'T
LEARN YOUR
BRAND.
WE BECOME
PART OF IT.
```

Treatment: Lines 1–3 white filled. "BRAND." outlined white. Lines 4–5: "WE BECOME" white filled, "PART OF IT." outlined yellow.

**Subhead:**
> The embedded creative partner for brands that produce at volume and can't afford to lose the thread.

**Animation:**
- Headline: characters develop from grain/noise on load (darkroom effect — CSS `filter: contrast + blur` collapsing to sharp). One time. Hero only. ~1.2s.
- Subhead: fade up, 0.6s delay after headline
- Gradient: slow pulse — opacity cycles 0.38 → 0.48 → 0.38 over 6s loop
- On scroll: headline translates up slightly (parallax, subtle)

---

### [2] TICKER

Continuous horizontal scroll. Slightly faster (20s loop).

```
Brand Campaigns · Content Production · Creative Direction · Social Strategy ·
Brand Identity Systems · Event Creative · Visual Language · Packaging + Product ·
Program Development · Experiential Production · Artist Commerce
```

---

### [3] CLIENT LOGOS

> One of the most powerful trust signals on any service business site. A buyer sees Spotify, Disney, Red Bull in the first scroll and the whole rest of the site reads differently.

**Layout:**
- Label: "TRUSTED BY"
- Single row, horizontally centered
- Logos: **Spotify · Disney · Red Bull · Death Row Records · Amazon · Vans · Hot Topic · Gamma**
- All logos white (inverted/desaturated)
- Subtle fade: opacity 0.5 default, 0.8 on hover
- No border, no background — just logos floating on black
- On mobile: two rows

> **Note:** Logo assets will need to be sourced/supplied. Build with text placeholders if assets aren't ready; the structure must be there.

---

### [4] WORK — THE HEART

**Concept:** The film reel. Horizontal scroll section. Frames inspired by "HUE ARCHIVA 400" film photography. This is the most technically ambitious section and the one most likely to earn Awwwards recognition.

**Layout:**
- Full viewport height, sticky-pinned
- Horizontal scroll driven by vertical scroll (GSAP ScrollTrigger)
- Left column (fixed): section label + current project metadata
- Right: horizontal track of work cards sliding left

**Film Strip Container:**
- Top and bottom film strip perforations (CSS squares, evenly spaced)
- Frame metadata: `► 01 HUE ARCHIVA 400 [CLIENT NAME]`
- Cards: slightly irregular heights — contact sheet feel

**Work Cards — 5 total:**

#### Card 01 — Spotify · Frequency *(featured — wider)*
- Background: Deep black with yellow-red gradient bloom
- Large text behind: "FREQUENCY" at 10% opacity
- Client pill: `Spotify · Embedded Partner`
- Title: `CO-BUILT FREQUENCY VIA STORYTELLING.`
- Stats: `#1 Black Music Destination · 2.1M Followers · 250M Video Views · 6 Regions · 2× Telly Awards`
- Tags: `Global Brand Building · Creative Direction · Content · Social`
- Hover: Archive photo surfaces, lifts slightly, slight rotation (2–3°)
- Click → `/work/frequency`

#### Card 02 — Disney · Made With Soul
- Background: Rich purple-to-black gradient
- Large text behind: "SOUL" at 8% opacity
- Client pill: `Disney / Pixar · Brand Extension`
- Title: `TOOK SOUL BEYOND THE SCREEN.`
- Stats: `80+ SKU Catalog · Disney Parks OOH · Amazon Storefront · Gold Telly Winner`
- Tags: `Brand Identity · Product Design · Campaign Rollout · Evergreen Programs`
- Click → `/work/soul`

#### Card 03 — Red Bull · Camp
- Background: Red bloom, bottom right
- Large text behind: "CAMP" at 8% opacity
- Client pill: `Red Bull · Music Residency`
- Title: `CURATED TALENT OF THE NEXT GENERATION.`
- Stats: `10 Rising Creators · 30+ Content Assets · Collaborative EP Executive Produced`
- Tags: `Experiential · Content Production · Program Development`

#### Card 04 — Death Row / Gamma · Jane Handcock
- Background: Warm amber bloom
- Client pill: `Death Row × Gamma · Artist Rollout`
- Title: `SHAPED THE NEW ERA OF DEATH ROW.`
- Stats: `25M+ Video Views · #2 R&B Radio · Top 20 Mediabase · 1M+ Monthly Listeners`
- Tags: `Artist Branding · 360 Campaign · Social · Creative Direction`

#### Card 05 — Artist Commerce
- Background: Blue bloom
- Client pill: `Anderson .Paak · MGK · Snoop Dogg`
- Title: `MADE COMMERCE FEEL LIKE CULTURE.`
- Stats: `Full Brand Systems · Vans · Hot Topic · Amazon · Touring Retail`
- Tags: `Artist Commerce · Retail · Brand Systems`

**Section CTA:** `SEE ALL WORK →` — Montserrat ExtraBold, outlined yellow.

**Mobile fallback:** Vertical stack. Film strip simplified to top/bottom strips. Standard vertical scroll.

---

### [5] WHAT WE DO

**Layout:** Two-column grid. Left: headline + body. Right: service list.

**Label:** `WHAT WE DO`

**Headline:**
```
AGENCY RANGE.
IN-HOUSE
MEMORY.
```
Treatment: "AGENCY RANGE." white filled. "IN-HOUSE" white outlined. "MEMORY." yellow outlined.

**Body:**
> You're past the phase where one person does everything. But you're not ready — or willing — to build and carry a full in-house team.
>
> Most brands in that position end up with one of two problems: an agency that relearns them on every engagement, or freelancers they're managing themselves. Either way, the creative director becomes the project manager.
>
> HUE is the third option. A standing creative layer — embedded in your brand, retained for ongoing work, scaling up when the work demands it. The longer we work together, the faster and sharper it gets.

**Service list (right, bordered list with hover):**

```
01 — Brand Campaigns & Creative Direction
02 — Content Production — Video, Photo, Digital
03 — Social Strategy & Execution
04 — Event Creative & Experiential
05 — Brand Identity & Visual Systems
06 — Packaging & Product Creative
07 — Program Development & Management
08 — Artist Commerce & Retail
```

---

### [6] SYSTEMS

**Label:** `HUE SYSTEMS`

**Headline:**
```
THE INFRA-
STRUCTURE
BEHIND THE
WORK.
```

**Body:**
> An embedded relationship only works if there's a system underneath it. These are the structures that make it run — for every client, from week one.

**Systems list (interactive, with hover typewriter effect):**

| # | System | Description | Access |
|---|---|---|---|
| 01 | Brand Immersion Protocol | How we absorb a brand before we make anything | PUBLIC |
| 02 | Embedded Operating Model | What the retainer looks like, day to day | PUBLIC |
| 03 | Creative Brief Framework | The brief structure we run on every project | CLIENTS ONLY |
| 04 | Talent Network & Capacity Model | How we scale without fixed overhead | CLIENTS ONLY |
| 05 | Monthly Value Report | How we keep the partnership visible | CLIENTS ONLY |

**Hover behavior:**
- Row slides right 6px
- System name brightens to white
- Arrow turns yellow
- Description types out character by character (~300ms)
- CLIENTS ONLY rows: description types then gets replaced with `— — — — — — — — —`

---

### [7] HOW IT WORKS

**Label:** `HOW IT WORKS`

**Headline:** `TWO WAYS IN. ONE THAT STICKS.`

**Card 1 — FEATURED (yellow background)**
- Tag: `Tier 1 — The core model`
- Name: `EMBEDDED PARTNERSHIP`
- Body: A retained HUE team inside your brand. Dedicated creative lead. Ongoing access to our production network. Weekly syncs. The longer it runs, the better it gets.
- Details:
  - Monthly retainer with defined capacity tiers
  - Dedicated creative lead — single point of contact
  - Full production network, scaled to demand
  - Weekly syncs + quarterly reviews
  - 3–6 month minimum

**Card 2 — Ghost (dark)**
- Tag: `Tier 2`
- Name: `PROJECT ENGAGEMENT`
- Body: Scoped work with defined deliverables and a fixed fee. The right entry point if you want to see the work before committing to a retainer. Most project clients do.
- Details:
  - Fixed fee based on scope
  - Clear timeline from the start
  - Natural on-ramp to Tier 1

---

### [8] CTA

**Concept:** Full-bleed. Gradient band runs the full bottom — maximum allowed per brand guide. Type is massive. Almost uncomfortably large.

**Label:** `READY WHEN YOU ARE`

**Headline:**
```
STOP
STARTING
FROM SCRATCH.
```
Treatment: "STOP" white filled. "STARTING" white outlined. "FROM SCRATCH." yellow outlined.

**Sub:**
> Tell us what you're building. If there's a fit, you'll know from the first conversation.

**Buttons:**
- `[Start a conversation →]` (primary)
- `[See the work first]` (ghost)

**Process note** (small, Roboto uppercase, muted):
> We respond within 48 hours. First call is 30 minutes — no decks, no pitch.

**Animation:** On section enter, gradient sweeps left → right (1.2s). Type fades up sequentially.

---

### [FOOTER]

Minimal.
- Left: HUE wordmark
- Center: nav links
- Right: email + socials
- Bottom: `© 2026 HUE Unlimited · creative@hueunlimited.com`

---

## 6. INTERACTION SPEC

### 6.1 Custom Cursor

| State | Behavior |
|---|---|
| Default | Small yellow dot (7px, `#ffff00`) + follower ring (28px, 1px border `rgba(255,255,0,0.3)`, ~0.12 lerp lag) |
| Work section | Dot grows to 12px, ring becomes circular viewfinder with crosshair |
| Card hover | Ring scales to 48px, text "VIEW →" appears (Roboto uppercase, 8px) |
| Links/buttons | Dot disappears, ring shrinks to button size as highlight |

Implementation: `requestAnimationFrame` lerp for ring. CSS transition for state changes.

### 6.2 Scroll Behavior

**Work section (Section 4):**
- GSAP ScrollTrigger
- Pin section for duration of horizontal travel
- `scrub: 1` (smooth, tied to scroll speed)
- Progress indicator: thin yellow line at bottom, fills as user scrolls through

**All other sections:**
- IntersectionObserver for reveal animations
- `threshold: 0.08`
- Elements: `opacity 0 → 1`, `translateY 24px → 0`
- Staggered: 60ms between elements in a group

### 6.3 Gradient Scroll Behavior

The gradient shifts hue as the user scrolls:
- **Hero:** Red → Yellow → Blue (standard)
- **Work section:** adapts to current card's color world
- **CTA:** Full spectrum sweep, maximum intensity

Implementation:
- CSS custom property `--gradient-progress` set by scroll position via JS
- Gradient parameters interpolated between sections
- Performance: use `will-change: background` on affected elements

### 6.4 Work Card Photo Hover

Desktop only:
- Hover work card → archive photo surfaces from behind
- Photo appears with slight lift (`translateY -8px`) and micro-rotation (2–3°)
- Feels like picking up a print from a lightbox
- CSS: `transform` + `filter` (slight grain via SVG filter)
- Fades out on mouse leave

### 6.5 Systems Typewriter

```js
function typeOut(targetEl, text, speed = 28) {
  targetEl.textContent = '';
  [...text].forEach((char, i) => {
    setTimeout(() => targetEl.textContent += char, i * speed);
  });
}
```

CLIENTS ONLY rows: type full description, then after 400ms delay, replace with `— — — — — — — — —` character by character.

### 6.6 Hero Type Development Effect

Used ONCE. Hero headline only. On page load.

```css
/* Starting state */
.hero-headline {
  filter: blur(8px) contrast(0.3);
  opacity: 0.4;
}

/* End state */
.hero-headline {
  filter: blur(0) contrast(1);
  opacity: 1;
  transition: filter 1.2s ease, opacity 1.2s ease;
}
```

Add a grain overlay that fades out simultaneously. Feels like a photo developing.

---

## 7. COPY SYSTEM

### Tone Rules

1. Never explain what the buyer already knows
2. Specificity over claims — numbers and named clients beat adjectives
3. Short sentences. Let silence work.
4. Cultural fluency shown, not stated
5. Every line earns the next scroll or it's cut

### Forbidden Phrases

- "We believe in..."
- "Our passion for..."
- "Bringing your vision to life"
- "Best-in-class"
- Any sentence interchangeable with a competitor's site

### Voice in Practice

**Strong:**
> "Spotify needed a brand, not a playlist. We helped build Frequency from the ground up."
> "Disney needed culture, not content. We built Made With Soul."
> "The work gets better the longer we're in. That's the model."

**Weak (cut):**
> ~~"We are a full-service creative studio passionate about culture..."~~
> ~~"Our award-winning team delivers..."~~
> ~~"We partner with brands to create meaningful experiences..."~~

---

## 8. CASE STUDY COPY

### Spotify · Frequency

**One line:** Helped build Frequency from scratch. Now it's the #1 destination for Black music on Spotify.

**Card stats:** `#1 Black Music Destination · 2.1M Followers · 250M+ Video Views · 6 Global Regions · 2× Telly Awards`

**Expanded** (for `/work/frequency`):

> Spotify needed more than a playlist. They needed a brand that could move with Black music culture across genres, generations, and geographies — and keep its voice consistent from Lagos to Los Angeles.
>
> HUE built Frequency from the architecture up. Brand system. Creative engine. Social strategy. Original content formats. Talent partnerships. 20+ franchises. All of it running simultaneously across 6 regions, all of it sounding like one thing.
>
> Three years in, it's the #1 global destination for Black music on Spotify. 250 million video views. 2.1 million on-platform followers. A Silver Clio Award & A Telly Award.
>
> That's what it looks like when a creative partner stays in.

### Disney/Pixar · Made With Soul

**One line:** Cultural IP lives beyond the screen when it's rooted in real community. We proved it with Disney Pixar Soul.

**Card stats:** `80+ SKU Catalog · Disney Parks OOH Takeover · Amazon Storefront · Gold Telly Winner`

**Expanded:**

> Disney and Pixar had a film about the soul of creativity. They needed that to mean something in the real world — not just merchandise, but a movement rooted in actual artists and communities.
>
> HUE built Made With Soul: a first-of-its-kind brand extension that sourced from real artists, developed original products, launched across Amazon and Disney Parks, and created a style guide and brand system that could run for years.
>
> 80+ SKUs. OOH across Disney Parks and Resorts. A Gold Clio Award.
>
> Proof that the right creative partner doesn't just execute IP — they extend it.

### Red Bull · Camp

**One line:** A residency that went beyond surface-level content and into real creator development.

**Card stats:** `10 Rising Creators · 30+ Original Assets · Collaborative EP · Long-term Brand Positioning`

### Death Row × Gamma · Jane Handcock

**One line:** We helped shape what the new era of Death Row looks and sounds like.

**Card stats:** `25M+ Video Views · #2 R&B Radio · Top 20 Mediabase · 1M+ Monthly Listeners`

### Artist Commerce · Anderson .Paak, MGK, Snoop Dogg

**One line:** When creators have the right tools, commerce becomes culture.

**Card stats:** `Snoop Dogg · Anderson .Paak · Machine Gun Kelly · Vans · Hot Topic · Amazon`

---

## 9. ARCHIVE PAGE (`/archives`)

Secondary destination — cultural artifact, not primary conversion path.

**Concept:** The Archiva 400 contact sheet. A grid of polaroids and film photos from HUE's body of work. Black background. Photos arranged slightly off-grid — irregular spacing and subtle rotation (±2°), like they've been laid out on a table.

**Interactions:**
- Hover: photo lifts, straightens, brightens slightly
- Click: lightbox / fullscreen view
- Shuffle button (top right): re-randomizes positions with fluid animation

**Header:** `THE ARCHIVES` — Montserrat ExtraBold, centered, 48px
**Sub:** `HUE Archiva 400 · Ongoing` — Roboto uppercase, centered, muted

> This page is designed to go viral on design Twitter / Instagram. Shareable. Beautiful. Should feel like a digital zine, not a portfolio grid.

---

## 10. ASSETS NEEDED

The following assets are needed to complete the build. Use placeholders until supplied.

| Asset | Source | Priority |
|---|---|---|
| HUE logotype (SVG) | Brand guide | HIGH |
| HUE icon (SVG, all colorways) | Brand guide | HIGH |
| Spotify Frequency campaign photos | Archive | HIGH |
| Disney Soul Made With Soul campaign photos | Archive | HIGH |
| Red Bull Camp photos | Archive | MEDIUM |
| Jane Handcock campaign photos | Archive | MEDIUM |
| Artist commerce product photos | Archive | MEDIUM |
| Archive polaroid/film photos (30–50) | Archiva 400 folder | HIGH |
| Client logos (Spotify, Disney, Red Bull, Death Row, Amazon, Vans, Hot Topic, Gamma) | Sourced | HIGH |
| Comba Bold Extra Wide font (licensed) | Font license | MEDIUM |
| Harabara Mais Black font (licensed) | Font license | MEDIUM |

> **Note:** Comba + Harabara Mais are the brand's actual display fonts. Google Fonts proxy (Montserrat ExtraBold) used in build until licensed fonts are supplied. Headline sizes may need adjustment when swapped.

---

## 11. PERFORMANCE + ACCESSIBILITY

- All images: WebP, lazy loaded, `width`/`height` defined to prevent layout shift
- GSAP ScrollTrigger: killed on mobile for film strip (replaced with vertical scroll)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` — all transitions cut to 0.1s, parallax disabled
- Color contrast: all body text passes WCAG AA minimum
- Keyboard navigation: all interactive elements focusable, focus ring visible
- Alt text: all images described

---

## 12. SUCCESS CRITERIA

The site succeeds if:

1. A brand director lands on it and within **10 seconds** understands: this studio has worked with Spotify, Disney, and Red Bull at the highest level
2. Within **60 seconds** they understand: this is the embedded model, and it's different from an agency
3. Within **90 seconds** they either click "Start a conversation" or start scrolling through the work because they want to
4. The work section makes them stop and show someone else
5. It gets submitted to Awwwards and wins SOTD

---

## 13. STRATEGIC NOTES

### On the Archive

The film photos, polaroids, Archiva 400 footage — that's not a distraction. That is the proof. The R&B speaker photo, the Spotify set, Tzsah, Umi — those images say in one frame what no headline can say: HUE has been in the room, consistently, with real artists and real brands, over time. That's the embedded model made visible.

The mistake would be putting it in a separate `/archives` page a buyer never reaches. The opportunity is making it the **texture of the work section itself** — so when a buyer is evaluating HUE, they're moving through actual evidence, not placeholder cards.

### What Makes a Site Awwwards-Worthy

Three things separate a site-of-the-day from a good studio site:

1. **A concept that ties everything together** — not just good design, but a reason the design works the way it does
2. **One genuinely unexpected moment** — usually in the hero or a major transition. Something that makes you stop and show someone else
3. **Interactions that serve the content** — not gimmicks. The interaction IS how you browse the work.

### The Gradient as Narrative Device

The gradient shifts as you scroll — HUE literally changes hue as you move down the page. The polychromatic gradient slowly rotates through the spectrum as the user scrolls. Red at arrival, through the spectrum, back to deep blue at contact. Conceptually tight. Technically achievable. Memorable.

---

*End of brief. Ready for build.*
*Questions: creative@hueunlimited.com*
