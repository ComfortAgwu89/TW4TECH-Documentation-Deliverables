"use strict";

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(__dirname, "..", ".env"));

const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);
const HOST = process.env.HOST ?? "0.0.0.0";
const API_KEY = process.env.API_KEY ?? "";
const DATA_FILE = process.env.DATA_FILE ?? path.join(__dirname, "..", "data", "tasks.json");
const LOG_LEVEL = (process.env.LOG_LEVEL ?? "info").toLowerCase();
const NODE_ENV = process.env.NODE_ENV ?? "development";

const STATUSES = new Set(["todo", "doing", "done"]);

function log(level, message, extra) {
  const rank = { error: 0, warn: 1, info: 2, debug: 3 };
  if ((rank[level] ?? 2) > (rank[LOG_LEVEL] ?? 2)) {
    return;
  }
  const line = extra ? `${message} ${JSON.stringify(extra)}` : message;
  console.log(`[${new Date().toISOString()}] ${level.toUpperCase()} ${line}`);
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "X-TW4-Version": "1.0.0",
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function ensureStore() {
  const dir = path.dirname(DATA_FILE);
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

function loadTasks() {
  ensureStore();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveTasks(tasks) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf8");
}

function parseJson(raw) {
  if (!raw.trim()) {
    return {};
  }
  return JSON.parse(raw);
}

function requireApiKey(req, res) {
  if (!API_KEY) {
    send(res, 500, {
      error: "server_misconfigured",
      message: "API_KEY is not set. Copy .env.example to .env and set a key.",
    });
    return false;
  }
  const header = req.headers["x-api-key"];
  if (header !== API_KEY) {
    send(res, 401, {
      error: "unauthorized",
      message: "Missing or invalid X-API-Key header.",
    });
    return false;
  }
  return true;
}

function validateTaskInput(body, { partial = false } = {}) {
  if (!partial && (typeof body.title !== "string" || !body.title.trim())) {
    return "Field 'title' is required.";
  }
  if (body.title !== undefined && (typeof body.title !== "string" || !body.title.trim())) {
    return "Field 'title' must be a non-empty string.";
  }
  if (body.status !== undefined && !STATUSES.has(body.status)) {
    return "Field 'status' must be one of: todo, doing, done.";
  }
  return null;
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
  const method = req.method ?? "GET";
  const route = `${method} ${url.pathname}`;

  if (method === "GET" && url.pathname === "/health") {
    return send(res, 200, {
      status: "ok",
      service: "tw4",
      environment: NODE_ENV,
      uptime_seconds: Math.round(process.uptime()),
    });
  }

  if (method === "GET" && url.pathname === "/api/v1/tasks") {
    const status = url.searchParams.get("status");
    let tasks = loadTasks();
    if (status) {
      if (!STATUSES.has(status)) {
        return send(res, 400, {
          error: "invalid_query",
          message: "Query 'status' must be one of: todo, doing, done.",
        });
      }
      tasks = tasks.filter((task) => task.status === status);
    }
    return send(res, 200, { data: tasks, count: tasks.length });
  }

  const taskMatch = url.pathname.match(/^\/api\/v1\/tasks\/([0-9a-fA-F-]{36})$/);

  if (method === "GET" && taskMatch) {
    const task = loadTasks().find((item) => item.id === taskMatch[1]);
    if (!task) {
      return send(res, 404, { error: "not_found", message: "Task not found." });
    }
    return send(res, 200, { data: task });
  }

  if (method === "POST" && url.pathname === "/api/v1/tasks") {
    if (!requireApiKey(req, res)) {
      return;
    }
    let body;
    try {
      body = parseJson(await readBody(req));
    } catch {
      return send(res, 400, { error: "invalid_json", message: "Request body must be valid JSON." });
    }
    const error = validateTaskInput(body);
    if (error) {
      return send(res, 400, { error: "validation_error", message: error });
    }
    const now = new Date().toISOString();
    const task = {
      id: randomUUID(),
      title: body.title.trim(),
      status: body.status && STATUSES.has(body.status) ? body.status : "todo",
      createdAt: now,
      updatedAt: now,
    };
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    return send(res, 201, { data: task });
  }

  if ((method === "PATCH" || method === "PUT") && taskMatch) {
    if (!requireApiKey(req, res)) {
      return;
    }
    let body;
    try {
      body = parseJson(await readBody(req));
    } catch {
      return send(res, 400, { error: "invalid_json", message: "Request body must be valid JSON." });
    }
    const error = validateTaskInput(body, { partial: true });
    if (error) {
      return send(res, 400, { error: "validation_error", message: error });
    }
    const tasks = loadTasks();
    const index = tasks.findIndex((item) => item.id === taskMatch[1]);
    if (index === -1) {
      return send(res, 404, { error: "not_found", message: "Task not found." });
    }
    if (body.title) {
      tasks[index].title = body.title.trim();
    }
    if (body.status) {
      tasks[index].status = body.status;
    }
    tasks[index].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    return send(res, 200, { data: tasks[index] });
  }

  if (method === "DELETE" && taskMatch) {
    if (!requireApiKey(req, res)) {
      return;
    }
    const tasks = loadTasks();
    const index = tasks.findIndex((item) => item.id === taskMatch[1]);
    if (index === -1) {
      return send(res, 404, { error: "not_found", message: "Task not found." });
    }
    const [removed] = tasks.splice(index, 1);
    saveTasks(tasks);
    return send(res, 200, { data: removed, deleted: true });
  }

  log("warn", "unhandled route", { route });
  return send(res, 404, { error: "not_found", message: `No route for ${route}` });
}

ensureStore();

const server = http.createServer((req, res) => {
  handle(req, res).catch((error) => {
    log("error", "unhandled error", { message: error.message });
    send(res, 500, { error: "internal_error", message: "Unexpected server error." });
  });
});

server.listen(PORT, HOST, () => {
  log("info", `TW4 API listening on http://${HOST}:${PORT}`);
});
