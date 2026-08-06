const sourceImages = import.meta.glob(
  "../../web-assets/{product-management,architecture,landscape,interacation}/**/*.{webp,png,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
);

const imageStem = (path) =>
  decodeURIComponent(path.split("/").at(-1))
    .replace(/\.(?:webp|png|jpe?g)$/i, "")
    .toLocaleLowerCase();

const imagesFor = (
  sourceFolder,
  coverHint,
  sequenceHints = [],
  { strictSequence = false, includeCoverInMedia = true } = {},
) => {
  const normalizedCover = coverHint?.toLocaleLowerCase();
  const normalizedSequence = sequenceHints.map((hint) => hint.toLocaleLowerCase());

  const narrativeRank = (path) => {
    const stem = imageStem(path);
    if (normalizedCover && stem === normalizedCover) return -1;

    const exactIndex = normalizedSequence.findIndex((hint) => stem === hint);
    if (exactIndex >= 0) return exactIndex * 2;

    const partialIndex = normalizedSequence.findIndex((hint) => stem.includes(hint));
    if (partialIndex >= 0) return partialIndex * 2 + 1;

    return Number.MAX_SAFE_INTEGER;
  };

  return Object.entries(sourceImages)
    .filter(([path]) => path.includes(`/${sourceFolder}/`))
    .filter(([path]) => {
      if (!strictSequence) return true;
      const stem = imageStem(path);
      return normalizedSequence.includes(stem)
        || (includeCoverInMedia && normalizedCover && stem === normalizedCover);
    })
    .sort(([a], [b]) => {
      const rankDifference = narrativeRank(a) - narrativeRank(b);
      return rankDifference || a.localeCompare(b, "en", { numeric: true });
    })
    .map(([path, url]) => ({ url, stem: imageStem(path) }));
};

export const categories = {
  "product-management": {
    label: "Product Management",
    latin: "Gestio Productorum",
    meaning: "The direction of products",
    pronunciation: "GES-tee-oh pro-duk-TOR-um",
  },
  architecture: {
    label: "Architecture",
    latin: "Architectūra",
    meaning: "The art of building",
    pronunciation: "ar-kee-tek-TOO-ra",
  },
  landscape: {
    label: "Landscape",
    latin: "Forma Terrae",
    meaning: "The form of the land",
    pronunciation: "FOR-ma TER-rai",
  },
  installation: {
    label: "Installation",
    latin: "Ars in Situ",
    meaning: "Art situated in place",
    pronunciation: "ars in SEE-too",
  },
};

