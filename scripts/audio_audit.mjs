import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
const errors = [];
const voiceResponses = [];

page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.url().includes("/audio/voice/")) {
    voiceResponses.push({ url: response.url(), status: response.status() });
  }
});

await page.goto("http://127.0.0.1:4174/", { waitUntil: "networkidle" });
const enterWithSound = page.getByRole("button", { name: "Enter with sound" });
const enterMuted = page.getByRole("button", { name: "Enter muted" });
if ((await enterMuted.count()) !== 1) throw new Error("Enter muted button missing");
await enterMuted.click();
await page.waitForTimeout(5300);

const architecture = page.locator('.category-index a[href="/architecture"]');
if ((await architecture.count()) !== 1) throw new Error("Architecture category link is not unique");
await architecture.click();
await page.waitForTimeout(2200);

const toggle = page.locator(".sound-toggle");
if ((await toggle.count()) !== 1) throw new Error("Sound toggle missing");
const label = await toggle.innerText();
const toggleDisabled = await toggle.isDisabled();

const result = {
  path: new URL(page.url()).pathname,
  enterWithSoundCount: await enterWithSound.count(),
  label,
  toggleDisabled,
  voiceResponses,
  errors,
  passed:
    new URL(page.url()).pathname === "/architecture"
    && await enterWithSound.count() === 0
    && label.toLowerCase().includes("sound off")
    && toggleDisabled
    && voiceResponses.length === 0
    && errors.length === 0,
};

await browser.close();
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
