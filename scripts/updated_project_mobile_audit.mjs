import { chromium } from "playwright";

const expected = new Map([
  ["open-sport-imu", { images: 4, videos: 0 }],
  ["haqimi", { images: 12, videos: 2 }],
  ["three-body", { images: 3, videos: 0 }],
]);
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

const results = [];
for (const [slug, counts] of expected) {
  const response = await page.goto(`http://127.0.0.1:4174/projects/${slug}`, { waitUntil: "networkidle" });
  const images = page.locator("main.project-page img");
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
  }
  const facts = await page.locator("main.project-page").evaluate((main) => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: innerWidth,
    pageHeight: document.documentElement.scrollHeight,
    images: main.querySelectorAll("img").length,
    videos: main.querySelectorAll("video").length,
    brokenImages: [...main.querySelectorAll("img")].filter((image) => !image.complete || image.naturalWidth === 0).length,
    fixedDesktopHeight: getComputedStyle(main).minHeight === "6851px",
  }));
  results.push({
    slug,
    status: response?.status(),
    ...facts,
    passed: response?.status() === 200
      && facts.scrollWidth === facts.viewportWidth
      && facts.images === counts.images
      && facts.videos === counts.videos
      && facts.brokenImages === 0
      && !facts.fixedDesktopHeight,
  });
}

await browser.close();
const passed = results.every((result) => result.passed) && errors.length === 0;
console.log(JSON.stringify({ passed, errors, results }, null, 2));
if (!passed) process.exitCode = 1;
