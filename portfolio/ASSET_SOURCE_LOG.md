# Asset Reference and Generation Log

Status: Active  
Updated: 2026-07-16

This log records external references, user-supplied references, generation prompts, selected outputs, and intended website use. References inform art direction only; generated assets must be original.

## User-supplied references

| Reference | Role |
|---|---|
| Glowing open book on black | Core book material, page glow, multicolor illumination |
| Dark floating editorial planes | Spatial depth, black-field composition, grain |
| Stacked black-background graphic system | Layering, starbursts, saturated accent blocks |
| Warm-ivory airbrush collage | Spray gradients, soft focus, open editorial spacing |
| Front-facing open-book diagram | Final open-book geometry and centered front view |

The clipboard files are temporary references and must not be used as production dependencies.

## External visual references

| Source | Useful quality | Production use |
|---|---|---|
| https://www.siegelgale.com/reality-check-the-real-value-of-ai-for-branding/ | Iridescent digital book wave on a dark field | Material and light reference only |
| https://shiverarts.com/products/star-aura | Soft star-shaped pink / blue / orange aura | Airbrush and star-glow reference only |
| https://www.ondastudio.co/projects/finiam | Restrained pastel starburst with warm negative space | Warm-theme symbol reference only |
| https://bitrebels.com/design/a-futuristic-digital-library-created-with-colorful-led-books/ | Translucent illuminated book objects | Luminous-edge and book-material reference only |

## Generation set A - core magic book

### Asset A1: Floating closed magic book

- Use: Intro state before the seal imprint
- Background: Pure black
- View: Centered, slightly elevated three-quarter view
- Required continuity: Must share silhouette, cover proportions, and material language with A2-A4
- Status: Selected v1 and copied into the production asset library
- Production file: `portfolio/assets/generated/magic-book-closed-v1.png`
- Generated: 2026-07-16 with GPT Image
- Source references: selected A4 continuity anchor and user-supplied glowing open book
- Prompt summary: the same wide sculptural book in a closed state, isolated on black, blank near-black violet cover, luminous layered page edges, restrained iridescent rim light, fine grain, and negative space for the incoming seal
- Review: Accepted for the distant and approach shots. The empty cover center is intentionally reserved for a separate vector magic-circle layer and the A2 imprinted state.

### Asset A2: Imprinted book cover

- Use: Seal impact state
- Background: Pure black
- View: Same camera as A1
- Required continuity: Same book, with the magic-circle seal embedded into the cover
- Status: Selected v1 and copied into the production asset library
- Production file: `portfolio/assets/generated/magic-book-imprinted-v1.png`
- Generated: 2026-07-16 with GPT Image, using A1 as the direct edit base
- Prompt summary: preserve A1 and fuse a centered, shallow-embossed two-ring editorial magic seal into the cover using sparse orbital arcs, radial axes, small star points, and controlled spectral glow
- Review: Accepted. A1/A2 framing is sufficiently stable for a short opacity dissolve and impact flash. The seal geometry will also be rebuilt as SVG so the pre-impact rings can rotate independently and remain resolution-independent.

### Asset A3: Rapid page-turn midpoint

- Use: Intro page-flip sequence
- Background: Pure black
- View: Approaching front view
- Required continuity: Same book, several luminous pages suspended in motion
- Status: Selected v1 and copied into the production asset library
- Production file: `portfolio/assets/generated/magic-book-page-flip-v1.png`
- Generated: 2026-07-16 with GPT Image, using A2 and A4 as continuity anchors
- Prompt summary: the same book at an almost front-facing 125–145 degree opening angle, with 5–7 luminous translucent pages crossing in clean arcs, restrained tip blur, sharp covers and spine, and no literal content
- Review: Accepted as the rapid-flip midpoint. It preserves the central gutter and spectral material language of A4 while adding a clear, readable motion silhouette.

### Asset A4: Front-facing open magic book

