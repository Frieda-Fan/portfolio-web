import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const output = path.resolve("tmp/browser-audit");
await fs.mkdir(output, { recursive: true });

async function capture(route, name, matrixIndex = 0, viewport = { width: 1440, height: 1000 }) {
  const page = await browser.newPage({ viewport });
  await page.goto(`http://127.0.0.1:4174${route}?capture=1`, { waitUntil: "networkidle" });
  const matrix = page.locator(".media-matrix").nth(matrixIndex);
  await matrix.scrollIntoViewIfNeeded();
  await page.waitForFunction((index) => {
    const target = document.querySelectorAll(".media-matrix")[index];
    return target && [...target.querySelectorAll("img")].every((image) => image.complete && image.naturalWidth > 0);
  }, matrixIndex);
  await matrix.screenshot({ path: path.join(output, `${name}.png`) });
  const result = await matrix.evaluate((node) => ({
    title: node.querySelector(".media-caption strong")?.textContent ?? "",
    items: node.querySelectorAll(".media-matrix__item").length,
    columns: getComputedStyle(node.querySelector(".media-matrix__grid")).gridTemplateColumns,
    width: Math.round(node.getBoundingClientRect().width),
    pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    brokenImages: [...node.querySelectorAll("img")].filter((image) => image.complete && image.naturalWidth === 0).length,
  }));
  await page.close();
  return { route, name, matrixIndex, ...result };
}

const results = [];
results.push(await capture("/projects/folded-courtyard", "matrix-folded-material", 0));
results.push(await capture("/projects/folded-courtyard", "matrix-folded-model", 2));
results.push(await capture("/projects/the-invisible-sisyphus", "matrix-sisyphus-pattern", 0));
results.push(await capture("/projects/folded-courtyard", "matrix-folded-mobile", 0, { width: 390, height: 844 }));

await browser.close();
await fs.writeFile(path.join(output, "matrix-results.json"), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
