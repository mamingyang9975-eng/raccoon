import assert from "node:assert/strict";
import test from "node:test";

import { onRequestGet as onAvatarGet } from "../functions/api/avatar.js";
import { onRequestGet as onDebugEnvGet } from "../functions/api/debug-env.js";
import { onRequestPost as onReportPost } from "../functions/api/report.js";

test("avatar endpoint returns SVG", async () => {
  const request = new Request("https://example.com/api/avatar?title=%E7%A8%B3%E5%81%A5%E6%8E%A8%E8%BF%9B%E5%B7%A5%E7%A8%8B%E5%B8%88");
  const response = await onAvatarGet({ request });
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type") || "", /image\/svg\+xml/);
  assert.match(body, /<svg/);
});

test("debug env reports key presence without leaking values", async () => {
  const response = await onDebugEnvGet({
    env: {
      OPENROUTER_API_KEY: "secret-value",
      CF_PAGES: "1",
    },
  });
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.hasEnvObject, true);
  assert.equal(data.hasOpenRouterApiKey, true);
  assert.deepEqual(data.keys, ["CF_PAGES", "OPENROUTER_API_KEY"]);
  assert.equal(JSON.stringify(data).includes("secret-value"), false);
});

test("report endpoint returns 400 when prompt is missing", async () => {
  const request = new Request("https://example.com/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const response = await onReportPost({
    request,
    env: { OPENROUTER_API_KEY: "secret" },
  });
  const data = await response.json();

  assert.equal(response.status, 400);
  assert.equal(data.error, "missing prompt");
});

test("report endpoint returns 500 when API key is missing", async () => {
  const request = new Request("https://example.com/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "hello" }),
  });

  const response = await onReportPost({
    request,
    env: {},
  });
  const data = await response.json();

  assert.equal(response.status, 500);
  assert.equal(data.error, "server missing OPENROUTER_API_KEY");
});

test("report endpoint uses configured model and unwraps OpenRouter content", async () => {
  const originalFetch = globalThis.fetch;
  let capturedModel;

  globalThis.fetch = async (_url, init) => {
    const payload = JSON.parse(init.body);
    capturedModel = payload.model;

    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: "{\"verdict\":\"ok\"}",
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  try {
    const request = new Request("https://example.com/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "hello" }),
    });

    const response = await onReportPost({
      request,
      env: {
        OPENROUTER_API_KEY: "secret",
        OPENROUTER_MODEL: "meta-llama/llama-3.3-8b-instruct",
      },
    });
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(capturedModel, "meta-llama/llama-3.3-8b-instruct");
    assert.equal(data.content, "{\"verdict\":\"ok\"}");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