const rawProjects = [
  {
    slug: "haqimi",
    folder: "product-management/Haqimi",
    category: "product-management",
    title: "HaQimi",
    subtitle: "An interactive flavor menu that lets diners understand a dish before ordering",
    year: "2026",
    location: "Interactive Dining Product",
    type: "Product Management · Product Design",
    theme: "dark",
    coverHint: "product management-hua fan2_06",
    imageSequence: [
      "product management-hua fan2_06",
      "product management-hua fan2_07",
      "product management-hua fan2_08",
      "product management-hua fan2_09",
    ],
    summary:
      "HaQimi turns uncertainty at the menu into a playful, multisensory conversation between diners, food, and space.",
    overview: [
      "Built from market research into China's restaurant economy and social-media-led dining culture, the concept reframes a menu as an embodied guide.",
      "Gesture recognition, ambient scent, a responsive screen, and a character-like hardware shell let guests explore flavor without touching a public display.",
      "The project connects software logic, expressive hardware, and a tactile dining experience in one research-led prototype.",
    ],
    conclusion:
      "A research-led prototype that connects software logic, expressive hardware, and a tactile dining experience.",
    sections: [
      "Interactive Flavor Menu",
      "Market Research and Cultural Context",
      "Software and Hardware Architecture",
      "Product Design and Prototype",
    ],
  },
  {
    slug: "open-sport-imu",
    folder: "product-management/Open Sport",
    category: "product-management",
    title: "Open Sport IMU",
    subtitle: "Ear-worn dual-IMU activity recognition and head-neck posture feedback prototype",
    year: "2026",
    location: "Smart Wearable Product",
    type: "Smart Hardware Product Manager",
    theme: "dark",
    coverHint: "01-cover",
    imageSequence: [
      "01-cover",
      "02-research",
      "03-definition",
      "04-implementation",
      "05-uxui",
    ],
    summary:
      "Let headphones understand human movement — without turning the experience into a black box.",
    overview: [
      "Open Sport connects user research, dual-device sensing, model evidence, and low-burden feedback.",
      "The product separates activity recognition from personal posture baselines so each task can use an appropriate sampling window, model, and feedback intensity.",
      "Every reminder is designed to remain traceable, explainable, and recoverable rather than interrupting listening or presenting a medical diagnosis.",
    ],
    conclusion:
      "A five-page product case study linking research boundaries, system definition, model confidence, and real-time UX.",
    sections: [
      "Let Headphones Understand Movement",
      "Human Factors and Activity Research",
      "Product Definition",
      "Model Training and Evidence",
      "Low-Burden Real-Time Experience",
    ],
  },
  {
    slug: "brain-memory",
    folder: "product-management/brain-memory",
    category: "product-management",
    title: "Brain Memory",
    subtitle: "A shared digital memory system that reconnects fragmented photos, dialogue and creative work.",
    year: "2026",
    location: "Digital Memory Product",
    type: "Product Manager · UI / Interaction Designer",
    theme: "dark",
    coverHint: "brain memory — reference-led v2",
    imageSequence: [
      "brain memory — reference-led v2",
      "from data to memory — reference-led v2",
      "capture layer — reference-led v2",
      "memory as interface — reference-led v2",
      "shared timeline — reference-led v2",
      "reflection — reference-led v2",
    ],
    summary:
      "Turn fragments in the mind into memories that can be written together.",
    overview: [
      "Brain Memory links computer-matched signals, personal albums, conversational retrieval and co-creation.",
      "Rather than treating search as recall alone, it rebuilds context through time, place, people and shared authorship.",
      "The responsive web and mobile prototype turns scattered personal data into a retrievable, collaborative memory stream.",
    ],
    conclusion:
      "A responsive web and mobile prototype that turns scattered personal data into a retrievable, collaborative memory stream.",
    sections: [
      "From Data to Memory",
      "Capture Layer",
      "Memory as Interface",
      "Shared Timeline",
      "Reflection",
    ],
  },
  {
    slug: "human-head-model-system",
    folder: "product-management/human-head-detabase",
    category: "product-management",
    title: "Human Head Model System",
    subtitle: "A unified workspace for measuring real head data and generating adjustable 3D models.",
    year: "2026",
    location: "3D Data Platform",
    type: "Product Manager · System Designer",
    theme: "dark",
    coverHint: "human-head-home",
    imageSequence: [
      "human-head-home",
      "human-head-measure",
      "human-head-generate",
    ],
    summary:
      "From real head measurements to adjustable, export-ready three-dimensional models.",
    overview: [
      "The system combines automatic landmark detection, manual annotation, dimensional measurement, parameter adjustment and OBJ export in one workspace.",
      "It makes model evidence visible while supporting repeatable database construction.",
      "The workflow translates head geometry into reusable 3D data for research and product development.",
    ],
    conclusion:
      "A measurement and generation platform that translates head geometry into reusable 3D data for research and product development.",
    sections: [
      "Measurement and Generation",
      "Human Head Measurement",
      "Parametric Model Generation",
    ],
  },
  {
    slug: "folded-courtyard",
    folder: "architecture/folded-courtyard",
    category: "architecture",
    title: "Folded Courtyard",
    subtitle: "A Barcelona corner apartment shaped by courtyards, grilles, and directed views",
    year: "2023",
    location: "Les Corts, Barcelona",
    type: "Individual work",
    theme: "ivory",
    coverHint: "效果图",
    imageSequence: ["城市发展史", "日照视线分析", "视线分析", "联想截图", "阳台", "爆炸轴测", "平面图", "户型", "剖面", "筒", "穿孔板", "网格", "喷漆过程", "泡沫塑料", "mapping", "img_", "人视角", "仰视", "俯视", "效果图2"],
    matrixRules: [
      { includes: ["联想截图"], columns: 3, chunk: 6, title: "Observed Balcony Types" },
      { includes: ["微信截图"], columns: 3, chunk: 6, title: "Pattern and Material Studies" },
      { includes: ["mapping"], columns: 3, chunk: 3, title: "Facade Mapping" },
      { includes: ["img_72", "img_73"], columns: 4, chunk: 8, title: "Model and Fabrication Archive" },
      { includes: ["喷漆过程", "泡沫塑料", "穿孔板筒", "筒构造", "网格", "粗", "细"], columns: 4, chunk: 8, title: "Material Tests" },
    ],
    summary:
      "Folded Courtyard reinterprets Barcelona's corner block through a vertical communal courtyard and a layered grille facade. Together, these systems guide movement, frame visual encounters, and negotiate the relationship between private dwellings and public life.",
    overview: [
      "The project grows from a study of Barcelona's urban development, close observation of buildings surrounding the site, and the changing social role of the European balcony.",
      "The folded courtyard acts simultaneously as an internal public room, a vertical circulation system, and a visual connector. Perforated aluminum surfaces reflect the sky and surrounding buildings, extending the perceived depth of the interior.",
      "Across the facade, three superimposed grille patterns create gradients of density and color. The system filters views and light while allowing the building to shift as the observer moves around the corner.",
    ],
    conclusion: "Folded Courtyard treats circulation, facade, and collective space as one social instrument. The building does not simply occupy Barcelona's corner condition; it folds public life inward and lets the city remain visible through light, reflection, and layered thresholds.",
    sections: ["The Barcelona Corner", "Balcony as Public Stage", "Folding the Courtyard", "Housing Typologies", "Circulation and Encounter", "Light, Sight, and Section", "A Grille in Three Layers", "Model Studies", "Final Spaces"],
  },
  {
    slug: "island-for-the-stateless",
    folder: "architecture/artificial-island",
    category: "architecture",
    title: "Island for the Stateless",
    subtitle: "An industry-oriented land-art system for a community without land",
    year: "2022",
    location: "Tonle Sap Lake, Cambodia",
    type: "Individual work",
    theme: "ivory",
    coverHint: "人视角生长",
    imageSequence: ["history-photo", "history-analysis", "site-analysis", "compare-analysis", "razzle dazzle ship", "navy-casual", "plan", "section", "water-level"],
    matrixRules: [
      { includes: ["history", "site-analysis", "compare-analysis"], columns: 2, chunk: 4, title: "Territory and Statelessness" },
      { includes: ["razzle", "navy-casual"], columns: 2, chunk: 2, title: "Camouflage References" },
    ],
    summary:
      "Island for the Stateless proposes a productive artificial landscape for stateless communities living on Tonle Sap Lake. Camouflage, infrastructure, aquaculture, and changing water levels form an island that supports life before gradually returning to landscape.",
    overview: [
      "Without legal access to land, many residents of Tonle Sap's floating villages depend on fishing and rice cultivation while remaining excluded from the territorial systems surrounding them.",
      "The proposal creates an industry-oriented artificial island. Breeding ponds, cooling pools, productive ground, and concealed infrastructure support a temporary collective life.",
      "If territorial conflicts are resolved, vegetation gradually overtakes the island. Over 120 years, an inhabited infrastructure becomes a landscape.",
    ],
    conclusion: "The island is conceived as a temporary support system rather than a permanent sovereign object. Its final condition is not a monument, but a productive landscape capable of outliving the conflict that made it necessary.",
    sections: ["A Home Without Land", "The Limits of the Border", "Tonle Sap and the Floating Villages", "Camouflage as Territory", "Productive Water", "Island Infrastructure", "Seasonal Transformation", "Post-Anthropocene", "From Settlement to Landscape"],
  },
  {
    slug: "infinitas-hotel",
    folder: "architecture/infinitas-hotel",
    category: "architecture",
    title: "Infinitas Hotel",
    subtitle: "A reflective urban hotel organized around a continuous public courtyard",
    year: "2024",
    location: "Nanjing, China",
    type: "Individual work",
    theme: "dark",
    coverHint: "效果图5",
    imageSequence: ["城市立面", "形态生成", "功能", "轴测", "f1", "f2", "f3", "剖透视", "细部", "效果图2", "效果图4"],
    matrixRules: [
      { regex: "^f[123]$", columns: 3, chunk: 3, title: "Plans and Program" },
      { includes: ["效果图2", "效果图4"], columns: 2, chunk: 2, title: "Interior Atmospheres" },
    ],
    summary:
      "Infinitas Hotel is a mixed-use hotel, entertainment, and conference complex whose black reflective facade changes with the sun. A sequence of diagonal bridges connects public programs through a continuous courtyard.",
    overview: [
      "Modern glass architecture once promised transparency, but decades of uniform curtain-wall construction have produced increasingly anonymous cityscapes. Infinitas Hotel reinterprets the facade as an active urban surface.",
      "Black reflective glass shifts in color according to sunlight and viewing angle while protecting the privacy of hotel guests.",
      "Bridge-like connections span diagonally between the conference center and lobby, tying public programs into a continuous courtyard.",
    ],
    conclusion: "Infinitas Hotel turns an opaque urban volume into a changing field of reflection and movement. Privacy, public circulation, and the image of the city are held together through the facade and the continuous courtyard.",
    sections: ["A Dark Reflective Landmark", "Zhonghua Gate Context", "Massing the Program", "The Continuous Courtyard", "Bridges Across the Void", "Reflection and Privacy", "Sectional Organization", "Plans and Public Programs", "Interior Atmospheres"],
  },
  {
    slug: "countryside-introduction-planning",
    folder: "architecture/countryside-introduction-planning",
    category: "architecture",
    title: "Countryside Introduction Planning",
    subtitle: "A carnival of anti-gentrification for folding city and countryside together",
    year: "2022",
    location: "Japan",
    type: "Group work",
    theme: "ivory",
    coverHint: "效果图4-恢复的",
    imageSequence: ["conception", "全域矢量工程", "分级分析图", "功能分析图", "流程图", "彩色平立", "最终的剖面", "拍立得第一行", "拍立得第二行", "拍立得第三行", "拍立得第四行", "拍立得第五行"],
    matrixRules: [
      { includes: ["分级分析图", "功能分析图", "流程图"], columns: 3, chunk: 3, title: "Classification and Exchange Logic" },
      { includes: ["拍立得"], columns: 3, chunk: 6, title: "Rural Programs Enter the City" },
    ],
    summary:
      "Countryside Introduction Planning imagines rural culture, production, and landscape entering the city as an active competitor rather than a nostalgic image. A dynamic land-exchange system replaces empty urban spaces with rural programs.",
    overview: [
      "The project begins with the idea that countryside and city should no longer be treated as separate conditions. Their merger becomes a form of rural urbanism.",
      "The struggle against gentrification is represented as a carnival inspired by Japanese parades. Rural symbols and programs move into vacant urban buildings like a procession.",
      "A classification system for rural types connects to a monitoring system for urban space, determining where exchanges can occur.",
    ],
    conclusion: "Rather than preserving the countryside as a distant image, the proposal makes rural production, culture, and landscape active participants in urban change. Exchange becomes a tool for resisting vacancy and one-directional gentrification.",
    sections: ["Folding City and Countryside", "A Carnival of Anti-Gentrification", "Rural Types", "Monitoring Urban Vacancy", "Land Exchange", "Production, Culture, and Landscape", "New Urban Assemblies", "The Countryside Enters the City"],
  },
  {
    slug: "trojan-forest",
    folder: "landscape/trojan-forest",
    category: "landscape",
    title: "Trojan Forest",
    subtitle: "An urban forest and wetland that reveals, conceals, and repairs",
    year: "2025",
    location: "Charlestown, Boston",
    type: "Individual work · Harvard GSD Core IV",
    theme: "ivory",
    coverHint: "perspective10",
    imageSequence: ["action24", "heatisland", "transport", "soil", "slr", "site", "layout", "tree", "section", "transect", "soil remediation", "ph1", "ph2", "ph3", "back layer", "桥", "img_"],
    matrixRules: [
      { includes: ["heatisland", "transport", "soil.png", "slr"], columns: 4, chunk: 4, title: "Reading Heat, Traffic, Soil, and Water" },
      { includes: ["soil remediation"], columns: 3, chunk: 3, title: "Soil Remediation Sequence" },
      { regex: "^ph[123]$", columns: 3, chunk: 3, title: "Succession in Three Phases" },
      { includes: ["img_85", "img_86"], columns: 3, chunk: 3, title: "Site Observation" },
    ],
    summary:
      "Trojan Forest is organized around decisions of visibility: what should be seen, what remains hidden, and what quietly transforms over time. Forest and wetland form a veil between Charlestown and the infrastructure of I-93.",
    overview: [
      "Situated in Charlestown, Trojan Forest combines an urban forest with a constructed wetland. The landscape functions as both veil and buffer.",
      "The forest introduces shade and expands public access. Beneath and alongside the highway, wetlands filter polluted water and support soil remediation.",
      "The intervention unfolds through phases responding to contaminated ground, flood risk, habitat, and public occupation.",
    ],
    conclusion: "Trojan Forest makes repair visible without exposing every process at once. Shade, wetland, succession, and remediation build a public landscape whose most important transformations continue quietly beneath and beyond the path.",
    sections: ["Decisions of Visibility", "Beneath I-93", "Reading Heat, Water, Soil, and Traffic", "Forest and Wetland", "A Transect of Repair", "Plant Communities", "Soil Remediation", "Succession in Four Phases", "The Forest as a Public Veil"],
  },
  {
    slug: "s-o-s",
    folder: "landscape/s-o-s",
    category: "landscape",
    title: "S + O + S",
    kicker: "Sea + Oyster + Shoreline",
    subtitle: "An aggregate industry for seafood waste in shoreline restoration",
    year: "2024",
    location: "Boston, Massachusetts",
    type: "Individual work · Harvard GSD Core III",
    theme: "dark",
    coverHint: "9",
    imageSequence: ["site2plan", "layout17", "diagram", "plan1", "720fed"],
    matrixRules: [
      { includes: ["diagram", "plan1"], columns: 2, chunk: 2, title: "Material Metabolism" },
    ],
    summary:
      "S + O + S turns discarded oyster shells into a shoreline-protection system. Oyster farming, restaurants, seasonal labor, aggregate production, and wave attenuation form a circular coastal metabolism.",
    overview: [
      "Boston produces oyster-shell waste while facing increasing coastal flood risk. The project treats these conditions as parts of the same material system.",
      "Discarded shells are processed into oyster-shell concrete for wave-attenuating elements. Rumney Marsh Landfill becomes the industrial stage for drying, crushing, mixing, casting, and distribution.",
      "The result is a distributed metabolism linking sea, oyster, industry, labor, and shoreline.",
    ],
    conclusion: "S + O + S reframes seafood waste as coastal infrastructure. By keeping material, labor, and seasonal ecologies within one visible cycle, shoreline protection becomes an industry of return rather than disposal.",
    sections: ["Sea + Oyster + Shoreline", "Waste Meets Flood Risk", "A Two-Site Metabolism", "Collecting the Shell", "Dry, Crush, Mix, Cast", "Seasonal Labor", "Rumney Marsh as Industrial Stage", "Attenuating the Wave", "Returning Material to Water"],
  },
  {
    slug: "the-invisible-sisyphus",
    folder: "interacation/invisible-sisyphus",
    category: "installation",
    title: "The Invisible Sisyphus",
    subtitle: "A kinetic installation about repetitive labor and invisible technological control",
    year: "2024",
    location: "Kirkland Gallery",
    type: "Individual project and thesis · group research",
    theme: "dark",
    coverHint: "场景 12",
    imageSequence: ["pattern design", "5", "7", "8", "9", "10", "11", "12", "13", "16", "18", "19", "20", "21", "22", "23", "24", "电机黑色", "不运动黑色", "运动黑色", "未标题", "未命名作品"],
    matrixRules: [
      { regex: "^\\d+$", columns: 4, chunk: 8, title: "Body-Machine Pattern Lexicon" },
      { includes: ["电机黑色", "不运动黑色", "运动黑色"], columns: 3, chunk: 3, title: "Programmed Motion States" },
      { includes: ["未标题", "未命名作品"], columns: 3, chunk: 6, title: "Fabrication and Assembly" },
    ],
    summary:
      "The Invisible Sisyphus is a kinetic satire of factory oppression and repetitive labor. Body fragments, machine symbols, and programmed motion create an object that cannot be identified as entirely human or entirely machine.",
    overview: [
      "The project connects Sisyphus's eternal punishment to factory workers who repeat the same actions while public attention remains fixed on the products they manufacture.",
      "Patterns derived from ribs, the cervical spine, pelvis, humerus, and technological components are repeated across the installation.",
      "An Arduino-controlled motor moves the installation through a continuous cycle. Repetition is embedded in the behavior of the object.",
    ],
    conclusion: "The installation gives repetitive labor a body while refusing to resolve that body as either human or machine. Its endless programmed cycle asks who is allowed to remain invisible when technological systems appear effortless.",
    sections: ["Useless Toil / Duplication of Labor", "The Myth of Sisyphus", "Factory Labor Made Invisible", "Do Artifacts Have Politics?", "Body-Machine Semiotics", "The Beauty and Violence of Repetition", "Programming the Cycle", "Fabrication and Testing", "A Machine That Cannot Stop", "Toward Technological Accountability"],
  },
  {
    slug: "the-cloud",
    folder: "interacation/the-cloud",
    category: "installation",
    title: "The Cloud",
    subtitle: "A spatial interaction about illness, death, and the fragile rhythm of breath",
    year: "2025",
    location: "Harvard Conflux",
    type: "Individual project",
    theme: "dark",
    coverHint: "场景 11",
    imageSequence: ["故事板4黑色", "故事板4", "1-psd", "1-png", "2", "3-2", "射灯"],
    matrixRules: [
      { includes: ["故事板"], columns: 2, chunk: 2, title: "Storyboard of Breath and Presence" },
      { regex: "^(1-|2$|3-2)", columns: 3, chunk: 4, title: "Cloud Form Studies" },
    ],
    summary:
      "The Cloud is a sensor-based spatial installation that explores how people confront illness and death. Airflow and changing light make a suspended cloud appear to breathe in response to the audience.",
    overview: [
      "The project grows from personal experience and asks how people might confront illness and death through a shared spatial encounter.",
      "Controlled airflow gives the cloud subtle movement, while changes in light make it appear to breathe weakly.",
      "Sensors connect the cloud to the audience. The work creates a temporary environment in which fear can be perceived and considered.",
    ],
    conclusion: "The Cloud does not represent illness as a fixed image. It creates a fragile shared rhythm in which breath, light, distance, and attention allow vulnerability to be sensed without being explained away.",
    sections: ["A Cloud That Breathes", "Illness as Spatial Experience", "From Image to Space", "Airflow and Weak Motion", "Light as a Pulse", "Sensing the Audience", "Sound, Scent, Vapor, and Memory", "A Time-Lapse of Presence"],
  },
  {
    slug: "three-body",
    folder: "interacation/three-body",
    category: "installation",
    title: "Three Body",
    subtitle: "An interactive textile environment that turns social forces into changing orbits",
    year: "2025",
    location: "Konstnärshuset, Stockholm",
    type: "Collaborative installation · Design team",
    theme: "dark",
    coverHint: "img_6717",
    imageSequence: ["img_6781", "img_6789", "img_6878", "img_6746", "img_7008"],
    matrixRules: [
      { includes: ["img_"], columns: 3, chunk: 6, title: "Installation and Visitor Archive" },
    ],
    editorialDisclosure: "AI-generated editorial interpretation · not project documentation",
    summary:
      "Three Body uses the unresolved scientific Three-Body Problem as a metaphor for social relationships. Visitor reflections are translated into a changing field of fabric, sound, and projected planetary trajectories.",
    overview: [
      "Presented by Harvard Conflux at Stora Galleriet in Konstnärshuset from March 20 to April 12, 2025, the work was developed by a collaborative team spanning design, software, machine learning, and physical integration. Frieda Hua Fan contributed as a member of the design team.",
      "The installation treats the Three-Body Problem as a mirror for an everyday social condition: exchanges between two people are always affected by other connected bodies, including those not physically present or consciously considered.",
      "Visitors answer the question “Who changes your orbit?” Sentiment analysis and a physics-based system translate those responses into projected planetary trajectories, ambient sound, and an evolving social network beneath a suspended textile enclosure.",
    ],
    conclusion: "Three Body turns an abstract scientific instability into a social room. No relationship is presented as isolated or fully predictable; each response enters a larger fabric of forces that the audience can inhabit, alter, and reconsider.",
    sections: ["The Third Body", "Science as Social Metaphor", "Who Changes Your Orbit?", "Bodies Not Present", "A Textile Enclosure", "Sentiment into Force", "Projected Trajectories", "Sound and Social Distance", "An Unstable Spatial System"],
  },
];

