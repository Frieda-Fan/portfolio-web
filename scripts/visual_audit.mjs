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

async function audit(name, route, viewport, waitMs = 900, scrollY = 0) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  if (route === "/") {
    await page.screenshot({
      path: path.join(output, `${name}-sound-gate.png`),
      fullPage: false,
    });
    const enterMuted = page.getByRole("button", { name: "Enter muted" });
    if ((await enterMuted.count()) === 1) await enterMuted.click();
    await page.waitForTimeout(2050);
    await page.screenshot({
      path: path.join(output, `${name}-opening.png`),
      fullPage: false,
    });
    await page.waitForTimeout(1350);
  } else if (await page.locator(".sound-gate, .home-entrance").count()) {
    throw new Error(`Non-home route unexpectedly showed a home entrance for ${route}`);
  }
  await page.waitForTimeout(waitMs);
  if (scrollY > 0) {
    await page.evaluate((value) => window.scrollTo(0, value), scrollY);
    await page.waitForTimeout(350);
  }
  const screenshotPath = path.join(output, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const main = page.locator("main");
  const hasMain = (await main.count()) === 1;
  const info = hasMain
    ? await main.evaluate((node) => ({
        title: document.title,
        mainClass: node.className,
        bodyText: "",
        links: document.querySelectorAll("a[href]").length,
        images: document.querySelectorAll("img").length,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
    : {
        title: await page.title(),
        mainClass: null,
        bodyText: (await page.locator("body").innerText()).slice(0, 500),
        links: await page.locator("a[href]").count(),
        images: await page.locator("img").count(),
        brokenImages: null,
        horizontalOverflow: null,
        scrollWidth: null,
        clientWidth: null,
      };

  results.push({
    name,
    route,
    status: response?.status(),
    viewport,
    screenshotPath,
    errors,
    ...info,
  });
  await page.close();
}

await audit("desktop-home", "/", { width: 1440, height: 1000 }, 300);
await audit("desktop-about", "/about", { width: 1440, height: 1000 });
await audit("desktop-product-management", "/product-management", { width: 1440, height: 1000 }, 2500);
await audit("desktop-haqimi", "/projects/haqimi", { width: 1440, height: 1000 });
await audit("desktop-haqimi-gallery", "/projects/haqimi", { width: 1440, height: 1000 }, 900, 1760);
await audit("desktop-open-sport", "/projects/open-sport-imu", { width: 1440, height: 1000 });
await audit("desktop-open-sport-gallery", "/projects/open-sport-imu", { width: 1440, height: 1000 }, 900, 1760);
await audit("desktop-brain-memory", "/projects/brain-memory", { width: 1440, height: 1000 });
await audit("desktop-brain-memory-gallery", "/projects/brain-memory", { width: 1440, height: 1000 }, 900, 1760);
await audit("desktop-human-head-model-system", "/projects/human-head-model-system", { width: 1440, height: 1000 });
await audit("desktop-architecture", "/architecture", { width: 1440, height: 1000 }, 2500);
await audit("desktop-landscape", "/landscape", { width: 1440, height: 1000 }, 2500);
await audit("desktop-installation", "/installation", { width: 1440, height: 1000 }, 2500);
await audit("desktop-hotel", "/projects/infinitas-hotel", { width: 1440, height: 1000 });
await audit("desktop-folded", "/projects/folded-courtyard", { width: 1440, height: 1000 });
await audit("desktop-folded-media", "/projects/folded-courtyard", { width: 1440, height: 1000 }, 900, 2380);
await audit("desktop-island", "/projects/island-for-the-stateless", { width: 1440, height: 1000 });
await audit("desktop-island-gallery-a", "/projects/island-for-the-stateless", { width: 1440, height: 1000 }, 900, 2380);
await audit("desktop-island-gallery-b", "/projects/island-for-the-stateless", { width: 1440, height: 1000 }, 900, 4300);
await audit("desktop-island-closing", "/projects/island-for-the-stateless", { width: 1440, height: 1000 }, 900, 7900);
await audit("desktop-trojan", "/projects/trojan-forest", { width: 1440, height: 1000 });
await audit("desktop-trojan-gallery-a", "/projects/trojan-forest", { width: 1440, height: 1000 }, 900, 2300);
await audit("desktop-trojan-gallery-b", "/projects/trojan-forest", { width: 1440, height: 1000 }, 900, 4300);
await audit("desktop-trojan-closing", "/projects/trojan-forest", { width: 1440, height: 1000 }, 900, 7000);
await audit("desktop-three-body", "/projects/three-body", { width: 1440, height: 1000 });
await audit("mobile-home", "/", { width: 390, height: 844 }, 300);
await audit("mobile-product-management", "/product-management", { width: 390, height: 844 }, 2500);
await audit("mobile-haqimi", "/projects/haqimi", { width: 390, height: 844 });
await audit("mobile-brain-memory", "/projects/brain-memory", { width: 390, height: 844 });
await audit("mobile-human-head-model-system", "/projects/human-head-model-system", { width: 390, height: 844 });
await audit("mobile-about", "/about", { width: 390, height: 844 });
await audit("mobile-installation", "/installation", { width: 390, height: 844 }, 2500);
await audit("mobile-cloud", "/projects/the-cloud", { width: 390, height: 844 });

await browser.close();
console.log(JSON.stringify(results, null, 2));
