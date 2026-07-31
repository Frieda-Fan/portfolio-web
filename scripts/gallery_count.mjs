import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const routes = ["/projects/folded-courtyard", "/projects/trojan-forest", "/projects/the-invisible-sisyphus"];
const results = [];
for (const route of routes) {
  await page.goto(`http://127.0.0.1:4174${route}?capture=1`, { waitUntil: "domcontentloaded", timeout: 120_000 });
  await page.waitForSelector(".project-gallery");
  results.push({ route, chapters: await page.locator(".project-gallery > .media-block").count() });
}
await browser.close();
console.log(JSON.stringify(results));
