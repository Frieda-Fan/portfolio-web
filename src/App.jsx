import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projectBySlug, projectsByCategory } from "./data/projects";
import { figmaSync, syncedCategories, useFigmaSync } from "./figmaSync";
import { soundEngine } from "./audio/soundEngine";
import magicPattern from "../web-assets/interacation/invisible-sisyphus/pattern-design-transparent.png";

gsap.registerPlugin(useGSAP);

const classNames = (...names) => names.filter(Boolean).join(" ");
const soundAvailable = figmaSync.audio?.enabled !== false;

soundEngine.setAvailable(soundAvailable);

function isFigmaCapture() {
  return new URLSearchParams(window.location.search).get("capture") === "1";
}

function MotionLink({ to, onClick, children, ...props }) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;

    event.preventDefault();
    const commit = () => flushSync(() => navigate(to));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const entersProject = typeof to === "string" && to.startsWith("/projects/");
    if (!reduce && !entersProject && document.startViewTransition) document.startViewTransition(commit);
    else commit();
  };

  return <Link to={to} onClick={handleClick} {...props}>{children}</Link>;
}

function MagicSeal({ compact = false }) {
  return (
    <span className={classNames("magic-seal", compact && "magic-seal--compact")} aria-hidden="true">
      <img className="seal-ring" src={magicPattern} alt="" />
    </span>
  );
}

function SiteChrome({ light = false }) {
  return (
    <header className={classNames("site-chrome", light && "site-chrome--light")}>
      <MotionLink className="wordmark" to="/">{figmaSync.site.wordmark}</MotionLink>
      <div className="site-chrome__right">
        <nav aria-label="Primary navigation">
          {Object.entries(syncedCategories).map(([slug, item]) => (
            <MotionLink key={slug} to={`/${slug}`}>{item.label}</MotionLink>
          ))}
        </nav>
        <MotionLink className="info-link" to="/about">Info</MotionLink>
        <SoundToggle />
      </div>
    </header>
  );
}

function SoundToggle() {
  const [muted, setMuted] = useState(soundEngine.muted);

  const toggle = async () => {
    if (!soundAvailable) return;
    if (muted) {
      const enabled = await soundEngine.enable();
      setMuted(!enabled);
    } else {
      soundEngine.disableWithFeedback();
      setMuted(true);
    }
  };

  return (
    <button className="sound-toggle" type="button" onClick={toggle} aria-pressed={!muted} disabled={!soundAvailable}>
      <span aria-hidden="true">{muted ? "○" : "●"}</span>
      {muted ? "Sound off" : "Sound on"}
    </button>
  );
}

function SoundGate({ onEnter }) {
  const enter = async (withSound) => {
    if (withSound && soundAvailable) await soundEngine.enable();
    else soundEngine.setMuted(true);
    onEnter();
  };

  return (
    <main className="sound-gate">
      <MagicSeal compact />
      <div>
        <p className="eyebrow">{soundAvailable ? "This archive contains sound" : "Sound is temporarily muted"}</p>
        <h1>Touch to unseal.</h1>
        <p>{soundAvailable
          ? "The rotating seal and its black threshold will divide at the centre with a mechanical gear score."
          : "The rotating seal and its black threshold will still divide at the centre without audio."}</p>
        <div className="sound-gate__actions">
          {soundAvailable ? <button type="button" onClick={() => enter(true)}>Enter with sound</button> : null}
          <button type="button" onClick={() => enter(false)}>Enter muted</button>
        </div>
      </div>
    </main>
  );
}

