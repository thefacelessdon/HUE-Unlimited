# HUE Unlimited — Master Site Brief

**For:** Claude Code / Developer Handoff  
**Date:** February 2026  
**Status:** Build-ready

---

## 0. The Mandate

Build a website that could win Awwwards Site of the Day.

The work to get there: Spotify Frequency. Disney/Pixar Soul. Red Bull Camp. Death Row Records. Anderson .Paak. Machine Gun Kelly. Silver Clio. Gold Clio. Two Telly Awards. 250 million video views. Six global regions.

The site's only job is to let that land — and convert a brand director or creative director into a conversation.

> **The single design principle:** The work IS the argument. Every design decision should serve the work's legibility, not compete with it.

---

## 1. Concept — "The Living Archive"

HUE's value proposition is memory. They stay embedded, accumulate context, and compound creative knowledge over time. An agency relationship resets. HUE's grows.

The site should *feel* like that. Like you're moving through a body of work that's been building — not a pitch deck, but evidence. Film textures, real photos, real campaigns, real results. The aesthetic of something that's been lived in, not rendered.

This is not a metaphor to explain to visitors. It's just how the site feels.

---

## 2. Technical Stack

| Concern | Decision |
|---------|----------|
| Framework | React (Vite) or vanilla HTML/CSS/JS — developer's choice based on performance |
| Animation | GSAP + ScrollTrigger for all scroll-driven animation |
| Fonts | See §3.3 — Google Fonts proxies until licensed fonts supplied |
| 3D libraries | None — performance over spectacle |
| Target load | <2s desktop / <3.5s mobile |
| Mobile | Fully responsive. All interactions gracefully degrade. |

---

## 3. Brand System

### 3.1 Colors

```css
--black:  #000000;  /* Background. Always. */
--white:  #ffffff;  /* Primary text */
--yellow: #ffff00;  /* Accent — buttons, labels, highlights. Use sparingly. */
--red:    #ff0000;  /* Gradient primary */
--blue:   #0000ff;  /* Gradient primary */
--muted:  rgba(255, 255, 255, 0.36); /* Secondary text */
--border: rgba(255, 255, 255, 0.09); /* Dividers */
--dim:    rgba(255, 255, 255, 0.07); /* Subtle backgrounds */
```

---

### 3.2 Gradient System (HUE Polychromatic)

The gradient is HUE's visual signature. Rules from the brand guide:

- Always on black background
- **Maximum 25% of any composition** — accent, not fill
- Always built from the primary triad: Red → Yellow → Blue
- Appears as a soft, blurred color bloom — never a sharp gradient line
- Bleeds in from corners or bottom edges
- Think: aurora, not rainbow

```css
/* Standard corner bloom */
.gradient-corner {
  background: radial-gradient(
    ellipse at bottom right,
    rgba(255, 200,   0, 0.65)  0%,
    rgba(255,  60,   0, 0.45) 25%,
    rgba(  0,   0, 255, 0.30) 55%,
    transparent 75%
  );
  filter: blur(48px);
  opacity: 0.45;
  pointer-events: none;
}

/* Full-width base band — hero / CTA sections only */
.gradient-band {
  background: linear-gradient(
    105deg,
    rgba(255,   0,   0, 0.75)  0%,
    rgba(255, 100,   0, 0.65) 16%,
    rgba(255, 200,   0, 0.75) 30%,
    rgba(  0, 160, 255, 0.50) 60%,
    rgba(  0,   0, 255, 0.75) 80%
  );
  filter: blur(52px);
  opacity: 0.42;
  pointer-events: none;
}
```

---

### 3.3 Typography

#### Display — H1, H2, large callouts

| Property | Value |
|----------|-------|
| Font | **Montserrat ExtraBold** (Google Fonts proxy — swap for Comba Bold Extra Wide when licensed) |
| Size range | `clamp(48px, 10vw, 200px)` |
| Letter-spacing | `0.02–0.04em` |
| Line-height | `0.88–0.92` |
| Transform | Uppercase always |

Treatment options — mix within a single headline for hierarchy:

```css
.hl-filled  { color: #ffffff; }
.hl-outline { -webkit-text-stroke: 1.5px #ffffff; color: transparent; }
.hl-yellow  { -webkit-text-stroke: 1.5px #ffff00; color: transparent; }
```

#### Body copy

