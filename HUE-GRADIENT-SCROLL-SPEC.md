# HUE GRADIENT SCROLL SHIFT — TECHNICAL IMPLEMENTATION SPEC

## What It Should Feel Like

As the user scrolls from top to bottom, the ambient gradient bloom that lives behind each section **slowly rotates through the color spectrum**. It is never jarring. It never pops. It is the kind of thing a user feels before they consciously notice it.

```
HERO         → Red dominant    (#ff0000 leads)
TICKER       → Red fading
CLIENT LOGOS → Red → Orange transition
WORK         → Each card has its own color world (see card spec below)
WHAT WE DO   → Neutral blue-black (de-saturated, almost gone)
SYSTEMS      → Deep blue enters  (#0000ff builds)
HOW IT WORKS → Blue-violet
CTA          → Full spectrum blast — all three primaries at max
```

The gradient is never a foreground element. It is always `position: absolute` or `position: fixed`, `pointer-events: none`, `z-index: 0`, behind all content.

---

## Architecture — Two Approaches

### Option A: Fixed Gradient Layer (Recommended)

One `<div class="gradient-bg">` sits `position: fixed` behind the entire page. Its properties are updated in real time via a scroll listener. The gradient itself never moves — only its color values change. This is the most performant approach.

```html
<!-- Place immediately after <body> opens -->
<div class="gradient-bg" aria-hidden="true"></div>
```

```css
.gradient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: opacity;
  /* background is set entirely by JS */
}

/* All sections need z-index: 1 and position: relative to sit above */
section, nav, footer {
  position: relative;
  z-index: 1;
}
```

### Option B: Per-Section Blooms (Alternative)

Each section has its own `.grad-bloom` element that fades in/out as its section enters/leaves the viewport. Simpler to reason about, slightly less smooth on transitions between sections.

**Use Option A.** The continuous feel is worth it.

---

## The Color Keyframes

Define the gradient state at each section as a plain object. JS interpolates between these as the user scrolls.

```js
// Each keyframe defines the gradient state at a scroll position.
// 'stop' is 0–1 representing progress through the full page.
// Colors are [r, g, b, a] arrays for easy interpolation.

const GRADIENT_KEYFRAMES = [
  {
    stop: 0.00,  // HERO — top of page
    label: 'hero',
    blobs: [
      { x: 15,  y: 85,  r: 55, color: [255,  20,   0, 0.70] },  // red, bottom-left
      { x: 75,  y: 90,  r: 45, color: [255, 140,   0, 0.45] },  // orange, bottom-right
      { x: 50,  y: 95,  r: 60, color: [  0,   0, 200, 0.20] },  // faint blue hint
    ]
  },
  {
    stop: 0.22,  // CLIENT LOGOS / top of WORK section
    label: 'work-enter',
    blobs: [
      { x: 10,  y: 80,  r: 50, color: [255,  80,   0, 0.55] },  // red-orange
      { x: 80,  y: 85,  r: 40, color: [255, 200,   0, 0.40] },  // yellow creeping in
      { x: 50,  y: 90,  r: 50, color: [  0,  20, 180, 0.25] },  // cool base
    ]
  },
  {
    stop: 0.38,  // WORK — Spotify / Frequency card
    label: 'work-spotify',
    blobs: [
      { x: 20,  y: 75,  r: 55, color: [255, 200,   0, 0.65] },  // yellow (Frequency)
      { x: 70,  y: 80,  r: 45, color: [255,  60,   0, 0.50] },  // red-orange
      { x: 45,  y: 88,  r: 40, color: [  0,   0, 200, 0.20] },  // faint blue
    ]
  },
  {
    stop: 0.46,  // WORK — Soul card
    label: 'work-soul',
    blobs: [
      { x: 25,  y: 70,  r: 50, color: [120,   0, 220, 0.55] },  // purple (Soul)
      { x: 75,  y: 75,  r: 45, color: [  0,  40, 255, 0.45] },  // blue
      { x: 50,  y: 90,  r: 35, color: [200,   0, 100, 0.25] },  // magenta hint
    ]
  },
  {
    stop: 0.54,  // WORK — Red Bull card
    label: 'work-redbull',
    blobs: [
      { x: 15,  y: 80,  r: 55, color: [255,   0,  20, 0.70] },  // Red Bull red
      { x: 70,  y: 85,  r: 40, color: [200,   0,   0, 0.50] },  // deep red
      { x: 50,  y: 92,  r: 35, color: [  0,   0, 180, 0.15] },  // faint cool
    ]
  },
  {
    stop: 0.65,  // WHAT WE DO — de-saturated, almost gone
    label: 'what-we-do',
    blobs: [
      { x: 80,  y: 90,  r: 45, color: [  0,  20, 120, 0.25] },  // dim blue
      { x: 20,  y: 85,  r: 40, color: [ 20,   0,  80, 0.15] },  // dim violet
      { x: 50,  y: 95,  r: 35, color: [  0,   0,   0, 0.00] },  // nothing
    ]
  },
  {
    stop: 0.76,  // SYSTEMS — deep blue builds
    label: 'systems',
    blobs: [
      { x: 10,  y: 75,  r: 55, color: [  0,  40, 255, 0.55] },  // blue arrives
      { x: 85,  y: 80,  r: 45, color: [ 80,   0, 200, 0.40] },  // violet
      { x: 50,  y: 90,  r: 40, color: [  0, 160, 255, 0.25] },  // cyan hint
    ]
  },
  {
    stop: 0.88,  // HOW IT WORKS
    label: 'how-it-works',
    blobs: [
      { x: 15,  y: 70,  r: 50, color: [  0,  20, 255, 0.50] },  // blue
      { x: 80,  y: 75,  r: 45, color: [100,   0, 220, 0.40] },  // blue-violet
      { x: 50,  y: 88,  r: 40, color: [  0, 100, 200, 0.20] },  // teal
    ]
  },
  {
    stop: 1.00,  // CTA — full spectrum, maximum intensity
    label: 'cta',
    blobs: [
      { x: 10,  y: 85,  r: 65, color: [255,   0,   0, 0.75] },  // red
      { x: 50,  y: 90,  r: 55, color: [255, 200,   0, 0.70] },  // yellow
      { x: 85,  y: 85,  r: 60, color: [  0,   0, 255, 0.75] },  // blue
    ]
  }
];
```

