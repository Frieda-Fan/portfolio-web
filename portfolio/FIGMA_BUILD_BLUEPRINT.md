# Figma Build Blueprint

This document is the deterministic build map for the portfolio Figma file. The rendered website is the visual source of truth; Figma must reproduce it without introducing a second visual direction.

## File name and page structure

File name: `Frieda Fan — Spatial Works / Portfolio Prototype`

1. `00 — Cover & Read Me`
2. `01 — Foundations`
3. `02 — Components`
4. `03 — Intro Motion`
5. `04 — Home & Info`
6. `05 — Architecture`
7. `06 — Landscape`
8. `07 — Installation`
9. `08 — Project Pages / Ivory`
10. `09 — Project Pages / Dark`
11. `10 — Mobile`
12. `11 — Prototype Map`
13. `12 — Asset & Audio Credits`

## Foundations

Create variables from `portfolio/VISUAL_SYSTEM.md`.

- Background / Ink: `#07070A`
- Background / Paper: `#F1EBDD`
- Accent / Pink: `#FF4A9D`
- Accent / Red: `#FF584D`
- Accent / Yellow: `#F6EA62`
- Accent / Cyan: `#35D9E6`
- Accent / Blue: `#5264FF`
- Accent / Violet: `#9A54FF`
- Dark hairline: white at 22%
- Light hairline: `#07070A` at 22%
- Desktop gutter: 32 px
- Mobile gutter: 18 px
- Desktop grid: 12 columns / 24 px gap

Text styles:

- Display Serif: Bodoni Moda / Regular
- Display Sans: Unbounded / Medium
- Body: IBM Plex Sans / Regular
- Metadata: IBM Plex Mono / Medium

Effects:

- Fine monochrome grain at 12% / soft-light
- Airbrush aura: 36 px blur
- Magic glow: pink, violet, cyan, and yellow with restrained bloom
- No glassmorphism, uniform rounded cards, or generic bento layout

## Components

Build these as components with variants:

- `Nav / Global`: dark, ivory, desktop, mobile
- `Control / Sound`: on, off, desktop, compact mobile
- `Magic Seal`: full, compact, rotating outer ring, rotating inner ring, imprinted
- `Book / State`: closed, imprinted, flip midpoint, open
- `Category Link`: default, hover, focus
- `Project Sigil`: ivory-book placement, two-up, four-up, hover
- `Book Pagination`: first, middle, last
- `Project Metadata Row`: year, location, type
- `Project Media Chapter`: full, narrow, offset
- `Project Footer Link`: previous, index, next
- `Disclosure / AI Editorial`: dark overlay

All interactive components require visible keyboard-focus variants.

## Desktop frames

Base viewport: 1440 × 1000.

### Intro and home

- `Intro / 00 Sound Gate`
- `Intro / 01 Circle Appears`
- `Intro / 02 Counter Rotation`
- `Intro / 03 Seal Converges`
- `Intro / 04 Closed Book`
- `Intro / 05 Imprinted Book`
- `Intro / 06 Book Approach`
- `Intro / 07 Page Flip`
- `Intro / 08 Open Book Hold`
- `Home / Open Book Index`
- `Info / Hero`
- `Info / Biography + Experience`

### Category frames

- `Architecture / Ritual`
- `Architecture / Index / 4 projects`
- `Landscape / Ritual`
- `Landscape / Index / 2 projects`
- `Installation / Ritual`
- `Installation / Leaf 1 / Invisible Sisyphus + The Cloud`
- `Installation / Leaf 2 / Anti-Wastecolonialism + Three Body`

### Ivory project frames

Each project is a vertical scrolling prototype frame with a hero, statement, ordered media chapters, and previous/index/next footer.

- `Project / Folded Courtyard / Ivory` — 79 project images
- `Project / Island for the Stateless / Ivory` — 10 project images
- `Project / Countryside Introduction Planning / Ivory` — 13 project images
- `Project / Trojan Forest / Ivory` — 29 project images

### Dark project frames

- `Project / Infinitas Hotel / Dark` — 14 project images
- `Project / S + O + S / Dark` — 6 project images
- `Project / The Invisible Sisyphus / Dark` — 40 project images
- `Project / The Cloud / Dark` — 8 project images
- `Project / Anti-Wastecolonialism / Dark` — 5 project images
- `Project / Three Body / Dark` — one disclosed editorial cover plus all 6 original fragments

