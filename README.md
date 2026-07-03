# Handoff: Moses Markels — Interactive 3D Portfolio (Cosmos)

## Overview
A personal portfolio for **Moses Markels** (storyteller / creative strategist, Boulder CO). The signature experience is a **scroll-driven 3D "cosmos"**: the page opens on an About intro, and as the user scrolls, the camera flies forward through a starfield past six **planets** — each planet *is* a project. Hovering a planet glows it and shows a floating label; clicking it opens that project's case-study page. The journey ends at a contact screen.

There are also six **project case-study pages** and a standalone **About page**, all sharing a dark, cinematic visual language (Bebas Neue display type, Mulish body, vivid accent palette, film-grain noise, custom cursor).

> Note: an earlier "Office room" 3D variant existed but has been **dropped** — this handoff is the **Cosmos/planets** version only.

## About the Design Files
The files in this bundle are **design references created in HTML** — working prototypes that demonstrate the intended look, motion, and behavior. They are **not** meant to be shipped as-is. The task is to **recreate these designs in the target codebase's environment** (e.g. React + react-three-fiber, Vue, Astro, plain Vite, etc.) using its established patterns, or — if starting fresh — to pick the most appropriate stack. The 3D is built with **Three.js (r128)**; a React project would most naturally use **@react-three/fiber + drei**.

The main file (`Moses Markels - Portfolio.dc.html`) is authored as a "Design Component" and relies on a small runtime (`support.js`) to render. Treat its **template + logic as a spec**, not as source to copy — the Three.js scene setup, scroll→camera mapping, and screen-space picking are the parts worth porting faithfully.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion timing, and interactions are all intended as shown. Recreate pixel-for-pixel using the codebase's libraries.

## "Backend" / dynamic work to wire up
This is fundamentally a **static front-end site**; there is no real backend yet. What a developer likely needs to make "work" for production:
- **Deployment** as a static site (Vercel / Netlify / Cloudflare Pages / GitHub Pages).
- **Project content** ideally moved out of hardcoded HTML into data (JSON/MDX or a headless CMS like Sanity/Contentful) so Moses can add/edit projects. Each project = { title, tags, accent color, hero image, sections[], nextProject }.
- **Contact**: currently a `mailto:` link. Optionally a real contact form → serverless function (e.g. Resend/Formspree).
- **Asset pipeline**: the portrait is a 4000×6000 JPG (~large) — compress/resize and serve responsive sizes. Project images are hot-linked from an Adobe Portfolio CDN; these should be re-hosted.
- **Analytics / SEO**: meta tags, OpenGraph images, sitemap.
- **Known issue to fix**: planet click-target precision can feel slightly off at some browser-zoom levels. The current approach projects each planet's world anchor to screen space every frame, stores an on-screen circle (center + radius), and on click picks the nearest circle containing the pointer (see `pickAt()` / `updateOverlay()`). Reimplement this cleanly with proper raycasting in the target 3D lib (react-three-fiber's `onPointerOver`/`onClick` on each planet mesh handles this natively and precisely).

## Screens / Views

### 1. Landing — About intro → Cosmos scroll (the core experience)
Single sticky full-viewport `<canvas>` (the 3D scene) with an absolutely-positioned HTML overlay on top. A tall scroll spacer (~680vh) drives everything off scroll progress `p` (0→1).

**Intro (p = 0 → ~0.12):**
- Centered composition: portrait (left) + text block (right), horizontally centered as a group.
- Portrait: `moses-portrait.jpg`, `width: clamp(180px,20vw,290px)`, `aspect-ratio: 41/58`, `border-radius: 18px`, 1px border `rgba(255,255,255,.16)`, glow shadow `0 30px 90px -30px rgba(91,140,255,.6), 0 22px 70px -34px rgba(255,95,168,.55)`. Hover: `translateY(-5px)`.
- Eyebrow: "About · Boulder, Colorado" — 11px, letter-spacing .24em, uppercase, `rgba(255,255,255,.42)`.
- Name `H1`: "Moses / Markels" (two lines), Bebas Neue, `clamp(56px,8.2vw,120px)`, line-height .84, gradient text `linear-gradient(110deg,#5b8cff,#b06bff 40%,#ff5fa8 70%,#ffb347)` clipped to text. **The name is a link → `about.html`** with an animated underline (a 2px gradient bar that grows from 0→100% width on hover).
- Roles: "Storyteller · Creative Strategist" — 13px, .2em, uppercase, `rgba(255,255,255,.5)`.
- Lead paragraph: "I'm not just here to sell you soda water disguised as personality. I'm here to build brands people actually trust." — `clamp(1rem,1.5vw,1.28rem)`, weight 300, line-height 1.6, white.
- "Read the full story →" link → `about.html`.
- Pulsing hint: "↓ Scroll to enter the work".
- A radial **scrim** behind the intro dims the 3D so text is legible: `radial-gradient(120% 90% at 50% 46%, rgba(8,6,20,.62) 0%, rgba(8,6,20,.34) 45%, rgba(8,6,20,0) 78%)`.
- **Zoom-through transition:** as `p` goes 0→0.12, `zt = p/0.12`, `zEase = zt²`. The intro group scales `1 + zEase*2.2`, opacity `1 - zt*1.35`, and blurs `blur((zt-0.2)*6px)` past zt>0.2. The scrim fades `1 - zt*1.2`. Net effect: you fly *through* the About text into the star field.

