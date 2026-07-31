import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});

const checks = [];
const cases = [
  { route: "/?capture=1", expectedClass: "home", expectedImages: 1 },
  { route: "/installation?capture=1&leaf=2", expectedClass: "category-page", expectedImages: 3, text: "Three Body" },
  { route: "/projects/folded-courtyard?capture=1", expectedClass: "project-page theme-ivory", expectedImages: 79 },
  { route: "/projects/three-body?capture=1", expectedClass: "project-page theme-dark", expectedImages: 7, text: "AI-generated editorial interpretation" },
];

for (const testCase of cases) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(`http://127.0.0.1:4174${testCase.route}`, {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => ({
    mainClass: document.querySelector("main")?.className ?? "",
    soundGate: Boolean(document.querySelector(".sound-gate")),
    ritual: Boolean(document.querySelector(".category-ritual")),
    imageCount: document.images.length,
    brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length,
    bodyText: document.body.innerText,
  }));

  const textFound = !testCase.text || state.bodyText.toLowerCase().includes(testCase.text.toLowerCase());
  const { bodyText, ...reportedState } = state;
  checks.push({
    route: testCase.route,
    status: response?.status(),
    ...reportedState,
    textFound,
    errors,
    passed:
      response?.status() === 200
      && state.mainClass === testCase.expectedClass
      && !state.soundGate
      && !state.ritual
      && state.imageCount === testCase.expectedImages
      && state.brokenImages === 0
      && textFound
      && errors.length === 0,
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(checks, null, 2));
if (checks.some((check) => !check.passed)) process.exitCode = 1;
