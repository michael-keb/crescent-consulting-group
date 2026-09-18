import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import "./sites-env.mjs";

const nodeEntry = "dist/server/index.js";
const wranglerConfig = "dist/server/wrangler.json";
const port = Number(process.env.PORT || "10000");
const host = process.env.HOST || "0.0.0.0";
const useNodeServer =
  process.env.RENDER === "true" ||
  process.env.VINEXT_NODE_SERVER === "1" ||
  (existsSync(nodeEntry) && !existsSync(wranglerConfig));

if (useNodeServer) {
  if (!existsSync(nodeEntry)) {
    console.error(`Missing ${nodeEntry}. Run the production build before starting.`);
    process.exit(1);
  }

  console.log(`Starting Node production server on ${host}:${port}`);
  const { startProdServer } = await import("vinext/server/prod-server");
  await startProdServer({ port, host, outDir: "dist" });
} else {
  startWrangler();
}

function startWrangler() {
  if (!existsSync(wranglerConfig)) {
    console.error(`Missing ${wranglerConfig}. Run the production build before starting.`);
    process.exit(1);
  }

  process.env.CI = "true";
  process.env.WRANGLER_SEND_METRICS = "false";
  process.env.NODE_OPTIONS ??= "--max-old-space-size=384";

  const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));
  const child = spawn(
    process.execPath,
    [
      wrangler,
      "dev",
      "--config",
      wranglerConfig,
      "--persist-to",
      ".wrangler/state",
      "--ip",
      host,
      "--port",
      String(port),
      "--inspector-port",
      "0",
      "--live-reload",
      "false",
      "--show-interactive-dev-session",
      "false",
      "--log-level",
      "error",
    ],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        CI: "true",
        WRANGLER_SEND_METRICS: "false",
      },
    },
  );

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => child.kill(signal));
  }

  child.on("exit", (code, signal) => {
    if (signal) process.exit(1);
    process.exit(code ?? 1);
  });
}
