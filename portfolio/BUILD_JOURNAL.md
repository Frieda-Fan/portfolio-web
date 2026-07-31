# Personal Portfolio Website — Build Journal

本文件是个人网站的持续开发记录，也是未来提炼 Codex Skill 的原始材料。

Codex 开始网站任务前应先阅读本文件；完成有意义的任务后，只记录关键决策、问题根因、验证结果和可复用经验。不要记录普通改字、微小样式调整、完整聊天或大段终端输出。

---

## 1. 项目目标

### 网站目的

- 展示个人背景、能力和代表作品。
- 让访客快速理解“我是谁、我做什么、我的作品有什么价值”。
- 为招聘、合作和个人展示提供一个稳定入口。

### 主要访客

- 招聘者和潜在合作方。
- 对建筑、设计及相关作品感兴趣的人。
- 需要进一步了解项目过程和个人能力的人。

### 当前成功标准

- 访客能在较短时间内理解个人定位。
- 作品入口明确，项目内容具有清楚的叙事顺序。
- 桌面端和移动端均可正常浏览，没有明显错位或横向滚动。
- 建筑图纸、分析图和效果图不会因错误裁切而丢失关键信息。
- 图片质量与加载速度取得合理平衡。
- 站点能够稳定构建和部署，主要链接可正常访问。

### 待用户确认

- [ ] 技术栈
- [ ] 网站语言：中文 / 英文 / 双语
- [ ] 部署平台和域名
- [ ] 是否需要内容管理系统
- [ ] 视觉关键词和参考网站
- [ ] 必须上线的页面和作品范围

---

## 2. 已确认规则与决策

只记录未来开发必须继续遵守、且无法轻易从代码推断的规则。

### D-001：开发过程需要持续沉淀

- 日期：2026-07-15
- 状态：已确认
- 决策：在真实开发过程中记录关键经验，再从重复且已验证的经验中提炼 Skill。
- 原因：避免在开发开始前根据想象设计过多 Skill。
- 影响：每个重要里程碑结束后回顾本文件，但不将普通开发流水写入记录。

<!-- 新决策使用以下格式追加：

### D-XXX：简短标题

- 日期：YYYY-MM-DD
- 状态：候选 / 已确认 / 已废弃
- 背景：为什么需要做决定
- 决策：最终选择什么
- 原因：为什么这样选择
- 放弃的方案：可选
- 验证证据：截图、测试、构建结果或用户反馈
- 影响范围：哪些页面、组件或后续任务必须遵守
-->

---

## 3. 已知问题与有效解决方案

只有确认了问题根因或获得了有效解决方案后才记录。不要只保存报错文本。

<!-- 使用以下格式追加：

### F-XXX：问题标题

- 日期：YYYY-MM-DD
- 状态：已解决 / 暂时规避 / 未解决
- 表现：用户或开发者看到了什么
- 环境：浏览器、设备、构建或部署环境
- 根因：问题为什么发生
- 无效尝试：哪些方法没有解决问题，以及原因
- 有效方案：最终如何解决
- 验证方法：如何证明已经解决
- 防止复发：下次应遵守的规则或可自动化检查
-->

目前暂无已确认问题。

---

## 4. 可复用模式

记录已经在真实任务中有效、未来可能再次使用的做法。

<!-- 使用以下格式追加：

### P-XXX：模式名称

- 首次验证：YYYY-MM-DD
- 使用场景：什么时候使用
- 操作步骤：保持简短
- 不适用场景：什么时候不要使用
- 证据：在哪些页面或任务中验证过
- 重复次数：1
-->

目前暂无已验证模式。

---

## 5. Skill 候选池

候选项不是正式 Skill。满足“重复出现、容易做错、Codex 无法自行推断、已有验证方案”中的至少两项后，再考虑创建。

| 候选 Skill | 解决的问题 | 当前证据 | 重复次数 | 状态 |
|---|---|---|---:|---|
| `shape-portfolio-case-study` | 将图片、文字和项目资料整理为完整案例叙事 | 尚未验证 | 0 | 观察中 |
| `apply-portfolio-visual-system` | 在不同页面保持个人视觉语言一致 | 尚未验证 | 0 | 观察中 |
| `build-portfolio-project-page` | 使用既有结构稳定地新增作品详情页 | 尚未验证 | 0 | 观察中 |
| `audit-portfolio-site` | 系统检查响应式、内容、链接、性能与构建 | 尚未验证 | 0 | 观察中 |
| `prepare-portfolio-images` | 针对效果图、摄影和图纸采用合适的图片处理方式 | 尚未验证 | 0 | 观察中 |
| `replace-figma-project-media` | 保留项目封面并以低嵌套、通栏等尺寸图层替换 Figma 正文媒体 | 已在 Landscape/Architecture 与 Installation 两批项目验证 | 2 | 值得提炼 |

状态可使用：`观察中`、`值得提炼`、`已创建`、`不再需要`。

---

## 6. 开发会话

每个有意义的任务追加一个会话。开始时填写目标和完成标准；结束时填写实际结果、验证、问题和经验。没有内容的栏目可以删除。

<!-- 复制以下模板：

### S-XXX — YYYY-MM-DD — 会话标题

#### 本次目标

- 要解决的问题：
- 完成标准：

#### 实际完成

- 完成内容：
- 主要涉及文件：

#### 关键决策

- 决策：
- 原因：
- 如属于长期规则，同时更新“已确认规则与决策”。

#### 问题与解决

- 表现：
- 根因：
- 有效方案：
- 如值得长期保留，同时更新“已知问题与有效解决方案”。

#### 验证证据

- [ ] 自动化测试
- [ ] 生产构建
- [ ] 桌面端检查
- [ ] 移动端检查
- [ ] 部署后检查
- 结果或未验证原因：

#### 可复用经验

- 新发现：
- 是否已重复出现：
- 对应 Skill 候选：

#### 未解决事项与下一步

- 未解决：
- 下一步：
-->

### S-001 — 2026-07-15 — 建立开发记录机制

#### 本次目标

- 要解决的问题：让 Codex 在开发个人网站时持续记录可复用经验。
- 完成标准：项目中存在可自动发现的记录指令和结构化记录容器。

#### 实际完成

- 建立项目级 `AGENTS.md` 指令。
- 建立 `portfolio/BUILD_JOURNAL.md` 记录容器。

#### 关键决策

- 使用“短指令 + 详细日志”的两层结构。
- 只记录关键摩擦和验证证据，不记录普通开发流水。

#### 验证证据

- 已确认两个文件均位于项目仓库内。
- 尚未通过真实网站开发任务验证记录流程。

#### 可复用经验

- 当前只是记录机制，至少完成一个真实页面后再判断是否应提炼为独立 Skill。

#### 未解决事项与下一步

- 下一步：确认网站技术栈、语言、视觉方向和首个要完成的页面。

### S-002 — 2026-07-15 — 魔法书作品集信息架构梳理

#### 本次目标

- 要解决的问题：将“魔法书”主题与 Architecture、Landscape、Installation 三个作品分类组织成清晰、可实现的网站流程。
- 完成标准：确定首次进入、分类列表、项目详情的层级与返回逻辑，并定义动画和访问性边界。

#### 实际完成

- 提出三层架构：动画状态（加载/法阵/封面/开书/分类引导）、可深链接的路由（首页/分类/项目）、独立的作品内容数据。
- 建议 Architecture 以 4 个图标呈现于一个展开书页；Landscape 和 Installation 以每个展开书页 2 个项目的方式分页。

#### 关键决策

- 建议（待用户确认）：开场动画仅在首次进入播放，提供 Skip intro 与静音控件；所有项目详情保持标准纵向滚动阅读。
- 原因：兼顾主题仪式感、招聘阅读效率、浏览器的音频自动播放限制及减弱动画需求。

#### 验证证据

- 未进行实现或视觉验证；待用户确认架构、提供法阵与书籍素材后，实作首页动效原型。

#### 未解决事项与下一步

- 未解决：技术栈、每个分类的最终项目数、项目素材尺寸、英文文案与配音。
- 下一步：确认该架构并收集资产，再实作开场动画和一个分类列表原型。

### S-003 — 2026-07-16 — 确认魔法书入场动效方向

