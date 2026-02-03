import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // On Vercel, we don't need to serve static files from the Express app
  // because Vercel serves them directly from the output directory.
  // This avoids path resolution issues and potential catch-all conflicts.
  if (process.env.VERCEL) {
    console.log("Running on Vercel: skipping Express static file serving.");
    return;
  }

  const possiblePaths = [
    path.resolve(__dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public"),
    path.resolve(__dirname, "..", "dist", "public"),
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
    // Fallback for cases where static build is missing but we're not on Vercel
    return;
  }

  console.log(`Serving static files from: ${distPath}`);

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
