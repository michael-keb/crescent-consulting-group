import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import "./sites-env.mjs";

const configPath = "dist/server/wrangler.json";
if (!existsSync(configPath)) {
  console.error(`Missing ${configPath}. Run the production build before starting.`);
  process.exit(1);
}

const port = process.env.PORT || "10000";
const ip = process.env.HOST || "0.0.0.0";
const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));

const child = spawn(
  process.execPath,
  [
    wrangler,
    "dev",
    "--config",
    configPath,
    "--persist-to",
    ".wrangler/state",
    "--ip",
    ip,
    "--port",
    String(port),
    "--inspector-port",
    "0",
  ],
  { stdio: "inherit" },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});