#### 本次目标

- 要解决的问题：明确 5 秒入场动画的视觉、时序与分类触发规则，以便制作 Figma 原型。
- 完成标准：定义分镜、材质、声音、项目数与动画重播策略。

#### 实际完成

- 已确认入场分镜：黑底上的反向双层法阵→缩小压印至悬浮魔法书→书本快速靠近→连续快速翻页→正视摊开定格 0.5 秒，总时长 5 秒。
- 已确认视觉：参考平摊书本的正视结构，应用粉、红、黄、青、蓝、紫的柔和荒光渐变与轻微颗粒，全程无真实环境。
- 已确认交互：入场动画每次进入都完整播放；Landscape 和 Installation 各 2 个项目；分类标题显示与女巫感、带混响的拉丁语念白同步。

#### 关键决策

- 决策：首次与后续进入一律播放完整入场，仍保留减弱动画的可访问性备选。
- 原因：用户希望每次进入都具有仪式性的网站开场经验。

#### 验证证据

- 用户提供了正视摊开书本结构和彩色荒光书页风格两张视觉参考图。
- Figma 动效原型尚未创建；等待用户选择创建文件的 Figma 团队空间。

#### 未解决事项与下一步

- 未解决：拉丁语的实际词句及配音素材，最终字体和法阵线稿。
- 下一步：创建 Figma 设计文件，以 5 个关键帧建立 Smart Animate 入场原型。

### S-004 — 2026-07-16 — 启动完整作品集网站目标并完成内容盘点

#### 本次目标

- 要解决的问题：在进入 Figma 和网站开发前，建立可验证的项目、图片、原文、页面与缺失素材清单。
- 完成标准：确认公开分类、项目数量、来源页码、图片覆盖、主题分配、内容缺口与详情页叙事顺序。

#### 实际完成

- 确认网站公开分类为 Architecture、Landscape、Installation；源目录 `interacation` 下的项目统一归入 Installation。
- 盘点 10 个项目和 210 张整理后的项目图片：Architecture 4 个、Landscape 2 个、Installation 4 个。
- 确认建筑/景观作品集 31 页、Installation 作品集 15 页，并完成逐页文本提取和缩略图视觉检查。
- 从 InDesign 源文件恢复了 PDF 中缺失的 Three-Body 项目说明。
- 建立 `portfolio/CONTENT_INVENTORY.md`，记录项目页码、图片数量、背景主题、叙事顺序和缺失素材。

#### 关键决策

- 31 页 `portfolio/Architecture 5.pdf` 作为建筑、景观、履历与经验的主要文字来源；15 页 `mdes mediums.pdf` 作为 Installation 主要文字来源。
- Hotel、S + O + S 及全部 Installation 使用黑色主题，其余 Architecture 和 Landscape 使用暖米白主题。
- Cobe 参考页只借鉴“项目信息开场—短概念段落—带说明的媒体序列—主题章节”的阅读节奏，不复制其视觉语言。
- Three-Body 的缺失视觉以编辑型概念素材补足，并与真实项目记录明确区分，不生成虚假的建成成果。

#### 验证证据

- PDF 页数：建筑/景观主册 31 页，Installation 册 15 页。
- 本地图片计数：Architecture 116、Landscape 35、Installation 59。
- 210 张整理图中未发现完全重复文件。
- 逐项目缩略图检查确认：除 Three-Body 外，其余 9 个项目均具有构建完整详情页所需的原始视觉资料。

#### 未解决事项与下一步

- 未解决：Three-Body 的年份、个人角色、媒介和技术系统；最终拉丁语文本、配音和音效素材；缺失魔法书与法阵视觉。
- 下一步：建立完整网站地图、10 个项目的网页英文文案与逐图顺序，然后确定双主题视觉系统。

---

## 7. 里程碑复盘

建议在完成首页、首个作品详情页、移动端适配或首次部署后进行复盘。

复盘时回答：

1. 哪些操作已经重复至少两次？
2. 哪些错误最耗时，如何避免复发？
3. 哪些规则体现了这个网站独有的内容或审美？
4. 哪些步骤适合写成确定性脚本？
5. 哪些信息只是一次性经历，不应进入 Skill？
6. 哪个候选 Skill 已经有足够的真实证据？

### S-005 — 2026-07-16 — First complete routed website prototype

#### Task goal and completion criteria

- Goal: turn the approved information architecture, copy, project archive, and magic-book assets into a real responsive source website suitable for later Figma capture.
- Completion criteria for this milestone: 14 direct routes, all 10 projects using real images, correct dark/ivory theme assignment, working intro/category/project motion, successful production build, and representative desktop/mobile browser evidence with no broken images or horizontal overflow.

#### Completed

- Created the React/Vite site with `/`, three category routes, and ten `/projects/:slug` routes.
- Added the 5-second four-state magic-book intro, category title ritual, Installation book pagination, long project pages, previous/index/next navigation, and GSAP viewport entrances.
- Connected all 210 organized project images through a data-driven image map; no permanent placeholder blocks are used.
- Created a repeatable image optimization workflow. Portfolio originals remain untouched; web derivatives live under `web-assets/`.
- Reduced 214 media files from 1,798.2 MB to 53.2 MB using 2400 px / quality 82 WebP derivatives.
- Added a repeatable Edge/Playwright visual audit script and an original magic-seal favicon.

#### Decisions to preserve

- Portfolio originals are archival sources and must never be overwritten by web optimization.
- The website imports only `web-assets` derivatives; source images remain in `portfolio`.
- Navigation uses explicit white-on-dark and black-on-ivory colors. Do not restore `mix-blend-mode: difference`; it produced partial text disappearance in a clipped mobile category page.
- Project pages keep normal vertical scrolling. GSAP is used only for entrances and sequencing, with `prefers-reduced-motion` support.
- The first image is loaded eagerly as the project cover; remaining long-page images use native lazy loading and async decoding.

#### Problems and effective solutions

- Symptom: every route rendered blank in production despite a successful build.
- Cause: JSX used the classic transform while source files lacked the default `React` binding.
- Fix: import default React in both JSX entry files and verify in the production preview.
- Symptom: Vite dev requests showed `spawn EPERM` under the restricted Windows process environment.
- Cause: Vite's safe-path resolver launches a child process.
- Fix: validate the already-built site with `vite preview` outside the restricted process sandbox.
- Symptom: the first mobile audit incorrectly reported a 1280 px viewport.
- Cause: the script passed `viewportSize` to `browser.newPage`.
- Fix: use the supported `viewport` option and assert `scrollWidth === clientWidth`.

#### Verification evidence

- Production build: successful with Vite 7.3.6.
- Browser audit representative routes: home, Architecture, Infinitas Hotel, Folded Courtyard, Installation mobile, The Cloud mobile.
- Desktop and 390 × 844 mobile checks: HTTP 200, zero broken images, zero horizontal overflow, correct route titles, no React runtime errors.
- Image counts sampled from rendered pages: Infinitas Hotel 14, Folded Courtyard 79, The Cloud 8.

#### Unresolved and next

- Add the complete sound system, Latin voice files, mute state, and browser-autoplay-compatible entry behavior.
- Audit all 14 routes, not only representative visual routes.
- Complete the Figma file when the Figma connector exposes write tools; use the real rendered pages as capture sources.
- Add deployment-specific SPA rewrite rules after the hosting target is selected.

### S-006 — 2026-07-16 — Complete content order, audio, editorial assets, and release candidate

#### Task goal and completion criteria

- Goal: convert the first routed prototype into a content-complete release candidate with intentional image order, verified Three Body information, full sound, supporting biography, generated editorial assets, sharing metadata, and exhaustive route validation.
- Completion criteria: no filename-order galleries, no unresolved public metadata, all original images retained, all routes build and render, and AI material remains explicitly distinguishable from project documentation.

#### Completed

