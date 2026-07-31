import { chromium } from "playwright";

const projects = [
  ["haqimi", 5],
  ["open-sport-imu", 6],
  ["brain-memory", 7],
  ["human-head-model-system", 4],
  ["folded-courtyard", 10],
  ["island-for-the-stateless", 7],
  ["infinitas-hotel", 14],
  ["countryside-introduction-planning", 3],
  ["trojan-forest", 6],
  ["s-o-s", 5],
  ["the-invisible-sisyphus", 8],
  ["the-cloud", 5],
  ["anti-wastecolonialism", 6],
  ["three-body", 4],
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("http://127.0.0.1:4174/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Enter muted" }).click();
await page.waitForTimeout(5300);

const results = [];
for (const [slug, expectedImages] of projects) {
  await page.evaluate((path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, `/projects/${slug}`);
  await page.waitForTimeout(650);

  const facts = await page.locator("main.project-page").evaluate((main) => ({
    title: main.querySelector("h1")?.textContent.trim() ?? "",
    metadataRows: main.querySelectorAll(".project-hero dl > div").length,
    statement: main.querySelector(".project-intro h2")?.textContent.trim() ?? "",
    overviewParagraphs: main.querySelectorAll(".project-intro__body p").length,
    conclusion: main.querySelector(".project-conclusion h2")?.textContent.trim() ?? "",
    footerLinks: main.querySelectorAll(".project-footer a").length,
    images: main.querySelectorAll("img").length,
    placeholderText: /lorem|placeholder|to be confirmed|\btbd\b/i.test(main.textContent),
  }));

  const passed = facts.title.length > 0
    && facts.metadataRows === 3
    && facts.statement.length > 60
    && facts.overviewParagraphs >= 3
    && facts.conclusion.length > 80
    && facts.footerLinks === 3
    && facts.images === expectedImages
    && facts.placeholderText === false;
  results.push({ slug, passed, expectedImages, ...facts });
}

await browser.close();
const failed = results.filter((result) => !result.passed);
console.log(JSON.stringify({ passed: results.length - failed.length, total: results.length, errors, failed, results }, null, 2));
if (failed.length || errors.length) process.exitCode = 1;