| Property | Value |
|----------|-------|
| Font | **Helvetica Neue** (system stack) or **Barlow** (Google Fonts fallback) |
| Weight | 300 default / 600 for `<strong>` |
| Size | `14–16px` |
| Line-height | `1.72` |
| Color | `rgba(255,255,255,0.50)` default — `#ffffff` for emphasis |

#### Labels / Metadata / UI elements

| Property | Value |
|----------|-------|
| Font | **Roboto** (Google Fonts) |
| Weight | `300–400` |
| Size | `9–11px` |
| Letter-spacing | `0.14–0.22em` |
| Transform | Uppercase always |
| Color | `var(--yellow)` active / `var(--muted)` secondary |

> **Note on licensed fonts:** Comba Bold Extra Wide (display) and Harabara Mais Black (subheads) are HUE's brand fonts. Build with the Google Fonts proxies above. When licensed fonts are supplied, swap in and re-check all headline sizes.

---

### 3.4 Spacing

```
Base unit:              8px
Section padding:        104–128px vertical · 48px horizontal (desktop)
Section padding mobile: 64px vertical · 24px horizontal
Max content width:      1440px centered
```

---

### 3.5 Logo

The HUE logotype (fluid wordmark + blob "H") rules:

- White on all dark backgrounds
- Never stretched, rotated, or recolored outside brand palette
- Nav height: `~28px`
- Required clear space: `0.5× logo height` on all sides
- SVG source required from brand guide (see §10 asset list)

---

### 3.6 Component Styles

#### Buttons

```css
/* Primary */
.btn-primary {
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-weight: 600;
  background: #ffff00;
  color: #000000;
  padding: 14px 32px;
  border: none;
  border-radius: 0;
}

/* Ghost */
.btn-ghost {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.btn-ghost:hover { border-color: #ffffff; }
```

#### Section Labels

```css
.section-label {
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #ffff00;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-label::before {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: #ffff00;
}
```

Renders as: `——— WHAT WE DO`

#### Dividers

```css
hr.divider { border: none; border-top: 1px solid rgba(255,255,255,0.09); }
```

#### Cards

```css
.card {
  background: #000000;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 0;
  transition: border-color 0.3s ease;
}
.card:hover { border-color: rgba(255,255,255,0.20); }
```

---

## 4. Site Architecture

### Primary — single-page scroll

```
[1]  HERO
[2]  TICKER
[3]  CLIENT LOGOS        ← critical trust signal — do not skip
[4]  WORK                ← the heart of the site
[5]  WHAT WE DO
[6]  SYSTEMS
[7]  HOW IT WORKS
[8]  CTA
     FOOTER
```

### Secondary routes

```
/work/frequency    Spotify Frequency case study
/work/soul         Disney/Pixar Soul case study
/work/redbull      Red Bull Camp case study
/archives          Polaroid / film archive (cultural artifact, not conversion path)
```

---

## 5. Section Specifications

---

### [1] Hero

**Concept:** Minimal. Type-led. The gradient lives at the bottom ~25% of the viewport. No imagery. Type and gradient do everything.

#### Layout
- Full viewport height (`100vh`)
- Polychromatic gradient band pinned to bottom edge
- Top: nav + two metadata items
- Headline: bottom-anchored, fills the lower 60% of viewport
- Subhead + scroll indicator at the very bottom

#### Content

```
EYEBROW  (top left · Roboto · yellow)
HUE Unlimited — A 21st Century Creative Studio

ASIDE  (top right · Roboto · muted · right-aligned)
Embedded → Retained
Compounding

HEADLINE  (Montserrat ExtraBold · massive · bottom-anchored)
WE DON'T        ← white filled
LEARN YOUR      ← white filled
BRAND.          ← white outlined
WE BECOME       ← white filled
PART OF IT.     ← yellow outlined

SUBHEAD  (below headline · left · Helvetica Neue)
The embedded creative partner for brands that produce at volume
and can't afford to lose the thread.

SCROLL INDICATOR  (bottom right · Roboto · muted · vertical writing-mode)
SCROLL
```

#### Animation

| Element | Effect | Timing |
|---------|--------|--------|
| Headline | Darkroom develop — `blur(8px) + contrast(0.3)` collapses to sharp on load | 1.2s |
| Subhead | Fade up (`translateY 18px → 0`) | 0.6s delay after headline |
| Gradient | Slow pulse: opacity `0.38 → 0.48 → 0.38` | 6s infinite loop |
| Headline on scroll | Subtle parallax upward | Tied to scroll position |