- Replaced alphabetical image ordering with a per-project narrative rank: cover → context/problem → concept/process → drawings/systems → renders/models/site records.
- Selected intentional covers for all ten projects while retaining every original image.
- Added the complete browser-compatible sound layer: procedural intro cues, page turns, category sounds, mute state, and three processed Latin voice files.
- Added a secondary Info page with biography and selected experience; it is not a fourth project category.
- Generated and optimized a Three Body editorial cover and a social-sharing book image. Both prompts, uses, and truthfulness boundaries are recorded in `portfolio/ASSET_SOURCE_LOG.md`.
- Verified Three Body from SKF/Konstnärshuset: 2025, March 20–April 12, Frieda Fan on the design team. Expanded the page with the visitor question, sentiment analysis, projected trajectories, sound, and textile enclosure.
- Added Open Graph/Twitter metadata and Vercel SPA rewrite configuration.
- Added `portfolio/FIGMA_BUILD_BLUEPRINT.md` with the exact pages, frames, variables, components, links, motion, sound notes, and asset mapping required for the final Figma file.

#### Decisions to preserve

- Generated Three Body imagery is an editorial entry image only and must retain the visible label “AI-generated editorial interpretation · not project documentation.”
- Original Three Body fragments remain in the gallery; generated imagery does not replace or masquerade as project evidence.
- Info is secondary navigation and does not alter the three-category taxonomy.
- Project galleries are ordered semantically through explicit hints in `src/data/projects.js`; do not revert to alphabetical file order.

#### Verification evidence

- Production build passed with 259 transformed modules.
- Full route audit passed 15/15: home, Info, three category indexes, and ten project details.
- Exact original-image totals remained intact: 79, 10, 14, 13, 29, 6, 40, 8, 5, and 6.
- Three Body renders seven visible images: one disclosed editorial cover plus six original fragments.
- Desktop/mobile visual audit showed zero broken images, console errors, or horizontal overflow for all representative frames, including Info and Three Body.
- Audio audit passed sound-gate entry, category voice retrieval, and sound toggle behavior.

#### Problems and effective solutions

- Agent Reach’s Exa backend was unavailable because `mcporter` was not installed. The backend diagnosis was recorded, and the built-in web search was used as the read-only fallback for reference and public-record verification.
- Figma plugin resources are installed, but the current session exposes no `create_new_file` or `use_figma` write tools. A deterministic Figma build blueprint and a verified rendered source remain ready for capture; do not claim a Figma file exists until the connector exposes write calls.
- Vercel preview upload was rejected by the safety reviewer because the user has not explicitly authorized exporting the built portfolio assets to Vercel. No files were uploaded. Ask for explicit Vercel permission before retrying.

#### Unresolved and next

- Obtain explicit authorization to upload `dist` to Vercel for a claimable preview deployment.
- Reconnect or restart with Figma write tools exposed, then execute `portfolio/FIGMA_BUILD_BLUEPRINT.md` against the verified site.
- After Figma creation, run the final prototype-link audit and record the Figma file URL.

### S-007 — 2026-07-17 — Final local release hardening and Figma reconnection

#### Task goal and completion criteria

- Goal: harden the local release candidate before Figma capture and deployment.
- Completion criteria: every direct route preserves its destination through the mandatory intro, Installation restores its book leaf after project return, all fonts are self-hosted, and desktop/mobile regression checks remain clean.

#### Completed

- Moved the sound gate and exact 5.00-second magic-book intro to the application shell so direct category and project links receive the complete ritual without losing their requested destination.
- Added persistent category-spread memory, native View Transitions, project-open and sigil feedback, ambient sound, and explicit conclusions for all ten case studies.
- Fixed an invisible decorative book layer that intercepted the Installation next-leaf control by making the background layer pointer-transparent.
- Replaced external font loading with self-hosted Latin and Latin Extended subsets for Bodoni Moda, IBM Plex Sans, IBM Plex Mono, and Unbounded.
- Added dependency and content audits alongside the existing route, interaction, audio, and visual audits.

#### Verification evidence

- Production build passed with 281 transformed modules.
- Dependency audit verified all four font families loaded, zero external network requests, and zero console errors.
- Visual regression passed ten representative desktop/mobile frames with HTTP 200, zero broken images, zero horizontal overflow, and exact project image counts.
- Interaction audit verified deep-link intro preservation and Installation leaf 2/2 restoration; content audit passed 10/10 complete project narratives.

#### Decisions and reusable learning

- Entry animation belongs above the router content, not inside the homepage, when every direct entry must replay it while preserving deep links.
- Decorative layers over controls must explicitly opt out of pointer events; visual transparency does not prevent hit interception.
- Import only the required Fontsource subsets. Default weight imports silently include many unrelated language subsets and enlarge the build.

#### Unresolved and next

- Figma write tools are now available. The authenticated account exposes one Full Pro team and one View-only team; the create-file skill requires the user to choose the target team before file creation.
- Vercel still requires explicit authorization before uploading `dist`; no third-party deployment has occurred.

### S-008 — 2026-07-17 — Deterministic Figma capture preparation

#### Task goal and completion criteria

- Goal: make every rendered route safely importable into Figma without capturing transient gates, rituals, or scroll-hidden media.
- Completion criteria: deterministic capture URLs, correct Installation spread selection, eager long-page media, and an automated audit covering the homepage, leaf 2, the longest ivory project, and the disclosed AI editorial project.

#### Completed

- Added a query-scoped `capture=1` rendering path that bypasses only transient entry presentation while leaving normal visitor behavior unchanged.
- Added `leaf=2` selection for the second Installation spread and eager project-image loading during capture.
- Added `portfolio/FIGMA_CAPTURE_MANIFEST.json` with 16 desktop captures and 10 required mobile captures mapped to named Figma pages and frames.
- Added and passed `scripts/figma_capture_audit.mjs`.

#### Verification evidence

- Production build passed after the capture-mode change.
- Capture audit passed 4/4: home, Installation leaf 2, Folded Courtyard with all 79 images, and Three Body with seven images plus its AI disclosure.
- All audited capture routes returned HTTP 200 with no sound gate, category ritual, broken images, or console errors.

#### Unresolved and next

- Create the Figma file after the user chooses between the Full Pro team and the View-only team, then execute the capture manifest and build the intro/motion pages manually.

### S-009 — 2026-07-17 — Representative Figma review flow

#### Task goal and completion criteria

- Goal: use the user-specified existing Figma file and complete the representative validation set required by the updated objective before expanding every project.
- Completion criteria: editable foundations and components, a playable five-second intro, home, one category index, one warm-ivory project, one black project, working returns, and scrollable long-page viewports.

#### Completed

- Created 46 variables across primitive, semantic color, scale, and typography collections; created ten text styles and three glow/depth effect styles.
- Created editable Foundations and Components pages with bespoke portfolio navigation, project-index, metadata, sound-consent, pagination, and media components.
- Imported the rendered Home, Info, Architecture, Landscape, and two Installation book leaves from the verified local capture routes.
- Built six editable intro keyframes with embedded book artwork: counter-rotating seal, imprint, book approach, page rush, open-and-settle, and 0.5-second hold.
- Added Smart Animate timing and a complete sound-trigger score to the intro page.
- Imported Island for the Stateless as the warm-ivory representative project and Infinitas Hotel as the black representative project.
- Assembled a single-page Representative Review Flow with 17 working prototype links, including intro handoff, three home categories, project opening, Installation leaf switching, Info return, and project return paths.
- Wrapped both representative project captures in 1699 × 935 vertically scrolling prototype frames.

#### Decisions and reusable learning

- Figma prototype NAVIGATE actions can only target a different top-level frame on the same Figma page in this connector. Keep the playable review flow on one page; maintain separate documentation pages for foundations, components, and source motion frames.
- The connector rejects WebP in `createImage` and caps `use_figma.code` at 50,000 characters. Use compact JPEG derivatives only for editable Figma animation frames; preserve original WebP assets in the website.
- Figma rejected the PUSH transition in this connector; use SMART_ANIMATE for book-leaf changes.
- A single 79-image Folded Courtyard HTML capture remained pending. After visual approval, split oversized project imports into narrative sections instead of reducing or omitting source images.

#### Verification evidence

- Variable validation: 46 total, 12 semantic aliases, zero broken aliases, zero missing semantic scopes, and zero missing WEB syntax.
- Foundations and component-page screenshots passed visual inspection with correct black/ivory contrast, typography, square-edge editorial layout, and no stacked nodes.
- Intro screenshot confirmed all six stages; Figma returned `motionStatus: linked` and a valid review flow start.
- Representative review screenshots confirmed a readable warm-ivory Island hero, black Infinitas Hotel hero, complete home/category set, and vertical scroll on both project viewports.
- Production website still builds successfully with 281 transformed modules after adding the local Figma capture helper.

