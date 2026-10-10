import * as esbuild from "esbuild";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

await esbuild.build({
  entryPoints: [resolve(root, "src/background/service-worker.ts")],
  outfile: resolve(root, "dist/background.js"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: ["chrome120"],
  sourcemap: true,
  logLevel: "info",
  alias: { "@": resolve(root, "src") },
});

await esbuild.build({
  entryPoints: [resolve(root, "src/content/content-script.ts")],
  outfile: resolve(root, "dist/content.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["chrome120"],
  sourcemap: true,
  logLevel: "info",
  alias: { "@": resolve(root, "src") },
});

console.log("Bundled background.js (esm) and content.js (iife)");
