const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..", "out");
const apiBase = "https://api.cloudflare.com/client/v4";
const token = process.env.CF_PAGES_UPLOAD_JWT;

if (!token) {
  throw new Error("CF_PAGES_UPLOAD_JWT is required");
}

const contentTypes = {
  ".html": "text/html; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=UTF-8",
  ".xml": "application/xml; charset=UTF-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await filesIn(absolute)));
    else files.push(absolute);
  }
  return files;
}

async function request(endpoint, body) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`${endpoint}: ${response.status} ${JSON.stringify(payload)}`);
  }
  return payload.result;
}

async function main() {
  const files = [];
  for (const absolute of await filesIn(root)) {
    const buffer = await fs.readFile(absolute);
    const relative = path.relative(root, absolute).replaceAll(path.sep, "/");
    const hash = crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 32);
    files.push({
      absolute,
      relative,
      hash,
      buffer,
      contentType: contentTypes[path.extname(relative).toLowerCase()] || "application/octet-stream",
    });
  }

  const hashes = files.map((file) => file.hash);
  const missing = new Set(await request("/pages/assets/check-missing", { hashes }));
  const pending = files.filter((file) => missing.has(file.hash));

  for (let index = 0; index < pending.length; index += 20) {
    const batch = pending.slice(index, index + 20).map((file) => ({
      key: file.hash,
      value: file.buffer.toString("base64"),
      metadata: { contentType: file.contentType },
      base64: true,
    }));
    await request("/pages/assets/upload", batch);
  }

  await request("/pages/assets/upsert-hashes", { hashes });

  const manifest = Object.fromEntries(files.map((file) => [`/${file.relative}`, file.hash]));
  await fs.writeFile(path.resolve(__dirname, "..", ".pages-manifest.json"), JSON.stringify(manifest), "utf8");
  console.log(JSON.stringify({ fileCount: files.length, missingCount: pending.length, manifestPath: ".pages-manifest.json" }));
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
