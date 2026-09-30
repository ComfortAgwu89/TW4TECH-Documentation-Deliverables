"use strict";

const port = process.env.PORT ?? "3000";
const host = process.env.HOST === "0.0.0.0" ? "127.0.0.1" : (process.env.HOST ?? "127.0.0.1");

fetch(`http://${host}:${port}/health`)
  .then(async (response) => {
    process.exit(response.ok ? 0 : 1);
  })
  .catch(() => {
    process.exit(1);
  });
