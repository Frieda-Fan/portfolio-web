import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
const externalRequests = [];

page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => {
  const url = new URL(request.url());
  if (url.protocol.startsWith("http") && url.hostname !== "127.0.0.1") {
    externalRequests.push(request.url());
  }
});

await page.goto("http://127.0.0.1:4174/", { waitUntil: "networkidle" });
const mutedEntry = page.getByRole("button", { name: "Enter muted" });
if ((await mutedEntry.count()) !== 1) throw new Error("Enter muted button missing");
await mutedEntry.click();
await page.waitForTimeout(5300);

const fontState = await page.evaluate(async () => {
  await document.fonts.ready;
  const requiredFamilies = ["Bodoni Moda", "IBM Plex Mono", "IBM Plex Sans", "Unbounded"];
  const loadedFaces = [...document.fonts]
    .filter((face) => face.status === "loaded")
    .map((face) => face.family.replaceAll('"', ""));

  return Object.fromEntries(
    requiredFamilies.map((family) => [family, loadedFaces.includes(family)]),
  );
});

const result = {
  path: new URL(page.url()).pathname,
  fontState,
  externalRequests: [...new Set(externalRequests)],
  errors,
};
result.passed =
  result.path === "/"
  && Object.values(fontState).every(Boolean)
  && result.externalRequests.length === 0
  && result.errors.length === 0;

await browser.close();
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