#### Unresolved and next

- Await visual approval of the representative Figma flow before importing every remaining project and key mobile frame, as required by the updated objective.
- After approval, complete all ten project pages, mobile captures, prototype links, source/AI records, and final Figma QA.
- No Vercel or other deployment was performed.

### S-010 — 2026-07-17 — Figma review and provenance documentation

#### Task goal and completion criteria

- Goal: make the representative Figma prototype self-explanatory and auditable without crossing the visual-approval gate.
- Completion criteria: an editable review guide, an exact motion/sound/Latin reference, a truthful source/AI record, and screenshot-verified readable layouts using the established design system.

#### Completed

- Added `00 Start Here` with preview instructions, the exact review route, interaction legend, stage-gate criteria, and current completeness statement.
- Added `05 Motion · Sound · Latin` with the five-second timing score, verified Latin titles and pronunciations, witch-voice processing direction, category choreography, browser sound gate, and reduced-motion rules.
- Added `06 Sources · AI Record` with user-reference roles, all six generated production assets, continuity constraints, external reference roles, and the non-negotiable documentary truthfulness boundary.
- Reused the existing semantic variables and typography styles; no parallel design system or external UI kit was introduced.

#### Problems and effective solutions

- Figma changed fixed-width text to `textAutoResize: NONE` after `resize`, leaving headings, rows, and wrapped paragraphs at 10 px height. Load every font used by the board, then restore `textAutoResize: HEIGHT`; parent Auto Layout frames correctly recalculate afterward.
- Resizing an Auto Layout root after assigning `primaryAxisSizingMode: AUTO` can leave its height fixed. Reapply vertical primary-axis AUTO after resize, and use horizontal primary-axis FIXED plus counter-axis AUTO for table-like rows.

#### Verification evidence

- Screenshot QA passed all three documentation frames after the Auto Layout correction: no text overlap, clipping, or exposed page background.
- Black and warm-ivory boards preserve readable contrast and use the established square-edge editorial language.
- Figma nodes: Start Here `89:3`, Motion/Sound/Latin `89:83`, Sources/AI `89:182`.

#### Unresolved and next

- Await visual approval of the representative flow before expanding the remaining project and mobile frames.
- No Vercel or other deployment was performed.

### S-011 — 2026-07-17 — Full website and Figma prototype expansion

#### Task goal and completion criteria

- Goal: apply the supplied `pattern design.png` as the only magic-circle artwork, center the open book and floating discipline links, adapt project galleries to the Architecture 5 PDF's large-image/matrix rhythm, and expand the approved Figma flow to every project plus required mobile frames.
- Completion criteria: all ten project archives present without placeholders, complete desktop and key mobile Figma coverage, navigable same-page prototype flows, retained motion/audio specifications, production build and route/content audits passing, and no deployment.

#### Completed

- Replaced every website and Figma intro seal with the supplied red/cyan pattern; outer and inner layers retain opposing continuous rotation. Screen blending removes the source image's black rectangular boundary.
- Centered the homepage book and placed Architecture, Landscape, and Installation directly over its open pages on desktop and mobile.
- Added project-specific matrix grouping derived from the Architecture 5 PDF rhythm. Desktop matrices use four columns and mobile matrices use two while preserving original narrative order.
- Imported all ten desktop project details into the specified Figma file. Oversized Folded Courtyard, Trojan Forest, and The Invisible Sisyphus were split into consecutive named segments without omitting source images; 18 explicit Continue/Return controls reconnect them as playable flows.
- Added the second Installation leaf, connected all four Installation projects, and consolidated 31 desktop frames on `07 Playable Web Flow · All Desktop` with a Home flow starting point.
- Added the ten manifest-required 390 × 844 key mobile frames on `10 Mobile`, including two Installation leaves and four representative responsive project details, with a Mobile Home flow starting point.
- Preserved the complete Web Audio score and the three recorded Latin voice files (`architecture.wav`, `landscape.wav`, `installation.wav`).

#### Verification evidence

- Production build passed with 282 transformed modules.
- Content audit passed 10/10 projects with exact expected image totals: 79, 10, 14, 13, 29, 6, 40, 8, 5, and 7; no placeholder text.
- Matrix browser audit confirmed four desktop columns, two mobile columns, zero broken images, and no horizontal overflow for Folded Courtyard and The Invisible Sisyphus.
- Figma screenshot QA confirmed the supplied magic-circle artwork without rectangular edges, centered book composition, readable Folded Courtyard long-page hierarchy, and the 390 × 844 mobile home.
- No Vercel or other deployment was performed.

#### Decisions and reusable learning

- Figma HTML conversion can stall on image-heavy pages even after successful submission. Add capture-only chapter ranges and import consecutive named segments; never reduce or omit source images to make the transaction smaller.
- Keep every destination needed by a playable Figma NAVIGATE action as a top-level frame on the same page. Documentation and source-motion boards can remain separate.
- Raster magic circles with opaque black backgrounds should use Screen blending in both CSS and Figma; square glows or clipped decorative containers reveal the image bounds.

### S-012 — 2026-07-18 — Figma light-background normalization

#### Task goal and completion criteria

- Goal: replace every beige/ivory background in the existing Figma portfolio with pure white while preserving dark project pages, accent colors, imagery, and prototype behavior.
- Completion criteria: update both semantic colors and hard-coded beige fills across every Figma page, confirm no `#F1EBDD` or `#F5EFDF` fills remain, and visually inspect representative desktop and mobile light pages.

#### Completed

- Changed the shared `paper` variable from `#F1EBDD` to `#FFFFFF`; the existing `surface/ivory` alias now resolves to white without breaking component bindings.
- Replaced remaining hard-coded `#F1EBDD` and `#F5EFDF` fills across foundations, components, motion documentation, review flows, all desktop prototypes, and mobile prototypes.
- Preserved black backgrounds and the saturated pink, red, yellow, cyan, blue, and violet accent palette.

#### Verification evidence

- Exact-color audit across all Figma pages found zero remaining `#F1EBDD` or `#F5EFDF` visible solid fills.
- Screenshot QA passed on Visual Foundations, the desktop Countryside Introduction Planning page, and the mobile Folded Courtyard page; each light field renders pure white with readable text and intact imagery.
- No website code or deployment was changed.

#### Decision and reusable learning

- Keep the legacy variable names `paper` and `surface/ivory` for binding compatibility, but treat their current visual role as the portfolio's canonical white field.

### S-013 — 2026-07-20 — Web-ready portfolio PDF page export

#### Task goal and completion criteria

- Goal: convert every page of `Architecture 5.pdf` into web-ready PNG images without altering the source PDF.
- Completion criteria: produce one sequential PNG per PDF page at a practical desktop-web size, verify all files open correctly, and visually inspect representative pages for rendering defects.

#### Completed and verified

- Exported all 31 A3 landscape pages as `page-01.png` through `page-31.png` at 1920 × 1358 px.
- Verified 31/31 files are readable and consistently sized; the output totals 62.7 MB.
- Visual QA of pages 1, 16, and 31 found no clipping, black boxes, missing content, or text-rendering defects.

#### Decision and reusable learning

- Use 1920 px width for full-page desktop portfolio images when the source is A3 landscape; it preserves detailed drawings while keeping the complete 31-page export materially smaller than the print PDF.

### S-014 — 2026-07-20 — Split-seal homepage entrance

#### Task goal and completion criteria

- Goal: replace the book-based global intro with a homepage-only magic-circle threshold that rotates left, splits with the black field at the centre, and reveals a horizontal white discipline index with a gear sound.
- Completion criteria: use a real transparent PNG, replay the entrance whenever Home mounts, bypass all entrance UI on direct project routes, remove project-page reveal animation, preserve sound consent and category voice behavior, and pass desktop/mobile visual QA.

#### Completed

