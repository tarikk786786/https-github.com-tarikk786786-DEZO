# SnapSolve

Capture a question from your screen. Study the answer.

**Made by TarikIslam.in** · [tarikislam.in](https://tarikislam.in) · Tarik Islam

Chrome extension (Manifest V3). Built for students and lifelong learners — not for cheating on live exams.

## Install

```bash
cd snapsolve-ai
npm install
npm run build
```

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. **Load unpacked** → choose `snapsolve-ai/dist`

Packaged zip (when published on the branch): `snapsolve-ai-extension.zip`

## Use it

1. Open the popup — sample mode works with no API key
2. Or add a provider under Settings (OpenAI, Gemini, Claude, OpenRouter, Groq, local Ollama, …)
3. Accept the privacy notice before sending text to a hosted API
4. Shortcuts: `Alt+Shift+S` capture · `Alt+Shift+A` workspace

## Security

API keys are encrypted at rest, never injected into websites, and never included in exports. Outbound calls are allowlisted. See [SECURITY.md](./SECURITY.md) and [PRIVACY.md](./PRIVACY.md).

## Scripts

| Command | Purpose |
|---|---|
| `npm run build` | Production build → `dist/` |
| `npm test` | Unit tests |
| `npm run typecheck` | TypeScript |

## License / contact

Product by Tarik Islam — [tarikislam.in](https://tarikislam.in)
