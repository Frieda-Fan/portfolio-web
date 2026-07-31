import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultPath = path.join(root, "src", "generated", "figma-sync.json");
const target = path.resolve(process.argv[2] ?? defaultPath);
const expectedFileKey = "l5lO3iusxMpin1GtDVfYcC";
const slugs = ["product-management", "installation", "architecture", "landscape"];

export function validateSyncPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== "object") errors.push("Payload must be an object.");
  if (payload?.schemaVersion !== 1) errors.push("schemaVersion must be 1.");
  if (payload?.source?.fileKey !== expectedFileKey) errors.push("Unexpected Figma file key.");
  if (!payload?.site?.wordmark?.trim()) errors.push("site.wordmark is required.");
  if (!payload?.site?.homeEyebrow?.trim()) errors.push("site.homeEyebrow is required.");
  if (typeof payload?.audio?.enabled !== "boolean") errors.push("audio.enabled must be a boolean.");

  for (const slug of slugs) {
    if (!payload?.categories?.[slug]?.label?.trim()) errors.push(`categories.${slug}.label is required.`);
    if (!payload?.categories?.[slug]?.latin?.trim()) errors.push(`categories.${slug}.latin is required.`);
  }

  for (const [name, value] of Object.entries(payload?.colors ?? {})) {
    if (!/^#[0-9a-f]{6}$/i.test(value)) errors.push(`colors.${name} must be a six-digit hex color.`);
  }

  const positivePaths = [
    ["layout.homeSealDesktopMaxPx", payload?.layout?.homeSealDesktopMaxPx],
    ["layout.homeSealMobileVw", payload?.layout?.homeSealMobileVw],
    ["motion.sealSpinSeconds", payload?.motion?.sealSpinSeconds],
    ["motion.homeSealSpinSeconds", payload?.motion?.homeSealSpinSeconds],
    ["motion.entrance.sealDurationSeconds", payload?.motion?.entrance?.sealDurationSeconds],
    ["motion.entrance.splitDurationSeconds", payload?.motion?.entrance?.splitDurationSeconds],
  ];
  positivePaths.forEach(([name, value]) => {
    if (!Number.isFinite(value) || value <= 0) errors.push(`${name} must be a positive number.`);
  });

  const allowedEases = new Set(["none", "power1.inOut", "power3.out", "expo.out", "expo.inOut"]);
  for (const [name, value] of [
    ["motion.entrance.sealEase", payload?.motion?.entrance?.sealEase],
    ["motion.entrance.splitEase", payload?.motion?.entrance?.splitEase],
    ["motion.homeReveal.ease", payload?.motion?.homeReveal?.ease],
    ["motion.categoryRitual.ease", payload?.motion?.categoryRitual?.ease],
    ["motion.projectReveal.ease", payload?.motion?.projectReveal?.ease],
  ]) {
    if (!allowedEases.has(value)) errors.push(`${name} is not an approved GSAP ease.`);
  }

  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const payload = JSON.parse(await fs.readFile(target, "utf8"));
  const errors = validateSyncPayload(payload);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Valid Figma sync payload: ${path.relative(root, target)}`);
  }
}