Each blob is:
- `x`, `y` — position as percentage of viewport (left/top)
- `r` — radius as percentage of viewport width
- `color` — `[r, g, b, alpha]` array

---

## The Interpolation Engine

```js
/**
 * Linear interpolation between two values
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Find where we are between two keyframes
 * Returns { from: keyframe, to: keyframe, t: 0-1 }
 */
function getKeyframePair(scrollProgress) {
  const frames = GRADIENT_KEYFRAMES;

  for (let i = 0; i < frames.length - 1; i++) {
    if (scrollProgress >= frames[i].stop && scrollProgress <= frames[i + 1].stop) {
      const rangeSize = frames[i + 1].stop - frames[i].stop;
      const t = (scrollProgress - frames[i].stop) / rangeSize;
      return { from: frames[i], to: frames[i + 1], t };
    }
  }

  // Edge cases
  if (scrollProgress <= 0) return { from: frames[0], to: frames[0], t: 0 };
  return { from: frames[frames.length - 1], to: frames[frames.length - 1], t: 1 };
}

/**
 * Interpolate between two blob arrays
 * Both arrays must have the same length (same number of blobs per keyframe)
 */
function interpolateBlobs(fromBlobs, toBlobs, t) {
  return fromBlobs.map((fromBlob, i) => {
    const toBlob = toBlobs[i];
    return {
      x:     lerp(fromBlob.x,       toBlob.x,       t),
      y:     lerp(fromBlob.y,       toBlob.y,       t),
      r:     lerp(fromBlob.r,       toBlob.r,       t),
      color: [
        Math.round(lerp(fromBlob.color[0], toBlob.color[0], t)),
        Math.round(lerp(fromBlob.color[1], toBlob.color[1], t)),
        Math.round(lerp(fromBlob.color[2], toBlob.color[2], t)),
                   lerp(fromBlob.color[3], toBlob.color[3], t).toFixed(3),
      ]
    };
  });
}
```

---

## Rendering the Gradient

Two rendering approaches. Pick one.

### Approach 1: Radial Gradient CSS (Simpler, Good Performance)

Render each blob as a `radial-gradient` layered via CSS `background`.

```js
/**
 * Convert interpolated blobs to a CSS background string
 */
function blobsToCSS(blobs) {
  return blobs.map(blob => {
    const [r, g, b, a] = blob.color;
    const size = blob.r * 2; // diameter as vw
    return `radial-gradient(ellipse ${size}vw ${size * 0.8}vw at ${blob.x}% ${blob.y}%, rgba(${r},${g},${b},${a}) 0%, transparent 70%)`;
  }).join(', ');
}

// Apply to the fixed gradient element
const gradientEl = document.querySelector('.gradient-bg');

function renderGradient(scrollProgress) {
  const { from, to, t } = getKeyframePair(scrollProgress);
  const blobs = interpolateBlobs(from.blobs, to.blobs, t);
  gradientEl.style.background = blobsToCSS(blobs);
}
```