- Use: Final intro frame and home navigation
- Background: Pure black
- View: Symmetrical front view, nearly full width
- Required continuity: Same book, readable open-page surfaces for UI overlays
- Status: Selected v1 and copied into the production asset library
- Production file: `portfolio/assets/generated/magic-book-open-front-v1.png`
- Generated: 2026-07-16 with GPT Image
- Source references: user-supplied glowing open book, warm-ivory airbrush collage, and front-facing open-book diagram
- Prompt summary: one symmetrical front-facing open sculptural magic book on an infinite pure-black field; luminous layered pages; pink, red, yellow, cyan, cobalt, and violet airbrushed gradients; fine printed grain; subtle chromatic separation; calm page surfaces reserved for interface overlays; no text, logo, watermark, environment, gothic leather, or extra objects
- Review: Accepted as the continuity anchor for A1-A3. The silhouette, central gutter, page proportions, restrained glow, and large readable page surfaces meet the homepage and transition requirements.

## Core-book prompt basis

Use case: stylized-concept  
Asset type: website intro and navigation hero  
Primary request: an original floating magic book designed for a new-psychedelic Y2K editorial portfolio  
Scene/backdrop: pure black infinite background, no table, no room, no environment  
Subject: one sculptural book with luminous layered pages  
Style/medium: high-end 3D editorial object, soft film grain, airbrushed glow, subtle chromatic separation  
Color palette: pink, red, yellow, cyan, cobalt blue, violet, with controlled saturation  
Materials/textures: translucent page edges, softly reflective cover, fine printed grain  
Constraints: no text, no logos, no watermark, no occult horror clichés, no gothic leather, no cheap cyberpunk neon, no extra objects  
Reference roles: glowing-book image for material and illumination; warm airbrush image for gradient softness and star-like light behavior

## Core-book set completion

- A1-A4 were all accepted on 2026-07-16.
- The four files are production-owned copies under `portfolio/assets/generated/`.
- A1 and A2 are matched closely enough for a short opacity dissolve plus impact flash.
- A3 and A4 provide the main opening/flip silhouettes; intermediate animation will be created with layered page masks rather than presenting the generated frames as literal continuous simulation.
- The A2 seal will be rebuilt as SVG for independent inner/outer rotation, crisp scaling, and reduced-motion support.

## Safety and truthfulness

- AI-generated assets are interface and atmosphere assets.
- AI-generated material must not be presented as documentation of built architecture or completed installations.
- When generated imagery supports Three Body, it must be labeled internally as editorial concept imagery and remain distinguishable from the six original documentation fragments.

## Generation set B — editorial support and sharing

### Asset B1: Three Body editorial interpretation

- Use: Project index cover and project-page opening atmosphere for Three Body
- Production file: `portfolio/assets/generated/three-body-editorial-v1.png`
- Web derivative: `web-assets/assets/generated/three-body-editorial-v1.webp`
- Generated: 2026-07-16 with the built-in GPT Image workflow
- Reference research: suspended silk, tension-thread, kinetic fabric, and dark-gallery examples were reviewed for abstract properties only
- Prompt summary: three translucent textile membranes held in an unstable triangular relation by fine threads, three orbital energy nodes, pure black void, spectral pink/cyan/violet light, analog grain, no gallery, people, machinery, text, or documentary setting
- Disclosure: The website labels this image “AI-generated editorial interpretation · not project documentation.”
- Review: Accepted. It gives the six low-resolution source fragments a legible editorial entry point without claiming a fabricated finished installation.

### Asset B2: Social-sharing magic book

- Use: Open Graph and Twitter large-image preview
- Production file: `portfolio/assets/generated/social-share-book-v1.png`
- Web derivative: `web-assets/assets/generated/social-share-book-v1.webp`
- Public delivery copy: `public/social-share-book-v1.webp`
- Generated: 2026-07-16 with the built-in GPT Image workflow
- Prompt summary: a front-facing luminous open book on pure black, restrained spectral page glow, subtle central seal, left-side negative space, no text, logos, people, room, table, or watermark
- Review: Accepted as a brand-level sharing image. Text remains in semantic page metadata instead of being baked into the generated raster.