const figmaMediaOverrides = {
  haqimi: {
    coverHint: "product management-hua fan2_06",
    sequence: [
      "product management-hua fan2_06",
      "product management-hua fan2_07",
      "product management-hua fan2_08",
      "product management-hua fan2_09",
      "figma-ppt08-3",
      "figma-ppt08-2",
      "figma-ppt08-1",
      "figma-ppt09-1",
      "figma-ppt10-1",
      "figma-ppt12-1",
      "figma-ppt12-2",
    ],
    layout: "product-case",
    includeOpeningInGallery: true,
    accent: "#ff5214",
    heroCrop: { left: "-69.92%", top: "0%", width: "169.91%", height: "109.19%" },
    heroMetaTop: "578px",
    meta: [
      ["Role", "Product Management · Product Design"],
      ["Type", "Interactive Dining Product · 2026"],
    ],
    overview: [
      "Built from market research into China’s restaurant economy and social-media-led dining culture, the concept reframes a menu as an embodied guide. Gesture recognition, ambient scent and a character-like device make flavor easier to explore.",
    ],
    postConclusionIndices: [4, 5, 6, 7, 8, 9, 10],
    video: {
      src: "/media/haqimi/haqimi-pre-conclusion.mp4",
      label: "HaQimi driving scene video",
      figmaNodeId: "433:280",
    },
    postConclusionVideo: {
      src: "/media/haqimi/haqimi-post-conclusion.mp4",
      label: "HaQimi flavor album demo video",
      figmaNodeId: "433:281",
    },
  },
  "open-sport-imu": {
    coverHint: "01-cover",
    sequence: [
      "01-cover",
      "02 research｜用户研究与用户画像",
      "03 definition｜产品功能定位与演进",
      "04 model｜数据采集与模型选择",
    ],
    layout: "product-case",
    displayTitle: "Open Sport\nIMU",
    accent: "#7a33ff",
    heroCrop: { left: "-65.51%", top: "0.03%", width: "155.59%", height: "100%" },
    meta: [
      ["Role", "Smart Hardware Product Manager"],
      ["Focus", "User Research · Product Definition · Model Strategy · UX/UI"],
    ],
    overview: [
      "Open Sport connects user research, dual-device sensing, model evidence and low-burden feedback. It separates activity recognition from personal posture baselines, then makes every reminder traceable and recoverable.",
    ],
  },
  "brain-memory": {
    theme: "ivory",
    visibleMediaCount: 4,
    coverHint: "brain memory — reference-led v2",
    sequence: [
      "brain memory — reference-led v2",
      "from data to memory — reference-led v2",
      "capture layer — reference-led v2",
      "memory as interface — reference-led v2",
      "shared timeline — reference-led v2",
      "reflection — reference-led v2",
    ],
    layout: "product-case",
    displayTitle: "Brain\nMemory",
    includeOpeningInGallery: true,
    accent: "#7a33ff",
    heroCrop: { left: "0%", top: "0%", width: "100%", height: "100%" },
    meta: [
      ["Role", "Product Manager · UI / Interaction Designer"],
      ["Focus", "Research · Information Architecture · Prototype · Build"],
    ],
    overview: [
      "Brain Memory links computer-matched signals, personal albums, conversational retrieval and co-creation. Rather than treating search as recall alone, it rebuilds context through time, place, people and shared authorship.",
    ],
  },
  "human-head-model-system": {
    coverHint: "360_f_733437828_d2zk96lt0wnq2l1xk8vuktkzcqe2pols",
    sequence: [
      "360_f_733437828_d2zk96lt0wnq2l1xk8vuktkzcqe2pols",
      "03 — measurement workflow",
      "04 — parametric generation",
    ],
    layout: "product-case",
    displayTitle: "Human Head\nModel System",
    accent: "#7a33ff",
    heroCrop: { left: "-0.05%", top: "20.61%", width: "100%", height: "53.81%" },
    meta: [
      ["Role", "Product Manager · System Designer"],
      ["Focus", "Measurement Workflow · Parametric Modeling · Data Export"],
    ],
    overview: [
      "The system combines automatic landmark detection, manual annotation, dimensional measurement, parameter adjustment and OBJ export in one workspace. It makes model evidence visible while supporting repeatable database construction.",
    ],
  },
  "folded-courtyard": {
    coverHint: "00-cover",
    sequence: ["00-cover", "01-site-analysis", "02-site-analysis", "03-design-1", "04-courtyard", "05-axo", "06-design-2", "07-facade-1", "08-facade-2", "09-section"],
    layout: "folded-courtyard",
    labels: [
      "Cover",
      "Site Analysis I",
      "Site Analysis II",
      "Design Development I",
      "Courtyard",
      "Axonometric",
      "Design Development II",
      "Facade System I",
      "Facade System II",
      "Section",
    ],
  },
  "island-for-the-stateless": {
    coverHint: "water-level",
    sequence: [
      "water-level",
      "page-10(1)",
      "page-10(2)(2)",
      "page-10(2)(1)",
      "plan",
      "page-13",
      "page-12",
    ],
    layout: "island-for-the-stateless",
    displayTitle: "Island \nfor  the Stateless",
    postConclusionIndex: 6,
    labels: [
      "Opening Image",
      "Territory and Statelessness",
      "Island Drawings",
      "Island Panorama",
      "Island Project Spread",
      "Territory Study",
      "Closing Image",
    ],
    numbers: ["00", "01", "02", "03", "04", "05", "06"],
  },
  "countryside-introduction-planning": {
    sequence: ["page-19", "page-20"],
  },
  "trojan-forest": {
    coverHint: "page-21",
    sequence: ["page-21", "page-22", "page-23", "page-24", "page-25", "page-26"],
    layout: "trojan-forest",
  },
  "s-o-s": {
    sequence: ["page-27", "page-28", "page-29", "site2plan-2"],
  },
  "the-invisible-sisyphus": {
    sequence: ["portfolio-frieda fan (2)_03", "portfolio-frieda fan (2)_04", "portfolio-frieda fan (2)_05", "portfolio-frieda fan (2)_06", "portfolio-frieda fan (2)_07", "portfolio-frieda fan (2)_08", "portfolio-frieda fan (2)_09"],
    includeCoverInMedia: false,
    heroCrop: { left: "0.09%", top: "-12.36%", width: "184.91%", height: "118.89%" },
    includeHeroInIntro: true,
    statementVideo: {
      src: "/media/the-invisible-sisyphus/installation-the-invisible-sisyphus.mp4",
      label: "The Invisible Sisyphus installation",
      figmaNodeId: "363:276",
    },
    video: {
      src: "/media/the-invisible-sisyphus/myvideo-2.mp4",
      label: "The Invisible Sisyphus in motion",
      figmaNodeId: "363:278",
    },
  },
  "the-cloud": {
    sequence: ["portfolio-frieda fan (2)_10", "portfolio-frieda fan (2)_11", "portfolio-frieda fan (2)_12", "portfolio-frieda fan (2)_13"],
  },
  "three-body": {
    sequence: ["figma-three-body-02", "figma-three-body-03"],
    includeCoverInMedia: false,
    heroHint: "figma-three-body-03",
    includeOpeningInGallery: true,
    disableEditorialCover: true,
    includeHeroInIntro: true,
    layout: "full-width",
    statementVideo: {
      src: "/media/three-body/three-body-statement.mp4",
      label: "Three Body installation",
      figmaNodeId: "448:288",
    },
  },
};

