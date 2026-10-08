<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

The app to run is the Next.js App Router in `app/`. `npm run dev` serves it at http://localhost:3000 (`next dev` defaults to hostname `0.0.0.0` and port 3000). `npm run build` runs `next build --webpack`. `npx tsc --noEmit` typechecks the Next.js project.

`npm run lint` fails on this Next.js release: the `lint` CLI was removed, so `next lint` is treated as a project directory named `lint`.

`src/`, `vite.config.ts`, and `server.ts` are the older Vite/Express stack. Do not start those as the development server.

`.env.example` lists `GEMINI_API_KEY`, `APP_URL`, and InsForge Vite keys. They are not required to boot the site, render pages, or submit the contact form. That form opens a WhatsApp handoff in the browser.
