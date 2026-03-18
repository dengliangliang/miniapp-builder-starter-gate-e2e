import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const requiredFiles = ["package.json", "template.config.json", "scripts/starter-gate.mjs"];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(rootDir, relativePath))) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

const config = JSON.parse(fs.readFileSync(path.join(rootDir, "template.config.json"), "utf8"));
if (config.id !== "uniapp-unibest") {
  throw new Error(`Expected template id uniapp-unibest, got ${config.id}`);
}

console.log("External starter gate fixture prepublish check passed.");