```css
/* Hero headline — starting state on page load */
.hero-headline {
  filter: blur(8px) contrast(0.3);
  opacity: 0.4;
}
/* End state — add .developed class via JS after load */
.hero-headline.developed {
  filter: blur(0) contrast(1);
  opacity: 1;
  transition: filter 1.2s ease, opacity 1.2s ease;
}
```

Add a grain overlay (SVG noise texture, `opacity: 0.15`) that fades out simultaneously. Feels like a photo developing in a darkroom.

> **Use this effect once — hero headline only. Do not reuse elsewhere.**

---

### [2] Ticker

Continuous horizontal scroll. 20s loop. No pause on hover.

```
Brand Campaigns · Content Production · Creative Direction · Social Strategy · 
Brand Identity Systems · Event Creative · Visual Language · Packaging + Product · 
Program Development · Experiential Production · Artist Commerce
```

Duplicate the string once for seamless loop. Border top + bottom: `1px solid rgba(255,255,255,0.09)`. Text: Roboto 10px muted. Separator: `◆` in yellow.

```css
.ticker-track { animation: ticker 20s linear infinite; }
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

### [3] Client Logos

> **This section is critical. Do not skip or deprioritize.**  
> Seeing Spotify, Disney, and Red Bull in the first scroll changes how a buyer reads everything that follows.

#### Layout
- Label: `——— TRUSTED BY`
- Single row, horizontally centered, equal spacing
- All logos: white (inverted / desaturated to match black background)
- Opacity: `0.50` default → `0.80` on hover
- No borders, no card backgrounds — logos float directly on black
- Mobile: two rows, flex-wrapped

#### Logo set
```
Spotify  ·  Disney  ·  Red Bull  ·  Death Row Records  ·  Amazon  ·  Vans  ·  Hot Topic  ·  Gamma
```

> **Asset note:** White SVG or PNG logos required (see §10). Until supplied, build with the brand names in Roboto 11px muted — do not remove the section structure.

---

### [4] Work — The Heart

**Concept:** The film reel. A horizontal scroll section framed as a 35mm contact sheet — sprocket holes, frame numbers, "HUE ARCHIVA 400" metadata. This is the most technically ambitious section and the one most likely to earn Awwwards recognition.

#### Layout

- Section: full viewport height, sticky (pinned while user scrolls through all 5 cards)
- Horizontal scroll driven by vertical scroll via GSAP ScrollTrigger (`scrub: 1`)
- Left column (fixed): section label + live project metadata (updates per active card)
- Right: horizontal track of 5 work cards — widths vary slightly (largest ~1.4× standard) for contact-sheet irregularity
- Progress indicator: 1px yellow line at section bottom, fills as user scrolls
- Mobile: vertical card stack, film strip simplified to top/bottom edge strips only

#### Film Strip Container

```
┌─────────────────────────────────────────────────────┐
│  [■][■][■][■][■][■][■][■][■][■][■][■][■][■][■][■]  │ ← sprocket holes (CSS)
│  ► 01   HUE ARCHIVA 400   SPOTIFY · FREQUENCY       │ ← frame metadata (Roboto 10px muted)
│  ┌───────────────────┐  ┌──────────┐  ┌──────────┐  │
│  │                   │  │          │  │          │  │
│  │    CARD 01        │  │  CARD 02 │  │  CARD 03 │  │
│  │    (featured)     │  │          │  │          │  │
│  └───────────────────┘  └──────────┘  └──────────┘  │
│  [■][■][■][■][■][■][■][■][■][■][■][■][■][■][■][■]  │
└─────────────────────────────────────────────────────┘
```

---

#### Work Cards

**Card 01 — Spotify · Frequency** *(featured — ~1.4× standard width)*

```
Background:   Black · yellow-red gradient bloom bottom-left
Ghost text:   "FREQUENCY" at 8% opacity
Client pill:  Spotify · Embedded Partner
Title:        CO-BUILT FREQUENCY VIA STORYTELLING.
Stats:        #1 Black Music Destination · 2.1M Followers · 250M+ Video Views
              · 6 Global Regions · Silver Clio · 2× Telly Awards
