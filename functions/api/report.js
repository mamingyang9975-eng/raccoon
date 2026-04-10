export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const model =
      body?.model ||
      env.OPENROUTER_MODEL ||
      "meta-llama/llama-3.3-8b-instruct:free";

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
        messages: [
          { role: "system", content: "你是中文娱乐人格报告助手。" },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      return json(
        { error: `openrouter error: ${res.status}`, detail: t.slice(0, 200) },
        502
      );
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || "";
    return json({ content }, 200);
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