- Derived `pattern-design-transparent.png` directly from the supplied source pixels, preserving the red/cyan drawing while converting the black negative space to an alpha channel; the web derivative is 1920 px wide and no longer relies on Screen blending.
- Replaced the old seal-to-book timeline with paired black half-screen panels. Both panels contain aligned halves of the same counterclockwise-rotating seal and move outward from the centre seam as a single threshold.
- Rebuilt Home around the rotating seal and a centered horizontal Architecture / Landscape / Installation index in white on desktop and mobile.
- Added a procedural ratcheting gear score synchronized to the split label in the GSAP timeline.
- Scoped the sound gate and entrance to Home only. Direct project URLs now render immediately, project navigation skips View Transitions, and project hero/gallery reveal animations were removed.
- Updated interaction and visual audits for the new route contract and added mid-animation screenshots.

#### Verification evidence

- Production build passed with 277 transformed modules.
- Interaction audit passed every check: no gate or entrance on direct project routes, Home gate and entrance present, Home entrance replayed after returning from Installation, and Installation leaf memory remained intact.
- Audio audit passed sound enable/mute behavior and the Architecture Latin voice request with HTTP 200 and zero console errors.
- Desktop and mobile screenshots passed for the sound gate, split-seal middle frame, final horizontal Home index, and representative non-home routes.

#### Decisions and reusable learning

- Preserve user-supplied intricate line art with deterministic alpha extraction; do not use a generative redraw when exact geometry matters.
- Home owns its entrance lifecycle so route remounts replay it naturally. Application-level entrance state would incorrectly block direct project routes or suppress later Home re-entry.
- Browser autoplay restrictions still require a user gesture before audible gear playback on a fresh Home load; returning visitors who already enabled sound hear the synchronized score automatically.

### S-015 — 2026-07-20 — Figma book removal and split-seal synchronization

#### Task goal and completion criteria

- Goal: remove every magic-book visual and reference from the existing Figma file, then synchronize its desktop, mobile, review, and motion frames with the confirmed split-seal website direction.
- Completion criteria: no obsolete book image hash or book/leaf terminology remains, the transparent supplied magic circle replaces the former book hero, home navigation is a single white horizontal row, the six intro keyframes retain a connected Smart Animate sequence, and representative screenshots pass visual review.

#### Completed

- Removed the five obsolete book-image assets from the intro, representative review flow, desktop flow, mobile flow, category indexes, and source documentation.
- Rebuilt the six intro states as seal rotation, centre seam, threshold unlock, gear-driven split, home reveal, and hold; the black threshold panels and aligned magic-circle halves move outward while the white discipline index is revealed.
- Replaced desktop, mobile, and review-home book heroes with the deterministic transparent PNG and rebuilt each navigation set as one horizontal Architecture / Landscape / Installation row.
- Updated Foundations, Start Here, Motion / Sound / Latin, Sources / AI Record, frame names, and navigation copy to remove the book/leaf metaphor and describe the split-seal behavior.
- Preserved the existing project-detail frames, navigation destinations, background decisions, and project content.

#### Verification evidence

- Cross-page audit of all nine Figma pages found zero remaining obsolete book-image hashes and zero remaining `book`, `magic-book`, `open book`, or `leaf` terms after cleanup.
- Screenshot QA passed the first seal frame, gear-split frame, final hold frame, desktop home, and mobile home. The supplied red/cyan pattern renders without a white rectangle, titles read horizontally in white, and no book is visible.
- No website code or deployment was changed in this task.

#### Decisions and reusable learning

- Captured web frames may retain navigation labels inside nested Auto Layout groups; deleting matching descendants and recreating one direct child per label with `layoutPositioning: ABSOLUTE` avoids duplicate rows and positional drift.
- Use identical, clipped full-size seal images inside left and right black panels so both halves share one visual centre during Smart Animate; keep the final home seal as a separate centered backdrop.

### S-016 — 2026-07-21 — Figma-editor website synchronization baseline

#### Task goal and completion criteria

- Goal: make the existing Figma file an editor for the retained local website, initialized so the generated result matches the current local site.
- Completion criteria: define a validated shared contract, expose its fields in Figma, provide a safe local sync path with rollback, preserve the existing site at port 4174, and verify build, interaction, and representative desktop/mobile visuals.

#### Completed

- Added `src/generated/figma-sync.json` as the generated runtime contract and connected shared copy, color, layout, and GSAP timing/easing values to the React application.
- Added a localhost-only Figma bridge with schema validation, timestamped configuration snapshots, atomic replacement, production-build verification, and automatic restoration after a failed build.
- Added the `Frieda Portfolio Sync` development plugin. It extracts tagged text and the `Website Sync` variable collection from the existing Figma file and sends only the validated contract to the bridge.
- Created and tagged 50 Figma variables covering shared copy, palette, key dimensions, and motion. Bound homepage text on desktop, mobile, and review flows to the shared variables.
- Aligned the desktop and mobile Figma Home frames and the intro Smart Animate durations to the current local split-seal website baseline.
- Documented one-time plugin setup and normal editing flow in `portfolio/FIGMA_SYNC_SYSTEM.md`.

#### Verification evidence

- Contract validation passed, the plugin code and manifest parsed successfully, and a full bridge round trip returned HTTP 200 while producing a successful production build.
- Production build completed with 279 transformed modules.
- Interaction audit passed direct-route bypass, homepage entrance/replay, category reveal, Installation leaf memory, and zero console errors.
- Desktop and mobile Figma Home screenshots match the retained local site's black field, rotating red/cyan seal, centered horizontal discipline index, and compact header composition.
- Both the retained site at `127.0.0.1:4174` and the sync bridge health endpoint at `127.0.0.1:4175` returned successfully.

#### Decisions, limits, and reusable learning

- Figma is the editorial source for the explicit sync contract, not an unrestricted code generator. This keeps edits deterministic and prevents accidental component or asset deletion.
- Project media and long-form portfolio copy remain repository-owned in this first contract; syncing hundreds of images through the plugin on every edit would be slow and lossy.
- Figma Presentation and browser execution share values and choreographic timing, but browser-only capabilities such as Web Audio, routing, continuous CSS/GSAP behavior, and scroll state cannot be represented identically by native Figma prototype transitions.
- A historical requirement conflict remains: the local category pages still contain a luminous book while the latest Figma cleanup explicitly removed every book. Preserve both states until the user chooses which direction becomes authoritative.

### S-017 — 2026-07-21 — Synchronize the current bookless Figma category indexes

#### Task goal and completion criteria

- Goal: treat Figma page `142:2` as the current design source, remove the category-page magic-book background from the website, and update the retained local link.
- Completion criteria: Architecture, Landscape, and Installation match their current Figma index frames; no book asset or book/leaf interface copy remains in the production bundle; Installation pagination and route memory continue to work.

#### Completed and verified

- Read the current Figma Home and category frames through the design-to-code context instead of relying on the earlier local baseline.
- Replaced the book-backed category composition with the Figma two-column 362.797 px project grid, 52 px column gap, black field, rectangular 1.752:1 covers, and the Figma-specific vertical spacing for two-item pages.
- Renamed Installation controls to Previous page / Next page and changed the About return link to Return to the index.
- Removed the magic-book import and obsolete book metadata from the production website.
- Production build passed with 278 transformed modules, and the live local URL served the new bundle.
- Desktop Architecture and mobile Installation screenshot QA confirmed that no book is rendered and that the page composition matches the supplied Figma frames.
- Interaction regression passed homepage entrance/replay, direct project routes, Installation page change, and page-state restoration with zero console errors.

#### Decision and reusable learning

- When a supplied Figma URL targets a canvas rather than a frame, enumerate its top-level frames with metadata and then call design context on each relevant frame. Do not assume the previously synchronized frame state is still current.

### S-018 — 2026-07-21 — Synchronize all current Figma project details

#### Task goal and completion criteria

- Goal: correct the previously incomplete Figma synchronization so all ten project detail pages follow the current project frames on Figma page `142:2`.
- Completion criteria: map every full and segmented project frame, remove remaining old visual tokens, preserve all project media and continuous web scrolling, and verify representative themes, matrices, and mobile behavior.

#### Completed