Tags:         Global Brand Building · Creative Direction · Content · Social
Hover:        Archive photo surfaces — lifts translateY(-8px), rotates 2–3°
Click:        → /work/frequency
```

**Card 02 — Disney/Pixar · Made With Soul** *(standard)*

```
Background:   Black · purple gradient bloom (Soul film palette)
Ghost text:   "SOUL" at 8% opacity
Client pill:  Disney / Pixar · Brand Extension
Title:        TOOK SOUL BEYOND THE SCREEN.
Stats:        80+ SKU Catalog · Disney Parks OOH · Amazon Storefront
              · Gold Clio · Gold Telly Winner
Tags:         Brand Identity · Product Design · Campaign Rollout · Evergreen Programs
Click:        → /work/soul
```

**Card 03 — Red Bull · Camp** *(standard)*

```
Background:   Black · red gradient bloom bottom-right
Ghost text:   "CAMP" at 8% opacity
Client pill:  Red Bull · Music Residency
Title:        CURATED TALENT OF THE NEXT GENERATION.
Stats:        10 Rising Creators · 30+ Content Assets · Collaborative EP
Tags:         Experiential · Content Production · Program Development
```

**Card 04 — Death Row × Gamma · Jane Handcock** *(standard)*

```
Background:   Black · warm amber gradient bloom
Client pill:  Death Row × Gamma · Artist Rollout
Title:        SHAPED THE NEW ERA OF DEATH ROW.
Stats:        25M+ Video Views · #2 R&B Radio · Top 20 Mediabase · 1M+ Monthly Listeners
Tags:         Artist Branding · 360 Campaign · Social · Creative Direction
```

**Card 05 — Artist Commerce** *(standard)*

```
Background:   Black · blue gradient bloom
Client pill:  Anderson .Paak · MGK · Snoop Dogg
Title:        MADE COMMERCE FEEL LIKE CULTURE.
Stats:        Full Brand Systems · Vans · Hot Topic · Amazon · Touring Retail
Tags:         Artist Commerce · Retail · Brand Systems
```

**After last card — section CTA:**

```
SEE ALL WORK →
```
Montserrat ExtraBold, large, yellow outlined. `href="#"` placeholder until full portfolio page exists.

---

### [5] What We Do

**Layout:** Two-column grid. Left: headline + body. Right: numbered service list.

#### Headline
```
AGENCY RANGE.   ← white filled
IN-HOUSE        ← white outlined
MEMORY.         ← yellow outlined
```

#### Body (left column)
```
You're past the phase where one person does everything. But you're not 
ready — or willing — to build and carry a full in-house team.

Most brands in that position end up with one of two problems: an agency 
that relearns them on every engagement, or freelancers they're managing 
themselves. Either way, the creative director becomes the project manager.

HUE is the third option. A standing creative layer — embedded in your brand, 
retained for ongoing work, scaling up when the work demands it. The longer 
we work together, the faster and sharper it gets.
```

#### Service list (right column)
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

Styled as a bordered list. Each row: `padding: 17px 0`, `border-bottom: 1px solid var(--border)`. Hover: row text brightens to white, row number brightens to yellow.

---

### [6] Systems

**Layout:** Full-width section on `#050505`. Two-column header, then full-width interactive list.

#### Header

Left — Headline:
```
THE INFRA-
STRUCTURE
BEHIND THE    ← white outlined
WORK.         ← yellow outlined
```

Right — Body:
```
An embedded relationship only works if there's a system underneath it. 
These are the structures that make it run — for every client, from week one.
```

#### Systems List

| # | Name | Description | Access |
|---|------|-------------|--------|
| 01 | Brand Immersion Protocol | How we absorb a brand before we make anything | PUBLIC |
| 02 | Embedded Operating Model | What the retainer looks like, day to day | PUBLIC |
| 03 | Creative Brief Framework | The brief structure we run on every project | CLIENTS ONLY |
| 04 | Talent Network & Capacity Model | How we scale without fixed overhead | CLIENTS ONLY |
| 05 | Monthly Value Report | How we keep the partnership visible | CLIENTS ONLY |

**Hover behavior per row:**

1. Row slides right `6px`
2. System name brightens to `#ffffff`
3. Arrow `↗` turns yellow
4. Description types out character by character (`28ms/char`)
5. CLIENTS ONLY rows: description types → 400ms pause → replaced with `— — — — — — — — —`

```js
function typeOut(el, text, speed = 28) {
  el.textContent = '';
  [...text].forEach((char, i) => {
    setTimeout(() => el.textContent += char, i * speed);
  });
}

// CLIENTS ONLY rows
function typeAndRedact(el, description) {
  typeOut(el, description, 28);
  const revealDuration = description.length * 28 + 400;
  setTimeout(() => typeOut(el, '— — — — — — — — —', 40), revealDuration);
}
```

