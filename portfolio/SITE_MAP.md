# Portfolio Website Sitemap and Prototype Scope

Status: Working specification  
Updated: 2026-07-16

## Route model

| Route | Screen / page | Prototype requirement |
|---|---|---|
| `/` | Intro animation, book cover, open-book home | Full 5-second animation and sound sequence |
| `/architecture` | Architecture category spread | 4 project entries |
| `/landscape` | Landscape category spread | 2 project entries |
| `/installation` | Installation category spread | 4 project entries across page spreads as needed |
| `/architecture/folded-courtyard` | Folded Courtyard detail | Full long-form page |
| `/architecture/island-for-the-stateless` | Island for the Stateless detail | Full long-form page |
| `/architecture/infinitas-hotel` | Infinitas Hotel detail | Full long-form page |
| `/architecture/countryside-introduction-planning` | Countryside Introduction Planning detail | Full long-form page |
| `/landscape/trojan-forest` | Trojan Forest detail | Full long-form page |
| `/landscape/s-o-s` | S + O + S detail | Full long-form page |
| `/installation/the-invisible-sisyphus` | The Invisible Sisyphus detail | Full long-form page |
| `/installation/the-cloud` | The Cloud detail | Full long-form page |
| `/installation/anti-wastecolonialism` | Anti-Wastecolonialism detail | Full long-form page |
| `/installation/three-body` | Three Body detail | Full long-form page |

Biography and experience appear within the home / book experience and global footer rather than as a fourth top-level category.

## Intro state sequence

| State | Time | Visual | Audio |
|---|---:|---|---|
| Void | 0.00-0.20s | Pure black | Very low ambient onset |
| Invocation | 0.20-1.35s | Inner and outer magic rings appear and rotate in opposite directions | Activation, rotational shimmer |
| Imprint | 1.35-2.00s | Rings contract and stamp into the floating book cover | Energy convergence, seal impact |
| Approach | 2.00-2.85s | Book moves rapidly toward camera | Low rush and bass swell |
| Rapid pages | 2.85-4.10s | Pages flip in a fast continuous sequence | Layered page flutter |
| Open book | 4.10-4.50s | Book settles into a front-facing open position | Final page turn and soft resonance |
| Hold | 4.50-5.00s | Open book remains still; category labels begin to emerge | Ambient tail |

The full sequence replays on every fresh website entry. Reduced-motion mode replaces it with a short fade from seal to open book.

## Home state

### Desktop

- Floating open book centered on a pure-black field
- Architecture, Landscape, and Installation placed across the spread
- Soft saturated gradient illumination across the pages
- Small sound toggle
- Compact Frieda Fan identity
- No visible conventional navigation bar

### Mobile

- Book remains the central motif but is cropped closer
- Categories stack vertically within the readable page area
- Motion is simplified to protect performance

## Category transition

1. User selects a category.
2. The English category label expands to the center.
3. Latin display text replaces or overlays it.
4. Witch-voice Latin cue plays.
5. Text diffuses into grain and glow.
6. Page-turn animation reveals the category spread.
7. Project entries appear with a restrained stagger.

## Category spreads

### Architecture

- Folded Courtyard
- Island for the Stateless
- Infinitas Hotel
- Countryside Introduction Planning

The four entries occupy one complete open-book spread on desktop. Mobile uses a vertical editorial index.

### Landscape

- Trojan Forest
- S + O + S

Each project receives one side of the open-book spread.

### Installation

- The Invisible Sisyphus
- The Cloud
- Anti-Wastecolonialism
- Three Body

Use two open-book spreads with two projects per spread. Page-turn controls and swipe / keyboard equivalents move between spreads.

## Project-detail template

Every project follows the same navigation model but may vary its editorial composition.

### Required modules

1. Hero
2. Project metadata
3. Short abstract
4. Context / problem
5. Concept
6. Research and process
7. Drawings / system / storyboard
8. Renderings / models / installation documentation
9. Details / materials / technology
10. Conclusion
11. Previous / next project
12. Return to category

### Black-theme projects

- Infinitas Hotel
- S + O + S
- The Invisible Sisyphus
- The Cloud
- Anti-Wastecolonialism
- Three Body

### Warm-ivory projects

- Folded Courtyard
- Island for the Stateless
- Countryside Introduction Planning
- Trojan Forest

## Persistent interaction rules

- Sound preference persists during the session.
- Returning from a project restores the previous category spread.
- Direct project URLs open without replaying an unrelated category transition.
- Fresh entry to `/` replays the full intro.
- All click targets have keyboard and touch equivalents.
- Scrolling project pages does not hijack the user's wheel or trackpad.
- Decorative motion pauses outside the viewport.
- Reduced-motion mode removes rapid flashes, strong parallax, and continuous rotation.

## Figma screen inventory

### Intro and home

- 7 desktop intro keyframes
- 1 desktop open-book home
- 1 mobile open-book home
- 1 reduced-motion entry state

### Category prototypes

- 3 category-title invocation states
- 1 Architecture spread
- 1 Landscape spread
- 2 Installation spreads
- 3 mobile category indexes

### Project details

- 10 desktop long-form detail pages
- 10 mobile key-layout detail pages

### Specifications

- Visual tokens and typography
- Book and magic-symbol assets
- Project-entry components
- Navigation states
- Motion timeline
- Audio cue sheet
- Asset source and AI-generation log

Minimum planned Figma frame count before component and state variants: 50.

## Development acceptance routes

The final website must pass direct-load and refresh checks for all 14 public routes listed above. Navigation must be reversible from every route without relying solely on browser history.
