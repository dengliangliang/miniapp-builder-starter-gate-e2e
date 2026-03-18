import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(rootDir, "template.config.json"), "utf8"));

function parseTarget(argv) {
  const explicit = argv.find((item) => item.startsWith("--target="));
  if (explicit) {
    return explicit.slice("--target=".length);
  }

  const index = argv.indexOf("--target");
  if (index >= 0 && argv[index + 1]) {
    return argv[index + 1];
  }

  return config.id;
}

const target = parseTarget(process.argv.slice(2));
if (target !== config.id) {
  throw new Error(`starter:ci-gate target mismatch: expected ${config.id}, got ${target}`);
}

console.log(`starter:ci-gate accepted target ${target}`);
