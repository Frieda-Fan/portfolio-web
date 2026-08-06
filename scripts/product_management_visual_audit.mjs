import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:4174";
const output = path.resolve("tmp/browser-audit");
await fs.mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const results = [];

async function audit(name, route, viewport, scrollY = 0) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(route === "/product-management" ? 2500 : 900);
  if (scrollY) {
    await page.evaluate((value) => window.scrollTo(0, value), scrollY);
    await page.waitForTimeout(350);
  }
  const screenshotPath = path.join(output, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  const info = await page.locator("main").evaluate((main) => ({
    mainClass: main.className,
    images: document.images.length,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
  }));
  results.push({ name, route, status: response?.status(), viewport, screenshotPath, errors, ...info });
  await page.close();
}

await audit("desktop-product-management-latest", "/product-management", { width: 1440, height: 1000 });
await audit("desktop-open-sport-latest", "/projects/open-sport-imu", { width: 1440, height: 1000 });
await audit("desktop-open-sport-gallery-latest", "/projects/open-sport-imu", { width: 1440, height: 1000 }, 1760);
await audit("desktop-haqimi-latest", "/projects/haqimi", { width: 1440, height: 1000 });
await audit("desktop-haqimi-gallery-latest", "/projects/haqimi", { width: 1440, height: 1000 }, 1760);
await audit("desktop-brain-memory-latest", "/projects/brain-memory", { width: 1440, height: 1000 });
await audit("desktop-human-head-latest", "/projects/human-head-model-system", { width: 1440, height: 1000 });
await audit("mobile-product-management-latest", "/product-management", { width: 390, height: 844 });
await audit("mobile-open-sport-latest", "/projects/open-sport-imu", { width: 390, height: 844 });

await browser.close();
console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.status !== 200 || result.errors.length || result.brokenImages || result.horizontalOverflow)) process.exitCode = 1;
