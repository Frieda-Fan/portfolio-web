import { chromium } from "playwright";

const cases = [
  {
    route: "/projects/haqimi",
    expectedImages: 12,
    expectedVideos: [
      { nodeId: "433:280", source: "/media/haqimi/haqimi-pre-conclusion.mp4" },
      { nodeId: "433:281", source: "/media/haqimi/haqimi-post-conclusion.mp4" },
    ],
  },
  {
    route: "/projects/the-invisible-sisyphus",
    expectedImages: 8,
    expectedVideos: [
      { nodeId: "363:276", source: "/media/the-invisible-sisyphus/installation-the-invisible-sisyphus.mp4" },
      { nodeId: "363:278", source: "/media/the-invisible-sisyphus/myvideo-2.mp4" },
    ],
  },
];

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

const results = [];
for (const testCase of cases) {
  const response = await page.goto(`http://127.0.0.1:4174${testCase.route}`, { waitUntil: "networkidle" });
  const imageCount = await page.locator("main.project-page img").count();
  const videoCount = await page.locator("main.project-page video").count();
  const videos = [];

  for (const expected of testCase.expectedVideos) {
    const figure = page.locator(`[data-figma-node-id="${expected.nodeId}"]`);
    const video = figure.locator("video");
    if (await video.count() !== 1) {
      videos.push({ ...expected, passed: false, reason: "missing-video-element" });
      continue;
    }

    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await video.evaluate(async (node) => {
      node.muted = true;
      try { await node.play(); } catch {}
    });
    const before = await video.evaluate((node) => ({
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
      error: node.error ? { code: node.error.code, message: node.error.message } : null,
      currentSrc: node.currentSrc,
      videoWidth: node.videoWidth,
      videoHeight: node.videoHeight,
    }));
    await page.waitForTimeout(1600);
    const after = await video.evaluate((node) => ({
      currentTime: node.currentTime,
      readyState: node.readyState,
      paused: node.paused,
      error: node.error ? { code: node.error.code, message: node.error.message } : null,
    }));
    const sourceResponse = await page.evaluate(async (source) => {
      const result = await fetch(source, { headers: { Range: "bytes=0-1023" } });
      return {
        status: result.status,
        contentType: result.headers.get("content-type"),
        contentRange: result.headers.get("content-range"),
      };
    }, before.currentSrc);
    const passed = before.readyState >= 2
      && before.videoWidth > 0
      && before.videoHeight > 0
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
      && sourceResponse.contentType === "video/mp4";
    videos.push({ ...expected, passed, before, after, sourceResponse });
  }

  results.push({
    route: testCase.route,
    status: response?.status(),
    imageCount,
    expectedImages: testCase.expectedImages,
    videoCount,
    expectedVideoCount: testCase.expectedVideos.length,
    videos,
    passed: response?.status() === 200
      && imageCount === testCase.expectedImages
      && videoCount === testCase.expectedVideos.length
      && videos.every((video) => video.passed),
  });
}

await browser.close();
const passed = results.every((result) => result.passed) && errors.length === 0;
console.log(JSON.stringify({ passed, errors, results }, null, 2));
if (!passed) process.exitCode = 1;
