/**
 * Local preview harness with chrome.* mocks so popup/options/sidepanel
 * can be exercised without loading an unpacked extension (Chrome 148+
 * blocks --load-extension in this environment).
 */
import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../dist");
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".map": "application/json",
  ".svg": "image/svg+xml",
};

const chromeMock = `
<script>
(() => {
  const store = { local: {}, session: {} };
  const listeners = [];
  const api = {
    storage: {
      local: {
        get: async (keys) => {
          if (!keys) return { ...store.local };
          if (typeof keys === 'string') return { [keys]: store.local[keys] };
          if (Array.isArray(keys)) return Object.fromEntries(keys.map(k => [k, store.local[k]]));
          return Object.fromEntries(Object.keys(keys).map(k => [k, store.local[k] ?? keys[k]]));
        },
        set: async (obj) => { Object.assign(store.local, obj); listeners.forEach(l => l(Object.fromEntries(Object.keys(obj).map(k => [k, {newValue: obj[k]}])), 'local')); },
        remove: async (keys) => { (Array.isArray(keys)?keys:[keys]).forEach(k => delete store.local[k]); }
      },
      session: {
        get: async (keys) => {
          if (typeof keys === 'string') return { [keys]: store.session[keys] };
          return {};
        },
        set: async (obj) => Object.assign(store.session, obj),
        remove: async (keys) => { (Array.isArray(keys)?keys:[keys]).forEach(k => delete store.session[k]); }
      },
      onChanged: { addListener: (fn) => listeners.push(fn), removeListener: (fn) => {
        const i = listeners.indexOf(fn); if (i>=0) listeners.splice(i,1);
      }}
    },
    runtime: {
      id: 'preview',
      getURL: (p) => location.origin + '/' + p.replace(/^\\//,''),
      sendMessage: async (msg) => {
        if (msg?.type === 'SOLVE_QUESTION') {
          const text = msg.payload?.question?.rawText || msg.payload?.question?.questionText || '';
          const isEvap = /evaporat|liquid into a gas/i.test(text);
          return {
            type: 'SOLVE_RESULT',
            payload: {
              answer: isEvap ? 'Option B — Evaporation' : 'Demo preview answer',
              explanation: isEvap
                ? "The liquid's molecules gain sufficient energy to escape from its surface into the gaseous state."
                : 'Preview mock response (chrome APIs simulated).',
              steps: ['Parse question', 'Match options', 'Return labeled demo answer'],
              provider: 'demo', model: 'demo-solver', isDemo: true,
              warnings: ['Demo mode is active. This is a simulated study-aid response, not a live model answer.'],
              latencyMs: 40, selectedOptions: isEvap ? ['B'] : undefined
            }
          };
        }
        if (msg?.type === 'OPEN_SIDE_PANEL') return { ok: true };
        if (msg?.type === 'ANALYZE_VISIBLE_PAGE') return { type: 'VISIBLE_PAGE_TEXT', text: '', limited: true, reason: 'Preview mode' };
        if (msg?.type === 'START_REGION_CAPTURE') return { ok: true };
        if (msg?.type === 'GET_PENDING_QUESTION') return { type: 'PENDING_QUESTION' };
        if (msg?.type === 'SET_PENDING_QUESTION') return { ok: true };
        if (msg?.type === 'PING') return { type: 'PONG' };
        return { ok: true };
      },
      openOptionsPage: () => { location.href = '/options.html'; },
      lastError: null,
      onMessage: { addListener() {}, removeListener() {} },
      onInstalled: { addListener() {} }
    },
    tabs: {
      query: async () => [{ id: 1, windowId: 1, url: 'https://example.com' }],
      sendMessage: async () => ({ type: 'SELECTED_TEXT', text: '' }),
      get: async () => ({ id: 1, url: 'https://example.com' })
    },
    sidePanel: { open: async () => {}, setPanelBehavior: async () => {} },
    scripting: { executeScript: async () => {} },
    contextMenus: { create() {}, removeAll(cb){ cb&&cb(); }, onClicked: { addListener() {} } },
    commands: { onCommand: { addListener() {} } },
    windows: { getCurrent: async () => ({ id: 1 }) }
  };
  globalThis.chrome = api;
})();
</script>
`;

const server = http.createServer((req, res) => {
  let url = decodeURIComponent((req.url || "/").split("?")[0]);
  if (url === "/") url = "/popup.html";
  const file = resolve(root, "." + url);
  if (!file.startsWith(root) || !existsSync(file)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  let body = readFileSync(file);
  const type = mime[extname(file)] || "application/octet-stream";
  if (extname(file) === ".html") {
    let html = body.toString("utf8");
    if (!html.includes("chrome APIs simulated")) {
      html = html.replace("<head>", `<head>${chromeMock}`);
    }
    body = Buffer.from(html);
  }
  res.writeHead(200, { "content-type": type });
  res.end(body);
});

server.listen(4177, "127.0.0.1", () => {
  console.log("SnapSolve UI preview on http://127.0.0.1:4177/popup.html");
});
