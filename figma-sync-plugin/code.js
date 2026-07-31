const FILE_KEY = "l5lO3iusxMpin1GtDVfYcC";
const COLLECTION_NAME = "Website Sync";
const NAMESPACE = "portfolio.sync";

figma.showUI(__html__, { width: 380, height: 520, themeColors: true });

function setPath(target, path, value) {
  const keys = path.split(".");
  let cursor = target;
  keys.slice(0, -1).forEach((key) => {
    cursor[key] ??= {};
    cursor = cursor[key];
  });
  cursor[keys.at(-1)] = value;
}

function colorToHex(value) {
  const channel = (number) => Math.round(number * 255).toString(16).padStart(2, "0");
  return `#${channel(value.r)}${channel(value.g)}${channel(value.b)}`;
}

async function extractPayload() {
  await figma.loadAllPagesAsync();
  const payload = {
    schemaVersion: 1,
    source: { fileKey: figma.fileKey || FILE_KEY, homeNodeId: "104:2", mode: "figma-plugin", syncedAt: null },
    site: {}, categories: {}, colors: {}, layout: {}, motion: {},
  };

  const tagged = figma.root.findAll((node) => node.getSharedPluginData?.(NAMESPACE, "path"));
  tagged.forEach((node) => {
    const path = node.getSharedPluginData(NAMESPACE, "path");
    if (node.type === "TEXT") setPath(payload, path, node.characters);
  });

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const collection = collections.find((item) => item.name === COLLECTION_NAME);
  if (!collection) throw new Error(`Missing Figma variable collection: ${COLLECTION_NAME}`);
  const modeId = collection.defaultModeId;
  for (const variableId of collection.variableIds) {
    const variable = await figma.variables.getVariableByIdAsync(variableId);
    if (!variable) continue;
    const path = variable.getSharedPluginData(NAMESPACE, "path") || variable.name.replaceAll("/", ".");
    const raw = variable.valuesByMode[modeId];
    if (raw && typeof raw === "object" && "r" in raw) setPath(payload, path, colorToHex(raw));
    else setPath(payload, path, raw);
  }
  return payload;
}

figma.ui.onmessage = async (message) => {
  if (message.type === "sync") {
    try {
      figma.ui.postMessage({ type: "status", status: "reading", message: "Reading tagged Figma content…" });
      const payload = await extractPayload();
      figma.ui.postMessage({ type: "payload", payload });
    } catch (error) {
      figma.ui.postMessage({ type: "error", message: error.message });
    }
  }
  if (message.type === "close") figma.closePlugin();
};
