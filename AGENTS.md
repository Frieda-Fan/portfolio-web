# Portfolio Website Instructions

## Figma-controlled website workflow

Figma file `l5lO3iusxMpin1GtDVfYcC` is the authoritative design and layout layer for this website. The local website is the coded runtime generated from that design; it is not a separately designed version.

Before every website design, layout, component, media-order, typography, color, or interaction change:

1. Read `portfolio/FIGMA_SYNC_SYSTEM.md`.
2. Read the latest target Figma node with the Figma design-to-code workflow. Do not implement from memory, an old screenshot, or the current website alone.
3. Compare the current Figma node structure and screenshot with the website.
4. Translate Figma frames, components, variables, prototype states, image order, and responsive intent into the existing React/CSS architecture.
5. Preserve portfolio source files as the content archive, but let Figma determine which assets appear and how they are arranged.
6. Validate the coded page against Figma at matching viewport dimensions before reporting completion.
7. Update the Figma sync contract/state and development journal with the exact source node and validation result.

If Figma and the website disagree, Figma wins unless the user explicitly says to change Figma first. Never capture the website back into Figma and treat that capture as an independent design source.

## Development journal

Before making website changes, read `portfolio/BUILD_JOURNAL.md` to understand the project goals, established decisions, known failures, and current Skill candidates.

After completing a meaningful website task, update `portfolio/BUILD_JOURNAL.md` when the work produces at least one of the following:

- A design, content, architecture, tooling, or deployment decision that future work should preserve.
- A problem whose cause and effective solution were discovered.
- A repeatable workflow, rule, checklist, or automation candidate.
- A validation result that changes confidence in the site.
- A meaningful change to the next planned task.

Do not log routine edits, raw terminal output, full conversations, or facts that are obvious from the code. Keep entries concise and append to the current session instead of rewriting earlier history.

For each meaningful task:

1. State the task goal and completion criteria before implementation.
2. Preserve existing confirmed decisions unless the user explicitly changes them.
3. Verify the result in proportion to its risk.
4. Record the outcome, evidence, unresolved issues, and reusable learning.
5. Add a Skill candidate only when the knowledge is non-obvious, likely to recur, or easy to get wrong.

Never write secrets, tokens, account credentials, private personal information, or unnecessarily large logs to the journal.
