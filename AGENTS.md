# ANTIGRAVITY AGENT INSTRUCTIONS — DEZO WORKSPACE

## 🛑 STRICT WORKSPACE BOUNDARIES
1. **This workspace is for DEZO only.**
2. **Never import or modify SEO-TOOLS files.**
3. **Keep all changes within DEZO unless explicitly authorized.**
4. **Inspect the project structure before introducing dependencies or frameworks.**
5. Before every future task, verify the active workspace and confirm that the task concerns DEZO. If the workspace or target is ambiguous, ask the user before editing files.
6. Do not inject SEO-specific features, dashboards, modules, routes, branding, or external SEO dependencies into DEZO.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Install with `npm ci`. Node 22 satisfies `engines.node` (`>=18`).
- Dev server: `npm run dev -- --hostname 0.0.0.0 --port 3000`. The `dev` script already passes `--webpack`. `allowedDevOrigins` includes `127.0.0.1` so dev assets load when the page is opened at that host.
- `npm run lint` is `tsc --noEmit`. `npm test` is Node’s test runner via `tsx`. Route tests call `http://127.0.0.1:3000` and warn-skip when that server is down.
- Keys in `.env.example` are optional for local development. The marketing site, contact intake, and tests run without them. The advisor falls back locally when LLM provider keys are unset.
- Do not run `npm run build` while `next dev` is using `.next` if you still need that dev server; the production build rewrites the same output directory.