- Enumerated 25 project-detail frames: seven complete long pages plus eight Folded Courtyard segments, four Trojan Forest segments, and five Invisible Sisyphus segments.
- Confirmed that the local data-driven detail structure, narrative copy, media sequence, captions, conclusions, and footers already corresponded to the current Figma frames.
- Replaced the stale beige paper token with the current Figma pure white and removed the obsolete polygon clip from every project hero image.
- Corrected the generated Figma contract's corrupted home eyebrow and Architecture Latin text while changing its source mode to `figma-page-142-2`.
- Kept browser project pages as continuous vertical narratives even where Figma uses multiple linked frames to stay within practical canvas limits.

#### Verification evidence

- Production build passed with 278 transformed modules.
- Visual audit passed desktop Folded Courtyard, Infinitas Hotel, and Three Body plus mobile The Cloud, with no broken images, console errors, or horizontal overflow.
- Content audit passed 10/10 projects with exact image counts of 79, 10, 14, 13, 29, 6, 40, 8, 5, and 7; all metadata, project statements, overview paragraphs, conclusions, and footer links are present.
- Matrix audit confirmed two representative eight-image groups and the Sisyphus lexicon render as four columns at 1376 px on desktop and two columns at 354 px on mobile, with no broken images or overflow.

#### Reusable learning

- When users report that Figma-synchronized long pages still look old, compare the generated runtime token values and global media masks before rebuilding page content. The structure may already match while one stale color token or clip-path changes the entire visual reading.

### S-019 — 2026-07-21 — Reorder Folded Courtyard from the numbered source archive

#### Task goal and completion criteria

- Goal: reorder the Folded Courtyard prototype in the existing Figma file to follow the updated drawing numbers in `portfolio/architecture/folded-courtyard`.
- Completion criteria: use cover `00` and drawings `01–09` in order, remove obsolete legacy segments, preserve captions and closing content, and keep the prototype flow connected back to Architecture.

#### Completed and verified

- Replaced the prior 79-image, eight-frame sequence with three focused frames: opening plus `01–04`, `05–08`, and `09` plus closing.
- Inserted all ten current source images, updated their Figma layer names and visible captions, and removed six obsolete Folded Courtyard frames.
- Rewired the prototype chain to `129:2 → 133:2 → 139:2 → 108:2`.
- Structural audit found exactly three Folded Courtyard frames, ten uniquely uploaded images, captions `01–09` in order, and the expected navigation destinations.
- Screenshot QA confirmed that the two drawing galleries and final Section/closing frame render without broken media or collapsed content.

#### Decision and reusable learning

- Figma image upload rejects assets larger than 10 MB. Preserve the portfolio originals and generate high-quality, max-edge 2400 px WebP derivatives only for Figma ingestion when needed.

### S-020 — 2026-07-22 — Simplify the editable Figma hierarchy

#### Task goal and completion criteria

- Goal: reduce unnecessary nesting throughout the existing Figma file so the user can edit text, navigation, and project content with fewer layer-panel clicks.
- Completion criteria: remove only wrappers with no visual, layout, clipping, masking, or prototype responsibility; preserve responsive structure and motion; replace generic retained link names with clear editing labels; verify representative desktop, mobile, and intro frames.

#### Completed and verified

- Removed 389 redundant wrapper/group nodes across Foundations, Intro Motion, Representative Review Flow, Desktop Web Flow, and Mobile.
- Flattened only one-child wrappers whose bounds exactly matched their child and which had no fill, stroke, effect, clipping, interaction, or padding responsibility.
- Ungrouped all eight decorative SVG groups while retaining their editable vectors inside the existing seal/icon frames.
- Removed three empty captured link layers and eliminated all generic `Link`, `Link:align`, and `Group` layer names.
- Renamed retained structural containers to roles such as `Project Card`, `Discipline Card`, `Primary Navigation Item`, `Back Navigation Slot`, `Project Navigation Card`, `Sound Toggle`, and `Pagination Control`.
- Prototype reaction-node counts remained unchanged: Review 23, Desktop 54, and Mobile 14.
- Screenshot QA passed desktop Home, Architecture, Folded Courtyard, mobile Home, mobile Folded Courtyard, and the intro split/gear frame.

#### Decision and reusable learning

- Do not flatten Auto Layout, grid, clipping, mask, button, project-card, or animation containers merely to reduce depth. A wrapper is removable only when its geometry matches its sole child and it contributes no layout or visual behavior.

### S-021 — 2026-07-22 — Consolidate repeated Figma controls and cards

#### Task goal and completion criteria

- Goal: turn repeated navigation controls, portfolio cards, and the Frieda Fan wordmark into reusable Figma components so a master edit propagates across the prototype.
- Completion criteria: create clear masters on `02 Components`, preserve per-instance text/image/theme overrides, replace duplicates on Desktop, Mobile, and Review, retain prototype reactions, and visually validate representative pages.

#### Completed

- Reused the existing 96-variable foundation and bound both desktop and mobile wordmark masters to `site/wordmark` (`VariableID:218:2`).
- Created 15 component/component-set families for wordmarks, sound toggles, pagination, back links, discipline entries, mobile primary navigation, desktop/mobile project cards, desktop/mobile project-footer navigation, and mobile return-home navigation.
- Replaced 40 wordmarks, 41 sound toggles, 10 pagination controls, 16 back links, 6 discipline entries, 3 mobile primary-nav items, 28 project cards, 46 project-footer cards, and 1 return-home link with instances.
- Preserved project-specific images and text as instance overrides and retained black/white page-specific text colors.
- Component IDs and remaining migration steps are recorded in `portfolio/FIGMA_COMPONENT_STATE.json`.

#### Verification and unresolved work

- Each created family was checked through metadata and an isolated Figma screenshot before migration.
- Figma write access reached the account usage limit while replacing the final three Review discipline cards. The created Review discipline component set is `298:660`, but those three instances remain to be migrated.
- A two-variant Review sound-gate-choice component and the final reaction-count/page screenshot audit remain pending.
- No local website code was changed during this task.

### S-022 — 2026-07-26 — Define the low-nesting Figma layer guide

#### Task goal and completion criteria

- Goal: document a simple Figma layer convention for editable, vertically scrolling portfolio pages.
- Completion criteria: keep normal page content nearly flat, make images easy to resize, crop, replace, and reorder, allow text insertion anywhere in the media sequence, and cover animation and effects without adding organizational wrappers.

#### Completed and verified

- Added `portfolio/FIGMA_LAYER_GUIDE.md` as the concise Chinese reference.
- Defined page-level vertical Auto Layout, direct image/text children, semantic names, optional one-level galleries and text blocks, Crop/Fill-based image editing, and state naming or variants for motion.
- Preserved the existing rule that containers remain only when they provide layout, clipping, masking, component, or prototype behavior.
- Checked the rendered Markdown structure and examples for consistent headings, code fences, and low-nesting terminology.

#### Decision and reusable learning

- The default editable hierarchy is `Page → Content item`; a third level is allowed only when elements must move together or a container has a real layout, clipping, component, or interaction responsibility.

### S-023 — 2026-07-26 — Apply the low-nesting guide to the desktop Figma flow

#### Task goal and completion criteria

- Goal: apply `FIGMA_LAYER_GUIDE.md` to Figma page `142:2` without changing the confirmed desktop design or prototype behavior.
- Completion criteria: replace captured-web and generic layer names with semantic roles, remove only demonstrably inert empty frames, preserve every layout/clip/component/prototype container, and pass structural plus representative visual QA.

#### Completed and verified

- Renamed page-owned layers across all 24 desktop screens and project segments to the shared `Page Surface`, `Nav`, `Title`, `Text Block`, `Metadata`, `Gallery`, `Media`, `Image`, `Caption`, `Layout`, `Footer`, `Prototype`, and `FX` conventions.
- Gave component instances project-specific names, normalized the Folded Courtyard numbered images and six imported Island for the Stateless image rectangles, and removed all remaining `Container`, `:margin`, `Figure`, `Figcaption`, `Body`, `Header`, and similar captured-web names from the page-owned hierarchy.
- Removed 16 absolute-positioned frames only after confirming each had no children, fill, stroke, effect, clipping, or prototype reaction.
- Retained four empty Auto Layout/Grid sizing layers because they still determine live composition; renamed them explicitly as a reserved grid cell, title measure, or media reserve.
- Final audit found 1,920 descendants, zero legacy generic names, zero non-conforming page-owned names, and the same 32 prototype reactions on 32 nodes.
- Metadata QA passed the Sisyphus opening, its eight-item lexicon gallery, and the Island project media sequence. Screenshot QA passed Home, Infinitas Hotel, and the final Invisible Sisyphus segment with no visual drift.
- No website code or deployment was changed.

