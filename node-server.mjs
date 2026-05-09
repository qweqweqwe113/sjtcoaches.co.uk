/**
 * Node.js HTTP server wrapper for TanStack Start / Cloudflare Workers build.
 * Bridges the Fetch API handler (dist/server/index.js) to Node's http module.
 * Run with: node node-server.mjs
 */

import http from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// ── Load .env ────────────────────────────────────────────────────────────────
import { config } from "dotenv";
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const CLIENT_DIR = path.join(__dirname, "dist/client");
const PUBLIC_DIR = path.join(__dirname, "public");

// ── MIME types ───────────────────────────────────────────────────────────────
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".mjs":  "application/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".webp": "image/webp",
  ".txt":  "text/plain",
  ".xml":  "application/xml",
};

// ── Load the Workers-style handler ───────────────────────────────────────────
const { default: workerHandler } = await import("./dist/server/index.js");

// The handler may be the module default or have a .fetch property
const fetchHandler = typeof workerHandler === "function"
  ? workerHandler
  : workerHandler?.fetch ?? workerHandler?.default?.fetch;

if (!fetchHandler) {
  console.error("Could not find fetch handler in dist/server/index.js");
  process.exit(1);
}

// ── Static file helper ───────────────────────────────────────────────────────
async function serveStatic(req, res) {
  const url = new URL(req.url, `http://localhost`);

  // Check public/ first (favicon.ico, og-image.jpg, site.webmanifest etc.)
  const publicPath = path.join(PUBLIC_DIR, url.pathname);
  if (publicPath.startsWith(PUBLIC_DIR) && existsSync(publicPath) && (await import("node:fs")).statSync(publicPath).isFile()) {
    const ext = path.extname(publicPath).toLowerCase();
    const mime = MIME[ext] || "application/octet-stream";
    const content = await readFile(publicPath);
    res.writeHead(200, {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=86400",
    });
    res.end(content);
    return true;
  }

  // Then check dist/client/
  const filePath = path.join(CLIENT_DIR, url.pathname);
  if (!filePath.startsWith(CLIENT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return true;
  }

  if (existsSync(filePath) && (await import("node:fs")).statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || "application/octet-stream";
    const content = await readFile(filePath);
    const isHashed = /\.[a-f0-9]{8,}\.\w+$/.test(filePath);
    res.writeHead(200, {
      "Content-Type": mime,
      "Cache-Control": isHashed
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
    });
    res.end(content);
    return true;
  }
  return false;
}

// ── Convert Node IncomingMessage → Fetch Request ─────────────────────────────
function nodeToFetchRequest(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host  = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url   = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, val] of Object.entries(req.headers)) {
    if (val) headers.set(key, Array.isArray(val) ? val.join(", ") : val);
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  let body = null;
  if (hasBody) {
    body = new ReadableStream({
      start(controller) {
        req.on("data", chunk => controller.enqueue(chunk));
        req.on("end",  ()    => controller.close());
        req.on("error", e   => controller.error(e));
      },
    });
  }

  return new Request(url, {
    method:  req.method,
    headers,
    body,
    duplex: hasBody ? "half" : undefined,
  });
}

// ── Convert Fetch Response → Node ServerResponse ─────────────────────────────
async function fetchToNodeResponse(fetchRes, res) {
  const headers = {};
  fetchRes.headers.forEach((val, key) => { headers[key] = val; });
  res.writeHead(fetchRes.status, headers);

  if (fetchRes.body) {
    const reader = fetchRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}

// ── HTTP server ───────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  try {
    // Serve static assets from dist/client directly
    const served = await serveStatic(req, res);
    if (served) return;

    // Everything else goes to the TanStack Start handler
    const fetchReq = nodeToFetchRequest(req);
    const fetchRes = await fetchHandler(fetchReq, {
      // Minimal env bindings — real secrets come from process.env via dotenv
      env: {
        MONGODB_URI:        process.env.MONGODB_URI,
        RESEND_API_KEY:     process.env.RESEND_API_KEY,
        GEMINI_API_KEY:     process.env.GEMINI_API_KEY,
        NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
        EMAIL_FROM:         process.env.EMAIL_FROM,
      },
    });

    await fetchToNodeResponse(fetchRes, res);
  } catch (err) {
    console.error("[server error]", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`SJT Coaches server running on http://127.0.0.1:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => { server.close(() => process.exit(0)); });
process.on("SIGINT",  () => { server.close(() => process.exit(0)); });
