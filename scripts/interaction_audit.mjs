import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseURL = "http://127.0.0.1:4174";
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

await page.goto(`${baseURL}/projects/the-cloud`, { waitUntil: "networkidle" });
const projectDirectHasNoGate = await page.locator(".sound-gate").count() === 0;
const projectDirectHasNoEntrance = await page.locator(".home-entrance").count() === 0;
const directRoutePreserved = new URL(page.url()).pathname === "/projects/the-cloud"
  && await page.locator("main.project-page").isVisible();

await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
const gateVisibleOnHome = await page.getByRole("button", { name: "Enter muted" }).isVisible();
await page.getByRole("button", { name: "Enter muted" }).click();
const entranceVisibleOnHome = await page.locator(".home-entrance").isVisible();
await page.waitForTimeout(3400);
const homeRevealed = await page.locator("main.home").isVisible()
  && await page.locator(".home-entrance").count() === 0
  && await page.locator(".category-index").getByText("Product Management", { exact: true }).isVisible()
  && await page.locator(".category-index").getByText("Architecture", { exact: true }).isVisible()
  && await page.locator(".category-index").getByText("Landscape", { exact: true }).isVisible()
  && await page.locator(".category-index").getByText("Installation", { exact: true }).isVisible();

await page.locator('.category-index a[href="/product-management"]').click();
await page.waitForTimeout(2300);
await page.locator('.wordmark[href="/"]').click();
await page.waitForTimeout(120);
const entranceReplaysOnHomeReturn = await page.locator(".home-entrance").isVisible();
await page.waitForTimeout(3400);
await page.locator('.category-index a[href="/product-management"]').click();
await page.waitForTimeout(2300);

const productTitles = await page.locator(".project-sigil strong").allTextContents();
const productIndexVisible = productTitles.join("|") ===
  "Open Sport IMU|HaQimi|Brain Memory|Human Head Model System";

await page.getByText("Open Sport IMU", { exact: true }).click();
await page.waitForTimeout(700);
const productDirectHasNoEntrance = await page.locator(".home-entrance").count() === 0
  && await page.locator("main.project-page--open-sport-imu").isVisible();
await page.locator('.back-link[href="/product-management"]').click();
await page.waitForTimeout(2300);
const productIndexRestored = await page.getByText("Open Sport IMU", { exact: true }).isVisible();

const result = {
  projectDirectHasNoGate,
  projectDirectHasNoEntrance,
  directRoutePreserved,
  gateVisibleOnHome,
  entranceVisibleOnHome,
  homeRevealed,
  entranceReplaysOnHomeReturn,
  productIndexVisible,
  productDirectHasNoEntrance,
  productIndexRestored,
  errors,
};
result.passed = Object.entries(result)
  .filter(([key]) => key !== "passed" && key !== "errors")
  .every(([, value]) => value === true)
  && errors.length === 0;

await browser.close();
await fs.mkdir("tmp/browser-audit", { recursive: true });
await fs.writeFile("tmp/browser-audit/interaction-audit.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
