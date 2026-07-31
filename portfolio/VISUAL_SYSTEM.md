# New Psychedelic Y2K Portfolio Visual System

Status: Design specification before Figma implementation  
Updated: 2026-07-16

## Visual thesis

A luminous magic book floating between an experimental art magazine and a turn-of-the-millennium digital artifact. Saturated color behaves like sprayed light rather than hard neon. Images overlap, drift, and break the grid, while project text remains calm and highly readable.

## Reference translation

The supplied references establish four complementary behaviors:

1. Dark spatial fields with floating editorial planes and noisy colored illumination
2. A glowing multicolor book against black
3. Stacked graphic layers, high-contrast black grounds, and star-like optical symbols
4. Warm-white pages with airbrushed gradients, soft-focus image strips, and generous empty space

These are translated into one system rather than copied as separate styles.

## Theme tokens

### Dark theme

| Token | Value | Use |
|---|---|---|
| `--bg` | `#050507` | Main background |
| `--surface` | `#111116` | Quiet secondary field |
| `--text` | `#F5F0E8` | Main text |
| `--muted` | `#ABA5B0` | Metadata and captions |
| `--line` | `rgba(245,240,232,.22)` | Dividers and drawing frames |
| `--shadow` | `rgba(0,0,0,.65)` | Deep media shadow |

Dark pages should feel black rather than navy. Color enters through light, image, and symbol layers.

### Warm-ivory theme

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F1EBDD` | Main background |
| `--surface` | `#E7DECE` | Secondary field |
| `--text` | `#171317` | Main text |
| `--muted` | `#746D6A` | Metadata and captions |
| `--line` | `rgba(23,19,23,.22)` | Dividers and drawing frames |
| `--shadow` | `rgba(45,27,37,.15)` | Soft media shadow |

Warm-ivory pages must remain visibly warm and tactile, not plain white.

## Accent colors

| Name | Value |
|---|---|
| Signal red | `#FF3D4D` |
| Bloom pink | `#FF67C8` |
| Solar yellow | `#FFD84D` |
| Acid green | `#79F26B` |
| Electric cyan | `#58E6E6` |
| Cobalt blue | `#466CFF` |
| Violet | `#9B66FF` |

No page should use all accents at equal strength. Each project receives one dominant pair and one minor interruption.

## Gradient families

### Aurora

Pink -> red -> solar yellow -> cyan -> cobalt -> violet

Use on the magic book, page edges, magic circle, category invocation, and rare full-field moments.

### Heat bloom

Red center -> pink edge -> cobalt haze

Use behind black-theme project titles and installation media.

### Meadow flare

Yellow -> acid green -> cyan

Use for landscape systems and ecological diagrams.

### Powder spectrum

Transparent pink / blue / green airbrush on warm ivory

Use behind cropped images and section transitions. It should resemble sprayed pigment, not a software gradient rectangle.

## Typography

### Roles

| Role | Direction |
|---|---|
| Display serif | High-contrast editorial serif for project titles and book headings |
| Display sans | Wide or geometric Y2K sans for category invocations and metadata |
| Reading sans | Neutral but characterful sans for long project text |
| Technical mono | Compact mono for dates, coordinates, figure numbers, and audio / motion specs |

### Working open-font shortlist

- Display serif: Bodoni Moda
- Display sans: Unbounded
- Reading sans: IBM Plex Sans
- Technical mono: IBM Plex Mono

Font availability, self-hosting files, and licenses must be verified before final implementation.

### Type scale - desktop

| Style | Size | Line height |
|---|---:|---:|
| Category invocation | 120-180 px | 0.88 |
| Project hero | 88-144 px | 0.9 |
| Section title | 44-64 px | 1.0 |
| Abstract | 26-34 px | 1.3 |
| Body | 18-21 px | 1.55 |
| Caption | 12-14 px | 1.4 |
| Metadata | 11-13 px | 1.2 |

Body copy should generally remain within 620-760 px.

## Layout system

### Base grid

- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns
- Outer margin: 4-6vw desktop, 20-24 px mobile
- Vertical section spacing: 120-220 px desktop, 72-120 px mobile

