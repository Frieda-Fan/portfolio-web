# Figma-Controlled Website System

## Core rule

The portfolio is one product with one design workflow:

`portfolio source assets and copy → Figma design → Figma-to-code translation → local website → visual validation`

Figma file `l5lO3iusxMpin1GtDVfYcC` is the authoritative editing and design layer. The React website at `http://127.0.0.1:4174/` is its coded runtime. They are not two independently designed versions.

The repository remains authoritative only for original high-resolution portfolio files, verified project copy, optimized web derivatives, application code, and validation history. Figma controls:

- page and route composition;
- layout, hierarchy, spacing, alignment, sizing, and responsive intent;
- typography, color, effects, backgrounds, and image crops;
- reusable components and instance overrides;
- project image selection, order, grouping, and captions;
- prototype navigation, visible interaction states, and motion intent;
- the visual result shown in Figma Presentation mode.

When Figma and the website disagree, Figma wins unless the user explicitly requests a Figma change first.

## Required update chain

Every design-related website update must use this order.

### 1. Identify the current Figma source

- Use the existing file; do not create a replacement.
- Record the exact page/node ID and retrieval time.
- Read the target with the Figma design-to-code context tool before editing code.
- For a full-flow update, inspect the page metadata to identify its top-level frames, then read each affected frame or a suitably scoped parent node.
- Never infer the latest design from old screenshots, the local website, or a previous sync JSON.

### 2. Extract a design manifest

For each affected route, collect:

- source Figma node ID;
- frame dimensions and background;
- direct layout hierarchy and component instances;
- visible text and text styles;
- image assets, crop mode, sequence, and matrix/group structure;
- navigation destinations and prototype states;
- motion/transition intent;
- desktop/mobile behavior or a documented responsive inference.

The manifest may be represented in `src/generated/figma-sync.json` and project data, but it must reflect the actual current Figma nodes. A manually maintained override is not authoritative unless it was derived from the current Figma inspection.

### 3. Translate Figma into the existing codebase

- Reuse the existing React components, routes, GSAP timelines, CSS tokens, and portfolio assets where they match.
- Adapt Figma output to the project architecture; do not paste generated reference code blindly.
- Download and keep exact exported Figma assets when the asset does not already exist locally.
- Preserve original portfolio files. Web optimization creates derivatives and never overwrites source material.
- Implement Figma component reuse with shared website components and tokens.
- Implement Figma page/image order deterministically in data, not through broad filesystem discovery.

### 4. Validate before accepting the sync

At minimum:

- production build;
- all affected routes return HTTP 200;
- zero missing images and console errors;
- zero unintended horizontal overflow;
- screenshot comparison at the same desktop dimensions as Figma;
- representative mobile comparison or an explicit note when Figma has no mobile design;
- interaction and motion checks for changed prototype states.

Completion means the coded result matches the inspected Figma source closely enough that differences are implementation constraints, not independent design decisions.

### 5. Record the accepted version

Update:

- `src/generated/figma-sync.json` with the actual source nodes and sync time;
- `portfolio/FIGMA_BUILD_STATE.json` with the current phase and authority chain;
- `portfolio/BUILD_JOURNAL.md` with the affected nodes, implementation result, evidence, and unresolved differences.

## Local automation

The local bridge remains useful for fast edits to validated variables:

1. Start it with `npm run figma:bridge`.
2. Run the local Figma plugin.
3. Sync the validated variable payload.
4. The bridge backs up the previous JSON, writes the new contract, builds, and rolls back on failure.

This bridge is only one part of the system. It does not replace full Figma-to-code inspection for layout, component, image-order, page-structure, or prototype changes.

## Safety and operating constraints

- The Figma file key is locked to `l5lO3iusxMpin1GtDVfYcC`.
- The bridge binds only to `127.0.0.1`.
- Do not deploy to Vercel or another host unless the user explicitly changes that decision.
- Do not delete the retained local website while syncing; it is the runtime review target.
- Do not update Figma by capturing the current website unless the user explicitly asks for a code-to-Figma operation.
- Do not claim synchronization from a media count or JSON update alone; synchronization requires node-level Figma inspection and visual validation.
