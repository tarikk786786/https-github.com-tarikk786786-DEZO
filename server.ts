import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add middlewares to parse JSON bodies
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
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
          message: "Form received. We will contact you soon." 
        });
      }, 800);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
