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

1. Default is a **free LLM** path (OpenRouter free model). Sample answers still work offline with no key.
2. Settings → **Connect AI** — sign in at any provider (OpenAI, Gemini, Claude, Groq, Mistral, …), paste the API key, click Connect.
3. Accept the privacy notice before sending text to a hosted API.
4. Shortcuts: `Alt+Shift+S` capture · `Alt+Shift+A` workspace

## Free vs Pro

| | Free | Pro |
|---|---|---|
| Free LLMs (OpenRouter / Groq / HF / Ollama) | Yes | Yes |
| Paid cloud (OpenAI, Claude, Gemini, …) | Connect keys; solving needs Pro | Yes |
| Daily solves | 8 | High limit |
| Verification / floating toolbar / custom endpoints | — | Yes |

Buy / manage: [tarikislam.in/#snapsolve-pro](https://tarikislam.in/#snapsolve-pro)

Activate a key in Settings → Free / Pro. Mint keys (private key required, not in git):

```bash
npm run mint-license -- --name "Student" --days 365
```

## Security

API keys are encrypted at rest, never injected into websites, and never included in exports. Outbound calls are allowlisted. Client-side Pro keys are signed (ECDSA) but not unbreakable DRM. See [SECURITY.md](./SECURITY.md) and [PRIVACY.md](./PRIVACY.md).

## Scripts

| Command | Purpose |
|---|---|
| `npm run build` | Production build → `dist/` |
| `npm test` | Unit tests |
| `npm run typecheck` | TypeScript |
| `npm run mint-license` | Sign a Pro license key |

## License / contact

Product by Tarik Islam — [tarikislam.in](https://tarikislam.in)
