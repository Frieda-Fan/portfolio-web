import { useEffect } from "react";
import { categories as baseCategories } from "./data/projects";
import figmaSync from "./generated/figma-sync.json";

const categoryOrder = ["product-management", "installation", "architecture", "landscape"];

export const syncedCategories = Object.fromEntries(
  categoryOrder.map((slug) => [
    slug,
    {
      ...baseCategories[slug],
      ...(figmaSync.categories[slug] ?? {}),
    },
  ]),
);

const cssVariables = {
  "--ink": figmaSync.colors.ink,
  "--paper": figmaSync.colors.paper,
  "--pink": figmaSync.colors.pink,
  "--red": figmaSync.colors.red,
  "--yellow": figmaSync.colors.yellow,
  "--cyan": figmaSync.colors.cyan,
  "--blue": figmaSync.colors.blue,
  "--violet": figmaSync.colors.violet,
  "--sync-seal-spin": `${figmaSync.motion.sealSpinSeconds}s`,
  "--sync-home-seal-spin": `${figmaSync.motion.homeSealSpinSeconds}s`,
  "--sync-home-seal-max": `${figmaSync.layout.homeSealDesktopMaxPx}px`,
  "--sync-home-seal-mobile": `${figmaSync.layout.homeSealMobileVw}vw`,
  "--sync-home-index-max": `${figmaSync.layout.homeIndexDesktopMaxPx}px`,
};

export function useFigmaSync() {
  useEffect(() => {
    const root = document.documentElement;
    const previous = new Map();
    Object.entries(cssVariables).forEach(([name, value]) => {
      previous.set(name, root.style.getPropertyValue(name));
      root.style.setProperty(name, value);
    });
    root.dataset.figmaSync = figmaSync.source.syncedAt ? "synced" : "baseline";

    return () => {
      previous.forEach((value, name) => {
        if (value) root.style.setProperty(name, value);
        else root.style.removeProperty(name);
      });
      delete root.dataset.figmaSync;
    };
  }, []);
}

export { figmaSync };