**Cosmos scene (Three.js):**
- Background `#070512`, exponential fog `FogExp2('#070512', 0.012)`.
- Lights: AmbientLight(#fff, 0.55), DirectionalLight(#fff, 1.1) at (6,8,10), a warm PointLight(#ffe6b0, 2.2) at the sun.
- Starfield: 1400 white points (size .32) spread over ±180/±120/z, plus 400 colored points (blue/pink/green tints, size .5).
- Sun: emissive icosahedron (#ffd27a, r7) far down-track at (-10,6,-82) with a translucent halo sphere (#ffb347, opacity .12).
- **6 planets**, one per project, placed down a track of length `TRACK = 88` in z. Planet `i` sits at `z = (8 - CENTERS[i]*88) - 7`, alternating left/right (`x = ±3.4`, `y = ∓0.8`). `CENTERS = [0.13, 0.27, 0.41, 0.55, 0.68, 0.81]`.
  - Each planet: low-poly `IcosahedronGeometry(r, 4)` flat-shaded MeshStandard in the project's accent color, `emissive` = accent at intensity 0.14, radii ~2.0–2.9.
  - Atmosphere: translucent sphere (accent, opacity .10) at 1.25× radius.
  - Some planets have a **ring** (Torus, accent-emissive, tilted ~0.42π) and some a **moon** (small icosahedron that orbits in the render loop).
  - Continuous slow self-rotation.
- **Camera:** flies straight down -z. `camZ = 8 - p*88`. It also eases toward whichever planet is nearest by weighting each planet's screen offset (so the framed planet drifts to center). Subtle mouse parallax is added (`smx/smy`, smoothed).

**Project labels/cards + hotspots (HTML overlay, positions computed from 3D):**
Every frame, each planet's world anchor is projected to screen coords via `Vector3.project(camera)`. From that:
- A **hotspot dot** (13px, accent color, `box-shadow` glow, pulsing ring via `@keyframes ring`) is placed at the planet's screen position; opacity follows a "bell" curve of `p` around `CENTERS[i]` (width `BELL = 0.075`).
- A **project card/label** is placed offset to the planet's side (`±175px`, clamped on-screen), fading in/out on the same bell curve so **only the framed project shows at a time**. Card = rounded panel (`rgba(8,6,20,.78)`, blur, 1px border, accent glow shadow), containing: index number (01–06), 16:9 project thumbnail, project title (Bebas Neue, accent), 1–2 tag pills, "View Project →".

**Contact (p ≈ 0.95):** centered "Let's work together" (Bebas Neue gradient), email button (`mailto:mosesm2022@gmail.com`), Instagram + LinkedIn links. Fades in on a bell curve.

**Fixed chrome:** top-left wordmark "Moses Markels"; top-right "About →" link → `about.html`; right-side vertical "Scroll" label with a progress rail that fills with `p`.

### 2. Project case-study pages (×6)
`unique-communications-ireland.html`, `spirit-airlines.html`, `betting-the-future.html`, `advice-from-strangers.html`, `success.html`, `how-she-hurt-me.html`. All use `project.css`. Structure: fixed header (logo + nav, `mix-blend-mode: difference`), "← Back" button → landing, full-viewport image hero with title (Bebas Neue `clamp(60px,9vw,130px)`) + tag pills, then a centered `max-width:1100px` content column: intro grid (lead text + Type/Objective/Approach details), section headings, text blocks, image grids (1- and 2-col, 16:10 / 16:7), quote/stat/persona/callout blocks (page-specific), and a "Next Project →" footer. Custom cursor + film-grain noise overlay throughout.

### 3. About page — `about.html`
Full standalone page (uses `project.css` + page-specific styles). Hero: 2-col grid — text (eyebrow, "Moses / Markels" gradient name, roles, lead line) + the portrait photo (`aspect-ratio 4/5`, glow shadow). Then: "Strategy meets story." split, a facts column (Based in / Disciplines / Believes in / Currently), two "work" CTA cards (gradient-glow hover, → landing), and a centered contact section (email + socials). Custom cursor + noise.

## Interactions & Behavior
- **Scroll = the only driver.** All camera motion, overlay opacity, transforms derive from scroll progress `p ∈ [0,1]`. No autoplay.
- **Zoom-through intro** (see above): scale + fade + blur of the intro group over `p 0→0.12`.
- **Planet hover:** pointer-move → screen-circle pick → hovered planet raises `emissiveIntensity` (+0.7 eased) and scales up slightly (`+bigScale`), cursor → pointer. Hovering a label highlights its planet too.
- **Planet click → navigate** to that project's HTML page. Picking is by nearest on-screen circle containing the pointer (port to native raycasting). Clicking empty space does nothing.
- **Moons** orbit their planet; planets self-rotate; all in the RAF loop, independent of scroll.
- **Mouse parallax:** smoothed pointer offset nudges camera position/target.
- **Custom cursor** (case-study + about pages): a 10px dot that lerps toward the mouse and grows to 44px over links/images; `mix-blend-mode: difference`.
- **Responsive:** intro is a flex group that stacks on narrow screens; case-study/about layouts collapse to single column < 900px; nav hides < 900px.

## State Management
Minimal — this is presentational. Runtime state:
- `scroll` (0–1 progress), `mouse {x,y}` + smoothed `smx/smy`.
- Per-project registry: `{ i, mesh, anchor(Vector3), accent, hitR, side, moon }` and per-frame computed `{ _sx,_sy,_sr,_front }` (screen circle).
- `hover` (index or -1), `active` (framed project index or -1).
- Arrays: `CENTERS`, `PALETTE`, `HREFS` (below).
For production, drive the project list from data (CMS/JSON) rather than hardcoding.

## Design Tokens
**Colors**
- Page background (cosmos): `#070512`; UI dark panels: `rgba(8,6,20,.78)`; case-study/about bg: `#111111`.
- Accent palette (project 1→6): `#5b8cff` (blue), `#ff7a18` (orange), `#b6ff3b` (lime), `#ff2bd1` (magenta), `#18e0ff` (cyan), `#9b5cff` (violet).
- Signature gradient (name/headlines): `linear-gradient(110deg, #5b8cff, #b06bff 40%, #ff5fa8 70%, #ffb347)`.
- Text: white; muted `rgba(255,255,255,.5)`; borders `rgba(255,255,255,.12)`; sun `#ffd27a`.

**Typography**
- Display: **Bebas Neue** (Google Fonts) — headlines, names, project titles. Wide letter-spacing (~.02–.04em), tight line-height (.84–.9).
- Body/UI: **Mulish** (300/400/600/700). Eyebrows/labels: 10–13px, uppercase, letter-spacing .13–.24em.

**Motion**
- Intro zoom range `p 0→0.12` (`zEase = (p/0.12)²`, scale→2.2, blur→6px).
- Project bell width `BELL = 0.075` around each `CENTERS[i]`; contact at `p≈0.95`.
- Cosmos track length `TRACK = 88`; camera `z = 8 - p*88`.
- Hover glow lerp factor ~0.12; cursor lerp .15.
- Card/link hovers: transform/opacity, .2–.4s ease.

**Radii / shadows**
- Cards 16–18px; pills 999px; planet atmosphere at 1.25× radius.
- Card shadow: `0 10px 50px rgba(0,0,0,.55), 0 0 70px -16px <accent>, 0 0 120px -30px <accent>`.

## Assets
- `moses-portrait.jpg` — Moses's graduation photo (Flatirons backdrop), 4000×6000 (**compress for production**). Used in landing intro + About page.
- Project thumbnails/hero images — currently hot-linked from `cdn.myportfolio.com` (Adobe Portfolio). **Re-host these.**
- Fonts: Bebas Neue + Mulish via Google Fonts.
- Three.js r128 (currently via unpkg CDN). Film-grain noise is an inline SVG data-URI in `project.css`.
- Icons/emoji: a few inline unicode arrows (→ ↗ ↓ ✈) — no icon library.

## Links / navigation map
- Landing planet 1→6 and cards → the six project pages, in this order (`HREFS`):
  `unique-communications-ireland.html`, `spirit-airlines.html`, `betting-the-future.html`, `advice-from-strangers.html`, `success.html`, `how-she-hurt-me.html`.
- Landing name / portrait / "Read the full story" / top-right "About →" → `about.html`.
- Case-study "← Back" and About CTAs → landing (`index.html` in a real build).
- Email: `mosesm2022@gmail.com`; Instagram `momoses15`; LinkedIn `moses-markels`.

## Files (in this bundle)
- `Moses Markels - Portfolio.dc.html` — the landing / 3D cosmos experience (main spec). Rename to `index.html` equivalent in the target app.
- `about.html` — full About page.
- `unique-communications-ireland.html`, `spirit-airlines.html`, `betting-the-future.html`, `advice-from-strangers.html`, `success.html`, `how-she-hurt-me.html` — case studies.
- `project.css` — shared styles for the case-study + about pages (tokens, header, hero, grids, cursor, noise).
- `moses-portrait.jpg` — portrait asset.
- `support.js` — runtime the `.dc.html` uses to render (reference only; not needed once ported to a real framework).