---

### [7] How It Works

**Layout:** Label + headline, then two side-by-side cards.

#### Headline
```
TWO WAYS IN.
ONE THAT STICKS.   ← yellow outlined
```

#### Card 1 — Embedded Partnership *(yellow background — featured)*

```
Tag:    Tier 1 — The core model
Name:   EMBEDDED PARTNERSHIP
Body:   A retained HUE team inside your brand. Dedicated creative lead. 
        Ongoing access to our production network. Weekly syncs. 
        The longer it runs, the better it gets.
        
→ Monthly retainer with defined capacity tiers
→ Dedicated creative lead — single point of contact
→ Full production network, scaled to demand
→ Weekly syncs + quarterly reviews
→ 3–6 month minimum
```

*Yellow card: all text `#000000`. Arrow markers `→` are black.*

#### Card 2 — Project Engagement *(dark background)*

```
Tag:    Tier 2
Name:   PROJECT ENGAGEMENT
Body:   Scoped work with defined deliverables and a fixed fee. The right 
        entry point if you want to see the work before committing to a 
        retainer. Most project clients do.

→ Fixed fee based on scope
→ Clear timeline from the start
→ Natural on-ramp to Tier 1
```

---

### [8] CTA

**Concept:** Full-bleed. Polychromatic gradient at maximum allowed intensity (25% of composition). Type is massive. Almost uncomfortably large. The reader should feel something.

#### Headline
```
STOP              ← white filled
STARTING          ← white outlined
FROM SCRATCH.     ← yellow outlined
```

#### Body
```
Tell us what you're building. If there's a fit, 
you'll know from the first conversation.
```

#### Buttons
```
[Start a conversation →]    [See the work first]
```

#### Process note *(below buttons — Roboto 10px muted)*
```
We respond within 48 hours. First call is 30 minutes — no decks, no pitch.
```

#### Animation
On `IntersectionObserver` trigger:
1. Gradient sweeps left → right (1.2s ease-out)
2. Headline words fade up sequentially (80ms stagger per word)
3. Subhead and buttons follow

---

### Footer

```
LEFT:    HUE wordmark (SVG white)
CENTER:  Work  ·  Systems  ·  How it works
RIGHT:   creative@hueunlimited.com  ·  Instagram  ·  LinkedIn  ·  Behance

BOTTOM:  © 2026 HUE Unlimited  ·  hueunlimited.com
```

---

## 6. Interaction Spec

### 6.1 Custom Cursor

| State | Dot | Ring |
|-------|-----|------|
| Default | 7px · `#ffff00` | 28px · `1px solid rgba(255,255,0,0.30)` · lerp `0.12` |
| Work section | 12px | Viewfinder — adds crosshair lines |
| On card hover | 12px | Scales to 48px · `"VIEW →"` Roboto 8px inside ring |
| On links / buttons | Hidden | Scales to match element |

```js
// Ring lerp loop
let rx = 0, ry = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
(function loop() {
  rx += (cx - rx) * 0.12;
  ry += (cy - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();
```

---

### 6.2 Scroll — Work Section (GSAP)

```js
gsap.to('.work-track', {
  x: () => -(workTrack.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.work-section',
    pin: true,
    scrub: 1,
    end: () => '+=' + (workTrack.scrollWidth - window.innerWidth),
    onUpdate: self => {
      progressBar.style.width = (self.progress * 100) + '%';
      updateActiveCard(self.progress); // updates left-column metadata
    }
  }
});
```

**Mobile:** Disable ScrollTrigger pin. Stack cards vertically. Film strip top/bottom edges only.

---

### 6.3 Scroll — All Other Sections

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal      { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal.in   { opacity: 1; transform: translateY(0); }
```

For staggered groups, set `--i` on each child via JS and use:
```css
.reveal-stagger > * { transition-delay: calc(var(--i) * 60ms); }
```

---

### 6.4 Gradient — Scroll Color Shift

The gradient adapts its color world as the user scrolls:

| Section | Gradient Character |
|---------|--------------------|
| Hero | Red → Yellow → Blue (brand triad) |
| Work — Spotify card | Yellow + Red |
| Work — Soul card | Purple + Blue |
| Work — Red Bull card | Red dominant |
| Work — Death Row card | Amber + Red |
| CTA | Full spectrum, maximum intensity |

```js
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--scroll-progress', progress);
});
```

Use `will-change: background` on gradient elements for GPU compositing.

---

### 6.5 Work Card — Archive Photo Hover *(desktop only)*

```
Trigger:   mouseenter on work card
Effect:    Archive photo surfaces (position: absolute, inset: 0)
           translateY(-8px) + rotate(2.5deg) + brightness(1.10)
           SVG grain filter overlay at opacity 0.12
