export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const models = resolveModelCandidates(body, env);

    const prompt = body?.prompt;
    if (!prompt) {
      return json({ error: "missing prompt" }, 400);
    }
    if (!env.OPENROUTER_API_KEY) {
      return json({ error: "server missing OPENROUTER_API_KEY" }, 500);
    }

    let lastError = null;

    for (const model of models) {
      const result = await requestOpenRouter({ env, model, prompt });
      if (result.ok) {
        return json({ content: result.content, model: result.model }, 200);
      }

      lastError = result.error;
      if (!shouldRetryWithNextModel(lastError)) {
        break;
      }
    }

    return json(
      {
        error: `openrouter error: ${lastError?.status || 502}`,
        message: lastError?.message || "OpenRouter 请求失败",
        detail: lastError?.detail || "",
        attemptedModels: models,
      },
      502
    );
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
    env.OPENROUTER_MODEL,
    ...DEFAULT_MODELS
  );
  return candidates;
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
  "openrouter/free",
];

async function requestOpenRouter({ env, model, prompt }) {
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
      messages: [
        { role: "system", content: "你是中文娱乐人格报告助手。" },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return {
      ok: false,
      error: {
        status: res.status,
        message: extractErrorMessage(detail),
        detail: detail.slice(0, 200),
      },
    };
  }

  const data = await res.json();
  return {
    ok: true,
    content: data?.choices?.[0]?.message?.content || "",
    model: data?.model || model,
  };
}

function shouldRetryWithNextModel(error) {
  if (!error) return false;

  return (
    error.status === 404 ||
    /No endpoints found for/i.test(error.message || "")
  );
}
