import { chromium } from "playwright";

const routes = ["open-sport-imu", "haqimi", "three-body"];
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

const results = [];
for (const slug of routes) {
  const response = await page.goto(`http://127.0.0.1:4174/projects/${slug}`, { waitUntil: "networkidle" });
  const images = page.locator("main.project-page img");
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(300);
  const facts = await page.locator("main.project-page").evaluate((main) => {
    const rect = (node) => {
      if (!node) return null;
      const box = node.getBoundingClientRect();
      return {
        x: Number((box.x + scrollX).toFixed(2)),
        y: Number((box.y + scrollY).toFixed(2)),
        width: Number(box.width.toFixed(2)),
        height: Number(box.height.toFixed(2)),
      };
    };
    const describe = (selector) => [...main.querySelectorAll(selector)].map((node) => ({
      rect: rect(node),
      nodeId: node.dataset.figmaNodeId ?? null,
      source: node.querySelector("img,video")?.currentSrc ?? node.querySelector("img,video")?.src ?? null,
    }));
    return {
      scrollWidth: document.documentElement.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      hero: rect(main.querySelector(".project-hero")),
      intro: rect(main.querySelector(".project-intro")),
      gallery: rect(main.querySelector(".project-gallery")),
      galleryMedia: describe(".project-gallery > .media-chapter"),
      videos: describe(".project-video"),
      conclusion: rect(main.querySelector(".project-conclusion")),
      postConclusion: rect(main.querySelector(".project-post-conclusion")),
      postConclusionMedia: describe(".project-post-conclusion > figure"),
      footer: rect(main.querySelector(".project-footer")),
      brokenImages: [...main.querySelectorAll("img")].filter((image) => !image.complete || image.naturalWidth === 0).length,
    };
  });
  results.push({ slug, status: response?.status(), ...facts });
}

await browser.close();
console.log(JSON.stringify({ errors, results }, null, 2));
if (errors.length || results.some((result) => result.status !== 200 || result.scrollWidth !== 1440 || result.brokenImages)) process.exitCode = 1;