#### Decision and reusable learning

- A low-nesting cleanup should classify responsibility before flattening: a visually empty layer may still be the Auto Layout/Grid size source for an absolute image or title. Keep such nodes, name them `Layout / …`, and delete only empty absolute layers with no visual or interaction responsibility.
- For large Figma renaming passes, pilot the naming inference on one small frame, validate with metadata and a screenshot, then batch the remaining frames and finish with a page-wide legacy-name, empty-node, and prototype-reaction audit.

### S-024 — 2026-07-27 — Replace three project media sequences in Figma

#### Task goal and completion criteria

- Goal: update Trojan Forest, S + O + S, and Countryside Introduction Planning with the newly supplied source images while preserving each project cover.
- Completion criteria: remove every non-cover legacy image, keep the new files in natural filename order, use equal 1440 × 1019 full-page-width image frames, follow the low-nesting layer guide, and preserve project copy, navigation, and prototype flow.

#### Completed and verified

- Replaced the legacy media sequences with 6 Trojan Forest images (`page-21`–`page-26`), 4 S + O + S images (`page-27`–`page-29`, then `site2plan-2`), and 2 Countryside images (`page-19`–`page-20`).
- Added every new image as a direct child of its page-content Auto Layout, named `Image / Project / NN`, with identical 1440 × 1019 dimensions and `FILL` image fills.
- Preserved the three opening-image layers, project statements, conclusions, footers, fixed navigation, and Trojan Forest's four-part prototype sequence.
- Structural audit found exactly one preserved cover plus 6, 4, and 2 new images respectively; all six legacy gallery IDs and all temporary upload frames were absent.
- The desktop flow retained 32 reactions on 32 nodes. Screenshot QA passed Countryside, S + O + S, and both the opening and closing Trojan Forest segments.

#### Decision and reusable learning

- For a vertical single-image sequence, place image frames directly under the page-content Auto Layout; retain a `Gallery` wrapper only for genuinely multi-column media.
- When uploaded images already exist as temporary Figma frames, reuse their image hashes for the final layers and remove the temporary frames after assignment.

### S-025 — 2026-07-28 — Replace three Installation project media sequences in Figma

#### Task goal and completion criteria

- Goal: update The Invisible Sisyphus, The Cloud, and Three Body with the newly supplied Interaction images while preserving each project cover.
- Completion criteria: remove all non-cover legacy images, retain natural filename order, use equal 1440 × 1019 page-width image frames, follow the low-nesting layer guide, and preserve copy, navigation, and prototype flow.

#### Completed and verified

- Replaced The Invisible Sisyphus legacy media with seven images (`03`–`09`), distributed across its existing five-part prototype flow as 2 / 2 / 1 / 1 / 1.
- Updated the five Sisyphus frame, page-stack, and page-content names to match the new `01`–`07` sequence.
- Replaced The Cloud with four images (`10`–`13`) and Three Body with three images (`10`–`12`).
- Added all fourteen new images as direct children of their page-content Auto Layouts, named `Image / Project / NN`, with identical 1440 × 1019 dimensions and `FILL` image fills.
- Preserved all three opening-image layers, project statements, conclusions, footers, fixed navigation, and the current desktop-flow baseline of 25 reactions on 25 nodes.
- Structural audit found no legacy media containers and no temporary upload frames. Screenshot QA passed the Sisyphus opening and closing segments, The Cloud, and Three Body.

#### Decision and reusable learning

- Use source-file modification dates to distinguish newly updated project folders when a parent directory contains an additional unchanged project.
- The same low-nesting media-replacement workflow has now passed two independent batches. It is a strong candidate for a deterministic `replace-figma-project-media` Skill.

### S-026 — 2026-07-28 — Sync the local website to the latest Figma media sequences

#### Task goal and completion criteria

- Goal: update the local portfolio website to match the confirmed desktop Figma page `142:2`.
- Completion criteria: carry over the current identity and white paper background, reproduce the seven updated project-media sequences in their Figma order and proportions, preserve all other project content and interactions, and pass build, route, content, and representative visual checks.

#### Completed and verified

- Updated the shared identity to `Frieda Hua Fan`, including the wordmark, home eyebrow, document metadata, About copy, and project credit.
- Changed the light project-page surface from warm beige to pure white while preserving the intended black project pages.
- Generated 25 optimized WebP derivatives without deleting or replacing any portfolio source images.
- Added strict Figma media overrides for Folded Courtyard, Countryside Introduction Planning, Trojan Forest, S + O + S, The Invisible Sisyphus, The Cloud, and Three Body. The active website now ignores stale cached derivatives for these sequences.
- Matched Figma's single-column 1440:1019 full-width image treatment and removed the former alternating widths, offsets, matrices, and captions from those updated sequences.
- Verified exact active media counts: Folded Courtyard 10, Countryside 3, Trojan Forest 7, S + O + S 5, Invisible Sisyphus 8, The Cloud 5, and Three Body 4, including each retained or editorial cover.
- Production build passed. Content audit passed 10/10 project pages; route audit passed 15/15 routes; representative desktop and mobile visual checks reported no broken images, horizontal overflow, or console errors.
- Local preview returned HTTP 200 at `http://127.0.0.1:4174/` and served the updated `Frieda Hua Fan` metadata.

#### Decision and reusable learning

- Figma media order is now represented by explicit per-project overrides instead of filesystem-wide discovery. This prevents old optimized files from silently reappearing after a Figma replacement.
- Keep original and historical derivative files non-destructively; the data-layer sequence is the source of truth for what the website renders.
- Browser audits must treat the sound gate as optional because authorization can persist within the same browser session.
- No deployment was performed; the retained local preview remains the review target.

### S-027 — 2026-07-29 — Make Figma the website design authority

#### Task goal and completion criteria

- Goal: make Figma an explicit, permanent part of the website-generation workflow and synchronize the local website from the current Figma desktop flow.
- Completion criteria: document the authoritative chain, read the current Figma frames before code changes, reproduce their category indexes and Folded Courtyard layout, retain all project routes, and pass build, route, content, contract, and visual validation.

#### Completed and verified

- Added the mandatory workflow to `AGENTS.md` and rewrote `portfolio/FIGMA_SYNC_SYSTEM.md` around the chain `portfolio content → Figma design → Figma-to-code → local website → visual validation`.
- Recorded Figma page `142:2` and its 24 top-level route/project frames in `src/generated/figma-sync.json`; the contract now carries category order, exact Figma card assets, persistent project numbers, and project frame IDs.
- Updated the three discipline indexes to the current Figma layouts: Architecture uses three columns with Folded Courtyard on the second row, Landscape uses two wide cards, and Installation shows The Invisible Sisyphus, The Cloud, and Three Body without the obsolete index pagination.
- Exported the category-card imagery selected in Figma, retained the exact PNG exports, and generated optimized WebP runtime copies.
- Removed the obsolete About-page aura and matched its pure-white Figma composition.
- Reinstated Folded Courtyard's Figma-specific image spacing, crops, labels, and widths instead of forcing the project into the generic full-width media template.
- Production build passed. Route audit passed 15/15, content audit passed 10/10, the Figma contract validator passed, and representative desktop/mobile screenshots reported no broken images, horizontal overflow, or console errors.

#### Decision and reusable learning

- Figma now controls hierarchy, layout, typography, colors, component placement, project order, card image selection, and prototype intent. The runtime contract is a translation artifact, not a competing design source.
- A valid media list alone does not establish Figma parity. Every update must inspect the current design context and compare rendered website screenshots with the relevant Figma frames.
- Figma card imagery may intentionally differ from a project's detail-page cover, and card numbering may remain stable when an index item is hidden; both require explicit synchronization.
- No deployment was performed. The retained local preview remains the review target.

### S-028 — 2026-07-29 — Resync Island for the Stateless from its Full Detail board

#### Task goal and completion criteria

