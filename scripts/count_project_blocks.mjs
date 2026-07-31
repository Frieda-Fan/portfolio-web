import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const routes = process.argv.slice(2);
const results = [];
for (const route of routes) {
  await page.goto(`http://127.0.0.1:4174${route}?capture=1`, { waitUntil: "networkidle" });
  results.push({ route, blocks: await page.locator(".media-block").count(), images: await page.locator(".project-gallery img").count() });
}
await browser.close();
console.log(JSON.stringify(results));
