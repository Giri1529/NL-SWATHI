import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Try to find the public directory in multiple possible locations
  // 1. Local/Standard build: ./public relative to this file
  // 2. Vercel/Root execution: ./dist/public relative to cwd
  const possiblePaths = [
    path.resolve(__dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public") // Fallback
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    console.warn(`Could not find the build directory. Checked: ${possiblePaths.join(", ")}`);
    // Create a dummy endpoint to avoid crashing, just send a simple message
    app.use("/{*path}", (_req, res) => {
      res.status(404).json({ message: "Static content not found - check build logs" });
    });
    return;
  }

  console.log(`Serving static files from: ${distPath}`);

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
