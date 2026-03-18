import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const requiredFiles = [
  "package.json",
  "package-lock.json",
  "template.config.json",
  "scripts/starter-gate.mjs",
  "tokens/base.json",
  "tokens/light.json",
  "tokens/dark.json",
  "tokens/brand-default.json",
  "src/theme/tokens.ts",
  "src/theme/platform-theme.ts",
  "src/theme/icons/manifest.ts",
  "src/components/AppIcon.vue"
];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(rootDir, relativePath))) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

const config = JSON.parse(fs.readFileSync(path.join(rootDir, "template.config.json"), "utf8"));
if (config.id !== "uniapp-unibest") {
  throw new Error(`Expected template id uniapp-unibest, got ${config.id}`);
}

const baseTokens = JSON.parse(fs.readFileSync(path.join(rootDir, "tokens/base.json"), "utf8"));
if (!baseTokens.global?.color?.palette?.brand?.[500]?.value) {
  throw new Error("Fixture token source is missing global.color.palette.brand.500");
}
if (!baseTokens.global?.typography?.family?.sans?.value) {
  throw new Error("Fixture token source is missing global.typography.family.sans");
}

const compiledTokens = fs.readFileSync(path.join(rootDir, "src/theme/tokens.ts"), "utf8");
if (!compiledTokens.includes("export const tokens")) {
  throw new Error("Fixture compiled token bridge is missing export const tokens");
}
if (!compiledTokens.includes("typography")) {
  throw new Error("Fixture compiled token bridge is missing typography markers");
}

const platformTheme = fs.readFileSync(path.join(rootDir, "src/theme/platform-theme.ts"), "utf8");
if (!platformTheme.includes("navigationBarBackgroundColor")) {
  throw new Error("Fixture platform theme bridge is missing navigationBarBackgroundColor");
}

const iconManifest = fs.readFileSync(path.join(rootDir, "src/theme/icons/manifest.ts"), "utf8");
if (!iconManifest.includes("iconManifest")) {
  throw new Error("Fixture icon manifest is missing iconManifest export");
}

console.log("External starter gate fixture prepublish check passed.");
