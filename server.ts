import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  // Parse JSON request bodies
  app.use(express.json());

  // ── API Routes ──────────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, phone, businessName, service, budget, city, message } = req.body ?? {};
      const emailValid = typeof email === "string" && /\S+@\S+\.\S+/.test(email);
      const hasRequired =
        typeof name === "string" &&
        typeof phone === "string" &&
        typeof service === "string" &&
        typeof message === "string" &&
        name.trim() &&
        phone.trim() &&
        service.trim() &&
        message.trim();

      if (!hasRequired || !emailValid) {
        return res.status(400).json({
          success: false,
          message: "Please provide valid required fields.",
        });
      }

      console.log(
        "New contact submission",
        JSON.stringify({
          name,
          email,
          phone,
          businessName: businessName ?? null,
          city: city ?? null,
          service,
          budget: budget ?? null,
          message,
          createdAt: new Date().toISOString(),
        }),
      );

      setTimeout(() => {
        res.status(200).json({
          success: true,
          message: "Form received. We will contact you soon.",
        });
      }, 800);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // ── Production: Serve static build ──────────────────────────
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "dist");

    // Serve static assets with aggressive caching (hashed filenames)
    app.use(
      "/assets",
      express.static(path.join(distPath, "assets"), {
        maxAge: "1y",
        immutable: true,
      }),
    );

    // Serve other static files with moderate cache
    app.use(
      express.static(distPath, {
        maxAge: "1h",
        setHeaders(res, filePath) {
          // HTML should not be cached
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          }
        },
      }),
    );

    // SPA fallback — all unmatched routes get index.html
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // ── Development: Vite middleware ──────────────────────────
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ DEZO server running on http://0.0.0.0:${PORT}`);
    console.log(`   Mode: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer();