For Three Body, keep the exact disclosure:

`AI-generated editorial interpretation · not project documentation`

## Mobile frames

Base viewport: 390 × 844.

Required:

- Sound Gate
- Intro / open-book hold
- Home
- Info
- Architecture index
- Landscape index
- Installation leaf 1
- Installation leaf 2
- Folded Courtyard hero + first media rhythm
- Infinitas Hotel hero + first media rhythm
- The Cloud hero + first media rhythm
- Three Body hero + disclosure
- Project footer stack

Mobile uses normal vertical scroll. Do not add scroll hijacking.

## Prototype links

- Sound Gate / Enter with sound → Intro / Circle Appears
- Sound Gate / Enter muted → Intro / Circle Appears
- Intro states advance automatically in sequence
- Intro / Open Book Hold → Home / Open Book Index
- Global wordmark → Home
- Global Info → Info
- Global category names → corresponding category ritual
- Home category links → corresponding category ritual
- Category ritual → category index after title dissolve
- Project sigil → project detail
- Installation next/previous leaf → adjacent leaf
- Project back link → corresponding category index
- Project footer previous/next → adjacent global project
- Project footer index → current category index
- Info footer → Home

## Intro motion timing

Match `portfolio/SOUND_AND_MOTION_SPEC.md`.

| Time | State |
|---|---|
| 0.00–0.55 s | Seal fades and scales in |
| 0.12–1.17 s | Outer and inner rings counter-rotate |
| 1.06–1.54 s | Seal contracts toward the book |
| 1.36 s | Closed book appears |
| 1.69 s | Imprinted state |
| 1.68–2.34 s | Book approaches |
| 2.38–3.20 s | Rapid page flip |
| 3.20 s | Open book |
| 3.20–5.00 s | Settle and hold |
| 5.00 s | Destination route appears |

Figma motion uses Smart Animate where node continuity is reliable. Use dissolve for generated-book state changes and preserve-position overlays for the SVG seal. Complex page-flip sound and the eight procedural flip accents are annotated on the timeline rather than simulated as separate Figma audio tracks.

## Category ritual

For each category:

1. English title scales from 28% to 100%.
2. Latin title rises and fades in.
3. Witch-like spoken Latin plays with reverb.
4. English and Latin titles blur and dissolve.
5. Book index and project sigils appear with a stagger.

Labels:

- Architecture / `Architectūra`
- Landscape / `Forma Terrae`
- Installation / `Ars in Situ`

## Sound annotations

Attach notes to the relevant frames:

- Seal activation
- Rotating energy bed
- Convergence
- Imprint impact
- Book approach
- Eight rapid page turns
- Open-book chime
- Single page turn
- Project-sigil appearance
- Latin category voice
- Sound on/off feedback

Voice files:

- `public/audio/voice/architecture.wav`
- `public/audio/voice/landscape.wav`
- `public/audio/voice/installation.wav`

## Source mapping

- Visual source of truth: the production build in `dist/`
- Project data and image order: `src/data/projects.js`
- English copy: `portfolio/WEB_COPY_DRAFT.md`
- Visual tokens: `portfolio/VISUAL_SYSTEM.md`
- Motion/audio: `portfolio/SOUND_AND_MOTION_SPEC.md`
- Generated asset provenance: `portfolio/ASSET_SOURCE_LOG.md`
- Sitemap and navigation: `portfolio/SITE_MAP.md`
- Executable capture list: `portfolio/FIGMA_CAPTURE_MANIFEST.json`

## Capture contract

- Append `?capture=1` to every static page imported from the running production preview.
- This capture-only query bypasses the sound gate, five-second intro, category ritual, and scroll-trigger concealment so Figma receives the intended resting state with every image loaded.
- Use `&leaf=2` for the second Installation book spread.
- Do not use capture URLs as public prototype destinations. Normal URLs retain the complete required entry ritual.
- The dedicated browser audit `scripts/figma_capture_audit.mjs` must pass before importing or refreshing captured frames.

## Figma completion checklist

- All 15 routes represented
- All 10 projects present
- All 210 original project images included in their narrative order
- Three Body editorial image separately disclosed
- Desktop and required mobile frames present
- All entry, category, project, pagination, return, and footer links connected
- Motion duration and easing documented
- Audio filenames and trigger times documented
- Dark/ivory theme assignment correct
- Components and variables used instead of detached duplicates
- No missing fills, placeholder rectangles, or unresolved external image links
