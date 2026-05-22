# DEZO — Web Development & Digital Marketing Agency

Premium agency website with AWWWARDS-style 3D animated background built with React, Three.js, GSAP, and Framer Motion.

## 🚀 Live Deployment on Render

### One-Click Deploy
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New → Web Service**
3. Connect this GitHub repository
4. Render auto-detects `render.yaml` — just confirm:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variable:** `NODE_ENV = production`
5. Click **Deploy**

### Manual Settings (if needed)
| Setting | Value |
|---------|-------|
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Health Check | `/api/health` |
| Node Version | `>=18` |

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 3
- **3D Background:** Three.js, React Three Fiber, drei, GSAP
- **Animations:** Framer Motion, GSAP with ScrollTrigger
- **Server:** Express (SPA with API routes)
- **Build:** Vite 6 with code-splitting

## 📦 Bundle Architecture

| Chunk | Size (gzip) | Loading |
|-------|------------|---------|
| `vendor` (React, Router) | ~103 KB | Immediate |
| `three-vendor` (Three.js, R3F, GSAP) | ~270 KB | Lazy |
| `index` (App code) | ~24 KB | Immediate |
| `AwwwardsBackground` | ~2 KB | Lazy |
| `route-pages` | ~10 KB | Lazy |

## 🖥 Local Development

```bash
npm install
npm run dev      # → http://localhost:3000
```

## 🏗 Production Build

```bash
npm run build    # Outputs to dist/
npm start        # Serves at PORT (default 3000)
```

## 📁 Project Structure

```
├── src/
│   ├── App.tsx                 # Main app with routing
│   ├── AwwwardsBackground.tsx  # 3D animated hero background
│   ├── components1-3.tsx       # UI components
│   ├── pages.tsx               # Service pages
│   ├── data.ts                 # Portfolio & content data
│   └── index.css               # Tailwind + custom styles
├── server.ts                   # Express production server
├── render.yaml                 # Render deployment blueprint
├── vite.config.ts              # Vite build configuration
└── index.html                  # Entry point with SEO
```
