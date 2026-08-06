import sharp from "sharp";
import { readdir, stat, writeFile, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";

const ROOTS = [
  "web-assets/product-management",
  "web-assets/architecture",
  "web-assets/landscape",
  "web-assets/interacation",
];

const QUALITY = 78;
const MAX_WIDTH = 2400;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return null;

  const stem = basename(filePath, ext);
  const outPath = join(dirname(filePath), `${stem}.webp`);
  const isAlreadyWebp = ext === ".webp";

  const before = (await stat(filePath)).size;

  const img = sharp(filePath, { failOn: "none" });
  const meta = await img.metadata();
  let pipeline = img;
  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  pipeline = pipeline.webp({ quality: QUALITY, effort: 4 });

  const buffer = await pipeline.toBuffer();
  const after = buffer.length;

  // Only replace if meaningfully smaller
  if (after < before * 0.9) {
    if (isAlreadyWebp) {
      // Overwrite in place
      await writeFile(filePath, buffer);
    } else {
      // Write new webp, try to remove original
      await writeFile(outPath, buffer);
      try { await unlink(filePath); } catch {}
    }
    const ratio = ((1 - after / before) * 100).toFixed(0);
    return { file: basename(filePath), before, after, ratio };
  }
  return null;
}

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for (const root of ROOTS) {
  const dir = join(process.cwd(), root);
  try {
    const files = await walk(dir);
    for (const f of files) {
      try {
        const result = await processFile(f);
        if (result) {
          totalBefore += result.before;
          totalAfter += result.after;
          count++;
          console.log(
            `${result.file}: ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB (-${result.ratio}%)`,
          );
        }
      } catch (e) {
        console.error(`  skip ${basename(f)}: ${e.message}`);
      }
    }
  } catch (e) {
    console.error(`Skip ${root}: ${e.message}`);
  }
}

console.log(
  `\nTotal: ${count} files, ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`,
);
