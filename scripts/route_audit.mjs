import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:4174";
const routes = [
  { path: "/", main: "home", images: 1, home: true },
  { path: "/about", main: "about-page", images: 0 },
  { path: "/product-management", main: "category-page", images: 4, category: true },
  { path: "/architecture", main: "category-page", images: 4, category: true },
  { path: "/landscape", main: "category-page", images: 2, category: true },
  { path: "/installation", main: "category-page", images: 3, category: true },
  { path: "/projects/haqimi", main: "project-page", images: 5 },
  { path: "/projects/open-sport-imu", main: "project-page", images: 6 },
  { path: "/projects/brain-memory", main: "project-page", images: 7 },
  { path: "/projects/human-head-model-system", main: "project-page", images: 4 },
  { path: "/projects/folded-courtyard", main: "project-page", images: 10 },
  { path: "/projects/island-for-the-stateless", main: "project-page", images: 7 },
  { path: "/projects/infinitas-hotel", main: "project-page", images: 14 },
  { path: "/projects/countryside-introduction-planning", main: "project-page", images: 3 },
  { path: "/projects/trojan-forest", main: "project-page", images: 6 },
  { path: "/projects/s-o-s", main: "project-page", images: 5 },
  { path: "/projects/the-invisible-sisyphus", main: "project-page", images: 8 },
  { path: "/projects/the-cloud", main: "project-page", images: 5 },
  { path: "/projects/anti-wastecolonialism", main: "project-page", images: 6 },
  { path: "/projects/three-body", main: "project-page", images: 4 },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});

const results = [];
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(`${baseURL}${route.path}`, { waitUntil: "networkidle" });
  const enterMuted = page.getByRole("button", { name: "Enter muted" });
  if ((await enterMuted.count()) === 1) {
    await enterMuted.click();
    await page.waitForTimeout(5300);
  }
  if (route.category) {
    await page.waitForTimeout(2300);
  } else if (!route.home) {
    await page.waitForTimeout(450);
  }

  const main = page.locator("main");
  const mainCount = await main.count();
  const facts = mainCount === 1
    ? await main.evaluate((node) => ({
        mainClass: node.className,
        images: document.images.length,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      }))
    : { mainClass: "", images: 0, brokenImages: -1, horizontalOverflow: true };

  const passed =
    response?.status() === 200
    && mainCount === 1
    && facts.mainClass.includes(route.main)
    && facts.images === route.images
    && facts.brokenImages === 0
    && facts.horizontalOverflow === false
    && errors.length === 0;

  results.push({
    path: route.path,
    passed,
    status: response?.status(),
    expectedMain: route.main,
    expectedImages: route.images,
    errors,
    ...facts,
  });
  await page.close();
}

await browser.close();

const failed = results.filter((result) => !result.passed);
console.log(JSON.stringify({ passed: results.length - failed.length, total: results.length, failed, results }, null, 2));
if (failed.length) process.exitCode = 1;
