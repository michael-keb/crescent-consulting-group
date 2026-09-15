import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import "./sites-env.mjs";

const configPath = "dist/server/wrangler.json";
if (!existsSync(configPath)) {
  console.error(`Missing ${configPath}. Run the production build before starting.`);
  process.exit(1);
}

process.env.CI = "true";
process.env.WRANGLER_SEND_METRICS = "false";

const port = process.env.PORT || "10000";
const ip = process.env.HOST || "0.0.0.0";
const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));

let child = null;
let shuttingDown = false;

function start() {
  if (shuttingDown) return;

  child = spawn(
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
      "--live-reload",
      "false",
      "--show-interactive-dev-session",
      "false",
    ],
    {
      stdio: ["ignore", "inherit", "inherit"],
      env: {
        ...process.env,
        CI: "true",
        WRANGLER_SEND_METRICS: "false",
      },
    },
  );

  child.on("exit", (code, signal) => {
    child = null;
    if (shuttingDown) {
      process.exit(code ?? 1);
      return;
    }
    console.error(`Wrangler stopped (${signal || `exit ${code ?? 1}`}). Restarting in 1s.`);
    setTimeout(start, 1000);
  });
}

function stop(signal) {
  shuttingDown = true;
  if (child) child.kill(signal);
  else process.exit(0);
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => stop(signal));
}

start();