- Goal: verify whether the website's Island for the Stateless page matches the latest Figma board and correct it when it does not.
- Completion criteria: inspect `A02 · Island for the Stateless · Full Detail` directly, reproduce its selected media and custom geometry, retain the project copy and navigation, and pass build, route, content, contract, and matched-viewport visual checks.

#### Completed and verified

- Read Figma node `113:2` with the design-to-code context and confirmed that the authoritative board uses seven selected images rather than the website's previous 15-image filesystem sequence.
- Added a strict Island media manifest: `water-level`, `page-10(1)`, `page-10(2)(2)`, `page-10(2)(1)`, `plan`, `page-13`, and `page-12`.
- Reproduced the board's 568.81/765.19 opening grid, title line treatment, opening-image crop, captioned territory study, composite/panorama overlap, cropped project spread, territory study, conclusion, and post-conclusion closing image.
- Downloaded the seven current Figma PNG assets for evidence and archived them under `portfolio/figma-exports/island-for-the-stateless`; the runtime uses matching optimized WebP derivatives from the source archive.
- Updated the capture manifest and route/content assertions from 15 to 7 images.
- Production build and Figma contract validation passed. Route audit passed 15/15; content audit passed 10/10. Desktop screenshots at 1440 × 1000 showed seven loaded images, no console errors, no broken images, and no horizontal overflow.

#### Decision and reusable learning

- The previous mismatch was caused by the absence of an Island-specific Figma media override; broad folder discovery silently rendered historical images that were no longer selected in the board.
- Any project with a bespoke Figma gallery must use an explicit ordered media manifest and project-specific layout mode. Image count alone is insufficient when Figma uses overlap, crop transforms, or places media after the conclusion.

### S-029 — 2026-07-29 — Resync Trojan Forest from the four linked Figma frames

#### Task goal and completion criteria

- Goal: verify the website's Trojan Forest page against the latest Figma opening and all linked continuation frames.
- Completion criteria: reproduce the current opening image and crop, preserve the exact 01–06 media order, match the full-width gallery geometry, and pass build, route, content, contract, and screenshot validation.

#### Completed and verified

- Read Figma nodes `118:2`, `121:2`, `120:2`, and `117:2` with the design-to-code workflow.
- Downloaded the six current Figma assets and verified that their SHA-256 hashes exactly match local `page-21.png` through `page-26.png`.
- Identified the mismatch as an obsolete extra `perspective10` cover. The corrected page uses `page-21` as the opening image and `page-22` through `page-26` as the five gallery images.
- Added Trojan-specific opening and media geometry, including the Figma crop for `page-21` and the enlarged crop used for `page-24`.
- Updated the capture manifest and route/content assertions from seven images to six.
- Production build and Figma contract validation passed. Route audit passed 15/15; content audit passed 10/10. Matched 1440 × 1000 screenshots showed six loaded images, no console errors, no broken images, and no horizontal overflow.

#### Decision and reusable learning

- Figma image names such as `Image / Trojan Forest / 02` refer to the project's visual sequence, not an extra runtime cover. When the source page already contains a designed title spread, its right-side image can be recropped as the website hero instead of adding a separate historical cover.
- Global `img { max-width: 100% }` can silently defeat Figma crop widths above 100%. Bespoke image crops must explicitly set `max-width: none` and be checked using actual browser bounding boxes.

### S-030 — 2026-07-29 — Add Product Management through the Figma-controlled workflow

#### Task goal and completion criteria

- Goal: add Product Management as a fourth portfolio discipline, designed in Figma before translation into the local React website.
- Completion criteria: place it before Architecture on Home and shared navigation; add HaQimi and Open Sport IMU indexes and full-detail boards; preserve every existing animation; reuse the category ritual and Latin voice rules; and pass build, contract, route, content, interaction, and matched-viewport visual checks.

#### Completed and verified

- Updated Home node `104:2` and all shared primary navigation instances so Product Management precedes Architecture without changing the magic-circle entrance or existing category interactions.
- Created the Product Management index at node `369:290`, the HaQimi detail board at `371:268`, and the Open Sport IMU detail board at `371:298`; all three were read back through the Figma design-to-code workflow before implementation.
- Used four ordered HaQimi source spreads and five ordered Open Sport Portfolio spreads exported from source Figma file `DJez2SaCuhZmAt3BZTCC5J`, nodes `4:35`–`4:39`.
- Added deterministic project manifests, optimized WebP derivatives, route metadata, and the `Gestio Productorum` voice asset using the same processed voice chain as the existing disciplines.
- Preserved the existing GSAP entrance, magic seal, category ritual, project reveal, navigation, and direct-project-entry behavior. Product Management participates through the same shared components rather than a separate animation implementation.
- Production build passed. Route audit passed 18/18, content audit passed 12/12, interaction audit passed, and desktop visual checks showed no broken images, console errors, or horizontal overflow. The 390px shared navigation was adjusted to hide the duplicate wordmark while retaining all four disciplines, Info, and sound controls.

#### Decision and reusable learning

- New disciplines must be introduced as Figma category/detail frames first, then added to the generated sync contract and shared data-driven navigation so they inherit existing interaction rules automatically.
- Source project Figma files may supply content spreads, but the portfolio Figma file remains authoritative for their final selection, order, crop, typography, and page composition.
- No deployment was performed; the retained local preview remains the review target.

### S-031 — 2026-07-30 — Temporarily mute all website audio

#### Task goal and completion criteria

- Goal: make the retained local website completely silent for now without removing any audio assets or changing its animations.
- Completion criteria: prevent entrance effects, Latin category voices, ambient sound, project effects, and manual controls from producing audio; preserve the existing visual entrance and navigation; and keep restoration controlled by one sync-contract value.

#### Completed and verified

- Added `audio.enabled: false` and `audio.mode: temporarily-muted` to the generated Figma sync contract.
- Added an availability guard to the shared sound engine so stale browser state or a previously enabled session cannot reactivate audio.
- Changed the sound gate to offer muted entry only and left the shared sound indicator visibly off and disabled.
- Preserved all magic-circle, entrance split, category ritual, project reveal, and route-transition animations.
- Updated the audio audit to require zero category voice requests and an unavailable sound-on action.
- The Figma connector was unavailable for both inspection and writing during this task. No Figma change is claimed; the matching Figma sound-control state remains pending connector recovery.

#### Decision and reusable learning

- Temporary audio shutdown is a runtime capability flag, not deletion. Restoring sound requires changing one contract value and revalidating the existing audio path.

### S-032 — 2026-07-30 — Expand Product Management from Figma

#### Task goal and completion criteria

- Goal: add the two new Product Management projects through the mandatory Figma-first workflow, place Open Sport IMU first, and move Installation directly after Product Management in every shared directory/navigation surface.
- Completion criteria: update the authoritative Figma index and detail boards before code; translate the exact order, selected media, copy, and dark project layout into React/CSS; preserve all existing motion and muted-audio behavior; pass build, route, content, interaction, and desktop/mobile visual validation.

#### Completed and verified

- Updated Home `104:2`, Product Management index `369:290`, and all shared primary navigation instances to the order Product Management, Installation, Architecture, Landscape.
- Reworked Product Management into a two-row, four-card Figma index ordered Open Sport IMU, HaQimi, Brain Memory, and Human Head Model System.
- Created and read back full-detail Figma boards `391:274` for Brain Memory and `391:555` for Human Head Model System, with deterministic source-media order and project-specific English copy.
- Generated optimized WebP derivatives without altering the source archive, and translated both projects into the shared Product Management detail template.
- Kept the magic-circle entrance, category ritual, project reveal, direct-project-entry rule, and global muted-audio state unchanged.
- Production build passed; Figma contract validation passed; route audit passed 20/20; content audit passed 14/14; interaction audit passed. Desktop and 390px visual audits reported no broken images, console errors, or horizontal overflow.

#### Decision and reusable learning

- New folder contents do not automatically enter the public site. Figma decides the selected images and order; explicit strict media manifests prevent extra archival files from appearing.
- Product category order is deterministic in both the Figma sync contract and data layer, so Open Sport remains first regardless of filesystem or source-array order.
- No deployment was performed; `http://127.0.0.1:4174/` remains the retained local review target.
