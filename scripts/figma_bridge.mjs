import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { validateSyncPayload } from "./figma_sync_validate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "src", "generated", "figma-sync.json");
const backupDir = path.join(root, "portfolio", "figma-sync-history");
const port = Number(process.env.FIGMA_BRIDGE_PORT ?? 4175);

function send(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 1_000_000) throw new Error("Sync payload exceeds 1 MB.");
  }
  return JSON.parse(raw);
}

async function buildSite() {
  return new Promise((resolve) => {
    const isWindows = process.platform === "win32";
    const command = isWindows ? (process.env.ComSpec ?? "cmd.exe") : "npm";
    const args = isWindows ? ["/d", "/s", "/c", "npm run build"] : ["run", "build"];
    const child = spawn(command, args, {
      cwd: root,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk; });
    child.stderr.on("data", (chunk) => { output += chunk; });
    child.on("close", (code) => resolve({ ok: code === 0, code, output: output.slice(-4000) }));
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") return send(response, 204, {});
  if (request.method === "GET" && request.url === "/health") {
    return send(response, 200, { ok: true, port, outputPath });
  }
  if (request.method !== "POST" || request.url !== "/sync") {
    return send(response, 404, { ok: false, error: "Not found" });
  }

  try {
    const payload = await readJson(request);
    const errors = validateSyncPayload(payload);
    if (errors.length) return send(response, 422, { ok: false, errors });

    payload.source.syncedAt = new Date().toISOString();
    await fs.mkdir(backupDir, { recursive: true });
    const current = await fs.readFile(outputPath, "utf8");
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await fs.writeFile(path.join(backupDir, `${stamp}.json`), current, "utf8");

    const temporaryPath = `${outputPath}.tmp`;
    await fs.writeFile(temporaryPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    await fs.rename(temporaryPath, outputPath);
    const build = await buildSite();
    if (!build.ok) {
      await fs.writeFile(outputPath, current, "utf8");
      return send(response, 500, { ok: false, error: "Build failed; previous website configuration restored.", build });
    }

    return send(response, 200, { ok: true, syncedAt: payload.source.syncedAt, build });
  } catch (error) {
    return send(response, 400, { ok: false, error: error.message });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Figma bridge ready at http://127.0.0.1:${port}`);
  console.log(`Website remains available separately at http://127.0.0.1:4174`);
});