### Approach 2: Canvas (Smoother, Better for Complex Gradients)

Use an `<canvas>` element instead of a `<div>`. Draw each blob as a radial gradient on the canvas. More control, slightly more code.

```js
const canvas = document.createElement('canvas');
canvas.style.cssText = `
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; width: 100%; height: 100%;
`;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

function renderGradientCanvas(blobs) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blobs.forEach(blob => {
    const [r, g, b, a] = blob.color;
    const cx = (blob.x / 100) * canvas.width;
    const cy = (blob.y / 100) * canvas.height;
    const radius = (blob.r / 100) * canvas.width;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0,   `rgba(${r},${g},${b},${a})`);
    grad.addColorStop(0.6, `rgba(${r},${g},${b},${parseFloat(a) * 0.3})`);
    grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
}

// Resize handler
window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
```

**Recommendation:** Start with Approach 1 (CSS radial gradients). If you see banding or the transitions look harsh, switch to Approach 2.

---

## The Scroll Loop

This is the main loop. It runs on every animation frame and updates the gradient based on scroll position. The key is **not** updating on the `scroll` event directly — that causes jank. Use `requestAnimationFrame` instead.

```js
let currentScrollY  = 0;
let targetScrollY   = 0;
let isRunning       = false;
const SMOOTHING     = 0.08; // lower = smoother/slower. 0.06–0.12 is good range.

function getScrollProgress() {
  const docHeight     = document.documentElement.scrollHeight;
  const windowHeight  = window.innerHeight;
  const maxScroll     = docHeight - windowHeight;
  return maxScroll > 0 ? currentScrollY / maxScroll : 0;
}

function tick() {
  // Smooth the scroll value — this is what makes it feel fluid, not snappy
  currentScrollY += (targetScrollY - currentScrollY) * SMOOTHING;

  const progress = getScrollProgress();
  const { from, to, t } = getKeyframePair(progress);
  const blobs = interpolateBlobs(from.blobs, to.blobs, t);

  // Approach 1:
  gradientEl.style.background = blobsToCSS(blobs);

  // Approach 2 (canvas):
  // renderGradientCanvas(blobs);

  requestAnimationFrame(tick);
}

// Update target on scroll — this is intentionally cheap
window.addEventListener('scroll', () => {
  targetScrollY = window.scrollY;
}, { passive: true });

// Kick off the loop
tick();
```

The `SMOOTHING` value of `0.08` means the gradient lags slightly behind the scroll — it catches up over ~8 frames. This is intentional. It makes the color shift feel ambient and organic rather than mechanical.

---

## The Blur Layer

The gradient layer needs a consistent blur applied so the color blooms feel soft. Don't rely on `filter: blur()` on individual gradients — apply it once to the container for performance.

```css
.gradient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: background;

  /* The blur that makes everything feel diffused */
  /* Do NOT use filter: blur() here — it creates a stacking context and breaks z-index */
  /* Instead, apply blur per-blob in the radial-gradient size (make them large and soft) */
}

/* If using canvas approach, apply blur via CSS filter on the canvas element */
canvas.gradient-canvas {
  filter: blur(40px) saturate(1.2);
  /* saturate boost compensates for blur desaturation */
}
```

> **Important:** `filter: blur()` on a `position: fixed` element creates a new stacking context. This can break z-index layering of content above it. If you use CSS approach (not canvas), keep the blur inside the radial-gradient size parameters (make radii large) rather than using `filter: blur()` on the container.

---

## Work Section — Per-Card Color Override

The horizontal film reel (work section) needs special handling because cards have their own distinct color worlds. When the user is inside the work section, the global gradient keyframes hand off control to a card-specific override.

