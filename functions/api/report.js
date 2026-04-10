export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const models = resolveModelCandidates(body, env);
    const [model, ...fallbackModels] = models;

    const prompt = body?.prompt;
    if (!prompt) {
      return json({ error: "missing prompt" }, 400);
    }
    if (!env.OPENROUTER_API_KEY) {
      return json({ error: "server missing OPENROUTER_API_KEY" }, 500);
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": env.SITE_URL || "https://example.com",
        "X-Title": "Raccoon Story Quiz",
      },
      body: JSON.stringify({
        model,
        ...(fallbackModels.length ? { models: fallbackModels } : {}),
        messages: [
          { role: "system", content: "你是中文娱乐人格报告助手。" },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      const message = extractErrorMessage(t);
      return json(
        {
          error: `openrouter error: ${res.status}`,
          message,
          detail: t.slice(0, 200),
          attemptedModels: models,
        },
        502
      );
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || "";
    return json({ content, model: data?.model || model }, 200);
  } catch (error) {
    return json(
      { error: "internal_error", detail: String(error?.message || error) },
      500
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function resolveModelCandidates(body, env) {
  const bodyModels = Array.isArray(body?.models) ? body.models : [];
  const candidates = normalizeModelList(
    ...bodyModels,
    body?.model,
    env.OPENROUTER_MODEL
  );
  return candidates.length ? candidates : [...DEFAULT_MODELS];
}

function normalizeModelList(...sources) {
  const seen = new Set();
  const models = [];

  for (const source of sources.flat()) {
    if (typeof source !== "string") continue;

    for (const raw of source.split(",")) {
      const model = raw.trim();
      if (!model || seen.has(model)) continue;
      seen.add(model);
      models.push(model);
    }
  }

  return models;
}

function extractErrorMessage(text) {
  if (!text) return "OpenRouter 请求失败";

  try {
    const parsed = JSON.parse(text);
    return (
      parsed?.error?.message ||
      parsed?.message ||
      String(parsed?.error || "").trim() ||
      text.slice(0, 200)
    );
  } catch {
    return text.slice(0, 200);
  }
}

const DEFAULT_MODELS = [
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free",
  "meta-llama/llama-3.3-8b-instruct",
];
