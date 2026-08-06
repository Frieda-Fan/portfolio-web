import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const url = "http://127.0.0.1:4174/projects/the-invisible-sisyphus";
const output = "portfolio/validation/invisible-sisyphus-video.png";
const openingOutput = "portfolio/validation/invisible-sisyphus-opening.png";
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

const response = await page.goto(url, { waitUntil: "networkidle" });
await mkdir("portfolio/validation", { recursive: true });
await page.screenshot({ path: openingOutput });
const heroFacts = await page.locator(".project-hero").evaluate((hero) => {
  const media = hero.querySelector(".project-hero__media");
  const image = media?.querySelector("img");
  const rect = (node) => {
    const box = node?.getBoundingClientRect();
    return box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null;
  };
  return {
    hero: rect(hero),
    media: rect(media),
    image: rect(image),
    repeatedStatementImage: document.querySelectorAll(".project-intro__image img").length,
  };
});
const video = page.locator("video[aria-label='The Invisible Sisyphus in motion']");
const count = await video.count();
if (count === 1) await video.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

const before = count === 1 ? await video.evaluate((node) => ({
  currentTime: node.currentTime,
  duration: node.duration,
  readyState: node.readyState,
  networkState: node.networkState,
  paused: node.paused,
  muted: node.muted,
  autoplay: node.autoplay,
  loop: node.loop,
  playsInline: node.playsInline,
  controls: node.controls,
  error: node.error?.message ?? null,
  currentSrc: node.currentSrc,
})) : null;
await page.waitForTimeout(1800);
const after = count === 1 ? await video.evaluate((node) => ({
  currentTime: node.currentTime,
  readyState: node.readyState,
  paused: node.paused,
  error: node.error?.message ?? null,
})) : null;
const sourceResponse = count === 1 ? await page.evaluate(async (source) => {
  const result = await fetch(source, { headers: { Range: "bytes=0-1023" } });
  return {
    status: result.status,
    contentType: result.headers.get("content-type"),
    contentRange: result.headers.get("content-range"),
  };
}, before.currentSrc) : null;

if (count === 1) await video.screenshot({ path: output });
const passed = response?.status() === 200
  && count === 1
  && Math.abs(heroFacts.hero.width - 1440) < 1
  && Math.abs(heroFacts.hero.height - 1000) < 1
  && Math.abs(heroFacts.media.x - 629.83) < 1
  && Math.abs(heroFacts.media.y - 112) < 1
  && Math.abs(heroFacts.media.width - 778.16) < 1
  && Math.abs(heroFacts.media.height - 856) < 1
  && Math.abs(heroFacts.image.x - 630.53) < 1
  && Math.abs(heroFacts.image.y - 6.2) < 1
  && Math.abs(heroFacts.image.width - 1438.9) < 2
  && Math.abs(heroFacts.image.height - 1017.7) < 2
  && heroFacts.repeatedStatementImage === 1
  && before.readyState >= 2
  && before.muted
  && before.autoplay
  && before.loop
  && before.playsInline
  && before.controls
  && !before.paused
  && !before.error
  && !after.paused
  && !after.error
  && after.currentTime > before.currentTime + 0.5
  && [200, 206].includes(sourceResponse.status)
  && sourceResponse.contentType === "video/mp4"
  && errors.length === 0;

console.log(JSON.stringify({ passed, status: response?.status(), count, heroFacts, before, after, sourceResponse, errors, screenshots: [openingOutput, output] }, null, 2));
await browser.close();
if (!passed) process.exitCode = 1;