Exit:      mouseleave — photo fades back (opacity 0, transform reset)
Timing:    Enter 280ms ease-out / Exit 180ms ease-in
```

```css
.card-photo {
  position: absolute; inset: 0; opacity: 0;
  transition: opacity 280ms ease-out, transform 280ms ease-out;
  transform: translateY(0) rotate(0deg);
  filter: url(#film-grain);
  object-fit: cover;
}
.work-card:hover .card-photo {
  opacity: 1;
  transform: translateY(-8px) rotate(2.5deg);
}
```

Photo sources per card (see §10 for asset delivery):
- Spotify: R&B speaker Archiva 400 shot, talent photos
- All other cards: imagery from case study PDFs

---

### 6.6 Hero — Darkroom Develop Effect

Used **once**. Hero headline only. On page load.

```js
// Trigger after fonts loaded + page ready
document.fonts.ready.then(() => {
  requestAnimationFrame(() => {
    document.querySelector('.hero-headline').classList.add('developed');
  });
});
```

```css
.hero-headline {
  filter: blur(8px) contrast(0.3);
  opacity: 0.4;
}
.hero-headline.developed {
  filter: blur(0) contrast(1);
  opacity: 1;
  transition: filter 1.2s ease, opacity 1.2s ease;
}
```

Grain overlay: `position: absolute`, SVG `feTurbulence` noise, `opacity: 0.15`, fades to 0 over 1.2s simultaneously.

---

## 7. Copy System

### Tone Rules

1. Never explain what the buyer already knows
2. Specificity over claims — named clients and real numbers beat adjectives
3. Short sentences. Let silence work.
4. Cultural fluency is shown, not stated
5. Every line earns the next scroll or it gets cut

### Never Use
```
"We believe in..."
"Our passion for..."
"Bringing your vision to life"
"Best-in-class"
"Award-winning" without naming the specific award
Any sentence that could appear unchanged on a competitor's site
```

### Voice Reference

| ✓ Write this | ✗ Not this |
|-------------|-----------|
| Spotify needed a brand, not a playlist. | We are passionate about helping brands tell their stories. |
| The work gets better the longer we're in. That's the model. | Our award-winning team delivers best-in-class creative solutions. |
| Disney needed culture, not content. We built Made With Soul. | We partner with global brands to create meaningful experiences. |

---

## 8. Case Study Copy

### Spotify · Frequency

**Card one-liner:**
> Helped build Frequency from scratch. Now it's the #1 destination for Black music on Spotify.

**Stats strip:**
`#1 Black Music Destination · 2.1M Followers · 250M+ Video Views · 6 Global Regions · Silver Clio · 2× Telly Awards`

**Expanded copy — `/work/frequency`:**

Spotify needed more than a playlist. They needed a brand that could move with Black music culture across genres, generations, and geographies — and keep its voice consistent from Lagos to Los Angeles.

HUE built Frequency from the architecture up. Brand system. Creative engine. Social strategy. Original content formats. Talent partnerships. 20+ franchises. All of it running simultaneously across 6 regions, all of it sounding like one thing.

Three years in: the #1 global destination for Black music on Spotify. 250 million video views. 2.1 million on-platform followers. A Silver Clio and two Telly Awards.

That's what it looks like when a creative partner stays in.

---

### Disney/Pixar · Made With Soul

**Card one-liner:**
> Cultural IP lives beyond the screen when it's rooted in real community. We proved it with Pixar Soul.

**Stats strip:**
`80+ SKU Catalog · Disney Parks OOH Takeover · Amazon Storefront · Gold Clio · Gold Telly Winner`

**Expanded copy — `/work/soul`:**

Disney and Pixar had a film about the soul of creativity. They needed that to mean something in the real world — not just merchandise, but a movement rooted in actual artists and communities.

HUE built Made With Soul: a first-of-its-kind brand extension that sourced from real artists, developed original products, launched across Amazon and Disney Parks, and created a brand system that could run for years.

80+ SKUs. OOH across Disney Parks and Resorts. A Gold Clio and Gold Telly Award.

Proof that the right creative partner doesn't just execute IP — they extend it.

---

### Red Bull · Camp

**Card one-liner:**
> A residency that went beyond surface-level content and into real creator development.

**Stats strip:**
`10 Rising Creators · 30+ Original Assets · Collaborative EP · Long-term Brand Positioning`

---

### Death Row × Gamma · Jane Handcock

**Card one-liner:**
> We helped shape what the new era of Death Row looks and sounds like.

**Stats strip:**
`25M+ Video Views · #2 R&B Radio · Top 20 Mediabase · 1M+ Monthly Listeners`

---

### Artist Commerce — Anderson .Paak, MGK, Snoop Dogg

**Card one-liner:**
> When creators have the right tools, commerce becomes culture.

**Stats strip:**
`Snoop Dogg · Anderson .Paak · Machine Gun Kelly · Vans · Hot Topic · Amazon`

---

## 9. Archive Page — `/archives`

**Secondary destination.** Cultural artifact, not primary conversion path. Designed to be shareable. Feels like a digital zine, not a portfolio grid.

### Concept
The Archiva 400 contact sheet. Polaroids and film photos from HUE's body of work. Black background. Photos arranged slightly off-grid — irregular spacing, subtle rotation (±2°), like they've been laid out on a table after a shoot.

### Layout & Interactions

```
Header:   "THE ARCHIVES"  — Montserrat ExtraBold · centered · 48px
Sub:      "HUE Archiva 400 · Ongoing"  — Roboto · centered · muted · uppercase

Grid:     Masonry-style · irregular spacing
          Each photo: random rotation ±2° (set once on mount, stable)

Hover:    Photo lifts translateY(-6px) · straightens to rotate(0°) · brightness +10%
Click:    Fullscreen lightbox · keyboard navigable (← →  to browse, ESC to close)
Shuffle:  Button top-right — re-randomizes positions with spring animation
```

Photos required: 30–50 images from the Archiva 400 folder (see §10).

---

## 10. Assets Required

Build structure now with placeholders. Swap in assets when supplied.

| Asset | Source | Priority |
|-------|---------|----------|
| HUE logotype (SVG, white) | Brand guide | 🔴 HIGH |
| HUE icon — all colorways (SVG) | Brand guide | 🔴 HIGH |
| Spotify Frequency campaign photos | Archiva 400 / archive | 🔴 HIGH |
| Disney Soul / Made With Soul campaign photos | Archive | 🔴 HIGH |
| Archive polaroid / film photos (30–50 for `/archives`) | Archiva 400 folder | 🔴 HIGH |
| Client logos — Spotify, Disney, Red Bull, Death Row, Amazon, Vans, Hot Topic, Gamma | Sourced — white SVG/PNG | 🔴 HIGH |
| Red Bull Camp photos | Archive | 🟡 MEDIUM |
| Jane Handcock campaign photos | Archive | 🟡 MEDIUM |
| Artist commerce product photos | Archive | 🟡 MEDIUM |
| Comba Bold Extra Wide (licensed font file) | Font license | 🟡 MEDIUM |
| Harabara Mais Black (licensed font file) | Font license | 🟡 MEDIUM |

---

## 11. Performance & Accessibility

```
Images:          WebP format · lazy loaded · width + height set to prevent layout shift
GSAP mobile:     ScrollTrigger horizontal pin disabled on mobile — vertical scroll only
Reduced motion:  @media (prefers-reduced-motion: reduce) → all transitions 0.1s · parallax off
Color contrast:  All body text WCAG AA minimum
Keyboard nav:    All interactive elements focusable · visible focus ring on all states
Alt text:        All images have descriptive alt attributes
Font loading:    font-display: swap on all custom fonts
```

---

## 12. Success Criteria

The site succeeds if:

1. A brand director lands on it and within **10 seconds** understands: this studio has worked with Spotify, Disney, and Red Bull at the highest level
2. Within **60 seconds** they understand: this is the embedded model, and it's different from an agency
3. Within **90 seconds** they either click *Start a conversation* or keep scrolling the work
4. The work section makes them **stop and show someone else**
5. It gets submitted to Awwwards and **wins SOTD**

---

*End of brief. Ready for build.*  
*Contact: creative@hueunlimited.com*