export const projects = rawProjects.map((project) => {
  const override = figmaMediaOverrides[project.slug];
  const media = imagesFor(
    project.folder,
    override?.coverHint ?? project.coverHint,
    override?.sequence ?? project.imageSequence,
    {
      strictSequence: Boolean(override),
      includeCoverInMedia: override?.includeCoverInMedia ?? true,
    },
  );
  const synchronizedMedia = override?.visibleMediaCount ? media.slice(0, override.visibleMediaCount) : media;
  const images = synchronizedMedia.map((item) => item.url);
  return {
    ...project,
    theme: override?.theme ?? project.theme,
    editorialDisclosure: project.editorialDisclosure,
    matrixRules: override ? [] : project.matrixRules,
    figmaMediaSequence: Boolean(override),
    figmaMediaLayout: override?.layout ?? (override ? "full-width" : null),
    figmaMediaLabels: override?.labels ?? null,
    figmaMediaNumbers: override?.numbers ?? null,
    figmaDisplayTitle: override?.displayTitle ?? null,
    figmaAccent: override?.accent ?? null,
    figmaHeroCrop: override?.heroCrop ?? null,
    figmaHeroMetaTop: override?.heroMetaTop ?? null,
    figmaMeta: override?.meta ?? null,
    figmaPostConclusionIndex: override?.postConclusionIndex ?? null,
    figmaPostConclusionIndices: override?.postConclusionIndices ?? null,
    figmaIncludeOpeningInGallery: override?.includeOpeningInGallery ?? false,
    figmaIncludeHeroInIntro: override?.includeHeroInIntro ?? false,
    figmaStatementVideo: override?.statementVideo ?? null,
    figmaVideo: override?.video ?? null,
    figmaPostConclusionVideo: override?.postConclusionVideo ?? null,
    overview: override?.overview ?? project.overview,
    media: synchronizedMedia,
    images,
    coverImage: (override?.disableEditorialCover ? null : project.editorialCover)
      ?? synchronizedMedia.find((item) => item.stem === override?.heroHint)?.url
      ?? images[0],
  };
});

export const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

export const projectsByCategory = Object.fromEntries(
  Object.keys(categories).map((category) => [
    category,
    projects
      .filter((project) => project.category === category)
      .sort((a, b) => {
        const productOrder = ["open-sport-imu", "haqimi", "brain-memory", "human-head-model-system"];
        if (category !== "product-management") return 0;
        return productOrder.indexOf(a.slug) - productOrder.indexOf(b.slug);
      }),
  ]),
);
