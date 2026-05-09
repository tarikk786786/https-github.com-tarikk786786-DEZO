<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DEZO — Web & Marketing Site

Premium marketing site for **DEZO** (web development and digital marketing in India).

- **Live site:** [https://dezo.in](https://dezo.in/)
- **Source:** [https://github.com/tarikk786786/https-github.com-tarikk786786-DEZO](https://github.com/tarikk786786/https-github.com-tarikk786786-DEZO)

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Copy env: use `.env.example` as reference; create `.env` or `.env.local` as needed.
3. Dev server: `npm run dev` (runs `tsx server.ts`, typically [http://localhost:3000](http://localhost:3000)).

## Production build

```bash
npm run build
```

Static output is written to `dist/`. Deploy that folder on Netlify/Vercel or any static host (`netlify.toml` is included for Netlify SPA routing).