function HomeEntrance({ onComplete }) {
  const root = useRef(null);
  const motion = figmaSync.motion.entrance;

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      soundEngine.gearOpen();
      gsap.set(".entrance-panel--left", { xPercent: -100 });
      gsap.set(".entrance-panel--right", { xPercent: 100 });
      const id = window.setTimeout(onComplete, 180);
      return () => window.clearTimeout(id);
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete,
    });
    tl.fromTo(".entrance-seal-rotor", { rotation: 0, scale: 0.94, autoAlpha: 0 }, { rotation: motion.rotationDegrees, scale: 1, autoAlpha: 1, duration: motion.sealDurationSeconds, ease: motion.sealEase }, 0)
      .addLabel("unlock", motion.unlockAtSeconds)
      .call(() => soundEngine.gearOpen(), [], "unlock")
      .fromTo(".entrance-seam", { scaleY: 0, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: motion.seamDurationSeconds }, "unlock")
      .to(".entrance-panel--left", { xPercent: -motion.splitDistancePercent, duration: motion.splitDurationSeconds, ease: motion.splitEase }, `unlock+=${motion.splitDelaySeconds}`)
      .to(".entrance-panel--right", { xPercent: motion.splitDistancePercent, duration: motion.splitDurationSeconds, ease: motion.splitEase }, "<")
      .to(".entrance-seam", { autoAlpha: 0, duration: motion.seamFadeDurationSeconds }, "<0.55")
      .to(".entrance-status", { autoAlpha: 0, duration: motion.statusFadeDurationSeconds }, "unlock");
  }, { scope: root });

  return (
    <section ref={root} className="home-entrance" aria-label="Opening animation">
      <div className="entrance-panel entrance-panel--left">
        <span className="entrance-seal-rotor"><img src={magicPattern} alt="" /></span>
      </div>
      <div className="entrance-panel entrance-panel--right">
        <span className="entrance-seal-rotor"><img src={magicPattern} alt="" /></span>
      </div>
      <div className="entrance-seam" aria-hidden="true" />
      <p className="entrance-status">DIVIDING THE THRESHOLD</p>
    </section>
  );
}

function Home({ animateEntrance = true }) {
  const root = useRef(null);
  const [entranceDone, setEntranceDone] = useState(!animateEntrance);

  useGSAP(() => {
    if (!entranceDone) return;
    const motion = figmaSync.motion.homeReveal;
    gsap.from(".home-title-lockup > *", { y: motion.offsetYpx, autoAlpha: 0, stagger: motion.staggerSeconds, duration: motion.titleDurationSeconds, ease: motion.ease });
    gsap.from(".category-link", { y: motion.categoryOffsetYpx, autoAlpha: 0, stagger: motion.staggerSeconds, duration: motion.categoryDurationSeconds, ease: motion.ease });
  }, { scope: root, dependencies: [entranceDone] });

  return (
    <main ref={root} className="home">
      <SiteChrome />
      <div className="home-seal-backdrop"><MagicSeal /></div>
      <section className="home-title-lockup">
        <p className="eyebrow">{figmaSync.site.homeEyebrow}</p>
        <nav className="category-index" aria-label="Project disciplines">
          {Object.entries(syncedCategories).map(([slug, category], index) => (
            <MotionLink className={classNames("category-link", `category-link--${slug}`)} to={`/${slug}`} key={slug}>
              <span>0{index + 1}</span>
              <strong>{category.label}</strong>
              <em>{category.latin}</em>
            </MotionLink>
          ))}
        </nav>
      </section>
      {!entranceDone ? <HomeEntrance onComplete={() => setEntranceDone(true)} /> : null}
    </main>
  );
}

