"use strict";

const { spawn } = require("node:child_process");
const path = require("node:path");
const { setTimeout: delay } = require("node:timers/promises");
const fs = require("node:fs");

const PORT = process.env.TEST_PORT ?? "3456";
const KEY = "test-key-tw4";
const root = path.join(__dirname, "..");
const dataFile = path.join(root, "data", "test-tasks.json");

async function main() {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  const child = spawn(process.execPath, [path.join(root, "src", "server.js")], {
    cwd: root,
    env: {
      ...process.env,
      PORT,
      HOST: "127.0.0.1",
      API_KEY: KEY,
      DATA_FILE: dataFile,
      NODE_ENV: "test",
    },
    stdio: "pipe",
  });

  try {
    let health;
    for (let i = 0; i < 20; i += 1) {
      try {
        health = await fetch(`http://127.0.0.1:${PORT}/health`);
        if (health.ok) {
          break;
        }
      } catch {
        // process not listening yet
      }
      await delay(250);
    }
    if (!health || !health.ok) {
      throw new Error("GET /health failed: " + (health ? health.status : "no response"));
    }

    const created = await fetch(`http://127.0.0.1:${PORT}/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": KEY,
      },
      body: JSON.stringify({ title: "ci check", status: "todo" }),
    });
    if (created.status !== 201) {
      throw new Error("POST /api/v1/tasks failed: " + created.status);
    }
    const { data } = await created.json();

    const listed = await fetch(`http://127.0.0.1:${PORT}/api/v1/tasks`);
    const list = await listed.json();
    if (!list.count) {
      throw new Error("GET /api/v1/tasks returned empty list");
    }

    const patched = await fetch(`http://127.0.0.1:${PORT}/api/v1/tasks/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": KEY,
      },
      body: JSON.stringify({ status: "done" }),
    });
    if (!patched.ok) {
      throw new Error("PUT /api/v1/tasks/:id failed: " + patched.status);
    }

    const del = await fetch(`http://127.0.0.1:${PORT}/api/v1/tasks/${data.id}`, {
      method: "DELETE",
      headers: { "X-API-Key": KEY },
    });
    if (!del.ok) {
      throw new Error("DELETE failed: " + del.status);
    }

    console.log("api tests ok");
  } finally {
    child.kill("SIGTERM");
    try {
      fs.unlinkSync(dataFile);
    } catch {
      // ignore
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