```js
// Track which work card is currently "active" in the horizontal scroll
let activeCardIndex = 0;

const CARD_GRADIENTS = {
  0: { // Spotify — yellow/red
    blobs: [
      { x: 20, y: 75, r: 55, color: [255, 200,   0, 0.65] },
      { x: 70, y: 80, r: 45, color: [255,  60,   0, 0.50] },
      { x: 45, y: 88, r: 40, color: [  0,   0, 200, 0.20] },
    ]
  },
  1: { // Soul — purple/blue
    blobs: [
      { x: 25, y: 70, r: 50, color: [120,   0, 220, 0.55] },
      { x: 75, y: 75, r: 45, color: [  0,  40, 255, 0.45] },
      { x: 50, y: 90, r: 35, color: [200,   0, 100, 0.25] },
    ]
  },
  2: { // Red Bull — red
    blobs: [
      { x: 15, y: 80, r: 55, color: [255,   0,  20, 0.70] },
      { x: 70, y: 85, r: 40, color: [200,   0,   0, 0.50] },
      { x: 50, y: 92, r: 35, color: [  0,   0, 180, 0.15] },
    ]
  },
  3: { // Death Row — amber
    blobs: [
      { x: 20, y: 75, r: 55, color: [255, 140,   0, 0.60] },
      { x: 75, y: 80, r: 45, color: [200,  80,   0, 0.45] },
      { x: 50, y: 90, r: 40, color: [  0,   0, 150, 0.20] },
    ]
  },
  4: { // Artist Commerce — blue
    blobs: [
      { x: 15, y: 78, r: 55, color: [  0,  60, 255, 0.55] },
      { x: 78, y: 82, r: 45, color: [ 80,   0, 200, 0.40] },
      { x: 50, y: 90, r: 40, color: [  0, 160, 255, 0.25] },
    ]
  }
};

// In your GSAP ScrollTrigger onUpdate callback for the work section:
workScrollTrigger = ScrollTrigger.create({
  trigger: '.work-section',
  start: 'top top',
  end: () => `+=${workTrackWidth}`,
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // Map scroll progress to card index (0–4)
    const rawIndex = self.progress * (Object.keys(CARD_GRADIENTS).length - 1);
    const fromIndex = Math.floor(rawIndex);
    const toIndex   = Math.min(fromIndex + 1, Object.keys(CARD_GRADIENTS).length - 1);
    const t         = rawIndex - fromIndex;

    // Interpolate between adjacent card gradients
    const fromBlobs = CARD_GRADIENTS[fromIndex].blobs;
    const toBlobs   = CARD_GRADIENTS[toIndex].blobs;
    const blobs     = interpolateBlobs(fromBlobs, toBlobs, t);

    // Override the global gradient during work section
    gradientEl.style.background = blobsToCSS(blobs);
  }
});
```

---

## Easing the Transitions

Raw linear interpolation between keyframes can feel mechanical at the midpoint. Apply an ease to `t` before passing it to `interpolateBlobs`.

```js
// Ease functions — pick one for the scroll transitions
const ease = {
  // Smooth step — S-curve, good for ambient color shifts
  smoothstep: (t) => t * t * (3 - 2 * t),

  // Ease in-out cubic
  easeInOutCubic: (t) => t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // Linear (no easing — only if smoothstep feels too slow)
  linear: (t) => t,
};

// Apply in getKeyframePair:
function getKeyframePair(scrollProgress) {
  // ... (find from/to as before)
  const rawT = (scrollProgress - frames[i].stop) / rangeSize;
  const t    = ease.smoothstep(rawT); // ← apply ease here
  return { from: frames[i], to: frames[i + 1], t };
}
```

**Use `smoothstep`.** It makes transitions feel like they have gravity — they accelerate out of a keyframe and decelerate into the next one. This is what makes the color shifts feel organic rather than timed.

---

## Reduced Motion

Users who have `prefers-reduced-motion: reduce` set should not get the animated gradient shift. Give them a static gradient instead.

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Static gradient — hero state only, no animation
  const heroBlobs = GRADIENT_KEYFRAMES[0].blobs;
  gradientEl.style.background = blobsToCSS(heroBlobs);
  // Do NOT start the tick() loop
} else {
  tick(); // Start the animated loop
}
```

---

## Full Setup — Copy-Paste Starting Point

```js
// gradient-scroll.js
// Drop this in after DOM is ready.

const gradientEl = document.querySelector('.gradient-bg');

