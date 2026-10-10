# SnapSolve AI

Universal screen question solver — Chrome Extension (Manifest V3).

**Made by TarikIslam.in** · [https://tarikislam.in](https://tarikislam.in) · Creator: Tarik Islam

SnapSolve captures a question from a webpage, screenshot, image, or PDF, recognizes its structure, routes it to a configured AI provider, and returns a clear answer with explanation. It is a **learning aid**, not an exam submission bot.

## Browser-first rules

- Does not restyle or rewrite host websites.
- Floating toolbar is **off by default** and, when enabled, uses **closed Shadow DOM**.
- No continuous screenshot capture or background monitoring.
- API keys stay in extension storage — never injected into page scripts.
- Popup / side panel / options own the complex UI.

## Install (Developer Mode)

1. `cd snapsolve-ai && npm install && npm run build`
2. Open Chrome → `chrome://extensions`
3. Enable **Developer mode**
4. **Load unpacked** → select `snapsolve-ai/dist`

## Quick start

1. Open the popup → try **Demo Mode** (works without API keys).
2. Or open **Settings** → enable a provider → paste an API key → **Test connection**.
3. Consent to external transfers under **Privacy** before using hosted APIs.
4. Capture with **Alt+Shift+S**, open the workspace with **Alt+Shift+A**, or use the popup.

## Configure providers

Supported adapters:

| Provider | Notes |
|---|---|
| Demo | Local simulated answers (labeled) |
| OpenAI | Official API |
| Google Gemini | AI Studio / Gemini API |
| Anthropic | Claude API |
| OpenRouter | Multi-model + free-listed catalog |
| Groq, Mistral, DeepSeek, Together, Fireworks, Cerebras, Hugging Face | OpenAI-compatible endpoints |
| Ollama / LM Studio / Custom | Local OpenAI-compatible servers |

Consumer ChatGPT Plus / Claude Pro / Gemini app subscriptions are **not** API credentials. Use official API keys or a local gateway.

Sample non-secret config: `config.sample.json`.

### Free models

Settings → **Free Models** refreshes catalogs (OpenRouter when configured, plus local tags). Listings marked free reflect **catalog metadata at fetch time**, not a permanent guarantee.

## Scripts

```bash
npm run build      # production extension into dist/
npm test           # vitest unit tests
npm run typecheck  # TypeScript
npm run dev        # vite build --watch
```

## Permissions

- `storage` — settings & optional history
- `sidePanel` — workspace UI
- `activeTab` + `scripting` — user-initiated capture / page text
- `contextMenus` — “Solve with SnapSolve AI” on selection
- Optional host permissions — requested when interacting with pages

See [PRIVACY.md](./PRIVACY.md).

## Troubleshooting

| Issue | Fix |
|---|---|
| Restricted page error | `chrome://` and Web Store pages cannot be scripted — use manual entry or upload |
| Provider 401 | Re-check API key; use **Test connection** |
| External transfer blocked | Settings → Privacy → consent checkbox |
| OCR empty | Prefer a sharper crop; ensure `dist/ocr` assets exist after build |
| Toolbar not visible | Opt-in under Settings → Capture (off by default by design) |

## Development layout

```
snapsolve-ai/
  manifest.json
  src/background/     service worker
  src/content/        isolated content script (Shadow DOM)
  src/popup/          compact launcher
  src/sidepanel/      main workspace
  src/options/        providers, free models, privacy
  src/solvers/        router + adapters + catalog
  src/capture/        parsing, region crop, PDF
  src/ocr/            Tesseract wrapper (local assets)
  tests/
```

## Ethical use

Use SnapSolve for practice, homework review, released papers, and learning. Do not use it to bypass exam security or automate graded submissions.
