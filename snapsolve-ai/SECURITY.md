# SnapSolve security

Made by [TarikIslam.in](https://tarikislam.in)

SnapSolve is hardened for a Chrome extension threat model. No client-side app is “uncrackable” — if someone controls the machine, they can inspect extension storage. The goal is to make casual leaks, webpage attacks, SSRF, and prompt abuse much harder.

## Protections included

| Control | What it does |
|---|---|
| Sender checks | Sensitive messages (`SOLVE_QUESTION`, etc.) only from SnapSolve pages |
| Message allowlist | Unknown message types rejected |
| Payload limits | Caps on text, images, history, and request size |
| Rate limits | Solve / catalog refresh throttles |
| Endpoint allowlist | Hosted providers must use known HTTPS hosts; blocks cloud metadata |
| Local binding | Ollama/LM Studio limited to loopback / `*.local` |
| Encrypted API keys | AES-GCM at rest in `chrome.storage.local` (per-install salt) |
| No keys in content scripts | Webpage JS never sees credentials |
| Prompt hardening | Filters common injection phrases; wraps capture as untrusted data |
| CSP | Extension pages: `script-src 'self'`, no remote code |
| On-demand content script | Not injected on every site at install; loaded when you capture |
| Sensitive field skip | Password / payment fields excluded from page text helpers |
| Export scrubbing | Settings export strips API keys |
| Error redaction | Provider errors scrub tokens before display |

## What we do **not** claim

- Perfect secrecy of keys on a compromised OS account  
- Unbreakable DRM or anti-debug that stops a determined local attacker  
- Model immunity to all prompt injection  

## Reporting issues

Contact via [tarikislam.in](https://tarikislam.in). Do not post live API keys in issues.