// ─── KEYFRAMES ────────────────────────────────────────────────────
const GRADIENT_KEYFRAMES = [
  {
    stop: 0.00,
    blobs: [
      { x: 15, y: 85, r: 55, color: [255,  20,   0, 0.70] },
      { x: 75, y: 90, r: 45, color: [255, 140,   0, 0.45] },
      { x: 50, y: 95, r: 60, color: [  0,   0, 200, 0.20] },
    ]
  },
  {
    stop: 0.35,
    blobs: [
      { x: 20, y: 75, r: 55, color: [255, 200,   0, 0.65] },
      { x: 70, y: 80, r: 45, color: [255,  60,   0, 0.50] },
      { x: 45, y: 88, r: 40, color: [  0,   0, 200, 0.20] },
    ]
  },
  {
    stop: 0.65,
    blobs: [
      { x: 80, y: 90, r: 45, color: [  0,  20, 120, 0.25] },
      { x: 20, y: 85, r: 40, color: [ 20,   0,  80, 0.15] },
      { x: 50, y: 95, r: 35, color: [  0,   0,   0, 0.00] },
    ]
  },
  {
    stop: 0.80,
    blobs: [
      { x: 10, y: 75, r: 55, color: [  0,  40, 255, 0.55] },
      { x: 85, y: 80, r: 45, color: [ 80,   0, 200, 0.40] },
      { x: 50, y: 90, r: 40, color: [  0, 160, 255, 0.25] },
    ]
  },
  {
    stop: 1.00,
    blobs: [
      { x: 10, y: 85, r: 65, color: [255,   0,   0, 0.75] },
      { x: 50, y: 90, r: 55, color: [255, 200,   0, 0.70] },
      { x: 85, y: 85, r: 60, color: [  0,   0, 255, 0.75] },
    ]
  }
];

// ─── INTERPOLATION ────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (t) => t * t * (3 - 2 * t);

function getKeyframePair(p) {
  const f = GRADIENT_KEYFRAMES;
  for (let i = 0; i < f.length - 1; i++) {
    if (p >= f[i].stop && p <= f[i + 1].stop) {
      const t = smoothstep((p - f[i].stop) / (f[i + 1].stop - f[i].stop));
      return { from: f[i], to: f[i + 1], t };
    }
  }
  return p <= 0
    ? { from: f[0],           to: f[0],           t: 0 }
    : { from: f[f.length - 1], to: f[f.length - 1], t: 1 };
}

function interpolateBlobs(a, b, t) {
  return a.map((blob, i) => ({
    x:     lerp(blob.x,       b[i].x,       t),
    y:     lerp(blob.y,       b[i].y,       t),
    r:     lerp(blob.r,       b[i].r,       t),
    color: [
      Math.round(lerp(blob.color[0], b[i].color[0], t)),
      Math.round(lerp(blob.color[1], b[i].color[1], t)),
      Math.round(lerp(blob.color[2], b[i].color[2], t)),
               +lerp(blob.color[3], b[i].color[3], t).toFixed(3),
    ]
  }));
}

function blobsToCSS(blobs) {
  return blobs.map(({ x, y, r, color: [cr, cg, cb, a] }) =>
    `radial-gradient(ellipse ${r * 2}vw ${r * 1.6}vw at ${x}% ${y}%, rgba(${cr},${cg},${cb},${a}) 0%, transparent 70%)`
  ).join(', ');
}

// ─── SCROLL LOOP ──────────────────────────────────────────────────
let currentY = 0;
let targetY  = 0;

window.addEventListener('scroll', () => { targetY = window.scrollY; }, { passive: true });

function tick() {
  currentY += (targetY - currentY) * 0.08;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress  = maxScroll > 0 ? currentY / maxScroll : 0;

  const { from, to, t } = getKeyframePair(progress);
  const blobs = interpolateBlobs(from.blobs, to.blobs, t);
  gradientEl.style.background = blobsToCSS(blobs);

  requestAnimationFrame(tick);
}

// ─── INIT ─────────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gradientEl.style.background = blobsToCSS(GRADIENT_KEYFRAMES[0].blobs);
} else {
  tick();
}
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Colors pop instead of slide | `SMOOTHING` too high, or `smoothstep` not applied | Lower `SMOOTHING` to `0.05`, confirm `smoothstep` is being called |
| Gradient covers content | Missing `z-index: 1` on section elements | Add `position: relative; z-index: 1` to all `section`, `nav`, `footer` |
| Banding / hard lines | Radial gradient radii too small | Increase `r` values in keyframes; aim for `r: 50–70` |
| No gradient visible | `opacity` too low, or `will-change` causing compositing issue | Check opacity values in color arrays; temporarily set alpha to `1.0` to debug |
| Jank on scroll | `filter: blur()` on the gradient container | Remove `filter: blur()` from container; increase `r` values for soft look instead |
| Gradient doesn't reach bottom of page | Page height changed after `tick()` started | Re-calculate `maxScroll` inside `tick()` rather than caching it |
| Work section gradient doesn't adapt to cards | Global scroll progress overriding GSAP | Set a flag `isInWorkSection = true` in ScrollTrigger callbacks; skip global gradient update when true |

---

*End of gradient spec.*
