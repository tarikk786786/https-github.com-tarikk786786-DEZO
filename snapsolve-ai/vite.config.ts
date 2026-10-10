import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "node:fs";

function copyExtensionAssets() {
  return {
    name: "copy-extension-assets",
    async closeBundle() {
      const dist = resolve(__dirname, "dist");
      mkdirSync(dist, { recursive: true });
      mkdirSync(resolve(dist, "icons"), { recursive: true });
      mkdirSync(resolve(dist, "ocr"), { recursive: true });
      mkdirSync(resolve(dist, "ocr/lang-data"), { recursive: true });

      const manifest = JSON.parse(
        readFileSync(resolve(__dirname, "manifest.json"), "utf-8")
      );
      writeFileSync(resolve(dist, "manifest.json"), JSON.stringify(manifest, null, 2));

      for (const size of [16, 32, 48, 128]) {
        const src = resolve(__dirname, `public/icons/icon${size}.png`);
        if (existsSync(src)) {
          copyFileSync(src, resolve(dist, `icons/icon${size}.png`));
        }
      }

      // Local Tesseract assets (no remote JS execution)
      const tessDist = resolve(__dirname, "node_modules/tesseract.js/dist");
      const tessCore = resolve(__dirname, "node_modules/tesseract.js-core");
      if (existsSync(resolve(tessDist, "worker.min.js"))) {
        copyFileSync(resolve(tessDist, "worker.min.js"), resolve(dist, "ocr/worker.min.js"));
      }
      for (const name of readdirSync(tessCore)) {
        if (name.endsWith(".wasm.js") || name.endsWith(".wasm")) {
          copyFileSync(resolve(tessCore, name), resolve(dist, "ocr", name));
        }
      }
      // Default English traineddata if present in cache; otherwise OCR downloads are blocked by CSP —
      // ship a note file and rely on bundled lang when available.
      const engCandidates = [
        resolve(__dirname, "public/ocr/eng.traineddata.gz"),
        resolve(__dirname, "public/ocr/eng.traineddata"),
        resolve(dist, "ocr/lang-data/eng.traineddata.gz"),
      ];
      let hasLang = false;
      for (const candidate of engCandidates) {
        if (existsSync(candidate) && !candidate.startsWith(resolve(dist, "ocr/lang-data"))) {
          const destName = candidate.endsWith(".gz") ? "eng.traineddata.gz" : "eng.traineddata";
          copyFileSync(candidate, resolve(dist, "ocr/lang-data", destName));
          hasLang = true;
          break;
        }
      }
      if (!hasLang) {
        // Best-effort fetch so production builds include English OCR data without committing 10MB.
        try {
          const res = await fetch(
            "https://cdn.jsdelivr.net/gh/naptha/tessdata@gh-pages/4.0.0/eng.traineddata.gz"
          );
          if (res.ok) {
            const buf = Buffer.from(await res.arrayBuffer());
            writeFileSync(resolve(dist, "ocr/lang-data/eng.traineddata.gz"), buf);
            mkdirSync(resolve(__dirname, "public/ocr"), { recursive: true });
            writeFileSync(resolve(__dirname, "public/ocr/eng.traineddata.gz"), buf);
          }
        } catch {
          console.warn("[snapsolve] OCR eng.traineddata.gz not bundled; image OCR may fail until added under public/ocr/");
        }
      }

      for (const page of ["popup", "sidepanel", "options"]) {
        const nested = resolve(dist, `src/${page}/${page}.html`);
        const flat = resolve(dist, `${page}.html`);
        if (existsSync(nested)) {
          let html = readFileSync(nested, "utf-8");
          html = html
            .replace(/(src|href)="\/assets\//g, '$1="./assets/')
            .replace(/(src|href)="\.\.\/\.\.\/assets\//g, '$1="./assets/')
            .replace(/(src|href)="\.\.\/\.\.\//g, '$1="./');
          writeFileSync(flat, html);
        }
      }

    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), copyExtensionAssets()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/popup.html"),
        sidepanel: resolve(__dirname, "src/sidepanel/sidepanel.html"),
        options: resolve(__dirname, "src/options/options.html"),
        background: resolve(__dirname, "src/background/service-worker.ts"),
        content: resolve(__dirname, "src/content/content-script.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "background") return "background.js";
          if (chunk.name === "content") return "content.js";
          return "assets/[name]-[hash].js";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.{test,spec}.ts"],
  },
});
