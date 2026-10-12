import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createFiberTimer } from "./fiber-timer.mjs";

// Stable Fiber 9 still constructs the deprecated Clock; v10 is prerelease and
// changes the scheduler. Keep a narrow, version-checked compatibility patch.
const root = path.resolve("node_modules/@react-three/fiber");
const version = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")).version;
if (version !== "9.8.1") throw new Error(`Review the Fiber Timer patch when upgrading from 9.8.1 (installed ${version}).`);
let count = 0;
for (const file of readdirSync(path.join(root, "dist")).filter(file => /^events-.*\.(?:esm|cjs\.(?:dev|prod))\.js$/.test(file))) {
  const full = path.join(root, "dist", file);
  let source = readFileSync(full, "utf8");
  if (source.includes("clock: createFiberTimer(")) { count++; continue; }
  const clock = /clock: new (THREE(?:__namespace)?)\.Clock\(\)/g;
  const matches = [...source.matchAll(clock)];
  if (matches.length !== 1) throw new Error(`Unexpected Fiber clock implementation: ${file}`);
  source = source.replace(clock, (_, namespace) => `clock: createFiberTimer(${namespace}.Timer)`);
  source += `\n// Portfolio compatibility: Timer-backed Fiber 9 clock.\n${createFiberTimer.toString()}\n`;
  writeFileSync(full, source);
  count++;
}
if (count !== 3) throw new Error(`Expected three Fiber runtime bundles, found ${count}.`);
console.log("Applied Timer-backed clock compatibility for Fiber 9.8.1.");