function CategoryPage() {
  const { category: categorySlug } = useParams();
  const category = syncedCategories[categorySlug];
  const categoryProjects = projectsByCategory[categorySlug] ?? [];
  const figmaProjectOrder = figmaSync.designSource?.categoryFrames?.[categorySlug]?.projects;
  const items = Array.isArray(figmaProjectOrder)
    ? figmaProjectOrder.map((slug) => projectBySlug.get(slug)).filter(Boolean)
    : categoryProjects;
  const root = useRef(null);
  const captureMode = isFigmaCapture();
  const [ritualDone, setRitualDone] = useState(captureMode);

  useEffect(() => {
    setRitualDone(captureMode);
  }, [categorySlug]);

  useGSAP(() => {
    if (!category || captureMode) return;
    soundEngine.playCategory(categorySlug);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = figmaSync.motion.categoryRitual;
    const tl = gsap.timeline({ onComplete: () => setRitualDone(true) });
    tl.fromTo(".ritual-title", { scale: reduce ? 1 : motion.titleStartScale, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: reduce ? 0.01 : motion.titleDurationSeconds, ease: motion.ease })
      .from(".ritual-latin", { y: 18, autoAlpha: 0, duration: reduce ? 0.01 : motion.latinDurationSeconds }, "-=.25")
      .to(".ritual-title-group", { autoAlpha: 0, filter: "blur(16px)", duration: reduce ? 0.01 : motion.fadeDurationSeconds, delay: reduce ? 0 : motion.holdSeconds });
  }, { scope: root, dependencies: [categorySlug] });

  useGSAP(() => {
    if (!ritualDone) return;
    soundEngine.sigilReveal(items.length);
    const motion = figmaSync.motion.projectReveal;
    gsap.fromTo(".project-sigil", { y: motion.offsetYpx, autoAlpha: 0, scale: motion.startScale }, { y: 0, autoAlpha: 1, scale: 1, stagger: motion.staggerSeconds, duration: motion.durationSeconds, ease: motion.ease });
  }, { scope: root, dependencies: [ritualDone, categorySlug] });

  if (!category) return <Navigate to="/" replace />;

  return (
    <main ref={root} className={classNames("category-page", `category-page--${categorySlug}`)}>
      <SiteChrome />
      {!ritualDone ? (
        <section className="category-ritual">
          <MagicSeal compact />
          <div className="ritual-title-group">
            <h1 className="ritual-title">{category.label}</h1>
            <p className="ritual-latin">{category.latin}</p>
          </div>
        </section>
      ) : (
        <>
          <header className="category-heading">
            <p className="eyebrow">{category.latin} · {category.meaning}</p>
            <h1>{category.label}</h1>
          </header>
          <section className={classNames("category-project-grid", `category-project-grid--${categorySlug}`)}>
            {items.map((project, index) => (
              <MotionLink className={classNames("project-sigil", `project-sigil--${project.slug}`)} key={project.slug} to={`/projects/${project.slug}`} onClick={() => soundEngine.projectOpen()}>
                <div className="project-sigil__image">
                  <img src={figmaSync.designSource?.cardAssets?.[project.slug] ?? project.coverImage} alt="" />
                  <span>
                    {figmaSync.designSource?.cardNumbers?.[project.slug] ??
                      String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <strong>{project.title}</strong>
                <em>{project.year} · {project.location}</em>
              </MotionLink>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projectBySlug.get(slug);
  const root = useRef(null);
  const productSequence = ["open-sport-imu", "haqimi", "brain-memory", "human-head-model-system"];
  const spatialSequence = [
    "folded-courtyard",
    "island-for-the-stateless",
    "infinitas-hotel",
    "countryside-introduction-planning",
    "trojan-forest",
    "s-o-s",
    "the-invisible-sisyphus",
    "the-cloud",
    "anti-wastecolonialism",
    "three-body",
  ];
  const navigationSequence = project?.category === "product-management" ? productSequence : spatialSequence;
  const projectIndex = navigationSequence.indexOf(slug);
  const previous = projectBySlug.get(navigationSequence[(projectIndex - 1 + navigationSequence.length) % navigationSequence.length]);
  const next = projectBySlug.get(navigationSequence[(projectIndex + 1) % navigationSequence.length]);
  const captureMode = isFigmaCapture();
  const captureParams = new URLSearchParams(window.location.search);
  const captureStart = Number(captureParams.get("captureStart"));
  const captureEnd = Number(captureParams.get("captureEnd"));
  const rangedCapture = captureMode && Number.isInteger(captureStart) && Number.isInteger(captureEnd) && captureEnd > captureStart;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.title} — Frieda Hua Fan`;
    return () => { document.title = "Frieda Hua Fan — Spatial Works"; };
  }, [project]);

  const chapters = useMemo(() => {
    if (!project) return [];
    const records = project.media.map((item, index) => ({
      ...item,
      title: project.figmaMediaLabels?.[index] ?? project.sections[index % project.sections.length],
      sourceIndex: index,
    }));
    const rules = project.matrixRules ?? [];
    const assigned = new Set();
    const groups = [];

    rules.forEach((rule) => {
      const matcher = rule.regex ? new RegExp(rule.regex, "i") : null;
      const matches = records.filter((record) => {
        if (assigned.has(record.sourceIndex)) return false;
        if (matcher?.test(record.stem)) return true;
        return rule.includes?.some((hint) => record.stem.includes(hint.toLocaleLowerCase()));
      });
      const chunkSize = rule.chunk ?? matches.length;
      for (let offset = 0; offset < matches.length; offset += chunkSize) {
        const chunk = matches.slice(offset, offset + chunkSize);
        if (chunk.length < 2) continue;
        chunk.forEach((record) => assigned.add(record.sourceIndex));
        groups.push({
          type: "matrix",
          media: chunk,
          sourceIndex: Math.min(...chunk.map((record) => record.sourceIndex)),
          title: rule.title,
          columns: Math.min(rule.columns ?? 3, chunk.length),
        });
      }
    });

    records.forEach((record) => {
      if (!assigned.has(record.sourceIndex)) groups.push({ type: "single", media: [record], sourceIndex: record.sourceIndex, title: record.title });
    });

    return groups
      .sort((a, b) => a.sourceIndex - b.sourceIndex)
      .map((group, index) => ({
        ...group,
        number: project.figmaMediaNumbers?.[group.sourceIndex] ?? String(index + 1).padStart(2, "0"),
      }));
  }, [project]);

  if (!project) return <Navigate to="/" replace />;
  const isLight = project.theme === "ivory";
  const isProductManagement = project.category === "product-management";
  const projectNumber = figmaSync.designSource?.cardNumbers?.[project.slug];
  const heroImageStyle = project.figmaHeroCrop ? {
    "--hero-left": project.figmaHeroCrop.left,
    "--hero-top": project.figmaHeroCrop.top,
    "--hero-width": project.figmaHeroCrop.width,
    "--hero-height": project.figmaHeroCrop.height,
  } : undefined;
  const postConclusionSet = new Set(
    project.figmaPostConclusionIndices
    ?? (project.figmaPostConclusionIndex != null ? [project.figmaPostConclusionIndex] : [])
  );
  const postConclusionChapters = chapters
    .filter((chapter) => postConclusionSet.has(chapter.sourceIndex))
    .sort((a, b) => a.sourceIndex - b.sourceIndex);
  const galleryChapters = chapters
    .filter((chapter) => project.editorialCover
      || project.figmaIncludeOpeningInGallery
      || chapter.sourceIndex !== 0)
    .filter((chapter) => !postConclusionSet.has(chapter.sourceIndex));
  const visibleChapters = rangedCapture ? galleryChapters.slice(captureStart, captureEnd) : galleryChapters;
  const showOpening = !rangedCapture || captureStart === 0;
  const showClosing = !rangedCapture || captureEnd >= galleryChapters.length;

  return (
    <main
      ref={root}
      className={classNames("project-page", `project-page--${project.slug}`, isLight ? "theme-ivory" : "theme-dark")}
      style={project.figmaAccent ? { "--project-accent": project.figmaAccent } : undefined}
    >
      <SiteChrome light={isLight} />
      {showOpening ? <><section className="project-hero">
        <div className="project-hero__copy">
          <MotionLink className="back-link" to={`/${project.category}`}>
            {isProductManagement ? `Product Management · ${projectNumber}` : `← ${syncedCategories[project.category].label}`}
          </MotionLink>
          {project.kicker ? <p className="eyebrow">{project.kicker}</p> : null}
          <h1>{project.figmaDisplayTitle ?? project.title}</h1>
          <p className="project-subtitle">{project.subtitle}</p>
          <dl style={project.figmaHeroMetaTop ? { "--hero-meta-top": project.figmaHeroMetaTop } : undefined}>
            {(project.figmaMeta ?? [
              ["Year", project.year],
              ["Location", project.location],
              ["Type", project.type],
            ]).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
        <figure className="project-hero__media">
          <img
            className={project.figmaHeroCrop ? "project-hero__image--figma-crop" : undefined}
            style={heroImageStyle}
            src={project.coverImage}
            alt={`${project.title} — opening image`}
          />
          {project.editorialDisclosure ? <figcaption>{project.editorialDisclosure}</figcaption> : null}
        </figure>
      </section>
      <section className="project-intro">
        <p className="eyebrow">Project statement</p>
        <h2>{project.summary}</h2>
        {project.figmaIncludeHeroInIntro ? (
          project.figmaStatementVideo ? (
            <figure className="project-intro__image project-intro__image--video" data-figma-node-id={project.figmaStatementVideo.figmaNodeId}>
              <video autoPlay muted loop playsInline controls preload="metadata" aria-label={project.figmaStatementVideo.label}>
                <source src={project.figmaStatementVideo.src} type="video/mp4" />
                Your browser does not support embedded MP4 video.
              </video>
            </figure>
          ) : (
            <figure className="project-intro__image">
              <img src={project.coverImage} alt="" aria-hidden="true" />
            </figure>
          )
        ) : null}
        <div className="project-intro__body">
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section></> : null}
      <section className="project-gallery" aria-label={`${project.title} project material`}>
        {visibleChapters.map((chapter, index) => chapter.type === "matrix" ? (
          <section className="media-block media-matrix" key={`${chapter.sourceIndex}-${chapter.number}`} style={{ "--matrix-columns": chapter.columns }}>
            <div className="media-matrix__grid">
              {chapter.media.map((item) => (
                <figure className="media-matrix__item" key={item.url}>
                  <img loading={captureMode ? "eager" : "lazy"} decoding="async" src={item.url} alt={`${project.title}: ${chapter.title}`} />
                </figure>
              ))}
            </div>
            <header className="media-caption">
              <span>{chapter.number}</span><strong>{chapter.title}</strong><em>{chapter.media.length} studies / {project.year}</em>
            </header>
          </section>
        ) : (
          <figure
            className={classNames(
              "media-block",
              "media-chapter",
              project.figmaMediaLayout === "full-width" && "media-chapter--figma-full",
              project.figmaMediaLayout === "folded-courtyard" && "media-chapter--folded",
              project.figmaMediaLayout === "folded-courtyard" && `media-chapter--folded-${chapter.sourceIndex}`,
              project.figmaMediaLayout === "island-for-the-stateless" && "media-chapter--island",
              project.figmaMediaLayout === "island-for-the-stateless" && `media-chapter--island-${chapter.sourceIndex}`,
              project.figmaMediaLayout === "trojan-forest" && "media-chapter--trojan",
              project.figmaMediaLayout === "trojan-forest" && `media-chapter--trojan-${chapter.sourceIndex}`,
              project.figmaMediaLayout === "product-case" && "media-chapter--product-case",
              project.figmaMediaLayout === "product-case" && `media-chapter--product-case-${chapter.sourceIndex}`,
              !project.figmaMediaSequence && index % 5 === 1 && "media-chapter--narrow",
              !project.figmaMediaSequence && index % 5 === 3 && "media-chapter--offset",
            )}
            key={`${chapter.media[0].url}-${index}`}
          >
            <img loading={captureMode ? "eager" : "lazy"} decoding="async" src={chapter.media[0].url} alt={`${project.title}: ${chapter.title}`} />
            {(!project.figmaMediaSequence
              || (project.figmaMediaLayout === "folded-courtyard" && chapter.sourceIndex === 1)
              || (project.figmaMediaLayout === "island-for-the-stateless" && chapter.sourceIndex === 1)) ? <figcaption className="media-caption">
              <span>{chapter.number}</span><strong>{chapter.title}</strong><em>{syncedCategories[project.category].label} / {project.year}</em>
            </figcaption> : null}
          </figure>
        ))}
      </section>
      {project.figmaVideo ? (
        <figure className="project-video" data-figma-node-id={project.figmaVideo.figmaNodeId}>
          <video autoPlay muted loop playsInline controls preload="metadata" aria-label={project.figmaVideo.label}>
            <source src={project.figmaVideo.src} type="video/mp4" />
            Your browser does not support embedded MP4 video.
          </video>
        </figure>
      ) : null}
      {showClosing ? <><section className="project-conclusion">
        <p className="eyebrow">Project conclusion</p>
        <h2>{project.conclusion}</h2>
      </section>
      {postConclusionChapters.length > 0 ? (
        <section className="project-post-conclusion">
          {postConclusionChapters.map((chapter, index) => (
            <figure
              className={classNames(
                "project-closing-media",
                project.slug === "island-for-the-stateless" && "project-closing-media--island",
                project.slug === "haqimi" && "project-closing-media--haqimi",
                project.slug === "haqimi" && `project-closing-media--haqimi-${index}`,
              )}
              key={`${chapter.media[0].url}-${index}`}
            >
              <img
                loading={captureMode ? "eager" : "lazy"}
                decoding="async"
                src={chapter.media[0].url}
                alt={`${project.title}: ${chapter.title}`}
              />
            </figure>
          ))}
        </section>
      ) : null}
      {project.figmaPostConclusionVideo ? (
        <figure className="project-video project-video--post-conclusion" data-figma-node-id={project.figmaPostConclusionVideo.figmaNodeId}>
          <video autoPlay muted loop playsInline controls preload="metadata" aria-label={project.figmaPostConclusionVideo.label}>
            <source src={project.figmaPostConclusionVideo.src} type="video/mp4" />
            Your browser does not support embedded MP4 video.
          </video>
        </figure>
      ) : null}
      <footer className="project-footer">
        <MotionLink to={`/projects/${previous.slug}`}><span>Previous</span><strong>{previous.title}</strong></MotionLink>
        <MotionLink to={`/${project.category}`}><span>Index</span><strong>{syncedCategories[project.category].label}</strong></MotionLink>
        <MotionLink to={`/projects/${next.slug}`}><span>Next</span><strong>{next.title}</strong></MotionLink>
      </footer></> : null}
    </main>
  );
}

function AboutPage() {
  const experience = [
    "3XN — Architectural Intern",
    "Lamar Johnson Collaborative — Architectural Intern",
    "China IPPR International Engineering Co., Ltd — Architectural Intern",
    "Harvard Conflux — Design and Branding Lead",
    "Harvard Chemistry Magazine — Design Editor",
    "Three-Body Exhibition and Installation, Konstnärshuset, Stockholm — Exhibitor",
  ];

  return (
    <main className="about-page">
      <SiteChrome />
      <header className="about-hero">
        <p className="eyebrow">Frieda Fan · Spatial designer</p>
        <h1>Designing relations between bodies, systems, and landscapes.</h1>
      </header>
      <section className="about-grid">
        <div>
          <p className="eyebrow">About</p>
        </div>
        <div className="about-biography">
          <p>
            Frieda Fan is a spatial designer working across architecture, landscape, installation,
            and visual communication. She holds a Bachelor of Architecture
            with a minor in Finance from Beijing University of Technology and is pursuing
            the MLA I AP program at Harvard Graduate School of Design.
          </p>
          <p>
            Her experience spans architectural practice, landscape research, exhibition
            design, branding, installation, and editorial work. Across these fields, she
            uses spatial storytelling, visualization, and material systems to connect
            environmental questions with cultural and political conditions.
          </p>
        </div>
        <div>
          <p className="eyebrow">Selected experience</p>
        </div>
        <ol className="experience-list">
          {experience.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>
          ))}
        </ol>
      </section>
      <footer className="about-footer">
        <p>Architecture · Landscape · Installation</p>
        <MotionLink to="/">Return to the index →</MotionLink>
      </footer>
    </main>
  );
}

function ScrollRestoration() {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith("/projects/")) window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export default function App() {
  useFigmaSync();
  const captureMode = isFigmaCapture();
  const location = useLocation();
  const [entered, setEntered] = useState(captureMode || location.pathname !== "/");

  if (location.pathname === "/" && !entered) return <SoundGate onEnter={() => setEntered(true)} />;

  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Home animateEntrance={!captureMode} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