The base grid exists for alignment but should not be visible as a repetitive card matrix.

### Editorial composition rules

- Combine full-width media with narrow text columns.
- Allow images to span 3, 5, 7, 8, or 10 columns rather than repeating halves and thirds.
- Introduce one deliberate overlap or grid break per major section.
- Use asymmetry to create direction, not arbitrary imbalance.
- Preserve large areas of empty background.
- Technical drawings can sit calmly and orthogonally even when surrounding images are expressive.
- Long drawings and sections must be shown uncropped or inside a pan / zoom viewer.

### Image treatments

- Soft rectangular crops with no universal rounded corners
- Elliptical or arched masks for occasional conceptual images
- Offset double-image treatment for before / after or phase comparisons
- Horizontal film strips for process sequences
- Free-floating cutouts for plants, models, and material fragments
- Full-bleed hero image only where the source can support it
- Thin figure numbers and captions anchored to the grid

Never place every image inside a uniform card.

## Texture and optical effects

### Grain

- Global monochrome grain: 2-4% opacity
- Enlarged colored grain: only in hero and transition moments
- Grain must not reduce drawing legibility

### Spray and blur

- 1-3 airbrushed color clouds per viewport maximum
- Blur radius should create atmosphere without obscuring content edges
- On warm ivory, spray should feel printed or pigmented
- On black, glow should feel emitted from images or symbols

### Chromatic aberration

- Maximum 2-4 px color offset
- Allowed on category titles, magic symbols, and hover transitions
- Forbidden on body text and technical labels

### Starbursts and symbols

- Four-point stars, orbit rings, sigils, and radial marks
- Use as wayfinding and chapter punctuation
- Symbols may rotate or pulse slowly but should stop outside the viewport
- Avoid generic sci-fi HUD decoration

## Project color assignments

| Project | Dominant accent | Secondary accent |
|---|---|---|
| Folded Courtyard | Powder pink | Electric cyan |
| Island for the Stateless | Cobalt blue | Acid green |
| Infinitas Hotel | Bloom pink | Cobalt blue |
| Countryside Introduction Planning | Signal red | Acid green |
| Trojan Forest | Acid green | Cobalt blue |
| S + O + S | Solar yellow | Electric cyan |
| The Invisible Sisyphus | Signal red | Electric cyan |
| The Cloud | Bloom pink | Violet |
| Anti-Wastecolonialism | Acid green | Bloom pink |
| Three Body | Cobalt blue | Signal red |

## Component direction

### Project index entry

- Image or custom sigil
- Project title
- Year / location
- No rounded card container
- Hover: image separates into slight RGB offsets; title shifts 4-8 px; sigil activates

### Project metadata

- Thin typographic list or table
- No pill chips
- Labels remain small and technical

### Navigation

- Minimal text and symbol navigation
- Visible focus state
- Sound control always reachable
- Previous / next navigation becomes part of the final editorial composition

## Motion grammar

| Motion | Duration | Character |
|---|---:|---|
| Hover / focus | 160-240 ms | Crisp |
| Small reveal | 350-500 ms | Soft deceleration |
| Section reveal | 650-900 ms | Editorial |
| Page turn | 800-1200 ms | Physical and weighted |
| Category invocation | 1400-2200 ms | Ritual |
| Full intro | 5000 ms | Cinematic |

Animate opacity, transform, clip path, and carefully controlled filters. Avoid animating layout dimensions where possible.

## Readability rules

- Body contrast must remain at least WCAG AA.
- No body paragraph sits directly on a saturated gradient.
- Grain and color separation are disabled behind small text.
- Captions remain visible at 200% zoom.
- Line length remains 45-75 characters for long text.
- Motion never blocks scroll for long-form project reading.
- Every sound cue has a visual equivalent.
- Reduced-motion mode preserves information and navigation.

## Anti-patterns

- Corporate hero + three-card feature grid
- Bento dashboards
- Glassmorphism panels
- Universal 16 px rounded rectangles
- Purple-blue neon on every surface
- Repeating scroll fades on every image
- Random floating decoration without narrative purpose
- Illegible white text over bright renderings
- Distorting architectural drawings to fit decorative masks
