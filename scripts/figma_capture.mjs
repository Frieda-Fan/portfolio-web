import { chromium } from "playwright";

const [route = "/", captureId, widthArg = "1440", heightArg = "1000"] = process.argv.slice(2);
if (!captureId) throw new Error("Usage: node scripts/figma_capture.mjs <route> <captureId>");

const endpoint = encodeURIComponent(`https://mcp.figma.com/mcp/capture/${captureId}/submit?bindVariables=true`);
const separator = route.includes("?") ? "&" : "?";
const url = `http://localhost:4174${route}${separator}capture=1#figmacapture=${captureId}&figmaendpoint=${endpoint}&figmadelay=1800`;

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const page = await browser.newPage({ viewport: { width: Number(widthArg), height: Number(heightArg) } });
await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
await page.waitForTimeout(Number(process.env.FIGMA_CAPTURE_WAIT_MS ?? 60_000));
await browser.close();
